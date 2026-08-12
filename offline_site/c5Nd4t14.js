import { A as i, I as i$1, P as b, a as bg3, b as main4, d as bg9, f as border, i as bg2, o as bg4, t as when, u as bg8, v as header, x as main5 } from "./CY602n9t.js";
import { d as getDoc, r as db, u as doc } from "./l4dTAMDA.js";
import { F as api, I as images, T as nightOrder, b as img, d as alignment, m as capitalize } from "./CP0hEE1l.js";
import "./D8HaG3T3.js";
import "./vIOCOudq.js";
import { z as deadVote } from "./CEyrKUT7.js";
import { t as inlay } from "./Ue9OS-EJ.js";
import { t as button } from "./CbFrBy7s.js";
import { t as error } from "./BnMAryrf.js";
import { t as c } from "./CINdyCSV.js";
import "./B1OborLG.js";
//#region src/pages/screenshot.js
const transparent = new URL(new URL("BhbPP0hx.png", import.meta.url).href).pathname;
const CIRCLE_CONFIG = {
	radiusPercent: .4,
	minRadius: 100,
	maxRadius: 280,
	tokenSize: 70,
	tokenSizeMobile: 60,
	containerPadding: 20,
	startAngle: -90,
	clockwise: true
};
var BotcScreenshot = class extends i {
	static styles = [
		button,
		inlay,
		header,
		error,
		i$1`
      :host {
        display: block;
        padding: 16px;
      }

      h2.script {
        text-align: center;
        font-family: "Balgruf";
        font-size: 1.75rem;
        color: ${main5};
        text-shadow: 1px 1px 2px rgba(0, 0, 0, 1);
        margin-bottom: 4px;
        margin-top: 0;
      }

      .result {
        text-align: center;
        font-family: "Balgruf";
        font-size: 1.25rem;
        color: ${main4};
        text-shadow: 1px 1px 2px rgba(0, 0, 0, 1);
        margin-bottom: 24px;
      }

      .players.circle {
        position: relative;
        width: 100%;
        max-width: 600px;
        aspect-ratio: 1 / 1;
        margin: 0 auto;
        margin-top: 12px;
        margin-bottom: 12px;
        list-style: none;
        padding: 0;
      }

      .circle-center {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        text-align: center;
        pointer-events: none;
        z-index: 1;
      }

      .circle-center .day-display {
        font-family: "Balgruf";
        font-size: 2rem;
        color: ${main5};
        text-shadow: 1px 1px 2px rgba(0, 0, 0, 1);
      }

      .circle-center .alive-count {
        font-size: 0.85rem;
        color: ${main4};
        margin-top: -4px;
      }

      .players.circle > li {
        position: absolute;
        list-style: none;
      }

      .players.circle > li.dead-opa {
        opacity: 0.5;
      }

      .players.circle .circle-player {
        all: unset;
        display: flex;
        flex-direction: column;
        align-items: center;
      }

      .players.circle .circle-token {
        position: relative;
        width: var(--token-size, ${CIRCLE_CONFIG.tokenSize}px);
        height: var(--token-size, ${CIRCLE_CONFIG.tokenSize}px);
      }

      .players.circle .circle-token img.role-icon {
        width: 100%;
        height: 100%;
        border-radius: 50%;
        border: solid 2px ${bg4};
        background-color: ${bg8};
        box-shadow: 0px 2px 6px 1px rgba(0, 0, 0, 0.75);
      }

      .players.circle .circle-token img.role-icon.blue {
        border-color: #45a0f1;
      }

      .players.circle .circle-token img.role-icon.red {
        border-color: #d9403b;
      }

      .players.circle .circle-token img.role-icon.yellow {
        border-color: #ffee00;
      }

      .players.circle .circle-token img.role-icon.green {
        border-color: #a7e16c;
      }

      .players.circle .circle-token img.role-icon.dead {
        filter: grayscale(100%);
        opacity: 0.6;
        border-color: ${bg3};
        border-width: 2px;
      }

      .players.circle li.me .circle-token img.role-icon {
        box-shadow: 0 0 8px 2px rgba(255, 255, 255, 0.8);
        border-width: 3px;
      }

      .players.circle li.me .player-name-label {
        border: solid 1px rgb(112, 210, 125);
      }

      .players.circle .circle-token .shroud {
        position: absolute;
        top: -8px;
        left: calc(50% + 4px);
        transform: translateX(-50%);
        width: 25px;
        height: 25px;
        border-radius: 50%;
        border: solid 2px ${border};
        background-color: ${bg8};
        box-shadow: 1px 1px 2px 1px rgba(0, 0, 0, 0.75);
      }

      .players.circle .circle-token .dead-vote-marker {
        position: absolute;
        left: -8px;
        top: calc(50% - 3.5px);
        width: 14px;
        height: 14px;
        background: ${bg8};
        border: solid 2px ${bg9};
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 0.5rem;
      }

      .players.circle .circle-token .dead-vote-marker svg {
        width: 10px !important;
        height: 10px !important;
      }

      .players.circle .circle-token .night-order {
        position: absolute;
        bottom: -12px;
        left: 50%;
        transform: translateX(-50%);
        width: 14px;
        height: 14px;
        background: ${bg8};
        border: solid 2px ${bg9};
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 0.55rem;
        font-variant-numeric: tabular-nums;
      }

      .players.circle .player-name-label {
        margin-top: 4px;
        font-family: "Balgruf";
        font-size: 0.85rem;
        color: ${main4};
        text-shadow: 1px 1px 2px rgba(0, 0, 0, 1);
        max-width: 70px;
        text-align: center;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }

      .players span[ui-inlay].player-name-label {
        padding: 2px 6px;
        margin-top: 6px;
      }

      .players.circle .player-name-label.blue {
        color: #45a0f1;
      }

      .players.circle .player-name-label.red {
        color: #d9403b;
      }

      .players.circle .player-name-label.dead {
        color: ${bg2};
      }

      .players.circle .circle-token .status-tokens {
        position: absolute;
        top: 50%;
        left: 100%;
        transform: translateY(-50%);
        display: flex;
        flex-direction: column;
        gap: 4px;
        margin-left: -6px;
      }

      .players.circle .circle-token .status-tokens .token-container {
        position: relative;
        width: 25px;
        height: 25px;
      }

      .players.circle .circle-token .status-tokens img {
        width: 25px;
        height: 25px;
        border-radius: 50%;
        border: solid 1px ${border};
        background-color: ${bg8};
        box-shadow: 1px 1px 3px 1px rgba(0, 0, 0, 0.75);
      }

      .players.circle .circle-token .status-tokens .token-label-path {
        position: absolute;
        top: 1px;
        left: 1px;
        width: 25px;
        height: 25px;
        pointer-events: none;
        overflow: visible;
      }

      .players.circle .circle-token .status-tokens .curved-label {
        fill: white;
        font-family: "Poppins", sans-serif;
        font-weight: 500;
        text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.9);
        letter-spacing: 0.5px;
      }

      .players.circle .circle-token img.shroud.blue,
      .players.circle .circle-token .status-tokens img.blue {
        border: solid 1px #45a0f1;
      }
      .players.circle .circle-token img.shroud.red,
      .players.circle .circle-token .status-tokens img.red {
        border: solid 1px #d9403b;
      }
      .players.circle .circle-token img.shroud.yellow,
      .players.circle .circle-token .status-tokens img.yellow {
        border: solid 1px #ffee00;
      }

      .players.circle .circle-token img.shroud.green,
      .players.circle .circle-token .status-tokens img.green {
        border: solid 1px #a7e16c;
      }

      @media (min-width: 640px) {
        .players.circle .circle-token {
          width: 80px;
          height: 80px;
        }
      }

      .player-name-label:has(.player-name-label-role) .player-name-label-name {
        margin-bottom: -4px;
      }

      .players.circle .player-name-label-role {
        font-size: 0.5rem;
        font-family: "Poppins", sans-serif;
        font-weight: 300;
        color: var(--ui-neutral);
      }
    `
	];
	static properties = {
		id: { type: String },
		game: { type: Object }
	};
	connectedCallback() {
		super.connectedCallback();
		this.state = "pending";
		getDoc(doc(db, "games", this.id)).then((gameSnap) => {
			if (gameSnap.exists()) {
				this.game = gameSnap.data();
				this.state = "success";
			} else api.get(`https://qr-thing.netlify.app/.netlify/functions/games?id=${this.id}`).then((game) => {
				this.game = game;
				this.state = "success";
			}).catch(() => {
				this.state = "error";
			});
		}).catch(() => {
			api.get(`https://qr-thing.netlify.app/.netlify/functions/games?id=${this.id}`).then((game) => {
				this.game = game;
				this.state = "success";
			}).catch(() => {
				this.state = "error";
			});
		});
	}
	calculateCirclePosition(index, total, containerWidth) {
		const config = CIRCLE_CONFIG;
		let radius = containerWidth * config.radiusPercent;
		radius = Math.max(config.minRadius, Math.min(config.maxRadius, radius));
		const angleStep = 2 * Math.PI / total;
		const direction = config.clockwise ? 1 : -1;
		const angle = config.startAngle * Math.PI / 180 + direction * index * angleStep;
		return {
			x: 50 + Math.cos(angle) * radius / containerWidth * 100,
			y: 50 + Math.sin(angle) * radius / containerWidth * 100,
			angle
		};
	}
	renderCircularPlayers() {
		if (!this.game?.players) return b``;
		const players = this.game.players;
		const total = players.length;
		let resultText = "";
		if (this.game.stMode) resultText = capitalize(this.game.result || "") + " win";
		else {
			const playerType = players.find((p) => p.me)?.suspectedRole?.type?.toLowerCase();
			let isGood = playerType === "townsfolk" || playerType === "outsider";
			let isEvil = playerType === "minion" || playerType === "demon";
			let winningAlignment = "";
			if (this.game.result === "win") winningAlignment = isGood ? "Good" : isEvil ? "Evil" : "";
			else if (this.game.result === "loss") winningAlignment = isGood ? "Evil" : isEvil ? "Good" : "";
			resultText = winningAlignment ? `${winningAlignment} win` : capitalize(this.game.result || "");
		}
		return b`
      <h2 class="script">${this.game.script || "Game"}</h2>
      ${when(resultText, () => b`<div class="result">${resultText}</div>`)}
      <ul
        class="players circle"
        style="
        --token-size: ${CIRCLE_CONFIG.tokenSize}px;
        --token-size-mobile: ${CIRCLE_CONFIG.tokenSizeMobile}px;
      "
      >
        ${c(players, (player) => player.id, (player, i) => {
			const pos = this.calculateCirclePosition(i, total, 400);
			const nightOrderNr = nightOrder(player, this.game.nightOrder);
			return b`
              <li
                style="
                  left: ${pos.x}%;
                  top: ${pos.y}%;
                  transform: translate(-50%, -50%);
                "
              >
                <div class="circle-player">
                  <div class="circle-token">
                    <img
                      class="role-icon
                        ${player.dead ? "dead" : ""}
                        ${alignment(player)}
                      "
                      src="${img(player.suspectedRole) || transparent}"
                      alt="${player.name}"
                    />

                    ${when(player.dead, () => b`
                        <img
                          class="shroud ${alignment(player.dead.type)}"
                          src="${images.any(player.dead.icon)}"
                        />
                      `)}
                    ${when(player.dead?.hasDeadVote, () => b`
                        <div class="dead-vote-marker">${deadVote}</div>
                      `)}
                    ${when(nightOrderNr, () => b`
                        <div class="night-order">${nightOrderNr}</div>
                      `)}
                    ${when(player.tokens?.length, () => b`
                        <div class="status-tokens">
                          ${player.tokens.map((token, tokenIndex) => b`
                              <div class="token-container">
                                <img
                                  class="${alignment(token.type)}"
                                  src="${img(token)}"
                                  alt="${token.label}"
                                  title="${token.humanReadableRole} ${token.label}"
                                />
                                <svg
                                  class="token-label-path"
                                  viewBox="0 0 20 20"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <defs>
                                    <path
                                      id="token-arc-${player.id}-${tokenIndex}"
                                      d="M 2,10 A 5 5 0 0 0 18,10"
                                    />
                                  </defs>
                                  <text class="curved-label" font-size="3.5">
                                    <textPath
                                      href="#token-arc-${player.id}-${tokenIndex}"
                                      startOffset="50%"
                                      text-anchor="middle"
                                    >
                                      ${token.label}
                                    </textPath>
                                  </text>
                                </svg>
                              </div>
                            `)}
                        </div>
                      `)}
                  </div>

                  <span
                    ui-inlay
                    class="player-name-label
                    ${alignment(player)}
                    ${player.dead ? "dead" : ""}
                  "
                  >
                    <div class="player-name-label-name">
                      ${capitalize(player.name)}
                    </div>
                    ${when(player?.suspectedRole?.id, () => b`
                        <div class="player-name-label-role">
                          ${player.suspectedRole?.humanReadableRole}
                        </div>
                      `)}
                  </span>
                </div>
              </li>
            `;
		})}
      </ul>
    `;
	}
	render() {
		return b`
      ${when(this.state === "pending", () => b`<botc-spinner></botc-spinner>`)}
      ${when(this.state === "error", () => b`<p ui-error>Error loading game data</p>`)}
      ${when(this.state === "success", () => this.renderCircularPlayers())}
    `;
	}
};
customElements.define("botc-screenshot", BotcScreenshot);
//#endregion
export { BotcScreenshot };
