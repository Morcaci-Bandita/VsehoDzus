import { A as i, I as i$1, P as b, d as bg9, f as border, g as elevation4, s as bg5, u as bg8 } from "./CY602n9t.js";
import { M as SCRIPTS_DATA, b as img, r as state } from "./CP0hEE1l.js";
import { t as button } from "./CbFrBy7s.js";
import { t as dialog } from "./Dm27KaR0.js";
import { t as input } from "./_hTQLwBE.js";
//#region src/components/dialog/add-claims.js
var BotcAddClaims = class extends i {
	static properties = {
		player: { type: Number },
		script: { type: Object },
		roles: { type: Array }
	};
	constructor() {
		super();
		this.player = {};
		this.script = {};
		this.roles = [];
	}
	async connectedCallback() {
		super.connectedCallback();
		const script = state.getState().currentGame.script;
		const travellers = state.getState().currentGame.travellers;
		this.script = await SCRIPTS_DATA[script]();
		this.roles = [
			...this.script.townsfolk,
			...this.script.outsider,
			...travellers ? this.script?.traveller ?? [] : []
		];
	}
	static styles = [
		button,
		input,
		i$1`
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
    `
	];
	render() {
		return b`
      <ul>
        <li class="clear">
          <button @click=${() => this.handleInput(null)} ui-button secondary>
            Clear claims
          </button>
        </li>
        ${this.roles.map((role, i) => b`
            <li
              class="${this.player.claims.find((r) => r.id === role.id) ? "selected" : ""}"
            >
              <input
                hidden
                @input=${() => {
			this.handleInput(role);
		}}
                id=${i}
                type="checkbox"
                .checked=${this.player.claims.find((r) => r.id === role.id)}
              />
              <label for=${i} class="role">
                <img src="${img(role)}" alt="${role.humanReadableRole}" />
                <div>${role.humanReadableRole}</div>
              </label>
            </li>
          `)}
      </ul>
      <button ui-button primary @click=${() => dialog.close()}>Save</button>
    `;
	}
	handleInput(role) {
		state.setState((state) => {
			const player = state.currentGame.players.find((player) => player.id === this.player.id);
			if (!role) {
				player.claims = [];
				dialog.close();
				return state;
			}
			const roleIndex = player.claims.findIndex((r) => r.id === role.id);
			if (roleIndex > -1) player.claims.splice(roleIndex, 1);
			else player.claims.push(role);
			return state;
		});
	}
};
customElements.define("botc-add-claims", BotcAddClaims);
//#endregion
export { BotcAddClaims };
