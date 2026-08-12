import { A as i, I as i$1, P as b, c as bg6, f as border, t as when, x as main5 } from "./CY602n9t.js";
import { F as api, f as cache } from "./CP0hEE1l.js";
import "./vIOCOudq.js";
import "./ntwYzdyv.js";
import { t as achievement } from "./4XOd8FAf.js";
import { t as inlay } from "./Ue9OS-EJ.js";
import { t as buttonLink } from "./6PngWMwE.js";
//#region src/components/dialog/shared-personal-achievements.js
const achievementsJson = new URL(new URL("DTmu-NCn.json", import.meta.url).href).href;
var BotcSharedPersonalAchievements = class extends i {
	static properties = {
		name: { type: String },
		id: { type: String },
		achievements: { type: Object }
	};
	constructor() {
		super();
		this.achievements = {};
		this.name = "";
		this.ids = "";
	}
	async connectedCallback() {
		super.connectedCallback();
		this.achievements = await api.get(achievementsJson, { plugins: [cache] });
	}
	static styles = [
		inlay,
		buttonLink,
		i$1`
      botc-disclosure {
        background-color: ${bg6};
      }

      botc-disclosure::part(button) {
        padding-top: 16px;
        padding-bottom: 16px;
      }
      h2 {
        font-family: "Balgruf";
        font-size: 1.375rem;
        color: ${main5};
        text-align: center;
        text-shadow: 1px 1px 2px rgba(0, 0, 0, 1);
      }

      .icon {
        margin-top: 24px;
      }

      .icon svg {
        display: block;
        margin-left: auto;
        margin-right: auto;
        /* width: 24px;
        height: 50px; */
        fill: ${main5};
      }

      .header {
        justify-content: center;
        display: flex;
      }

      .header .icon {
        margin-right: 8px;
      }

      ul {
        list-style: none;
        padding: 0;
        margin: 0;
      }

      ul li:not(:last-child) {
        border-bottom: 1px solid ${border};
      }

      ul li:has(botc-disclosure[expanded]) {
        border-bottom: none;
      }
    `
	];
	render() {
		const str = this.ids;
		const pairs = [];
		for (let i = 0; i < str.length; i += 2) pairs.push(str.slice(i, i + 2));
		return b`
      ${Object.entries({ ...this.achievements }).map(([category, achievements]) => {
			return [category, achievements.filter((achievement) => pairs.includes(achievement.nrId))];
		}).map(([category, achievements]) => b`
          ${when(achievements.length, () => b`
              <div class="header">
                <div class="icon">${achievement}</div>
                <h2>${category}</h2>
              </div>
              <ul>
                ${achievements.map((achievement) => b`
                    <li>
                      <botc-disclosure>
                        <div slot="label">${achievement.name}</div>
                        <div ui-inlay slot="detail">
                          ${achievement.description}
                        </div>
                      </botc-disclosure>
                    </li>
                  `)}
              </ul>
            `)}
        `)}
    `;
	}
	close() {
		setTimeout(() => {
			dialog.close();
		});
	}
};
customElements.define("botc-shared-personal-achievements", BotcSharedPersonalAchievements);
//#endregion
export { BotcSharedPersonalAchievements };
