import { A as i, I as i$1, P as b, d as bg9, f as border, g as elevation4, s as bg5, u as bg8 } from "./CY602n9t.js";
import { m as capitalize, r as state } from "./CP0hEE1l.js";
import { t as button } from "./CbFrBy7s.js";
import { t as dialog } from "./Dm27KaR0.js";
import { t as input } from "./_hTQLwBE.js";
import { t as select } from "./C-op7emD.js";
//#region src/components/dialog/dead-votes.js
var BotcDeadVotes = class extends i {
	static styles = [
		button,
		select,
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

      input:checked + label {
        border: solid 2px rgb(112, 210, 125);
        background: #4c564d;
        padding: 7px;
      }
    `
	];
	static properties = { submittable: { type: Boolean } };
	render() {
		return b`
      <p>Select people that used their dead votes today.</p>
      <ul>
        ${state.getState().currentGame.players.filter((p) => !!p.dead && p.dead?.hasDeadVote).map((player, i) => b`
              <li>
                <input
                  @input=${() => this.updateSubmittable()}
                  hidden
                  id=${i}
                  data-id=${player.id}
                  type="checkbox"
                />
                <label for=${i} class="role">
                  <div>${capitalize(player.name)}</div>
                </label>
              </li>
            `)}
      </ul>
      <button
        .disabled=${this.submittable}
        primary
        @click=${this.handleInput}
        ui-button
      >
        Save
      </button>
    `;
	}
	constructor() {
		super();
		this.submittable = true;
	}
	updateSubmittable() {
		const checkedInputs = [...this.shadowRoot.querySelectorAll("input[type=\"checkbox\"]")].filter((input) => input.checked);
		this.submittable = !(checkedInputs.length > 0);
	}
	handleInput() {
		const participants = [...this.shadowRoot.querySelectorAll("input")].filter((input) => input.checked).map((input) => input.dataset.id);
		state.setState((s) => ({
			...s,
			currentGame: {
				...s.currentGame,
				players: s.currentGame.players.map((player) => {
					if (participants.includes(player.id)) return {
						...player,
						dead: {
							...player.dead,
							hasDeadVote: false
						}
					};
					return player;
				})
			}
		}));
		setTimeout(() => {
			dialog.close();
		});
	}
};
customElements.define("botc-dead-votes", BotcDeadVotes);
//#endregion
export { BotcDeadVotes };
