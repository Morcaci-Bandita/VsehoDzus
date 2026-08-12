import { I as i, P as b, c as bg6, t as when, x as main5 } from "./CY602n9t.js";
import { _ as getOnTheBlock, d as alignment, g as getNominationVoteCount, m as capitalize, n as settings, p as calculateEffectiveVoteCount, r as state, v as getVoteId, y as getVoteMultiplier } from "./CP0hEE1l.js";
import "./vIOCOudq.js";
import { D as plus, T as minus, b as skull } from "./CEyrKUT7.js";
import { t as inlay } from "./Ue9OS-EJ.js";
import { t as button } from "./CbFrBy7s.js";
import { t as iconButton } from "./C0jyJKsx.js";
import { t as input } from "./_hTQLwBE.js";
import "./DPxjp5Y3.js";
import { t as select } from "./C-op7emD.js";
import "./B7SQ1aTf2.js";
import "./D9Tfud2d2.js";
import { t as BotcFlowElement } from "./Fe0s9FWC2.js";
//#region src/flows/nomination/index.js
const HideGrimMixin = (klazz) => {
	let authBusy = false;
	return class extends klazz {
		async toggleHideGrim({ checked, callback }) {
			if (authBusy) return;
			authBusy = true;
			if (checked && settings.getState().useAuthForHideGrim) {
				let result = true;
				try {
					const credentialId = settings.getState().webAuthnId;
					const publicKey = {
						challenge: /* @__PURE__ */ new Uint8Array(32),
						allowCredentials: [{
							id: credentialId,
							type: "public-key",
							transports: ["internal"]
						}],
						userVerification: "required",
						timeout: 6e4
					};
					try {
						if (await navigator.credentials.get({ publicKey })) result = true;
						else result = false;
					} catch (err) {
						result = false;
						console.error("Auth failed:", err);
					}
				} catch (err) {
					result = false;
					console.error("Registration failed:", err);
				} finally {
					authBusy = false;
				}
				callback(result);
				await new Promise((r) => setTimeout(r, 1e3));
			} else callback(checked);
			authBusy = false;
		}
	};
};
function createExecutionDeadState(day) {
	return {
		day,
		icon: "dead",
		id: "unknowntown",
		type: "Townsfolk",
		humanReadableRole: "Town execution",
		hasDeadVote: true
	};
}
function renderNominationLog() {
	const nominations = state.getState()?.currentGame?.nominations ?? [];
	const players = state.getState()?.currentGame?.players ?? [];
	const getPlayerById = (id) => players.find((player) => player.id === id);
	if (!nominations.length) return b`<i>No nominations yet.</i>`;
	const nominationsByDay = nominations.reduce((acc, nom) => {
		acc[nom.day] = acc[nom.day] || [];
		acc[nom.day].push(nom);
		return acc;
	}, {});
	return b`
    <div>
      ${Object.keys(nominationsByDay).map(Number).sort((a, b) => b - a).map((day) => b`
          <h2 class="balgruf">Day ${day + 1}</h2>
          ${nominationsByDay[day].slice().reverse().map((nom) => {
		const nominator = getPlayerById(nom.nominator);
		const nominee = getPlayerById(nom.nominee);
		const voteNames = nom.votes.map((entry) => {
			const id = getVoteId(entry);
			const player = getPlayerById(id);
			if (!player) return null;
			if (typeof entry === "object" && entry.vote != null) {
				const sign = entry.vote.value > 0 ? "+" : "";
				return b`<span
                      >${capitalize(player.name)}
                      (${sign}${entry.vote.value})</span
                    >`;
			}
			return b`<span>${capitalize(player.name)}</span>`;
		}).filter(Boolean).reduce((acc, el, i, arr) => [
			...acc,
			el,
			i < arr.length - 1 ? b`, ` : null
		], []).filter(Boolean);
		return b`
                <div style="margin-bottom: 10px;">
                  <b>${capitalize(nominator?.name ?? "Unknown")}</b> nominated
                  <b>${capitalize(nominee?.name ?? "Unknown")}</b>
                  (<b>${getNominationVoteCount(nom, players)}</b>
                  votes)${voteNames.length ? ":" : ""} ${voteNames}
                </div>
              `;
	})}
        `)}
    </div>
  `;
}
var NominationStepOne = class extends HideGrimMixin(BotcFlowElement) {
	static properties = {
		nominator: { type: Object },
		showRoles: { type: Boolean }
	};
	mapStateToProps(state) {
		return {
			nominator: state.nominator,
			showRoles: state.showRoles
		};
	}
	static styles = [
		input,
		inlay,
		button,
		i`
      :host {
        display: flex;
        flex-direction: column;
        flex: 1;
      }

      .buttons {
        margin-top: auto;
      }

      .balgruf {
        font-family: "Balgruf";
        font-size: 1.375rem;
        color: ${main5};
        text-shadow: 1px 1px 2px rgba(0, 0, 0, 1);
        margin: 0;
      }

      botc-disclosure {
        background-color: ${bg6};
      }

      botc-disclosure::part(button) {
        padding-top: 16px;
        padding-bottom: 16px;
      }
    `
	];
	render() {
		const onTheBlock = getOnTheBlock();
		return b`
      ${when(!!onTheBlock, () => b`
          <div ui-inlay>
            <span class="balgruf">${onTheBlock.name}</span> is on the block with
            <span class="balgruf">${onTheBlock.votes}</span> votes.
          </div>
        `)}
      <p>Who started the nomination?</p>
      <botc-player-select
        .hideGrim=${!this.showRoles}
        .selected=${this.nominator ? [this.nominator] : []}
        .filterFn=${(p) => {
			if (p.dead) return false;
			if (p?.tokens?.some((t) => t.id === "golem-May Not Nominate")) return false;
			const nominations = state.getState()?.currentGame?.nominations || [];
			const day = state.getState()?.currentGame?.day;
			return !nominations.some((n) => n.nominator === p.id && n.day === day);
		}}
        @selection-changed=${({ selection }) => {
			this.setState((state) => ({
				...state,
				nominator: selection[0]
			}));
			if (selection.length) this.next();
		}}
      >
      </botc-player-select>

      <div class="buttons">
        ${when(state.getState().currentGame?.stMode, () => b`
            <botc-switch
              id="auth-switch"
              @checked-changed=${({ checked }) => {
			this.toggleHideGrim({
				checked,
				callback: (result) => {
					this.setState((s) => ({
						...s,
						showRoles: result
					}));
					this.shadowRoot.querySelector("#auth-switch").checked = result;
				}
			});
		}}
              ?checked=${this.showRoles}
              >Show Roles</botc-switch
            >
          `)}
        ${when(state.getState().currentGame?.nominations?.length, () => b` <botc-disclosure>
              <div slot="label">Log</div>
              <div ui-inlay slot="detail">${renderNominationLog()}</div>
            </botc-disclosure>`)}
        <button
          ?disabled=${!this.nominator}
          class="next"
          ui-button
          primary
          @click=${this.next}
        >
          Next
        </button>
        <button ui-button secondary @click=${this.close}>Close</button>
      </div>
    `;
	}
};
customElements.define("nomination-step-one", NominationStepOne);
var NominationStepTwo = class extends HideGrimMixin(BotcFlowElement) {
	static properties = {
		nominee: { type: Object },
		nominator: { type: Object },
		showRoles: { type: Boolean }
	};
	mapStateToProps(state) {
		return {
			nominee: state.nominee,
			showRoles: state.showRoles
		};
	}
	static styles = [
		button,
		select,
		inlay,
		i`
      :host {
        display: flex;
        flex-direction: column;
        flex: 1;
      }

      .balgruf {
        font-family: "Balgruf";
        font-size: 1.375rem;
        color: ${main5};
        text-shadow: 1px 1px 2px rgba(0, 0, 0, 1);
        margin: 0;
      }

      .buttons {
        margin-top: auto;
      }

      botc-disclosure {
        background-color: ${bg6};
      }

      botc-disclosure::part(button) {
        padding-top: 16px;
        padding-bottom: 16px;
      }
    `
	];
	render() {
		return b`
      <p>
        Who did
        <span class="balgruf">${capitalize(this.nominator.name)}</span>
        nominate?
      </p>
      <botc-player-select
        .hideGrim=${!this.showRoles}
        .selected=${this.nominee ? [this.nominee] : []}
        .filterFn=${(p) => {
			const nominations = state.getState()?.currentGame?.nominations || [];
			const day = state.getState()?.currentGame?.day;
			return !nominations.some((n) => n.nominee === p.id && n.day === day);
		}}
        @selection-changed=${({ selection }) => {
			this.setState((state) => ({
				...state,
				nominee: selection[0]
			}));
			if (selection.length) this.next();
		}}
      >
      </botc-player-select>
      <div class="buttons">
        ${when(state.getState().currentGame?.stMode, () => b`
            <botc-switch
              id="auth-switch"
              @checked-changed=${({ checked }) => {
			this.toggleHideGrim({
				checked,
				callback: (result) => {
					this.setState((s) => ({
						...s,
						showRoles: result
					}));
					this.shadowRoot.querySelector("#auth-switch").checked = result;
				}
			});
		}}
              >Show Roles</botc-switch
            >
          `)}
        ${when(state.getState().currentGame?.nominations?.length, () => b`
            <botc-disclosure>
              <div slot="label">Log</div>
              <div ui-inlay slot="detail">${renderNominationLog()}</div>
            </botc-disclosure>
          `)}
        <button
          ?disabled=${!this.nominee}
          class="next"
          ui-button
          primary
          @click=${this.next}
        >
          Next
        </button>
        <button ui-button secondary @click=${this.close}>Close</button>
      </div>
    `;
	}
};
customElements.define("nomination-step-two", NominationStepTwo);
var NominationStepThree = class extends HideGrimMixin(BotcFlowElement) {
	static properties = {
		voted: { type: Array },
		showRoles: { type: Boolean }
	};
	mapStateToProps(state) {
		return {
			voted: state.voted,
			showRoles: state.showRoles
		};
	}
	static styles = [
		button,
		input,
		select,
		inlay,
		i`
      :host {
        display: flex;
        flex-direction: column;
        flex: 1;
      }

      .balgruf {
        font-family: "Balgruf";
        font-size: 1.375rem;
        color: ${main5};
        text-shadow: 1px 1px 2px rgba(0, 0, 0, 1);
        margin: 0;
      }

      .buttons {
        margin-top: auto;
      }
    `
	];
	render() {
		const allPlayers = state.getState()?.currentGame?.players || [];
		const alivePlayers = allPlayers.filter((p) => !p.dead);
		const baseVotesRequired = Math.ceil(alivePlayers.length / 2);
		const nominations = state.getState()?.currentGame?.nominations || [];
		const currentDay = state.getState()?.currentGame?.day;
		const todaysNominations = nominations.filter((n) => n.day === currentDay);
		let votesRequired = baseVotesRequired;
		let previousNominee = null;
		if (todaysNominations.length > 0) {
			const highestVoteCount = Math.max(...todaysNominations.map((n) => getNominationVoteCount(n, allPlayers)));
			if (highestVoteCount >= baseVotesRequired) {
				votesRequired = highestVoteCount + 1;
				const highestNomination = todaysNominations.find((n) => getNominationVoteCount(n, allPlayers) === highestVoteCount);
				previousNominee = allPlayers.find((p) => p.id === highestNomination?.nominee) ?? null;
			}
		}
		const currentVotes = calculateEffectiveVoteCount(this.voted.map((p) => p.id), allPlayers);
		const voteModifiers = this.voted.map((p) => ({
			player: p,
			multiplier: getVoteMultiplier(p)
		})).filter(({ multiplier }) => multiplier !== 1);
		return b`
      <p>
        <span class="balgruf">${capitalize(this.nominator.name)}</span>
        nominated <span class="balgruf">${capitalize(this.nominee.name)}</span>.
      </p>
      <p style="margin-bottom: 0; margin-top:0;">
        <strong>Votes needed:</strong>
        <span class="balgruf">${currentVotes}</span>/<span class="balgruf"
          >${votesRequired}</span
        >
        ${previousNominee ? b` to beat nomination of
                <span class="balgruf"
                  >${capitalize(previousNominee.name)}</span
                >` : ""}
      </p>
      ${when(voteModifiers.length > 0, () => b`
          <p style="margin-top: 4px; margin-bottom: 1rem; font-size: 0.875rem;">
            ${voteModifiers.map(({ player, multiplier }, i) => {
			const sign = multiplier > 0 ? "+" : "";
			return b`${i > 0 ? b`, ` : ""}${capitalize(player.name)}
              (${sign}${multiplier})`;
		})}
          </p>
        `)}
      <botc-player-select
        .hideGrim=${!this.showRoles}
        multiple
        .dimUsedDeadVotes=${true}
        .selected=${this.voted.length ? this.voted : []}
        .sortFn=${(a, b) => {
			if (!this.nominee) return 0;
			const allPlayers = state.getState()?.currentGame?.players || [];
			const nomineeIndex = allPlayers.findIndex((p) => p.id === this.nominee.id);
			if (nomineeIndex === -1) return 0;
			const votingOrder = [...allPlayers.slice(nomineeIndex + 1), ...allPlayers.slice(0, nomineeIndex + 1)];
			return votingOrder.findIndex((p) => p.id === a.id) - votingOrder.findIndex((p) => p.id === b.id);
		}}
        @selection-changed=${({ selection }) => {
			this.setState((state) => ({
				...state,
				voted: selection
			}));
		}}
      >
      </botc-player-select>
      ${when(state.getState().currentGame?.stMode, () => b`
          <botc-switch
            id="auth-switch"
            @checked-changed=${({ checked }) => {
			this.toggleHideGrim({
				checked,
				callback: (result) => {
					this.setState((s) => ({
						...s,
						showRoles: result
					}));
					this.shadowRoot.querySelector("#auth-switch").checked = result;
				}
			});
		}}
            ?checked=${this.showRoles}
            >Show Roles</botc-switch
          >
        `)}
      <div class="buttons">
        <button
          class="next"
          ui-button
          primary
          @click=${() => {
			const flowergirl = state.getState().currentGame?.players?.find((p) => p?.suspectedRole?.id === "flowergirl");
			if (flowergirl) {
				const demonVoted = this.voted.some((p) => p?.suspectedRole?.type.toLowerCase() === "demon");
				const flowergirlHasToken = flowergirl.tokens.some((t) => t.id === "flowergirl-Demon Voted");
				if (demonVoted && !flowergirlHasToken) state.setState((s) => ({
					...s,
					currentGame: {
						...s.currentGame,
						players: s.currentGame.players.map((p) => {
							if (p?.suspectedRole?.id === "flowergirl") return {
								...p,
								tokens: [...p.tokens, {
									id: "flowergirl-Demon Voted",
									role: "flowergirl",
									label: "Demon Voted",
									icon: "flowergirl",
									type: "Townsfolk",
									humanReadableRole: "Demon Voted"
								}]
							};
							return p;
						})
					}
				}));
			}
			this.next();
		}}
        >
          Next
        </button>
        <button ui-button secondary @click=${this.close}>Close</button>
      </div>
    `;
	}
};
customElements.define("nomination-step-three", NominationStepThree);
var NominationStepVotesMinimal = class extends HideGrimMixin(BotcFlowElement) {
	static properties = {
		voted: { type: Array },
		showRoles: { type: Boolean },
		nrOfVotes: { type: Number }
	};
	mapStateToProps(state) {
		return {
			voted: state.voted,
			showRoles: state.showRoles,
			nrOfVotes: state.nrOfVotes
		};
	}
	static styles = [
		button,
		input,
		select,
		inlay,
		iconButton,
		i`
      :host {
        display: flex;
        flex-direction: column;
        flex: 1;
      }

      .balgruf {
        font-family: "Balgruf";
        font-size: 1.375rem;
        color: ${main5};
        text-shadow: 1px 1px 2px rgba(0, 0, 0, 1);
        margin: 0;
      }

      .buttons {
        margin-top: auto;
      }

      .plus-minus-btns {
        display: flex;
        align-items: center;
        flex: 1;
      }

      .plus-minus-btns .duration {
        flex: 1;
        text-align: center;
      }

      .balgruf.big {
        text-align: center;
        font-size: 5rem;
        font-family: "Balgruf";
        color: ${main5};
        text-shadow: 1px 1px 2px rgba(0, 0, 0, 1);
        margin: 0;
        margin-top: 60px;
        margin-bottom: 80px;
      }

      .timer-running button[ui-button] {
        display: flex;
        justify-content: center;
        align-items: center;
      }

      .init {
        flex-direction: row;
        flex: 1;
        display: flex;
        justify-content: center;
        align-items: center;
        gap: 32px;
      }

      .init .countdown {
        display: flex;
        flex-direction: column;
        align-items: center;
      }

      button[ui-icon-button] {
        width: 80px;
        height: 80px;
        display: flex;
        justify-content: center;
        align-items: center;
      }
      button[ui-icon-button] svg {
        width: 40px;
        height: 40px;
      }
    `
	];
	render() {
		const allPlayers = state.getState()?.currentGame?.players || [];
		const alivePlayers = allPlayers.filter((p) => !p.dead);
		const baseVotesRequired = Math.ceil(alivePlayers.length / 2);
		const nominations = state.getState()?.currentGame?.nominations || [];
		const currentDay = state.getState()?.currentGame?.day;
		const todaysNominations = nominations.filter((n) => n.day === currentDay);
		let votesRequired = baseVotesRequired;
		let previousNominee = null;
		if (todaysNominations.length > 0) {
			const highestVoteCount = Math.max(...todaysNominations.map((n) => getNominationVoteCount(n, allPlayers)));
			if (highestVoteCount >= baseVotesRequired) {
				votesRequired = highestVoteCount + 1;
				const highestNomination = todaysNominations.find((n) => getNominationVoteCount(n, allPlayers) === highestVoteCount);
				previousNominee = allPlayers.find((p) => p.id === highestNomination?.nominee) ?? null;
			}
		}
		const currentVotes = calculateEffectiveVoteCount(this.voted.map((p) => p.id), allPlayers);
		return b`
      <p>
        <span class="balgruf">${capitalize(this.nominator.name)}</span>
        nominated <span class="balgruf">${capitalize(this.nominee.name)}</span>.
      </p>
      <p style="margin-bottom: 0; margin-top:0;">
        <strong>Votes needed:</strong>
        <span class="balgruf">${currentVotes}</span>/<span class="balgruf"
          >${votesRequired}</span
        >
        ${previousNominee ? b` to beat nomination of
                <span class="balgruf"
                  >${capitalize(previousNominee.name)}</span
                >` : ""}
      </p>

      <div class="plus-minus-btns">
        <div class="timer-running init">
          <button
            ui-icon-button
            ?disabled=${this.nrOfVotes <= 0}
            @click=${() => {
			this.setState((state) => ({
				...state,
				nrOfVotes: state.nrOfVotes - 1
			}));
		}}
          >
            ${minus}
          </button>

          <div class="countdown balgruf big">
            <div>${this.nrOfVotes}/${votesRequired}</div>
          </div>
          <button
            ui-icon-button
            @click=${() => {
			this.setState((state) => ({
				...state,
				nrOfVotes: state.nrOfVotes + 1
			}));
		}}
          >
            ${plus}
          </button>
        </div>
      </div>
      ${when(state.getState().currentGame?.players.some((p) => p?.suspectedRole?.id === "flowergirl"), () => b`
          <botc-switch
            ?checked=${state.getState().currentGame?.players.some((p) => p?.suspectedRole?.id === "flowergirl" && p.tokens.some((t) => t.id === "flowergirl-Demon Voted"))}
            @checked-changed=${({ checked }) => {
			if (checked) state.setState((s) => ({
				...s,
				currentGame: {
					...s.currentGame,
					players: s.currentGame.players.map((p) => {
						if (p?.suspectedRole?.id === "flowergirl") return {
							...p,
							tokens: [...p.tokens, {
								id: "flowergirl-Demon Voted",
								role: "flowergirl",
								label: "Demon Voted",
								icon: "flowergirl",
								type: "townsfolk",
								humanReadableRole: "Flowergirl"
							}]
						};
						return p;
					})
				}
			}));
			else state.setState((s) => ({
				...s,
				currentGame: {
					...s.currentGame,
					players: s.currentGame.players.map((p) => {
						if (p?.suspectedRole?.id === "flowergirl") return {
							...p,
							tokens: p.tokens.filter((t) => t.id !== "flowergirl-Demon Voted")
						};
						return p;
					})
				}
			}));
		}}
            >The demon voted</botc-switch
          >
        `)}

      <div class="buttons">
        <button
          class="next"
          ui-button
          primary
          @click=${() => {
			this.setState((state) => ({
				...state,
				voted: Array.from({ length: this.nrOfVotes }, (_, i) => ({ id: `vote-${i + 1}` }))
			}));
			this.next();
		}}
        >
          Next
        </button>
        <button ui-button secondary @click=${this.close}>Close</button>
      </div>
    `;
	}
};
customElements.define("nomination-step-votes-minimal", NominationStepVotesMinimal);
var NominationStepFour = class extends HideGrimMixin(BotcFlowElement) {
	static properties = {
		nominator: { type: Object },
		nominee: { type: Object },
		voted: { type: Array },
		showRoles: { type: Boolean }
	};
	mapStateToProps(state) {
		return {
			nominator: state.nominator,
			nominee: state.nominee,
			voted: state.voted,
			showRoles: state.showRoles
		};
	}
	static styles = [
		button,
		inlay,
		i`
      :host {
        display: flex;
        flex-direction: column;
        flex: 1;
      }

      .balgruf {
        font-family: "Balgruf";
        font-size: 1.375rem;
        color: ${main5};
        text-shadow: 1px 1px 2px rgba(0, 0, 0, 1);
        margin: 0;
      }

      .buttons {
        margin-top: auto;
      }

      button[ui-button][primary].execute-btn {
        display: flex;
        align-items: center;
        justify-content: center;
        margin-top: 0px;
      }

      button[ui-button][primary].execute-btn svg {
        fill: var(--ui-bg-9);
        margin-right: 8px;
      }

      botc-player-details {
        margin-top: 12px;
      }

      botc-disclosure {
        background-color: ${bg6};
      }

      botc-disclosure::part(button) {
        padding-top: 16px;
        padding-bottom: 16px;
      }

      .center {
        text-align: center;
      }
    `
	];
	render() {
		const stMode = state.getState().currentGame?.stMode;
		const allPlayers = state.getState()?.currentGame?.players || [];
		const onTheBlock = getOnTheBlock();
		const hasEnough = hasEnoughVotesForExecution(this.voted, this.nominee?.id, this.nominator?.id);
		const playerOnTheBlock = (hasEnough ? this.nominee : null) || state.getState()?.currentGame?.players.find((p) => p.id === onTheBlock?.id);
		const currentVotes = calculateEffectiveVoteCount(this.voted.map((p) => p.id), allPlayers);
		const votesRequired = getVotesRequired(this.nominee?.id, this.nominator?.id);
		if (!onTheBlock && !hasEnough) return b`
        <div ui-inlay class="center">
          <span class="balgruf">${currentVotes}</span>/<span class="balgruf"
            >${votesRequired}</span
          >
          votes is not enough to put
          <span class="balgruf">${capitalize(this.nominee.name)}</span> on the
          block.
        </div>
        <div class="buttons">
          <button ui-button secondary @click=${this.conclude}>
            Conclude nomination
          </button>
        </div>
      `;
		if (onTheBlock && !hasEnough && currentVotes === onTheBlock.votes) return b`
        <div ui-inlay class="center">
          <div>
            <span class="balgruf">${capitalize(this.nominee.name)}</span>'s
            <span class="balgruf">${currentVotes}</span>
            vote${currentVotes === 1 ? "" : "s"} ties with
            <span class="balgruf">${capitalize(onTheBlock.name)}</span>'s
            <span class="balgruf">${onTheBlock.votes}</span>
            vote${onTheBlock.votes === 1 ? "" : "s"}.
          </div>
          <div><span class="balgruf">Nobody</span> is on the block.</div>
        </div>
        <div class="buttons">
          ${when(state.getState().currentGame?.nominations?.length, () => b` <botc-disclosure>
                <div slot="label">Log</div>
                <div ui-inlay slot="detail">${renderNominationLog()}</div>
              </botc-disclosure>`)}
          <button ui-button secondary @click=${this.conclude}>
            Conclude nomination
          </button>
        </div>
      `;
		if (onTheBlock && !hasEnough) return b`
        <div ui-inlay class="center">
          <div>
            <span class="balgruf">${currentVotes}</span>
            vote${currentVotes === 1 ? "" : "s"} is not enough to put
            <span class="balgruf">${capitalize(this.nominee.name)}</span> on the
            block.
          </div>
          <div>
            <span class="balgruf">${capitalize(onTheBlock.name)}</span>
            is still on the block with
            <span class="balgruf">${onTheBlock.votes}</span>
            vote${onTheBlock.votes === 1 ? "" : "s"}.
          </div>
        </div>
        <botc-player-details
          .hideGrim=${!this.showRoles}
          .player=${playerOnTheBlock}
        ></botc-player-details>
        <button
          class="execute-btn"
          ui-button
          primary
          @click=${() => this.executePlayer(onTheBlock.id)}
        >
          ${skull} Execute ${capitalize(onTheBlock.name)}
        </button>
        <div class="buttons">
          ${when(stMode, () => b`
              <botc-switch
                id="auth-switch"
                @checked-changed=${({ checked }) => {
			this.toggleHideGrim({
				checked,
				callback: (result) => {
					this.setState((s) => ({
						...s,
						showRoles: result
					}));
					this.shadowRoot.querySelector("#auth-switch").checked = result;
				}
			});
		}}
                ?checked=${this.showRoles}
                >Show Roles</botc-switch
              >
            `)}
          ${when(state.getState().currentGame?.nominations?.length, () => b` <botc-disclosure>
                <div slot="label">Log</div>
                <div ui-inlay slot="detail">${renderNominationLog()}</div>
              </botc-disclosure>`)}
          <button ui-button secondary @click=${this.conclude}>
            Conclude nomination
          </button>
        </div>
      `;
		if (!onTheBlock && hasEnough) return b`
        <div ui-inlay class="center">
          <div>
            <span class="balgruf">${capitalize(this.nominee.name)}</span> is now
            on the block with
            <span class="balgruf">${currentVotes}</span>
            vote${currentVotes === 1 ? "" : "s"}.
          </div>
        </div>
        <botc-player-details
          .hideGrim=${!this.showRoles}
          .player=${playerOnTheBlock}
        ></botc-player-details>
        <button
          class="execute-btn"
          ui-button
          primary
          @click=${() => this.executePlayer(this.nominee.id)}
        >
          ${skull} Execute ${capitalize(this.nominee.name)}
        </button>
        <div class="buttons">
          ${when(stMode, () => b`
              <botc-switch
                id="auth-switch"
                @checked-changed=${({ checked }) => {
			this.toggleHideGrim({
				checked,
				callback: (result) => {
					this.setState((s) => ({
						...s,
						showRoles: result
					}));
					this.shadowRoot.querySelector("#auth-switch").checked = result;
				}
			});
		}}
                ?checked=${this.showRoles}
                >Show Roles</botc-switch
              >
            `)}
          ${when(state.getState().currentGame?.nominations?.length, () => b` <botc-disclosure>
                <div slot="label">Log</div>
                <div ui-inlay slot="detail">${renderNominationLog()}</div>
              </botc-disclosure>`)}
          <button ui-button secondary @click=${this.conclude}>
            Conclude nomination
          </button>
        </div>
      `;
		return b`
      <div ui-inlay class="center">
        <div>
          <span class="balgruf">${capitalize(this.nominee.name)}</span> is now
          on the block with
          <span class="balgruf">${currentVotes}</span>
          vote${currentVotes === 1 ? "" : "s"}.
        </div>
        <div>
          (Beating
          <span class="balgruf">${onTheBlock.name}</span>'s nomination of
          <span class="balgruf">${onTheBlock.votes}</span>
          vote${onTheBlock.votes === 1 ? "" : "s"})
        </div>
      </div>
      <botc-player-details
        .hideGrim=${!this.showRoles}
        .player=${playerOnTheBlock}
      ></botc-player-details>
      <button
        class="execute-btn"
        ui-button
        primary
        @click=${() => this.executePlayer(this.nominee.id)}
      >
        ${skull} Execute ${capitalize(this.nominee.name)}
      </button>
      <div class="buttons">
        ${when(stMode, () => b`
            <botc-switch
              id="auth-switch"
              @checked-changed=${({ checked }) => {
			this.toggleHideGrim({
				checked,
				callback: (result) => {
					this.setState((s) => ({
						...s,
						showRoles: result
					}));
					this.shadowRoot.querySelector("#auth-switch").checked = result;
				}
			});
		}}
              ?checked=${this.showRoles}
              >Show Roles</botc-switch
            >
          `)}
        ${when(state.getState().currentGame?.nominations?.length, () => b` <botc-disclosure>
              <div slot="label">Log</div>
              <div ui-inlay slot="detail">${renderNominationLog()}</div>
            </botc-disclosure>`)}
        <button ui-button secondary @click=${this.conclude}>
          Conclude nomination
        </button>
      </div>
    `;
	}
	conclude() {
		this.#saveNomination();
		this.close();
	}
	#saveNomination() {
		const nominatorId = this.nominator.id;
		const nomineeId = this.nominee.id;
		const votes = this.voted.map((p) => {
			const multiplier = getVoteMultiplier(p);
			if (multiplier === -1) return {
				id: p.id,
				vote: {
					id: "thief",
					value: -1
				}
			};
			if (multiplier === 2) return {
				id: p.id,
				vote: {
					id: "godofug",
					value: 2
				}
			};
			if (multiplier === 3) return {
				id: p.id,
				vote: {
					id: "bureaucrat",
					value: 3
				}
			};
			return p.id;
		});
		const voteIds = votes.map(getVoteId);
		const isNomineeTraveller = this.nominee?.suspectedRole?.type?.toLowerCase() === "traveller";
		const { day } = state.getState().currentGame;
		state.setState((s) => ({
			...s,
			currentGame: {
				...s.currentGame,
				players: s.currentGame.players.map((player) => {
					if (voteIds.includes(player.id) && !!player.dead && !isNomineeTraveller) return {
						...player,
						dead: {
							...player.dead,
							hasDeadVote: false
						}
					};
					return player;
				}),
				nominations: [...s.currentGame.nominations, {
					day,
					nominator: nominatorId,
					nominee: nomineeId,
					votes
				}]
			}
		}));
	}
	executePlayer(playerId) {
		state.setState((s) => ({
			...s,
			currentGame: {
				...s.currentGame,
				players: s.currentGame.players.map((player) => {
					if (player.id === playerId) return {
						...player,
						dead: createExecutionDeadState(s.currentGame.day)
					};
					return player;
				})
			}
		}));
		this.#saveNomination();
		this.close();
	}
};
customElements.define("nomination-step-four", NominationStepFour);
var NominationVirgin = class extends BotcFlowElement {
	static properties = {
		nominator: { type: Object },
		nominee: { type: Object }
	};
	mapStateToProps(state) {
		return {
			nominator: state.nominator,
			nominee: state.nominee
		};
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

      .balgruf {
        font-family: "Balgruf";
        font-size: 1.375rem;
        color: ${main5};
        text-shadow: 1px 1px 2px rgba(0, 0, 0, 1);
        margin: 0;
      }

      .buttons {
        margin-top: auto;
      }

      .txt {
        margin-bottom: 20px;
      }

      .txt-2 {
        margin-top: 12px;
        margin-bottom: 20px;
      }

      .blue {
        color: #45a0f1;
      }

      span.blue {
        color: #45a0f1;
      }

      span.red {
        color: #d9403b;
      }
      span.yellow {
        color: #ffee00;
      }
      span.green {
        color: #a7e16c;
      }
    `
	];
	render() {
		return b`
      <div class="txt">
        Nominee
        <span class="balgruf ${alignment(this.nominee)}"
          >${capitalize(this.nominee.name)}</span
        >
        is the <span class="balgruf blue">Virgin</span>.
      </div>
      <botc-player-details
        class="${this.nominator.suspectedRole?.id}"
        .player=${this.nominator}
      ></botc-player-details>
      <botc-player-details
        class="${this.nominee.suspectedRole?.id}"
        .player=${this.nominee}
      ></botc-player-details>
      <div class="txt-2">
        Would you like to continue the nomination, or execute the nominator?
      </div>
      <div class="buttons">
        <button class="next" ui-button primary @click=${this.next}>
          Continue
        </button>
        <button ui-button secondary @click=${this.executeNominator}>
          Execute nominator
        </button>
      </div>
    `;
	}
	executeNominator() {
		state.setState((state) => ({
			...state,
			currentGame: {
				...state.currentGame,
				players: state.currentGame.players.map((player) => {
					if (player.id === this.nominee.id) return {
						...player,
						tokens: [...player.tokens || [], state.currentGame.tokens.find((token) => token.id === "virgin-No Ability")]
					};
					if (player.id === this.nominator.id) return {
						...player,
						dead: {
							day: state.currentGame.day,
							icon: "virgin",
							id: "virgin",
							type: "Townsfolk",
							humanReadableRole: "Virgin",
							hasDeadVote: true
						}
					};
					return player;
				})
			}
		}));
		this.close();
	}
};
customElements.define("nomination-step-virgin", NominationVirgin);
var NominationGolem = class extends BotcFlowElement {
	static properties = {
		nominator: { type: Object },
		nominee: { type: Object },
		killed: { type: Boolean }
	};
	mapStateToProps(state) {
		return {
			nominator: state.nominator,
			nominee: state.nominee
		};
	}
	connectedCallback() {
		super.connectedCallback();
		state.setState((state) => ({
			...state,
			currentGame: {
				...state.currentGame,
				players: state.currentGame.players.map((player) => {
					if (player.id === this.nominator.id && !player.tokens?.some((t) => t.id === "golem-May Not Nominate")) return {
						...player,
						tokens: [...player.tokens || [], {
							id: `golem-May Not Nominate`,
							role: "golem",
							label: "May Not Nominate",
							icon: "golem",
							type: "Townsfolk",
							humanReadableRole: "Golem"
						}]
					};
					return player;
				})
			}
		}));
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

      .balgruf {
        font-family: "Balgruf";
        font-size: 1.375rem;
        color: ${main5};
        text-shadow: 1px 1px 2px rgba(0, 0, 0, 1);
        margin: 0;
      }

      .buttons {
        margin-top: auto;
      }

      .txt {
        margin-bottom: 20px;
      }

      .txt-2 {
        margin-top: 12px;
        margin-bottom: 20px;
      }

      .blue {
        color: #45a0f1;
      }

      span.blue {
        color: #45a0f1;
      }

      span.red {
        color: #d9403b;
      }
      span.yellow {
        color: #ffee00;
      }
      span.green {
        color: #a7e16c;
      }
    `
	];
	render() {
		const nominee = state.getState().currentGame?.players.find((p) => p.id === this.nominee?.id);
		const text = this.nominee?.suspectedRole?.type?.toLowerCase() === "demon" ? b`<span class="balgruf">IS</span> the Demon.` : b`<span class="balgruf">IS NOT</span> the Demon.`;
		return b`
      <div class="txt">
        Nominee
        <span class="balgruf ${alignment(this.nominator)}"
          >${capitalize(this.nominator.name)}</span
        >
        is the <span class="balgruf blue">Golem</span>. <br /><br />
        <span class="balgruf ${alignment(this.nominee)}"
          >${capitalize(this.nominee.name)}</span
        >
        ${text}
      </div>
      <botc-player-details
        class="${this.nominator.suspectedRole?.id}"
        .player=${this.nominator}
      ></botc-player-details>
      <botc-player-details
        class="${this.nominee.suspectedRole?.id}"
        .player=${nominee}
      ></botc-player-details>
      ${this.killed ? b`<div class="txt-2 red">The nomination continues.</div>` : b`<div class="txt-2">Would you like to kill the nominee?</div>`}

      <div class="buttons">
        <button
          ?disabled=${this.killed}
          ui-button
          primary
          @click=${this.executeNominator}
        >
          Kill nominee
        </button>
        <button class="next" ui-button secondary @click=${this.next}>
          Continue
        </button>
      </div>
    `;
	}
	executeNominator() {
		this.killed = true;
		state.setState((state) => ({
			...state,
			currentGame: {
				...state.currentGame,
				players: state.currentGame.players.map((player) => {
					if (player.id === this.nominee.id) return {
						...player,
						dead: {
							day: state.currentGame.day,
							icon: "golem",
							id: "golem",
							type: "Townsfolk",
							humanReadableRole: "Golem",
							hasDeadVote: true
						}
					};
					return player;
				})
			}
		}));
	}
};
customElements.define("nomination-step-golem", NominationGolem);
var NominationWitched = class extends BotcFlowElement {
	static properties = { nominator: { type: Object } };
	mapStateToProps(state) {
		return { nominator: state.nominator };
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

      .balgruf {
        font-family: "Balgruf";
        font-size: 1.375rem;
        color: ${main5};
        text-shadow: 1px 1px 2px rgba(0, 0, 0, 1);
        margin: 0;
      }

      .buttons {
        margin-top: auto;
      }

      .txt {
        margin-bottom: 20px;
      }

      .txt-2 {
        margin-top: 12px;
        margin-bottom: 20px;
      }

      .red {
        color: #d9403b;
      }

      span.blue {
        color: #45a0f1;
      }

      span.red {
        color: #d9403b;
      }
      span.yellow {
        color: #ffee00;
      }
      span.green {
        color: #a7e16c;
      }
    `
	];
	render() {
		return b`
      <div class="txt">
        Nominator
        <span class="balgruf ${alignment(this.nominator)}"
          >${capitalize(this.nominator.name)}</span
        >
        is <span class="balgruf red">witch cursed</span>.
      </div>
      <botc-player-details
        class="${this.nominator.suspectedRole?.id}"
        .player=${this.nominator}
      ></botc-player-details>
      <div class="txt-2">Would you like to kill the nominator?</div>
      <div class="buttons">
        <button class="next" ui-button primary @click=${this.executeNominator}>
          Kill and continue
        </button>
        <button class="next" ui-button secondary @click=${this.next}>
          Continue without killing
        </button>
        <button ui-button secondary @click=${this.close}>Close</button>
      </div>
    `;
	}
	executeNominator() {
		state.setState((state) => ({
			...state,
			currentGame: {
				...state.currentGame,
				players: state.currentGame.players.map((player) => {
					if (player.id === this.nominator.id) return {
						...player,
						tokens: player.tokens.filter((token) => token?.id?.toLowerCase?.() !== "witch-cursed"),
						dead: {
							day: state.currentGame.day,
							icon: "witch",
							id: "witch",
							type: "Minion",
							humanReadableRole: "witch",
							hasDeadVote: true
						}
					};
					return player;
				})
			}
		}));
		this.next();
	}
};
customElements.define("nomination-step-witch", NominationWitched);
function getVotesRequired(nomineeId, nominatorId) {
	const gameData = state.getState().currentGame;
	const allPlayers = gameData.players;
	const alivePlayers = gameData.players.filter((p) => !p.dead).length;
	const baseVotes = Math.ceil(alivePlayers / 2);
	const currentDay = gameData.day;
	const todaysNominations = (gameData.nominations || []).filter((n) => !(n.nominee === nomineeId && n.nominator === nominatorId && n.day === currentDay)).filter((n) => n.day === currentDay);
	let votesRequired = baseVotes;
	if (todaysNominations.length > 0) {
		const highestVoteCount = Math.max(...todaysNominations.map((n) => getNominationVoteCount(n, allPlayers)));
		if (highestVoteCount >= baseVotes) votesRequired = highestVoteCount + 1;
	}
	return votesRequired;
}
function hasEnoughVotesForExecution(voted, nomineeId, nominatorId) {
	const allPlayers = state.getState().currentGame.players;
	return calculateEffectiveVoteCount(voted.map((p) => p.id), allPlayers) >= getVotesRequired(nomineeId, nominatorId);
}
var nomination_default = (s) => {
	return {
		title: "Nomination",
		initialStep: s?.initialStep ?? "nominator",
		initialState: {
			kind: settings.getState().nominationFlowKind || "default",
			nrOfVotes: 0,
			nominator: null,
			nominee: null,
			voted: [],
			showRoles: state.getState().currentGame?.stMode ? false : true,
			...s
		},
		steps: [
			{
				id: "nominator",
				title: "Nominator",
				render: ({ nominator, showRoles }) => b`<nomination-step-one
            .showRoles=${showRoles}
            .nominator=${nominator}
          ></nomination-step-one>`
			},
			{
				id: "witch",
				title: "Witch",
				condition: ({ nominator }) => {
					return nominator?.tokens.some((t) => t?.id?.toLowerCase?.() === "witch-cursed") && state.getState().currentGame?.stMode;
				},
				render: ({ nominator }) => {
					return b`<nomination-step-witch
            .nominator=${nominator}
          ></nomination-step-witch>`;
				}
			},
			{
				id: "nominee",
				title: "Nominee",
				render: ({ nominee, nominator, showRoles }) => {
					return b`
            <nomination-step-two
              .nominee=${nominee}
              .nominator=${nominator}
              .showRoles=${showRoles}
            ></nomination-step-two>
          `;
				}
			},
			{
				id: "golem",
				title: "Golem",
				condition: ({ nominator }) => nominator?.suspectedRole?.id === "golem",
				render: ({ nominator, nominee }) => {
					return b`<nomination-step-golem
            .nominator=${nominator}
            .nominee=${nominee}
          ></nomination-step-golem>`;
				}
			},
			{
				id: "virgin",
				title: "Virgin",
				condition: ({ nominee }) => {
					if (!(nominee?.suspectedRole?.id === "virgin")) return false;
					return !nominee?.tokens.some((t) => t?.id?.toLowerCase?.() === "virgin-no ability") && !!state.getState().currentGame?.stMode;
				},
				render: ({ nominee, nominator }) => {
					return b`<nomination-step-virgin
            .nominee=${nominee}
            .nominator=${nominator}
          ></nomination-step-virgin>`;
				}
			},
			{
				title: "Votes",
				condition: ({ kind }) => kind === "minimal",
				render: ({ voted, nominator, nrOfVotes, nominee, showRoles }) => {
					return b`
            <nomination-step-votes-minimal
              .nrOfVotes=${nrOfVotes}
              .nominator=${nominator}
              .nominee=${nominee}
              .voted=${voted}
              .showRoles=${showRoles}
            ></nomination-step-votes-minimal>
          `;
				}
			},
			{
				id: "votes",
				title: "Votes",
				condition: ({ kind }) => kind === "default",
				render: ({ voted, nominator, nominee, showRoles }) => {
					return b`
            <nomination-step-three
              .nominator=${nominator}
              .nominee=${nominee}
              .voted=${voted}
              .showRoles=${showRoles}
            ></nomination-step-three>
          `;
				}
			},
			{
				id: "result",
				title: ({ voted, nominee, nominator }) => {
					const allPlayers = state.getState()?.currentGame?.players || [];
					const onTheBlock = getOnTheBlock();
					const hasEnough = hasEnoughVotesForExecution(voted, nominee?.id, nominator?.id);
					const currentVotes = calculateEffectiveVoteCount(voted.map((p) => p.id), allPlayers);
					let result;
					if (onTheBlock && !hasEnough && currentVotes === onTheBlock.votes) result = "Tie";
					else if (!onTheBlock && !hasEnough) result = "Not enough votes";
					else if (onTheBlock && !hasEnough) result = "Not enough votes";
					else if (!onTheBlock && hasEnough) result = "Result";
					else if (onTheBlock && hasEnough) result = "Beat";
					else result = "Result";
					return result;
				},
				render: ({ voted, nominator, nominee, showRoles }) => {
					return b`
            <nomination-step-four
              .nominator=${nominator}
              .nominee=${nominee}
              .voted=${voted}
              .showRoles=${showRoles}
            ></nomination-step-four>
          `;
				}
			}
		]
	};
};
//#endregion
export { nomination_default as default };
