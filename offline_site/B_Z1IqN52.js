import { A as i, I as i$1, P as b, b as main4, d as bg9, f as border, t as when, u as bg8 } from "./CY602n9t.js";
import { b as img, d as alignment, m as capitalize } from "./CP0hEE1l.js";
import "./vIOCOudq.js";
import { t as inlay } from "./Ue9OS-EJ.js";
import "./CXEVaKnf2.js";
//#region src/components/dialog/view-custom-role.js
var BotcViewCustomRole = class extends i {
	static properties = { role: { type: Object } };
	constructor() {
		super();
		this.role = {};
	}
	async connectedCallback() {
		super.connectedCallback();
	}
	static styles = [inlay, i$1`
      .name {
        font-family: "Balgruf";
        font-size: 2rem;
        color: var(--ui-main-5);
        text-shadow: 1px 1px 2px rgba(0, 0, 0, 1);
        text-align: center;
        line-height: 0.9;
        margin-top: 0px;
        margin-bottom: 16px;
      }

      .flavor {
        font-style: italic;
        text-align: center;
      }

      .buttons {
        margin-top: auto;
      }

      .img {
        border-radius: 50%;
        border: solid 2px var(--ui-bg-9);
        background-color: var(--ui-bg-8);

        width: 75px;
        height: 75px;
        border-radius: 50%;
        display: block;
        margin-left: auto;
        margin-right: auto;
        margin-bottom: 24px;
        margin-top: 8px;
      }

      img.blue {
        border: solid 2px #45a0f1;
      }
      h2.blue {
        color: #45a0f1;
      }

      img.red {
        border: solid 2px #d9403b;
      }
      h2.red {
        color: #d9403b;
      }
      h2.yellow {
        color: #ffee00;
      }
      h2.green {
        color: #a7e16c;
      }
      img.yellow {
        border: solid 2px #ffee00;
      }
      img.green {
        border: solid 2px #a7e16c;
      }

      .tokens {
        display: flex;
        justify-content: center;
      }

      .token {
        display: flex;
        flex-direction: column;
        align-items: center;
        margin-right: 20px;
      }

      .token img {
        width: 50px;
        height: 50px;
        border-radius: 50%;
        border: solid 2px ${border};
        box-shadow: 1px 1px 2px 1px rgba(0, 0, 0, 0.75);
      }

      .token img.red {
        border: solid 2px #d9403b;
      }
      .token img.blue {
        border: solid 2px #45a0f1;
      }

      .tokens p {
        margin-top: 8px;
        font-size: 0.9rem;
        margin-bottom: 0;
      }

      .type {
        text-align: center;
      }

      .jinxes h2.jinx-title {
        text-align: center;
        display: block;
        margin-bottom: 32px;
      }

      .jinxes .jinx .jinx-role {
        display: flex;
        align-items: center;
        margin-bottom: 12px;
      }

      .jinxes h2 {
        display: flex;
        color: ${main4};
        font-family: "Balgruf";
        font-size: 1.375rem;
        text-shadow: 1px 1px 2px rgba(0, 0, 0, 1);
        margin: 0;
      }

      .jinxes img {
        margin-right: 12px;
        width: 50px;
        height: 50px;
        border-radius: 50%;
        border: solid 2px ${bg9};
        background-color: ${bg8};
      }

      .jinxes img.blue {
        border: solid 2px #45a0f1;
      }
      .jinxes h2.blue {
        color: #45a0f1;
      }

      .jinxes img.red {
        border: solid 2px #d9403b;
      }
      .jinxes h2.red {
        color: #d9403b;
      }

      ul.jinx-list {
        list-style: none;
        padding: 8px;
        margin: 0;
      }

      ul.jinx-list li.jinx-item {
        display: flex;
        align-items: center;
        padding-top: 12px;
        padding-bottom: 12px;
      }

      ul.jinx-list li.jinx-item:not(:last-child) {
        border-bottom: solid 1px ${border};
      }

      ul.jinx-list li.jinx-item p.reason {
        font-size: 0.85rem;
        margin-top: 0;
        margin-bottom: 0;
      }

      botc-card {
        margin-bottom: 24px;
      }

      .top {
        margin-top: 32px;
        margin-bottom: 24px;
      }

      .special-interaction-item {
        margin-bottom: 12px;
        padding-bottom: 12px;
        border-bottom: 1px solid ${border};
      }

      .special-interaction-item:last-child {
        border-bottom: none;
        margin-bottom: 0;
        padding-bottom: 0;
      }

      .special-header {
        display: flex;
        gap: 8px;
        margin-bottom: 4px;
        font-weight: 500;
      }

      .special-detail {
        display: flex;
        gap: 4px;
        font-size: 0.875rem;
        margin-bottom: 2px;
      }

      .detail-label {
        font-weight: 500;
      }
    `];
	render() {
		const tokens = [...new Set(this?.reminders ?? [])].map((reminder) => ({
			id: `${this.id}-${reminder}`,
			role: this.id,
			label: reminder,
			image: this.image,
			type: this.type,
			humanReadableRole: this.name
		}));
		return b`
      <div class="top">
        <img src=${this.role.image} class="img ${alignment(this.role.type)}" />
        <h2 class="name ${alignment(this.role.type)}">
          ${capitalize(this.role.humanReadableRole)}
        </h2>
        <p class="type">${this.role.type}</p>
        <div class="flavor" ui-inlay>"${this.role.flavor}"</div>
      </div>

      <botc-card label="Ability ${this.role.setup ? "(+setup)" : ""}">
        <p class="summary">${this.role.summary}</p>
        <p class="first-night">
          <b>First Night:</b>
          ${this.role.firstNight > 0 ? `Order ${this.role.firstNight} - ${this.role.firstNightReminder}` : "None"}
        </p>
        <p class="other-night">
          <b>Other Night:</b>
          ${this.role.otherNight > 0 ? `Order ${this.role.otherNight} - ${this.role.otherNightReminder}` : "None"}
        </p>
      </botc-card>

      ${when(tokens.length > 0, () => b`
          <botc-card label="Reminder tokens">
            <ul ui-inlay class="tokens">
              ${tokens.map((token) => b`
                  <li class="token">
                    <img
                      class="${alignment(token.type)}"
                      src="${token.image}"
                      alt="${token.humanReadableRole + " " + token.label}"
                      title="${token.humanReadableRole + " " + token.label}"
                    />
                    <p>${token.label}</p>
                  </li>
                `)}
            </ul>
          </botc-card>
        `)}
      ${when(this.role.jinxes.length, () => b`
          <botc-card class="jinxes" label="Jinxes">
            <ul class="jinx-list" ui-inlay>
              ${this.role.jinxes.map((jinx) => {
			const role = window.rolesById?.[jinx.id];
			if (!role) return b``;
			return b`
                      <li class="jinx-item">
                    <img class="${alignment(role.type)}" src=${img({ icon: jinx.id })}></img>
                    <div>
                      <h2 class="${alignment(role.type)}">${role.humanReadableRole}</h2>
                    <p class="reason">${jinx.reason}</p>
  
                    </div>
                      </li>
                    `;
		})}
            </ul>
          </botc-card>
        `)}
      ${when(this.role.special?.length, () => b`
          <botc-card label="Special interactions">
            ${this.role.special.map((specialItem, index) => b`
                <div class="special-interaction-item">
                  <div class="special-detail">
                    <span class="detail-label">Type:</span>
                    <span class="detail-value">${specialItem.type}</span>
                  </div>
                  <div class="special-detail">
                    <span class="detail-label">Name:</span>
                    <span class="detail-value">${specialItem.name}</span>
                  </div>

                  ${when(specialItem.value, () => b`
                      <div class="special-detail">
                        <span class="detail-label">Value:</span>
                        <span class="detail-value">${specialItem.value}</span>
                      </div>
                    `)}
                  ${when(specialItem.time, () => b`
                      <div class="special-detail">
                        <span class="detail-label">Timing:</span>
                        <span class="detail-value">${specialItem.time}</span>
                      </div>
                    `)}
                  ${when(specialItem.global, () => b`
                      <div class="special-detail">
                        <span class="detail-label">Global scope:</span>
                        <span class="detail-value">${specialItem.global}</span>
                      </div>
                    `)}
                </div>
              `)}
          </botc-card>
        `)}
    `;
	}
};
customElements.define("botc-view-custom-role", BotcViewCustomRole);
//#endregion
export { BotcViewCustomRole };
