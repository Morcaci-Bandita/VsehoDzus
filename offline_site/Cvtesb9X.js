import { A as i, I as i$1, P as b, a as bg3, c as bg6, d as bg9, f as border, g as elevation4, n as ALIGNMENT_COLORS, s as bg5, t as when, u as bg8, v as header, x as main5 } from "./CY602n9t.js";
import { c as collection, f as getDocs, r as db } from "./l4dTAMDA.js";
import { F as api, b as img, d as alignment, h as formatDate } from "./CP0hEE1l.js";
import "./D8HaG3T3.js";
import "./vIOCOudq.js";
import "./ntwYzdyv.js";
import { B as img$1, H as share, R as grim, U as kebab } from "./CEyrKUT7.js";
import { t as inlay } from "./Ue9OS-EJ.js";
import { t as button } from "./CbFrBy7s.js";
import { t as iconButton } from "./C0jyJKsx.js";
import { t as dialog } from "./Dm27KaR0.js";
import { t as error } from "./BnMAryrf.js";
import { t as context } from "./BgH8Gcb8.js";
import "./CXEVaKnf2.js";
import { t as shareGameAsImage } from "./CV1TgXsw.js";
import "./B1OborLG.js";
//#region src/pages/data.js
var BotcData = class extends i {
	static styles = [
		header,
		inlay,
		button,
		error,
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

      ul.prev-games {
        padding: 16px 8px;
      }

      ul.prev-games li {
        padding: 8px;
      }

      ul.prev-games li:not(:last-child) {
        border-bottom: solid 1px ${border};
      }
    `
	];
	static properties = {
		data: { type: Array },
		state: { type: String }
	};
	constructor() {
		super();
		this.data = [];
		this.state = "initialized";
	}
	async connectedCallback() {
		super.connectedCallback();
		try {
			this.state = "pending";
			const gamesCol = collection(db, "games");
			const [gamesSnap, unauthed] = await Promise.all([getDocs(gamesCol), api.get("https://qr-thing.netlify.app/.netlify/functions/games")]);
			this.data = gamesSnap.docs.map((doc) => ({
				id: doc.id,
				...doc.data()
			}));
			const combined = this.data.concat(unauthed);
			const deduped = Object.values(combined.reduce((acc, obj) => {
				if (obj && obj.id) acc[obj.id] = obj;
				return acc;
			}, {}));
			this.data = deduped.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
			this.data = this.data.filter((game) => {
				if (!Array.isArray(game.players) || game.players.length < 8) return true;
				const [p0, p1, p2] = game.players;
				if (p0?.name.toLowerCase() === "richard" && p0?.dead?.hasDeadVote === true && p1?.name.toLowerCase() === "nick" && p1?.suspectedRole?.humanReadableRole === "Washerwoman" && p2?.name.toLowerCase() === "mark" && p2?.suspectedRole?.humanReadableRole === "Chef") return false;
				return true;
			});
			this.state = "success";
		} catch (e) {
			console.log(e);
			this.state = "error";
		}
	}
	render() {
		let stGames = 0;
		let playerGames = 0;
		let amountOfEvilGames = 0;
		let amountOfGoodGames = 0;
		let evilWins = 0;
		let goodWins = 0;
		let goodOrEvilGames = 0;
		let wins = 0;
		let amountOfSTGames = 0;
		let stGoodWins = 0;
		let stEvilWins = 0;
		const scriptStats = {};
		const roleStats = {};
		for (const game of this.data) {
			const script = game.script;
			if (game.stMode) {
				stGames++;
				amountOfSTGames++;
			} else playerGames++;
			if (script && !scriptStats[script]) scriptStats[script] = 0;
			if (script) scriptStats[script]++;
			if (game?.stMode) {
				if (game.result === "good") stGoodWins++;
				else if (game.result === "evil") stEvilWins++;
			}
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
		const mostPlayedRoles = Object.values(roleStats).filter((role) => role.games > 0).sort((a, b) => b.games - a.games);
		const topWinningRoles = Object.values(roleStats).filter((role) => role.wins > 0).sort((a, b) => b.wins - a.wins);
		const top3MostPlayedRoles = mostPlayedRoles.slice(0, 3);
		const remainingMostPlayedRoles = mostPlayedRoles.slice(3);
		const top3WinningRoles = topWinningRoles.slice(0, 3);
		const remainingWinningRoles = topWinningRoles.slice(3);
		const mostPlayedScripts = Object.entries(scriptStats).map(([script, count]) => ({
			script,
			count
		})).sort((a, b) => b.count - a.count);
		const top3MostPlayedScripts = mostPlayedScripts.slice(0, 3);
		const remainingMostPlayedScripts = mostPlayedScripts.slice(3);
		return b`
      <botc-back-button href="/admin"></botc-back-button>

      <h1 header>Data</h1>

      ${when(this.state === "pending" || this.state === "initialized", () => b`<botc-spinner></botc-spinner>`)}
      ${when(this.state === "error", () => b`<div ui-error>Failed to load games.</div>`)}
      ${when(this.state === "success", () => b`
          <botc-card label="Player/Storyteller games ratio">
            <p>
              Amount of player games vs storyteller games.
              <b class="nr">${playerGames}</b> player games and
              <b class="nr">${stGames}</b> storyteller games.
            </p>
            <div class="bar-cont" style="display: flex;">
              <div
                class="bar left blue ${stGames === 0 ? "radius" : ""}"
                style="width: ${playerGames / this.data.length * 100}%;"
              ></div>
              <div
                class="bar right red"
                style="width: ${stGames / this.data.length * 100}%;"
              ></div>
            </div>
            <div class="percentages">
              <div>
                Player:
                <span class="nr"
                  >${(stGames > 0 ? playerGames / this.data.length * 100 : 0).toFixed()}%</span
                >
              </div>
              <div>
                ST:
                <span class="nr"
                  >${(stGames > 0 ? stGames / this.data.length * 100 : 0).toFixed()}%</span
                >
              </div>
            </div>
          </botc-card>

          <botc-card label="ST Good/evil ratio">
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

          <botc-card label="Player Win rate">
            <p>
              Percentage of games won vs games lost. Won
              <b class="nr">${wins}</b> games, lost
              <b class="nr">${playerGames - wins}</b> games.
            </p>
            <div class="bar-cont" style="display: flex;">
              <div
                class="bar left blue ${Math.floor(100 - wins / playerGames * 100) === 0 ? "radius" : ""}"
                style="width: ${wins / playerGames * 100}%;"
              ></div>
              <div
                class="bar right red"
                style="width: ${100 - wins / playerGames * 100}%;"
              ></div>
            </div>
            <div class="percentages">
              <div>${Math.floor(wins / playerGames * 1e3) / 10 || 0}%</div>
              <div>
                ${Math.floor((100 - wins / playerGames * 100) * 10) / 10 || 0}%
              </div>
            </div>
          </botc-card>
          <botc-card label="Player Wins by alignment">
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

          <botc-card label="Most Played Player Roles">
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
          <botc-card label="Top Winning Player Roles">
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

          <botc-card label="Most Played Scripts">
            <ul class="stats-list">
              ${top3MostPlayedScripts.map((script) => b`
                  <li>
                    <span>${script.script}:</span>
                    <span class="nr">${script.count}</span>
                  </li>
                `)}
            </ul>
            ${when(remainingMostPlayedScripts.length > 0, () => b`
                <botc-disclosure>
                  <div slot="label">More scripts</div>
                  <div ui-inlay slot="detail">
                    <ul class="stats-list">
                      ${remainingMostPlayedScripts.map((script) => b`
                          <li>
                            <span>${script.script}:</span>
                            <span class="nr">${script.count}</span>
                          </li>
                        `)}
                    </ul>
                  </div>
                </botc-disclosure>
              `)}
          </botc-card>

          <ul ui-inlay class="prev-games">
            ${this.data.map((game) => b`
                <li>
                  <div>
                    <div><b>${formatDate(game.date)}</b></div>
                    <div>
                      ${when(game.script, () => `${game.script}, `)}${game.result},
                      ${game.kind} ${when(!game?.userId, () => " (unauthed)")}
                    </div>
                  </div>
                  <button
                    ui-icon-button
                    ${context(dialog, () => b`
                        <botc-data-prev-game-actions
                          .game=${game}
                        ></botc-data-prev-game-actions>
                      `)}
                  >
                    ${kebab}
                  </button>
                </li>
              `)}
          </ul>
        `)}
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
          <button ui-button secondary @click=${this.screenshot}>
            <span>${img$1}</span>
            ${when(this.loading, () => b`<botc-spinner .size=${"25px"}></botc-spinner>`)}
            ${when(!this.loading, () => b`<span class="label">Share image</span>`)}
          </button>
        `)}
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
            <span class="label">Share</span>
          </button>
        `)}
    `;
	}
	async screenshot() {
		this.loading = true;
		try {
			await shareGameAsImage(this.game, {
				shareText: ``,
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
customElements.define("botc-data", BotcData);
customElements.define("botc-data-prev-game-actions", BotcPrevGameActions);
//#endregion
export { BotcData };
