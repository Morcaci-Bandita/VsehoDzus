import { A as i, I as i$1, P as b, a as bg3, c as bg6, d as bg9, f as border, g as elevation4, n as ALIGNMENT_COLORS, s as bg5, t as when, u as bg8, v as header, x as main5 } from "./CY602n9t.js";
import { b as img, d as alignment, h as formatDate, i as stats } from "./CP0hEE1l.js";
import "./vIOCOudq.js";
import "./ntwYzdyv.js";
import { B as img$1, H as share, R as grim, U as kebab } from "./CEyrKUT7.js";
import { t as remove } from "./dKNDhBkx.js";
import { t as inlay } from "./Ue9OS-EJ.js";
import { t as button } from "./CbFrBy7s.js";
import { t as iconButton } from "./C0jyJKsx.js";
import { t as dialog } from "./Dm27KaR0.js";
import { t as context } from "./BgH8Gcb8.js";
import "./CXEVaKnf2.js";
import { t as shareGameAsImage } from "./CV1TgXsw.js";
import "./B1OborLG.js";
//#region src/pages/stats.js
var BotcStats = class extends i {
	static styles = [
		header,
		inlay,
		button,
		iconButton,
		i$1`
      :host {
        display: block;
        padding: 16px;
      }

      h2 {
        font-family: "Balgruf";
        font-size: 1.375rem;
        color: ${main5};
        text-shadow: 1px 1px 2px rgba(0, 0, 0, 1);
        margin-bottom: 8px;
      }

      .bar {
        height: 8px;
      }

      .left {
        border-top-left-radius: 6px;
        border-bottom-left-radius: 6px;
      }

      .right {
        border-top-right-radius: 6px;
        border-bottom-right-radius: 6px;
      }

      .red {
        background: ${ALIGNMENT_COLORS.EVIL};
      }

      .blue {
        background: ${ALIGNMENT_COLORS.GOOD};
      }

      .bg {
        background: ${bg3};
        border-radius: 8px;
        margin-top: 18px;
      }

      .percentages {
        display: flex;
        justify-content: space-between;
        margin-top: 8px;
        font-size: 0.9rem;
        margin-bottom: 12px;
      }

      botc-disclosure {
        background-color: ${bg6};
      }

      botc-card botc-disclosure {
        background-color: ${bg5};
      }

      botc-disclosure::part(button) {
        padding-top: 16px;
        padding-bottom: 16px;
      }

      ul.prev-games {
        list-style: none;
        margin: 0;
        padding: 0;
      }

      ul.prev-games li {
        display: flex;
        padding-top: 8px;
        padding-bottom: 8px;
        justify-content: center;
        align-items: center;
      }

      ul.prev-games li span {
        flex: 1;
      }

      ul.prev-games li button[ui-icon-button] svg {
        fill: white;
      }

      ul.prev-games li:not(:last-child) {
        border-bottom: solid 1px ${bg3};
      }

      .radius {
        border-radius: 8px;
      }

      .prev-games li div {
        flex: 1;
        display: flex;
        flex-direction: column;
      }

      li {
        display: flex;
      }

      botc-card {
        margin-bottom: 30px;
      }

      .stats-list {
        padding: 0;
        list-style: none;
      }

      .stats-list li {
        display: flex;
        justify-content: space-between;
        padding: 8px 0;
      }

      .stats-list li:not(:last-child) {
        border-bottom: solid 1px ${bg3};
      }

      .nr {
        font-weight: bold;
        color: ${main5};
      }

      botc-card .bar-cont:first-of-type {
        margin-top: 32px;
      }

      button[ui-button].quick-add {
        margin-bottom: 24px;
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
        width: 100%;
      }

      .label {
        width: 100%;
        display: flex;
      }

      .flex {
        flex: 1;
      }

      .nr {
        font-weight: bold;
        color: ${main5};
      }

      img.border-blue {
        border: solid 2px #45a0f1;
      }

      img.border-red {
        border: solid 2px #d9403b;
      }

      .top3 .role {
        border: unset;
        border-radius: 0;
        margin-bottom: 0;
        border-bottom: solid 1px ${bg3};
        box-shadow: none;
      }

      .top3:last-child .role {
        border-bottom: unset;
      }

      .top3 img {
        ${elevation4()}
      }
    `
	];
	connectedCallback() {
		super.connectedCallback();
		this.stats = stats.getState();
		this.stats = {
			...this.stats,
			games: this.stats?.games?.filter((g) => !g.delete)
		};
		stats.addEventListener("state-changed", () => {
			this.stats = stats.getState();
			this.stats = {
				...this.stats,
				games: this.stats?.games?.filter((g) => !g.delete)
			};
			this.requestUpdate();
		});
	}
	render() {
		let amountOfEvilGames = 0;
		let amountOfGoodGames = 0;
		let amountOfPlayerGames = 0;
		let evilWins = 0;
		let goodWins = 0;
		let goodOrEvilGames = 0;
		let wins = 0;
		const roleStats = {};
		const scriptStats = {};
		/** ST */
		let amountOfSTGames = 0;
		let stGoodWins = 0;
		let stEvilWins = 0;
		const stScriptStats = {};
		let stGamesWithFourOrLess = 0;
		let luckySlayerSnipes = 0;
		for (const game of stats.getState().games.filter((g) => !g.delete)) {
			if (game?.stMode) {
				amountOfSTGames++;
				const alivePlayers = game.players.length - game.players.filter((p) => !!p.dead).length;
				if (alivePlayers <= 4) stGamesWithFourOrLess++;
				if (alivePlayers >= 4) {
					const demon = game.players.find((p) => p.suspectedRole?.type === "Demon");
					if (demon?.dead && demon?.dead?.id === "slayer") luckySlayerSnipes++;
				}
			} else amountOfPlayerGames++;
			if (game?.stMode) {
				if (game.result === "good") stGoodWins++;
				else if (game.result === "evil") stEvilWins++;
			}
			const script = game.script;
			if (script && !scriptStats[script]) scriptStats[script] = 0;
			if (script && game?.stMode && !stScriptStats[script]) stScriptStats[script] = 0;
			if (game?.stMode && script) stScriptStats[script]++;
			if (script) scriptStats[script]++;
			const player = game.players.find((p) => p.me);
			const roleId = player?.suspectedRole?.id;
			const roleType = player?.suspectedRole?.type;
			const result = game.result;
			if (roleId && !roleStats[roleId]) roleStats[roleId] = {
				...player.suspectedRole,
				wins: 0,
				games: 0
			};
			if (roleId) roleStats[roleId].games++;
			if (roleId && result === "win") roleStats[roleId].wins++;
			if (roleType === "Minion" || roleType === "Demon") {
				amountOfEvilGames++;
				goodOrEvilGames++;
				if (result === "win") evilWins++;
			} else if (roleType === "Townsfolk" || roleType === "Outsider") {
				amountOfGoodGames++;
				goodOrEvilGames++;
				if (result === "win") goodWins++;
			}
			if (result === "win") wins++;
		}
		const mostSTedScripts = Object.entries(stScriptStats).map(([script, count]) => ({
			script,
			count
		})).sort((a, b) => b.count - a.count);
		const mostPlayedRoles = Object.values(roleStats).filter((role) => role.games > 0).sort((a, b) => b.games - a.games);
		const topWinningRoles = Object.values(roleStats).filter((role) => role.wins > 0).sort((a, b) => b.wins - a.wins);
		const mostPlayedScripts = Object.entries(scriptStats).map(([script, count]) => ({
			script,
			count
		})).sort((a, b) => b.count - a.count);
		const top3MostPlayedRoles = mostPlayedRoles.slice(0, 3);
		const remainingMostPlayedRoles = mostPlayedRoles.slice(3);
		const top3WinningRoles = topWinningRoles.slice(0, 3);
		const remainingWinningRoles = topWinningRoles.slice(3);
		return b`
      <botc-back-button href="/menu"></botc-back-button>
      <h1 header>Stats</h1>
      <div>
        <button
          primary
          ui-button
          @click=${() => {
			dialog.open({
				id: "flow",
				parameters: { flow: { id: "quick-add" } }
			});
		}}
        >
          Quick add
        </button>
        <button
          class="quick-add"
          primary
          ui-button
          @click=${() => dialog.open({ id: "importFromOfficial" })}
        >
          Import from official app
        </button>
        ${when(amountOfSTGames > 0, () => b`
            <botc-disclosure .expanded=${state.getState()?.currentGame?.stMode}>
              <div slot="label">Storyteller stats</div>
              <div slot="detail">
                <botc-card label="Good/evil ratio">
                  <p>
                    Good/evil ratio of storytold games. Storytold
                    <b class="nr">${stGoodWins}</b> good wins and
                    <b class="nr">${stEvilWins}</b> evil wins.
                  </p>
                  <div class="bar-cont" style="display: flex;">
                    <div
                      class="bar left blue ${stEvilWins === 0 ? "radius" : ""}"
                      style="width: ${stGoodWins / amountOfSTGames * 100}%;"
                    ></div>
                    <div
                      class="bar right red"
                      style="width: ${stEvilWins / amountOfSTGames * 100}%;"
                    ></div>
                  </div>
                  <div class="percentages">
                    <div>
                      ${amountOfSTGames > 0 ? (stGoodWins / amountOfSTGames * 100).toFixed() : 0}%
                    </div>
                    <div>
                      ${amountOfSTGames > 0 ? (stEvilWins / amountOfSTGames * 100).toFixed() : 0}%
                    </div>
                  </div>
                </botc-card>
                <botc-card label="Games ending with 4 or fewer alive">
                  <p>
                    Percentage of storytold games that ended with 4 or fewer
                    players alive.
                    <b class="nr">${stGamesWithFourOrLess}</b> of
                    <b class="nr">${amountOfSTGames}</b> games.
                  </p>
                  <div class="bar-cont" style="display: flex;">
                    <div
                      class="bar left blue ${amountOfSTGames - stGamesWithFourOrLess === 0 ? "radius" : ""}"
                      style="width: ${stGamesWithFourOrLess / amountOfSTGames * 100}%;"
                    ></div>
                    <div
                      class="bar right red"
                      style="width: ${(amountOfSTGames - stGamesWithFourOrLess) / amountOfSTGames * 100}%;"
                    ></div>
                  </div>
                  <div class="percentages">
                    <div>
                      ${amountOfSTGames > 0 ? (stGamesWithFourOrLess / amountOfSTGames * 100).toFixed() : 0}%
                    </div>
                    <div>
                      ${amountOfSTGames > 0 ? ((amountOfSTGames - stGamesWithFourOrLess) / amountOfSTGames * 100).toFixed() : 0}%
                    </div>
                  </div>
                  <div>
                    ${luckySlayerSnipes > 0 ? b`<br />Of which
                            <b class="nr">${luckySlayerSnipes}</b>
                            ${luckySlayerSnipes === 1 ? "game was a" : "games were"}
                            lucky slayer
                            ${luckySlayerSnipes === 1 ? "snipe" : "snipes"}.` : ""}
                  </div>
                </botc-card>
                <botc-card label="Most storytold scripts">
                  <ul class="stats-list">
                    ${mostSTedScripts.map((scriptStat) => b`
                        <li>
                          <span>${scriptStat.script}:</span>
                          <span class="nr">${scriptStat.count}</span>
                        </li>
                      `)}
                  </ul>
                </botc-card>
                ${when(this.stats?.games.filter((g) => g.stMode).length, () => b`
                    <div ui-inlay>
                      <ul class="prev-games">
                        ${[...this.stats.games].filter((g) => g.stMode).sort((a, b) => {
			return new Date(b.date).getTime() - new Date(a.date).getTime();
		}).map((game) => b`
                              <li>
                                <div>
                                  <div><b>${formatDate(game.date)}</b></div>
                                  <div>
                                    ${when(game.script, () => `${game.script}, `)}${game.result}
                                  </div>
                                </div>
                                <button
                                  ui-icon-button
                                  ${context(dialog, () => b`
                                      <botc-prev-game-actions
                                        .game=${game}
                                      ></botc-prev-game-actions>
                                    `)}
                                >
                                  ${kebab}
                                </button>
                              </li>
                            `)}
                      </ul>
                    </div>
                  `)}
              </div>
            </botc-disclosure>
          `)}
        <botc-disclosure
          .expanded=${!state.getState()?.currentGame?.stMode || amountOfSTGames === 0}
        >
          <div slot="label">Player stats</div>
          <div slot="detail">
            <botc-card label="Win rate">
              <p>
                Percentage of games won vs games lost. Won
                <b class="nr">${wins}</b> games, lost
                <b class="nr">${amountOfPlayerGames - wins}</b> games.
              </p>
              <div class="bar-cont" style="display: flex;">
                <div
                  class="bar left blue ${Math.floor(100 - wins / amountOfPlayerGames * 100) === 0 ? "radius" : ""}"
                  style="width: ${wins / amountOfPlayerGames * 100}%;"
                ></div>
                <div
                  class="bar right red"
                  style="width: ${100 - wins / amountOfPlayerGames * 100}%;"
                ></div>
              </div>
              <div class="percentages">
                <div>
                  ${Math.floor(wins / amountOfPlayerGames * 1e3) / 10 || 0}%
                </div>
                <div>
                  ${Math.floor((100 - wins / amountOfPlayerGames * 100) * 10) / 10 || 0}%
                </div>
              </div>
            </botc-card>
            <botc-card label="Wins by alignment">
              <p>
                Percentage of wins out of all games played as good or evil. Won
                <b class="nr">${goodWins}</b> of
                <b class="nr">${amountOfGoodGames}</b> games as good, won
                <b class="nr">${evilWins}</b> of
                <b class="nr">${amountOfEvilGames}</b> games as evil.
              </p>
              <div class="bar-cont bg" style="display: flex;">
                <div
                  class="bar left blue radius"
                  style="width: ${goodWins / amountOfGoodGames * 100}%;"
                ></div>
              </div>
              <div class="percentages">
                <div>
                  ${Math.floor(goodWins / amountOfGoodGames * 1e3) / 10 || 0}%
                </div>
              </div>

              <div class="bar-cont bg" style="display: flex;">
                <div
                  class="bar left red radius"
                  style="width: ${evilWins / amountOfEvilGames * 100}%;"
                ></div>
              </div>
              <div class="percentages">
                <div>
                  ${Math.floor(evilWins / amountOfEvilGames * 1e3) / 10 || 0}%
                </div>
              </div>
            </botc-card>
            <botc-card label="Good/evil ratio">
              <p>
                Percentage of games played as good/evil. Played
                <b class="nr">${amountOfGoodGames}</b> good games and
                <b class="nr">${amountOfEvilGames}</b> evil games.
              </p>
              <div class="bar-cont" style="display: flex;">
                <div
                  class="bar left blue"
                  style="width: ${amountOfGoodGames / goodOrEvilGames * 100}%;"
                ></div>
                <div
                  class="bar right red"
                  style="width: ${amountOfEvilGames / goodOrEvilGames * 100}%;"
                ></div>
              </div>
              <div class="percentages">
                <div>
                  ${goodOrEvilGames > 0 ? (amountOfGoodGames / goodOrEvilGames * 100).toFixed() : 0}%
                </div>
                <div>
                  ${goodOrEvilGames > 0 ? (amountOfEvilGames / goodOrEvilGames * 100).toFixed() : 0}%
                </div>
              </div>
            </botc-card>
            ${when(this.stats?.games.length, () => b`
                <botc-card label="Most Played Roles">
                  <ul>
                    ${top3MostPlayedRoles.map((role) => b`
                        <li class="top3">
                          <div class="role">
                            <img
                              src="${img(role)}"
                              alt="${role.humanReadableRole}"
                              class="border-${alignment(role.type)}"
                            />
                            <div class="label">
                              <div class="flex">${role.humanReadableRole}</div>
                              <div><span class="nr">${role.games}</span></div>
                            </div>
                          </div>
                        </li>
                      `)}
                  </ul>
                  ${when(remainingMostPlayedRoles.length > 0, () => b`
                      <botc-disclosure>
                        <div slot="label">More roles</div>
                        <div ui-inlay slot="detail">
                          <ul>
                            ${remainingMostPlayedRoles.map((role) => b`
                                <li>
                                  <div class="role">
                                    <img
                                      src="${img(role)}"
                                      alt="${role.humanReadableRole}"
                                      class="border-${alignment(role.type)}"
                                    />
                                    <div class="label">
                                      <div class="flex">
                                        ${role.humanReadableRole}
                                      </div>
                                      <div>
                                        <span class="nr">${role.games}</span>
                                      </div>
                                    </div>
                                  </div>
                                </li>
                              `)}
                          </ul>
                        </div>
                      </botc-disclosure>
                    `)}
                </botc-card>

                <!-- Card for Top Winning Roles -->
                <botc-card label="Top Winning Roles">
                  <ul>
                    ${top3WinningRoles.map((role) => b`
                        <li class="top3">
                          <div class="role">
                            <img
                              src="${img(role)}"
                              alt="${role.humanReadableRole}"
                              class="border-${alignment(role.type)}"
                            />
                            <div class="label">
                              <div class="flex">${role.humanReadableRole}</div>
                              <div><span class="nr">${role.wins}</span></div>
                            </div>
                          </div>
                        </li>
                      `)}
                  </ul>
                  ${when(remainingWinningRoles.length > 0, () => b`
                      <botc-disclosure>
                        <div slot="label">More roles</div>
                        <div ui-inlay slot="detail">
                          <ul>
                            ${remainingWinningRoles.map((role) => b`
                                <li>
                                  <div class="role">
                                    <img
                                      src="${img(role)}"
                                      alt="${role.humanReadableRole}"
                                      class="border-${alignment(role.type)}"
                                    />
                                    <div class="label">
                                      <div class="flex">
                                        ${role.humanReadableRole}
                                      </div>
                                      <div>
                                        <span class="nr">${role.wins}</span>
                                      </div>
                                    </div>
                                  </div>
                                </li>
                              `)}
                          </ul>
                        </div>
                      </botc-disclosure>
                    `)}
                </botc-card>
              `)}
            ${when(this.stats?.games.length, () => b`
                <botc-card label="Most played scripts">
                  <ul class="stats-list">
                    ${mostPlayedScripts.map((scriptStat) => b`
                        <li>
                          <span>${scriptStat.script}:</span>
                          <span class="nr">${scriptStat.count}</span>
                        </li>
                      `)}
                  </ul>
                </botc-card>
              `)}
            <botc-card label="Wins">
              <ul class="stats-list">
                <li>
                  <span>Total wins:</span> <span class="nr">${wins}</span>
                </li>
                <li>
                  <span>Total good wins:</span>
                  <span class="nr">${goodWins}</span>
                </li>
                <li>
                  <span>Total evil wins:</span>
                  <span class="nr">${evilWins}</span>
                </li>
              </ul>
            </botc-card>
            <botc-card label="Games played">
              <ul class="stats-list">
                <li>
                  <span>Games played:</span>
                  <span class="nr">${amountOfPlayerGames}</span>
                </li>
                <li>
                  <span>Good games:</span>
                  <span class="nr">${amountOfGoodGames}</span>
                </li>
                <li>
                  <span>Evil games:</span>
                  <span class="nr">${amountOfEvilGames}</span>
                </li>
              </ul>
            </botc-card>

            ${when(this.stats?.games.filter((g) => !g.stMode).length, () => b`
                <div ui-inlay>
                  <ul class="prev-games">
                    ${[...this.stats.games].filter((g) => !g.stMode).sort((a, b) => {
			return new Date(b.date).getTime() - new Date(a.date).getTime();
		}).map((game) => b`
                          <li>
                            <div>
                              <div><b>${formatDate(game.date)}</b></div>
                              <div>
                                ${when(game.script, () => `${game.script}, `)}${game.result}
                              </div>
                            </div>
                            <button
                              ui-icon-button
                              ${context(dialog, () => b`
                                  <botc-prev-game-actions
                                    .game=${game}
                                  ></botc-prev-game-actions>
                                `)}
                            >
                              ${kebab}
                            </button>
                          </li>
                        `)}
                  </ul>
                </div>
              `)}
          </div>
        </botc-disclosure>
      </div>
    `;
	}
};
var BotcPrevGameActions = class extends i {
	static properties = {
		game: { type: Object },
		loading: { type: Boolean }
	};
	constructor() {
		super();
		this.game = {};
		this.loading = false;
	}
	static styles = [button, i$1`
      button[ui-button] {
        display: flex;
        align-items: center;
      }

      button[ui-button] span:nth-of-type(2) {
        flex: 1;
        margin-left: -24px;
      }

      botc-spinner::part(spinner-wrapper) {
        margin: 0;
      }
    `];
	connectedCallback() {
		super.connectedCallback();
	}
	async openDialog({ id, parameters }) {
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
      <button
        ui-button
        secondary
        @click=${() => this.openDialog({
			id: "prevGame",
			parameters: {
				title: formatDate(this.game.date),
				game: this.game
			}
		})}
      >
        <span>${grim}</span>
        <span class="label">View</span>
      </button>
      ${when(!!navigator?.share, () => b`
          <button
            ui-button
            secondary
            @click=${() => this.openDialog({
			id: "shareGameUrl",
			parameters: { game: this.game }
		})}
          >
            <span>${share}</span>
            <span class="label">Share link</span>
          </button>
        `)}
      ${when(!!navigator?.share, () => b`
          <button ui-button secondary @click=${this.screenshot}>
            <span>${img$1}</span>
            ${when(this.loading, () => b`<botc-spinner .size=${"25px"}></botc-spinner>`)}
            ${when(!this.loading, () => b`<span class="label">Share image</span>`)}
          </button>
        `)}
      <button
        ui-button
        secondary
        @click=${() => this.openDialog({
			id: "deletePrevGame",
			parameters: { game: this.game }
		})}
      >
        <span>${remove}</span>
        <span class="label">Delete</span>
      </button>
    `;
	}
	async screenshot() {
		this.loading = true;
		try {
			await shareGameAsImage(this.game, {
				shareText: `https://${window.location.host}/?share=${this.game.id}`,
				scale: 4
			});
			console.log("Shared successfully");
		} catch (err) {
			if (err.name !== "AbortError") console.error("Share failed:", err);
		} finally {
			this.loading = false;
		}
	}
};
customElements.define("botc-stats", BotcStats);
customElements.define("botc-prev-game-actions", BotcPrevGameActions);
//#endregion
export { BotcStats };
