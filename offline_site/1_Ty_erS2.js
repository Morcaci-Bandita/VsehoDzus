import { A as i, I as i$1, P as b } from "./CY602n9t.js";
import { M as SCRIPTS_DATA, r as state } from "./CP0hEE1l.js";
import { t as button } from "./CbFrBy7s.js";
import { t as dialog } from "./Dm27KaR0.js";
import { t as select } from "./C-op7emD.js";
//#region src/components/dialog/restart.js
var BotcRestart = class extends i {
	static styles = [
		button,
		select,
		i$1`
      :host {
        display: block;
      }

      select {
        margin-bottom: 12px;
      }
    `
	];
	render() {
		const currentScript = state.getState().currentGame.script;
		return b`
      <p>
        Restarting the game will wipe all data from the current game, and start
        a new game with the same players, without saving results.
      </p>
      <label ui-label for="script-select">
        <select ui-select name="scripts" id="script-select">
          ${Object.keys(SCRIPTS_DATA).filter((s) => s !== "All").map((script) => b`
                <option ?selected=${currentScript === script} value="${script}">
                  ${script}
                </option>
              `)}
        </select>
        <span>Script</span>
      </label>
      <button ui-button primary @click=${this.restart}>Restart</button>
    `;
	}
	restart() {
		const players = state.getState().currentGame.players.map((player) => {
			return {
				...player,
				claims: [],
				tokens: [],
				notes: "",
				suspectedRole: {},
				dead: null,
				confirmed: false
			};
		});
		state.setState((s) => ({
			...s,
			currentGame: {
				...s.currentGame,
				script: this.shadowRoot.querySelector("#script-select").value,
				players,
				state: "in-progress",
				deadlog: [],
				deadlogMap: {},
				demonBluffs: [],
				nominations: [],
				conversations: [],
				day: 0
			}
		}));
		dialog.close();
	}
};
customElements.define("botc-restart", BotcRestart);
//#endregion
export { BotcRestart };
