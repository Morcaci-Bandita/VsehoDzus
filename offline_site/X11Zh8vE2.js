import { A as i, I as i$1, P as b, c as bg6, d as bg9, f as border, u as bg8, x as main5 } from "./CY602n9t.js";
import { M as SCRIPTS_DATA } from "./CP0hEE1l.js";
import "./D8HaG3T3.js";
import { t as inlay } from "./Ue9OS-EJ.js";
import "./D6Dmypk12.js";
//#region src/components/dialog/view-custom-script.js
var BotcViewCustomScript = class extends i {
	static properties = {
		name: { type: String },
		script: { type: Object }
	};
	constructor() {
		super();
		this.name = "";
		this.script = void 0;
	}
	async connectedCallback() {
		super.connectedCallback();
		if (!this.script) this.script = await SCRIPTS_DATA[this.name]();
		this.script = {
			...this.script,
			minion: this.script?.minion?.filter((r) => r.id !== "minioninfo") ?? [],
			demon: this.script?.demon?.filter((r) => r.id !== "demoninfo") ?? []
		};
	}
	static styles = [inlay, i$1`
      @media (max-width: 840px) {
        * {
          -webkit-tap-highlight-color: transparent;
          -webkit-touch-callout: none;
          touch-action: manipulation;
        }
      }
      h2 {
        font-family: "Balgruf";
        font-size: 1.375rem;
        color: ${main5};
        text-shadow: 1px 1px 2px rgba(0, 0, 0, 1);
      }

      ul {
        list-style: none;
        padding: 0;
        margin-top: 0;
        margin-bottom: 0;
      }

      ul li:not(:last-child) {
        border-bottom: solid 1px ${border};
        /* margin-bottom: 50px; */
      }

      ul li h2 {
        font-size: 1.375rem;
        margin: 0;
      }

      ul li div.role-header {
        display: flex;
        align-items: center;
        /* margin-top: 16px; */
        /* margin-bottom: 16px; */
        /* justify-content: space-between; */
      }

      ul li p {
        margin-top: 4px;
      }

      ul li img {
        margin-right: 16px;
        width: 50px;
        height: 50px;
        border-radius: 50%;
        border: solid 2px ${bg9};
        background-color: ${bg8};
      }

      ul li:has(botc-disclosure[expanded]) {
        border-bottom: none;
      }

      .role-title {
        display: flex;
        flex-direction: column;
      }

      .role-title p {
        font-family: "Poppins";
        margin-top: 4px;
        margin-bottom: 4px;
        font-weight: 100;
        font-size: 1rem;
      }

      .search {
        margin-bottom: 40px;
      }

      botc-disclosure {
        background-color: ${bg6};
      }
    `];
	render() {
		return b`
      <botc-roles-list .script=${this?.script ?? {}}></botc-roles-list>
    `;
	}
};
customElements.define("botc-view-custom-script", BotcViewCustomScript);
//#endregion
export { BotcViewCustomScript };
