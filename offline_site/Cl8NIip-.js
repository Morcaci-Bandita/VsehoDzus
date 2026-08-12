import { I as i, P as b, t as when } from "./CY602n9t.js";
import { a as removeUndefined, o as syncGames } from "./l4dTAMDA.js";
import { F as api, i as stats, n as settings, r as state } from "./CP0hEE1l.js";
import "./vIOCOudq.js";
import { B as img } from "./CEyrKUT7.js";
import { t as button } from "./CbFrBy7s.js";
import { t as input } from "./_hTQLwBE.js";
import { t as select } from "./C-op7emD.js";
import { t as radio } from "./Bx4sgpmC.js";
import "./D9Tfud2d2.js";
import { t as BotcFlowElement } from "./Fe0s9FWC2.js";
import { t as shareGameAsImage } from "./CV1TgXsw.js";
//#region src/flows/end-game/index.js
var EndGameBase = class extends BotcFlowElement {
	static properties = { isProcessing: { type: Boolean } };
	constructor() {
		super();
		this.isProcessing = false;
	}
	get canShare() {
		if (typeof window.__testCanShare === "boolean") return window.__testCanShare;
		return !!navigator?.share && !!navigator?.canShare;
	}
	async endGame(e) {
		e?.preventDefault?.();
		const flowState = this.__state.getState();
		if (flowState.result === "discard") {
			state.setState((s) => ({
				...s,
				currentGame: {
					...s.currentGame,
					state: "finished"
				}
			}));
			settings.setState((s) => ({
				...s,
				hideGrim: false
			}));
			this.close();
			return;
		}
		if (this.isProcessing) return;
		this.isProcessing = true;
		this.requestUpdate();
		state.setState((s) => ({
			...s,
			currentGame: {
				...s.currentGame,
				state: "finished"
			}
		}));
		settings.setState((s) => ({
			...s,
			hideGrim: false
		}));
		let gameResult;
		stats.setState((s) => {
			const game = state.getState().currentGame;
			const userId = settings.getState()?.user?.uid;
			gameResult = removeUndefined({
				...userId ? { userId } : {},
				id: crypto.randomUUID(),
				synced: false,
				kind: "end-game",
				globalReminders: game.globalReminders,
				demonBluffs: game.demonBluffs,
				notes: flowState.notes,
				stMode: flowState.stMode,
				date: (/* @__PURE__ */ new Date()).toISOString(),
				script: flowState.scriptName,
				result: flowState.result,
				players: game.players.map((player) => ({
					...player,
					suspectedRole: player.me ? flowState.role : player.suspectedRole
				}))
			});
			return {
				...s,
				games: [...s.games, gameResult]
			};
		});
		if (window.location.hostname !== "localhost") if (settings.getState().user) try {
			await syncGames();
		} catch (e) {}
		else try {
			await api.post("https://qr-thing.netlify.app/.netlify/functions/games", gameResult);
		} catch {}
		this.close();
	}
};
var EndGameStepOne = class extends EndGameBase {
	static properties = {
		stMode: { type: Boolean },
		hasRole: { type: Boolean },
		result: { type: String },
		notes: { type: String }
	};
	mapStateToProps(state) {
		return {
			stMode: state.stMode,
			hasRole: state.hasRole,
			result: state.result,
			notes: state.notes
		};
	}
	get hasNextStep() {
		return !this.stMode && !this.hasRole || this.canShare;
	}
	static styles = [
		input,
		button,
		radio,
		i`
      :host {
        display: flex;
        flex-direction: column;
        flex: 1;
      }

      .buttons {
        margin-top: auto;
      }

      label[for="notes"] {
        margin-top: 60px;
      }

      p.label {
        font-weight: 500;
        margin-bottom: 0;
        margin-top: 30px;
        font-size: 0.9rem;
      }
    `
	];
	__handleNonDiscardChange(result) {
		this.setState((state) => ({
			...state,
			result
		}));
		if (this.hasNextStep) this.next();
		else this.forceUpdateSteps();
	}
	render() {
		return b`
      <p class="label">Game result</p>
      ${when(!this.stMode, () => b`
          <div class="win">
            <label ui-label for="win">
              <input
                ui-radio
                type="radio"
                name="role"
                id="win"
                visually-hidden
                ?checked=${this.result === "win"}
                @change=${() => this.__handleNonDiscardChange("win")}
              />
              <div>
                <div class="toggle"><span class="selected"></span></div>
                <div class="content">Win</div>
              </div>
            </label>
            <label ui-label for="loss">
              <input
                ui-radio
                type="radio"
                name="role"
                id="loss"
                visually-hidden
                ?checked=${this.result === "loss"}
                @change=${() => this.__handleNonDiscardChange("loss")}
              />
              <div>
                <div class="toggle"><span class="selected"></span></div>
                <div class="content">Loss</div>
              </div>
            </label>
            <label ui-label for="discard">
              <input
                ui-radio
                type="radio"
                name="role"
                id="discard"
                visually-hidden
                ?checked=${this.result === "discard"}
                @change=${() => {
			this.setState((state) => ({
				...state,
				result: "discard"
			}));
			this.forceUpdateSteps();
		}}
              />
              <div>
                <div class="toggle"><span class="selected"></span></div>
                <div class="content">Discard</div>
              </div>
            </label>
            <label ui-label for="notes">
              <textarea
                .value=${this.notes}
                id="notes"
                @input=${(e) => {
			this.setState((state) => ({
				...state,
				notes: e.target.value
			}));
		}}
                ui-input
                rows="2"
              ></textarea>
              <span>Notes (optional)</span>
            </label>
          </div>
        `)}
      ${when(this.stMode, () => b`
          <div class="win">
            <label ui-label for="good">
              <input
                ui-radio
                type="radio"
                name="role"
                id="good"
                visually-hidden
                ?checked=${this.result === "good"}
                @change=${() => this.__handleNonDiscardChange("good")}
              />
              <div>
                <div class="toggle"><span class="selected"></span></div>
                <div class="content">Good</div>
              </div>
            </label>
            <label ui-label for="evil">
              <input
                ui-radio
                type="radio"
                name="role"
                id="evil"
                visually-hidden
                ?checked=${this.result === "evil"}
                @change=${() => this.__handleNonDiscardChange("evil")}
              />
              <div>
                <div class="toggle"><span class="selected"></span></div>
                <div class="content">Evil</div>
              </div>
            </label>
            <label ui-label for="discard">
              <input
                ui-radio
                type="radio"
                name="role"
                id="discard"
                visually-hidden
                ?checked=${this.result === "discard"}
                @change=${() => {
			this.setState((state) => ({
				...state,
				result: "discard"
			}));
			this.forceUpdateSteps();
		}}
              />
              <div>
                <div class="toggle"><span class="selected"></span></div>
                <div class="content">Discard</div>
              </div>
            </label>
            <label ui-label for="notes">
              <textarea
                .value=${this.notes}
                id="notes"
                @input=${(e) => {
			this.setState((state) => ({
				...state,
				notes: e.target.value
			}));
		}}
                ui-input
                rows="2"
              ></textarea>
              <span>Notes (optional)</span>
            </label>
          </div>
        `)}

      <div class="buttons">
        ${when(this.result === "discard", () => {
			return b`
            <button class="next" ui-button primary @click=${this.endGame}>
              End game
            </button>
          `;
		})}
        ${when(this.result !== "discard", () => b`
            <button
              ?disabled=${!this.result}
              class="next"
              ui-button
              primary
              @click=${this.hasNextStep ? this.next : this.endGame}
            >
              ${this.hasNextStep ? "Next" : this.isProcessing ? "Saving game..." : "End game"}
            </button>
          `)}
        <button ui-button secondary @click=${this.close}>Close</button>
      </div>
    `;
	}
};
customElements.define("end-game-step-one", EndGameStepOne);
var EndGameStepTwo = class extends EndGameBase {
	static properties = {
		scriptName: { type: String },
		hasRole: { type: Boolean },
		role: { type: Object },
		travellers: { type: Boolean }
	};
	mapStateToProps(state) {
		return {
			role: state.role,
			hasRole: state.hasRole
		};
	}
	static styles = [
		button,
		select,
		i`
      :host {
        display: flex;
        flex-direction: column;
        flex: 1;
      }

      .buttons {
        margin-top: auto;
      }
    `
	];
	get __nextButtonLabel() {
		if (this.canShare) return "Next";
		if (this.isProcessing) return "Saving game...";
		return "End game";
	}
	render() {
		return b`
      <p>Which role did you play?</p>

      <botc-select-role
        .script=${this.scriptName}
        allScriptRoles
        .filterFn=${(r) => {
			if (this.travellers) return r.type.toLowerCase() !== "traveller";
			return true;
		}}
        .selected=${this.role ? [this.role] : []}
        @selection-changed=${({ selection }) => {
			this.setState((state) => ({
				...state,
				role: selection.length ? selection[0] : null
			}));
			if (selection.length && this.canShare) this.next();
		}}
      ></botc-select-role>
      <div class="buttons">
        <button
          ?disabled=${!this.role}
          class="next"
          ui-button
          primary
          @click=${this.canShare ? this.next : this.endGame}
        >
          ${this.__nextButtonLabel}
        </button>
        <button ui-button secondary @click=${this.close}>Close</button>
      </div>
    `;
	}
};
customElements.define("end-game-step-two", EndGameStepTwo);
var EndGameStepThree = class extends EndGameBase {
	static properties = {
		stMode: { type: Boolean },
		scriptName: { type: String },
		role: { type: Object },
		result: { type: String },
		notes: { type: String },
		loading: { type: Boolean }
	};
	constructor() {
		super();
		this.loading = false;
	}
	mapStateToProps(state) {
		return { notes: state.notes };
	}
	static styles = [
		button,
		input,
		select,
		i`
      :host {
        display: flex;
        flex-direction: column;
        flex: 1;
      }

      .buttons {
        margin-top: auto;
      }

      button[ui-button] {
        display: flex;
        align-items: center;
      }

      button[ui-button] span:nth-of-type(2) {
        /* flex: 1; */
        /* margin-left: -24px; */
      }

      button[ui-button] span:nth-of-type(1) {
        display: flex;
        margin-right: 6px;
      }

      button[ui-button] span:nth-of-type(1) svg {
        /* fill: var(--ui-bg-9); */
      }
      botc-spinner::part(spinner-wrapper) {
        margin: 0;
      }
    `
	];
	render() {
		return b`
      <p>
        Would you like to share a screenshot of this game with your friends?
      </p>
      <button ui-button secondary @click=${this.screenshot}>
        ${when(this.loading, () => b`<botc-spinner .size=${"25px"}></botc-spinner>`)}
        ${when(!this.loading, () => b`<span>${img}</span
              ><span class="label">Share this game</span>`)}
      </button>
      <div class="buttons">
        <button
          class="next"
          ui-button
          primary
          ?disabled=${this.isProcessing}
          @click=${this.endGame}
        >
          ${this.isProcessing ? "Saving game..." : "End game"}
        </button>
        <button ui-button secondary @click=${this.close}>Close</button>
      </div>
    `;
	}
	async screenshot() {
		this.loading = true;
		try {
			window?.gtag?.("event", "share_game_click", {
				event_category: "engagement",
				event_label: "end_game_share_button"
			});
		} catch (e) {}
		try {
			await shareGameAsImage({
				...state.getState().currentGame,
				result: this.result
			}, {
				shareText: ``,
				scale: 4
			});
			console.log("Shared successfully");
		} catch (err) {
			if (err.name !== "AbortError") console.error("Share failed:", err);
		} finally {
			this.loading = false;
		}
	}
};
customElements.define("end-game-step-three", EndGameStepThree);
var end_game_default = () => {
	const hasRole = state.getState()?.currentGame?.players?.some((p) => p.me && p.suspectedRole?.id);
	const role = state.getState()?.currentGame?.players?.find((p) => p.me)?.suspectedRole;
	const scriptName = state.getState().currentGame?.script;
	return {
		title: "End Game",
		initialState: {
			stMode: state.getState().currentGame?.stMode,
			scriptName,
			role,
			hasRole,
			travellers: state.getState().currentGame?.travellers,
			result: null,
			notes: ""
		},
		steps: [
			{
				id: "result",
				title: "Result",
				render: ({ stMode, result, notes }) => {
					return b`
            <end-game-step-one
              .notes=${notes}
              .result=${result}
              .stMode=${stMode}
            ></end-game-step-one>
          `;
				}
			},
			{
				id: "role",
				title: "Role",
				condition: ({ stMode, result, hasRole }) => !hasRole && result !== "discard" && !stMode,
				render: ({ hasRole, travellers, role, scriptName }) => b`<end-game-step-two
            .travellers=${travellers}
            .scriptName=${scriptName}
            .role=${role}
            .hasRole=${hasRole}
          ></end-game-step-two>`
			},
			{
				id: "share",
				title: "Share",
				condition: ({ result }) => {
					if (result === "discard") return false;
					if (typeof window.__testCanShare === "boolean") return window.__testCanShare;
					return !!navigator?.share && !!navigator.canShare;
				},
				render: ({ notes, stMode, scriptName, role, result }) => {
					return b`
            <end-game-step-three
              .stMode=${stMode}
              .scriptName=${scriptName}
              .role=${role}
              .result=${result}
              .notes=${notes}
            ></end-game-step-three>
          `;
				}
			}
		]
	};
};
//#endregion
export { end_game_default as default };
