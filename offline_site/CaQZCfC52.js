import { A as i, I as i$1, P as b } from "./CY602n9t.js";
import { r as state } from "./CP0hEE1l.js";
import { t as button } from "./CbFrBy7s.js";
import { t as dialog } from "./Dm27KaR0.js";
//#region src/components/dialog/reset.js
var BotcReset = class extends i {
	static styles = [button, i$1`
      :host {
        display: block;
      }
    `];
	render() {
		return b`
      <p>
        Resetting the game will wipe all data from the current game, without
        saving game results.
      </p>
      <button ui-button primary @click=${this.reset}>Reset</button>
    `;
	}
	reset() {
		state.setState((s) => ({
			...s,
			currentGame: null
		}));
		dialog.close();
	}
};
customElements.define("botc-reset", BotcReset);
//#endregion
export { BotcReset };
