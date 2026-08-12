import { A as i, I as i$1, P as b } from "./CY602n9t.js";
import { r as state } from "./CP0hEE1l.js";
import { t as button } from "./CbFrBy7s.js";
import { t as dialog } from "./Dm27KaR0.js";
import { t as input } from "./_hTQLwBE.js";
//#region src/components/dialog/notes.js
var BotcNotes = class extends i {
	static properties = {
		notes: { type: String },
		playerId: { type: String }
	};
	constructor() {
		super();
		this.notes = "";
		this.playerId = "";
	}
	static styles = [
		button,
		input,
		i$1`
      :host {
        height: 100%;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
      }
    `
	];
	render() {
		return b`
      <label ui-label>
        <textarea
          @input=${(e) => {
			state.setState((state) => ({
				...state,
				currentGame: {
					...state.currentGame,
					players: state.currentGame.players.map((p) => p.id === this.playerId ? {
						...p,
						notes: e.target.value
					} : p)
				}
			}));
			this.notes = e.target.value;
		}}
          ui-input
          rows="8"
        >
${this.notes}</textarea>
        <span>Notes</span>
      </label>
      <button @click=${() => dialog.close()} type="submit" ui-button primary>
        Save
      </button>
    `;
	}
};
customElements.define("botc-notes", BotcNotes);
//#endregion
export { BotcNotes };
