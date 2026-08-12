import { A as i, I as i$1, P as b, _ as focus, f as border, g as elevation4, o as bg4, s as bg5, v as header, x as main5 } from "./CY602n9t.js";
import { A as APPENDED_ROLES, m as capitalize, r as state } from "./CP0hEE1l.js";
import { t as dialog } from "./Dm27KaR0.js";
import "./B1OborLG.js";
import { n as showPlayer } from "./qv5ZEQIv.js";
//#region src/pages/cards.js
function inlineDialog(fn) {
	dialog.open({
		id: "inline",
		parameters: { render: fn }
	});
}
const style = `h2 {
    font-family: Balgruf;
     word-wrap: break-word;
    overflow-wrap: break-word;
    -webkit-hyphens: auto;
    -moz-hyphens: auto;
    -ms-hyphens: auto;
    hyphens: auto;

    font-size: 6.25rem;
    line-height: 0.9;
    color: var(--ui-main-5);
    text-align: center;
    text-shadow: 3px 3px 6px rgba(0, 0, 0, 1);
}`;
var BotcCards = class extends i {
	static styles = [header, i$1`
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
        font-size: 1.875rem;
        color: ${main5};
        text-align: center;
        text-shadow: 1px 1px 2px rgba(0, 0, 0, 1);
        line-height: 1.1;
        margin: 0;
      }

      ul {
        justify-content: center;
        margin: 0;
        list-style: none;
        padding: 0;
        display: flex;
        flex-wrap: wrap;
        margin-bottom: 48px;
      }

      li {
        height: 18vh;
        margin: 8px;
        width: calc(50% - 60px);
        border-radius: 4px;
        padding: 18px;
        display: flex;
        justify-content: center;
        align-items: center;
        background: ${bg5};
        border: solid 1px ${border};
        ${elevation4()}
        transition: transform 0.1s ease-in-out;
      }

      li:has(button:focus-visible) {
        ${focus()}
      }

      button {
        all: unset;
        display: block;
        width: 100%;
        height: 100%;
        cursor: pointer;
        text-align: center;
      }

      li:has(button:active) {
        transition: transform background 0.1s ease-in-out;
        transform: scale(0.95);
        background: ${bg4};
      }
    `];
	render() {
		const cards = [
			{
				render: b`Did<br />you<br />nominate?`,
				label: "Did you nominate?",
				dialogId: "card"
			},
			{
				render: b`Did<br />you<br />vote?`,
				label: "Did you vote?",
				dialogId: "card"
			},
			{
				render: b`The<br />demon<br />is`,
				label: "The demon is",
				dialogId: "demon"
			},
			{
				render: b`The<br />minions<br />are`,
				label: "The minions are",
				dialogId: "minions"
			},
			{
				render: b`These<br />roles are<br />not in<br />play`,
				label: "These roles are not in play",
				dialogId: "demonbluffs"
			},
			{
				render: b`This<br />character<br />selected<br />you`,
				label: "This character selected you",
				dialogId: "selected-you"
			},
			{
				render: b`This<br />player<br />is`,
				label: "This player is",
				dialogId: "player-is"
			},
			{
				render: b`Show<br />role`,
				label: "Show role",
				dialogId: "show-role"
			},
			{
				render: b`You<br />are`,
				label: "You are",
				dialogId: "you-are"
			},
			{
				render: b`Use<br />your<br />ability?`,
				label: "Use your ability?",
				dialogId: "card"
			},
			{
				render: b`Make<br />a<br />choice`,
				label: "Make a choice",
				dialogId: "card"
			},
			{
				render: b`Custom<br />text`,
				label: "",
				dialogId: "custom-text"
			}
		];
		const players = state.getState().currentGame.players;
		return b`
      <botc-back-button href="/actions"></botc-back-button>
      <h1 header>Cards</h1>
      <ul class="">
        ${cards.map((card) => b`
            <li>
              <button
                @click=${() => {
			if (card.dialogId === "card") dialog.open({
				id: "card",
				parameters: { render: card.render }
			});
			else if (card.dialogId === "custom-text") dialog.open({ id: "customText" }).then((text) => {
				inlineDialog(() => b`
                            <style>
                              ${style} h2 {
                                font-size: 3.75rem;
                                margin: 0;
                                hyphens: auto;
                              }

                              .card {
                                height: calc(100% - 40px);
                                display: flex;
                                justify-content: center;
                                align-items: center;
                              }
                            </style>
                            <div class="card">
                              <h2>${text}</h2>
                            </div>
                          `);
			});
			else if (card.dialogId === "demon") dialog.open({
				id: "playerSelect",
				parameters: { selected: players.filter((p) => p.suspectedRole?.type?.toLowerCase?.() === "demon") }
			}).then((selected) => {
				inlineDialog(() => b`
                            <style>
                              ${style} h2 {
                                font-size: 3.75rem;
                                margin: 0;
                                hyphens: auto;
                              }

                              .card {
                                height: calc(100% - 40px);
                                display: flex;
                                justify-content: center;
                                align-items: center;
                              }
                            </style>
                            <div class="card">
                              <h2>
                                ${card.render}<br />
                                ${capitalize(selected[0].name)}
                              </h2>
                            </div>
                          `);
			});
			else if (card.dialogId === "minions") dialog.open({
				id: "playerSelect",
				parameters: {
					multiple: true,
					selected: players.filter((p) => p.suspectedRole?.type?.toLowerCase?.() === "minion")
				}
			}).then((selected) => {
				inlineDialog(() => b`
                            <style>
                              ${style} h2 {
                                font-size: 3.75rem;
                                margin: 0;
                                hyphens: auto;
                              }

                              .card {
                                height: calc(100% - 40px);
                                display: flex;
                                justify-content: center;
                                align-items: center;
                              }
                            </style>
                            <div class="card">
                              <h2>
                                ${card.render}<br />
                                ${selected.map((p) => capitalize(p.name)).join(", ")}
                              </h2>
                            </div>
                          `);
			});
			else if (card.dialogId === "demonbluffs") inlineDialog(() => b`
                        <style>
                          ${style} h2 {
                            font-size: 3.25rem;
                            margin: 0;
                            hyphens: auto;
                          }

                          .card {
                            height: calc(100% - 40px);
                            display: flex;
                            justify-content: center;
                            align-items: center;
                          }
                        </style>
                        <div class="card">
                          <h2>
                            ${card.render}<br /><br />
                            ${state.getState().currentGame.demonBluffs.map((b) => b.humanReadableRole).join(", ")}
                          </h2>
                        </div>
                      `);
			else if (card.dialogId === "selected-you" || card.dialogId === "you-are") dialog.open({
				id: "roleSelect",
				parameters: {
					...card.dialogId !== "selected-you" ? { appendRoles: APPENDED_ROLES } : {},
					allScriptRoles: true,
					filterFn: (r) => r?.type?.toLowerCase() !== "traveller"
				}
			}).then((role) => {
				inlineDialog(() => b`
                            <style>
                              ${style} h2 {
                                font-size: 3.75rem;
                                margin: 0;
                                hyphens: auto;
                              }

                              .card {
                                height: calc(100% - 40px);
                                display: flex;
                                justify-content: center;
                                align-items: center;
                              }
                            </style>
                            <div class="card">
                              <h2>
                                ${card.render}:<br /><br />
                                ${capitalize(role?.[0]?.humanReadableRole ?? "")}
                              </h2>
                            </div>
                          `);
			});
			else if (card.dialogId === "player-is") dialog.open({
				id: "playerSelect",
				parameters: { showNightOrder: true }
			}).then(([player]) => {
				if (!player) return;
				dialog.open({
					id: "roleSelect",
					parameters: { allScriptRoles: true }
				}).then(([role]) => {
					showPlayer({
						title: `${capitalize(player.name)} is:`,
						role
					});
				});
			});
			else if (card.dialogId === "show-role") dialog.open({
				id: "roleSelect",
				parameters: { allScriptRoles: true }
			}).then(([role]) => {
				showPlayer({ role });
			});
		}}
              >
                <h2>${card.render}</h2>
              </button>
            </li>
          `)}
      </ul>
    `;
	}
};
customElements.define("botc-cards", BotcCards);
//#endregion
export { BotcCards };
