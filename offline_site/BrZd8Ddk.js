import { A as i, I as i$1, L as r, P as b, c as bg6, t as when } from "./CY602n9t.js";
import { o as syncGames } from "./l4dTAMDA.js";
import { F as api, i as stats, n as settings } from "./CP0hEE1l.js";
import "./vIOCOudq.js";
import "./ntwYzdyv.js";
import { t as inlay } from "./Ue9OS-EJ.js";
import "./GnpzsBGp.js";
import { t as button } from "./CbFrBy7s.js";
import { t as dialog } from "./Dm27KaR0.js";
import { t as error } from "./BnMAryrf.js";
import { t as input } from "./_hTQLwBE.js";
import "./DPxjp5Y3.js";
import { t as visuallyHidden } from "./DZ8S2RMZ.js";
import { t as radio } from "./Bx4sgpmC.js";
import "./De7tCJD7.js";
//#region src/components/dialog/import-from-official.js
var BotcImportFromOfficial = class extends i {
	static properties = {
		qrDetected: { type: Boolean },
		qrState: { type: String },
		game: { type: Object },
		selectedPlayer: { type: Object },
		disclosure: { type: String },
		resultSelected: { type: Boolean },
		notes: { type: String },
		stMode: { type: Boolean }
	};
	constructor() {
		super();
		this.notes = "";
		this.qrDetected = false;
		this.disclosure = "result";
		this.qrDetected = false;
		this.qrState = "initialized";
		this.game = { players: [] };
		this.selectedPlayer = null;
		this.stMode = false;
	}
	async connectedCallback() {
		super.connectedCallback();
		this.rolesById = window.rolesById;
	}
	static styles = [
		inlay,
		button,
		input,
		error,
		radio,
		i$1`
      ul {
        list-style: none;
        padding: 0;
        margin: 0;
      }

      textarea {
        display: block;
        width: calc(100% - 16px);
      }

      botc-disclosure {
        background-color: ${bg6};
      }

      botc-disclosure::part(button) {
        padding-top: 16px;
        padding-bottom: 16px;
      }

      ${r(visuallyHidden)}
    `
	];
	async handleQrScanned(e) {
		this.qrDetected = true;
		const uuid = e.detail?.[0]?.rawValue;
		try {
			this.game = await api.get(`https://qr-thing.netlify.app/.netlify/functions/qr?uuid=${uuid}`);
			this.game.players = this.game.players.map((player) => {
				player.suspectedRole = this.rolesById?.[player?.suspectedRole?.id] ?? {
					icon: "transparent",
					id: "",
					type: "",
					humanReadableRole: ""
				};
				player.claims = player?.claims ?? [];
				player.nominations = player?.nominations ?? [];
				player.conversations = player?.conversations ?? [];
				player.tokens = player?.tokens?.map((token) => {
					const role = this.rolesById[token.id];
					return {
						...token,
						name: role.humanReadableRole,
						icon: role.icon,
						type: role.type,
						label: token.reminder
					};
				});
				player.dead = player.dead ? {
					icon: "dead",
					id: "unknownneutral",
					humanReadableRole: "Unknown",
					type: ""
				} : false;
				return player;
			});
			this.game.players.unshift({
				name: "Storyteller",
				id: "storyteller",
				me: false,
				icon: "transparent",
				suspectedRole: {},
				claims: [],
				tokens: []
			});
			this.selectedPlayer = this.game.players.find((p) => p.me) ?? null;
			this.qrState = "success";
		} catch (e) {
			console.error(e);
			this.qrState = "error";
		}
	}
	render() {
		return b`
      ${when(!this.qrDetected && this.qrState === "initialized", () => b`
          <botc-scan-qr @qr-detected=${this.handleQrScanned}></botc-scan-qr>
          <p>
            You can import game data from the official app by installing a
            Chrome extension called
            <a
              href="https://chromewebstore.google.com/detail/the-grim-extension/pjjicncnilodbeiebkmicfehpmabafdj"
              >"The Grim Extension"</a
            >.
          </p>
          <p>
            At any point during a game in the official app, (or for the best
            results; during the Grim Reveal) you can click the extension icon in
            your browser UI to make a QR code appear.
          </p>
          <p>
            You can also import game data from
            <a href="https://botc.games">Digital Grimoire</a> by clicking
            <b>Game</b> and then <b>Export</b> (Thanks to Gareth), as well as
            from
            <a href="https://pocketgrimoire.co.uk">Pocket Grimoire</a> (Thanks
            to Skateside).
          </p>
        `)}
      ${when(this.qrState === "pending", () => b` <botc-spinner></botc-spinner> `)}
      ${when(this.qrState === "error", () => b`
          <div ui-error>
            Failed to import from QR. QR codes expire after 5 minutes, is the QR
            expired?
          </div>
        `)}
      ${when(this.qrState === "success", () => b`
          <p>Select your name.</p>
          <ul>
            ${this.game.players.map((player, index) => b`
                <li>
                  <input
                    type="radio"
                    name="player"
                    id="player-${index}"
                    value="${player.id}"
                    visually-hidden
                    @change=${() => this.handlePlayerSelected(player)}
                  />
                  <label for="player-${index}">
                    <botc-player-details
                      ?selected=${this.selectedPlayer?.id === player.id}
                      .player=${player}
                    ></botc-player-details>
                  </label>
                </li>
              `)}
          </ul>
          <button
            ui-button
            primary
            ?disabled=${!this.selectedPlayer}
            @click=${() => {
			this.qrState = "details";
		}}
          >
            Save result
          </button>
        `)}
      ${when(this.qrState === "details", () => b`
          <botc-disclosure .expanded=${this.disclosure === "result"}>
            <div slot="label">Result</div>
            <div ui-inlay slot="detail">
              <label ui-label for="${this.stMode ? "good" : "win"}">
                <input
                  ui-radio
                  type="radio"
                  name="result"
                  id="${this.stMode ? "good" : "win"}"
                  visually-hidden
                  @change=${() => {
			this.resultSelected = true;
			this.selectedResult = `${this.stMode ? "good" : "win"}`;
			this.disclosure = "notes";
		}}
                />
                <div>
                  <div class="toggle"><span class="selected"></span></div>
                  <div class="content">${this.stMode ? "Good" : "Win"}</div>
                </div>
              </label>
              <label ui-label for="${this.stMode ? "evil" : "loss"}">
                <input
                  ui-radio
                  type="radio"
                  name="result"
                  id="${this.stMode ? "evil" : "loss"}"
                  visually-hidden
                  @change=${() => {
			this.resultSelected = true;
			this.selectedResult = `${this.stMode ? "evil" : "loss"}`;
			this.disclosure = "notes";
		}}
                />
                <div>
                  <div class="toggle"><span class="selected"></span></div>
                  <div class="content">${this.stMode ? "Evil" : "Loss"}</div>
                </div>
              </label>
            </div>
          </botc-disclosure>
          <botc-disclosure .expanded=${this.disclosure === "notes"}>
            <div slot="label">Notes (optional)</div>
            <div ui-inlay slot="detail">
              <textarea
                .value=${this.notes}
                @input=${this.updateNotes}
                ui-input
                rows="5"
              ></textarea>
            </div>
          </botc-disclosure>
          <button
            ui-button
            primary
            @click=${this.submit}
            ?disabled=${!this.resultSelected}
          >
            Add
          </button>
        `)}
    `;
	}
	updateNotes(e) {
		this.notes = e.target.value;
	}
	handlePlayerSelected(player) {
		this.selectedPlayer = player;
		if (player.id === "storyteller") this.stMode = true;
	}
	submit() {
		const result = this.selectedResult;
		let gameResult;
		stats.setState((s) => {
			gameResult = {
				...this.game,
				id: crypto.randomUUID(),
				synced: false,
				kind: "import-from-official",
				stMode: this.stMode,
				players: this.game.players.map((p) => {
					if (p.id === this.selectedPlayer.id) return {
						...p,
						me: true
					};
					return {
						...p,
						me: false
					};
				}),
				notes: this.notes,
				date: (/* @__PURE__ */ new Date()).toISOString(),
				result
			};
			return {
				...s,
				games: [...s.games, gameResult]
			};
		});
		setTimeout(async () => {
			if (window.location.hostname !== "localhost") if (settings.getState().user) try {
				syncGames();
			} catch (e) {}
			else try {
				await api.post("https://qr-thing.netlify.app/.netlify/functions/games", gameResult);
			} catch {}
		});
		setTimeout(() => {
			dialog.close();
		});
	}
};
customElements.define("botc-import-from-official", BotcImportFromOfficial);
//#endregion
export { BotcImportFromOfficial };
