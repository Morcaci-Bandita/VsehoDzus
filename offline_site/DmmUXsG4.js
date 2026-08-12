import { A as i, I as i$1, P as b } from "./CY602n9t.js";
import { t as button } from "./CbFrBy7s.js";
import { t as dialog } from "./Dm27KaR0.js";
import { t as input } from "./_hTQLwBE.js";
//#region src/components/dialog/custom-text.js
var BotcCustomText = class extends i {
	static properties = {
		player: { type: Number },
		text: { type: String }
	};
	constructor() {
		super();
		this.player = {};
		this.text = "";
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
          <textarea
            .value=${this.text}
            rows="5"
            required
            name="name"
            ui-input
            type="text"
          ></textarea>
          <span>Enter text</span>
        </label>
        <button type="submit" ui-button primary>Save</button>
      </form>
    `;
	}
	handleInput(e) {
		e.preventDefault();
		const text = new FormData(e.target).get("name");
		if (!text) {
			dialog.close();
			return;
		}
		dialog.setReturnValue(text);
		setTimeout(() => {
			dialog.close();
		});
	}
};
customElements.define("botc-custom-text", BotcCustomText);
//#endregion
export { BotcCustomText };
