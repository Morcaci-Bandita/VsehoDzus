import { A as i, I as i$1, P as b, v as header } from "./CY602n9t.js";
import "./ntwYzdyv.js";
import { t as inlay } from "./Ue9OS-EJ.js";
import { t as button } from "./CbFrBy7s.js";
import "./DPxjp5Y3.js";
import { t as buttonLink } from "./6PngWMwE.js";
import "./CXEVaKnf2.js";
import "./B1OborLG.js";
//#region src/pages/admin.js
var BotcAdmin = class extends i {
	static styles = [
		header,
		inlay,
		buttonLink,
		button,
		i$1`
      :host {
        display: flex;
        flex-direction: column;
        height: 100%;
        flex: 1;
        margin-left: 12px;
        margin-right: 12px;
      }
    `
	];
	static properties = {};
	render() {
		return b`
      <h1 header>Admin</h1>
        <botc-card label="Pages">
          <a ui-button-link secondary href="/__data"> Stats </a>
          <a ui-button-link secondary href="/__users"> Users </a>
        </botc-card>
      </div>
    `;
	}
};
customElements.define("botc-admin", BotcAdmin);
//#endregion
export { BotcAdmin };
