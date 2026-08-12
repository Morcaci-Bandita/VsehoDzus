import { A as i, I as i$1, P as b, d as bg9, f as border, g as elevation4, s as bg5, t as when, u as bg8, v as header, x as main5 } from "./CY602n9t.js";
import { H as get, M as SCRIPTS_DATA, U as set, b as img, m as capitalize, r as state } from "./CP0hEE1l.js";
import "./vIOCOudq.js";
import "./ntwYzdyv.js";
import { t as inlay } from "./Ue9OS-EJ.js";
import { t as button } from "./CbFrBy7s.js";
import { t as dialog } from "./Dm27KaR0.js";
import { t as error } from "./BnMAryrf.js";
import { t as input } from "./_hTQLwBE.js";
import { t as c } from "./CINdyCSV.js";
import { t as select } from "./C-op7emD.js";
import "./CXEVaKnf2.js";
//#region src/pages/create-script.js
var BotcCreateScript = class extends i {
	static styles = [
		input,
		inlay,
		header,
		select,
		button,
		error,
		i$1`
      :host {
        display: block;
        padding: 16px;
      }

      .role-title {
        display: flex;
        flex-direction: column;
      }

      input[ui-input] {
        border: solid 1px ${border};
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

      img {
        width: 50px;
        height: 50px;
        border-radius: 50%;
        border: solid 2px ${bg9};
        background-color: ${bg8};
        margin-right: 10px;
      }

      ul {
        list-style: none;
        padding: 0;
      }

      ul label.role {
        ${elevation4()}
        display: flex;
        align-items: center;
        margin-bottom: 10px;
        background: ${bg5};
        border: solid 1px ${border};
        border-radius: 4px;
        padding: 8px;
        transition: background 0.2s;
      }

      ul label.role.selected {
        border: solid 2px rgb(112, 210, 125);
        background: #4c564d;
        padding: 7px;
      }

      .clear {
        display: flex;
        margin-bottom: 10px;
      }

      input:checked + label {
        border: solid 2px rgb(112, 210, 125);
        background: #4c564d;
        padding: 7px;
      }

      #search {
        margin-top: 32px;
      }

      h2 {
        font-family: "Balgruf";
        font-size: 1.375rem;
        color: ${main5};
        text-shadow: 1px 1px 2px rgba(0, 0, 0, 1);
      }
    `
	];
	static properties = {
		all: { type: Object },
		currentScript: { type: String },
		script: {},
		customScripts: { type: Object },
		newScript: { type: Object },
		showBottomSaveButton: { type: Boolean },
		validationErrors: { type: Array }
	};
	constructor() {
		super();
		this.validationErrors = [];
		this.customScripts = {};
		this.currentScript = "None";
		this.script = {};
		this.all = {};
		this.newScript = {};
		this.showBottomSaveButton = false;
	}
	async changeBaseScript() {
		this.currentScript = this.shadowRoot.querySelector("#script-select").value;
		if (this.currentScript === "None") {
			this.script = {};
			this.newScript = {};
			return;
		}
		this.script = await SCRIPTS_DATA[this.currentScript]();
		this.newScript = this.script;
	}
	async saveScript() {
		this.validationErrors = [];
		const name = this.shadowRoot.querySelector("#scriptname").value;
		if (!name) this.validationErrors.push("Script name is required");
		const savedScripts = await get("scripts") ?? {};
		if (Object.keys({
			...savedScripts,
			...SCRIPTS_DATA
		}).find((script) => script.toLowerCase() === name.toLowerCase())) this.validationErrors.push(`Script name "${name}" already exists`);
		if (!(Object.values(this.newScript).reduce((sum, array) => sum + array.length, 0) > 0)) this.validationErrors.push("Script must have at least one character selected");
		if (this.validationErrors.length) {
			this.requestUpdate();
			return;
		}
		savedScripts[name] = this.newScript;
		await set("scripts", savedScripts);
		SCRIPTS_DATA[name] = () => get("scripts").then((data) => data[name]);
		dialog.open({
			id: "scriptSaved",
			parameters: { name }
		});
	}
	async connectedCallback() {
		super.connectedCallback();
		this.currentScript = state.getState().currentGame?.script ?? "Trouble Brewing";
		this.all = await SCRIPTS_DATA.All();
		this.customScripts = await get("scripts") ?? {};
		this.showBottomSaveButton = true;
	}
	handleInput(role, type) {
		if (this.newScript[type]?.find((r) => r.id === role.id)) {
			this.newScript[type] = this.newScript[type].filter((r) => r.id !== role.id);
			return;
		}
		if (!this.newScript[type]) this.newScript[type] = [];
		const index = this.newScript[type].findIndex((r) => r.id === role.id);
		if (index > -1) {
			this.newScript[type].splice(index, 1);
			return;
		}
		this.newScript[type].push(role);
	}
	async handleFilter(e) {
		const filter = e.target.value.toLowerCase();
		if (filter === "") {
			this.all = await SCRIPTS_DATA.All().then((data) => data);
			return;
		}
		this.all = Object.keys(this.all).reduce((acc, type) => {
			acc[type] = this.all[type].filter((role) => role.humanReadableRole.toLowerCase().includes(filter));
			return acc;
		}, {});
		this.showBottomSaveButton = Object.values(this.all).reduce((sum, array) => sum + array.length, 0) > 10;
	}
	render() {
		return b`
      <h1 header>Create script</h1>
      <div class="search">
        <label ui-label for="scriptname">
          <input
            required
            ui-input
            type="text"
            value="Script name"
            name="scriptname"
            id="scriptname"
            placeholder="Script name"
          />
          <span>Script name</span>
        </label>
        <label ui-label for="script-select">
          <select
            @change=${this.changeBaseScript}
            ui-select
            name="scripts"
            id="script-select"
          >
            <option selected>None</option>
            ${Object.keys({
			...SCRIPTS_DATA,
			...this.customScripts
		}).filter((i) => i !== "All").map((script) => b`
                  <option value="${script}">${script}</option>
                `)}
          </select>
          <span>Base script</span>
        </label>
        <button ui-button primary @click=${this.saveScript}>Save script</button>
        ${when(this.validationErrors.length, () => b`
            <ul ui-error>
              ${this.validationErrors.map((error) => b` <li>${error}</li> `)}
            </ul>
          `)}
        <label id="search" ui-label>
          <input @input=${this.handleFilter} ui-input type="text" />
          <span>Search role</span>
        </label>
      </div>
      ${Object.keys(this.all).filter((type) => this.all[type].length).map((type) => b`
            <h2>${capitalize(type)}</h2>
            <ul>
              ${c(this.all[type].filter((r) => r.id !== "minioninfo" && r.id !== "demoninfo"), (role) => role.id, (role, i) => b`
                  <li>
                    <input
                      hidden
                      @input=${() => {
			this.handleInput(role, type);
		}}
                      id=${`${type}-${i}`}
                      type="checkbox"
                      .checked=${this.script?.[type]?.find((r) => r.id === role.id)}
                    />
                    <label for=${`${type}-${i}`} class="role">
                      <img src="${img(role)}" alt="${role.humanReadableRole}" />
                      <div>${role.humanReadableRole}</div>
                    </label>
                  </li>
                `)}
            </ul>
          `)}
      ${when(this.showBottomSaveButton, () => b`
          <button ui-button primary @click=${this.saveScript}>
            Save script
          </button>
        `)}
    `;
	}
};
customElements.define("botc-create-script", BotcCreateScript);
//#endregion
export { BotcCreateScript };
