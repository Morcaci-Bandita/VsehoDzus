import { A as i, I as i$1, P as b, _ as focus, f as border, g as elevation4, s as bg5, t as when } from "./CY602n9t.js";
import { M as SCRIPTS_DATA, i as stats, n as settings, r as state } from "./CP0hEE1l.js";
import "./vIOCOudq.js";
import { t as button } from "./CbFrBy7s.js";
import { t as dialog } from "./Dm27KaR0.js";
import { t as input } from "./_hTQLwBE.js";
import { t as select } from "./C-op7emD.js";
import { t as radio } from "./Bx4sgpmC.js";
//#region src/components/dialog/end-game.js
var BotcEndGame = class extends i {
	static properties = {
		hasRole: { type: Boolean },
		script: { type: Object },
		errors: { type: Array },
		roleSelected: { type: Boolean },
		resultSelected: { type: Boolean },
		selectedResult: { type: String },
		notes: { type: String }
	};
	constructor() {
		super();
		this.hasRole = false;
		this.script = {};
		this.errors = [];
		this.resultSelected = false;
		this.roleSelected = false;
		this.selectedResult = "";
		this.notes = "";
	}
	async connectedCallback() {
		super.connectedCallback();
		const myRole = state.getState().currentGame?.players?.find((p) => p.me)?.suspectedRole;
		this.hasRole = myRole && Object.keys(myRole).length > 0;
		const scriptName = state.getState().currentGame.script;
		this.script = await SCRIPTS_DATA[scriptName]();
	}
	static styles = [
		button,
		input,
		select,
		radio,
		i$1`
      :host {
        display: block;
      }

      fieldset {
        all: unset;
        display: block;
        margin: 0;
        padding: 0;
        border: none;
      }

      .win label {
        ${elevation4()}
        display: flex;
        align-items: center;
        margin-bottom: 10px;
        background: ${bg5};
        border: solid 1px ${border};
        border-radius: 4px;
        padding: 8px;
        transition: background 0.2s;
      }

      .win label.selected {
        border: solid 2px rgb(112, 210, 125);
        background: #4c564d;
        padding: 7px;
      }

      input:checked + label {
        border: solid 2px rgb(112, 210, 125);
        background: #4c564d;
        padding: 7px;
      }

      input[type="radio"] {
        appearance: none; /* Hides the default radio button */
        -webkit-appearance: none; /* For Safari */
        -moz-appearance: none; /* For Firefox */
        position: absolute; /* Removes it from the flow */
        opacity: 0; /* Makes it invisible */
      }

      input[type="radio"]:focus-visible + label {
        ${focus()}
      }

      input[type="radio"] + label {
        display: flex;
        align-items: center;
        margin-bottom: 10px;
        background: ${bg5};
        border: solid 1px ${border};
        border-radius: 4px;
        padding: 8px;
        transition:
          background 0.2s,
          border 0.2s;
        cursor: pointer; /* Makes the label look clickable */
      }

      input[type="radio"]:checked + label {
        border: solid 2px rgb(112, 210, 125);
        background: #4c564d;
        padding: 7px;
      }

      label[ui-label][for="notes"] {
        margin-top: 24px;
      }

      .label {
        font-weight: 700;
        font-size: 0.9rem;
        margin-top: 24px;
      }
    `
	];
	/**
	* - did you win? yes/no
	* - select your role -> based on script
	* -
	*/
	render() {
		const stMode = state.getState().currentGame?.stMode;
		const isButtonDisabled = stMode ? !this.resultSelected : !this.resultSelected || this.resultSelected && this.selectedResult !== "discard" && !this.hasRole && !this.roleSelected;
		return b`
      <!-- <label ui-label for="script-select">
        <select ui-select name="scripts" id="script-select">
          ${Object.keys(SCRIPTS_DATA).filter((s) => s !== "All").map((script, i) => b`
                <option ?selected=${i === 0} value="${script}">
                  ${script}
                </option>
              `)}
        </select>
        <span>Script</span>
      </label> -->
      <form @submit=${this.handleSubmit}>
        ${when(!this.hasRole && !stMode, () => b`
            <label ui-label for="role">
              <select
                ui-select
                name="role"
                id="role"
                @change=${(e) => {
			this.roleSelected = e.target.value !== "";
		}}
              >
                <option value="" disabled selected>Select your role</option>

                ${Object.keys(this.script).reduce((allCharacters, category) => {
			return allCharacters.concat(this.script[category]);
		}, []).sort((a, b) => a.humanReadableRole.localeCompare(b.humanReadableRole)).map((character) => b`
                      <option value="${character.id}">
                        ${character.humanReadableRole}
                      </option>
                    `)}
              </select>
              <span>What was your role?</span>
            </label>
          `)}
        <p class="label">Game result:</p>
        ${when(!stMode, () => b`
            <div class="win">
              <label ui-label for="win">
                <input
                  ui-radio
                  type="radio"
                  name="role"
                  id="win"
                  visually-hidden
                  ?checked=${this.selectedResult === "win"}
                  @change=${() => {
			this.resultSelected = true;
			this.selectedResult = "win";
		}}
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
                  ?checked=${this.selectedResult === "loss"}
                  @change=${() => {
			this.resultSelected = true;
			this.selectedResult = "loss";
		}}
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
                  ?checked=${this.selectedResult === "discard"}
                  @change=${() => {
			this.resultSelected = true;
			this.selectedResult = "discard";
		}}
                />
                <div>
                  <div class="toggle"><span class="selected"></span></div>
                  <div class="content">Discard</div>
                </div>
              </label>
            </div>
          `)}
        ${when(stMode, () => b`
            <div class="win">
              <label ui-label for="good">
                <input
                  ui-radio
                  type="radio"
                  name="role"
                  id="good"
                  visually-hidden
                  ?checked=${this.selectedResult === "good"}
                  @change=${() => {
			this.resultSelected = true;
			this.selectedResult = "good";
		}}
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
                  ?checked=${this.selectedResult === "evil"}
                  @change=${() => {
			this.resultSelected = true;
			this.selectedResult = "evil";
		}}
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
                  ?checked=${this.selectedResult === "discard"}
                  @change=${() => {
			this.resultSelected = true;
			this.selectedResult = "discard";
		}}
                />
                <div>
                  <div class="toggle"><span class="selected"></span></div>
                  <div class="content">Discard</div>
                </div>
              </label>
            </div>
          `)}
        <label ui-label for="notes">
          <textarea
            .value=${this.notes}
            id="notes"
            @input=${this.updateNotes}
            ui-input
            rows="2"
          ></textarea>
          <span>Notes (optional)</span>
        </label>
        ${when(this.errors.length, () => b`
            <ul ui-error>
              ${this.errors.map((error) => b` <li>${error}</li> `)}
            </ul>
          `)}
        <button ?disabled=${isButtonDisabled} ui-button type="submit" primary>
          Submit
        </button>
      </form>
    `;
	}
	updateNotes(e) {
		this.notes = e.target.value;
	}
	handleSubmit(e) {
		this.errors = [];
		e.preventDefault();
		const formData = new FormData(e.target);
		const result = this.selectedResult;
		const notes = this.shadowRoot.getElementById("notes").value;
		let role = state.getState().currentGame?.players?.find((p) => p.me)?.suspectedRole;
		if (role && !(Object.keys(role).length > 0)) {
			const selectedRole = formData.get("role");
			role = Object.keys(this.script).reduce((allCharacters, category) => {
				return allCharacters.concat(this.script[category]);
			}, []).find((character) => character.id === selectedRole);
		}
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
		if (result !== "discard") {
			let gameResult;
			stats.setState((s) => {
				const game = state.getState().currentGame;
				const userId = settings.getState()?.user?.uid;
				gameResult = {
					...userId ? { userId } : {},
					id: crypto.randomUUID(),
					synced: false,
					kind: "end-game",
					notes,
					globalReminders: game.globalReminders,
					demonBluffs: game.demonBluffs,
					stMode: game.stMode,
					date: (/* @__PURE__ */ new Date()).toISOString(),
					script: game.script,
					result,
					players: game.players.map((player) => ({
						...player,
						suspectedRole: player.me ? role : player.suspectedRole
					}))
				};
				return {
					...s,
					games: [...s.games, gameResult]
				};
			});
		}
		dialog.close();
	}
};
customElements.define("botc-end-game", BotcEndGame);
//#endregion
export { BotcEndGame };
