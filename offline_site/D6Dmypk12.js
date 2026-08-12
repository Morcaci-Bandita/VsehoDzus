import { A as i, I as i$1, L as r, P as b, _ as focus, d as bg9, g as elevation4, o as bg4, s as bg5, t as when, u as bg8, x as main5 } from "./CY602n9t.js";
import { N as SORT_ORDER, b as img, d as alignment, m as capitalize } from "./CP0hEE1l.js";
import { A as info, U as kebab } from "./CEyrKUT7.js";
import { t as check } from "./BTrKfjJH.js";
import { t as button } from "./CbFrBy7s.js";
import { t as iconButton } from "./C0jyJKsx.js";
import { t as dialog } from "./Dm27KaR0.js";
import { t as c } from "./CINdyCSV.js";
import { t as context } from "./BgH8Gcb8.js";
import { t as visuallyHidden } from "./DZ8S2RMZ.js";
//#region src/components/botc-roles-list.js
var BotcRolesList = class extends i {
	static properties = {
		stMode: { type: Boolean },
		script: { type: Object },
		showMoreInfo: { type: Boolean }
	};
	constructor() {
		super();
		this.stMode = false;
		this.script = {};
		this.rolesById = {};
		this.showMoreInfo = false;
	}
	static styles = [iconButton, i$1`
      ${r(visuallyHidden)}

      ul.roles-list {
        list-style: none;
        padding: 0;
        margin-top: 0;
        margin-bottom: 0;
      }

      ul.roles-list li.role h2 {
        font-size: 1.375rem;
        margin: 0;
      }

      ul.roles-list li.role div.role-header {
        display: flex;
        align-items: center;
        /* margin-top: 16px; */
        /* margin-bottom: 16px; */
        /* justify-content: space-between; */
      }

      ul.roles-list li.role p {
        margin-top: 4px;
      }

      ul.roles-list li.role img {
        margin-right: 16px;
        width: 50px;
        height: 50px;
        border-radius: 50%;
        border: solid 2px ${bg9};
        background-color: ${bg8};
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

      .token-wrapper {
        display: flex;
        align-items: center;
        flex-direction: column;
        margin-right: 10px;
      }

      .status-token {
        box-shadow: 1px 1px 2px 1px rgba(0, 0, 0, 0.75);
        width: 25px;
        margin: 0;
        height: 25px;
      }

      .token-label {
        font-size: 0.5rem;
        font-weight: 300;
        font-family: "Poppins";
        text-shadow: none;
        color: white;
        margin-top: 4px !important;
        text-align: center;
      }

      .status-token:last-child {
        margin-right: 0;
      }

      img.no-role.dead {
        border: solid 2px #45a0f1;
      }

      .tokens {
        display: flex;
        align-items: center;
        margin-right: 8px;
      }

      ul.tokens-list .token-wrapper img.status-token {
        margin: 0;
        width: 25px;
        height: 25px;
      }

      ul.tokens-list .token-wrapper img.status-token.blue {
        border: solid 2px #45a0f1 !important;
      }
      ul.tokens-list .token-wrapper h2.blue {
        color: #45a0f1;
      }

      ul.tokens-list .token-wrapper img.status-token.red {
        border: solid 2px #d9403b !important;
      }
      ul.tokens-list .token-wrapper h2.red {
        color: #d9403b;
      }

      ul.tokens-list .token-wrapper h2.yellow {
        color: #ffee00;
      }
      ul.tokens-list .token-wrapper img.yellow {
        border: solid 2px #ffee00;
      }
      ul.tokens-list .token-wrapper h2.green {
        color: #a7e16c;
      }
      ul.tokens-list .token-wrapper img.green {
        border: solid 2px #a7e16c;
      }

      .tokens-list {
        padding: 0;
        display: flex;
      }

      ul.roles-list li.role:has(botc-disclosure[expanded]) {
        border-bottom: none;
      }

      ul.jinxes {
        list-style: none;
        padding: 0;
        margin-top: 0;
        margin-bottom: 0;
      }

      ul.jinxes li {
        display: flex;
      }

      ul.jinxes li:not(:last-child) {
        margin-bottom: 12px;
        padding-bottom: 12px;
        border-bottom: solid 1px var(--ui-border);
      }

      ul.roles-list li img.blue {
        border: solid 2px #45a0f1;
      }
      ul.roles-list li img.red {
        border: solid 2px #d9403b;
      }

      ul.roles-list li img.yellow {
        border: solid 2px #ffee00;
      }
      ul.roles-list li img.green {
        border: solid 2px #a7e16c;
      }

      ul.jinxes li img.red {
        border: solid 2px #d9403b;
      }
      ul.jinxes li h2.red {
        color: #d9403b;
      }
      ul.jinxes li img.blue {
        border: solid 2px #45a0f1;
      }
      ul.jinxes li h2.blue {
        color: #45a0f1;
      }

      ul.jinxes li h2.yellow {
        color: #ffee00;
      }
      ul.jinxes li img.yellow {
        border: solid 2px #ffee00;
      }
      ul.jinxes li h2.green {
        color: #a7e16c;
      }
      ul.jinxes li img.green {
        border: solid 2px #a7e16c;
      }

      ul.jinxes li div.jinx-img-wrapper {
        display: flex;
        justify-content: center;
        align-items: center;
      }

      ul.jinxes li .jinx-title {
        text-align: left;
      }

      ul[ui-inlay].jinxes {
        padding: 20px 12px;
      }

      div div.jinx-reason {
        font-size: 0.75rem;
        margin-top: 6px;
        margin-bottom: 6px;
      }

      label[ui-checkbox] {
        display: flex;
        border: solid 1px var(--ui-border);
        border-radius: 4px;
        margin-top: 16px;
        margin-bottom: 16px;
        ${elevation4()}
      }

      label[ui-checkbox] div {
        border-radius: 4px;
        padding: 8px;
        height: 100%;
        width: 100%;
        display: flex;
      }

      label[ui-checkbox] input:focus-visible + * {
        background: ${bg5};
        transition: background 0.2s ease-in;
        ${focus()}
      }

      label[ui-checkbox] input:hover + * {
        background: ${bg5};
        transition: background 0.2s ease-in;
      }

      label[ui-checkbox] input:active + * {
        background: ${bg4};
        transition: background 0.2s ease-in;
      }

      label[ui-checkbox] .checkbox {
        width: 20px;
        height: 20px;
        border-radius: 50%;
        border: solid 2px var(--ui-bg-9);
        background: var(--ui-bg-8);
        margin-right: 8px;
      }

      label[ui-checkbox] input:checked + div .checkbox {
        border: solid 2px rgb(112, 210, 125);
        background: #586f5a;
      }

      label[ui-checkbox] input + div .checkbox span {
        display: none;
      }

      label[ui-checkbox] input:checked + div .checkbox span svg {
        width: 20px;
        height: 20px;
      }

      label[ui-checkbox] input:checked + div .checkbox span {
        display: flex;
        justify-content: center;
        align-items: center;
      }

      label[ui-checkbox] input:checked + div {
        background: ${bg4};
        transition:
          background 0.2s ease-in,
          border 0.2s ease-in;
      }

      h2 {
        font-family: "balgruf";
        font-weight: 600;
        text-align: center;
        font-size: 1.7rem;
        color: var(--ui-main-4);
        text-shadow: 1px 1px 2px rgba(0, 0, 0, 1);
      }

      h3 {
        font-family: "Balgruf";
        font-size: 1.375rem;
        color: ${main5};
        text-shadow: 1px 1px 2px rgba(0, 0, 0, 1);
        margin: 0;
      }

      h2.blue,
      h3.blue {
        color: #45a0f1;
      }

      h2.red,
      h3.red {
        color: #d9403b;
      }
      h2.yellow,
      h3.yellow {
        color: #ffee00;
      }
      h2.green,
      h3.green {
        color: #a7e16c;
      }

      botc-card {
        margin-bottom: 8px;
      }

      .type {
        margin-top: 32px;
        margin-bottom: 16px;
      }

      h2.st {
        margin-top: 8px !important;
        margin-bottom: 8px !important;
        text-align: left;
      }

      .wrapper {
        display: flex;
        align-items: stretch;
      }

      .wrapper > div:first-child {
        flex: 0;
      }

      .wrapper > div:nth-child(2) {
        flex: 1;
      }

      .wrapper.st > div:first-child {
        flex: 1;
      }
      .wrapper.st > div:nth-child(2) {
        flex: 0;
      }

      .menu-button {
        margin-left: 12px;
        height: auto;
      }

      .role-img {
        display: flex;
        justify-content: center;
        align-items: center;
      }

      .role-img.st {
        display: block;
      }

      .role-title.st {
        /* margin-top: 8px; */
      }

      h2.st.first {
        margin-top: 16px !important;
      }

      .summary {
        font-size: 0.85rem;
      }

      .st-header {
        display: flex;
        /* justify-content: center; */
        align-items: center;
      }

      button[ui-icon-button] {
        height: 100%;
        align-items: center;
      }
    `];
	render() {
		return b`
      <div>
        <label ui-checkbox>
          <input
            visually-hidden
            type="checkbox"
            ?checked=${this.stMode}
            name="stMode"
            id="stMode"
            @input=${(e) => {
			this.stMode = e.target.checked;
		}}
          />
          <div>
            <span class="checkbox"><span>${check}</span></span>
            <span>Show Storyteller info</span>
          </div>
        </label>
      </div>

      ${Object.keys(this.script).filter((type) => this.script[type].length).sort((a, b) => SORT_ORDER.indexOf(a) - SORT_ORDER.indexOf(b)).map((type) => b`
            <h2 class="${alignment(type)} type">${capitalize(type)}</h2>

            <ul class="roles-list">
              ${c(this.script[type], (role) => role.id, (role) => {
			if (role.id === "minioninfo" || role.id === "demoninfo") return;
			return b`
                    <li class="role">
                      <botc-card>
                        <div class="wrapper ${this.stMode ? "st" : ""}">
                          ${when(!this.stMode, () => b`
                              <div class="role-img ${this.stMode ? "st" : ""}">
                                <div class="role-header">
                                  <img
                                    class="${alignment(role.type)}"
                                    src="${img(role)}"
                                    alt="${role.humanReadableRole}"
                                  />
                                </div>
                              </div>
                            `)}
                          <div>
                            <div class="st-header">
                              ${when(this.stMode, () => b`
                                  <img
                                    class="${alignment(role.type)}"
                                    src="${img(role)}"
                                    alt="${role.humanReadableRole}"
                                  />
                                `)}
                              <h3
                                class="role-title ${this.stMode ? "st" : ""} ${alignment(role.type)}"
                              >
                                ${role.humanReadableRole}
                              </h3>
                            </div>
                            <div>
                              ${when(this.stMode, () => b`<h2 class="st first">Ability</h2>`)}
                              <div class="summary">${role.summary}</div>
                              ${when(this.stMode, () => b`
                                  ${when(!!role?.firstNightReminder || !!role?.otherNightReminder, () => b`
                                      <h2 class="st">How to run</h2>
                                      <div>
                                        ${when(role.firstNightReminder, () => b`
                                            <p>
                                              <b>First night:</b>
                                              ${role.firstNightReminder}
                                            </p>
                                          `)}
                                        ${when(role.otherNightReminder, () => b`
                                            <p>
                                              <b>Other night:</b>
                                              ${role.otherNightReminder}
                                            </p>
                                          `)}
                                      </div>
                                    `)}
                                  ${when(role.reminders?.length, () => b`
                                      <h2 class="st">Reminder tokens</h2>
                                      <div ui-inlay>
                                        <ul class="tokens-list">
                                          ${role.reminders.map((token) => {
				return b`
                                              <li class="token-wrapper">
                                                <img
                                                  class="status-token ${alignment(role.type)}"
                                                  src="${img(role)}"
                                                  alt="${token.humanReadableRole + " " + token}"
                                                  title="${token.humanReadableRole + " " + token}"
                                                />
                                                <div class="token-label">
                                                  ${token}
                                                </div>
                                              </li>
                                            `;
			})}
                                        </ul>
                                      </div>
                                    `)}
                                  ${when(role?.jinxes?.length && Object.keys(this.rolesById).length, () => b`
                                      <h2 class="st">Jinxes</h2>
                                      <ul ui-inlay class="jinxes">
                                        ${role.jinxes.map((jinx) => {
				const r = this.rolesById[jinx.id];
				return b`
                                            <li>
                                              <div class="jinx-img-wrapper">
                                                <img
                                                  class="status-token ${alignment(r.type)}"
                                                  src="${img(r)}"
                                                  alt="${r.humanReadableRole}"
                                                  title="${r.humanReadableRole}"
                                                />
                                              </div>
                                              <div class="jinx-text">
                                                <h2
                                                  class="jinx-title ${alignment(r.type)}"
                                                >
                                                  ${r.humanReadableRole}
                                                </h2>
                                                <div class="jinx-reason">
                                                  ${jinx.reason}
                                                </div>
                                              </div>
                                            </li>
                                          `;
			})}
                                      </ul>
                                    `)}
                                `)}
                            </div>
                          </div>
                          ${when(!!window?.originalRoles?.[role.id] && this.showMoreInfo, () => b`
                              <div class="menu-button">
                                <button
                                  ${context(dialog, () => b`
                                      <botc-more-info
                                        .id=${role.id}
                                        .humanReadableRole=${role.humanReadableRole}
                                      ></botc-more-info>
                                    `)}
                                  ui-icon-button
                                >
                                  ${kebab}
                                </button>
                              </div>
                            `)}
                        </div>
                      </botc-card>
                    </li>
                  `;
		})}
            </ul>
          `)}
    `;
	}
};
customElements.define("botc-roles-list", BotcRolesList);
var BotcMoreInfo = class extends i {
	static properties = {
		id: { type: String },
		humanReadableRole: { type: String }
	};
	static styles = [button, i$1`
      .custom-scripts button[ui-button] {
        display: flex;
        justify-content: center;
        align-items: center;
      }

      .custom-scripts button[ui-button] svg {
        fill: var(--ui-main-5);
      }

      .custom-scripts button[ui-button] span {
        flex: 1;
        margin-left: -24px;
      }
    `];
	async openDialog(id, parameters) {
		dialog.close();
		await dialog.closed;
		await new Promise((r) => requestAnimationFrame(r));
		dialog.open({
			id,
			parameters
		});
	}
	render() {
		return b`
      <div class="custom-scripts">
        <button
          ui-button
          secondary
          @click=${() => this.openDialog("moreRoleInfo", {
			id: this.id,
			humanReadableRole: this.humanReadableRole
		})}
        >
          ${info} <span>More info</span>
        </button>
      </div>
    `;
	}
};
customElements.define("botc-more-info", BotcMoreInfo);
//#endregion
