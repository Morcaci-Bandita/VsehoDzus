import { A as i, I as i$1, P as b, f as border, i as bg2, r as bg1, t as when, v as header, x as main5 } from "./CY602n9t.js";
import { F as api, H as get, U as set } from "./CP0hEE1l.js";
import "./vIOCOudq.js";
import "./ntwYzdyv.js";
import "./CEyrKUT7.js";
import { t as achievement } from "./4XOd8FAf.js";
import { t as inlay } from "./Ue9OS-EJ.js";
import { t as button } from "./CbFrBy7s.js";
import { t as dialog } from "./Dm27KaR0.js";
import "./DPxjp5Y3.js";
import "./CXEVaKnf2.js";
import "./B1OborLG.js";
//#region src/pages/achievements.js
const achievements = new URL(new URL("DTmu-NCn.json", import.meta.url).href).href;
var BotcAchievements = class extends i {
	static styles = [
		header,
		inlay,
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

      h2 {
        font-family: "Balgruf";
        font-size: 1.375rem;
        color: ${bg1};
        text-shadow: 1px 1px 2px rgba(0, 0, 0, 1);
        margin: 0;
      }

      ul {
        list-style: none;
        padding: 0;
        margin: 0;
      }

      ul li {
        display: flex;
        align-items: center;
      }

      ul li:not(:last-child) {
        border-bottom: 1px solid ${border};
      }

      p {
        margin-top: 0;
        margin-bottom: 0;
        font-size: 0.9rem;
      }

      .achieved {
        color: ${main5};
      }

      botc-disclosure::part(label) {
        flex: 1;
      }

      .icon {
        margin-left: auto;
        margin-right: 8px;
        width: 24px;
        height: 24px;
        display: block;
        margin-right: 8px;
      }

      .icon svg {
        fill: ${bg2}!important;
      }
      .icon.achieved svg {
        fill: ${main5}!important;
      }

      .text {
        flex: 1;
        display: flex;
        flex-direction: column;
      }

      div[slot="label"] {
        display: flex;
        align-items: center;
      }

      div[slot="label"] h2 {
        flex: 1 !important;
      }

      botc-disclosure::part(button) {
        padding-top: 16px;
        padding-bottom: 16px;
      }

      botc-switch {
        margin-top: 18px;
      }

      .suggestions {
        margin-bottom: 16px;
      }

      .stats {
        display: flex;
        flex-direction: column;
      }

      .stats li {
        display: flex;
        flex-direction: row;
        padding-top: 8px;
        padding-bottom: 8px;
      }

      .stats li:not(:last-child) {
        border-bottom: 1px solid ${border};
      }

      .stats li .type {
        flex: 1;
      }

      ul li:has(botc-disclosure[expanded]) {
        border-bottom: none;
      }

      .colorednr {
        color: ${main5};
      }

      .tabular {
        font-variant-numeric: tabular-nums;
      }

      button[ui-button].share-btn {
        margin-bottom: 16px;
      }
    `
	];
	static properties = {
		achievements: { type: Object },
		achieved: { type: Array }
	};
	constructor() {
		super();
		this.achievements = {};
		this.achieved = [];
	}
	async connectedCallback() {
		super.connectedCallback();
		this.achieved = await get("achievements") ?? [];
		this.achievements = await api.get(achievements);
	}
	render() {
		let total = 0;
		let achieved = 0;
		let shareUrl = "";
		const types = {};
		for (const [type, achievements] of Object.entries(this.achievements)) this.achievements[type] = achievements.map((achievement) => {
			const hasAchievement = this.achieved.find(({ id }) => id === achievement.id);
			if (!types[type]) types[type] = {
				achievements: 0,
				total: 0
			};
			types[type].achievements += hasAchievement ? 1 : 0;
			types[type].total += 1;
			if (hasAchievement) {
				shareUrl += achievement.nrId;
				achieved++;
			}
			total++;
			return {
				...achievement,
				achieved: !!hasAchievement
			};
		});
		return b`
      <botc-back-button href="/menu"></botc-back-button>

      <h1 header>Achievements</h1>
      <p class="suggestions" ui-inlay>
        Do you have suggestions for achievements? Reach out on the
        <a href="https://discord.gg/aKNjG98w9S">Discord</a>!
      </p>
      <button
        class="share-btn"
        ui-button
        primary
        @click=${() => {
			dialog.open({
				id: "shareMyAchievements",
				parameters: { shareUrl }
			});
		}}
      >
        Share my achievements
      </button>
      <botc-card label="Achievements">
        <ul class="stats">
          ${Object.entries(types).map(([type, { achievements, total }]) => {
			return b`
              <li class="text">
                <div class="type">${type}</div>
                <div class="tabular">
                  <b><span class="colorednr">${achievements}</span></b> /
                  ${total}
                </div>
              </li>
            `;
		})}
          <li class="text">
            <div class="type">Total</div>
            <div class="tabular">
              <b><span class="colorednr">${achieved}</span></b> / ${total}
            </div>
          </li>
        </ul>
      </botc-card>
      <div class="grid-container">
        ${Object.entries(this.achievements).map(([type, achievements]) => {
			return b`
            <botc-card label="${type}">
              <ul>
                ${achievements.map((achievement$1) => {
				const achieved = this.achieved.find(({ id }) => id === achievement$1.id);
				return b`
                    <li>
                      <botc-disclosure>
                        <div slot="label">
                          <h2 class=${achieved ? "achieved" : ""}>
                            ${achievement$1.name}
                          </h2>
                          <div class="icon ${achieved ? "achieved" : ""}">
                            ${achieved ? achievement : ""}
                          </div>
                        </div>
                        <div ui-inlay slot="detail">
                          <p>${achievement$1.description}</p>
                          <botc-switch
                            @checked-changed=${({ checked }) => this.checkedChanged(checked, achievement$1)}
                            ?checked=${!!achieved}
                            >Achieved</botc-switch
                          >
                          ${when(!!navigator.share, () => {
					return b`
                              <button
                                ui-button
                                secondary
                                @click=${() => {
						navigator.share({
							title: "Check out this achievement",
							text: achievement$1.name,
							url: `https://${window.location.host}/?achievement=${achievement$1.id}`
						});
					}}
                              >
                                Share
                              </button>
                            `;
				})}
                        </div>
                      </botc-disclosure>
                    </li>
                  `;
			})}
              </ul>
            </botc-card>
          `;
		})}
      </div>
    `;
	}
	async checkedChanged(checked, achievement) {
		if (checked) {
			this.achieved.push(achievement);
			achievement.achieved = true;
			await set("achievements", this.achieved);
		} else {
			this.achieved = this.achieved.filter(({ id }) => id !== achievement.id);
			achievement.achieved = false;
			await set("achievements", this.achieved);
		}
		this.requestUpdate();
	}
};
customElements.define("botc-achievements", BotcAchievements);
//#endregion
export { BotcAchievements };
