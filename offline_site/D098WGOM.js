import { A as i, C as spacer12, E as spacer4, I as i$1, O as spacer8, P as b, S as neutral, _ as focus, c as bg6, g as elevation4, k as spacer80, o as bg4, s as bg5, t as when, w as spacer16, x as main5 } from "./CY602n9t.js";
import { d as getDoc, i as provider, n as auth, r as db, s as signInWithPopup, t as app, u as doc } from "./l4dTAMDA.js";
import { F as api, H as get, M as SCRIPTS_DATA, a as timer, c as MediaQueryController, h as formatDate, n as settings, o as rolesById_default, r as state, s as BREAKPOINTS } from "./CP0hEE1l.js";
import { t as media } from "./vIOCOudq.js";
import { t as router } from "./CkjLjtft.js";
import { G as settings$1, I as admin, R as grim, _ as stop, k as homebrew, n as customScript, o as chart, p as menu$1, q as chevronDown, t as customRole, v as mic } from "./CEyrKUT7.js";
import { t as button } from "./CbFrBy7s.js";
import { t as dialog } from "./Dm27KaR0.js";
import { t as context } from "./BgH8Gcb8.js";
//#region src/components/botc-bottom-nav.js
/**
* [
*  label: 'Home',
*  icon: home,
*  condition: () => true
* ]
*/
var BotcBottomNav = class extends i {
	static properties = {
		menu: { type: Object },
		activeLink: { type: String }
	};
	static styles = i$1`
    :host {
      width: 100%;
      background-color: ${bg6};
      height: 60px;
      padding-bottom: env(safe-area-inset-bottom);
      position: fixed;
      top: auto;
      bottom: 0px;
      z-index: 9;

      box-shadow: 0px -2px 8px 0px rgba(0, 0, 0, 0.8);
    }

    a {
      -webkit-user-drag: none;
    }

    header {
      display: flex;
      justify-content: center;
      height: 100%;
      align-items: center;
      max-width: 960px;
      margin: 0px auto;
    }

    nav {
      display: block;
      flex: 1 1 0%;
      padding: ${spacer4};
    }

    nav li {
      margin: 0;
    }

    nav ul {
      flex: 1 1 0%;
      padding-left: 0px;
      margin-bottom: 0px;
      margin-top: 0px;
      display: flex;
      list-style: none;
    }

    nav ul li {
      flex: 1;
      display: flex;
      align-items: center;
    }

    nav ul li button,
    nav ul li a {
      flex: 1;
      font-size: 1.375rem;
      padding: 5px 12px;
      display: flex;
      flex-direction: column;
      align-items: center;
      text-decoration: none;
      color: ${neutral};
      position: relative;
    }

    .notification-dot {
      right: 24px;
      top: 4px;
    }

    nav ul li button {
      background: none;
      border: none;
    }

    nav ul li button,
    nav ul li a {
      transition: transform 0.1s ease-in-out;
    }

    /* nav ul li button:hover, */
    nav ul li button:focus-visible,
    /* nav ul li a:hover, */
    nav ul li a:focus-visible {
      background-color: ${bg5};
      border-radius: 10px;
    }

    nav ul li button:active,
    nav ul li a:active {
      /* background-color: ${bg4}; */
      transform: scale(0.8);
      transition: transform 0.1s ease-in-out;
      border-radius: 10px;
    }

    nav ul li button:focus-visible,
    nav ul li a:focus-visible {
      border-radius: 10px;
      ${focus()}
    }

    span {
      font-size: 0.9rem;
      font-weight: 300;
    }

    nav svg {
      fill: ${neutral};
      /* margin-bottom: 4px; */
    }

    .active svg {
      fill: ${main5};
    }

    .active span {
      fill: ${main5}!important;
      font-weight: 500;
    }
  `;
	render() {
		const activeLink = this.activeLink || new URL(window.location.href).pathname;
		return b`
      <header>
        <nav>
          <ul>
            ${this.menu?.map((item) => b`
                ${when(item?.condition ? item.condition() : true, () => b`
                    <li>
                      ${when(item.action, () => b`
                          <button
                            aria-expanded="false"
                            @click=${item.action}
                            class="${activeLink.startsWith(item.href) ? "active" : ""}"
                          >
                            ${item.icon}
                            <span>${item.label}</span>
                          </button>
                        `, () => b`
                          <a
                            class="${activeLink === item.href ? "active" : ""}"
                            href="${item.href}"
                            @click=${(e) => {
			this.anchorControl(e, item);
		}}
                          >
                            ${item.icon}
                            <span>${item.label}</span>
                          </a>
                        `)}
                    </li>
                  `)}
              `)}
          </ul>
        </nav>
      </header>
    `;
	}
	anchorControl(e, item) {
		if (router.url.pathname === item.href) {
			e.preventDefault();
			return;
		}
	}
};
customElements.define("botc-bottom-nav", BotcBottomNav);
//#endregion
//#region index.js
provider.setCustomParameters({ prompt: "select_account" });
const customRoles = await get("roles") ?? [];
window.originalRoles = { ...rolesById_default };
window.rolesById = {
	...rolesById_default,
	...customRoles.reduce((acc, role) => {
		acc[role.id] = role;
		return acc;
	}, {})
};
if (timer.getState().started && timer.getState().endsAt) {
	if (timer.interval) {
		clearInterval(timer.interval);
		timer.interval = null;
	}
	const updateTimerState = () => {
		const t = timer.getState();
		if (!t.started || !t.endsAt) {
			if (timer.interval) {
				clearInterval(timer.interval);
				timer.interval = null;
			}
			timer.setState((state) => ({
				...state,
				remaining: 0,
				formatted: "0:00"
			}));
			return;
		}
		const now = /* @__PURE__ */ new Date();
		const endsAt = new Date(t.endsAt);
		const diff = Math.max(0, Math.floor((endsAt.getTime() - now.getTime()) / 1e3));
		const minutes = Math.floor(diff / 60);
		const seconds = String(diff % 60).padStart(2, "0");
		timer.setState((state) => ({
			...state,
			remaining: diff,
			formatted: `${minutes}:${seconds}`
		}));
		if (diff <= 0) {
			timer.setState((state) => ({
				...state,
				finished: true,
				started: false
			}));
			alert("Everybody back to town!");
			if (timer.interval) {
				clearInterval(timer.interval);
				timer.interval = null;
			}
		}
	};
	updateTimerState();
	timer.interval = setInterval(updateTimerState, 800);
}
window.__app = app;
const url = new URL(window.location.href);
const params = new URLSearchParams(url.search);
const uuid = params.get("create");
const shareUuid = params.get("share");
const importFromOfficial = params.get("import");
const scangame = params.get("scangame");
const shareAchievement = params.get("achievement");
const sharedPersonalAchievements = params.get("share-achievements");
const applyFontScale = () => {
	const scale = settings.getState().fontScale || 0;
	document.documentElement.style.fontSize = `${100 + scale * 10}%`;
};
settings.addEventListener("state-changed", applyFontScale);
applyFontScale();
if (!crypto.randomUUID) crypto.randomUUID = function() {
	return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (char) => {
		const random = (Date.now() + Math.random() * 16) % 16 | 0;
		return char === "x" ? random.toString(16) : (random & 3 | 8).toString(16);
	});
};
if (sharedPersonalAchievements) {
	let name = params.get("name");
	name = name ? decodeURIComponent(name) : "";
	dialog.open({
		id: "sharedPersonalAchievements",
		parameters: {
			ids: sharedPersonalAchievements,
			name
		}
	});
}
if (shareAchievement) dialog.open({
	id: "shareAchievement",
	parameters: { id: shareAchievement }
});
if (scangame) dialog.open({ id: "importGameQr" });
if (importFromOfficial) dialog.open({ id: "importFromOfficial" });
if (shareUuid) getDoc(doc(db, "games", shareUuid)).then((docSnap) => {
	if (docSnap.exists()) {
		const game = docSnap.data();
		dialog.open({
			id: "importGameQr",
			parameters: {
				title: formatDate(game.date),
				game,
				readOnly: true,
				qrState: "success"
			}
		});
	} else api.get(`https://qr-thing.netlify.app/.netlify/functions/games?id=${shareUuid}`).then((game) => {
		if (game && Object.keys(game).length > 0) dialog.open({
			id: "importGameQr",
			parameters: {
				title: formatDate(game.date),
				game,
				readOnly: true,
				qrState: "success"
			}
		});
		else dialog.open({
			id: "importGameQr",
			parameters: {
				title: "Game not found",
				game: null,
				readOnly: true,
				qrState: "not-found"
			}
		});
	}).catch(() => {
		dialog.open({
			id: "importGameQr",
			parameters: {
				title: "Game not found",
				game: null,
				readOnly: true,
				qrState: "not-found"
			}
		});
	});
}).catch((e) => {
	api.get(`https://qr-thing.netlify.app/.netlify/functions/games?id=${shareUuid}`).then((game) => {
		if (game && Object.keys(game).length > 0) dialog.open({
			id: "importGameQr",
			parameters: {
				title: formatDate(game.date),
				game,
				readOnly: true,
				qrState: "success"
			}
		});
		else dialog.open({
			id: "importGameQr",
			parameters: {
				title: "Game not found",
				game: null,
				readOnly: true,
				qrState: "not-found"
			}
		});
	}).catch(() => {
		dialog.open({
			id: "importGameQr",
			parameters: {
				title: "Game not found",
				game: null,
				readOnly: true,
				qrState: "not-found"
			}
		});
	});
});
if (uuid) api.get(`https://qr-thing.netlify.app/.netlify/functions/qr?uuid=${uuid}`).then((game) => {
	dialog.open({
		id: "importGameQr",
		parameters: {
			game,
			qrState: "success"
		}
	});
});
if (state.getState()?.firstVisit) {
	state.setState((s) => ({
		...s,
		firstVisit: false
	}));
	dialog.open({
		id: "flow",
		parameters: { flow: {
			id: "create-game",
			amountOfPlayers: 5
		} }
	});
}
try {
	if (await get("wakelock")) window.wakelock = await navigator.wakeLock.request("screen");
} catch (e) {
	console.log(e);
}
document.addEventListener("visibilitychange", async () => {
	if (await get("wakelock") && window.wakelock !== null && document.visibilityState === "visible") try {
		window.wakelock = await navigator.wakeLock.request("screen");
	} catch (e) {
		console.log(e);
	}
});
window.addEventListener("beforeinstallprompt", (e) => {
	window.deferredPrompt = e;
});
const scripts = await get("scripts") ?? {};
Object.keys(scripts).forEach((script) => {
	SCRIPTS_DATA[script] = async () => scripts[script];
});
const menu = [
	{
		href: "/",
		label: "Grim",
		icon: grim
	},
	{
		href: "/actions",
		label: "Actions",
		icon: menu$1
	},
	{
		condition: () => media.MIN.LG() && settings.getState()?.user?.isAdmin,
		href: "/admin",
		label: "Admin",
		icon: admin
	},
	{
		condition: () => media.MIN.LG(),
		href: "/global-stats",
		label: "Stats",
		icon: chart
	},
	{
		href: "/menu",
		label: "Menu",
		icon: settings$1
	},
	{
		condition: () => media.MIN.LG(),
		label: "Homebrew",
		icon: homebrew,
		expanded: true,
		children: [{
			href: "/scripts",
			label: "Scripts",
			icon: customScript
		}, {
			href: "/homebrew-roles",
			label: "Roles",
			icon: customRole
		}]
	}
];
var BotcProfileButtons = class extends i {
	static styles = [button];
	render() {
		return b`<button
      ui-button
      secondary
      @click=${() => {
			auth.signOut();
			dialog.close();
		}}
    >
      Sign out
    </button>`;
	}
};
customElements.define("botc-profile-buttons", BotcProfileButtons);
var Botc = class extends i {
	media = new MediaQueryController(this, [BREAKPOINTS.LG.MIN], ({ media, matches }) => {
		switch (media) {
			case BREAKPOINTS.LG.MIN:
				this.mobile = !matches;
				break;
		}
	});
	static properties = {
		recordingState: { type: String },
		route: {},
		mobile: { type: Boolean },
		expandedItems: {
			type: Object,
			state: true
		}
	};
	constructor() {
		super();
		/** @type {"off" | "recording" | "loading"} */
		this.recordingState = "off";
		this.expandedItems = {};
		menu.forEach((item, index) => {
			if (item.children && item.expanded !== void 0) this.expandedItems[index] = item.expanded;
			else if (item.children) this.expandedItems[index] = false;
		});
		/**
		* SPEECH RECOGNITION
		*/
		this.mediaRecorder = null;
		this.audioBlob = null;
		this.recognition = null;
		this.speechEndTimer = null;
		this.hasSpokenAtLeastOnce = false;
	}
	static styles = [button, i$1`
      :host {
        display: flex;
        flex-direction: column;
        /* min-height: 100vh;
        max-height: -webkit-fill-available;
        min-height: -webkit-fill-available; */
        height: 100%;

        margin: 0 auto;
        overflow: auto;
        padding-bottom: calc(75px + env(safe-area-inset-bottom));
      }

      :host::-webkit-scrollbar {
        display: none; /* Safari and Chrome */
      }

      /** NAVIGATION */
      nav {
        margin-bottom: 24px;
        display: block;
        flex: 0;
        font-weight: 500;
        position: sticky;
        top: 0;
        padding-left: ${spacer16};
        padding-right: ${spacer16};
        height: ${spacer80};
        color: white;
        background-color: var(--ui-bg-7);
        z-index: 4;
        padding-top: ${spacer4};
        padding-bottom: ${spacer4};
        ${elevation4()}
      }

      .outer {
        position: relative;
        background-color: lavenderblush;
      }

      .inner {
        max-width: 820px;
        margin: 0 auto;
      }

      #outlet {
        min-height: 200px;
      }

      .nav-content {
        max-width: 1120px;
        height: 100%;
        margin: 0 auto;

        display: flex;
        justify-content: space-between;
        align-items: center;
        padding-top: 6px;
        padding-bottom: 4px;
      }

      .nav-content a {
        padding: ${spacer4} ${spacer12};
        text-decoration: none;
      }

      .nav-content a:hover,
      .nav-content a:active,
      .nav-content a:focus {
        text-decoration: underline;
      }

      .nav-content button:active,
      .nav-content button:focus,
      .nav-content a:active,
      .nav-content a:focus {
        ${focus()}
      }

      nav .logo {
        font-family: "balgruf";
        letter-spacing: -1px;
        font-weight: 600;
        font-size: 2rem;
        color: ${main5};
        text-shadow: 1px 1px 2px rgba(0, 0, 0, 1);
      }

      nav ul {
        list-style: none;
        padding: 0;
        display: flex;
        justify-content: space-between;
        margin: 0;
      }

      nav li {
        display: flex;
        justify-content: center;
        align-items: center;
        margin: ${spacer8};
      }

      nav li a {
        display: flex;
      }

      nav a {
        position: relative;
        color: white;
      }

      .content {
        padding-bottom: calc(75px + env(safe-area-inset-bottom));

        /* min-height: 100vh; */
      }

      .wrapper {
        /* min-height: calc(100vh - calc(75px + env(safe-area-inset-bottom))) */
      }

      .main-content {
        display: flex;
        min-height: calc(100vh - calc(125px + env(safe-area-inset-bottom)));
        /* width: 100%; */
        /* height: 100%; */
        flex-direction: column;
      }

      @media (min-width: 840px) {
        .wrapper {
          max-width: 1120px;
          width: 100%;
          margin-left: auto;
          margin-right: auto;
          box-sizing: border-box;
        }

        .content {
          display: flex;
          flex-direction: row;
          width: 100%;
          box-sizing: border-box;
        }

        .navigation-panel,
        .spacer {
          flex: 1 1 0;
          min-width: 0;
        }

        .main-content {
          max-width: 650px;
          width: 100%;
          margin-left: auto;
          margin-right: auto;
          min-height: calc(100vh - 124px);
        }
      }

      .navigation-panel ul {
        list-style: none;
        padding: 0;
        margin-top: 140px;
      }

      .navigation-panel ul li {
        margin: 4px;
        max-width: 80%;
      }

      .navigation-panel ul li a.active {
        color: ${main5};
      }
      .navigation-panel ul li a:hover,
      .navigation-panel ul li a:active,
      .navigation-panel ul li a:focus-visible {
        text-decoration: underline;
        background-color: var(--ui-bg-5);
        border-radius: 8px;
      }

      .navigation-panel ul li a:focus-visible {
        ${focus()}
      }

      .navigation-panel ul li a {
        padding: 8px;
        display: flex;
        color: ${neutral};
        text-decoration: none;
      }
      .navigation-panel ul li a svg {
        margin-right: 10px;
      }

      .navigation-panel svg {
        fill: ${neutral};
        /* margin-bottom: 4px; */
      }

      .navigation-panel .active svg {
        fill: ${main5};
      }

      .navigation-panel .active span {
        fill: ${main5}!important;
        font-weight: 500;
      }

      /* Expandable menu styles */
      .expandable-button {
        width: 100%;
        background: none;
        border: none;
        cursor: pointer;
        padding: 8px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        color: ${neutral};
        text-decoration: none;
        border-radius: 8px;
        transition: background-color 0.2s ease;
        font-size: 1rem;
        font-family: "Poppins", sans-serif;
      }

      .expandable-button:hover,
      .expandable-button:focus-visible {
        background-color: var(--ui-bg-5);
      }

      .expandable-button:focus-visible {
        ${focus()}
      }

      .expandable-button .button-content {
        display: flex;
        align-items: center;
      }

      .expandable-button .button-content svg {
        margin-right: 10px;
      }

      .chevron {
        transition: transform 0.3s ease;
        fill: ${neutral};
        width: 16px;
        height: 16px;
        flex-shrink: 0;
        display: flex;
        justify-content: center;
        align-items: center;
        flex-shrink: 0;
        width: 24px;
        height: 24px;
      }

      .chevron svg {
        fill: none;
      }

      .chevron.expanded {
        transform: rotate(180deg);
      }

      .children-container {
        overflow: hidden;
        transition: height 0.3s ease;
      }

      .navigation-panel ul.children-list {
        margin-top: 0;
      }

      .children-list {
        margin: 0;
        padding: 0;
        list-style: none;
        padding-left: 26px; /* Indent children */
      }

      .children-list li {
        margin: 2px;
      }

      .navigation-panel ul.children-list li {
        margin-left: 36px;
      }

      .children-list .child {
        display: flex;
        align-items: center;
      }

      .children-list a {
        padding: 6px 8px;
        display: flex;
        color: ${neutral};
        text-decoration: none;
        border-radius: 6px;
        font-size: 0.9em;
      }

      .children-list a:hover,
      .children-list a:focus-visible {
        background-color: var(--ui-bg-5);
        text-decoration: underline;
      }

      .children-list a:focus-visible {
        ${focus()}
      }

      .children-list a.active {
        color: ${main5};
      }

      .children-list a svg {
        margin-right: 8px;
        width: 16px;
        height: 16px;
      }

      .user-img img {
        width: 35px;
        height: 35px;
        border-radius: 50%;
        border: solid 2px var(--ui-bg-9);
        background-color: var(--ui-bg-8);
        margin: 0;
      }

      .user-img button {
        display: flex;
        justify-content: center;
        align-items: center;
        margin: 0;
        padding: 0;
        border-radius: 50%;
        background: none;
        border: none;
        cursor: pointer;
      }

      @keyframes pulse {
        0% {
          box-shadow: 0 0 0 0 rgba(255, 68, 68, 0.7);
        }
        70% {
          box-shadow: 0 0 0 15px rgba(255, 68, 68, 0);
        }
        100% {
          box-shadow: 0 0 0 0 rgba(255, 68, 68, 0);
        }
      }

      .speech-recognition {
        position: absolute;
        bottom: calc(80px + env(safe-area-inset-bottom));
        border-radius: 50%;
        width: 50px;
        height: 50px;
        background: var(--ui-main-5);
        display: flex;
        align-items: center;
        justify-content: center;
        right: 20px;
        border: none;
        transition: all 0.2s ease-in-out;
        ${elevation4()}
      }

      .speech-recognition.small svg {
        width: 24px;
        height: 24px;
      }
      .speech-recognition.small {
        width: 50px;
        height: 50px;
      }

      .speech-recognition.medium svg {
        width: 32px;
        height: 32px;
      }
      .speech-recognition.medium {
        width: 65px;
        height: 65px;
      }
      .speech-recognition.large {
        width: 80px;
        height: 80px;
      }
      .speech-recognition.large svg {
        width: 40px;
        height: 40px;
      }

      /* .speech-recognition.small botc-spinner {
        --spinner-size: 0px;
      } */

      .speech-recognition.recording {
        background-color: #d9403b;
        animation: pulse 1.2s infinite;
      }

      .speech-recognition.record-loading {
        background-color: var(--ui-bg-2);
      }

      .speech-recognition:not([disabled]):active {
        transform: scale(0.85);
      }

      @media (min-width: 840px) {
        :host {
          padding-bottom: 0;
        }

        .almanac-menu {
          margin-bottom: 0px !important;
        }

        .desktop-nav {
          display: flex;
          align-items: center;
        }
        .desktop-nav div.inner.nav-content {
          flex: 1;
        }
      }
    `];
	connectedCallback() {
		super.connectedCallback();
		settings.addEventListener("state-changed", () => {
			this.requestUpdate();
		});
	}
	toggleExpanded(index) {
		this.expandedItems = {
			...this.expandedItems,
			[index]: !this.expandedItems[index]
		};
	}
	async updateChildrenHeight(container, isExpanded) {
		if (isExpanded) {
			container.style.height = "auto";
			const height = container.scrollHeight;
			container.style.height = "0px";
			container.offsetHeight;
			container.style.height = `${height}px`;
		} else {
			if (container.style.height === "auto" || !container.style.height) {
				const height = container.scrollHeight;
				container.style.height = `${height}px`;
			}
			container.offsetHeight;
			container.style.height = "0px";
		}
	}
	async handleExpandToggle(index, event) {
		const container = event.target.closest("li").querySelector(".children-container");
		const wasExpanded = this.expandedItems[index];
		this.toggleExpanded(index);
		await this.updateComplete;
		this.updateChildrenHeight(container, !wasExpanded);
	}
	firstUpdated() {
		router.addEventListener("route-changed", () => {
			this.route = router.render();
		});
		this.route = router.render();
		requestAnimationFrame(() => {
			this.shadowRoot.querySelectorAll(".children-container").forEach((container, containerIndex) => {
				let menuIndex = 0;
				let containerCount = 0;
				for (let i = 0; i < menu.length; i++) if (menu[i].children && (menu[i].condition ? menu[i].condition() : true)) {
					if (containerCount === containerIndex) {
						menuIndex = i;
						break;
					}
					containerCount++;
				}
				if (this.expandedItems[menuIndex]) {
					const height = container.scrollHeight;
					container.style.height = `${height}px`;
				}
			});
		});
	}
	record() {
		this.recordingState = "recording";
		this._startRecording();
	}
	disconnectedCallback() {
		this.mediaRecorder?.stop();
		this.mediaRecorder = null;
		this.recognition?.stop();
		this.recognition = null;
		this.audioBlob = null;
		this.recordingState = "off";
	}
	async _startRecording() {
		const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
		let audioChunks = [];
		let finalTranscript = "";
		this.hasSpokenAtLeastOnce = false;
		this.audioBlob = null;
		try {
			const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
			this.mediaRecorder = new MediaRecorder(stream);
			audioChunks = [];
			this.mediaRecorder.ondataavailable = (event) => {
				audioChunks.push(event.data);
			};
			this.mediaRecorder.onstop = async () => {
				this.recordingState = "loading";
				this.audioBlob = new Blob(audioChunks, { type: "audio/webm" });
				await this._sendAudioToEndpoint();
			};
			this.mediaRecorder.start();
			this.maxDurationTimer = setTimeout(() => {
				this.stopRecording();
			}, 1e4);
			this.recognition = new SpeechRecognition();
			this.recognition.continuous = true;
			this.recognition.interimResults = true;
			this.recognition.maxAlternatives = 1;
			this.recognition.lang = settings.getState()?.experimentalSpeechRecognition?.lang || "en-US";
			this.recognition.onresult = (event) => {
				let interimTranscript = "";
				for (let i = event.resultIndex; i < event.results.length; i++) {
					const transcript = event.results[i][0].transcript;
					if (event.results[i].isFinal) {
						finalTranscript += transcript + " ";
						this.hasSpokenAtLeastOnce = true;
					} else interimTranscript += transcript;
				}
				if (this.speechEndTimer) clearTimeout(this.speechEndTimer);
				if (this.hasSpokenAtLeastOnce) this.speechEndTimer = setTimeout(async () => {
					this.recordingState = "loading";
					this.stopRecording();
				}, 1e3);
			};
			this.recognition.start();
		} catch (error) {
			console.error("Error accessing microphone:", error);
		}
	}
	stopRecording() {
		if (this.speechEndTimer) {
			clearTimeout(this.speechEndTimer);
			this.speechEndTimer = null;
		}
		if (this.maxDurationTimer) {
			clearTimeout(this.maxDurationTimer);
			this.maxDurationTimer = null;
		}
		if (this.mediaRecorder && this.mediaRecorder.state === "recording") {
			this.mediaRecorder.stop();
			this.mediaRecorder.stream.getTracks().forEach((track) => track.stop());
		}
		this.recognition?.stop();
		this.recognition = null;
		if (this.audioBlob) this._sendAudioToEndpoint();
		else this.recordingState = "off";
	}
	async _sendAudioToEndpoint() {
		if (!this.requesting) {
			this.requesting = true;
			if (!this.audioBlob) {
				console.error("No audio blob available to send.");
				return;
			}
			const reader = new FileReader();
			reader.readAsDataURL(this.audioBlob);
			reader.onloadend = async () => {
				const base64Audio = reader.result.split(",")[1];
				const FIREBASE_FUNCTION_URL = "https://us-central1-botc-dab21.cloudfunctions.net/processAudio";
				try {
					const response = await api.post(FIREBASE_FUNCTION_URL, {
						players: state.getState().currentGame.players.map((p) => p.name).join(", "),
						roles: state.getState().currentGame.scriptRoles.map((r) => r.humanReadableRole).join(", "),
						audio: base64Audio,
						mimeType: this.audioBlob.type,
						language: settings.getState()?.experimentalSpeechRecognition?.lang || "en-US"
					});
					const relatedPlayer = state.getState().currentGame.players.find((p) => p.name.toLowerCase() === response.name.toLowerCase());
					console.log(response);
					if (!relatedPlayer) {
						console.error("No related player found for", response.name);
						return;
					}
					switch (response.action) {
						case "role":
							if (!rolesById_default[response.roles[0]]) return;
							dialog.open({
								id: "speechRecognitionResult",
								parameters: {
									fn: () => {
										state.setState((s) => {
											return {
												...s,
												currentGame: {
													...s.currentGame,
													players: s.currentGame.players.map((p) => {
														if (p.name.toLowerCase() === response.name.toLowerCase()) return {
															...p,
															suspectedRole: rolesById_default[response.roles[0]]
														};
														return p;
													})
												}
											};
										});
									},
									transcription: response.transcription,
									action: response.action,
									old: relatedPlayer,
									new: {
										...relatedPlayer,
										suspectedRole: rolesById_default[response.roles[0]]
									}
								}
							});
							break;
						case "claims":
							if (!response.roles.every((r) => rolesById_default[r])) return;
							dialog.open({
								id: "speechRecognitionResult",
								parameters: {
									fn: () => {
										state.setState((s) => {
											return {
												...s,
												currentGame: {
													...s.currentGame,
													players: s.currentGame.players.map((p) => {
														if (p.name.toLowerCase() === response.name.toLowerCase()) return {
															...p,
															claims: response.roles.map((r) => rolesById_default[r] || r)
														};
														return p;
													})
												}
											};
										});
									},
									transcription: response.transcription,
									action: response.action,
									old: relatedPlayer,
									new: {
										...relatedPlayer,
										claims: response.roles.map((r) => rolesById_default[r] || r)
									}
								}
							});
							break;
						case "executed":
							const dead = {
								day: state.getState().currentGame.day,
								hasDeadVote: true,
								humanReadableRole: "Town execution",
								icon: "dead",
								id: "unknowntown",
								type: "Townsfolk"
							};
							dialog.open({
								id: "speechRecognitionResult",
								parameters: {
									fn: () => {
										state.setState((s) => {
											return {
												...s,
												currentGame: {
													...s.currentGame,
													players: s.currentGame.players.map((p) => {
														if (p.name.toLowerCase() === response.name.toLowerCase()) return {
															...p,
															dead
														};
														return p;
													})
												}
											};
										});
									},
									transcription: response.transcription,
									action: response.action,
									old: relatedPlayer,
									new: {
										...relatedPlayer,
										dead
									}
								}
							});
							break;
						case "revive":
							dialog.open({
								id: "speechRecognitionResult",
								parameters: {
									fn: () => {
										state.setState((s) => {
											return {
												...s,
												currentGame: {
													...s.currentGame,
													players: s.currentGame.players.map((p) => {
														if (p.name.toLowerCase() === response.name.toLowerCase()) return {
															...p,
															dead: false
														};
														return p;
													})
												}
											};
										});
									},
									transcription: response.transcription,
									action: response.action,
									old: relatedPlayer,
									new: {
										...relatedPlayer,
										dead: false
									}
								}
							});
							break;
						case "killed":
							if (response.roles.length && !rolesById_default[response.roles[0]]) return;
							const killedBy = response.roles.length ? rolesById_default[response.roles[0]] : {
								icon: "dead",
								humanReadableRole: "Suspected Evil",
								id: "unknownevil",
								type: "Demon"
							};
							const killed = {
								day: state.getState().currentGame.day,
								hasDeadVote: true,
								humanReadableRole: killedBy.humanReadableRole,
								icon: killedBy.icon,
								id: killedBy.id,
								type: killedBy.type
							};
							dialog.open({
								id: "speechRecognitionResult",
								parameters: {
									fn: () => {
										state.setState((s) => {
											return {
												...s,
												currentGame: {
													...s.currentGame,
													players: s.currentGame.players.map((p) => {
														if (p.name.toLowerCase() === response.name.toLowerCase()) return {
															...p,
															dead: killed
														};
														return p;
													})
												}
											};
										});
									},
									transcription: response.transcription,
									action: response.action,
									old: relatedPlayer,
									new: {
										...relatedPlayer,
										dead: killed
									}
								}
							});
							break;
					}
				} catch (error) {
					console.error("Error sending audio to server:", error);
				} finally {
					this.recordingState = "off";
					this.requesting = false;
				}
			};
		}
	}
	render() {
		const activeLink = router.context.url.pathname || new URL(window.location.href).pathname;
		const speech = settings.getState()?.experimentalSpeechRecognition;
		if (router.route.id === "almanac") return b`
        ${when(!this.mobile, () => this.renderDesktopNav(["almanac-menu"]))}
        ${this.route}
        ${when(this.mobile, () => b`
            <botc-bottom-nav
              .activeLink=${router.context.url.pathname}
              .menu=${menu}
            ></botc-bottom-nav>
          `)}
      `;
		return b`
      ${when(!this.mobile, () => this.renderDesktopNav())}
      <div class="wrapper">
        <div class="content">
          ${when(!this.mobile, () => b`<div class="navigation-panel">
                <ul>
                  ${menu.map((item, index) => b`
                      ${when(item?.condition ? item.condition() : true, () => b`
                          <li>
                            ${when(item.action, () => b`
                                <button
                                  aria-expanded="false"
                                  @click=${item.action}
                                  class="${activeLink.startsWith(item.href) ? "active" : ""}"
                                >
                                  ${item.icon}
                                  <span>${item.label}</span>
                                </button>
                              `, () => b`
                                ${when(item.href, () => b`
                                    <a
                                      class="${activeLink === item.href ? "active" : ""}"
                                      href="${item.href}"
                                      @click=${(e) => {
			this.anchorControl(e, item);
		}}
                                    >
                                      ${item.icon}
                                      <span>${item.label}</span>
                                    </a>
                                  `)}
                                ${when(item.children, () => b`
                                    <button
                                      class="expandable-button"
                                      aria-expanded="${this.expandedItems[index] ? "true" : "false"}"
                                      @click=${(e) => this.handleExpandToggle(index, e)}
                                    >
                                      <div class="button-content">
                                        ${item.icon}
                                        <span>${item.label}</span>
                                      </div>
                                      <div
                                        class="chevron ${this.expandedItems[index] ? "expanded" : ""}"
                                      >
                                        ${chevronDown}
                                      </div>
                                    </button>
                                    <div
                                      class="children-container"
                                      style="height: ${this.expandedItems[index] ? "auto" : "0px"}"
                                    >
                                      <ul class="children-list">
                                        ${item.children.map((child) => b`
                                            <li>
                                              <a
                                                class="child ${activeLink === child.href ? "active" : ""}"
                                                href="${child.href}"
                                                @click=${(e) => {
			this.anchorControl(e, child);
		}}
                                              >
                                                ${child.icon}
                                                <span>${child.label}</span>
                                              </a>
                                            </li>
                                          `)}
                                      </ul>
                                    </div>
                                  `)}
                              `)}
                          </li>
                        `)}
                    `)}
                </ul>
              </div>`)}
          <div class="main-content">${this.route}</div>
          ${when(!this.mobile, () => b`<div class="spacer"></div>`)}
        </div>
      </div>

      ${when(this.mobile && router.route.id !== "screenshot", () => b`
          ${when(speech?.enabled && state.getState()?.currentGame?.state === "in-progress" && router.route.id === "grim", () => b`
              <button
                ?disabled=${this.recordingState === "loading"}
                @click=${this.recordingState === "off" ? this.record : this.recordingState === "recording" ? this.stopRecording : () => {}}
                ui-icon-button
                class="${speech.buttonSize} speech-recognition ${this.recordingState === "recording" ? "recording" : this.recordingState === "loading" ? "record-loading" : ""}"
              >
                ${when(this.recordingState === "loading", () => b`<botc-spinner
                      size="100%"
                      style="--spinner-color: black;"
                    ></botc-spinner>`)}
                ${when(this.recordingState === "off", () => mic)}
                ${when(this.recordingState === "recording", () => stop)}
              </button>
            `)}
          <botc-bottom-nav
            .activeLink=${router.context.url.pathname}
            .menu=${menu}
          ></botc-bottom-nav>
        `)}
    `;
	}
	renderDesktopNav(classes = []) {
		return b`
      <nav class="desktop-nav ${classes.join(" ")}">
        <div class="inner nav-content">
          <a class="logo" href="/" aria-label="The Grim">The Grim</a>
          <ul>
            ${when(!settings.getState()?.user, () => b`
                <button
                  ui-button
                  primary
                  @click=${() => signInWithPopup(auth, provider)}
                >
                  Log in
                </button>
              `)}
            <li>
              <a
                href="https://discord.gg/aKNjG98w9S"
                target="_blank"
                rel="noopener noreferrer"
              >
                <?xml version="1.0" encoding="UTF-8"?>
                <!-- Uploaded to: SVG Repo, www.svgrepo.com, Generator: SVG Repo Mixer Tools -->
                <svg
                  width="24px"
                  height="24px"
                  viewBox="0 -28.5 256 256"
                  version="1.1"
                  xmlns="http://www.w3.org/2000/svg"
                  xmlns:xlink="http://www.w3.org/1999/xlink"
                  preserveAspectRatio="xMidYMid"
                >
                  <g>
                    <path
                      d="M216.856339,16.5966031 C200.285002,8.84328665 182.566144,3.2084988 164.041564,0 C161.766523,4.11318106 159.108624,9.64549908 157.276099,14.0464379 C137.583995,11.0849896 118.072967,11.0849896 98.7430163,14.0464379 C96.9108417,9.64549908 94.1925838,4.11318106 91.8971895,0 C73.3526068,3.2084988 55.6133949,8.86399117 39.0420583,16.6376612 C5.61752293,67.146514 -3.4433191,116.400813 1.08711069,164.955721 C23.2560196,181.510915 44.7403634,191.567697 65.8621325,198.148576 C71.0772151,190.971126 75.7283628,183.341335 79.7352139,175.300261 C72.104019,172.400575 64.7949724,168.822202 57.8887866,164.667963 C59.7209612,163.310589 61.5131304,161.891452 63.2445898,160.431257 C105.36741,180.133187 151.134928,180.133187 192.754523,160.431257 C194.506336,161.891452 196.298154,163.310589 198.110326,164.667963 C191.183787,168.842556 183.854737,172.420929 176.223542,175.320965 C180.230393,183.341335 184.861538,190.991831 190.096624,198.16893 C211.238746,191.588051 232.743023,181.531619 254.911949,164.955721 C260.227747,108.668201 245.831087,59.8662432 216.856339,16.5966031 Z M85.4738752,135.09489 C72.8290281,135.09489 62.4592217,123.290155 62.4592217,108.914901 C62.4592217,94.5396472 72.607595,82.7145587 85.4738752,82.7145587 C98.3405064,82.7145587 108.709962,94.5189427 108.488529,108.914901 C108.508531,123.290155 98.3405064,135.09489 85.4738752,135.09489 Z M170.525237,135.09489 C157.88039,135.09489 147.510584,123.290155 147.510584,108.914901 C147.510584,94.5396472 157.658606,82.7145587 170.525237,82.7145587 C183.391518,82.7145587 193.761324,94.5189427 193.539891,108.914901 C193.539891,123.290155 183.391518,135.09489 170.525237,135.09489 Z"
                      fill="white"
                      fill-rule="nonzero"
                    ></path>
                  </g>
                </svg>
              </a>
            </li>
            ${when(settings.getState()?.user, () => b`
                <li class="user-img">
                  <button
                    ${context(dialog, () => b`<botc-profile-buttons></botc-profile-buttons>`)}
                    aria-label="User profile"
                  >
                    <img
                      src=${settings.getState().user.photoURL}
                      alt=${settings.getState().user.name}
                      width="50"
                      height="50"
                    />
                  </button>
                </li>
              `)}
          </ul>
        </div>
      </nav>
    `;
	}
	anchorControl(e, item) {
		if (router.url.pathname === item.href) {
			e.preventDefault();
			return;
		}
	}
};
customElements.define("blood-on-the-clocktower", Botc);
//#endregion
