import { A as i, I as i$1, P as b, t as when } from "./CY602n9t.js";
import "./D8HaG3T3.js";
import "./vIOCOudq.js";
import { t as check } from "./BTrKfjJH.js";
import { t as inlay } from "./Ue9OS-EJ.js";
import { t as button } from "./CbFrBy7s.js";
import { t as error } from "./BnMAryrf.js";
import "./DPxjp5Y3.js";
//#region src/components/dialog/share-game-url.js
var BotcShareGameUrl = class extends i {
	static properties = {
		state: { type: String },
		uuid: { type: String },
		game: { type: Object },
		copied: { type: Boolean }
	};
	constructor() {
		super();
		this.copied = false;
		this.state = "initialized";
		this.game = {};
		this.uuid = "";
	}
	async connectedCallback() {
		super.connectedCallback();
		try {
			this.state = "pending";
			this.state = "success";
			this.uuid = this.game.id;
		} catch (e) {
			console.error(e);
			this.state = "error";
		}
	}
	static styles = [
		inlay,
		button,
		error,
		i$1`
      .link {
        font-family: monospace;
        user-select: text;
      }

      .qr img {
        display: block;
        margin-left: auto;
        margin-right: auto;
        width: 100%;
      }

      [ui-success] {
        display: flex;
        border: solid 2px rgb(112, 210, 125);
        background: #4c564d;
        padding: 7px;
        border-radius: 6px;
      }

      [ui-success] svg {
        margin-right: 4px;
      }
    `
	];
	render() {
		return b`
      <p>
        Relive the excitement of your game or share the fun with friends! Send
        them a link to check it out.
      </p>
      ${when(this.state === "pending" || this.state === "initialized", () => b`
          <div ui-inlay>
            <botc-spinner></botc-spinner>
          </div>
        `)}
      ${when(this.state === "success", () => b`
          <div>
            <div class="link" ui-inlay>
              https://${window.location.host}/?share=${this.uuid}
            </div>
            ${when(this.copied, () => b`<p ui-success>${check} Copied url to clipboard.</p>`)}
            <button
              ui-button
              primary
              @click=${() => {
			navigator.share({
				title: "Share game",
				text: "Checkout this BOTC game I played",
				url: `https://${window.location.host}/?share=${this.uuid}`
			});
		}}
            >
              Share link
            </button>
            <button
              ui-button
              secondary
              @click=${() => {
			this.copied = true;
			navigator.clipboard.writeText(`https://${window.location.host}/?share=${this.uuid}`);
			setTimeout(() => {
				this.copied = false;
			}, 5e3);
		}}
            >
              Copy link
            </button>
          </div>
        `)}
      ${when(this.state === "error", () => b`
          <p ui-error>Failed to create share url. Please try again later.</p>
        `)}
    `;
	}
};
customElements.define("botc-share-game-url", BotcShareGameUrl);
//#endregion
export { BotcShareGameUrl };
