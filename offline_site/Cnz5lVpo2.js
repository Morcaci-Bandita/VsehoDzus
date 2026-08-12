import { A as i, I as i$1, P as b, t as when } from "./CY602n9t.js";
import "./D8HaG3T3.js";
import "./vIOCOudq.js";
import { t as check } from "./BTrKfjJH.js";
import { t as inlay } from "./Ue9OS-EJ.js";
import { t as button } from "./CbFrBy7s.js";
import { t as error } from "./BnMAryrf.js";
import "./DPxjp5Y3.js";
//#region src/components/dialog/share-almanac.js
var BotcShareAlmanac = class extends i {
	static properties = {
		id: { type: String },
		copied: { type: Boolean }
	};
	constructor() {
		super();
		this.copied = false;
		this.id = "";
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
		const url = `https://${window.location.host}/almanac/${this.id}`;
		return b`
      <p>Share this almanac with others</p>
      <div>
        <div class="link" ui-inlay>${url}</div>
        ${when(this.copied, () => b`<p ui-success>${check} Copied url to clipboard.</p>`)}
        <button
          ui-button
          primary
          @click=${() => {
			navigator.share({
				title: "Share almanac",
				text: "Checkout this BOTC script almanac",
				url
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
			navigator.clipboard.writeText(url);
			setTimeout(() => {
				this.copied = false;
			}, 5e3);
		}}
        >
          Copy link
        </button>
      </div>
    `;
	}
};
customElements.define("botc-share-almanac", BotcShareAlmanac);
//#endregion
export { BotcShareAlmanac };
