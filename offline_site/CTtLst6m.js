import { A as i, I as i$1, L as r, P as b, t as when, x as main5 } from "./CY602n9t.js";
import { E as saveScript, F as api, r as state } from "./CP0hEE1l.js";
import "./vIOCOudq.js";
import { t as router } from "./CkjLjtft.js";
import { t as inlay } from "./Ue9OS-EJ.js";
import "./GnpzsBGp.js";
import { t as button } from "./CbFrBy7s.js";
import { t as dialog } from "./Dm27KaR0.js";
import { t as error } from "./BnMAryrf.js";
import "./DPxjp5Y3.js";
import { t as visuallyHidden } from "./DZ8S2RMZ.js";
import "./De7tCJD7.js";
//#region src/components/dialog/import-game-qr.js
var BotcImportGameQr = class extends i {
	static properties = {
		qrDetected: { type: Boolean },
		qrState: { type: String },
		game: { type: Object },
		selectedPlayer: { type: Object },
		readOnly: { type: Boolean },
		st: { type: Object }
	};
	constructor() {
		super();
		this.qrDetected = false;
		this.qrState = "initialized";
		this.game = {};
		this.readOnly = false;
		this.selectedPlayer = null;
		this.st = {
			tokens: [],
			me: false,
			name: "Storyteller",
			id: "1",
			claims: [],
			notes: "",
			suspectedRole: {},
			dead: false
		};
	}
	async connectedCallback() {
		super.connectedCallback();
	}
	static styles = [
		inlay,
		button,
		error,
		i$1`
      ul {
        list-style: none;
        padding: 0;
        margin: 0;
      }

      h2 {
        font-family: "Balgruf";
        font-size: 1.375rem;
        color: ${main5};
        text-align: center;
        text-shadow: 1px 1px 2px rgba(0, 0, 0, 1);
      }

      ${r(visuallyHidden)}

      .notes {
        margin-bottom: 12px;
      }

      .notes p {
        margin-top: 0;
        margin-bottom: 0;
      }
    `
	];
	async handleQrScanned(e) {
		this.qrDetected = true;
		const data = e.detail?.[0]?.rawValue;
		const url = new URL(data);
		const uuid = new URLSearchParams(url.search).get("create");
		try {
			this.game = await api.get(`https://qr-thing.netlify.app/.netlify/functions/qr?uuid=${uuid}`);
			this.qrState = "success";
			if (this.game.stMode) this.selectedPlayer = this.st;
			await new Promise((r) => setTimeout(r, 0));
			this.requestUpdate();
		} catch (e) {
			console.error(e);
			this.qrState = "error";
		}
	}
	render() {
		return b`
      ${when(!this.qrDetected && this.qrState === "initialized", () => b`
          <botc-scan-qr @qr-detected=${this.handleQrScanned}></botc-scan-qr>
        `)}
      ${when(this.qrState === "pending", () => b` <botc-spinner></botc-spinner> `)}
      ${when(this.qrState === "not-found", () => b` <div ui-error>Unable to find game.</div> `)}
      ${when(this.qrState === "error", () => b`
          <div ui-error>
            Failed to import from QR. QR codes expire after 5 minutes, is the QR
            expired?
          </div>
        `)}
      ${when(this.qrState === "success", () => b`
          ${when(!this.readOnly, () => b` <p>Select your name.</p> `)}
          ${when(!this.readOnly && state.getState()?.currentGame?.state === "in-progress", () => b`<p>
                Starting a game will overwrite your current game without saving
                stats.
              </p>`)}
          ${when(this.game?.script, () => b`
              <h2>
                ${this.game.script}${this.readOnly && this.game?.result ? `, ${this.game.result}` : ""}
              </h2>
            `)}
          ${when(this.game?.notes, () => b`
              <div class="notes" ui-inlay>
                <p>${this.game.notes}</p>
              </div>
            `)}
          <ul>
            ${when(!this.readOnly, () => b`
                <li>
                  <input
                    ?disabled=${this.readOnly}
                    type="radio"
                    name="player"
                    id="player-st"
                    value="st"
                    visually-hidden
                    @change=${() => this.handlePlayerSelected(this.st)}
                  />
                  <label for="player-st">
                    <botc-player-details
                      ?selected=${this.selectedPlayer?.id === this.st.id}
                      .player=${this.st}
                    ></botc-player-details>
                  </label>
                </li>
              `)}
            ${this.game.players.map((player, index) => b`
                <li>
                  <input
                    ?disabled=${this.readOnly}
                    type="radio"
                    name="player"
                    id="player-${index}"
                    value="${player.id}"
                    visually-hidden
                    @change=${() => this.handlePlayerSelected(player)}
                  />
                  <label for="player-${index}">
                    <botc-player-details
                      ?me=${this.readOnly && player.me}
                      ?selected=${this.selectedPlayer?.id === player.id}
                      .player=${player}
                    ></botc-player-details>
                  </label>
                </li>
              `)}
          </ul>
          ${when(!this.readOnly, () => b`
              <button
                ui-button
                primary
                ?disabled=${!this.selectedPlayer}
                @click=${this.handleConfirmSelection}
              >
                Import game
              </button>
            `)}
        `)}
    `;
	}
	handlePlayerSelected(player) {
		this.selectedPlayer = player;
	}
	async handleConfirmSelection() {
		if (this.selectedPlayer.name === "Storyteller") {
			this.game.players = this.game.players.map((player) => ({
				...player,
				me: false
			}));
			this.game.stMode = true;
		} else this.game.players = this.game.players.map((player) => {
			if (player.id === this.selectedPlayer.id) return {
				...player,
				me: true
			};
			return {
				...player,
				me: false
			};
		});
		if (![
			"Trouble Brewing",
			"Sects & Violets",
			"Bad Moon Rising"
		].includes(this.game.script)) await saveScript(this.game.script, this.game.scriptData);
		state.setState((s) => ({
			player: this.game.players.find((p) => p.me),
			currentGame: this.game
		}));
		dialog.close();
		router.navigate("/");
	}
};
customElements.define("botc-import-game-qr", BotcImportGameQr);
//#endregion
export { BotcImportGameQr };
