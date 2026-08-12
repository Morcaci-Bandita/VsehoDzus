import { A as i, I as i$1, P as b, d as bg9, f as border, g as elevation4, s as bg5, u as bg8, v as header, x as main5 } from "./CY602n9t.js";
import { H as get, M as SCRIPTS_DATA, b as img, d as alignment, m as capitalize, r as state } from "./CP0hEE1l.js";
import "./ntwYzdyv.js";
import { n as moon, t as sun } from "./C15Vso4Y.js";
import { t as inlay } from "./Ue9OS-EJ.js";
import { t as button } from "./CbFrBy7s.js";
import { t as input } from "./_hTQLwBE.js";
import { t as select } from "./C-op7emD.js";
import "./CXEVaKnf2.js";
import "./B1OborLG.js";
//#region src/pages/night-order.js
var BotcNightOrder = class extends i {
	static properties = {
		firstNight: { type: Array },
		otherNights: { type: Array },
		day: { type: Number },
		rolesById: { type: Object },
		customScripts: { type: Object },
		script: { type: Object },
		scriptName: { type: String },
		currentScript: { type: String }
	};
	constructor() {
		super();
		this.firstNight = [];
		this.otherNights = [];
		this.day = 0;
		this.customScripts = {};
		this.script = {};
		this.scriptName = "Trouble Brewing";
		this.currentScript = "Trouble Brewing";
		this.rolesById = window.rolesById;
	}
	async connectedCallback() {
		super.connectedCallback();
		const script = new URLSearchParams(window.location.search).get("script");
		function mapScript(queryParam) {
			switch (queryParam) {
				case "tb": return "Trouble Brewing";
				case "snv": return "Sects & Violets";
				case "bmr": return "Bad Moon Rising";
				case "all": return "All";
				default: return;
			}
		}
		this.day = state.getState()?.currentGame?.day ?? 0;
		this.scriptName = mapScript(decodeURIComponent(script)) ?? state.getState()?.currentGame?.script ?? "Trouble Brewing";
		this.currentScript = this.scriptName;
		this.customScripts = await get("scripts") ?? {};
		await this.updateNightOrderFromScript(this.currentScript);
	}
	async updateNightOrderFromScript(scriptName) {
		this.script = await SCRIPTS_DATA[scriptName]();
		const relevantRoles = Object.values(this.script).flat();
		let firstNight = [];
		const otherNight = [];
		for (const role of relevantRoles) {
			if (role.firstNight && role.firstNight > 0) firstNight.push({
				image: role.image,
				icon: role.icon,
				id: role.id,
				type: role.type,
				firstNightReminder: role.firstNightReminder,
				humanReadableRole: role.humanReadableRole,
				order: role.firstNight
			});
			if (role.otherNight && role.otherNight > 0) otherNight.push({
				image: role.image,
				icon: role.icon,
				id: role.id,
				type: role.type,
				otherNightReminder: role.otherNightReminder,
				humanReadableRole: role.humanReadableRole,
				order: role.otherNight
			});
		}
		firstNight = firstNight.filter((r) => r.id !== "minioninfo" && r.id !== "demoninfo");
		if (!firstNight.find((r) => r.id === "minioninfo")) firstNight.push({
			humanReadableRole: "MINION INFO",
			id: "minioninfo",
			order: 14,
			type: "Minion"
		});
		if (!firstNight.find((r) => r.id === "demoninfo")) firstNight.push({
			humanReadableRole: "DEMON INFO",
			id: "demoninfo",
			order: 18,
			type: "Minion"
		});
		this.firstNight = firstNight.sort((a, b) => a.order - b.order);
		this.otherNights = otherNight.sort((a, b) => a.order - b.order);
	}
	async changeScript() {
		this.currentScript = this.shadowRoot.querySelector("#script-select").value;
		await this.updateNightOrderFromScript(this.currentScript);
	}
	static styles = [
		button,
		inlay,
		header,
		select,
		input,
		i$1`
      :host {
        display: block;
        padding: 16px;
      }

      botc-disclosure {
        background-color: ${bg5};
      }

      botc-disclosure::part(button) {
        padding-top: 16px;
        padding-bottom: 16px;
      }

      ul {
        list-style: none;
        padding: 0;
      }

      h2 {
        font-family: "Balgruf";
        font-size: 1.375rem;
        color: ${main5};
        text-shadow: 1px 1px 2px rgba(0, 0, 0, 1);
        text-align: center;
      }

      .no-img {
        width: 50px;
        height: 50px;
        margin-right: 10px;
      }

      img {
        width: 50px;
        height: 50px;
        border-radius: 50%;
        border: solid 2px ${bg9};
        background-color: ${bg8};
        margin-right: 10px;
      }

      ul .role {
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

      img.red {
        border: solid 2px #d9403b;
      }
      img.blue {
        border: solid 2px #45a0f1;
      }
      img.yellow {
        border: solid 2px #ffee00;
      }
      img.green {
        border: solid 2px #a7e16c;
      }

      h2 {
        font-family: "Balgruf";
        font-size: 1.375rem;
        color: ${main5};
        text-shadow: 1px 1px 2px rgba(0, 0, 0, 1);
      }

      .balgruf {
        font-family: "Balgruf";
        font-size: 1.375rem;
        color: ${main5};
        text-shadow: 1px 1px 2px rgba(0, 0, 0, 1);
      }

      .dawn-dusk {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 50px;
        height: 50px;
        border-radius: 50%;
        border: solid 2px ${bg9};
        background-color: ${bg8};
        margin-right: 10px;
        margin-left: 8px;
      }

      .dawn-dusk svg {
        width: 30px;
        height: 30px;
        fill: var(--ui-main-5);
      }

      .reminder {
        font-size: 0.825rem;
      }

      .role-name {
        font-weight: 700;
        color: ${main5};
      }

      .role-name.red {
        color: #d9403b;
      }
      .role-name.blue {
        color: #45a0f1;
      }
      .role-name.yellow {
        color: #ffee00;
      }
      .role-name.green {
        color: #a7e16c;
      }
    `
	];
	render() {
		return b`
      <botc-back-button href="/actions"></botc-back-button>

      <h1 header>Night order</h1>
      <h2>Day: ${this.day + 1}</h2>
      <botc-card label="">
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
          </select>
          <span>Script</span>
        </label>
        <botc-disclosure .expanded=${this.day === 0}>
          <div slot="label">First night</div>
          <div ui-inlay slot="detail">
            <ul>
              ${this.renderDawnDusk("dawn")}
              ${this.firstNight.map((r) => b`
                  <li>
                    <div class="role">
                      <img
                        src="${img(r)}"
                        alt="${r.humanReadableRole}"
                        width="20"
                        class="${r.id === "minioninfo" || r.id === "demoninfo" ? "" : alignment(r.type)}"
                        height="20"
                        style="margin-left: 8px; border-radius: 50%; box-shadow: ${elevation4};"
                      />
                      <div>
                        <div class="role-name  balgruf ${alignment(r.type)}">
                          ${capitalize(r?.humanReadableRole?.toLowerCase() ?? "")}
                        </div>
                        <div class="reminder">${r.firstNightReminder}</div>
                      </div>
                    </div>
                  </li>
                `)}
              ${this.renderDawnDusk("dusk")}
            </ul>
          </div>
        </botc-disclosure>
        <botc-disclosure .expanded=${this.day > 0}>
          <div slot="label">Other nights</div>
          <div ui-inlay slot="detail">
            <ul>
              ${this.renderDawnDusk("dawn")}
              ${this.otherNights.map((r) => b`
                  <li>
                    <div class="role">
                      <img
                        src="${img(r)}"
                        alt="${r.humanReadableRole}"
                        width="20"
                        class="${alignment(r.type)}"
                        height="20"
                        style="margin-left: 8px; border-radius: 50%; box-shadow: ${elevation4};"
                      />
                      <div>
                        <div class="role-name balgruf ${alignment(r.type)}">
                          ${capitalize(r?.humanReadableRole?.toLowerCase() ?? "")}
                        </div>
                        <div class="reminder">${r.otherNightReminder}</div>
                      </div>
                    </div>
                  </li>
                `)}
              ${this.renderDawnDusk("dusk")}
            </ul>
          </div>
        </botc-disclosure>
      </botc-card>
    `;
	}
	renderDawnDusk(kind) {
		return b` <li>
      <div class="role">
        <div class="dawn-dusk">${kind === "dawn" ? moon : sun}</div>
        <div class="role-name balgruf">
          ${kind === "dawn" ? "Dusk" : "Dawn"}
        </div>
      </div>
    </li>`;
	}
};
customElements.define("botc-night-order", BotcNightOrder);
//#endregion
export { BotcNightOrder };
