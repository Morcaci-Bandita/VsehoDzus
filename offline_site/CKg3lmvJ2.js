import { A as i, I as i$1, P as b, _ as focus, c as bg6, d as bg9, f as border, g as elevation4, s as bg5, u as bg8 } from "./CY602n9t.js";
import { M as SCRIPTS_DATA, N as SORT_ORDER, b as img, d as alignment, l as SAO, r as state } from "./CP0hEE1l.js";
import { o as waitUntil } from "./vIOCOudq.js";
import { t as button } from "./CbFrBy7s.js";
import { t as dialog } from "./Dm27KaR0.js";
import { t as input } from "./_hTQLwBE.js";
//#region src/components/dialog/set-role.js
var BotcSetRole = class extends i {
	static properties = {
		player: { type: Number },
		script: { type: Object },
		roles: { type: Array },
		more: { type: Array },
		travellers: { type: Array }
	};
	constructor() {
		super();
		this.player = {};
		this.script = {};
		this.roles = [];
		this.more = [];
		this.travellers = [];
	}
	async connectedCallback() {
		super.connectedCallback();
		const script = state.getState().currentGame.script;
		const travellers = state.getState().currentGame.travellers;
		if (this.all) this.roles = Object.values(window.rolesById).filter((role) => role.id !== "minioninfo" && role.id !== "demoninfo").sort((a, b) => {
			return SORT_ORDER.indexOf(a.type.toLowerCase()) - SORT_ORDER.indexOf(b.type.toLowerCase());
		});
		else {
			this.script = await SCRIPTS_DATA[script]();
			this.roles = [
				...this.script.townsfolk,
				...this.script.outsider,
				...this.script.minion,
				...this.script.demon,
				...travellers ? this.script?.traveller ?? [] : []
			].filter((r) => r.id !== "minioninfo" && r.id !== "demoninfo");
		}
		const all = [...Object.values(rolesById)];
		this.more = all.filter((role) => !this.roles.some((r) => r.id === role.id) && role.type?.toLowerCase() !== "traveller" && role.id !== "minioninfo" && role.id !== "demoninfo" && role.type?.toLowerCase() !== "fabled" && role.type?.toLowerCase() !== "loric").sort((a, b) => SORT_ORDER.indexOf(a.type.toLowerCase()) - SORT_ORDER.indexOf(b.type.toLowerCase()));
		this.travellers = all.filter((role) => role.type?.toLowerCase() === "traveller");
	}
	static styles = [
		button,
		input,
		i$1`
      botc-disclosure {
        background-color: ${bg6};
      }

      botc-disclosure::part(button) {
        padding-top: 16px;
        padding-bottom: 16px;
      }
      img {
        width: 50px;
        height: 50px;
        border-radius: 50%;
        border: solid 2px ${bg9};
        background-color: ${bg8};
        margin-right: 10px;
      }

      ul {
        list-style: none;
        padding: 0;
      }

      ul li.role {
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

      ul li.role:focus-within {
        ${focus()}
      }

      ul li.role:focus-within:not(.selected) {
        background: var(--ui-bg-4);
      }

      @media (hover: hover) and (pointer: fine) {
        ul li.role:not(.selected):hover {
          background: var(--ui-bg-4);
        }
      }

      ul li.role button {
        all: unset;
        flex: 1;
        display: flex;
        align-items: center;
      }

      ul li.role.selected {
        border: solid 2px rgb(112, 210, 125);
        background: #4c564d;
        padding: 7px;
      }

      .clear {
        display: flex;
        margin-bottom: 10px;
      }

      img.blue {
        border: solid 2px #45a0f1;
      }
      img.red {
        border: solid 2px #d9403b;
      }
      img.yellow {
        border: solid 2px #ffee00;
      }
      img.green {
        border: solid 2px #a7e16c;
      }

      .balgruf {
        font-size: 1.375rem;
        font-family: "Balgruf";
        color: var(--ui-main-5);
        text-shadow: 1px 1px 2px rgba(0, 0, 0, 1);
        margin: 0;
      }

      .balgruf.blue {
        color: #45a0f1;
      }
      .balgruf.red {
        color: #d9403b;
      }
      .balgruf.yellow {
        color: #ffee00;
      }
      .balgruf.green {
        color: #a7e16c;
      }
      .balgruf.orange {
        color: var(--ui-main-5);
      }

      .already-in-play img.blue,
      .already-in-play img.red,
      .already-in-play img.yellow,
      .already-in-play img.green,
      .bluff img.blue,
      .bluff img.red,
      .bluff img.yellow,
      .bluff img.green {
        border: solid 2px var(--ui-bg-2);
        filter: grayscale(100%);
      }

      .already-in-play .balgruf.blue,
      .already-in-play .balgruf.red,
      .already-in-play .balgruf.yellow,
      .already-in-play .balgruf.green,
      .bluff .balgruf.blue,
      .bluff .balgruf.red,
      .bluff .balgruf.yellow,
      .bluff .balgruf.green {
        color: var(--ui-bg-2);
      }

      .role-txt {
        display: flex;
        flex-direction: column;
        font-size: 0.75rem;
      }

      .role-txt .already-in-play,
      .role-txt .bluff-indicator {
        margin-top: -4px;
      }
    `
	];
	async firstUpdated() {
		const roleId = this.player.suspectedRole?.id;
		if (roleId) {
			await waitUntil(() => !!this.shadowRoot.querySelectorAll(`li[data-id='${roleId}']`));
			const item = this.shadowRoot.querySelector(`li[data-id='${roleId}']`);
			if (item) requestAnimationFrame(() => {
				item.scrollIntoView({
					behavior: "instant",
					block: "center"
				});
			});
		}
	}
	render() {
		const bluffs = state.getState().currentGame.demonBluffs.map((bluff) => bluff.id);
		const playerIsMarionetteOrDrunk = this.player?.tokens?.some((token) => token.id === "marionette-Is The Marionette" || token.id === "drunk-Is The Drunk");
		const rolesInPlay = state.getState().currentGame?.players.map((p) => p.suspectedRole?.id) ?? [];
		return b`
      <ul>
        <li class="clear">
          <button @click=${() => this.handleClick({})} ui-button secondary>
            Clear role
          </button>
        </li>
        ${this.roles.sort(SAO).map((role) => b`
            <li
              data-id=${role.id}
              class="${playerIsMarionetteOrDrunk && bluffs.includes(role.id) ? "bluff" : ""}
                ${rolesInPlay.includes(role.id) && playerIsMarionetteOrDrunk ? "already-in-play" : ""}
                role ${this.player.suspectedRole?.id === role.id ? "selected" : ""}"
            >
              <button @click=${() => this.handleClick(role)}>
                <img
                  class="${alignment(role.type)}"
                  src="${img(role)}"
                  alt="${role.humanReadableRole}"
                />
                <div class="role-txt">
                  <div class="${alignment(role.type)} balgruf">
                    ${role.humanReadableRole}
                  </div>
                  ${playerIsMarionetteOrDrunk && bluffs.includes(role.id) ? b`<div class="bluff-indicator">Demon bluff</div>` : ""}
                  ${playerIsMarionetteOrDrunk && rolesInPlay.includes(role.id) ? b`<div class="already-in-play">Already in play</div>` : ""}
                </div>
              </button>
            </li>
          `)}
      </ul>
      <botc-disclosure>
        <div slot="label">Non-script roles</div>
        <div ui-inlay slot="detail">
          <ul>
            ${this.more.sort(SAO).map((role) => b`
                <li
                  data-id=${role.id}
                  class="role ${this.player.suspectedRole?.id === role.id ? "selected" : ""}"
                >
                  <button @click=${() => this.handleClick(role)}>
                    <img
                      class="${alignment(role.type)}"
                      src="${img(role)}"
                      alt="${role.humanReadableRole}"
                    />
                    <div class="${alignment(role.type)} balgruf">
                      ${role.humanReadableRole}
                    </div>
                  </button>
                </li>
              `)}
          </ul>
        </div>
      </botc-disclosure>
      <botc-disclosure>
        <div slot="label">Travellers</div>
        <div ui-inlay slot="detail">
          <ul>
            ${this.travellers.map((role) => b`
                <li
                  data-id=${role.id}
                  class="role ${this.player.suspectedRole?.id === role.id ? "selected" : ""}"
                >
                  <button @click=${() => this.handleClick(role)}>
                    <img
                      class="${alignment(role.type)}"
                      src="${img(role)}"
                      alt="${role.humanReadableRole}"
                    />
                    <div class="${alignment(role.type)} balgruf">
                      ${role.humanReadableRole}
                    </div>
                  </button>
                </li>
              `)}
          </ul>
        </div>
      </botc-disclosure>
    `;
	}
	handleClick(role) {
		const game = state.getState().currentGame;
		let tokens = game.tokens;
		let rolesInPlay = game.rolesInPlay;
		if (game.stMode) {
			const currentRole = this.player.suspectedRole?.id;
			if (!game.players.filter((p) => this.player.id !== p.id).some((player) => player?.suspectedRole?.id === currentRole)) {
				rolesInPlay = game.rolesInPlay.filter((role) => role.id !== currentRole);
				rolesInPlay.push(role);
			}
			if (role?.reminders?.length || role?.remindersGlobal?.length) {
				const newTokens = [...new Set(role?.reminders ?? []), ...new Set(role?.remindersGlobal ?? [])].map((r) => ({
					id: `${role.id}-${r}`,
					role: role.id,
					label: r,
					icon: role.icon,
					type: role.type,
					humanReadableRole: role.humanReadableRole
				})).filter((newToken) => !tokens.some((t) => t.id === newToken.id));
				tokens = [...tokens, ...newTokens];
			}
		}
		state.setState((state) => {
			const player = state.currentGame.players.find((player) => player.id === this.player.id);
			if (player.suspectedRole?.id === role.id) {
				player.suspectedRole = {};
				this.requestUpdate();
				return state;
			}
			player.suspectedRole = role;
			state.currentGame.tokens = tokens;
			state.currentGame.rolesInPlay = rolesInPlay;
			dialog.close();
			return state;
		});
	}
};
customElements.define("botc-set-role", BotcSetRole);
//#endregion
export { BotcSetRole };
