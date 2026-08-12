import { A as i, I as i$1, P as b } from "./CY602n9t.js";
import { r as state } from "./CP0hEE1l.js";
import { t as button } from "./CbFrBy7s.js";
import { t as dialog } from "./Dm27KaR0.js";
import { t as input } from "./_hTQLwBE.js";
//#region src/components/dialog/add-player.js
var BotcAddPlayer = class extends i {
	static properties = {};
	static styles = [
		button,
		input,
		i$1``
	];
	render() {
		return b`
      <form @submit=${this.handleSubmit}>
        <label ui-label for="player">
          <input
            required
            ui-input
            type="text"
            name="player"
            id="player"
            placeholder="Player name"
          />
          <span>Player name</span>
        </label>
        <button type="submit" ui-button primary>Save</button>
      </form>
    `;
	}
	handleSubmit(e) {
		e.preventDefault();
		const playerName = new FormData(e.target).get("player");
		state.setState((s) => ({
			...s,
			currentGame: {
				...s.currentGame,
				travellers: true,
				tokens: [...s.currentGame.tokens || []],
				players: [...s.currentGame.players || [], {
					tokens: [],
					name: playerName,
					id: crypto.randomUUID(),
					claims: [],
					notes: "",
					suspectedRole: {},
					dead: false,
					me: false
				}]
			}
		}));
		setTimeout(() => {
			dialog.close();
		});
	}
};
customElements.define("botc-add-player", BotcAddPlayer);
//#endregion
export { BotcAddPlayer };
