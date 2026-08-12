import { A as i, I as i$1, L as r, P as b, _ as focus, a as bg3, b as main4, c as bg6, d as bg9, f as border, g as elevation4, h as elevation24, i as bg2, m as elevation12, o as bg4, s as bg5, t as when, u as bg8, v as header, x as main5 } from "./CY602n9t.js";
import { A as APPENDED_ROLES, D as tooltip, I as images, P as TRAVELLER_SHEET, T as nightOrder, a as timer$1, b as img, c as MediaQueryController, d as alignment, k as traveller, m as capitalize, n as settings, p as calculateEffectiveVoteCount, r as state, s as BREAKPOINTS } from "./CP0hEE1l.js";
import { s as createLogger } from "./vIOCOudq.js";
import { t as o$1 } from "./BAPyi3WL.js";
import { n as sortableListStyles, t as SortableListMixin } from "./BiTbQJWR.js";
import "./ntwYzdyv.js";
import { C as hamburger, D as plus, F as circle, G as settings$1, L as notes, O as drag, S as nomination, T as minus, U as kebab, W as eye, c as edit, d as setRole, l as killedBy, s as addToken, u as addClaims, y as cards, z as deadVote } from "./CEyrKUT7.js";
import { t as remove } from "./dKNDhBkx.js";
import { n as moon } from "./C15Vso4Y.js";
import { t as inlay } from "./Ue9OS-EJ.js";
import "./GnpzsBGp.js";
import { t as button } from "./CbFrBy7s.js";
import { t as iconButton } from "./C0jyJKsx.js";
import { n as cross, t as dialog } from "./Dm27KaR0.js";
import { t as input } from "./_hTQLwBE.js";
import { t as c } from "./CINdyCSV.js";
import { t as context } from "./BgH8Gcb8.js";
import "./DPxjp5Y3.js";
import { t as buttonLink } from "./6PngWMwE.js";
import { t as visuallyHidden } from "./DZ8S2RMZ.js";
//#region node_modules/@thepassle/app-tools/router/index.js
const log = createLogger("router");
var RouteEvent = class extends Event {
	/**
	* @param {Context} context 
	*/
	constructor(context) {
		super("route-changed");
		this.context = context;
	}
};
/**
* @typedef {import('./types.js').Plugin} Plugin
* @typedef {import('./types.js').Context} Context
* @typedef {import('./types.js').RouteDefinition} RouteDefinition
* @typedef {import('./types.js').Route} Route
* @typedef {import('./types.js').Config} Config
*/
var Router = class extends EventTarget {
	context = {
		params: {},
		query: {},
		title: "",
		url: new URL(window.location.href)
	};
	/**
	* @param {Config} config 
	*/
	constructor(config) {
		super();
		this.config = config;
		/** @type {Route[]} */
		this.routes = config.routes.map((route) => {
			return {
				...route,
				urlPattern: new URLPattern({
					pathname: route.path,
					baseURL: window.location.href,
					search: "*",
					hash: "*"
				})
			};
		});
		log("Initialized routes", this.routes);
		queueMicrotask(() => {
			this.navigate(new URL(window.location.href), { replace: true });
		});
		window.addEventListener("popstate", this._onPopState);
		window.addEventListener("click", this._onAnchorClick);
	}
	uninstall() {
		window.removeEventListener("popstate", this._onPopState);
		window.removeEventListener("click", this._onAnchorClick);
	}
	get url() {
		return new URL(window.location.href);
	}
	get fallback() {
		return new URL(this.config?.fallback || this.baseUrl.href.substring(window.location.origin.length), this.baseUrl);
	}
	get baseUrl() {
		return new URL("./", document.baseURI);
	}
	/**
	* @template RenderResult
	*/
	render() {
		log(`Rendering route ${this.context.url.pathname}${this.context.url.search}${this.context.url.hash}`, {
			context: this.context,
			route: this.route
		});
		return this.route?.render?.(this.context);
	}
	/**
	* @private
	* @param {URL} url 
	* @returns {Route | null}
	*/
	_matchRoute(url) {
		for (const route of this.routes) {
			const match = route.urlPattern.exec(url);
			if (match) {
				const { title } = route;
				const query = Object.fromEntries(new URLSearchParams(url.search));
				const params = match?.pathname?.groups ?? {};
				this.context = {
					url,
					title: typeof title === "function" ? title({
						params,
						query,
						url
					}) : title,
					params,
					query
				};
				return route;
			}
		}
		log(`No route matched for ${url.pathname}${url.search}${url.hash}`, url);
		return null;
	}
	/**
	* @private
	*/
	_notifyUrlChanged() {
		this.dispatchEvent(new RouteEvent(this.context));
	}
	/**
	* @private
	*/
	_onPopState = () => {
		this.navigate(new URL(window.location.href), { backNav: true });
	};
	/**
	* @private
	*/
	_onAnchorClick = (e) => {
		if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey) return;
		const a = e.composedPath().find((el) => el.tagName === "A");
		if (!a || !a.href) return;
		const url = new URL(a.href);
		if (this.url.href === url.href) return;
		if (url.host !== window.location.host) return;
		if (a.hasAttribute("download") || a.href.includes("mailto:")) return;
		const target = a.getAttribute("target");
		if (target && target !== "" && target !== "_self") return;
		e.preventDefault();
		this.navigate(url);
	};
	/**
	* @private 
	*/
	_collectPlugins(route) {
		return [...this.config?.plugins ?? [], ...route?.plugins ?? []];
	}
	/**
	* @param {string | URL} url The URL to navigate to.
	* @param {{
	*    backNav?: boolean,
	*    replace?: boolean,
	*  }} options options An options object to configure the navigation. The backNav property specifies whether the navigation is a backward navigation, which doesn't push the navigation into browser nav history.
	*/
	async navigate(url, options = {}) {
		if (typeof url === "string") url = new URL(url, this.baseUrl);
		let route = this._matchRoute(url) || this._matchRoute(this.fallback);
		log(`Navigating to ${url.pathname}${url.search}${url.hash}`, {
			context: this.context,
			route: this.route
		});
		/** @type {Plugin[]} */
		let plugins = this._collectPlugins(route);
		let redirecting;
		do {
			redirecting = false;
			for (const plugin of plugins) try {
				const result = await plugin?.shouldNavigate?.(this.context);
				if (result) {
					if (!await result.condition()) {
						url = new URL(result.redirect, this.baseUrl);
						route = this._matchRoute(url) || this._matchRoute(this.fallback);
						plugins = this._collectPlugins(route);
						log("Redirecting", {
							context: this.context,
							route: this.route
						});
						redirecting = true;
						break;
					}
				}
			} catch (e) {
				log(`Plugin "${plugin.name}" error on shouldNavigate hook`, e);
				throw e;
			}
		} while (redirecting);
		this.route = route;
		if (!this.route) throw new Error(`[ROUTER] No route or fallback matched for url ${url}`);
		for (const plugin of plugins) try {
			await plugin?.beforeNavigation?.(this.context);
		} catch (e) {
			log(`Plugin "${plugin.name}" error on beforeNavigation hook`, e);
			throw e;
		}
		if (options?.replace) window.history.replaceState(null, "", `${url.pathname}${url.search}${url.hash}`);
		else if (!options.backNav) window.history.pushState(null, "", `${url.pathname}${url.search}${url.hash}`);
		document.title = this.context.title;
		this._notifyUrlChanged();
		for (const plugin of plugins) try {
			await plugin?.afterNavigation?.(this.context);
		} catch (e) {
			log(`Plugin "${plugin.name}" error on afterNavigation hook`, e);
			throw e;
		}
	}
};
//#endregion
//#region node_modules/@thepassle/app-tools/router/plugins/lazy.js
/**
* @example lazy(() => import('foo'))
* @param {any} fn
* @returns {import('../index.js').Plugin}
*/
function lazy(fn) {
	return {
		name: "lazy",
		beforeNavigation: () => {
			fn();
		}
	};
}
//#endregion
//#region node_modules/@thepassle/app-tools/router/plugins/scrollToTop.js
/**
* @type {import('../index.js').Plugin}
*/
const scrollToTop = {
	name: "scrollToTop",
	beforeNavigation: () => {
		window.scrollTo(0, 0);
	}
};
//#endregion
//#region src/components/botc-image.js
/**
* @import { Player, Role, Alignment } from '../../types.js';
*/
var BotcImage = class extends i {
	static properties = {
		player: { type: Object },
		imgUrl: { type: String },
		showRoleName: { type: Boolean },
		hide: { type: Boolean }
	};
	constructor() {
		super();
		this.showRoleName = false;
		/** @type {boolean | undefined} */
		this.hide = void 0;
		this.imgUrl = void 0;
		/** @type {Player | undefined} */
		this.player = void 0;
		/** @type {Role | undefined} */
		this.roleObj = void 0;
	}
	connectedCallback() {
		super.connectedCallback();
		settings.addEventListener("state-changed", this.callRequestUpdate);
	}
	callRequestUpdate = () => {
		this.requestUpdate();
	};
	disconnectedCallback() {
		super.disconnectedCallback();
		settings.removeEventListener("state-changed", this.callRequestUpdate);
	}
	static styles = [i$1`
      :host {
        display: block;
        position: relative;
      }
      img {
        width: 100%;
        height: 100%;
        box-sizing: border-box;
        border-radius: 50%;
        border: solid 2px var(--ui-bg-4);
        background-color: var(--ui-bg-8);
        transition: border-color 0.2s;
        box-shadow: 0px 2px 6px 1px rgba(0, 0, 0, 0.75);

        -webkit-touch-callout: none; /* Prevents iOS long-press save/copy menu */
        -webkit-user-select: none; /* Prevents text/image selection on Safari */
        user-select: none; /* Prevents selection on modern browsers */

        touch-action: none;
      }

      img.evil {
        border-color: #d9403b;
      }
      img.good {
        border-color: #45a0f1;
      }

      .role-label-path {
        position: absolute;
        top: -3px;
        left: 0px;
        width: 100%;
        height: 100%;
        pointer-events: none;
        overflow: visible;
      }

      .curved-role-label {
        fill: white;
        font-family: "Poppins", sans-serif;
        font-weight: 500;
        letter-spacing: 0.5px;
        filter: drop-shadow(0 1px 2px rgba(0, 0, 0, 1))
          drop-shadow(0 1px 3px rgba(0, 0, 0, 0.8));
      }

      img.me {
        border-color: #45a0f1;
      }
    `];
	/**
	*
	* @TODO
	* - Refactor to not use `role` but only `player`
	*  - Handle img for homebrew roles
	*/
	render() {
		const { player } = this;
		const { hideGrim: _hideGrim, showRole, displayRoleNamesInCircularMode } = settings.getState();
		const hideGrim = this.hide ?? _hideGrim;
		let hasEvilToken = false;
		let hasGoodToken = false;
		for (const token of player?.tokens || []) {
			if (token.id === "special-Evil") hasEvilToken = true;
			if (token.id === "special-Good") hasGoodToken = true;
		}
		const alignment = hideGrim || player?.me && !showRole || !player?.suspectedRole?.id ? "" : hasEvilToken ? "evil" : hasGoodToken ? "good" : player?.suspectedRole?.type?.toLowerCase() === "traveller" ? "" : player?.suspectedRole?.type?.toLowerCase() === "townsfolk" || player?.suspectedRole?.type?.toLowerCase() === "outsider" ? "good" : "evil";
		if (player?.suspectedRole?.image) if (Array.isArray(player.suspectedRole.image)) {
			const roleType = player.suspectedRole.type?.toLowerCase() || player.suspectedRole.team?.toLowerCase();
			const isBaseEvil = roleType === "minion" || roleType === "demon";
			let imageIndex = 0;
			if (alignment === "evil") imageIndex = isBaseEvil ? 0 : 1;
			else if (alignment === "good") imageIndex = isBaseEvil ? 1 : 0;
			else imageIndex = 0;
			this.imgUrl = player.suspectedRole.image[imageIndex] || player.suspectedRole.image[0];
		} else this.imgUrl = player.suspectedRole.image;
		else this.imgUrl = images.any(player?.suspectedRole?.id, alignment);
		if (player?.me && !showRole) this.imgUrl = images.question();
		if (hideGrim || !player?.suspectedRole?.id) this.imgUrl = images.transparent();
		const roleName = player?.suspectedRole?.humanReadableRole || "";
		return b`
      <img
        part="img"
        alt=${hideGrim || player?.me && !showRole || !player?.suspectedRole?.id ? "" : `${alignment} ${roleName}`}
        class="${alignment} ${player?.me && !showRole && !hideGrim && !!player?.suspectedRole?.id ? "me" : ""}"
        src=${o$1(this.imgUrl)}
        draggable="false"
      />
      ${when(this.showRoleName && !hideGrim && roleName && displayRoleNamesInCircularMode && (!player?.me || showRole), () => {
			const uuid = crypto.randomUUID();
			return b` <svg
            class="role-label-path"
            viewBox="0 0 100 100"
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              <path id="role-arc-${uuid}" d="M 8,64 A 46 46 0 0 0 92,64" />
            </defs>
            <text class="curved-role-label" font-size="11">
              <textPath
                href="#role-arc-${uuid}"
                startOffset="50%"
                text-anchor="middle"
              >
                ${roleName}
              </textPath>
            </text>
          </svg>`;
		})}
    `;
	}
};
customElements.define("botc-image", BotcImage);
//#endregion
//#region src/icons/timer.svg.js
const timer = b`<svg
  xmlns="http://www.w3.org/2000/svg"
  height="24px"
  viewBox="0 -960 960 960"
  width="24px"
  fill="#fcb93c"
>
  <path
    d="M400-840q-17 0-28.5-11.5T360-880q0-17 11.5-28.5T400-920h160q17 0 28.5 11.5T600-880q0 17-11.5 28.5T560-840H400Zm80 440q17 0 28.5-11.5T520-440v-160q0-17-11.5-28.5T480-640q-17 0-28.5 11.5T440-600v160q0 17 11.5 28.5T480-400Zm0 320q-74 0-139.5-28.5T226-186q-49-49-77.5-114.5T120-440q0-74 28.5-139.5T226-694q49-49 114.5-77.5T480-800q62 0 119 20t107 58l28-28q11-11 28-11t28 11q11 11 11 28t-11 28l-28 28q38 50 58 107t20 119q0 74-28.5 139.5T734-186q-49 49-114.5 77.5T480-80Zm0-80q116 0 198-82t82-198q0-116-82-198t-198-82q-116 0-198 82t-82 198q0 116 82 198t198 82Zm0-280Z"
  />
</svg>`;
//#endregion
//#region node_modules/lit-html/directives/map.js
/**
* @license
* Copyright 2021 Google LLC
* SPDX-License-Identifier: BSD-3-Clause
*/
function* o(o, f) {
	if (void 0 !== o) {
		let i = 0;
		for (const t of o) yield f(t, i++);
	}
}
//#endregion
//#region src/components/botc-view-switcher.js
var BotcViewSwitcher = class extends i {
	static styles = [
		r(visuallyHidden),
		inlay,
		i$1`
      :host {
        display: block;
        width: 100%;
      }

      div[ui-inlay] {
        display: flex;
        padding: 2px;
      }

      div[ui-inlay] > label {
        display: flex;
        flex: 1;
        justify-content: center;
        align-items: center;
        color: var(--ui-bg-2);
      }

      div[ui-inlay] svg {
        fill: var(--ui-bg-2);
      }

      label:has(:focus-visible) {
        ${focus()}
      }

      .content {
        padding-top: 2px;
        padding-bottom: 2px;
        font-size: 0.875rem;
        display: flex;
        align-items: center;
        justify-content: center;
      }

      .content svg {
        width: 20px;
      }

      .selected {
        background-color: var(--ui-bg-6);
        border-radius: 6px;
        border: 1px solid var(--ui-bg-9);
      }

      .selected .content {
        color: white;
      }

      .selected .content svg {
        fill: white;
      }
    `
	];
	static properties = { view: { type: String } };
	constructor() {
		super();
		/** @type {"list" | "circular"} */
		this.view;
		this.boundSetView = this.setView.bind(this);
	}
	connectedCallback() {
		super.connectedCallback();
		this.view = settings.getState().view;
		settings.addEventListener("state-changed", this.boundSetView);
	}
	setView() {
		this.view = settings.getState().view;
	}
	disconnectedCallback() {
		super.disconnectedCallback();
		settings.removeEventListener("state-changed", this.boundSetView);
	}
	render() {
		return b`
      <div ui-inlay>
        <label
          ui-label
          for="circular"
          class="${this.view === "circular" ? "selected" : ""}"
        >
          <input
            ui-radio
            type="radio"
            name="assign"
            id="circular"
            visually-hidden
            ?checked=${this.view === "circular"}
            @change=${() => {
			settings.setState((old) => ({
				...old,
				view: "circular"
			}));
		}}
          />

          <div class="content">${circle}</div>
        </label>
        <label
          ui-label
          for="list"
          class="${this.view === "list" ? "selected" : ""}"
        >
          <input
            ui-radio
            type="radio"
            name="assign"
            id="list"
            visually-hidden
            ?checked=${this.view === "list"}
            @change=${() => {
			settings.setState((old) => ({
				...old,
				view: "list"
			}));
		}}
          />

          <div class="content">${hamburger}</div>
        </label>
      </div>
    `;
	}
};
customElements.define("botc-view-switcher", BotcViewSwitcher);
//#endregion
//#region src/pages/grim.js
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
function getTopNominationForCurrentDay(gameData) {
	if (!gameData) return null;
	const currentDay = gameData.day;
	if (!gameData.nominations.length) return null;
	const nominationsForCurrentDay = gameData.nominations.filter((nomination) => nomination.day === currentDay);
	if (!nominationsForCurrentDay.length) return null;
	const alivePlayers = gameData.players.filter((p) => !p.dead).length;
	const minVotes = Math.floor(alivePlayers / 2) + 1;
	const getEffectiveVotes = (nom) => calculateEffectiveVoteCount(nom.votes, gameData.players);
	const maxVotes = Math.max(...nominationsForCurrentDay.map(getEffectiveVotes));
	const topNominations = nominationsForCurrentDay.filter((nomination) => getEffectiveVotes(nomination) === maxVotes);
	if (topNominations.length !== 1) return null;
	const topNomination = topNominations[0];
	if (getEffectiveVotes(topNomination) < minVotes) return null;
	return {
		name: gameData.players.find((player) => player.id === topNomination.nominee).name,
		amountOfVotes: getEffectiveVotes(topNomination)
	};
}
function iOS() {
	return [
		"iPad Simulator",
		"iPhone Simulator",
		"iPod Simulator",
		"iPad",
		"iPhone",
		"iPod"
	].includes(navigator.platform) || navigator.userAgent.includes("Mac") && "ontouchend" in document;
}
window.settings = settings;
function playerDetails(player, nightOrderNr, hideGrim, state, showRole = false) {
	return b`
    <div class="player-details">
      <div class="player-details-images">
        ${when(!hideGrim && !!nightOrderNr, () => b`
            <div ${tooltip("Nightorder")} class="player-night-order">
              ${player.me && nightOrderNr && !showRole ? "?" : nightOrderNr}
            </div>
          `)}
        <botc-image .player=${player}></botc-image>
        ${when(!player.dead && !hideGrim, () => b`
            ${when(state?.currentGame?.nominations?.some((n) => {
		return n.day === state.currentGame.day && n.nominator === player.id;
	}), () => b`
                <div
                  ${tooltip("Nominated")}
                  title="Nominated"
                  class="dead-vote"
                >
                  N
                </div>
              `)}
          `)}
        ${when(!hideGrim, () => b`
            ${when(state?.currentGame?.nominations?.some((n) => {
		return n.day === state.currentGame.day && n.votes.includes(player.id);
	}), () => b`
                <div
                  ${tooltip("Voted")}
                  title="Voted"
                  class="dead-vote voted-symbol"
                >
                  V
                </div>
              `)}
          `)}
        ${when(!!player.dead, () => b`
            ${when(player?.dead?.hasDeadVote, () => b`
                <div
                  ${tooltip("Has dead vote")}
                  title="Dead vote"
                  class="dead-vote"
                >
                  ${deadVote}
                </div>
              `)}
            <img
              ${tooltip(hideGrim ? "Dead" : player.dead.humanReadableRole)}
              class="dead-token ${!hideGrim ? `${alignment(player.dead.type)} ${traveller(player)}` : ""}"
              src="${images.any(hideGrim ? "dead" : player.dead.icon)}"
            />
          `)}
      </div>
      <div class="player-details-name">
        <h2
          class="${!hideGrim && player.me && player.suspectedRole.type ? showRole && alignment(player) === "red" ? "red" : "blue" : !hideGrim ? `${alignment(player)} ${traveller(player)}` : ""} 
             player-name"
        >
          <span>${capitalize(player.name)}</span>
        </h2>
        ${when(!hideGrim && player.suspectedRole && player.me && showRole, () => b`<p class="human-readable-name">
              ${player.suspectedRole.humanReadableRole}
            </p>`)}
        ${when(!hideGrim && player.suspectedRole && !player.me, () => b`<p class="human-readable-name">
              ${player.suspectedRole.humanReadableRole}
            </p>`)}
        ${when(!hideGrim && player.claims.length, () => b`
            <p class="human-readable-name-2">
              <b>Claims:</b> ${player.claims.map((r, i) => {
		const isDoubleClaim = state.currentGame.players.some((p) => p !== player && p.claims.some((c) => c.humanReadableRole === r.humanReadableRole));
		const { highlightDoubleClaims } = settings.getState();
		return b`
                  <span
                    class="${highlightDoubleClaims && isDoubleClaim ? "double-claim" : ""}"
                    >${r.humanReadableRole}</span
                  >${i === player.claims.length - 1 ? "" : ","}
                `;
	})}
            </p>
          `)}
      </div>
      <div class="player-details-tokens">
        <div class="tokens">
          ${!hideGrim && player.tokens?.length && (state.currentGame.stMode || settings.getState().showRole || !player.me) ? player.tokens.map((token) => {
		return b`
                    <div class="token-wrapper">
                      <img
                        class="status-token ${alignment(token.type)}"
                        src="${img(token)}"
                        alt="${token.humanReadableRole + " " + token.label}"
                        title="${token.humanReadableRole + " " + token.label}"
                      />
                      <div class="token-label">${token.label}</div>
                    </div>
                  `;
	}) : ""}
        </div>
      </div>
    </div>
  `;
}
var BotcPlayerNotification = class extends i {
	static properties = {
		player: { type: Object },
		notification: { type: Array }
	};
	static styles = [button, i$1``];
	constructor() {
		super();
		/** @type {import('../../types.js').Player} */
		this.player;
		this.notifications = [];
	}
	render() {
		return this.notifications.map((notification) => b`
        <button ui-button primary @click=${notification.action}>
          ${notification.label}
        </button>
      `);
	}
};
customElements.define("botc-player-notification", BotcPlayerNotification);
/**
*
* @param {*} tokenName
* @param {*} label
* @param {*} parameters
* @returns
*/
function createNotification(tokenName, label, parameters = {
	showNightOrder: true,
	filterFn: () => true
}) {
	return {
		label,
		action: async () => {
			const foundToken = state.getState().currentGame.tokens?.find((t) => t.id === tokenName);
			await dialog.close();
			await new Promise((r) => setTimeout(r));
			dialog.open({
				id: "playerSelect",
				parameters
			}).then((player) => {
				if (player.length) {
					state.setState((s) => {
						const players = s.currentGame.players;
						return {
							...s,
							currentGame: {
								...s.currentGame,
								players: players.map((p) => {
									if (player.some((selectedPlayer) => selectedPlayer.id === p.id)) p.tokens.push(foundToken);
									if (parameters?.additionalActions) p = parameters.additionalActions(p, player);
									return p;
								})
							}
						};
					});
					parameters?.callback?.(player);
				}
			});
		}
	};
}
/**
*
* @param {import("../../types.js").Player} player
*/
function getNotifications(player) {
	const game = state.getState().currentGame;
	switch (player.suspectedRole?.id) {
		case "washerwoman": {
			const townsfolk = game.players.find((p) => p.tokens.some((t) => t.id === "washerwoman-Townsfolk"));
			const wrong = game.players.find((p) => p.tokens.some((t) => t.id === "washerwoman-Wrong"));
			if (!wrong && !townsfolk) return [createNotification("washerwoman-Townsfolk", "Set Townsfolk"), createNotification("washerwoman-Wrong", "Set Wrong")];
			if (!wrong) return [createNotification("washerwoman-Wrong", "Set Wrong")];
			if (!townsfolk) return [createNotification("washerwoman-Townsfolk", "Set Townsfolk")];
			return [];
		}
		case "librarian": {
			const outsider = game.players.find((p) => p.tokens.some((t) => t.id === "librarian-Outsider"));
			const wrong = game.players.find((p) => p.tokens.some((t) => t.id === "librarian-Wrong"));
			if (!game.players.some((p) => p?.suspectedRole?.type?.toLowerCase() === "outsider" || p?.tokens?.some((t) => t.id === "drunk-Is The Drunk"))) return [];
			if (!wrong && !outsider) return [createNotification("librarian-Outsider", "Set Outsider"), createNotification("librarian-Wrong", "Set Wrong")];
			if (!wrong) return [createNotification("librarian-Wrong", "Set Wrong")];
			if (!outsider) return [createNotification("librarian-Outsider", "Set Outsider")];
			return [];
		}
		case "investigator": {
			const minion = game.players.find((p) => p.tokens.some((t) => t.id === "investigator-Minion"));
			const wrong = game.players.find((p) => p.tokens.some((t) => t.id === "investigator-Wrong"));
			if (!wrong && !minion) return [createNotification("investigator-Minion", "Set Minion"), createNotification("investigator-Wrong", "Set Wrong")];
			if (!wrong) return [createNotification("investigator-Wrong", "Set Wrong")];
			if (!minion) return [createNotification("investigator-Minion", "Set Minion")];
			return [];
		}
		case "fortuneteller":
			if (!game.players.find((p) => p.tokens.some((t) => t.id === "fortuneteller-Red Herring"))) return [createNotification("fortuneteller-Red Herring", "Set Red Herring")];
			return [];
		case "grandmother":
			if (!game.players.find((p) => p.tokens.some((t) => t.id === "grandmother-Grandchild"))) return [createNotification("grandmother-Grandchild", "Set Grandchild")];
			return [];
		case "noble": {
			const knownPlayers = game.players.filter((p) => p.tokens.some((t) => t.id === "noble-Know"));
			const amount = knownPlayers.length;
			if (knownPlayers.length <= 2) return [createNotification("noble-Know", `Set ${3 - amount} Know token${3 - amount === 1 ? "" : "s"}`, {
				maxSelect: 3 - amount,
				multiple: 3 - amount > 1
			})];
			return [];
		}
		case "bountyhunter":
			if (!game.players.find((p) => p.tokens.some((t) => t.id === "bountyhunter-Known"))) return [createNotification("bountyhunter-Known", "Set Known")];
			return [];
		case "knight": {
			const knowPlayers = game.players.filter((p) => p.tokens.some((t) => t.id === "knight-Know"));
			const amount = knowPlayers.length;
			if (knowPlayers.length <= 1) return [createNotification("knight-Know", `Set ${2 - amount} Know token${2 - amount === 1 ? "" : "s"}`, {
				maxSelect: 2 - amount,
				multiple: 2 - amount > 1
			})];
			return [];
		}
		case "steward":
			if (!game.players.find((p) => p.tokens.some((t) => t.id === "steward-Know"))) return [createNotification("steward-Know", "Set Know")];
			return [];
		case "villageidiot": {
			const drunkIdiot = game.players.find((p) => p.tokens.some((t) => t.id === "villageidiot-Drunk"));
			const amountOfVillageIdiotsInPlay = game.players.filter((p) => p.suspectedRole?.id === "villageidiot").length;
			if (!drunkIdiot && amountOfVillageIdiotsInPlay > 1) return [createNotification("villageidiot-Drunk", "Set Drunk", { filterFn: (player) => player.suspectedRole?.id === "villageidiot" })];
			return [];
		}
		case "drunk": {
			const hasDrunkRole = game.players.find((p) => p.suspectedRole?.id === "drunk");
			const hasDrunkToken = game.players.find((p) => p.tokens.some((t) => t.id === "drunk-Is The Drunk"));
			if (hasDrunkRole && hasDrunkToken) return [{
				label: "Set role for Drunk",
				action: async () => {
					await dialog.close();
					await new Promise((r) => setTimeout(r));
					dialog.open({
						id: "roleSelect",
						parameters: {
							allScriptRoles: true,
							showDemonBluffs: true,
							showAlreadyInPlayRoles: true
						}
					}).then(([role]) => {
						if (!role) return;
						state.setState((s) => ({
							...s,
							currentGame: {
								...s.currentGame,
								players: s.currentGame.players.map((p) => {
									if (p.id === hasDrunkRole.id) return {
										...p,
										suspectedRole: role
									};
									return p;
								})
							}
						}));
					});
				}
			}];
		}
		case "puzzlemaster":
			if (!game.players.find((p) => p.tokens.some((t) => t.id === "puzzlemaster-Drunk"))) return [createNotification("puzzlemaster-Drunk", "Set Drunk")];
			return [];
		case "pixie":
			if (!game.players.find((p) => p.tokens.some((t) => t.id === "pixie-Mad"))) return [createNotification("pixie-Mad", "Set Mad")];
			return [];
		case "eviltwin":
			if (!game.players.find((p) => p.tokens.some((t) => t.id === "eviltwin-Twin"))) return [createNotification("eviltwin-Twin", "Set Twin")];
			return [];
		case "marionette": {
			const hasMarionetteRole = game.players.find((p) => p.suspectedRole?.id === "marionette");
			const hasMarionetteToken = game.players.find((p) => p.tokens.some((t) => t.id === "marionette-Is The Marionette"));
			if (hasMarionetteRole && hasMarionetteToken) return [{
				label: "Set role for Marionette",
				action: async () => {
					await dialog.close();
					await new Promise((r) => setTimeout(r));
					dialog.open({
						id: "roleSelect",
						parameters: {
							allScriptRoles: true,
							showDemonBluffs: true,
							showAlreadyInPlayRoles: true
						}
					}).then(([role]) => {
						if (!role) return;
						state.setState((s) => ({
							...s,
							currentGame: {
								...s.currentGame,
								players: s.currentGame.players.map((p) => {
									if (p.id === hasMarionetteRole.id) return {
										...p,
										suspectedRole: role
									};
									return p;
								})
							}
						}));
					});
				}
			}];
		}
		case "sweetheart": {
			const sweetHeartIsDead = !!game.players.find((p) => p.suspectedRole?.id === "sweetheart")?.dead?.id;
			const sweetHeartDrunk = game.players.find((p) => p.tokens.some((t) => t.id === "sweetheart-Drunk"));
			if (sweetHeartIsDead && !sweetHeartDrunk) return [createNotification("sweetheart-Drunk", "Set Drunk")];
			return [];
		}
	}
	return [];
}
var BotcGrim = class extends SortableListMixin(i) {
	media = new MediaQueryController(this, [BREAKPOINTS.LG.MIN, "(min-width: 640px)"], ({ media, matches }) => {
		switch (media) {
			case BREAKPOINTS.LG.MIN:
				this.mobile = !matches;
				break;
			case "(min-width: 640px)":
				this.isAbove640 = matches;
				break;
		}
	});
	static properties = {
		mobile: { type: Boolean },
		state: { type: Object },
		nightOrder: { type: Array },
		expanded: { type: Object },
		showRole: { type: Boolean },
		expandedIsAnimating: { type: Boolean },
		viewMode: { type: String },
		isAbove640: { type: Boolean },
		circularDragState: { type: Object }
	};
	constructor() {
		super();
		/** @type {import('../../types.js').State} */
		this.state = state.getState();
		this.showRole = settings.getState().showRole;
		this.isAbove640 = false;
		this.nightOrder = [];
		this.expanded = /* @__PURE__ */ new Set();
		this.expandedIsAnimating = false;
		this.callRequestUpdate = this.callRequestUpdate.bind(this);
		this.updateAndRerender = this.updateAndRerender.bind(this);
		this.circularDragState = null;
		this._lpTimer = null;
		this._lpPointerId = null;
		this._lpLiEl = null;
		this._lpStartX = 0;
		this._lpStartY = 0;
		this._lpCurrentX = 0;
		this._lpCurrentY = 0;
		this._dragEndedForPlayer = null;
	}
	async connectedCallback() {
		super.connectedCallback();
		settings.addEventListener("state-changed", this.callRequestUpdate);
		window.addEventListener("beforeinstallprompt", (e) => {
			setTimeout(() => {
				this.requestUpdate();
			});
		});
		timer$1.addEventListener("state-changed", () => {
			this.requestUpdate();
		});
		this.nightOrder = state.getState().nightOrder;
		state.addEventListener("state-changed", this.updateAndRerender);
	}
	updateAndRerender() {
		this.sortable = null;
		this.state = state.getState();
		this.requestUpdate();
	}
	callRequestUpdate() {
		this.showRole = settings.getState().showRole;
		this.requestUpdate();
	}
	disconnectedCallback() {
		super.disconnectedCallback();
		settings.removeEventListener("state-changed", this.callRequestUpdate);
		state.removeEventListener("state-changed", this.updateAndRerender);
		this._clearLongPress();
	}
	static styles = [
		button,
		sortableListStyles,
		iconButton,
		input,
		header,
		inlay,
		buttonLink,
		i$1`
      :host {
        display: block;
        overflow-x: hidden;
      }

      .item-wrapper-inner {
        display: flex;
      }

      .item-wrapper-inner button.player-btn-expand:not([disabled]) {
        all: unset;
        width: 100%;
        cursor: pointer;
      }

      @media (max-width: 840px) {
        .item-wrapper-inner button.player-btn-expand {
          -webkit-tap-highlight-color: transparent;
          -webkit-touch-callout: none;
          touch-action: manipulation;
        }
      }

      .item-wrapper-inner button {
        font-family: "Poppins", sans-serif;
        font-weight: 300;
        display: block;
        flex: 1;
        text-align: left;
        background-color: transparent;
        border: unset;
      }

      .item-wrapper-inner button:focus-visible {
        ${focus()}
      }

      textarea[ui-input] {
        width: calc(100% - 18px);
        margin-left: auto;
        margin-right: auto;
        display: block;
        margin-top: 12px;
      }

      botc-disclosure {
        background-color: ${bg6};
      }

      botc-disclosure::part(button) {
        padding-top: 16px;
        padding-bottom: 16px;
      }

      .double-claim {
        color: red;
      }

      .players {
        list-style-type: none;
        padding: 0;
        display: flex;
        flex-direction: column;
        margin-top: 12px;
        margin-bottom: 12px;
      }

      .disclaimer {
        margin-top: 24px;
        font-size: 0.625rem;
        text-align: center;
      }

      .discord a {
        color: ${main5};
      }
      .discord {
        font-size: 0.625rem;
        text-align: center;
      }

      .players .item-wrapper {
        flex-direction: column;
        display: flex;
        align-items: stretch;
        border: solid 1px ${border};
        background: ${bg5};
        padding: 8px;
        border-radius: 8px;
        box-sizing: border-box;
        ${elevation4()}
        /* margin-bottom: 12px; */
        transition: box-shadow 0.3s, transform 0.3s;
      }

      @media (min-width: 840px) {
        .players .item-wrapper:hover {
          ${elevation12()}
        }
      }

      .dead-opa-circ {
        opacity: 0.4 !important;
        filter: brightness(0.75);
        transition:
          opacity 0.3s,
          filter 0.3s;
      }

      .dead-opa-list {
        opacity: 0.45 !important;
        filter: brightness(0.9);
        transition:
          opacity 0.3s,
          filter 0.3s;
      }

      @media (hover: hover) and (pointer: fine) {
        .dead-opa-circ:hover,
        .dead-opa-circ:focus-visible,
        .dead-opa-list:hover,
        .dead-opa-list:focus-visible {
          opacity: 1 !important;
          filter: brightness(1);
          transition:
            opacity 0.3s,
            filter 0.3s;
        }
      }

      [sortable-list][dragging] [dragged] .item-wrapper {
        ${elevation24()}
      }

      .players li {
        margin-bottom: 12px;
      }

      .human-readable-name {
        margin-top: 0;
        font-size: 0.9rem;
        margin-bottom: 4px;
      }

      .human-readable-name-2 {
        margin-top: 0;
        font-size: 0.75rem;
        margin-bottom: 4px;
      }

      h2 {
        font-size: 1rem;
        margin-top: 0;
        margin-bottom: 0;
      }

      h2.player-name {
        display: flex;
        color: ${main4};
        font-family: "Balgruf";
        font-size: 1.375rem;
        text-shadow: 1px 1px 2px rgba(0, 0, 0, 1);
      }

      h2.player-name span {
        flex: 1;
        display: flex;
        align-items: center;
      }

      h2.finished {
        text-align: center;
        font-family: "Balgruf";
        font-size: 1.875rem;
        color: ${main5};
        text-shadow: 1px 1px 2px rgba(0, 0, 0, 1);
        margin-bottom: 0px;
        margin-top: 24px;
        color: #d9403b;
      }

      .player-details-name {
        display: flex;
        flex: 1;
        flex-direction: column;
      }

      .dead {
        filter: grayscale(100%);
      }

      .players .item-wrapper .player-details {
        flex: 1;
        position: relative;
        margin-left: 8px;
        display: flex;
        align-items: center;
        flex-direction: row;
      }

      .player-details botc-image {
        width: 54px;
        height: 54px;
        margin-right: 22px;
      }

      .drag-handle {
        align-items: center;
        display: flex;
        cursor: move;
      }

      .drag-handle.disabled {
        cursor: not-allowed;
      }

      .drag-handle.disabled svg {
        fill: ${bg3};
      }

      .player-actions {
        display: flex;
        align-items: center;
      }

      .player-actions button {
        margin-left: 8px;
        display: flex;
      }

      button[ui-icon-button] {
        align-items: center;
        width: 40px;
        height: 100%;
      }

      .days {
        flex: 1;
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin-bottom: 16px;
        margin-top: 16px;
      }

      .days .text {
        flex: 1;
      }

      .day-buttons {
        display: flex;
      }

      img {
        margin-right: 20px;
        width: 50px;
        height: 50px;
        border-radius: 50%;
        border: solid 2px ${bg9};
        background-color: ${bg8};
      }

      img.blue {
        border: solid 2px #45a0f1;
      }
      h2.blue {
        color: #45a0f1;
      }

      img.red {
        border: solid 2px #d9403b;
      }
      h2.red {
        color: #d9403b;
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

      .script-title {
        text-align: center;
      }

      .game-buttons {
        margin-top: 30px;
      }

      .player-link {
        all: unset;
        flex: 1;
      }

      .players li.confirmed h2 {
        color: #45a0f1;
      }

      .players li.confirmed .item-wrapper {
        border: solid 2px #45a0f1;
        background-color: #34404c;
      }

      a {
        -webkit-user-drag: none;
      }

      .traveller-sheet {
        font-size: 0.9rem;
        text-align: center;
        padding: 12px;
        margin-top: 12px;
      }

      .dead-token {
        position: absolute;
        width: 25px;
        height: 25px;
        top: -4px;
        left: 34px;
        z-index: 9;
        box-shadow: 1px 1px 2px 1px rgba(0, 0, 0, 0.75);
      }

      img.dead-token {
        border: solid 2px ${border};
      }
      img.dead-token.red {
        border: solid 2px #d9403b;
      }
      img.dead-token.blue {
        border: solid 2px #45a0f1;
      }

      .player-details-images {
        display: flex;
        align-items: center;
        position: relative;
      }

      h2.dead {
        color: ${bg2};
      }

      .token-wrapper {
        display: flex;
        align-items: center;
        flex-direction: column;
        margin-right: 6px;
      }

      .status-token {
        box-shadow: 1px 1px 2px 1px rgba(0, 0, 0, 0.75);
        width: 25px;
        margin: 0;
        height: 25px;
      }

      .token-label {
        font-size: 0.5rem;
        font-weight: 300;
        font-family: "Poppins";
        text-shadow: none;
        color: white;
        margin-top: 4px;
        text-align: center;
      }

      .status-token:last-child {
        margin-right: 0;
      }

      img.me {
        border: solid 2px #45a0f1;
      }

      img.no-role.dead {
        border: solid 2px #45a0f1;
      }

      .tokens {
        display: flex;
        align-items: center;
      }

      .animate {
        transition: transform 0.2s ease-in-out;
      }

      button[ui-button].game-options {
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: row;
      }

      button[ui-button].game-options div {
        display: flex;
        justify-content: center;
        align-items: center;
      }

      button[ui-button][primary].game-options svg {
        fill: ${bg8};
        margin-right: 8px;
      }
      button[ui-button][secondary].game-options svg {
        fill: var(--ui-main-5);
        margin-right: 8px;
      }

      div.player-night-order {
        display: flex;
        font-size: 0.625rem;
        text-align: center;
        width: 12px;
        height: 12px;
        border: solid 2px var(--ui-bg-9);
        border-radius: 50%;
        position: absolute;
        bottom: -7px;
        z-index: 99999;
        left: 20px;
        background: var(--ui-bg-8);
        justify-content: center;
        align-items: center;
        font-variant-numeric: tabular-nums;
      }

      div.dead-vote {
        display: flex;
        font-size: 0.625rem;
        text-align: center;
        width: 12px;
        height: 12px;
        border: solid 2px var(--ui-bg-9);
        border-radius: 50%;
        position: absolute;
        z-index: 99999;
        background: var(--ui-bg-8);
        justify-content: center;
        align-items: center;
        font-variant-numeric: tabular-nums;
        left: -8px;
        top: 20px;
      }

      div.dead-vote svg {
        width: 8px;
        height: 8px;
      }

      .non-active {
        opacity: 0.7;
        transform: scale(0.95);
      }

      .players.neighbor {
        margin: 0px !important;
      }

      .players.list {
        margin-top: 0px;
        margin-bottom: 0px;
      }

      button[ui-button][secondary].show-role {
        /* margin-top: 16px; */
      }

      .expanded {
        padding-left: 4px;
        padding-right: 4px;
        height: 0;
        overflow: hidden;
        transition: height 300ms ease;
      }
      .expanded.open {
        padding: 4px;
      }

      .item-wrapper.neighbor {
        flex-direction: row;
      }

      .player-page-link {
        display: block;
        color: ${main5};
        text-align: center;
        margin-top: 12px;
        margin-bottom: 6px !important;
      }
      .player-page-link:focus-visible {
        ${focus()}
      }

      .dead-vote.voted-symbol {
        top: 37px;
        left: 2px;
      }

      .days-and-timer {
        display: flex;
        align-items: center;
      }

      .out {
        margin-left: 12px;
        margin-right: 12px;
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
      }

      .global-reminder img {
        margin-right: 12px;
        margin-left: 4px;
        width: 30px;
        height: 30px;
      }

      .final3 {
        font-size: 0.85rem;
        text-align: center;
        color: var(--ui-error-5);
      }

      .balgruf {
        font-family: "Balgruf";
        font-size: 1.375rem;
        color: ${main5};
        text-shadow: 1px 1px 2px rgba(0, 0, 0, 1);
        margin: 0;
      }

      .top-nomination {
        font-size: 0.9rem;
        text-align: center;
        margin-top: 8px;
      }

      .top-nomination .balgruf {
        font-size: 1.1rem;
      }

      .expanded-description {
        margin-top: 12px;
        padding: 12px;
        font-size: 0.75rem;
        text-align: center;
      }

      .day-section h2 {
        margin-bottom: 12px;
      }

      .day-section .event-badge {
        margin-bottom: 8px;
      }

      .day-section botc-player-details {
        margin-bottom: 12px;
      }

      .event-item {
        display: flex;
        align-items: center;
        justify-content: space-between;
      }

      .event-item botc-player-details {
        flex: 1;
      }

      /* ============================================ */
      /* CIRCULAR VIEW STYLES */
      /* ============================================ */
      .view-toggle {
        display: flex;
        gap: 4px;
        background: ${bg6};
        border-radius: 8px;
      }

      .players.circle {
        position: relative;
        width: 100%;
        max-width: 600px;
        aspect-ratio: 1 / 1;
        margin: 0 auto;
        margin-top: 12px;
        margin-bottom: 12px;
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
        transition: transform 0.3s ease;
        /* Prevent the browser from claiming the touch for page scroll,
           which would fire pointercancel and kill the drag mid-gesture. */
        touch-action: none;
        -webkit-touch-callout: none;
        user-select: none;
      }

      .players.circle > li.dragging {
        transition: none;
        opacity: 0.9;
      }

      .players.circle > li.dragging .circle-player {
        cursor: grabbing;
      }

      .players.circle .circle-player {
        all: unset;
        display: flex;
        flex-direction: column;
        align-items: center;
        cursor: pointer;
      }

      .players.circle .circ-player-wrapper {
        position: relative;
        transition: transform 0.2s ease;
      }

      @media (hover: hover) and (pointer: fine) {
        .players.circle .circ-player-wrapper:hover {
          transform: scale(1.1);
        }

        .players.circle .circ-player-wrapper:active {
          transform: scale(0.95);
        }
      }

      .players.circle .circle-token {
        position: relative;
        width: var(--token-size, ${CIRCLE_CONFIG.tokenSize}px);
        height: var(--token-size, ${CIRCLE_CONFIG.tokenSize}px);
      }

      .players.circle .circle-token img {
        pointer-events: none;
        -webkit-user-drag: none;
      }

      .players.circle .circle-token img.role-icon {
        width: 100%;
        height: 100%;
        border-radius: 50%;
        border: solid 2px ${bg4};
        background-color: ${bg8};
        transition: border-color 0.2s;
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

      .players.circle .circle-token .shroud {
        pointer-events: auto;
        position: absolute;
        top: -8px;
        left: calc(50% + 0px);
        transform: translateX(-50%);
        width: 25px;
        height: 25px;
        border-radius: 50%;
        border: solid 2px ${border};
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

      .notification-marker-list:hover,
      .notification-marker-list:active,
      .notification-marker:hover,
      .notification-marker:active {
        background: var(--ui-main-3);
      }

      .notification-marker-list:hover,
      .notification-marker:hover {
        cursor: pointer;
      }

      button.notification-marker-list:focus-visible,
      .notification-marker:focus-visible {
        ${focus({ radius: i$1`50%` })}
      }

      button.notification-marker-list {
        width: 20px !important;
        margin: 0;
        padding: 0;
        height: 20px !important;
        background: var(--ui-main-5);
        border: solid 2px ${bg9};
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        position: absolute;
        left: 36px;
        z-index: 9;
      }
      button.notification-marker-list svg {
        width: 14px !important;
        height: 14px !important;
      }

      .notification-marker {
        z-index: 9;
        position: absolute;
        left: -2px;
        top: 3px;
        width: 26px !important;
        margin: 0;
        padding: 0;
        height: 26px !important;
        background: var(--ui-main-5);
        border: solid 2px ${bg9};
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 0.5rem;
      }

      .notification-marker svg {
        width: 18px !important;
        height: 18px !important;
      }

      .players.circle .circle-token .dead-vote-marker svg {
        width: 10px !important;
        height: 10px !important;
      }

      .players.circle .circle-token .nomination-marker {
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

      .players.circle .circle-token .vote-marker {
        position: absolute;
        width: 14px;
        height: 14px;
        background: ${bg8};
        border: solid 2px ${bg9};
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 0.5rem;

        bottom: -2px;
        left: 3px;
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
        z-index: 1;
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
      .players.circle .player-name-label-role {
        font-size: 0.5rem;
        font-family: "Poppins", sans-serif;
        font-weight: 300;
        color: var(--ui-neutral);
      }

      .circle-player:focus-visible .circle-token botc-image::part(img) {
        ${focus({ radius: i$1`50%` })}
      }

      @media (min-width: 640px) {
        .player-name-label:has(.player-name-label-role)
          .player-name-label-name {
          margin-bottom: -4px;
        }
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

      .players.circle li.confirmed .circle-token img.role-icon {
        border-color: #45a0f1;
        box-shadow: 0 0 6px 3px rgba(69, 160, 241, 1);
        background: #34404c;
      }

      @media (min-width: 640px) {
        .players.circle .circle-token {
          width: 80px;
          height: 80px;
        }
      }

      @media (max-width: 480px) {
        .players.circle .circle-token {
          width: var(--token-size-mobile, ${CIRCLE_CONFIG.tokenSizeMobile}px);
          height: var(--token-size-mobile, ${CIRCLE_CONFIG.tokenSizeMobile}px);
        }

        .players.circle .player-name-label {
          font-size: 0.65rem;
          max-width: 55px;
        }

        .circle-center .day-display {
          font-size: 1.5rem;
        }

        .circle-cente2alive-count {
          font-size: 0.75rem;
        }

        .players.circle .circle-token .shroud {
          width: 18px;
          height: 18px;
          top: -6px;
        }

        .players.circle .circle-token .status-tokens .token-container {
          width: 18px;
          height: 18px;
        }

        .players.circle .circle-token .status-tokens img {
          width: 18px;
          height: 18px;
        }

        .players.circle .circle-token .status-tokens .token-label-path {
          width: 18px;
          height: 18px;
        }
      }

      botc-view-switcher {
        margin-top: 8px;
      }

      .circular-timer {
        font-size: 3.5rem;
      }

      .players.circle {
        margin-top: 30px;
      }

      .players.circle .alive-count {
        color: var(--ui-neutral);
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

      .circular-view-btns {
        display: flex;
        padding: 12px;
        justify-content: space-between;
      }

      .circular-view-btns svg {
        fill: var(--ui-neutral);
      }

      .players.circle .circle-token .role-label-path {
        position: absolute;
        top: 4px;
        left: 2px;
        width: 100%;
        height: 100%;
        pointer-events: none;
        overflow: visible;
      }

      .players.circle .circle-token .curved-role-label {
        fill: white;
        font-family: "Poppins", sans-serif;
        font-weight: 500;
        letter-spacing: 0.5px;
        filter: drop-shadow(0 1px 2px rgba(0, 0, 0, 1))
          drop-shadow(0 1px 3px rgba(0, 0, 0, 0.8));
      }

      .select-token {
        margin-top: 32px;
        margin-bottom: 24px;
        text-align: center;
        font-size: 1.75rem;
      }
      .select-token.with-icon {
        margin-bottom: 0px;
      }
      p.select-token-hide {
        margin-top: 0;
        margin-bottom: 0.5rem;
        text-align: center;
      }
      .bag-selection {
        margin-bottom: 60px;
        margin-top: 60px;
      }

      .bag-selection ul {
        list-style: none;
        padding: 0;
        display: flex;
        justify-content: center;
        flex-wrap: wrap;
        gap: 28px;
        padding-top: 40px;
        padding-bottom: 40px;
      }

      .bag-token {
        color: var(--ui-main-5);
        font-family: "Balgruf";
        font-size: 3rem;
        font-variant-numeric: tabular-nums;
        text-shadow: 1px 1px 2px rgba(0, 0, 0, 1);
        border-radius: 50%;
        width: 80px;
        height: 80px;
        background: var(--ui-bg-5);
        border: solid 2px var(--ui-main-5);
        box-shadow: rgba(0, 0, 0, 0.75) 0px 2px 6px 1px;
      }

      .bag-token:focus-visible {
        ${focus({ radius: i$1`50%` })}
      }

      .bag-token:not([disabled]):active {
        transition: transform 0.1s ease-in-out;
        transform: scale(0.95);
        background: var(--ui-bg-4);
      }

      .bag-token:not([disabled]):hover,
      .bag-token:not([disabled]):focus-visible {
        background: var(--ui-bg-4);
      }

      .bag-token[disabled] {
        border: solid 2px var(--ui-bg-4);
        background: var(--ui-bg-6);
      }

      @media (min-width: 480px) {
        .bag-selection ul {
          padding-left: 100px;
          padding-right: 100px;
        }
      }

      .ccc-logo {
        all: unset;
        width: 125px;
        display: block;
        margin-left: auto;
        margin-right: auto;
        margin-top: 40px;
      }

      @media (max-width: 480px) {
        button.notification-marker {
          width: 22px !important;
          height: 22px !important;
          top: 2px;
        }

        button.notification-marker svg {
          width: 14px !important;
          height: 14px !important;
        }

        ul.players.circle {
          margin-bottom: 56px;
        }

        .ccc-logo {
          width: 100px;
        }
      }

      .player-mode-list-view {
        margin-bottom: 14px;
      }

      .gr-cont {
        display: flex;
        width: 100%;
      }

      .gr-cont .gr-text {
        flex: 1;
      }

      .gr-cont {
        align-items: center;
        justify-content: center;
      }

      .gr-cont .remove {
        align-items: center;
        justify-content: center;
      }
    `
	];
	incrementDay() {
		state.setState((s) => ({
			...s,
			currentGame: {
				...this.state.currentGame,
				day: this.state.currentGame.day + 1
			}
		}));
	}
	decrementDay() {
		if (this.state.currentGame.day > 0) state.setState((s) => ({
			...s,
			currentGame: {
				...this.state.currentGame,
				day: this.state.currentGame.day - 1
			}
		}));
	}
	removeFromDeadlog(entryToRemove) {
		state.setState((s) => ({
			...s,
			currentGame: {
				...s.currentGame,
				deadlog: s.currentGame.deadlog.filter((entry) => entry !== entryToRemove)
			}
		}));
	}
	setViewMode(mode) {
		settings.setState((s) => ({
			...s,
			view: mode
		}));
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
	_clearLongPress() {
		if (this._lpTimer !== null) {
			clearTimeout(this._lpTimer);
			this._lpTimer = null;
		}
		this._lpPointerId = null;
		this._lpLiEl = null;
		this._lpStartX = 0;
		this._lpStartY = 0;
		this._lpCurrentX = 0;
		this._lpCurrentY = 0;
	}
	/**
	* Called on pointerdown on a player <li>.
	* Starts the 600 ms long-press countdown.  We do NOT call preventDefault()
	* here so that normal short taps still synthesise a click (opening the player
	* actions dialog).  The browser contextmenu is suppressed via a separate
	* @contextmenu handler on the <li>.
	*/
	_handlePlayerPointerDown(player, e) {
		if (e.button && e.button !== 0) return;
		this._clearLongPress();
		this._lpPointerId = e.pointerId;
		this._lpLiEl = e.currentTarget;
		this._lpStartX = e.clientX;
		this._lpStartY = e.clientY;
		this._lpCurrentX = e.clientX;
		this._lpCurrentY = e.clientY;
		this._lpTimer = setTimeout(() => {
			this._lpTimer = null;
			this._activateCircularDrag(player);
		}, 600);
	}
	/**
	* Called on pointermove on a player <li>.
	* Two roles:
	*  1. Before drag activates – cancel the long-press if the finger moves
	*     more than 10 px (the user probably wants to scroll, not drag).
	*  2. After drag activates – update the token position and prevent scroll.
	*/
	_handlePlayerPointerMove(e) {
		if (this._lpTimer !== null && e.pointerId === this._lpPointerId) {
			const dx = e.clientX - this._lpStartX;
			const dy = e.clientY - this._lpStartY;
			if (Math.sqrt(dx * dx + dy * dy) > 10) {
				this._clearLongPress();
				return;
			}
			this._lpCurrentX = e.clientX;
			this._lpCurrentY = e.clientY;
		}
		if (!this.circularDragState) return;
		if (e.pointerId !== this.circularDragState.pointerId) return;
		e.preventDefault();
		this.circularDragState = {
			...this.circularDragState,
			currentX: e.clientX,
			currentY: e.clientY
		};
		this.requestUpdate();
	}
	/**
	* Called on pointerup / pointercancel on a player <li>.
	* Cancels a pending long press or commits the drag if one was active.
	*/
	_handlePlayerPointerUp(e) {
		this._clearLongPress();
		if (!this.circularDragState) return;
		if (e.pointerId !== this.circularDragState.pointerId) return;
		const x = e.type === "pointercancel" ? this.circularDragState.currentX : e.clientX;
		const y = e.type === "pointercancel" ? this.circularDragState.currentY : e.clientY;
		const { playerId, circleRect } = this.circularDragState;
		this.circularDragState = null;
		this._dragEndedForPlayer = playerId;
		setTimeout(() => {
			this._dragEndedForPlayer = null;
		}, 400);
		const pctX = (x - circleRect.left) / circleRect.width * 100;
		const pctY = (y - circleRect.top) / circleRect.height * 100;
		const newPlayers = this.state.currentGame.players.map((p) => p.id === playerId ? {
			...p,
			circlePosition: {
				x: pctX,
				y: pctY
			}
		} : p);
		state.setState((s) => ({
			...s,
			currentGame: {
				...s.currentGame,
				players: newPlayers
			}
		}));
		this.state = state.getState();
		this.requestUpdate();
	}
	/**
	* Activates drag mode for a player after the long-press threshold is met.
	* Calls setPointerCapture on the <li> so all subsequent pointer events
	* (move, up, cancel) are delivered to it even when the finger leaves the
	* element's hit area.
	*/
	_activateCircularDrag(player) {
		if (this.state?.currentGame?.state === "finished") return;
		const circleEl = this.shadowRoot.querySelector(".players.circle");
		if (!circleEl) return;
		const liEl = this._lpLiEl;
		const pointerId = this._lpPointerId;
		const clientX = this._lpCurrentX;
		const clientY = this._lpCurrentY;
		if (liEl && pointerId !== null) try {
			liEl.setPointerCapture(pointerId);
		} catch (_) {}
		this._lpPointerId = null;
		this._lpLiEl = null;
		const rect = circleEl.getBoundingClientRect();
		this.circularDragState = {
			playerId: player.id,
			pointerId,
			currentX: clientX,
			currentY: clientY,
			circleRect: rect
		};
		this.requestUpdate();
	}
	renderCircularPlayers(hideGrim) {
		const players = this.state.currentGame.players;
		const total = players.length;
		return b`
      <div class="circular-view-btns">
        ${when(this.state?.currentGame?.stMode, () => b`
            <button
              ${tooltip("Timer")}
              @click=${() => dialog.open({ id: "timer" })}
              ui-icon-button
            >
              ${timer}
            </button>
          `, () => b` <button
              ${tooltip("Quick Actions")}
              ${context(dialog, () => b`
                  <botc-grim-player-quick-actions
                    .game=${this.state.currentGame}
                  ></botc-grim-player-quick-actions>
                `)}
              ui-icon-button
            >
              ${cards}
            </button>`)}
        <button
          ${tooltip("Display options")}
          ${context(dialog, () => b`<botc-display-optns></botc-display-optns>`)}
          ui-icon-button
        >
          ${eye}
        </button>
      </div>
      <ul
        class="players circle"
        style="
        --token-size: ${CIRCLE_CONFIG.tokenSize}px;
        --token-size-mobile: ${CIRCLE_CONFIG.tokenSizeMobile}px;
      "
      >
        <div class="circle-center">
          ${when(this.state.currentGame?.stMode && timer$1.getState().started, () => b`<div class="circular-timer balgruf">
                ${timer$1.getState().formatted}
              </div>`, () => b`<div class="day-display">
                  Day
                  ${Number(this.state.currentGame.day) + (this.state.currentGame?.stMode ? 0 : 1)}
                </div>
                ${when(this.state.currentGame?.state === "in-progress" && settings.getState().showFinal3Warning, () => {
			const alivePlayers = players.filter((p) => !p.dead && p?.suspectedRole?.type?.toLowerCase() !== "traveller").length;
			if (alivePlayers === 4) return b`<div
                        class="alive-count"
                        style="color: var(--ui-error-5);"
                      >
                        Final 4!
                      </div>`;
			else if (alivePlayers === 3) return b`<div
                        class="alive-count"
                        style="color: var(--ui-error-5);"
                      >
                        Final 3!
                      </div>`;
			return b`
                      <div class="alive-count">${alivePlayers} alive</div>
                    `;
		})}`)}
        </div>

        ${c(players, (player) => player.id, (player, i) => {
			const notifications = getNotifications(player);
			const calculatedPos = this.calculateCirclePosition(i, total, 400);
			const pos = player.circlePosition ?? calculatedPos;
			const nightOrderNr = nightOrder(player, this.nightOrder);
			const hasNominated = this.state.currentGame?.nominations?.some((n) => n.day === this.state.currentGame.day && n.nominator === player.id);
			const hasVoted = this.state.currentGame?.nominations?.some((n) => n.day === this.state.currentGame.day && n.votes.includes(player.id));
			player.suspectedRole?.humanReadableRole;
			const isDragging = this.circularDragState?.playerId === player.id;
			let posStyle;
			if (isDragging) {
				const { currentX, currentY, circleRect } = this.circularDragState;
				posStyle = `left: ${(currentX - circleRect.left) / circleRect.width * 100}%; top: ${(currentY - circleRect.top) / circleRect.height * 100}%; transform: translate(-50%, -50%) scale(1.1); z-index: 100;`;
			} else posStyle = `left: ${pos.x}%; top: ${pos.y}%; transform: translate(-50%, -50%);`;
			return b`
              <li
                @pointerdown=${(e) => this._handlePlayerPointerDown(player, e)}
                @pointermove=${(e) => this._handlePlayerPointerMove(e)}
                @pointerup=${(e) => this._handlePlayerPointerUp(e)}
                @pointercancel=${(e) => this._handlePlayerPointerUp(e)}
                @contextmenu=${(e) => e.preventDefault()}
                @click=${(e) => {
				if (this._dragEndedForPlayer === player.id) {
					e.stopImmediatePropagation();
					e.preventDefault();
				}
			}}
                class="${!hideGrim && player.confirmed ? "confirmed" : ""} ${player.dead ? "dead-opa-circ" : ""} ${isDragging ? "dragging" : ""}"
                style="${posStyle}"
              >
                <div class="circ-player-wrapper">
                  ${when(!!notifications.length && this.state?.currentGame?.stMode && settings.getState().showNotifications && !hideGrim, () => b`
                      <button
                        ${tooltip("Click to finish game setup")}
                        class="notification-marker"
                        ${context(dialog, () => b`
                            <botc-player-notification
                              .player=${player}
                              .notifications=${notifications}
                            ></botc-player-notification>
                          `)}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          height="24px"
                          viewBox="0 -960 960 960"
                          width="24px"
                          fill="#1f1f1f"
                        >
                          <path
                            d="M480-120q-33 0-56.5-23.5T400-200q0-33 23.5-56.5T480-280q33 0 56.5 23.5T560-200q0 33-23.5 56.5T480-120Zm0-240q-33 0-56.5-23.5T400-440v-320q0-33 23.5-56.5T480-840q33 0 56.5 23.5T560-760v320q0 33-23.5 56.5T480-360Z"
                          />
                        </svg>
                      </button>
                    `)}
                  <button
                    ?disabled=${this.state.currentGame?.state === "finished"}
                    ${context(dialog, () => b`<botc-player-actions
                          .player=${player}
                          .kind=${"circular"}
                          .showRole=${this.showRole}
                        ></botc-player-actions>`)}
                    class="circle-player"
                  >
                    <div class="circle-token">
                      <botc-image
                        .showRoleName=${true}
                        .player=${player}
                      ></botc-image>
                      ${when(player.dead, () => b`
                          <img
                            ${tooltip(hideGrim ? "Dead" : player.dead.humanReadableRole)}
                            class="shroud ${hideGrim ? "" : alignment(player.dead.type)}"
                            src="${images.any(hideGrim ? "dead" : player.dead.icon)}"
                          />
                        `)}
                      ${when(player.dead?.hasDeadVote, () => b`
                          <div
                            ${tooltip("Has dead vote")}
                            class="dead-vote-marker"
                          >
                            ${deadVote}
                          </div>
                        `)}
                      ${when(hasNominated && !player.dead, () => b`
                          <div
                            ${tooltip("Nominated")}
                            class="nomination-marker"
                            title="Nominated"
                          >
                            N
                          </div>
                        `)}
                      ${when(hasVoted, () => b`
                          <div
                            ${tooltip("Voted")}
                            class="vote-marker"
                            title="Voted"
                          >
                            V
                          </div>
                        `)}
                      ${when(!hideGrim && !!nightOrderNr && settings.getState().showNightOrderNumbers, () => b`
                          <div ${tooltip("Nightorder")} class="night-order">
                            ${player.me && nightOrderNr && !settings.getState().showRole ? "?" : nightOrderNr}
                          </div>
                        `)}
                      ${when(!hideGrim && player.tokens?.length && (this.state.currentGame.stMode || settings.getState().showRole || !player.me), () => b`
                          <div class="status-tokens">
                            ${player.tokens.map((token, tokenIndex) => b`
                                <div
                                  ${tooltip(token.label)}
                                  class="token-container"
                                >
                                  <img
                                    class="${alignment(token.type)}"
                                    src="${img(token)}"
                                    alt="${token.label}"
                                    title="${token.humanReadableRole} ${token.label}"
                                  />
                                  ${when(settings.getState()?.displayTokenLabelInCircularMode, () => b`
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
                                        <text
                                          class="curved-label"
                                          font-size="3.5"
                                        >
                                          <textPath
                                            href="#token-arc-${player.id}-${tokenIndex}"
                                            startOffset="50%"
                                            text-anchor="middle"
                                          >
                                            ${token.label}
                                          </textPath>
                                        </text>
                                      </svg>
                                    `)}
                                </div>
                              `)}
                          </div>
                        `)}
                    </div>

                    <span
                      ui-inlay
                      class="player-name-label
                      ${!hideGrim && player.me && player.suspectedRole?.id ? this.showRole && alignment(player) === "red" ? "red" : "blue" : ""}
                      ${!hideGrim && !player.me ? alignment(player) : ""}

                    "
                    >
                      <div class="player-name-label-name">
                        ${capitalize(player.name)}
                      </div>
                    </span>
                  </button>
                </div>
              </li>
            `;
		})}
      </ul>
    `;
	}
	assignPlayerToken(player, role) {
		state.setState((s) => ({
			...s,
			currentGame: {
				...s.currentGame,
				bag: s.currentGame.bag?.map((r) => {
					if (r.uuid === role.uuid) return {
						...r,
						taken: true
					};
					return r;
				}),
				players: s.currentGame.players.map((p) => {
					if (p.id === player.id) return {
						...p,
						suspectedRole: role
					};
					return p;
				})
			}
		}));
	}
	startGameAfterBagSelection() {
		state.setState((s) => ({
			...s,
			currentGame: {
				...s.currentGame,
				state: "in-progress"
			}
		}));
	}
	render() {
		const installed = window.matchMedia("(display-mode: standalone)").matches;
		const isIOS = iOS();
		const state = this.state?.currentGame?.state;
		const { hideGrim } = settings.getState();
		const lastNeighbor = this.state?.currentGame?.players?.slice(-1) ?? [];
		const firstNeighbor = this.state?.currentGame?.players?.slice(0, 1) ?? [];
		const alivePlayers = this.state.currentGame?.players?.filter((p) => p.suspectedRole?.type !== "Traveller").filter((p) => !p.dead)?.length || 0;
		const topNomination = getTopNominationForCurrentDay(this.state.currentGame);
		return b`
      <div class="out">
        <h1 header>Grim</h1>

        <!-- No game yet -->
        ${when(!this.state.currentGame, () => b`
            No current game in progress.
            <button
              ui-button
              primary
              @click=${() => dialog.open({
			id: "flow",
			parameters: { flow: {
				id: "create-game",
				amountOfPlayers: this.state?.currentGame?.players?.length ?? 5
			} }
		})}
            >
              Create game
            </button>
          `)}
        <!-- Top game info, traveller sheet/game over/days, GRIM -->
        ${when(this.state.currentGame, () => b`
            <h2 class="script-title">${this.state.currentGame.script}</h2>
            <!-- Traveller sheet -->
            ${when(state !== "setup" && TRAVELLER_SHEET[this.state.currentGame.players.filter((p) => p?.suspectedRole?.type !== "Traveller").length], () => b`
                <div ui-inlay class="traveller-sheet">
                  ${when(!this.state?.currentGame?.stMode || this.state?.currentGame?.stMode && hideGrim, () => b`
                      ${Object.keys(TRAVELLER_SHEET[this.state.currentGame.players.filter((p) => p?.suspectedRole?.type !== "Traveller").length]).map((key, i) => b`
                          <span>
                            ${key === "players" ? "townsfolk" : key}:
                            ${TRAVELLER_SHEET[this.state.currentGame.players.filter((p) => p?.suspectedRole?.type !== "Traveller").length][key]}${i === Object.keys(TRAVELLER_SHEET[this.state.currentGame.players.filter((p) => p?.suspectedRole?.type !== "Traveller").length]).length - 1 ? "" : ","}
                          </span>
                        `)}
                    `)}
                  ${when(this.state?.currentGame?.stMode && !hideGrim, () => b`
                      <span
                        >townsfolk:
                        ${this.state.currentGame?.players?.filter((p) => p?.suspectedRole?.type?.toLowerCase() === "townsfolk").length},</span
                      >
                      <span
                        >outsiders:
                        ${this.state.currentGame?.players?.filter((p) => p?.suspectedRole?.type?.toLowerCase() === "outsider").length},</span
                      >
                      <span
                        >minions:
                        ${this.state.currentGame?.players?.filter((p) => p?.suspectedRole?.type?.toLowerCase() === "minion" || p?.tokens?.some((t) => t.id.toLowerCase().includes("marionette"))).length},</span
                      >
                      <span
                        >demons:
                        ${this.state.currentGame?.players?.filter((p) => p?.suspectedRole?.type?.toLowerCase() === "demon").length}</span
                      >
                    `)}
                  <!-- <ul> -->
                  <!-- </ul> -->
                  ${when(settings.getState()?.view === "list" && state !== "bag-selection", () => b`
                      <div>
                        <div class="player-amounts">
                          ${this.state.currentGame.players.length} players,
                          ${alivePlayers} alive,
                          ${this.state.currentGame.players.length - alivePlayers}
                          dead
                        </div>
                      </div>
                    `)}
                  ${when(this.state?.currentGame?.stMode && state !== "bag-selection", () => b`
                      ${topNomination ? b`
                              <div class="top-nomination">
                                <span class="balgruf"
                                  >${capitalize(topNomination.name)}</span
                                >
                                is on the block with
                                <span class="balgruf"
                                  >${topNomination.amountOfVotes}</span
                                >
                                votes
                              </div>
                            ` : ""}
                    `)}
                </div>
              `)}
            ${when(this.state?.currentGame?.state === "in-progress", () => b`
                <botc-view-switcher
                  class="${!this.state?.currentGame?.stMode && settings.getState()?.view === "list" ? "player-mode-list-view" : ""}"
                ></botc-view-switcher>
              `)}
            <!-- Game over -->
            ${when(state === "finished", () => b` <h2 class="finished">Game over</h2> `)}
            ${when(settings.getState()?.view === "list" && this.state?.currentGame?.stMode && this.state?.currentGame?.state !== "bag-selection", () => b`
                <div class="days-and-timer">
                  <div class="days">
                    <div class="text">
                      Day:
                      ${Number(this.state.currentGame.day) + (this.state?.currentGame?.stMode ? 0 : 1)}
                    </div>
                    ${when(!this.state?.currentGame?.stMode, () => b`
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
                      `)}
                  </div>
                  ${when(this.state?.currentGame?.stMode && this.state?.currentGame?.state === "in-progress", () => b` <div>${timer$1.getState().formatted}</div> `)}
                </div>
              `)}
            ${when(this.state?.currentGame?.globalReminders?.length, () => b`
                <div class="global-reminders" ui-inlay>
                  <ul>
                    ${this.state?.currentGame?.globalReminders.map((reminder) => b`
                        ${when(reminder?.type?.toLowerCase() === "fabled" || reminder?.type?.toLowerCase() === "loric" || !hideGrim, () => b`
                            <li class="global-reminder">
                              <img
                                class="${alignment(reminder.type)}"
                                src="${images.any(reminder.icon)}"
                                alt="${reminder.label}"
                              />

                              <div class="gr-cont">
                                <div class="gr-text">
                                  <h2
                                    class="title balgruf ${alignment(reminder.type)}"
                                  >
                                    ${reminder.humanReadableRole}
                                  </h2>
                                  <div class="label">${reminder.summary}</div>
                                </div>
                                <button
                                  ui-icon-button
                                  @click=${() => {
			this.removeGlobalReminder(reminder.id);
		}}
                                >
                                  ${cross}
                                </button>
                              </div>
                            </li>
                          `)}
                      `)}
                  </ul>
                </div>
              `)}
            ${when(state === "in-progress" && settings.getState().showFinal3Warning && settings.getState()?.view === "list", () => {
			const alivePlayers = this.state?.currentGame?.players?.filter((p) => !p.dead && p?.suspectedRole?.type?.toLowerCase() !== "traveller").length;
			if (alivePlayers === 4) return b`<p class="final3">Final 4!</p>`;
			else if (alivePlayers === 3) return b`<p class="final3">Final 3!</p>`;
			return b``;
		})}
            <!-- Neighbor -->
            ${when(state === "in-progress" && settings.getState().view === "list" && settings.getState().showFirstLastNeighbors, () => b`
                <ul class="players neighbor">
                  ${lastNeighbor.map((player) => {
			const nightOrderNr = nightOrder(player, this.nightOrder);
			return b`
                      <li
                        class="non-active ${!hideGrim && player.confirmed ? "confirmed" : ""}"
                      >
                        <div class="item-wrapper neighbor">
                          <div class="drag-handle disabled">${drag}</div>
                          ${playerDetails(player, nightOrderNr, hideGrim, this.state)}
                          <div class="player-actions">
                            <button ?disabled=${true} ui-icon-button>
                              ${kebab}
                            </button>
                          </div>
                        </div>
                      </li>
                    `;
		})}
                </ul>
              `)}
            ${when(state === "bag-selection", () => {
			const allRolesTaken = this.state.currentGame?.bag?.every((r) => r.taken);
			return b`
                <div class="bag-selection">
                  <h2
                    class="select-token balgruf ${settings.getState().bagSelectionShowIcon && !allRolesTaken ? "with-icon" : ""}"
                  >
                    ${!allRolesTaken ? "Select a token" : "Hand the grim back to the Storyteller"}
                  </h2>
                  ${when(settings.getState().bagSelectionShowIcon && !allRolesTaken, () => b`
                      <p class="select-token-hide">
                        Make sure nobody else can see the screen!
                      </p>
                    `)}
                  <ul>
                    ${this.state.currentGame?.bag?.map((role, i) => b`
                        <li>
                          <button
                            ?disabled=${role.taken}
                            @click=${() => {
				dialog.open({
					id: "playerSelect",
					parameters: {
						hideGrim: true,
						text: "Who are you?",
						filterFn: (p) => !p.suspectedRole?.id
					}
				}).then(([player]) => {
					this.assignPlayerToken(player, role);
					dialog.open({
						id: "inline",
						parameters: {
							header: "You are:",
							render: () => b`
                                        ${when(settings.getState().bagSelectionShowIcon, () => b`
                                            <style>
                                              h2 {
                                                font-family: "Balgruf";
                                                font-size: 2.5rem;
                                                color: var(--ui-main-5);
                                                text-shadow: 1px 1px 2px
                                                  rgba(0, 0, 0, 1);
                                                margin: 0;
                                                text-align: center;
                                              }

                                              h2 {
                                                line-height: 0.9;
                                              }

                                              .container {
                                                height: calc(100% - 80px);
                                                display: flex;
                                                flex: 1;
                                                align-items: center;
                                                flex-direction: column;
                                              }

                                              .big-role {
                                                width: 150px;
                                                display: block;
                                                margin: 0 auto;
                                                border-radius: 50%;
                                                margin-bottom: 20px;
                                                background-color: ${bg8};
                                              }

                                              .wrapper {
                                                height: 100%;
                                                flex: 1;
                                                display: flex;
                                                flex-direction: column;
                                                justify-content: center;
                                                align-items: center;
                                              }

                                              img.red {
                                                border: solid 4px #d9403b;
                                              }
                                              img.blue {
                                                border: solid 4px #45a0f1;
                                              }

                                              h2 {
                                                color: var(--ui-main-5);
                                              }
                                              h2.red {
                                                color: #d9403b;
                                              }
                                              h2.blue {
                                                color: #45a0f1;
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

                                              p {
                                                text-align: center;
                                                font-size: 0.625rem;
                                              }
                                            </style>
                                            <div class="wrapper">
                                              <img
                                                class="big-role ${alignment(role?.type)}"
                                                src="${img(role)}"
                                                alt="${role?.humanReadableRole}"
                                              />
                                              <h2
                                                class="${alignment(role?.type)}"
                                              >
                                                ${role?.humanReadableRole}
                                              </h2>
                                            </div>
                                          `, () => b`
                                            <div
                                              style="margin-top: 50%;margin-bottom: 50%;text-align: center;font-size: 0.85rem;"
                                            >
                                              ${role.humanReadableRole}
                                            </div>
                                          `)}
                                      `
						}
					});
				});
			}}
                            class="bag-token"
                          >
                            ${role?.taken ? "" : i + 1}
                          </button>
                        </li>
                      `)}
                  </ul>
                </div>
              `;
		})}

            <!-- Players/grim -->
            ${when(state === "in-progress" || state === "finished", () => b`
                ${settings.getState()?.view === "circular" ? this.renderCircularPlayers(hideGrim) : b`
                        <ul
                          @sortable-list-order-changed=${(e) => this._onItemOrderChanged(e)}
                          sortable-list
                          class="players list"
                        >
                          ${c(this.state.currentGame.players, (player) => player.id, (player, i) => {
			const notifications = getNotifications(player);
			const nightOrderNr = nightOrder(player, this.nightOrder);
			return b`
                                <li
                                  id=${i}
                                  @transitionend=${(e) => e.target.classList.remove("animate")}
                                  sortable-dragged-item-container
                                  class="${!hideGrim && player.confirmed ? "confirmed" : ""} expandable"
                                >
                                  <div
                                    data-id=${i}
                                    class="item-wrapper ${player?.dead ? "dead-opa-list" : ""}"
                                  >
                                    <div class="item-wrapper-inner">
                                      <div
                                        sortable-dragged-item-trigger
                                        class="drag-handle ${state === "finished" || settings.getState().hideGrim && this.state?.currentGame?.stMode ? "disabled" : ""}"
                                      >
                                        ${drag}
                                      </div>
                                      ${when(!!notifications.length && this.state?.currentGame?.stMode && settings.getState().showNotifications && !hideGrim, () => b`
                                          <button
                                            ${tooltip("Click to finish game setup")}
                                            class="notification-marker-list"
                                            ${context(dialog, () => b`
                                                <botc-player-notification
                                                  .player=${player}
                                                  .notifications=${notifications}
                                                ></botc-player-notification>
                                              `)}
                                          >
                                            <svg
                                              xmlns="http://www.w3.org/2000/svg"
                                              height="24px"
                                              viewBox="0 -960 960 960"
                                              width="24px"
                                              fill="#1f1f1f"
                                            >
                                              <path
                                                d="M480-120q-33 0-56.5-23.5T400-200q0-33 23.5-56.5T480-280q33 0 56.5 23.5T560-200q0 33-23.5 56.5T480-120Zm0-240q-33 0-56.5-23.5T400-440v-320q0-33 23.5-56.5T480-840q33 0 56.5 23.5T560-760v320q0 33-23.5 56.5T480-360Z"
                                              />
                                            </svg>
                                          </button>
                                        `)}
                                      <button
                                        ?disabled=${settings.getState().hideGrim && this.state?.currentGame?.stMode}
                                        class="player-btn-expand"
                                        aria-expanded=${this.expanded.has(i)}
                                        @click=${() => this.toggleExpand(i)}
                                      >
                                        ${playerDetails(player, nightOrderNr, hideGrim, this.state, this.showRole)}
                                      </button>
                                      <div class="player-actions">
                                        <button
                                          ${context(dialog, () => b`<botc-player-actions
                                                .player=${player}
                                              ></botc-player-actions>`)}
                                          ?disabled=${state === "finished" || settings.getState().hideGrim && this.state?.currentGame?.stMode}
                                          ui-icon-button
                                        >
                                          ${kebab}
                                        </button>
                                      </div>
                                    </div>
                                    <div
                                      class="expanded"
                                      ?inert=${!this.expanded.has(i)}
                                    >
                                      ${when(!!player?.suspectedRole?.id && !(player.me && !this.showRole) && !hideGrim, () => b`
                                          <div
                                            ui-inlay
                                            class="expanded-description"
                                          >
                                            ${window?.rolesById?.[player?.suspectedRole?.id]?.summary}
                                          </div>
                                        `)}
                                      <textarea
                                        @input=${(e) => {
				this.updateNotes(player, e.target.value);
			}}
                                        ui-input
                                        rows="2"
                                      >
${player?.notes}</textarea>
                                      <a
                                        ui-button-link
                                        secondary
                                        class="player-page-link"
                                        ?disabled=${settings.getState().hideGrim}
                                        href="${o$1(settings.getState()?.hideGrim ? void 0 : `/player/${player.id}`)}"
                                        class="player-link"
                                        >View player page</a
                                      >
                                    </div>
                                  </div>
                                </li>
                              `;
		})}
                        </ul>
                      `}
              `)}
          `)}
        <!-- Neighbor -->
        ${when(state === "in-progress" && settings.getState().view === "list" && settings.getState().showFirstLastNeighbors, () => b`
            <ul class="players neighbor">
              ${firstNeighbor.map((player) => {
			const nightOrderNr = nightOrder(player, this.nightOrder);
			return b`
                  <li
                    class="non-active ${!hideGrim && player.confirmed ? "confirmed" : ""}"
                  >
                    <div class="item-wrapper neighbor">
                      <div class="drag-handle disabled">${drag}</div>

                      ${playerDetails(player, nightOrderNr, hideGrim, this.state)}
                      <div class="player-actions">
                        <button ?disabled=${true} ui-icon-button>
                          ${kebab}
                        </button>
                      </div>
                    </div>
                  </li>
                `;
		})}
            </ul>
          `)}
        <!-- Game buttons -->
        ${when(this.state.currentGame, () => b`
            <div class="game-buttons">
              ${when(this.state?.currentGame?.deadlog?.length, () => b`
                  <botc-disclosure>
                    <div slot="label">Dead log</div>
                    <div style="margin-bottom: 32px;" ui-inlay slot="detail">
                      ${o(this.deadlogByDay(), ([day, entries]) => b`
                          <div class="day-section">
                            <h2 class="balgruf day-header">
                              Day
                              ${Number(day) + (this.state?.currentGame?.stMode ? 0 : 1)}
                            </h2>
                            <div class="event-list">
                              ${o(entries, (entry) => b`
                                  <div class="event-item">
                                    <botc-player-details
                                      .hideGrim=${settings.getState().hideGrim}
                                      .player=${entry.player}
                                    >
                                      <div slot="menu">
                                        <button
                                          ${context(dialog, () => b`
                                              <botc-deadlog-entry-buttons
                                                .entry=${entry}
                                                .removeFromDeadlog=${(e) => this.removeFromDeadlog(e)}
                                              ></botc-deadlog-entry-buttons>
                                            `)}
                                          ui-icon-button
                                        >
                                          ${kebab}
                                        </button>
                                      </div>
                                    </botc-player-details>
                                  </div>
                                `)}
                            </div>
                          </div>
                        `)}
                    </div>
                  </botc-disclosure>
                `)}
              ${when(state === "bag-selection", () => b`
                  <botc-switch
                    @checked-changed=${({ checked }) => {
			settings.setState((state) => ({
				...state,
				bagSelectionShowIcon: checked
			}));
		}}
                    ?checked=${settings.getState().bagSelectionShowIcon}
                    >Show role image</botc-switch
                  >
                  <button
                    ?disabled=${this.state.currentGame.players.some((p) => !p.suspectedRole?.id)}
                    ui-button
                    primary
                    @click=${() => {
			this.startGameAfterBagSelection();
		}}
                  >
                    Start game
                  </button>
                  <button
                    @click=${() => dialog.open({
			id: "flow",
			parameters: { flow: {
				id: "create-game",
				amountOfPlayers: this.state?.currentGame?.players?.length ?? 5
			} }
		})}
                    ui-button
                    secondary
                  >
                    Rerack
                  </button>
                `)}
              ${when(state !== "bag-selection", () => b`
                  ${when(this.state.currentGame.stMode && state === "in-progress", () => b` <button
                        ?disabled=${settings.getState().hideGrim || !this.state?.currentGame?.players?.every((p) => p.suspectedRole?.id)}
                        class="game-options"
                        ui-button
                        primary
                        @click=${() => {
			router.navigate("/night-phase");
		}}
                      >
                        <div>${moon}</div>
                        <div>
                          ${this.state.currentGame.nightPhaseIndex === 0 ? "Start" : "Continue"}
                          night phase
                        </div>
                      </button>`)}
                  ${when(this.mobile, () => b`
                      <button
                        ${context(dialog, () => b`
                            <botc-game-options
                              .state=${state}
                              .players=${this.state?.currentGame?.players}
                            ></botc-game-options>
                          `)}
                        class="game-options"
                        ui-button
                        secondary
                      >
                        <div>${settings$1}</div>
                        <div>Game menu</div>
                      </button>
                    `, () => b`
                      <button
                        @click=${() => {
			dialog.open({
				id: "inline",
				parameters: {
					header: "Game Menu",
					render: () => b`
                                <botc-game-options
                                  .state=${state}
                                  .players=${this.state?.currentGame?.players}
                                ></botc-game-options>
                              `
				}
			});
		}}
                        class="game-options"
                        ui-button
                        secondary
                      >
                        <div>${settings$1}</div>
                        <div>Game menu</div>
                      </button>
                    `)}
                `)}
              ${when(!this.state?.currentGame?.stMode && state === "in-progress" && settings.getState()?.view === "list", () => b`
                  ${when(this.mobile, () => b`
                      <button
                        ${context(dialog, () => b`
                            <botc-grim-player-quick-actions
                              .game=${this.state.currentGame}
                            ></botc-grim-player-quick-actions>
                          `)}
                        class="game-options"
                        ui-button
                        primary
                      >
                        <div>${cards}</div>
                        <div>Choose</div>
                      </button>
                    `, () => b`
                      <button
                        @click=${() => {
			dialog.open({
				id: "inline",
				parameters: {
					header: "Quick actions",
					render: () => b`
                                <botc-grim-player-quick-actions
                                  .game=${this.state.currentGame}
                                ></botc-grim-player-quick-actions>
                              `
				}
			});
		}}
                        class="game-options"
                        ui-button
                        primary
                      >
                        <div>${cards}</div>
                        <div>Choose</div>
                      </button>
                    `)}
                `)}
              ${when(this.state.currentGame.stMode && state === "in-progress", () => b`
                  ${when(settings.getState()?.view === "list", () => b`
                      <button
                        class="game-options"
                        ui-button
                        secondary
                        @click=${() => {
			dialog.open({ id: "timer" });
		}}
                      >
                        <div>${timer}</div>
                        <div>Timer</div>
                      </button>
                    `)}
                `)}
            </div>
          `)}
        <!-- Install -->
        ${when(!installed && !isIOS && !!window?.deferredPrompt && this.state?.currentGame?.state !== "bag-selection", () => b`
            <button
              ui-button
              primary
              @click=${() => {
			window.deferredPrompt.prompt();
		}}
            >
              Install
            </button>
          `)}
        ${when(!installed && isIOS, () => b`
            <button
              ui-button
              primary
              @click=${() => {
			dialog.open({ id: "install" });
		}}
            >
              Install
            </button>
          `)}

        <img
          class="ccc-logo"
          src="${images.any("ccc")}"
          alt="Community Created Content"
        />
        <p class="discord">
          <a href="https://discord.gg/aKNjG98w9S">Discord</a>
        </p>
      </div>
    `;
	}
	/** @param {string} id */
	removeGlobalReminder(id) {
		state.setState((s) => ({
			...s,
			currentGame: {
				...s.currentGame,
				globalReminders: s.currentGame.globalReminders.filter((r) => r.id !== id)
			}
		}));
	}
	deadlogByDay() {
		if (!state.getState()?.currentGame?.deadlog?.length) return /* @__PURE__ */ new Map();
		const grouped = /* @__PURE__ */ new Map();
		state.getState()?.currentGame?.deadlog.forEach((entry) => {
			if (!grouped.has(entry.day)) grouped.set(entry.day, []);
			grouped.get(entry.day).push(entry);
		});
		return new Map([...grouped.entries()].sort((a, b) => a[0] - b[0]));
	}
	async _onItemOrderChanged(e) {
		const { currentIndex, nextIndex } = e.detail;
		const list = this.shadowRoot.querySelector("ul[sortable-list]");
		const items = Array.from(list.children);
		const firstRects = /* @__PURE__ */ new Map();
		for (const li of items) {
			const wrapper = li.querySelector(".item-wrapper");
			if (!wrapper) continue;
			const id = wrapper.dataset.id;
			firstRects.set(id, wrapper.getBoundingClientRect());
		}
		const players = [...this.state?.currentGame?.players];
		[players[currentIndex], players[nextIndex]] = [players[nextIndex], players[currentIndex]];
		state.setState((s) => ({
			...s,
			currentGame: {
				...s.currentGame,
				players
			}
		}));
		await this.updateComplete;
		const newItems = Array.from(this.shadowRoot.querySelector("ul[sortable-list]").children);
		for (const li of newItems) {
			const wrapper = li.querySelector(".item-wrapper");
			if (!wrapper) continue;
			const id = wrapper.dataset.id;
			if (li.hasAttribute("dragged")) continue;
			const oldRect = firstRects.get(id);
			const newRect = wrapper.getBoundingClientRect();
			const dy = oldRect.top - newRect.top;
			if (dy) {
				wrapper.style.transition = "none";
				wrapper.style.transform = `translateY(${dy}px)`;
				wrapper.offsetHeight;
				wrapper.style.transition = "transform 200ms ease";
				wrapper.style.transform = "";
			}
		}
	}
	async toggleExpand(i) {
		if (this.expandedIsAnimating) return;
		const isNowExpanded = !this.expanded.has(i);
		this.expandedIsAnimating = true;
		if (isNowExpanded) this.expanded.add(i);
		else this.expanded.delete(i);
		await this.updateComplete;
		const section = this.renderRoot.querySelectorAll("li.expandable")[i].querySelector(".expanded");
		if (!section) {
			this.expandedIsAnimating = false;
			return;
		}
		section.style.transition = "none";
		section.style.height = isNowExpanded ? "0px" : `${section.scrollHeight}px`;
		section.offsetHeight;
		section.style.transition = "height 300ms ease";
		const cleanup = () => {
			section.style.overflow = "";
			section.style.height = isNowExpanded ? "auto" : "auto";
			if (!isNowExpanded) section.hidden = true;
			this.expandedIsAnimating = false;
		};
		section.removeEventListener("transitionend", section._expandDone);
		section._expandDone = () => {
			cleanup();
			section.removeEventListener("transitionend", section._expandDone);
			section._expandDone = null;
		};
		section.addEventListener("transitionend", section._expandDone);
		if (isNowExpanded) {
			section.hidden = false;
			section.style.height = `${section.scrollHeight}px`;
		} else {
			section.style.height = `${section.scrollHeight}px`;
			requestAnimationFrame(() => {
				section.style.height = "0px";
			});
		}
		setTimeout(() => {
			if (this.expandedIsAnimating) {
				section.removeEventListener("transitionend", section._expandDone);
				cleanup();
			}
		}, 350);
	}
	updateNotes(player, notes) {
		state.setState((s) => ({
			...s,
			currentGame: {
				...s.currentGame,
				players: s.currentGame.players.map((p) => p.id === player.id ? {
					...p,
					notes: notes?.trim?.()
				} : p)
			}
		}));
	}
};
var BotcDeadlogEntryButtons = class extends i {
	static properties = {
		entry: { type: Object },
		removeFromDeadlog: { type: Function }
	};
	static styles = [button, i$1`
      button[ui-button] {
        display: flex;
        justify-content: center;
        align-items: center;
      }

      button[ui-button] svg {
        fill: var(--ui-main-5);
      }

      button[ui-button] span {
        flex: 1;
        margin-left: -24px;
      }
    `];
	render() {
		return b`
      <button
        ui-button
        secondary
        @click=${() => {
			this.removeFromDeadlog(this.entry);
			dialog.close();
		}}
      >
        ${remove} <span>Remove</span>
      </button>
    `;
	}
};
var BotcPlayerActions = class extends i {
	static properties = {
		player: {},
		kind: { type: String },
		showRole: { type: Boolean }
	};
	constructor() {
		super();
		this.kind = "regular";
		this.showRole = settings.getState().showRole;
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

      button[ui-button] span:nth-of-type(1) {
        display: flex;
        justify-content: center;
        align-items: center;
      }

      svg {
        fill: ${main5};
      }

      button[ui-button][primary] svg {
        fill: ${bg8};
      }
    `];
	toggle(kind, checked) {
		this.player[kind] = checked;
		state.setState((s) => ({
			...s,
			currentGame: {
				...s.currentGame,
				players: s.currentGame.players.map((p) => p.id === this.player.id ? this.player : p)
			}
		}));
	}
	setDeadVote(checked) {
		this.player.dead.hasDeadVote = checked;
		state.setState((s) => ({
			...s,
			currentGame: {
				...s.currentGame,
				players: s.currentGame.players.map((p) => p.id === this.player.id ? this.player : p)
			}
		}));
	}
	async openDialog(id, parameters) {
		dialog.close();
		await dialog.closed;
		await new Promise((r) => requestAnimationFrame(r));
		dialog.open({
			id,
			parameters: {
				player: this.player,
				...parameters
			}
		});
	}
	render() {
		const { stMode } = state.getState()?.currentGame;
		const { hideGrim } = settings.getState();
		return b`
      <button
        ?disabled=${stMode && hideGrim}
        @click=${() => {
			this.openDialog("setRole");
		}}
        ui-button
        primary
      >
        <span>${setRole}</span>
        <span>Set role</span>
      </button>
      ${when(!stMode && this.kind !== "circular", () => b`
          <button
            @click=${() => {
			this.openDialog("addClaims");
		}}
            ui-button
            primary
          >
            <span>${addClaims}</span>
            <span>Add claims</span>
          </button>
        `)}
      <button
        @click=${() => {
			this.openDialog("killedBy");
		}}
        ui-button
        primary
      >
        <span>${killedBy}</span>
        <span>Killed by</span>
      </button>
      <button
        ?disabled=${stMode && hideGrim}
        @click=${() => {
			this.openDialog("addToken");
		}}
        ui-button
        primary
      >
        <span>${addToken}</span>
        <span>Reminders</span>
      </button>
      ${when(this.kind == "circular" && !stMode, () => b`
          <button
            @click=${() => {
			this.openDialog("notes");
		}}
            ui-button
            primary
          >
            <span>${notes}</span>
            <span>Notes</span>
          </button>
        `)}
      ${when(this.kind == "circular" && stMode, () => b`
          <button
            ?disabled=${this.player?.tokens?.some((t) => t.id === "golem-May Not Nominate")}
            @click=${async () => {
			this.openDialog("flow", { flow: {
				id: "nomination",
				initialStep: "nominee",
				nominator: this.player
			} });
		}}
            ui-button
            primary
          >
            <span>${nomination}</span>
            <span>Nomination</span>
          </button>
        `)}
      <button
        @click=${() => {
			this.openDialog("editName");
		}}
        ui-button
        secondary
      >
        <span>${edit}</span>
        <span>Edit player</span>
      </button>
      ${when(!this.player.me, () => b`
          <button
            @click=${() => {
			this.openDialog("inline", {
				render: () => b`Are you sure?`,
				header: "Remove player",
				button: b`<button
                  ui-button
                  primary
                  @click=${() => {
					state.setState((s) => ({
						...s,
						currentGame: {
							...s.currentGame,
							players: s.currentGame.players.filter((p) => p.id !== this.player.id)
						}
					}));
					setTimeout(() => {
						dialog.close();
					});
				}}
                >
                  Yes
                </button>`
			});
		}}
            ui-button
            secondary
          >
            <span>${remove}</span>
            <span>Remove player</span>
          </button>
        `)}
      ${when(this.player.me && settings.getState().view === "list", () => b`
          <botc-switch
            ?checked=${this.showRole}
            @checked-changed=${({ checked }) => {
			settings.setState((old) => ({
				...old,
				showRole: checked
			}));
		}}
            >Show role</botc-switch
          >
        `)}
      ${when(!!this.player.dead, () => b`
          <botc-switch
            @checked-changed=${({ checked }) => {
			this.setDeadVote(checked);
		}}
            ?checked=${this.player.dead.hasDeadVote}
            >Has deadvote</botc-switch
          >
        `)}
      ${when(!stMode, () => b`
          <botc-switch
            @checked-changed=${({ checked }) => {
			this.toggle("confirmed", checked);
		}}
            ?checked=${this.player.confirmed}
            >Confirm</botc-switch
          >
        `)}
    `;
	}
};
var BotcDisplayOptns = class extends i {
	media = new MediaQueryController(this, ["(min-width: 640px)"], ({ media, matches }) => {
		switch (media) {
			case "(min-width: 640px)":
				this.isAbove640 = matches;
				break;
		}
	});
	static properties = {
		isAbove640: { type: Boolean },
		rotationValue: { type: Number }
	};
	constructor() {
		super();
		this.isAbove640 = false;
		this.rotationValue = 0;
	}
	connectedCallback() {
		super.connectedCallback();
		this._onStateChanged = () => this.requestUpdate();
		state.addEventListener("state-changed", this._onStateChanged);
	}
	disconnectedCallback() {
		super.disconnectedCallback();
		state.removeEventListener("state-changed", this._onStateChanged);
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

      button[ui-button] span:nth-of-type(1) {
        display: flex;
        justify-content: center;
        align-items: center;
      }

      svg {
        fill: ${main5};
      }

      button[ui-button][primary] svg {
        fill: ${bg8};
      }

      .rotation-range {
        display: flex;
        flex-direction: column;
        gap: 4px;
        padding: 8px;
        padding-top: 16px;
        border-top: solid 1px var(--ui-bg-4);
      }

      .rotation-range label {
        color: white;
        font-size: 0.9rem;
        font-weight: 700;
      }

      .rotation-range input[type="range"] {
        margin-top: 16px;
        margin-bottom: 16px;
        width: 100%;
        accent-color: ${main5};
      }
    `];
	async openDialog(id, parameters) {
		dialog.close();
		await dialog.closed;
		await new Promise((r) => requestAnimationFrame(r));
		dialog.open({
			id,
			parameters: {
				player: this.player,
				...parameters
			}
		});
	}
	get playerCount() {
		return state.getState()?.currentGame?.players?.length ?? 0;
	}
	handleRotationChange(e) {
		const newValue = parseInt(e.target.value, 10);
		const delta = newValue - this.rotationValue;
		this.rotationValue = newValue;
		if (delta === 0) return;
		state.setState((s) => {
			const players = s.currentGame?.players;
			if (!players || players.length === 0) return s;
			const reset = players.map(({ circlePosition, ...rest }) => rest);
			const len = reset.length;
			const normalized = (delta % len + len) % len;
			const rotated = [...reset.slice(len - normalized), ...reset.slice(0, len - normalized)];
			return {
				...s,
				currentGame: {
					...s.currentGame,
					players: rotated
				}
			};
		});
	}
	async toggleHideGrim({ checked }) {
		if (authBusy) return;
		authBusy = true;
		if (!checked && settings.getState().useAuthForHideGrim) {
			let result = true;
			try {
				const credentialId = settings.getState().webAuthnId;
				const publicKey = {
					challenge: /* @__PURE__ */ new Uint8Array(32),
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
				hideGrim: result
			}));
			this.shadowRoot.querySelector("#hideGrim").checked = result;
			await new Promise((r) => setTimeout(r, 1e3));
		} else settings.setState((s) => ({
			...s,
			hideGrim: checked
		}));
		authBusy = false;
	}
	render() {
		const { stMode } = state.getState()?.currentGame;
		return b`
      <botc-switch
        id="hideGrim"
        ?checked=${settings.getState().hideGrim}
        @checked-changed=${this.toggleHideGrim}
        >Hide grim</botc-switch
      >
      <botc-switch
        id="hideGrim"
        ?checked=${settings.getState().useOfficialIcons}
        @checked-changed=${({ checked }) => settings.setState((s) => ({
			...s,
			useOfficialIcons: checked
		}))}
        >Use official icons</botc-switch
      >

      ${when(settings.getState()?.view === "circular" && !stMode, () => b`
          <botc-switch
            id="hideGrim"
            ?checked=${settings.getState().showRole}
            @checked-changed=${({ checked }) => settings.setState((old) => ({
			...old,
			showRole: checked
		}))}
            >Show own role</botc-switch
          >
        `)}
      ${when(stMode, () => b`
          <botc-switch
            ?checked=${settings.getState().showNotifications}
            @checked-changed=${({ checked }) => settings.setState((s) => ({
			...s,
			showNotifications: checked
		}))}
            >Display notifications</botc-switch
          >
        `)}

      <div class="rotation-range">
        <label>Rotate players: ${this.rotationValue}</label>
        <input
          type="range"
          min="-${this.playerCount}"
          max="${this.playerCount}"
          step="1"
          .value=${String(this.rotationValue)}
          @input=${this.handleRotationChange}
        />
      </div>

      <button
        ui-button
        secondary
        @click=${() => {
			state.setState((s) => ({
				...s,
				currentGame: {
					...s.currentGame,
					players: [...s.currentGame.players].reverse()
				}
			}));
			dialog.close();
		}}
      >
        Reverse player order
      </button>
      <button
        ui-button
        secondary
        @click=${() => {
			state.setState((s) => ({
				...s,
				currentGame: {
					...s.currentGame,
					players: s.currentGame.players.map((p) => {
						const { circlePosition, ...rest } = p;
						return rest;
					})
				}
			}));
			dialog.close();
		}}
      >
        Reset positions
      </button>
    `;
	}
};
let authBusy = false;
var BotcGameOptions = class extends i {
	static styles = [button, i$1``];
	static properties = {
		state: { type: String },
		players: { type: Array }
	};
	constructor() {
		super();
		this.state = "";
		/** @type {Player[]} */
		this.players = [];
		this.toggleHideGrim = this.toggleHideGrim.bind(this);
	}
	connectedCallback() {
		super.connectedCallback();
		settings.addEventListener("state-changed", () => {
			this.requestUpdate();
		});
	}
	async openDialog(id, parameters) {
		dialog.close();
		await dialog.closed;
		await new Promise((r) => requestAnimationFrame(r));
		return dialog.open({
			id,
			parameters
		});
	}
	async toggleHideGrim({ checked }) {
		if (authBusy) return;
		authBusy = true;
		if (!checked && settings.getState().useAuthForHideGrim) {
			let result = true;
			try {
				const credentialId = settings.getState().webAuthnId;
				const publicKey = {
					challenge: /* @__PURE__ */ new Uint8Array(32),
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
				hideGrim: result
			}));
			this.shadowRoot.querySelector("#hideGrim").checked = result;
			await new Promise((r) => setTimeout(r, 1e3));
		} else settings.setState((s) => ({
			...s,
			hideGrim: checked
		}));
		authBusy = false;
	}
	render() {
		return b`
      ${when(this.state !== "finished" && this.state !== "setup" && settings.getState()?.view === "list", () => b`
          <botc-switch
            id="hideGrim"
            @checked-changed=${this.toggleHideGrim}
            ?checked=${settings.getState().hideGrim}
            >Hide grim</botc-switch
          >
        `)}
      ${when(this.state === "in-progress" || this.state === "setup", () => b`
          <button
            ui-button
            primary
            @click=${() => {
			this.openDialog("flow", { flow: { id: "end-game" } }).then(() => {
				if (state.getState().currentGame?.state === "finished") this.openDialog("flow", { flow: {
					id: "create-game",
					amountOfPlayers: this.players.length
				} });
			});
		}}
          >
            New game
          </button>

          <button
            ui-button
            primary
            @click=${() => {
			this.openDialog("roleSelect", {
				roles: [...Object.values(rolesById).filter((role) => role?.type?.toLowerCase() === "loric" || role?.type?.toLowerCase() === "fabled")],
				sortFn: (a, b) => {
					const aType = a?.type?.toLowerCase();
					const bType = b?.type?.toLowerCase();
					if (aType === "loric" && bType === "fabled") return -1;
					if (aType === "fabled" && bType === "loric") return 1;
					return 0;
				},
				multiple: true,
				selected: [...state.getState().currentGame?.globalReminders]
			}).then((roles) => {
				const oldGlobalReminders = state.getState().currentGame?.globalReminders || [];
				const addedRoles = roles.filter((role) => !oldGlobalReminders.some((oldRole) => oldRole.id === role.id));
				const removedRoles = oldGlobalReminders.filter((oldRole) => !roles.some((role) => role.id === oldRole.id));
				state.setState((s) => {
					let newTokens = [...s.currentGame?.tokens || []];
					const tokenIdsToRemove = /* @__PURE__ */ new Set();
					removedRoles.forEach((role) => {
						if (role.reminders && role.reminders.length > 0) role.reminders.forEach((reminder) => {
							tokenIdsToRemove.add(`${role.id}-${reminder}`);
						});
					});
					removedRoles.forEach((role) => {
						if (role.reminders && role.reminders.length > 0) newTokens = newTokens.filter((token) => !role.reminders.some((reminder) => token.id === `${role.id}-${reminder}`));
					});
					addedRoles.forEach((role) => {
						if (role.reminders && role.reminders.length > 0) role.reminders.forEach((reminder) => {
							newTokens.push({
								id: `${role.id}-${reminder}`,
								role: role.id,
								label: reminder,
								icon: role.icon,
								type: role.type,
								humanReadableRole: role.humanReadableRole
							});
						});
					});
					const updatedPlayers = s.currentGame.players.map((player) => {
						if (player.tokens && player.tokens.length > 0) {
							const filteredTokens = player.tokens.filter((token) => !tokenIdsToRemove.has(token.id));
							return {
								...player,
								tokens: filteredTokens
							};
						}
						return player;
					});
					return {
						...s,
						currentGame: {
							...s.currentGame,
							globalReminders: roles,
							tokens: newTokens,
							players: updatedPlayers
						}
					};
				});
			});
		}}
          >
            Add Fabled or Loric
          </button>

          <button
            ui-button
            secondary
            @click=${() => this.openDialog("addPlayer")}
          >
            Add player
          </button>
          ${when(this.state === "in-progress", () => b`
              <button
                ui-button
                secondary
                @click=${() => this.openDialog("shareGameQr", { includeData: !state.getState().currentGame.stMode })}
              >
                Share game state
              </button>
            `)}
          <button ui-button secondary @click=${() => this.openDialog("reset")}>
            Reset
          </button>
        `)}
      ${when(this.state === "finished", () => b`
          <button
            ui-button
            primary
            @click=${() => this.openDialog("flow", { flow: {
			id: "create-game",
			amountOfPlayers: this.players.length
		} })}
          >
            New game
          </button>
          <button
            ui-button
            secondary
            @click=${() => this.openDialog("importGameQr")}
          >
            Import game state
          </button>
          <button ui-button secondary @click=${() => this.openDialog("reset")}>
            Reset
          </button>
        `)}
    `;
	}
};
function inlineDialog(fn) {
	dialog.open({
		id: "inline",
		parameters: { render: fn }
	});
}
var BotcGrimPlayerQuickActions = class extends i {
	static styles = [button, i$1``];
	static properties = { game: { type: String } };
	constructor() {
		super();
		this.game = {};
	}
	connectedCallback() {
		super.connectedCallback();
	}
	async awaitDialogClosed() {
		dialog.close();
		await dialog.closed;
		await new Promise((r) => requestAnimationFrame(r));
	}
	async openDialog(id, parameters) {
		dialog.close();
		await dialog.closed;
		await new Promise((r) => requestAnimationFrame(r));
		dialog.open({
			id,
			parameters
		});
	}
	render() {
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
		return b`
      <button
        ui-button
        primary
        @click=${async () => {
			await this.awaitDialogClosed();
			dialog.open({
				id: "playerSelect",
				parameters: { multiple: true }
			}).then((players) => {
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
                      ${players.map((player, i) => b`
                          ${capitalize(player.name ?? "")}${i !== players.length - 1 ? "," : ""}
                        `)}
                    </h2>
                  </div>
                `);
			});
		}}
      >
        Choose player
      </button>
      <button
        ui-button
        primary
        @click=${async () => {
			await this.awaitDialogClosed();
			dialog.open({
				id: "roleSelect",
				parameters: {
					appendRoles: APPENDED_ROLES,
					multiple: true,
					allScriptRoles: true,
					filterFn: (r) => r?.type?.toLowerCase() !== "traveller"
				}
			}).then((roles) => {
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
                      ${roles.map((role, i) => b`
                          ${capitalize(role?.humanReadableRole ?? "")}${i !== roles.length - 1 ? "," : ""}
                        `)}
                    </h2>
                  </div>
                `);
			});
		}}
      >
        Choose role
      </button>
      <button
        ui-button
        primary
        @click=${async () => {
			await this.awaitDialogClosed();
			dialog.open({
				id: "playerSelect",
				parameters: {}
			}).then(([player]) => {
				dialog.open({
					id: "roleSelect",
					parameters: {
						appendRoles: APPENDED_ROLES,
						multiple: true,
						allScriptRoles: true,
						filterFn: (r) => r?.type?.toLowerCase() !== "traveller"
					}
				}).then((roles) => {
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
                          flex-direction: column;
                        }

                        h2:first-of-type {
                          margin-bottom: 48px;
                        }
                      </style>
                      <div class="card">
                        <h2>${capitalize(player.name)}</h2>
                        <h2>
                          ${roles.map((r) => r.humanReadableRole).join(", ")}
                        </h2>
                      </div>
                    `);
				});
			});
		}}
      >
        Choose player and role
      </button>
      <button
        ui-button
        primary
        @click=${async () => {
			await this.awaitDialogClosed();
			dialog.open({ id: "customText" }).then((text) => {
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
		}}
      >
        Text
      </button>
    `;
	}
};
customElements.define("botc-grim-player-quick-actions", BotcGrimPlayerQuickActions);
customElements.define("botc-deadlog-entry-buttons", BotcDeadlogEntryButtons);
customElements.define("botc-player-actions", BotcPlayerActions);
customElements.define("botc-game-options", BotcGameOptions);
customElements.define("botc-display-optns", BotcDisplayOptns);
customElements.define("botc-grim", BotcGrim);
//#endregion
//#region node_modules/@thepassle/app-tools/router/plugins/checkServiceWorkerUpdate.js
/**
* @type {import('../index.js').Plugin}
*/
const checkServiceWorkerUpdate = {
	name: "checkServiceWorkerUpdate",
	beforeNavigation: () => {
		if ("serviceWorker" in navigator) navigator.serviceWorker.getRegistration().then((registration) => {
			if (registration) registration.update();
		});
	}
};
//#endregion
//#region src/router.js
const admin = {
	name: "admin",
	shouldNavigate: () => ({
		condition: () => settings.getState()?.user?.isAdmin,
		redirect: "/"
	})
};
const router = new Router({
	/** Plugins to be run for every route */
	plugins: [
		scrollToTop,
		checkServiceWorkerUpdate,
		{
			name: "stop-recording-on-navigate",
			beforeNavigation: () => {
				if (settings.getState().experimentalSpeechRecognition.recording) settings.setState((old) => ({
					...old,
					experimentalSpeechRecognition: {
						...old.experimentalSpeechRecognition,
						recording: false
					}
				}));
			}
		}
	],
	/** Fallback route when the user navigates to a route that doesnt exist */
	fallback: "/404",
	routes: [
		{
			path: "/",
			id: "grim",
			title: "Grim",
			render: () => b`<botc-grim></botc-grim>`
		},
		{
			path: "/__data",
			title: "Data",
			plugins: [lazy(() => import("./Cvtesb9X.js")), admin],
			render: () => b`<botc-data></botc-data>`
		},
		{
			path: "/global-stats",
			title: "Global stats",
			plugins: [lazy(() => import("./rC_baj1B.js"))],
			render: () => b`<botc-global-stats></botc-global-stats>`
		},
		{
			path: "/__users",
			title: "Users",
			plugins: [lazy(() => import("./CWNkaVn8.js")), admin],
			render: () => b`<botc-users></botc-users>`
		},
		{
			path: "/night-phase",
			title: "Night Phase",
			plugins: [lazy(() => import("./BeYi9cjv.js"))],
			render: () => b`<botc-night-phase></botc-night-phase>`
		},
		{
			path: "/admin",
			title: "Admin",
			plugins: [lazy(() => import("./BoDEODSd.js")), admin],
			render: () => b`<botc-admin></botc-admin>`
		},
		{
			path: "/nightorder",
			title: "Night order",
			plugins: [lazy(() => import("./BLV6edZE.js"))],
			render: () => b`<botc-night-order .state=${state.getState()}></botc-night-order>`
		},
		{
			path: "/almanac/:id",
			title: "Almanac",
			id: "almanac",
			plugins: [lazy(() => import("./Dd1ODMox.js"))],
			render: ({ params }) => {
				return b`<botc-almanac .id=${params.id}></botc-almanac>`;
			}
		},
		{
			path: "/screenshot/:id",
			title: "Screenshot",
			id: "screenshot",
			plugins: [lazy(() => import("./c5Nd4t14.js"))],
			render: ({ params }) => {
				return b`<botc-screenshot .id=${params.id}></botc-screenshot>`;
			}
		},
		{
			path: "/almanac",
			title: "Almanac",
			id: "almanac",
			plugins: [lazy(() => import("./Dd1ODMox.js"))],
			render: ({ params, query }) => {
				return b`<botc-almanac .name=${query.name}></botc-almanac>`;
			}
		},
		{
			path: "/info",
			title: "Info",
			plugins: [lazy(() => import("./HPNcI-Pz.js"))],
			render: () => b`<botc-info></botc-info>`
		},
		{
			path: "/cards",
			title: "Cards",
			plugins: [lazy(() => import("./CT9pgi9G.js"))],
			render: () => b`<botc-cards></botc-cards>`
		},
		{
			path: "/actions",
			title: "Actions",
			plugins: [lazy(() => import("./DDosOSkY.js"))],
			render: () => b`<botc-actions></botc-actions>`
		},
		{
			path: "/menu",
			title: "Menu",
			plugins: [lazy(() => import("./Qb-eAuM0.js"))],
			render: () => b`<botc-menu></botc-menu>`
		},
		{
			path: "/roles",
			title: "Roles",
			plugins: [lazy(() => import("./BEeP6gDt.js"))],
			render: () => b`<botc-roles></botc-roles>`
		},
		{
			path: "/settings",
			title: "Settings",
			plugins: [lazy(() => import("./DYfYE3ZI.js"))],
			render: () => b`<botc-settings></botc-settings>`
		},
		{
			path: "/player/:id",
			title: ({ params }) => capitalize(state.getState().currentGame.players.find((player) => player.id === params.id).name),
			plugins: [lazy(() => import("./NCyYrrRZ.js"))],
			render: ({ params }) => {
				return b`<botc-player .player=${state.getState().currentGame.players.find((player) => player.id === params.id)}></botc-player>`;
			}
		},
		{
			path: "/create-script",
			title: "Create Script",
			plugins: [lazy(() => import("./Csw8S5x2.js"))],
			render: ({ params }) => {
				return b`<botc-create-script></botc-create-script>`;
			}
		},
		{
			path: "/demon-bluffs",
			title: "Create Script",
			plugins: [lazy(() => import("./Dj6n7PU9.js"))],
			render: ({ params }) => {
				return b`<botc-demon-bluffs></botc-demon-bluffs>`;
			}
		},
		{
			path: "/stats",
			title: "Stats",
			plugins: [lazy(() => import("./B2FjtQUY.js"))],
			render: ({ params }) => {
				return b`<botc-stats></botc-stats>`;
			}
		},
		{
			path: "/achievements",
			title: "Achievements",
			plugins: [lazy(() => import("./ZvYeW1ud.js"))],
			render: () => {
				return b`<botc-achievements></botc-achievements>`;
			}
		},
		{
			path: "/scripts",
			title: "Scripts",
			plugins: [lazy(() => import("./jHi7jkFx.js"))],
			render: ({ params }) => {
				return b`<botc-scripts></botc-scripts>`;
			}
		},
		{
			path: "/homebrew-roles",
			title: "Homebrew roles",
			plugins: [lazy(() => import("./tNdE_vY9.js"))],
			render: ({ params }) => {
				return b`<botc-custom-roles></botc-custom-roles>`;
			}
		}
	]
});
//#endregion
export { router as t };
