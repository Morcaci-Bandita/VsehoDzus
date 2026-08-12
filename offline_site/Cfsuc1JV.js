import { A as i, I as i$1, P as b } from "./CY602n9t.js";
import { m as capitalize, r as state } from "./CP0hEE1l.js";
import { t as button } from "./CbFrBy7s.js";
import { t as dialog } from "./Dm27KaR0.js";
import { t as input } from "./_hTQLwBE.js";
//#region src/components/dialog/edit-name.js
var BotcEditName = class extends i {
	static properties = { player: { type: Number } };
	constructor() {
		super();
		this.player = {};
	}
	async connectedCallback() {
		super.connectedCallback();
	}
	static styles = [
		button,
		input,
		i$1``
	];
	render() {
		return b`
      <form @submit=${this.handleInput}>
        <label ui-label>
          <input
            required
            name="name"
            ui-input
            type="text"
            placeholder="Name"
            value="${this.player.name}"
          />
          <span>Edit name</span>
        </label>
        <button type="submit" ui-button primary>Save</button>
      </form>
    `;
	}
	handleInput(e) {
		e.preventDefault();
		const name = capitalize(new FormData(e.target).get("name"));
		if (!name) {
			player.name = "";
			dialog.close();
			return;
		}
		state.setState((state) => {
			const player = state.currentGame.players.find((player) => player.id === this.player.id);
			player.name = name;
			return state;
		});
		dialog.close();
	}
};
customElements.define("botc-edit-name", BotcEditName);
//#endregion
export { BotcEditName };
