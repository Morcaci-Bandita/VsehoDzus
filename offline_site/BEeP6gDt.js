import { A as i, I as i$1, L as r, P as b, v as header, x as main5 } from "./CY602n9t.js";
import { H as get, M as SCRIPTS_DATA, r as state } from "./CP0hEE1l.js";
import "./ntwYzdyv.js";
import { t as inlay } from "./Ue9OS-EJ.js";
import { t as input } from "./_hTQLwBE.js";
import { t as visuallyHidden } from "./DZ8S2RMZ.js";
import { t as select } from "./C-op7emD.js";
import "./CXEVaKnf2.js";
import "./D6Dmypk12.js";
import "./B1OborLG.js";
//#region src/pages/roles.js
var BotcRoles = class extends i {
	static styles = [
		input,
		inlay,
		header,
		select,
		i$1`
      ${r(visuallyHidden)}

      :host {
        display: block;
        padding: 16px;
      }

      div[slot="detail"] div {
        margin-top: 12px;
        margin-bottom: 12px;
      }

      div[slot="detail"] h2 {
        font-family: "Balgruf";
        font-size: 1.375rem;
        color: ${main5};
        /* text-align: center; */
        text-shadow: 1px 1px 2px rgba(0, 0, 0, 1);
      }

      ul li.role:has(botc-disclosure[expanded]) {
        border-bottom: none;
      }
    `
	];
	static properties = {
		currentScript: { type: String },
		script: {},
		customScripts: { type: Object },
		rolesById: { type: Object },
		stMode: { type: Boolean }
	};
	constructor() {
		super();
		this.customScripts = {};
		this.script = {};
		this.rolesById = {};
		this.stMode = false;
	}
	async changeScript() {
		this.currentScript = this.shadowRoot.querySelector("#script-select").value;
		this.script = await SCRIPTS_DATA[this.currentScript]();
		this.shadowRoot.querySelector("input").value = "";
	}
	async connectedCallback() {
		super.connectedCallback();
		const script = new URLSearchParams(window.location.search).get("script");
		function mapScript(queryParam) {
			switch (queryParam) {
				case "tb": return "Trouble Brewing";
				case "snv": return "Sects & Violets";
				case "bmr": return "Bad Moon Rising";
				default: return;
			}
		}
		this.currentScript = mapScript(decodeURIComponent(script)) ?? state.getState().currentGame?.script ?? "Trouble Brewing";
		this.script = await SCRIPTS_DATA[this.currentScript]();
		this.rolesById = window.rolesById;
		this.customScripts = await get("scripts") ?? {};
		this.stMode = state.getState().currentGame?.stMode;
	}
	async handleInput(e) {
		const filter = e.target.value.toLowerCase();
		if (filter === "") {
			this.script = await SCRIPTS_DATA[this.currentScript]().then((data) => data);
			return;
		}
		this.script = Object.keys(this.script).reduce((acc, type) => {
			acc[type] = this.script[type].filter((role) => role.humanReadableRole.toLowerCase().includes(filter));
			return acc;
		}, {});
	}
	render() {
		state.getState().currentGame?.stMode;
		this.stMode;
		return b`
      <botc-back-button href="/actions"></botc-back-button>

      <h1 header>Roles</h1>
      <div class="search">
        <label ui-label>
          <input @input=${this.handleInput} ui-input type="text" />
          <span>Filter</span>
        </label>
        <label ui-label for="script-select">
          <select
            @change=${this.changeScript}
            ui-select
            name="scripts"
            id="script-select"
          >
            ${Object.keys({
			...SCRIPTS_DATA,
			...this.customScripts
		}).map((script) => b`
                <option
                  ?selected=${this.currentScript === script}
                  value="${script}"
                >
                  ${script}
                </option>
              `)}

            <!-- <option value="All">All</option> -->
          </select>
          <span>Script</span>
        </label>
      </div>
      <botc-roles-list
        .showMoreInfo=${true}
        .script=${this.script}
      ></botc-roles-list>
    `;
	}
};
customElements.define("botc-roles", BotcRoles);
//#endregion
export { BotcRoles };
