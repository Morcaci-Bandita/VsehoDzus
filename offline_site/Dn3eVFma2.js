import { A as i, I as i$1, O as spacer8, P as b, S as neutral, d as bg9, f as border, l as bg7, t as when, u as bg8, x as main5 } from "./CY602n9t.js";
import { I as images, b as img, d as alignment, m as capitalize } from "./CP0hEE1l.js";
import "./vIOCOudq.js";
import { t as inlay } from "./Ue9OS-EJ.js";
import "./GnpzsBGp.js";
import { t as button } from "./CbFrBy7s.js";
import { t as input } from "./_hTQLwBE.js";
//#region src/components/dialog/prev-game.js
var BotcPrevGame = class extends i {
	static properties = { game: { type: Object } };
	constructor() {
		super();
		this.game = {};
	}
	connectedCallback() {
		super.connectedCallback();
	}
	static styles = [
		button,
		input,
		inlay,
		i$1`
      ul {
        list-style: none;
        padding: 0;
        margin: 0;
        margin-top: 24px;
      }

      ul:last-of-type li:has(botc-player-details):last-of-type {
        margin-bottom: 40px;
      }

      h2.script {
        text-align: center;
        font-family: "Balgruf";
        font-size: 1.375rem;
        color: ${main5};
        text-shadow: 1px 1px 2px rgba(0, 0, 0, 1);
        margin-bottom: 0;
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
      img.blue {
        border: solid 2px #45a0f1;
      }
      img.red {
        border: solid 2px #d9403b;
      }

      .global-reminders {
        margin-top: 12px;
        margin-bottom: 18px;
      }

      .global-reminders ul {
        list-style: none;
        margin: 0;
        padding: 0;
      }

      .global-reminder:not(:last-child) {
        border-bottom: solid 1px ${border};
      }

      .global-reminder {
        display: flex;
        align-items: center;
        padding-top: 8px;
        padding-bottom: 8px;
      }

      .global-reminder:first-of-type {
        padding-top: 0;
      }

      .global-reminder:last-of-type {
        padding-bottom: 0;
      }

      .global-reminder .label {
        font-size: 0.85rem;
      }

      .global-reminder h2.title {
        display: flex;
        font-family: "Balgruf";
        font-size: 1.25rem;
        text-shadow: 1px 1px 2px rgba(0, 0, 0, 1);
        margin: 0;
      }

      .global-reminder img {
        margin-right: 12px;
        margin-left: 4px;
        width: 30px;
        height: 30px;
        border-radius: 50%;
      }

      [ui-inlay] {
        border-radius: ${spacer8};
        padding: 20px 12px;
        background: ${bg7};
        color: ${neutral};
        border: solid 1px ${bg9};
      }

      .demon-bluff {
        display: flex;
        align-items: center;
        margin-bottom: 12px;
      }

      .demon-bluff:last-child {
        margin-bottom: 0;
      }

      .demon-bluff img {
        margin-right: 12px;
        width: 40px;
        height: 40px;
        border-radius: 50%;
        border: solid 2px ${bg9};
        background-color: ${bg8};
      }

      .demon-bluff img.blue {
        border: solid 2px #45a0f1;
      }
      .demon-bluff img.red {
        border: solid 2px #d9403b;
      }
      .demon-bluff img.yellow {
        border: solid 2px #ffee00;
      }
      .demon-bluff img.green {
        border: solid 2px #a7e16c;
      }

      .demon-bluff .role-name {
        font-family: "Balgruf";
        font-size: 1.125rem;
        text-shadow: 1px 1px 2px rgba(0, 0, 0, 1);
      }

      .demon-bluff .role-name.blue {
        color: #45a0f1;
      }
      .demon-bluff .role-name.red {
        color: #d9403b;
      }
      .demon-bluff .role-name.yellow {
        color: #ffee00;
      }
      .demon-bluff .role-name.green {
        color: #a7e16c;
      }

      .demon-bluffs-title {
        text-align: center;
        font-family: "Balgruf";
        font-size: 1.25rem;
        text-shadow: 1px 1px 2px rgba(0, 0, 0, 1);
        margin-bottom: 12px;
        color: var(--ui-main-5);
      }

      .bluffs {
        margin-bottom: 60px;
      }
    `
	];
	render() {
		return b`
      <h2 class="script">
        ${this.game.script}, ${capitalize(this.game.result)}
      </h2>
      ${when(this.game?.notes, () => b` <p ui-inlay>${this.game.notes}</p> `)}
      ${when(this.game?.globalReminders?.length > 0, () => b`
          <div class="global-reminders" ui-inlay>
            <ul>
              ${this.game.globalReminders.map((reminder) => b`
                  <li class="global-reminder">
                    <img
                      class="${alignment(reminder.type)}"
                      src="${images.any(reminder.icon)}"
                      alt="${reminder.label}"
                    />
                    <div>
                      <h2 class="title balgruf ${alignment(reminder.type)}">
                        ${reminder.humanReadableRole}
                      </h2>
                      <div class="label">${reminder.summary}</div>
                    </div>
                  </li>
                `)}
            </ul>
          </div>
        `)}
      <ul>
        ${this.game.players.map((player) => b`
            <li>
              <botc-player-details
                ?me=${!this.game.stMode && player.me}
                .showRole=${true}
                .player=${player}
              ></botc-player-details>
            </li>
          `)}
      </ul>
      ${when(this.game?.demonBluffs?.length > 0, () => b`
          <div ui-inlay class="bluffs">
            <div class="demon-bluffs-title">Demon Bluffs</div>
            <div>
              ${this.game.demonBluffs.map((bluff) => b`
                  <div class="demon-bluff">
                    <img
                      class="${alignment(bluff.type)}"
                      src="${img(bluff)}"
                      alt="${bluff.humanReadableRole}"
                    />
                    <span class="role-name ${alignment(bluff.type)}"
                      >${bluff.humanReadableRole}</span
                    >
                  </div>
                `)}
            </div>
          </div>
        `)}
    `;
	}
};
customElements.define("botc-prev-game", BotcPrevGame);
//#endregion
export { BotcPrevGame };
