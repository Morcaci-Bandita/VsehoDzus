import { A as i, I as i$1, L as r, P as b, _ as focus, d as bg9, f as border, g as elevation4, s as bg5, u as bg8 } from "./CY602n9t.js";
import { I as images, M as SCRIPTS_DATA, d as alignment, j as LETHAL_ROLES, n as settings, r as state } from "./CP0hEE1l.js";
import { t as button } from "./CbFrBy7s.js";
import { t as dialog } from "./Dm27KaR0.js";
import { t as input } from "./_hTQLwBE.js";
import { t as visuallyHidden } from "./DZ8S2RMZ.js";
//#region src/components/dialog/killed-by.js
var BotcKilledBy = class extends i {
	static properties = {
		player: { type: Number },
		tokens: { type: Array }
	};
	constructor() {
		super();
		this.player = {};
		this.tokens = [];
	}
	async connectedCallback() {
		super.connectedCallback();
		const script = await SCRIPTS_DATA[state.getState().currentGame.script]();
		const lethalRoles = [
			...script.townsfolk,
			...script.outsider,
			...script.minion,
			...script.demon
		].filter((role) => LETHAL_ROLES.includes(role.id));
		this.tokens = [
			{
				icon: "dead",
				id: "unknowntown",
				humanReadableRole: "Town execution",
				type: "Townsfolk"
			},
			{
				icon: "dead",
				humanReadableRole: "Suspected evil",
				id: "unknownevil",
				type: "Demon"
			},
			{
				icon: "dead",
				id: "unknownneutral",
				humanReadableRole: "Unknown",
				type: ""
			},
			...lethalRoles.map((role) => ({
				...role,
				icon: role.icon
			})).reverse(),
			{
				icon: "mad",
				id: "madness",
				humanReadableRole: "Madness",
				type: ""
			}
		];
	}
	static styles = [
		button,
		input,
		i$1`
      ${r(visuallyHidden)}
      img {
        width: 50px;
        height: 50px;
        border-radius: 50%;
        border: solid 2px ${bg9};
        background-color: ${bg8};
        margin-right: 10px;
      }

      img.red {
        border: solid 2px #d9403b;
      }
      img.blue {
        border: solid 2px #45a0f1;
      }

      ul {
        list-style: none;
        padding: 0;
      }

      ul label.role {
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

      @media (hover: hover) and (pointer: fine) {
        ul label.role:not(:checked):hover {
          background: var(--ui-bg-4);
        }
      }

      ul label.role.selected {
        border: solid 2px rgb(112, 210, 125);
        background: #4c564d;
        padding: 7px;
      }

      .clear {
        display: flex;
        margin-bottom: 10px;
      }

      input:checked + label {
        border: solid 2px rgb(112, 210, 125);
        background: #4c564d;
        padding: 7px;
      }

      input:focus-visible + label {
        ${focus()}
      }

      input:focus-visible:not(:checked) + label {
        background: var(--ui-bg-4);
      }
    `
	];
	render() {
		return b`
      <ul>
        <li class="clear">
          <button @click=${this.revive} ui-button secondary>Revive</button>
        </li>
        ${this.tokens.map((token, i) => b`
            <li
              class="${this.player?.claims?.find((r) => r.id === token.id) ? "selected" : ""}"
            >
              <input
                visually-hidden
                @input=${(e) => {
			this.handleInput(e.target, token);
		}}
                id=${i}
                type="checkbox"
                .checked=${(!state.getState().currentGame.stMode || !settings.getState().hideGrim) && this.player?.dead?.id === token.id}
              />
              <label for=${i} class="role">
                <img
                  class="${alignment(token.type)}"
                  src="${images?.any(token.icon)}"
                  alt="${token.humanReadableRole} ${token.icon}"
                />
                <div>${token.humanReadableRole}</div>
              </label>
            </li>
          `)}
      </ul>
      <button ui-button primary @click=${() => dialog.close()}>Save</button>
    `;
	}
	revive() {
		state.setState((state) => {
			const player = state.currentGame.players.find((player) => player.id === this.player.id);
			player.dead = null;
			dialog.close();
			return state;
		});
	}
	handleInput(target, token) {
		[...this.shadowRoot.querySelectorAll("input")].filter((input) => input !== target).forEach((input) => input.checked = false);
		state.setState((state) => {
			const player = state.currentGame.players.find((player) => player.id === this.player.id);
			if (!target.checked) {
				player.dead = null;
				return state;
			}
			player.dead = {
				day: state.currentGame.day,
				icon: token.icon,
				type: token.type,
				id: token.id,
				hasDeadVote: true,
				humanReadableRole: token.humanReadableRole
			};
			dialog.close();
			return state;
		});
	}
};
customElements.define("botc-killed-by", BotcKilledBy);
//#endregion
export { BotcKilledBy };
