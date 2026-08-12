import { A as i, I as i$1, P as b, x as main5 } from "./CY602n9t.js";
import { F as api, f as cache } from "./CP0hEE1l.js";
import { t as achievement } from "./4XOd8FAf.js";
import { t as inlay } from "./Ue9OS-EJ.js";
import { t as buttonLink } from "./6PngWMwE.js";
//#region src/components/dialog/share-achievement.js
const achievementsJson = new URL(new URL("DTmu-NCn.json", import.meta.url).href).href;
var BotcShareAchievement = class extends i {
	static properties = {
		achievement: { type: Object },
		id: { type: String }
	};
	constructor() {
		super();
		this.achievement = {};
		this.id = "";
	}
	async connectedCallback() {
		super.connectedCallback();
		const achievements = await api.get(achievementsJson, { plugins: [cache] });
		this.achievement = Object.values(achievements).reduce((acc, a) => acc.concat(a), []).find((a) => a.id === this.id);
	}
	static styles = [
		inlay,
		buttonLink,
		i$1`
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
        width: 50px;
        height: 50px;
        fill: ${main5};
      }
    `
	];
	render() {
		return b`
      <div class="icon">${achievement}</div>
      <h2>${this.achievement.name}</h2>
      <p ui-inlay>${this.achievement.description}</p>
      <a @click=${this.close} ui-button-link secondary href="/achievements">
        <span>View all achievements</span>
      </a>
    `;
	}
	close() {
		setTimeout(() => {
			dialog.close();
		});
	}
};
customElements.define("botc-share-achievement", BotcShareAchievement);
//#endregion
export { BotcShareAchievement };
