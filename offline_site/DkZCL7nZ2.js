import { A as i, I as i$1, P as b, d as bg9, f as border, g as elevation4, s as bg5, u as bg8 } from "./CY602n9t.js";
import { m as capitalize, r as state } from "./CP0hEE1l.js";
import { t as button } from "./CbFrBy7s.js";
import { t as dialog } from "./Dm27KaR0.js";
import { t as select } from "./C-op7emD.js";
//#region src/components/dialog/nomination.js
var BotcNomination = class extends i {
	static styles = [
		button,
		select,
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

      input:checked + label {
        border: solid 2px rgb(112, 210, 125);
        background: #4c564d;
        padding: 7px;
      }
    `
	];
	render() {
		const players = state.getState().currentGame.players;
		return b`
      <label ui-label for="nominator">
        <select ui-select name="nominator" id="nominator">
          ${players.map((player) => b`
              <option value="${player.id}">${capitalize(player.name)}</option>
            `)}
        </select>
        <span>Nominator</span>
      </label>
      <label ui-label for="nominee">
        <select ui-select name="nominee" id="nominee">
          ${players.map((player, i) => b`
              <option ?selected="${i === 1}" value="${player.id}">
                ${capitalize(player.name)}
              </option>
            `)}
        </select>
        <span>Nominee</span>
      </label>
      <h2>Votes</h2>
      <ul>
        ${players.map((player, i) => b`
            <li>
              <input data-id=${player.id} hidden id=${i} type="checkbox" />
              <label for=${i} class="role">
                <div>${capitalize(player.name)}</div>
              </label>
            </li>
          `)}
      </ul>
      <button primary @click=${this.handleInput} ui-button>Save</button>
    `;
	}
	handleInput() {
		const nominator = this.shadowRoot.querySelector("#nominator").value;
		const nominee = this.shadowRoot.querySelector("#nominee").value;
		const votes = [...this.shadowRoot.querySelectorAll("input:checked")].map((input) => input.dataset.id);
		const { day } = state.getState().currentGame;
		state.setState((state) => ({
			...state,
			currentGame: {
				...state.currentGame,
				players: state.currentGame.players.map((player) => {
					if (votes.includes(player.id) && !!player.dead) return {
						...player,
						dead: {
							...player.dead,
							hasDeadVote: false
						}
					};
					return player;
				}),
				nominations: [...state.currentGame.nominations, {
					day,
					nominator,
					nominee,
					votes
				}]
			}
		}));
		dialog.close();
	}
};
customElements.define("botc-nomination", BotcNomination);
//#endregion
export { BotcNomination };
