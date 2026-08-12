import { A as i, I as i$1, P as b, b as main4, d as bg9, f as border, g as elevation4, i as bg2, s as bg5, t as when, u as bg8 } from "./CY602n9t.js";
import { I as images, T as nightOrder, d as alignment, k as traveller, m as capitalize, n as settings, r as state } from "./CP0hEE1l.js";
import "./vIOCOudq.js";
import { z as deadVote } from "./CEyrKUT7.js";
import { t as inlay } from "./Ue9OS-EJ.js";
//#region src/components/botc-player-details.js
var BotcPlayerDetails = class extends i {
	static properties = {
		player: { type: Object },
		selected: { type: Boolean },
		ability: { type: Boolean },
		showNightOrder: { type: Boolean },
		hideGrim: { type: Boolean },
		showRole: { type: Boolean },
		dimUsedDeadVote: {
			type: Boolean,
			reflect: true
		},
		noDimDead: {
			type: Boolean,
			reflect: true
		}
	};
	constructor() {
		super();
		this.showNightOrder = false;
		this.selected = false;
		this.player = {};
		this.ability = false;
		this.hideGrim = false;
		this.showRole = false;
		this.dimUsedDeadVote = false;
		this.noDimDead = false;
		this.callRequestUpdate = this.callRequestUpdate.bind(this);
	}
	static styles = [inlay, i$1`
      :host {
        display: flex;
        flex-direction: column;
        align-items: stretch;
        border: solid 1px ${border};
        background: ${bg5};
        padding: 8px;
        border-radius: 8px;
        box-sizing: border-box;
        margin-bottom: 12px;
        transition: background 0.2s;
        ${elevation4()}/* margin-bottom: 12px; */
      }

      :host([selected]) {
        padding: 7px;
      }

      :host:not(:last-child) {
        margin-bottom: 12px;
      }

      :host([dimUsedDeadVote]) {
        opacity: 0.5;
      }

      .player-details {
        flex: 1;
        position: relative;
        margin-left: 8px;
        display: flex;
        align-items: center;
        flex-direction: row;
      }

      .human-readable-name {
        margin-top: 0;
        font-size: 0.9rem;
        margin-bottom: 4px;
      }

      .human-readable-name-2 {
        margin-top: 0;
        font-size: 0.75rem;
        margin-bottom: 4px;
      }

      h2.player-name {
        display: flex;
        color: ${main4};
        font-family: "Balgruf";
        font-size: 1.375rem;
        text-shadow: 1px 1px 2px rgba(0, 0, 0, 1);
      }

      h2.player-name span {
        flex: 1;
        display: flex;
        align-items: center;
      }

      .player-details-name {
        display: flex;
        flex: 1;
        flex-direction: column;
      }

      .dead {
        filter: grayscale(100%);
      }

      .double-claim {
        color: red;
      }

      .players .item-wrapper .player-details {
        flex: 1;
        position: relative;
        margin-left: 8px;
        display: flex;
        align-items: center;
        flex-direction: row;
      }

      img {
        margin-right: 20px;
        width: 50px;
        height: 50px;
        border-radius: 50%;
        border: solid 2px ${bg9};
        background-color: ${bg8};
      }

      img.blue {
        border: solid 2px #45a0f1;
      }
      h2.blue {
        color: #45a0f1;
      }

      img.red {
        border: solid 2px #d9403b;
      }
      h2.red {
        color: #d9403b;
      }
      h2.yellow {
        color: #ffee00;
      }
      h2.green {
        color: #a7e16c;
      }
      img.yellow {
        border: solid 2px #ffee00;
      }
      img.green {
        border: solid 2px #a7e16c;
      }
      .players li.confirmed h2 {
        color: #45a0f1;
      }

      .dead-token {
        position: absolute;
        width: 25px;
        height: 25px;
        top: -4px;
        left: 34px;
        z-index: 9;
        box-shadow: 1px 1px 2px 1px rgba(0, 0, 0, 0.75);
      }

      img.dead-token {
        border: solid 2px ${border};
      }
      img.dead-token.red {
        border: solid 2px #d9403b;
      }
      img.dead-token.blue {
        border: solid 2px #45a0f1;
      }

      .player-details-images {
        display: flex;
        align-items: center;
        position: relative;
      }

      h2.dead {
        color: ${bg2};
      }

      .token-wrapper {
        display: flex;
        align-items: center;
        flex-direction: column;
        margin-right: 6px;
      }

      .status-token {
        box-shadow: 1px 1px 2px 1px rgba(0, 0, 0, 0.75);
        width: 25px;
        margin: 0;
        height: 25px;
      }

      .token-label {
        font-size: 0.5rem;
        font-weight: 300;
        font-family: "Poppins";
        text-shadow: none;
        color: white;
        margin-top: 4px;
      }

      .status-token:last-child {
        margin-right: 0;
      }

      div.dead-vote {
        display: flex;
        font-size: 0.625rem;
        text-align: center;
        width: 12px;
        height: 12px;
        border: solid 2px var(--ui-bg-9);
        border-radius: 50%;
        position: absolute;
        z-index: 8;
        background: var(--ui-bg-8);
        justify-content: center;
        align-items: center;
        font-variant-numeric: tabular-nums;
        left: -8px;
        top: 20px;
      }

      div.dead-vote svg {
        width: 8px;
        height: 8px;
      }

      div.voted-symbol {
        left: -8px;
        top: 32px;
      }

      img.no-role.dead {
        border: solid 2px #45a0f1;
      }

      .tokens {
        display: flex;
        align-items: center;
        margin-right: 8px;
        margin-left: 8px;
      }

      .player-name {
        margin: 0;
      }

      ul li:last-of-type {
        margin-bottom: 40px;
      }

      :host([selected]) {
        border: solid 2px rgb(112, 210, 125);
        background: #4c564d;
      }

      :host([me]) {
        border: solid 2px rgb(112, 210, 125);
        background: #4c564d;
      }

      p.ability {
        font-size: 0.75rem;
      }

      div.player-night-order {
        display: flex;
        font-size: 0.625rem;
        text-align: center;
        width: 12px;
        height: 12px;
        border: solid 2px var(--ui-bg-9);
        border-radius: 50%;
        position: absolute;
        bottom: -7px;
        z-index: 99999;
        left: 20px;
        background: var(--ui-bg-8);
        justify-content: center;
        align-items: center;
        font-variant-numeric: tabular-nums;
      }

      botc-image {
        width: 54px;
        height: 54px;
        margin-right: 20px;
      }

      :host:has(.dead-opa-list) {
        opacity: 0.45;
        filter: brightness(0.9);
        transition:
          opacity 0.3s,
          filter 0.3s;
      }
    `];
	connectedCallback() {
		super.connectedCallback();
		state.addEventListener("state-changed", this.callRequestUpdate);
	}
	callRequestUpdate() {
		this.requestUpdate();
	}
	disconnectedCallback() {
		super.disconnectedCallback();
		state.removeEventListener("state-changed", this.callRequestUpdate);
	}
	render() {
		const nightOrderNr = nightOrder(this.player);
		return b`
      <div
        class="player-details ${this.player?.dead?.id && !this.noDimDead ? "dead-opa-list" : ""}"
      >
        <div class="player-details-images">
          ${when(!this.hideGrim && this.showNightOrder && !!nightOrderNr, () => b`
              <div class="player-night-order">
                ${this.player.me && nightOrderNr && !this.showRole ? "?" : nightOrderNr}
              </div>
            `)}

          <botc-image
            .hide=${this.hideGrim}
            .player=${this.player}
          ></botc-image>

          ${when(!this.player.dead && !this.hideGrim, () => b`
              ${when(state?.currentGame?.nominations?.some((n) => {
			return n.day === state.currentGame.day && n.nominator === this.player.id;
		}), () => b` <div title="Nominated" class="dead-vote">N</div> `)}
            `)}
          ${when(!this.hideGrim, () => b`
              ${when(state?.currentGame?.nominations?.some((n) => {
			return n.day === state.currentGame.day && n.votes.includes(this.player.id);
		}), () => b`
                  <div title="Voted" class="dead-vote voted-symbol">V</div>
                `)}
            `)}
          ${when(this.player.dead, () => b`
              ${when(this.player?.dead?.hasDeadVote, () => b`
                  <div title="Dead vote" class="dead-vote">${deadVote}</div>
                `)}
              <img
                class="dead-token ${!this.hideGrim ? `${alignment(this.player.dead.type)} ${traveller(this.player)}` : ""}"
                src="${this.hideGrim ? images.any("dead") : images.any(this.player.dead.icon)} "
              />
            `)}
        </div>
        <div class="player-details-name">
          <h2
            class="${!this.hideGrim && this.player.suspectedRole?.type ? this.player.me ? alignment(this.player) : `${alignment(this.player)} ${traveller(this.player)}` : ""} 
               player-name"
          >
            <span>${capitalize(this.player.name)}</span>
          </h2>
          ${when(!this.hideGrim && this.player.suspectedRole && this.player.me && this.showRole, () => b`<p class="human-readable-name">
                ${this.player.suspectedRole.humanReadableRole}
              </p>`)}
          ${when(!this.hideGrim && this.player.suspectedRole && !this.player.me, () => b`<p class="human-readable-name">
                ${this.player.suspectedRole.humanReadableRole}
              </p>`)}
          ${when(!this.hideGrim && this.player.claims?.length, () => b`
              <p class="human-readable-name-2">
                <b>Claims:</b>
                ${this.player?.claims?.map((r, i) => {
			const isDoubleClaim = state.getState().currentGame.players.some((p) => p !== this.player && p.claims.some((c) => c.humanReadableRole === r.humanReadableRole));
			const { highlightDoubleClaims } = settings.getState();
			return b`
                    <span
                      class="${highlightDoubleClaims && isDoubleClaim ? "double-claim" : ""}"
                      >${r.humanReadableRole}</span
                    >${i === this.player.claims.length - 1 ? "" : ","}
                  `;
		})}
              </p>
            `)}
        </div>
        <div class="tokens">
          ${!this.hideGrim ? this.player.tokens?.map((token) => {
			return b`
                    <div class="token-wrapper">
                      <img
                        class="status-token ${alignment(token.type)}"
                        src="${images.any(token.icon)}"
                        alt="${token.humanReadableRole + " " + token.label}"
                        title="${token.humanReadableRole + " " + token.label}"
                      />
                      <div class="token-label">${token.label}</div>
                    </div>
                  `;
		}) : ""}
        </div>
        <slot name="menu"></slot>
      </div>
      ${when(this.ability && !this.hideGrim, () => b`
          <p ui-inlay class="ability">${this.player.suspectedRole?.summary}</p>
        `)}
    `;
	}
};
customElements.define("botc-player-details", BotcPlayerDetails);
//#endregion
