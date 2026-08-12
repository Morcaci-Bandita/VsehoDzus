import { A as i, I as i$1, P as b, d as bg9, f as border, g as elevation4, s as bg5, t as when, u as bg8, v as header, x as main5 } from "./CY602n9t.js";
import { I as images, b as img, d as alignment, m as capitalize, n as settings, r as state } from "./CP0hEE1l.js";
import { i as debounceAtTimeout } from "./vIOCOudq.js";
import { t as button } from "./CbFrBy7s.js";
import { t as input } from "./_hTQLwBE.js";
import "./DPxjp5Y3.js";
import "./CXEVaKnf2.js";
import "./B1OborLG.js";
//#region src/pages/player.js
const updateNotes = (player, notes) => {
	state.setState((s) => ({
		...s,
		currentGame: {
			...s.currentGame,
			players: s.currentGame.players.map((p) => p.id === player.id ? {
				...p,
				notes
			} : p)
		}
	}));
};
const debouncedUpdateNotes = debounceAtTimeout(updateNotes, 500);
const question = new URL(new URL("AIEPPNGg.png", import.meta.url).href).pathname;
var BotcPlayer = class extends i {
	static properties = {
		player: { type: Object },
		showRole: { type: Boolean },
		voteOverview: { type: Object },
		conversationOverview: { type: Object }
	};
	constructor() {
		super();
		this.showRole = false;
		this.player = {};
		this.voteOverview = {};
		this.conversationOverview = {};
	}
	firstUpdated() {
		this.voteOverview = createVoteOverview(this.player);
		this.conversationOverview = createConversationOverview(this.player);
	}
	static styles = [
		header,
		input,
		button,
		i$1`
      :host {
        display: block;
        height: 100%;
        margin-left: 12px;
        margin-right: 12px;
      }

      h2 {
        font-family: "Balgruf";
        font-size: 1.375rem;
        color: ${main5};
        text-shadow: 1px 1px 2px rgba(0, 0, 0, 1);
      }

      h3 {
        /* font-weight: 700; */
      }

      ul {
        list-style-type: none;
        padding: 0;
      }

      .card-thing {
        border-radius: 4px;
        padding: 8px;
        display: flex;
        align-items: center;
        background: ${bg5};
        border: solid 1px ${border};
        ${elevation4()}
      }

      .card-thing img {
        margin-right: 16px;
        width: 50px;
        height: 50px;
        border-radius: 50%;
        border: solid 2px ${bg9};
        background-color: ${bg8};
      }

      .claims li {
        margin-bottom: 12px;
      }
      /* 
      .day-votes {
        list-style: disc; 
        padding-left: 20px;
      } */

      botc-card {
        margin-bottom: 24px;
      }

      .day-votes li:not(:last-child) {
        border-bottom: solid 1px var(--ui-border);
        padding-bottom: 8px;
        margin-bottom: 8px;
      }

      .voted {
        color: rgb(112, 210, 125);
        font-weight: 700;
      }

      .nominated {
        color: rgb(112, 210, 125);
      }

      .blue {
        color: #45a0f1;
      }

      .red {
        color: #d9403b;
      }

      botc-card {
        font-size: 0.9rem;
      }

      .description {
        font-size: 0.75rem;
      }

      .card-thing div p {
        margin-top: 4px;
        margin-bottom: 4px;
      }

      img.blue {
        border: solid 2px #45a0f1;
      }

      img.red {
        border: solid 2px #d9403b;
      }

      .blue {
        color: #45a0f1;
      }

      .red {
        color: #d9403b;
      }

      .conversation-name {
        font-weight: 700;
      }

      textarea {
        resize: none;
      }

      .notes {
        display: flex;
        flex-direction: column;
      }

      .notes h2 {
        margin-top: 0;
      }

      .death {
        margin-bottom: 16px;
      }

      .tokens {
        display: flex;
        justify-content: center;
      }

      .token {
        display: flex;
        flex-direction: column;
        align-items: center;
        margin-bottom: 8px;
        margin-right: 20px;
      }

      .token img {
        width: 50px;
        height: 50px;
        border-radius: 50%;
        border: solid 2px ${border};
        box-shadow: 1px 1px 2px 1px rgba(0, 0, 0, 0.75);
      }

      .token img.red {
        border: solid 2px #d9403b;
      }
      .token img.blue {
        border: solid 2px #45a0f1;
      }

      .tokens p {
        margin-top: 8px;
        font-size: 0.9rem;
      }

      .suspected-role .card-thing {
        padding-top: 16px;
        padding-bottom: 16px;
        flex-direction: column;
      }

      .suspected-role img {
        width: 75px;
        height: 75px;
        margin-right: 0;
      }

      .suspected-role .suspected-role-title {
        font-weight: 700;
        margin-top: 8px;
        text-align: center;
        margin-bottom: 12px;
      }

      .suspected-role .description {
        text-align: center;
      }

      .navigation {
        display: flex;
        justify-content: space-between;
      }

      .navigation button[ui-button][secondary] {
        box-shadow: unset;
        border: unset;
        justify-content: center;
        align-items: center;
        display: flex;
        font-weight: 300;
        color: white;
        fill: white;
        width: unset;
        font-family: "Poppins", sans-serif;
        padding: 8px;
        margin-top: 6px;
      }

      .navigation button[ui-button][secondary] svg {
        fill: white;
      }

      .navigation button[ui-button][secondary] > *:first-child {
        /* Your styles here */
        margin-right: 6px;
      }

      .navigation button[ui-button][secondary]:hover {
        box-shadow: unset;
        border: unset;
      }
    `
	];
	render() {
		return b`
      <botc-back-button href="/"></botc-back-button>
      <h1 header>${capitalize(this.player.name)}</h1>
      <div class="suspected-role">
        <h2>
          ${when(this.player.me || state.getState()?.currentGame?.stMode, () => "Role", () => "Suspected role")}
        </h2>
        ${when(this.player.suspectedRole?.id, () => b`
            <div class="card-thing">
              ${when(this.player.me && !this.showRole, () => b`
                  <img class="blue" src="${question}" alt="Unknown" />
                  <div>
                    <p class="suspected-role-title">?</p>
                    <p class="description">???</p>
                  </div>
                `)}
              ${when(!this.player.me || this.player.me && this.showRole, () => b`
                  <img
                    class=${alignment(this.player.suspectedRole.type)}
                    src="${img(this.player.suspectedRole)}"
                    alt="${this.player.suspectedRole.humanReadableRole}"
                  />
                  <div>
                    <p class="suspected-role-title">
                      ${this.player.suspectedRole.humanReadableRole}
                    </p>
                    <p class="description">
                      ${this.player.suspectedRole.summary}
                    </p>
                  </div>
                `)}
            </div>
          `)}
        ${when(this.player.me && this.player.suspectedRole?.id, () => b`<button
              ui-button
              secondary
              @click=${() => {
			this.showRole = !this.showRole;
		}}
            >
              ${this.showRole ? "Hide" : "Show"} role
            </button>`)}
      </div>
      <div>
        <h2>Claims</h2>
        <ul class="claims">
          ${this.player.claims.map((claim) => b`
              <li>
                <div class="card-thing">
                  <img
                    class=${alignment(claim.type)}
                    src="${img(claim)}"
                    alt="${claim.humanReadableRole}"
                  />
                  <div>
                    <p>${claim.humanReadableRole}</p>
                    <p class="description">${claim.summary}</p>
                  </div>
                </div>
              </li>
            `)}
        </ul>
      </div>
      <div>
        <h2>Tokens</h2>
        <ul class="tokens">
          ${this.player.tokens.map((token) => b`
              <li class="token">
                <img
                  class="${alignment(token.type)}"
                  src="${images.any(token.icon)}"
                  alt="${token.humanReadableRole + " " + token.label}"
                  title="${token.humanReadableRole + " " + token.label}"
                />
                <p>${token.label}</p>
              </li>
            `)}
        </ul>
      </div>
      ${when(this.player.dead, () => b`
          <div class="death">
            <h2>Killed by</h2>
            <div class="card-thing">
              <img
                class=${alignment(this.player.dead.type)}
                src="${img({ icon: this.player.dead.icon })}"
                alt="${this.player.dead.humanReadableRole}"
              />
              <div>
                <p>${this.player.dead.humanReadableRole}</p>
                <p class="description">
                  On day:
                  ${this.player.dead.day + (state.getState()?.currentGame?.stMode ? 0 : 1)}
                </p>
              </div>
            </div>
          </div>
        `)}
      <div class="notes">
        <h2>Notes</h2>
        <textarea
          .value=${this.player.notes}
          @input=${(e) => {
			debouncedUpdateNotes(this.player, e.target.value);
		}}
          ui-input
          rows="5"
        ></textarea>
      </div>
      <div>
        <h2>Status</h2>
        <botc-switch
          @checked-changed=${({ checked }) => {
			this.toggle("confirmed", checked);
		}}
          ?checked=${this.player.confirmed}
          >Confirm</botc-switch
        >
      </div>
      ${when(settings.getState().voteTracking, () => b`
          <div>
            <h2>Votes</h2>
            <ul>
              ${Object.keys(this.voteOverview).filter((day) => this.voteOverview[day].some((nomination) => nomination.involvedCurrentPlayer)).map((day) => b`
                    <li>
                      <botc-card label="Day ${Number(day) + 1}">
                        <ul class="day-votes">
                          ${this.voteOverview[day].map((nomination) => nomination.involvedCurrentPlayer ? b`
                                  <li>
                                    <div>
                                      <b
                                        class="${nomination?.nominator?.me ? "blue" : alignment(nomination?.nominator?.suspectedRole?.type)}"
                                        >${capitalize(nomination.nominator.name)}</b
                                      >
                                      nominated:
                                      <b
                                        class=${nomination?.nominee?.me ? "blue" : alignment(nomination?.nominee?.suspectedRole?.type)}
                                        >${capitalize(nomination.nominee.name)}</b
                                      >${when(nomination.didVote, () => b`:
                                            <span class="voted">voted</span>`)}
                                      <div>
                                        Votes:
                                        ${nomination.votes.map((vote, i) => b`
                                            <span
                                              class="conversation-name ${vote.me ? "blue" : alignment(vote?.suspectedRole?.type)}"
                                              >${capitalize(vote.name)}</span
                                            >${i < nomination.votes.length - 1 ? "," : ""}
                                          `)}
                                      </div>
                                    </div>
                                  </li>
                                ` : "")}
                        </ul>
                      </botc-card>
                    </li>
                  `)}
            </ul>
          </div>
        `)}
      ${when(settings.getState().conversationTracking, () => b`
          <div>
            <h2>Conversations</h2>
            <ul>
              ${Object.keys(this.conversationOverview).map((day) => b`
                  <li>
                    <botc-card label="Day ${Number(day) + 1}">
                      <ul class="day-votes">
                        ${this.conversationOverview[day].map((participants) => b`
                            <li>
                              ${participants.map((p, i) => b`
                                  <span
                                    class="conversation-name ${p.me ? "blue" : alignment(p.type)}"
                                    >${p.name}</span
                                  >${i < participants.length - 1 ? "," : ""}
                                `)}
                            </li>
                          `)}
                      </ul>
                    </botc-card>
                  </li>
                `)}
            </ul>
          </div>
        `)}
    `;
	}
	toggle(kind, checked) {
		this.player[kind] = checked;
		state.setState((s) => ({
			...s,
			currentGame: {
				...s.currentGame,
				players: s.currentGame.players.map((p) => p.id === this.player.id ? this.player : p)
			}
		}));
	}
};
customElements.define("botc-player", BotcPlayer);
const getPlayerById = (id) => state.getState().currentGame.players.find((player) => player.id === id);
function createVoteOverview(player) {
	const results = {};
	state.getState().currentGame.nominations.forEach((nomination) => {
		if (!results[nomination.day]) results[nomination.day] = [];
		results[nomination.day].push({
			involvedCurrentPlayer: nomination.nominator === player.id || nomination.nominee === player.id || nomination.votes.some((vote) => vote === player.id),
			didNominate: nomination.nominator === player.id,
			didVote: nomination.votes.some((vote) => vote === player.idcapital),
			nominator: getPlayerById(nomination.nominator),
			nominee: getPlayerById(nomination.nominee),
			votes: nomination.votes.map((vote) => getPlayerById(vote))
		});
	});
	return results;
}
function createConversationOverview(player) {
	const results = {};
	state.getState().currentGame.conversations.forEach((conversation) => {
		if (conversation.participants.includes(player.id)) {
			if (!results[conversation.day]) results[conversation.day] = [];
			results[conversation.day].push(conversation.participants.map((participant) => {
				if (participant === "x") return {
					me: false,
					type: "",
					name: "Storyteller"
				};
				const player = getPlayerById(participant);
				return {
					me: player.me,
					type: player.suspectedRole?.type,
					name: capitalize(player.name)
				};
			}));
		}
	});
	return results;
}
//#endregion
export { BotcPlayer };
