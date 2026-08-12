import { A as i, I as i$1, P as b, t as when, v as header } from "./CY602n9t.js";
import { c as collection, f as getDocs, h as where, i as provider, l as deleteDoc, n as auth, p as query, r as db, s as signInWithPopup, u as doc } from "./l4dTAMDA.js";
import { B as night_order_default, H as get, U as set, V as del, c as MediaQueryController, n as settings, r as state } from "./CP0hEE1l.js";
import "./D8HaG3T3.js";
import "./vIOCOudq.js";
import "./ntwYzdyv.js";
import { D as plus, T as minus } from "./CEyrKUT7.js";
import { t as inlay } from "./Ue9OS-EJ.js";
import { t as button } from "./CbFrBy7s.js";
import { t as iconButton } from "./C0jyJKsx.js";
import { t as input } from "./_hTQLwBE.js";
import "./DPxjp5Y3.js";
import { t as buttonLink } from "./6PngWMwE.js";
import { t as select } from "./C-op7emD.js";
import "./CXEVaKnf2.js";
import "./B1OborLG.js";
//#region node_modules/@thepassle/app-tools/pwa/capabilities.js
const capabilities = {
	WAKELOCK: "wakeLock" in navigator,
	BADGING: "setAppBadge" in navigator,
	SHARE: "share" in navigator,
	SERVICEWORKER: "serviceWorker" in navigator,
	NOTIFICATION: "Notification" in window
};
//#endregion
//#region src/pages/settings.js
var BotcSettings = class extends i {
	media = new MediaQueryController(this, ["(min-width: 640px)"], ({ media, matches }) => {
		switch (media) {
			case "(min-width: 640px)":
				this.isAbove640 = matches;
				break;
		}
	});
	static styles = [
		input,
		inlay,
		header,
		button,
		iconButton,
		buttonLink,
		select,
		i$1`
      :host {
        display: block;
        padding: 16px;
      }

      hr {
        border-width: 0.3px;
        border-color: var(--ui-border);
        margin-top: 16px;
        margin-bottom: 16px;
      }

      .qr img {
        display: block;
        margin-left: auto;
        margin-right: auto;
      }

      .days {
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin-bottom: 10px;
        margin-top: 10px;
      }

      .day-buttons {
        display: flex;
      }

      .desc {
        font-size: 0.8rem;
      }

      #hideGrim::part(label) {
        /* margin-right: 12px; */
      }

      .user {
        display: flex;
        align-items: center;
        margin-top: 16px;
        margin-bottom: 32px;
      }

      .user h2 {
        display: flex;
        color: var(--ui-main-4);
        font-family: "Balgruf";
        font-size: 1.375rem;
        text-shadow: 1px 1px 2px rgba(0, 0, 0, 1);
        margin-bottom: 0;
        margin-top: 0;
      }

      .user-name p {
        margin: 0;
        font-size: 0.85rem;
      }

      .user-img {
        display: flex;
        align-items: center;
        justify-content: center;
      }

      .user-img img {
        margin-right: 16px;
        width: 50px;
        height: 50px;
        border-radius: 50%;
        border: solid 2px var(--ui-bg-9);
        background-color: var(--ui-bg-8);
      }

      .token-label-switch {
        border-top: solid 1px var(--ui-bg-4);
      }

      .speech-recognition-switch {
        border-bottom: solid 1px var(--ui-bg-4);
      }
      .btn-label {
        font-size: 0.9rem;
        font-weight: 700;
        margin-left: 8px;
      }

      .script-select {
        padding: 8px;
        border-top: solid 1px var(--ui-bg-4);
        padding-bottom: 16px;
      }
    `
	];
	async connectedCallback() {
		super.connectedCallback();
		state.addEventListener("state-changed", this.callRequestUpdate);
		settings.addEventListener("state-changed", this.callRequestUpdate);
		this.wakeLockState = await get("wakelock") ?? false;
	}
	disconnectedCallback() {
		super.disconnectedCallback();
		state.removeEventListener("state-changed", this.callRequestUpdate);
		settings.removeEventListener("state-changed", this.callRequestUpdate);
	}
	callRequestUpdate() {
		this.requestUpdate();
	}
	constructor() {
		super();
		this.savedName = "";
		this.isAbove640 = false;
		this.callRequestUpdate = this.callRequestUpdate.bind(this);
	}
	static properties = {
		wakeLockState: { type: Boolean },
		savedName: { type: String },
		isAbove640: { type: Boolean }
	};
	submitName(e) {
		if (e.target.value) {
			settings.setState((s) => ({
				...s,
				name: e.target.value
			}));
			this.savedName = `Saved name '${e.target.value}'.`;
		} else {
			settings.setState((s) => ({
				...s,
				name: null
			}));
			this.savedName = "Removed name.";
		}
		setTimeout(() => {
			this.savedName = "";
		}, 6e3);
	}
	async useAuthForHideGrim({ checked }) {
		if (checked && !settings.getState().webAuthnId) {
			const publicKey = {
				challenge: crypto.getRandomValues(/* @__PURE__ */ new Uint8Array(32)),
				rp: { name: "The Grim" },
				user: {
					id: crypto.getRandomValues(/* @__PURE__ */ new Uint8Array(16)),
					name: "The Grim",
					displayName: "The Grim"
				},
				pubKeyCredParams: [{
					type: "public-key",
					alg: -7
				}, {
					type: "public-key",
					alg: -257
				}],
				authenticatorSelection: {
					authenticatorAttachment: "platform",
					userVerification: "required"
				},
				timeout: 6e4,
				attestation: "none"
			};
			window.__publicKey = publicKey;
			try {
				const credentialId = (await navigator.credentials.create({ publicKey })).rawId;
				settings.setState((s) => ({
					...s,
					webAuthnId: credentialId,
					useAuthForHideGrim: true
				}));
			} catch (err) {
				console.log(err);
				settings.setState((s) => ({
					...s,
					useAuthForHideGrim: false
				}));
			}
		} else if (!checked && settings.getState().webAuthnId) {
			let result = true;
			try {
				const credentialId = settings.getState().webAuthnId;
				const publicKey = {
					challenge: crypto.getRandomValues(/* @__PURE__ */ new Uint8Array(32)),
					allowCredentials: [{
						id: credentialId,
						type: "public-key",
						transports: ["internal"]
					}],
					userVerification: "required",
					timeout: 6e4
				};
				try {
					if (await navigator.credentials.get({ publicKey })) result = false;
					else result = true;
				} catch (err) {
					result = true;
					console.error("Auth failed:", err);
				}
			} catch (err) {
				result = true;
				console.error("Registration failed:", err);
			}
			settings.setState((s) => ({
				...s,
				useAuthForHideGrim: result
			}));
			this.shadowRoot.querySelector("#hideGrim").checked = result;
			await new Promise((r) => setTimeout(r, 1e3));
		} else settings.setState((s) => ({
			...s,
			useAuthForHideGrim: checked
		}));
	}
	async login() {
		try {
			await signInWithPopup(auth, provider);
		} catch (e) {
			console.error("Login failed", e);
		}
		this.requestUpdate();
	}
	render() {
		const user = settings.getState()?.user;
		return b`
      <botc-back-button href="/menu"></botc-back-button>
      <h1 header>Settings</h1>

      <botc-card label="Sign ${user ? "out" : "in"}">
        ${when(!user, () => b`
            <p>
              Signing in is not required, but will back up your data, and make
              it available across devices.
            </p>
            <button ui-button primary @click=${this.login}>Sign in</button>
          `)}
        ${when(user, () => b`
            <div class="user">
              <div class="user-img">
                <img
                  src=${user.photoURL}
                  alt=${user.name}
                  width="50"
                  height="50"
                />
              </div>
              <div class="user-name">
                <h2>${user.name}</h2>
                <p>${user.email}</p>
                <p>ID: ${user.uid}</p>
              </div>
            </div>
            <button ui-button primary @click=${() => auth.signOut()}>
              Sign out
            </button>
          `)}
      </botc-card>
      ${when(settings.getState()?.user?.isAdmin, () => b`
          <botc-card label="Admin">
            <a ui-button-link secondary href="/__data"> Stats </a>
            <a ui-button-link secondary href="/__users"> Users </a>
          </botc-card>
        `)}

      <botc-card label="Configure your name">
        <p>
          Configure your name to avoid having to re-input it throughout the app.
        </p>
        <label ui-label for="player">
          <input
            ui-input
            @input=${this.submitName}
            type="text"
            .value=${settings.getState().name ?? ""}
            name="player"
            id="player"
            placeholder="Player name"
          />
          <span>Player name</span>
        </label>
        ${when(this.savedName, () => this.savedName)}
      </botc-card>

      ${when(capabilities.WAKELOCK, () => b`
          <botc-card label="Device">
            ${when(capabilities.WAKELOCK, () => b`
                <botc-switch
                  ?checked=${window.wakelock && this.wakeLockState}
                  @checked-changed=${this.handleWakeLock}
                  >Prevent device from sleeping</botc-switch
                >
              `)}
            <botc-switch
              id="hideGrim"
              ?checked=${settings.getState().useAuthForHideGrim}
              @checked-changed=${this.useAuthForHideGrim}
              >Require device auth for un-hiding grim</botc-switch
            >
          </botc-card>
        `)}

      <botc-card label="Game">
        <botc-switch
          ?checked=${settings.getState().nominationFlowKind === "minimal"}
          @checked-changed=${({ checked }) => settings.setState((s) => ({
			...s,
			nominationFlowKind: checked ? "minimal" : "default"
		}))}
          >Minimal nomination flow</botc-switch
        >
        <botc-switch
          ?checked=${settings.getState().conversationTracking}
          @checked-changed=${({ checked }) => settings.setState((s) => ({
			...s,
			conversationTracking: checked
		}))}
          >Conversation tracking</botc-switch
        >
        <botc-switch
          ?checked=${settings.getState().voteTracking}
          @checked-changed=${({ checked }) => settings.setState((s) => ({
			...s,
			voteTracking: checked
		}))}
          >Vote tracking</botc-switch
        >
        <botc-switch
          ?checked=${settings.getState().highlightDoubleClaims}
          @checked-changed=${({ checked }) => settings.setState((s) => ({
			...s,
			highlightDoubleClaims: checked
		}))}
          >Highlight double claims</botc-switch
        >
      </botc-card>

      <botc-card label="Graphics">
        <div class="days">
          <div class="btn-label">Font size</div>
          <div class="day-buttons">
            <button
              ?disabled=${settings.getState().fontScale <= -2}
              @click=${this.decreaseFont}
              ui-icon-button
            >
              ${minus}
            </button>
            <button
              ?disabled=${settings.getState().fontScale >= 2}
              @click=${this.increaseFont}
              ui-icon-button
            >
              ${plus}
            </button>
          </div>
        </div>
        <botc-switch
          class="token-label-switch"
          ?checked=${settings.getState().useOfficialIcons}
          @checked-changed=${({ checked }) => settings.setState((s) => ({
			...s,
			useOfficialIcons: checked
		}))}
          >Use official icons</botc-switch
        >
        <botc-switch
          class="token-label-switch"
          ?checked=${settings.getState().showNotifications}
          @checked-changed=${({ checked }) => settings.setState((s) => ({
			...s,
			showNotifications: checked
		}))}
          >Display notifications in ST mode</botc-switch
        >
        <botc-switch
          ?checked=${settings.getState().displayTokenLabelInCircularMode}
          @checked-changed=${({ checked }) => settings.setState((s) => ({
			...s,
			displayTokenLabelInCircularMode: checked
		}))}
          >Display token labels in circular view</botc-switch
        >
        <botc-switch
          ?checked=${settings.getState().displayRoleNamesInCircularMode}
          @checked-changed=${({ checked }) => settings.setState((s) => ({
			...s,
			displayRoleNamesInCircularMode: checked
		}))}
          >Display role names in circular view</botc-switch
        >
      </botc-card>

      <botc-card label="Visual">
        <botc-switch
          ?checked=${settings.getState().showFirstLastNeighbors}
          @checked-changed=${({ checked }) => settings.setState((s) => ({
			...s,
			showFirstLastNeighbors: checked
		}))}
          >Show first/last neighbors</botc-switch
        >
        <botc-switch
          ?checked=${settings.getState().showFinal3Warning}
          @checked-changed=${({ checked }) => settings.setState((s) => ({
			...s,
			showFinal3Warning: checked
		}))}
          >Show final 3/4 warning</botc-switch
        >
      </botc-card>

      <botc-card label="Experimental">
        <botc-switch
          class="speech-recognition-switch"
          ?checked=${settings.getState().experimentalSpeechRecognition?.enabled}
          @checked-changed=${({ checked }) => settings.setState((s) => ({
			...s,
			experimentalSpeechRecognition: {
				...s.experimentalSpeechRecognition,
				enabled: checked
			}
		}))}
          >Speech recognition</botc-switch
        >
        <div class="days">
          <div class="btn-label">Button size</div>
          <div class="day-buttons">
            <button
              ?disabled=${settings.getState().experimentalSpeechRecognition.buttonSize === "small"}
              @click=${this.decreaseButton}
              ui-icon-button
            >
              ${minus}
            </button>
            <button
              ?disabled=${settings.getState().experimentalSpeechRecognition.buttonSize === "large"}
              @click=${this.increaseButton}
              ui-icon-button
            >
              ${plus}
            </button>
          </div>
        </div>
        <label class="script-select" ui-label for="script-select">
          <select
            @change=${(e) => {
			settings.setState((s) => ({
				...s,
				experimentalSpeechRecognition: {
					...s.experimentalSpeechRecognition,
					lang: e.target.value
				}
			}));
		}}
            ui-select
            name="lang"
            id="lang-select"
          >
            ${[
			"en-US",
			"nl-NL",
			"en-GB",
			"de-DE",
			"pt-BR",
			"en-CA",
			"fr-CA",
			"vi-VN",
			"fr-FR",
			"id-ID",
			"en-AU",
			"it-IT",
			"es-ES",
			"en-IN",
			"hi-IN",
			"ko-KR"
		].map((lang) => b`
                <option
                  ?selected=${settings.getState()?.experimentalSpeechRecognition?.lang === lang}
                >
                  ${lang}
                </option>
              `)}
          </select>
          <span>Language</span>
        </label>
      </botc-card>

      <botc-card label="Danger zone">
        <botc-disclosure class="danger-zone">
          <div slot="label">Nuke data</div>
          <div ui-inlay slot="detail">
            <button
              ui-button
              primary
              danger
              @click=${() => this.nuke("scripts")}
            >
              Nuke homebrew scripts
            </button>
            <button ui-button primary danger @click=${() => this.nuke("roles")}>
              Nuke homebrew roles
            </button>
            <button ui-button primary danger @click=${() => this.nuke("state")}>
              Nuke game state
            </button>
            <button
              ui-button
              primary
              danger
              @click=${() => this.nuke("settings")}
            >
              Nuke settings
            </button>
            <button ui-button primary danger @click=${() => this.nuke("stats")}>
              Nuke local stats
            </button>
            ${when(settings.getState().user, () => b`
                <button
                  ui-button
                  primary
                  danger
                  @click=${() => this.nukeFbGames()}
                >
                  Nuke database stats
                </button>
              `)}
            <button
              ui-button
              primary
              danger
              @click=${() => this.nuke("achievements")}
            >
              Nuke achievements
            </button>
            <button
              ui-button
              primary
              danger
              @click=${() => {
			settings.setState((s) => ({
				...s,
				webAuthnId: null,
				useAuthForHideGrim: false
			}));
		}}
            >
              Nuke webAuthn
            </button>
          </div>
        </botc-disclosure>
        <botc-disclosure class="danger-zone">
          <div slot="label">Update</div>
          <div ui-inlay slot="detail">
            <button
              ui-button
              primary
              danger
              @click=${() => {
			window.location.reload();
		}}
            >
              Force reload
            </button>
          </div>
        </botc-disclosure>
        <botc-disclosure class="danger-zone">
          <div slot="label">Debug</div>
          <div ui-inlay slot="detail">
            ${when(state.getState()?.currentGame, () => b`
                <botc-switch
                  ?checked=${state.getState()?.currentGame?.stMode}
                  @checked-changed=${({ checked }) => state.setState((s) => ({
			...s,
			currentGame: {
				...s.currentGame,
				stMode: checked
			}
		}))}
                  >Toggle ST mode</botc-switch
                >
                <hr />
                <label ui-label for="game-state">
                  <select
                    @change=${this.handleGameStateChange}
                    ui-select
                    name="game-state"
                    id="game-state"
                  >
                    <option
                      ?selected=${state.getState()?.currentGame?.state === "setup"}
                      value="setup"
                    >
                      Setup
                    </option>
                    <option
                      ?selected=${state.getState()?.currentGame?.state === "bag-selection"}
                      value="bag-selection"
                    >
                      Bag selection
                    </option>
                    <option
                      ?selected=${state.getState()?.currentGame?.state === "in-progress"}
                      value="in-progress"
                    >
                      In progress
                    </option>
                    <option
                      ?selected=${state.getState()?.currentGame?.state === "finished"}
                      value="finished"
                    >
                      Finished
                    </option>
                  </select>
                  <span>Game state</span>
                </label>
                <hr />
                <div class="days">
                  <div>
                    Day:
                    ${Number(state.getState().currentGame.day) + (state.getState().currentGame.stMode ? 0 : 1)}
                  </div>
                  <div class="day-buttons">
                    <button
                      ?disabled=${state === "finished"}
                      @click=${this.decrementDay}
                      ui-icon-button
                    >
                      ${minus}
                    </button>
                    <button
                      ?disabled=${state === "finished"}
                      @click=${this.incrementDay}
                      ui-icon-button
                    >
                      ${plus}
                    </button>
                  </div>
                </div>
              `)}
          </div>
        </botc-disclosure>
      </botc-card>
    `;
	}
	async nukeFbGames() {
		const userId = settings.getState()?.user?.uid;
		if (!userId) throw new Error("Missing userId");
		try {
			const snapshot = await getDocs(query(collection(db, "games"), where("userId", "==", userId)));
			const deletions = snapshot.docs.map((docSnap) => deleteDoc(doc(db, "games", docSnap.id)));
			await Promise.all(deletions);
			console.log(`Deleted ${snapshot.size} games for user ${userId}`);
		} catch (err) {
			console.error("Error deleting games:", err);
		}
	}
	increaseFont() {
		settings.setState((s) => ({
			...s,
			fontScale: Math.min((s.fontScale ?? 0) + 1, 2)
		}));
	}
	decreaseFont() {
		settings.setState((s) => ({
			...s,
			fontScale: Math.max((s.fontScale ?? 0) - 1, -2)
		}));
	}
	increaseButton() {
		let size;
		switch (settings.getState().experimentalSpeechRecognition.buttonSize) {
			case "small":
				size = "medium";
				break;
			case "medium":
				size = "large";
				break;
		}
		settings.setState((s) => ({
			...s,
			experimentalSpeechRecognition: {
				...s.experimentalSpeechRecognition,
				buttonSize: size
			}
		}));
	}
	decreaseButton() {
		let size;
		switch (settings.getState().experimentalSpeechRecognition.buttonSize) {
			case "large":
				size = "medium";
				break;
			case "medium":
				size = "small";
				break;
		}
		settings.setState((s) => ({
			...s,
			experimentalSpeechRecognition: {
				...s.experimentalSpeechRecognition,
				buttonSize: size
			}
		}));
	}
	async nuke(kind) {
		await del(kind);
		if (kind === "state") await set("state", {
			player: {},
			currentGame: null,
			nightOrder: night_order_default
		});
		window.location.reload();
	}
	incrementDay() {
		state.setState((s) => ({
			...s,
			currentGame: {
				...s.currentGame,
				day: s.currentGame.day + 1
			}
		}));
	}
	decrementDay() {
		if (state.getState().currentGame.day > 0) state.setState((s) => ({
			...s,
			currentGame: {
				...s.currentGame,
				day: s.currentGame.day - 1
			}
		}));
	}
	async handleGameStateChange(e) {
		const selectedState = e.target.value;
		state.setState((s) => ({
			...s,
			currentGame: {
				...s.currentGame,
				state: selectedState
			}
		}));
	}
	/**
	* @TODO
	* Do I need visibilitychange for when the user closes the app in between?
	* https://developer.mozilla.org/en-US/docs/Web/API/Screen_Wake_Lock_API#reacquiring_a_wake_lock
	*/
	async handleWakeLock({ checked }) {
		this.wakeLockState = checked;
		await set("wakelock", this.wakeLockState);
		if (this.wakeLockState) try {
			window.wakelock = await navigator.wakeLock.request("screen");
		} catch (e) {
			console.log("Failed to request wakelock", e);
		}
		else window.wakelock?.release?.();
	}
};
customElements.define("botc-settings", BotcSettings);
//#endregion
export { BotcSettings };
