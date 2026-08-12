import { A as i, I as i$1, P as b, t as when } from "./CY602n9t.js";
import { F as api, n as settings, r as state } from "./CP0hEE1l.js";
import "./vIOCOudq.js";
import { t as inlay } from "./Ue9OS-EJ.js";
import { t as button } from "./CbFrBy7s.js";
import { t as error } from "./BnMAryrf.js";
import "./DPxjp5Y3.js";
//#region src/components/dialog/share-game-qr.js
var BotcShareGameQr = class extends i {
	static properties = {
		includeData: { type: Boolean },
		qr: { type: String },
		qrState: { type: String }
	};
	constructor() {
		super();
		this.includeData = true;
		this.qr = "";
		this.qrState = "initialized";
	}
	connectedCallback() {
		super.connectedCallback();
		if (settings.getState().hideGrim) this.includeData = false;
		console.log(this.includeData);
	}
	static styles = [
		inlay,
		button,
		error,
		i$1`
      .qr img {
        display: block;
        margin-left: auto;
        margin-right: auto;
        width: 100%;
      }
    `
	];
	async createQr() {
		this.qrState = "pending";
		this.qr = "";
		const game = structuredClone(state.getState().currentGame);
		let players = game.players.map((player) => ({
			...player,
			me: false
		}));
		if (!this.includeData) players = players.map((player) => ({
			...player,
			claims: [],
			notes: "",
			suspectedRole: {},
			dead: null,
			confirmed: false,
			tokens: []
		}));
		game.players = players;
		console.log(2, game);
		try {
			this.qr = await api.post("https://qr-thing.netlify.app/.netlify/functions/qr?url=true&key=create", game);
			this.qrState = "success";
		} catch (e) {
			console.error(e);
			this.qrState = "error";
		}
	}
	render() {
		return b`
      ${when(this.qrState === "initialized", () => b`
          <botc-switch
            ?disabled=${settings.getState().hideGrim}
            @checked-changed=${({ checked }) => {
			this.includeData = checked;
			console.log(checked);
		}}
            ?checked=${this.includeData}
            >Include roles, tokens, etc</botc-switch
          >
        `)}
      ${when(this.qrState === "initialized", () => b`
          <button ui-button primary @click=${this.createQr}>Create QR</button>
        `)}
      ${when(this.qrState === "pending", () => b`
          <div ui-inlay>
            <botc-spinner></botc-spinner>
          </div>
        `)}
      ${when(this.qrState === "success", () => b`
          <div ui-inlay class="qr">
            <img src="${this.qr.qr}" alt="QR Code" />
          </div>
        `)}
      ${when(this.qrState === "error", () => b` <div ui-error>Failed to create QR code.</div> `)}
    `;
	}
};
customElements.define("botc-share-game-qr", BotcShareGameQr);
//#endregion
export { BotcShareGameQr };
