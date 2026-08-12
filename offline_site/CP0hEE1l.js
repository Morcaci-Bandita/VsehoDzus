import { P as b, j as A, t as when } from "./CY602n9t.js";
import { a as flip, n as autoUpdate, o as offset, r as computePosition, s as shift, t as arrow } from "./CRHdpoM6.js";
import "./D8HaG3T3.js";
import { s as createLogger, t as media } from "./vIOCOudq.js";
//#region node_modules/idb-keyval/dist/index.js
function promisifyRequest(request) {
	return new Promise((resolve, reject) => {
		request.oncomplete = request.onsuccess = () => resolve(request.result);
		request.onabort = request.onerror = () => reject(request.error);
	});
}
function createStore(dbName, storeName) {
	let dbp;
	const getDB = () => {
		if (dbp) return dbp;
		const request = indexedDB.open(dbName);
		request.onupgradeneeded = () => request.result.createObjectStore(storeName);
		dbp = promisifyRequest(request);
		dbp.then((db) => {
			db.onclose = () => dbp = void 0;
		}, () => {});
		return dbp;
	};
	return (txMode, callback) => getDB().then((db) => callback(db.transaction(storeName, txMode).objectStore(storeName)));
}
let defaultGetStoreFunc;
function defaultGetStore() {
	if (!defaultGetStoreFunc) defaultGetStoreFunc = createStore("keyval-store", "keyval");
	return defaultGetStoreFunc;
}
/**
* Get a value by its key.
*
* @param key
* @param customStore Method to get a custom store. Use with caution (see the docs).
*/
function get(key, customStore = defaultGetStore()) {
	return customStore("readonly", (store) => promisifyRequest(store.get(key)));
}
/**
* Set a value with a key.
*
* @param key
* @param value
* @param customStore Method to get a custom store. Use with caution (see the docs).
*/
function set(key, value, customStore = defaultGetStore()) {
	return customStore("readwrite", (store) => {
		store.put(value, key);
		return promisifyRequest(store.transaction);
	});
}
/**
* Delete a particular key from the store.
*
* @param key
* @param customStore Method to get a custom store. Use with caution (see the docs).
*/
function del(key, customStore = defaultGetStore()) {
	return customStore("readwrite", (store) => {
		store.delete(key);
		return promisifyRequest(store.transaction);
	});
}
//#endregion
//#region data/night-order.js
var night_order_default = {
	firstNight: [
		"DUSK",
		"lordoftyphon",
		"kazali",
		"apprentice",
		"barista",
		"bureaucrat",
		"thief",
		"boffin",
		"philosopher",
		"alchemist",
		"poppygrower",
		"yaggababble",
		"magician",
		"MINION",
		"snitch",
		"lunatic",
		"summoner",
		"DEMON",
		"king",
		"sailor",
		"marionette",
		"engineer",
		"preacher",
		"lilmonsta",
		"lleech",
		"xaan",
		"poisoner",
		"widow",
		"courtier",
		"wizard",
		"snakecharmer",
		"godfather",
		"organgrinder",
		"devilsadvocate",
		"eviltwin",
		"witch",
		"cerenovus",
		"fearmonger",
		"harpy",
		"mezepheles",
		"pukka",
		"pixie",
		"huntsman",
		"damsel",
		"amnesiac",
		"washerwoman",
		"librarian",
		"investigator",
		"chef",
		"empath",
		"fortuneteller",
		"butler",
		"grandmother",
		"clockmaker",
		"dreamer",
		"seamstress",
		"steward",
		"knight",
		"noble",
		"balloonist",
		"shugenja",
		"villageidiot",
		"bountyhunter",
		"nightwatchman",
		"cultleader",
		"spy",
		"ogre",
		"highpriestess",
		"general",
		"chambermaid",
		"mathematician",
		"DAWN",
		"leviathan",
		"vizier"
	],
	otherNight: [
		"DUSK",
		"barista",
		"bureaucrat",
		"thief",
		"harlot",
		"bonecollector",
		"philosopher",
		"poppygrower",
		"sailor",
		"engineer",
		"preacher",
		"xaan",
		"poisoner",
		"courtier",
		"innkeeper",
		"wizard",
		"gambler",
		"acrobat",
		"snakecharmer",
		"monk",
		"organgrinder",
		"devilsadvocate",
		"witch",
		"cerenovus",
		"pithag",
		"fearmonger",
		"harpy",
		"mezepheles",
		"scarletwoman",
		"summoner",
		"lunatic",
		"exorcist",
		"lycanthrope",
		"legion",
		"imp",
		"zombuul",
		"pukka",
		"shabaloth",
		"po",
		"fanggu",
		"nodashii",
		"vortox",
		"lordoftyphon",
		"vigormortis",
		"ojo",
		"alhadikhia",
		"lleech",
		"lilmonsta",
		"yaggababble",
		"kazali",
		"assassin",
		"godfather",
		"gossip",
		"hatter",
		"barber",
		"sweetheart",
		"sage",
		"banshee",
		"professor",
		"choirboy",
		"huntsman",
		"damsel",
		"amnesiac",
		"farmer",
		"tinker",
		"moonchild",
		"grandmother",
		"ravenkeeper",
		"empath",
		"fortuneteller",
		"undertaker",
		"dreamer",
		"flowergirl",
		"towncrier",
		"oracle",
		"seamstress",
		"juggler",
		"balloonist",
		"villageidiot",
		"king",
		"bountyhunter",
		"nightwatchman",
		"cultleader",
		"butler",
		"spy",
		"highpriestess",
		"general",
		"chambermaid",
		"mathematician",
		"DAWN",
		"leviathan"
	]
};
//#endregion
//#region node_modules/lit-html/directive.js
/**
* @license
* Copyright 2017 Google LLC
* SPDX-License-Identifier: BSD-3-Clause
*/
const t = {
	ATTRIBUTE: 1,
	CHILD: 2,
	PROPERTY: 3,
	BOOLEAN_ATTRIBUTE: 4,
	EVENT: 5,
	ELEMENT: 6
}, e = (t) => (...e) => ({
	_$litDirective$: t,
	values: e
});
var i = class {
	constructor(t) {}
	get _$AU() {
		return this._$AM._$AU;
	}
	_$AT(t, e, i) {
		this._$Ct = t, this._$AM = e, this._$Ci = i;
	}
	_$AS(t, e) {
		return this.update(t, e);
	}
	update(t, e) {
		return this.render(...e);
	}
};
//#endregion
//#region node_modules/@thepassle/app-tools/api/plugins/cache.js
const TEN_MINUTES = 1e3 * 60 * 10;
/**
* @param {{maxAge?: number}} options
* @returns {import('../index.js').Plugin}
*/
function cachePlugin({ maxAge = TEN_MINUTES } = {}) {
	let requestId;
	const cache = /* @__PURE__ */ new Map();
	return {
		name: "cache",
		beforeFetch: (meta) => {
			const { method, url } = meta;
			requestId = `${method}:${url}`;
			if (cache.has(requestId)) {
				const cached = cache.get(requestId);
				if (cached.updatedAt > Date.now() - maxAge) {
					meta.fetchFn = () => Promise.resolve(new Response(JSON.stringify(cached.data), { status: 200 }));
					return meta;
				}
			}
		},
		afterFetch: async (res) => {
			const data = await (await res.clone()).json();
			cache.set(requestId, {
				updatedAt: Date.now(),
				data
			});
			return res;
		}
	};
}
cachePlugin();
//#endregion
//#region data/images.js
const images = {
	/**
	*
	* @param {string} id
	* @param {"good" | "evil" | undefined} alignment
	* @param {boolean} useOfficial
	* @returns {string}
	*/
	any(id, alignment = void 0, useOfficial = settings.getState().useOfficialIcons) {
		if (id === "evil") return this.evil();
		if (id === "good") return this.good();
		if (id === "dead") return this.dead();
		if (id === "mad") return this.mad();
		if (id === "ccc") return this.ccc();
		if (id === "question") return this.question();
		const role = window.rolesById?.[id];
		if (!role) return this.transparent();
		const evil = role?.type?.toLowerCase() === "minion" || role?.type?.toLowerCase() === "demon";
		const good = role?.type?.toLowerCase() === "townsfolk" || role?.type?.toLowerCase() === "outsider";
		let currentAlignment = alignment ? alignment.toLowerCase() : evil ? "evil" : good ? "good" : "";
		if (role?.image) {
			if (Array.isArray(role.image)) return role.image[0] || role.image;
			return role.image;
		}
		return `/images/new/${id}${!currentAlignment ? "" : `_${currentAlignment}`}.${useOfficial ? "webp" : "svg"}`;
	},
	transparent: () => `/images/new/transparent.png`,
	mad: () => `/images/new/mad.png`,
	dead: () => `/images/new/dead.png`,
	good: () => `/images/new/good.svg`,
	evil: () => `/images/new/evil.svg`,
	question: () => `/images/new/question.png`,
	ccc: () => `/images/new/ccc-sleeve.png`
};
//#endregion
//#region node_modules/@thepassle/app-tools/api/index.js
const log = createLogger("api");
var StatusError = class extends Error {
	constructor(response) {
		super(response.statusText);
		this.response = response;
	}
};
function handleStatus(response) {
	if (!response.ok) {
		log("Response not ok", response);
		throw new StatusError(response);
	}
	return response;
}
/** @typedef {import('./types.js').Config} Config */
/** @typedef {import('./types.js').Method} Method */
/** @typedef {import('./types.js').Plugin} Plugin */
/** @typedef {import('./types.js').CustomRequestOptions} CustomRequestOptions */
/** @typedef {import('./types.js').RequestOptions} RequestOptions */
/** @typedef {import('./types.js').MetaParams} MetaParams */
/**
* @example 
* const api = new Api({
*  baseURL: 'https://api.foo.com/',
*  responseType: 'text',
*  plugins: [
*    {
*      beforeFetch: ({url, method, opts, data}) => {},
*      afterFetch: (res) => res,
*    }
*  ]
*});
*/
var Api = class {
	/** @param {Config} config */
	constructor(config = {}) {
		this.config = {
			plugins: [],
			responseType: "json",
			...config
		};
	}
	/**
	* @param {string} url 
	* @param {Method} method 
	* @param {RequestOptions} [opts] 
	* @param {object} [data]
	* @returns 
	*/
	async fetch(url, method, opts, data) {
		const plugins = [...this.config.plugins, ...opts?.plugins || []];
		let fetchFn = globalThis.fetch;
		let baseURL = opts?.baseURL ?? this.config?.baseURL ?? "";
		let responseType = opts?.responseType ?? this.config.responseType;
		let headers = new Headers({
			"Content-Type": "application/json",
			...opts?.headers
		});
		if (baseURL) url = url.replace(/^(?!.*\/\/)\/?/, baseURL + "/");
		if (opts?.params) url += `${~url.indexOf("?") ? "&" : "?"}${new URLSearchParams(opts.params)}`;
		for (const plugin of plugins) try {
			const overrides = await plugin?.beforeFetch?.({
				responseType,
				headers,
				fetchFn,
				baseURL,
				url,
				method,
				opts,
				data
			});
			if (overrides) ({responseType, headers, fetchFn, baseURL, url, method, opts, data} = { ...overrides });
		} catch (e) {
			log(`Plugin "${plugin.name}" error on afterFetch hook`);
			throw e;
		}
		log(`Fetching ${method} ${url}`, {
			responseType,
			headers: Object.fromEntries(headers),
			fetchFn,
			baseURL,
			url,
			method,
			opts,
			data
		});
		return fetchFn(url, {
			method,
			headers,
			...data ? { body: JSON.stringify(data) } : {},
			...opts?.mode ? { mode: opts.mode } : {},
			...opts?.credentials ? { credentials: opts.credentials } : {},
			...opts?.cache ? { cache: opts.cache } : {},
			...opts?.redirect ? { redirect: opts.redirect } : {},
			...opts?.referrer ? { referrer: opts.referrer } : {},
			...opts?.referrerPolicy ? { referrerPolicy: opts.referrerPolicy } : {},
			...opts?.integrity ? { integrity: opts.integrity } : {},
			...opts?.keepalive ? { keepalive: opts.keepalive } : {},
			...opts?.signal ? { signal: opts.signal } : {}
		}).then(async (res) => {
			for (const plugin of plugins) try {
				const afterFetchResult = await plugin?.afterFetch?.(res) ?? res;
				if (afterFetchResult) res = afterFetchResult;
			} catch (e) {
				log(`Plugin "${plugin.name}" error on afterFetch hook`);
				throw e;
			}
			return res;
		}).then(handleStatus).then((res) => res[responseType]()).then(async (data) => {
			for (const plugin of plugins) try {
				data = await plugin?.transform?.(data) ?? data;
			} catch (e) {
				log(`Plugin "${plugin.name}" error on transform hook`);
				throw e;
			}
			log(`Fetch successful ${method} ${url}`, data);
			return data;
		}).catch(async (e) => {
			log(`Fetch failed ${method} ${url}`, e);
			if (plugins.length === 0 || (await Promise.all(plugins.map(({ handleError }) => handleError?.(e) ?? true))).every((_) => !!_)) throw e;
		});
	}
	/** @type {import('./types.js').BodylessMethod} */
	get = (url, opts) => this.fetch(url, "GET", opts);
	/** @type {import('./types.js').BodylessMethod} */
	options = (url, opts) => this.fetch(url, "OPTIONS", opts);
	/** @type {import('./types.js').BodylessMethod} */
	delete = (url, opts) => this.fetch(url, "DELETE", opts);
	/** @type {import('./types.js').BodylessMethod} */
	head = (url, opts) => this.fetch(url, "HEAD", opts);
	/** @type {import('./types.js').BodyMethod} */
	post = (url, data, opts) => this.fetch(url, "POST", opts, data);
	/** @type {import('./types.js').BodyMethod} */
	put = (url, data, opts) => this.fetch(url, "PUT", opts, data);
	/** @type {import('./types.js').BodyMethod} */
	patch = (url, data, opts) => this.fetch(url, "PATCH", opts, data);
};
const api = new Api();
//#endregion
//#region src/constants.js
const ROLE_KINDS = {
	TOWNSFOLK: "Townsfolk",
	MINION: "Minion",
	DEMON: "Demon",
	TRAVELLER: "Traveller",
	OUTSIDER: "Outsider",
	FABLED: "Fabled",
	LORIC: "Loric"
};
/**
* TOKENS
* 
* For tokens I'll want to include the roles of the current script
* For example, washerwoman: you start knowing one of two players is a particular townsfolk
* then you want to be able to put a token of that role on both those players
* 
* Red herring token
* Shield token
* 
* Drunk token
* Mad token
* Poisoned token
* 
* Executed by town (blue circle, cross)
* Executed by evil (red circle, skull?)
* Executed by ??? (black circle, skull?)
* 
* Styles, this is good:
* 
position: absolute;
width: 25px;
height: 25px;
border: 2px solid rgb(217, 64, 59);
top: 0;
left: 30px;
z-index: 9;
box-shadow: 1px 1px 2px 1px rgba(0, 0, 0, 0.75);
*/
const LETHAL_ROLES = [
	"wizard",
	"grandmother",
	"gambler",
	"gossip",
	"fearmonger",
	"acrobat",
	"alchemist",
	"atheist",
	"lycanthrope",
	"witch",
	"cerenovus",
	"godfather",
	"assassin",
	"boomdandy",
	"harpy",
	"psychopath",
	"vizier",
	"mutant",
	"tinker",
	"moonchild",
	"golem",
	"scapegoat",
	"gunslinger",
	"slayer",
	"gangster",
	"gnome",
	"imp",
	"fanggu",
	"vigormortis",
	"nodashii",
	"vortox",
	"zombuul",
	"pukka",
	"shabaloth",
	"klutz",
	"po",
	"alhadikhia",
	"kazali",
	"legion",
	"leviathan",
	"lilmonsta",
	"lleech",
	"lordoftyphon",
	"ojo",
	"riot",
	"virgin",
	"yaggababble"
];
const TRAVELLER_SHEET = {
	5: {
		players: 3,
		outsiders: 0,
		minions: 1,
		demons: 1
	},
	6: {
		players: 3,
		outsiders: 1,
		minions: 1,
		demons: 1
	},
	7: {
		players: 5,
		outsiders: 0,
		minions: 1,
		demons: 1
	},
	8: {
		players: 5,
		outsiders: 1,
		minions: 1,
		demons: 1
	},
	9: {
		players: 5,
		outsiders: 2,
		minions: 1,
		demons: 1
	},
	10: {
		players: 7,
		outsiders: 0,
		minions: 2,
		demons: 1
	},
	11: {
		players: 7,
		outsiders: 1,
		minions: 2,
		demons: 1
	},
	12: {
		players: 7,
		outsiders: 2,
		minions: 2,
		demons: 1
	},
	13: {
		players: 9,
		outsiders: 0,
		minions: 3,
		demons: 1
	},
	14: {
		players: 9,
		outsiders: 1,
		minions: 3,
		demons: 1
	},
	15: {
		players: 9,
		outsiders: 2,
		minions: 3,
		demons: 1
	}
};
const tb = new URL(new URL("C9J13Yo7.json", import.meta.url).href).pathname;
const snv = new URL(new URL("WQhQKIXQ.json", import.meta.url).href).pathname;
const bmr = new URL(new URL("D570D1cV.json", import.meta.url).href).pathname;
const anonymous_dishonesty = new URL(new URL("DZIhrVS4.json", import.meta.url).href).pathname;
const contempt = new URL(new URL("Cr0L39If.json", import.meta.url).href).pathname;
const devout_theists = new URL(new URL("Do8Xu4Ez.json", import.meta.url).href).pathname;
const harold_holts_revenge = new URL(new URL("CJQB3U3R.json", import.meta.url).href).pathname;
const insanity_n_intuition = new URL(new URL("BEnkj_79.json", import.meta.url).href).pathname;
const irrational_behavior = new URL(new URL("OmC2dxjG.json", import.meta.url).href).pathname;
const the_midnight_oasis = new URL(new URL("6aa_duxk.json", import.meta.url).href).pathname;
const monkey_do_math = new URL(new URL("CNLfGwNF.json", import.meta.url).href).pathname;
const the_ones_you_least_expect = new URL(new URL("Rbia1tOo.json", import.meta.url).href).pathname;
const punchy = new URL(new URL("CmJ2JKHH.json", import.meta.url).href).pathname;
const quick_maths = new URL(new URL("6QfioOZ8.json", import.meta.url).href).pathname;
const revenge_of_the_martian_vampires = new URL(new URL("eVsKzdEY.json", import.meta.url).href).pathname;
const whose_cult_is_it_anyways = new URL(new URL("gIyeN_mN.json", import.meta.url).href).pathname;
const SCRIPTS_DATA = {
	"Trouble Brewing": () => api.get(tb, { plugins: [cache] }),
	"Sects & Violets": () => api.get(snv, { plugins: [cache] }),
	"Bad Moon Rising": () => api.get(bmr, { plugins: [cache] }),
	"Anonymous Dishonesty": () => api.get(anonymous_dishonesty, { plugins: [cache] }),
	Contempt: () => api.get(contempt, { plugins: [cache] }),
	"Devout Theists": () => api.get(devout_theists, { plugins: [cache] }),
	"Harold Holt's Revenge": () => api.get(harold_holts_revenge, { plugins: [cache] }),
	"Instanity & Intuition": () => api.get(insanity_n_intuition, { plugins: [cache] }),
	"Irrational Behavior": () => api.get(irrational_behavior, { plugins: [cache] }),
	"The Midnight Oasis": () => api.get(the_midnight_oasis, { plugins: [cache] }),
	"Monkey Do Math": () => api.get(monkey_do_math, { plugins: [cache] }),
	"The Ones You Least Expect": () => api.get(the_ones_you_least_expect, { plugins: [cache] }),
	Punchy: () => api.get(punchy, { plugins: [cache] }),
	"Quick Maths": () => api.get(quick_maths, { plugins: [cache] }),
	"Revenge of the Martian Vampires": () => api.get(revenge_of_the_martian_vampires, { plugins: [cache] }),
	"Whose Cult Is It Anyways": () => api.get(whose_cult_is_it_anyways, { plugins: [cache] }),
	All: async () => {
		let [allScripts, customRoles] = await Promise.all([Promise.resolve(Object.values(rolesById).reduce((acc, role) => {
			const type = role.type.toLowerCase();
			if (!acc[type]) acc[type] = [];
			acc[type].push(role);
			return acc;
		}, {})), get("roles")]);
		if (!customRoles) customRoles = [];
		for (const role of customRoles) allScripts[role.type.toLowerCase()].push(role);
		return allScripts;
	}
};
const APPENDED_ROLES = [{
	id: "good",
	icon: "good",
	humanReadableRole: "Good",
	type: "Townsfolk"
}, {
	id: "evil",
	icon: "evil",
	humanReadableRole: "Evil",
	type: "Demon"
}];
const SORT_ORDER = [
	ROLE_KINDS.TOWNSFOLK.toLowerCase(),
	ROLE_KINDS.OUTSIDER.toLowerCase(),
	ROLE_KINDS.MINION.toLowerCase(),
	ROLE_KINDS.DEMON.toLowerCase(),
	ROLE_KINDS.FABLED.toLowerCase(),
	ROLE_KINDS.LORIC.toLowerCase(),
	ROLE_KINDS.TRAVELLER.toLowerCase()
];
//#endregion
//#region src/utils.js
/**
* @typedef {import('../types.js').Player} Player
*/
/**
* @param {Player} player
* @returns {boolean}
*/
function isDroisoned(player) {
	return player?.suspectedRole?.id === "marionette" || player?.suspectedRole?.id === "drunk" || player.tokens.some((t) => t.id.includes("Poisoned") || t.id.includes("Drunk"));
}
/**
* @param {Player} player
* @returns {boolean}
*/
function isGood(player) {
	return player?.suspectedRole?.type?.toLowerCase() === "townsfolk" || player?.suspectedRole?.type?.toLowerCase() === "outsider" || player?.tokens?.some((t) => t.id === "special-Good");
}
function isProtected(player) {
	const safeTokens = [];
	let isDrunkOrPoisoned = false;
	for (const token of player.tokens) {
		if (token.id.includes("Drunk") || token.id.includes("Poisoned")) isDrunkOrPoisoned = true;
		if (token.id === "tealady-Cannot Die" || token.id === "monk-Safe" || token.id === "innkeeper-Safe") safeTokens.push(token);
	}
	const isProtectedByRole = (player.suspectedRole?.id === "soldier" || player.suspectedRole?.id === "sailor") && !isDrunkOrPoisoned;
	const isProtectedByToken = safeTokens.length > 0;
	if (isProtectedByRole || isProtectedByToken) return true;
	else return false;
}
function getVoteMultiplier(player) {
	if (!player?.tokens) return 1;
	if (player.tokens.some((t) => t.id === "thief-Negative Vote")) return -1;
	if (player.tokens.some((t) => t.id === "godofug-Hat")) return 2;
	if (player.tokens.some((t) => t.id === "bureaucrat-3 Votes")) return 3;
	return 1;
}
/**
* Returns the player ID from a vote entry.
* Vote entries are either a plain string ID (normal vote) or an object
* `{ id, vote: { id, value } }` (thief/bureaucrat vote).
*/
function getVoteId(voteEntry) {
	return typeof voteEntry === "string" ? voteEntry : voteEntry.id;
}
/**
* Sums the effective vote count across a votes array.
* Handles both plain string IDs (live counting, old stored nominations) and
* vote objects `{ id, vote: { id, value } }` (new stored nominations with
* per-vote multiplier embedded).
*/
function calculateEffectiveVoteCount(votes, allPlayers) {
	return votes.reduce((total, vote) => {
		if (typeof vote === "object" && vote !== null && vote.vote != null) return total + vote.vote.value;
		return total + getVoteMultiplier(allPlayers.find((p) => p.id === vote));
	}, 0);
}
/**
* Returns the effective vote count for a stored nomination.
* Prefers the historically-accurate `effectiveVoteCount` stored at conclusion
* time (legacy field), then falls back to summing per-vote multipliers
* embedded in the votes array (new format), and finally falls back to live
* player-token lookup for old nominations that predate this field.
*/
function getNominationVoteCount(nomination, allPlayers) {
	if (nomination.effectiveVoteCount != null) return nomination.effectiveVoteCount;
	return calculateEffectiveVoteCount(nomination.votes, allPlayers);
}
function getOnTheBlock() {
	const nominations = state.getState().currentGame?.nominations;
	const currentDay = state.getState().currentGame?.day;
	const allPlayers = state.getState()?.currentGame?.players || [];
	const alivePlayers = allPlayers.filter((p) => !p.dead);
	const votesRequired = Math.ceil(alivePlayers.length / 2);
	const qualifyingNominations = nominations.filter((n) => n.day === currentDay).filter((n) => getNominationVoteCount(n, allPlayers) >= votesRequired);
	if (!qualifyingNominations.length) return null;
	const maxVotes = Math.max(...qualifyingNominations.map((n) => getNominationVoteCount(n, allPlayers)));
	const topNoms = qualifyingNominations.filter((n) => getNominationVoteCount(n, allPlayers) === maxVotes);
	if (topNoms.length === 1) return {
		id: topNoms[0].nominee,
		name: allPlayers.find((p) => p.id === topNoms[0].nominee)?.name,
		votes: maxVotes
	};
	else return null;
}
function createService(defaults) {
	return class Service {
		resolved;
		constructor(host, promise) {
			(this.host = host).addController(this);
			this.promise = promise;
			this.state = "initialized";
			this.#createPromise();
		}
		#createPromise() {
			this.resolved = new Promise((resolve, reject) => {
				this.resolve = resolve;
				this.reject = reject;
			});
		}
		setPromise(promise) {
			this.promise = promise;
		}
		setError(msg) {
			this.errorMessage = msg;
			this.state = "error";
			this.host.requestUpdate();
		}
		request(params) {
			this.state = "pending";
			this.host.requestUpdate();
			return this.promise(params).then((data) => {
				this.state = "success";
				this.data = data;
				this.host.requestUpdate();
				this.resolve();
				return data;
			}).catch((e) => {
				this.errorMessage = e?.message;
				this.state = "error";
				this.host.requestUpdate();
				this.reject(e);
				throw e;
			}).finally(() => {
				this.#createPromise();
			});
		}
		/**
		* Use states individually, useful if you may need to render stuff in different locations
		*/
		initialized(templateFn) {
			return when(this.state === "initialized", templateFn || defaults.initialized);
		}
		pending(templateFn) {
			return when(this.state === "pending", templateFn || defaults.pending);
		}
		success(templateFn) {
			const template = templateFn || defaults.success;
			return when(this.state === "success", () => template(this.data));
		}
		error(templateFn) {
			const template = templateFn || defaults.error;
			return when(this.state === "error", () => template(this.errorMessage));
		}
		/**
		* Combined render method, if you want to just render everything in place
		*/
		render(templates) {
			const states = {
				...defaults,
				...templates
			};
			switch (this.state) {
				case "initialized": return states.initialized?.() ?? states.initialized;
				case "pending": return states.pending();
				case "success": return states.success(this.data);
				case "error": return states.error(this.errorMessage);
			}
		}
	};
}
const Service = createService({
	initialized: () => A,
	pending: () => b`<botc-spinner></botc-spinner>`,
	success: () => A,
	error: (error) => b`<botc-error>${error}</botc-error>`
});
async function saveScript(name, script) {
	const savedScripts = await get("scripts") ?? {};
	savedScripts[name] = script;
	await set("scripts", savedScripts);
	SCRIPTS_DATA[name] = () => get("scripts").then((data) => data[name]);
	state.dispatchEvent(new Event("custom-scripts-updated"));
}
function nightOrder(role) {
	const gameState = state.getState();
	const players = gameState.currentGame.players;
	const isFirstNight = gameState.currentGame.day === 0;
	const rolesInPlay = players.map((p) => p.suspectedRole).filter((r) => r).map((r) => ({
		id: r.id,
		order: isFirstNight ? r.firstNight : r.otherNight
	})).filter((r) => r.order > 0).sort((a, b) => a.order - b.order);
	const currentRoleId = role?.suspectedRole?.id;
	const index = rolesInPlay.findIndex((r) => r.id === currentRoleId);
	return index >= 0 ? index + 1 : null;
}
function img(role) {
	return images.any(role?.icon ?? role.id);
}
const cache = cachePlugin({ maxAge: 1e3 * 60 * 60 * 24 });
const capitalize = (str) => str.charAt(0).toUpperCase() + str.slice(1);
function mapBotcScript(script) {
	let roles = [];
	roles = script?.content ?? script;
	const grouped = {
		townsfolk: [],
		outsider: [],
		minion: [],
		demon: [],
		traveller: [],
		fabled: [],
		loric: []
	};
	for (const r of roles) {
		const role = window.rolesById[r.id];
		if (!role) {
			const team = r.team?.toLowerCase?.();
			if (team) {
				if (!grouped[team]) grouped[team] = [];
				r.type = team;
				r.summary = r.ability ?? r.summary ?? "";
				r.humanReadableRole = r?.name ?? "";
				grouped[team].push(r);
			}
		} else {
			const type = role.type?.toLowerCase();
			if (!grouped[type]) grouped[type] = [];
			grouped[type].push(role);
		}
	}
	return grouped;
}
/**
*
* @param {string | import('../types.js').Player} role
* @returns
*/
function alignment(role) {
	if (typeof role === "object") {
		if (role?.tokens?.find((t) => t.id === "special-Evil")) return "red";
		else if (role?.tokens?.find((t) => t.id === "special-Good")) return "blue";
	}
	role = role?.suspectedRole?.type || role;
	if (typeof role === "string") switch (role?.toLowerCase()) {
		case "townsfolk": return "blue";
		case "outsider": return "blue";
		case "minion": return "red";
		case "fabled": return "yellow";
		case "loric": return "green";
		case "demon": return "red";
		case "traveller": return "orange";
		default: return "";
	}
	return "";
}
function traveller(player) {
	if (player?.suspectedRole?.type?.toLowerCase() === "traveller") {
		for (const token of player?.tokens || []) if (token.id.startsWith("special-Good") && token.type === "townsfolk") return "blue";
		else if (token.id.startsWith("special-Evil") && token.type === "demon") return "red";
	}
	return "";
}
function formatDate(isoString) {
	const date = new Date(isoString);
	return new Intl.DateTimeFormat("en-GB", {
		day: "numeric",
		month: "long",
		year: "numeric"
	}).format(date).replace(/([a-zA-Z]+)(\s)/, "$1,$2");
}
const BREAKPOINTS = {
	XXXL: {
		MAX: "(max-width: 1600px)",
		MIN: "(min-width: 1440px)"
	},
	XXL: {
		MAX: "(max-width: 1440px)",
		MIN: "(min-width: 1280px)"
	},
	XL: {
		MAX: "(max-width: 1280px)",
		MIN: "(min-width: 960px)"
	},
	LG: {
		MAX: "(max-width: 960px)",
		MIN: "(min-width: 840px)"
	},
	MD: {
		MAX: "(max-width: 840px)",
		MIN: "(min-width: 600px)"
	},
	SM: {
		MAX: "(max-width: 600px)",
		MIN: "(min-width: 480px)"
	},
	XS: {
		MAX: "(max-width: 480px)",
		MIN: "(min-width: 320px)"
	},
	XXS: {
		MAX: "(max-width: 320px)",
		MIN: "(min-width: 0px)"
	},
	XXXS: {
		MAX: "(max-width: 0px)",
		MIN: "(min-width: 0px)"
	}
};
var MediaQueryController = class {
	matchers = [];
	constructor(host, queries, callback) {
		(this.host = host).addController(this);
		this.callback = callback;
		queries.forEach((query) => {
			this.matchers.push(window.matchMedia(query));
		});
	}
	hostConnected() {
		this.matchers.forEach((matcher) => {
			matcher.addEventListener("change", this.callback);
			this.callback(matcher);
		});
	}
	hostDisconnected() {
		this.matchers.forEach((matcher) => {
			matcher.removeEventListener("change", this.callback);
		});
	}
};
const tooltip = e(class extends i {
	tooltipEl;
	arrowEl;
	cleanup;
	render(_text) {}
	update(part, [text]) {
		const el = part.element;
		el.setAttribute("aria-label", text);
		if (!this.tooltipEl) {
			const root = el.getRootNode();
			const tooltip = document.createElement("div");
			tooltip.textContent = text;
			tooltip.style.position = "absolute";
			tooltip.style.padding = "4px 8px";
			tooltip.style.background = "var(--ui-bg-5)";
			tooltip.style.color = "white";
			tooltip.style.borderRadius = "6px";
			tooltip.style.setProperty("font-size", "0.75rem", "important");
			tooltip.style.pointerEvents = "none";
			tooltip.style.zIndex = "9999999";
			tooltip.style.visibility = "hidden";
			tooltip.style.textAlign = "center";
			tooltip.style.boxShadow = "rgba(0, 0, 0, 0.34) 0px 8px 24px 0px";
			tooltip.style.border = "1px solid var(--ui-bg-4)";
			tooltip.style.minWidth = "max-content";
			const arrowDiv = document.createElement("div");
			Object.assign(arrowDiv.style, {
				position: "absolute",
				width: "8px",
				height: "8px",
				borderBottom: "1px solid var(--ui-bg-4)",
				borderRight: "1px solid var(--ui-bg-4)",
				background: "var(--ui-bg-5)",
				transform: "rotate(45deg)",
				zIndex: "-1"
			});
			tooltip.appendChild(arrowDiv);
			this.tooltipEl = tooltip;
			this.arrowEl = arrowDiv;
			(root === document ? document.body : root).appendChild(tooltip);
			const show = () => {
				if (!media.MIN.LG()) return;
				tooltip.style.visibility = "visible";
				this.cleanup = autoUpdate(el, tooltip, () => computePosition(el, tooltip, {
					placement: "top",
					middleware: [
						offset(8),
						flip(),
						shift(),
						arrow({ element: arrowDiv })
					]
				}).then(({ x, y, middlewareData }) => {
					tooltip.style.left = `${x}px`;
					tooltip.style.top = `${y}px`;
					const { x: ax, y: ay } = middlewareData.arrow || {};
					if (ax != null) arrowDiv.style.left = `${ax}px`;
					if (ay != null) arrowDiv.style.top = `${ay}px`;
				}));
			};
			const hide = () => {
				tooltip.style.visibility = "hidden";
				if (this.cleanup) this.cleanup();
			};
			el.addEventListener("mouseenter", show);
			el.addEventListener("mouseleave", hide);
			el.addEventListener("blur", hide);
		}
		if (this.tooltipEl) this.tooltipEl.firstChild.nodeValue = text;
	}
	disconnected() {
		if (this.tooltipEl) {
			this.tooltipEl.remove();
			this.tooltipEl = null;
		}
		if (this.cleanup) {
			this.cleanup();
			this.cleanup = null;
		}
	}
});
function transformToSchemaScript(scriptObj) {
	const roleList = Object.entries(scriptObj.script).flatMap(([type, roles]) => roles.map((r) => ({
		...r,
		team: type.toLowerCase(),
		sortId: r.id || r.name || ""
	})));
	const ignoredIds = /* @__PURE__ */ new Set(["demoninfo", "minioninfo"]);
	new Set(roleList.map((r) => r.sortId));
	const sortRoles = (key) => roleList.filter((r) => typeof r[key] === "number" && r[key] > 0).sort((a, b) => a[key] - b[key]).map((r) => r.sortId);
	const firstNight = [
		"dusk",
		...sortRoles("firstNight"),
		"dawn"
	];
	const otherNight = [
		"dusk",
		...sortRoles("otherNight"),
		"dawn"
	];
	return [{
		id: "_meta",
		name: scriptObj.name,
		author: scriptObj.authorName,
		firstNight,
		otherNight,
		...scriptObj?.bootlegger ? { bootlegger: scriptObj.bootlegger } : {}
	}, ...roleList.filter((r) => !ignoredIds.has(r.sortId)).map((r) => ({
		id: r.id,
		name: r.humanReadableRole ?? r.name ?? r.id,
		team: r.team,
		edition: r.script?.toLowerCase() ?? "",
		ability: r.summary,
		flavor: r.flavor ?? "",
		firstNight: r.firstNight ?? 0,
		otherNight: r.otherNight ?? 0,
		firstNightReminder: r.firstNightReminder ?? "",
		otherNightReminder: r.otherNightReminder ?? "",
		reminders: r.reminders ?? [],
		jinxes: r.jinxes ?? [],
		setup: r.setup ?? false,
		image: Array.isArray(r.image) && r.image.every((i) => typeof i === "string") ? r.image : typeof r.image === "string" ? r.image : typeof r.icon === "string" ? `https://${window.location.host}/icons/${r.icon}.png` : void 0
	}))];
}
const TYPE_ORDER = [
	"Townsfolk",
	"Outsider",
	"Minion",
	"Demon",
	"Traveller",
	"Fabled",
	"Loric"
];
const GROUP_PREFIXES = [
	"You start knowing",
	"At night",
	"Each dusk",
	"Each night*",
	"Each night",
	"Each day",
	"Once per game, at night*",
	"Once per game, at night",
	"Once per game, during the day",
	"Once per game",
	"On your 1st night",
	"On your 1st day",
	"You think",
	"You are",
	"You have",
	"You do not know",
	"You might",
	"You",
	"When you die",
	"When you learn that you died",
	"When",
	"If you die",
	"If you died",
	"If you are \"mad\"",
	"If you",
	"If the Demon dies",
	"If the Demon kills",
	"If the Demon",
	"If both",
	"If there are 5 or more players alive",
	"If",
	"All players",
	"All",
	"The 1st time",
	"The",
	"Good",
	"Evil",
	"Players",
	"Minions"
];
function getGroupIndex(summary) {
	for (let i = 0; i < GROUP_PREFIXES.length; i++) if (summary?.startsWith(GROUP_PREFIXES?.[i])) return i;
	return GROUP_PREFIXES.length;
}
function SAO(a, b) {
	const typeA = TYPE_ORDER.indexOf(a.type);
	const typeB = TYPE_ORDER.indexOf(b.type);
	if (typeA !== typeB) return typeA - typeB;
	const groupA = getGroupIndex(a.summary);
	const groupB = getGroupIndex(b.summary);
	if (groupA !== groupB) return groupA - groupB;
	const lenA = a.summary.length;
	const lenB = b.summary.length;
	if (lenA !== lenB) return lenA - lenB;
	const nameA = a.humanReadableRole.length;
	const nameB = b.humanReadableRole.length;
	if (nameA !== nameB) return nameA - nameB;
	return a.humanReadableRole.localeCompare(b.humanReadableRole);
}
//#endregion
//#region data/rolesById.js
var rolesById_default = {
	washerwoman: {
		id: "washerwoman",
		firstNightReminder: "Show the Townsfolk character token. Point to both the *TOWNSFOLK* and *WRONG* players.",
		otherNightReminder: "",
		reminders: ["Townsfolk", "Wrong"],
		setup: false,
		flavor: "Bloodstains on a dinner jacket? No, this is cooking sherry. How careless.",
		firstNight: 46,
		otherNight: 0,
		summary: "You start knowing that 1 of 2 players is a particular Townsfolk.",
		icon: "washerwoman",
		humanReadableRole: "Washerwoman",
		script: "Trouble Brewing",
		type: "Townsfolk"
	},
	librarian: {
		id: "librarian",
		firstNightReminder: "Show the Outsider character token. Point to both the *OUTSIDER* and *WRONG* players.",
		otherNightReminder: "",
		reminders: ["Outsider", "Wrong"],
		setup: false,
		flavor: "Certainly madam, under normal circumstances, you may borrow the Codex Malificarium from the library vaults. However, you do not seem to be a member.",
		firstNight: 47,
		otherNight: 0,
		summary: "You start knowing that 1 of 2 players is a particular Outsider. (Or that zero are in play.)",
		icon: "librarian",
		humanReadableRole: "Librarian",
		script: "Trouble Brewing",
		type: "Townsfolk"
	},
	investigator: {
		id: "investigator",
		firstNightReminder: "Show the Minion character token. Point to both the *MINION* and *WRONG* players.",
		otherNightReminder: "",
		reminders: ["Minion", "Wrong"],
		setup: false,
		flavor: "It is a fine night for a stroll, wouldn't you say, Mister Morozov? Or should I say... BARON Morozov?",
		firstNight: 48,
		otherNight: 0,
		summary: "You start knowing that 1 of 2 players is a particular Minion.",
		icon: "investigator",
		humanReadableRole: "Investigator",
		script: "Trouble Brewing",
		type: "Townsfolk"
	},
	chef: {
		id: "chef",
		firstNightReminder: "Give a finger signal.",
		otherNightReminder: "",
		reminders: [],
		setup: false,
		flavor: "This evening's reservations seem odd. Never before has Mrs. Mayweather kept company with that scamp from Hudson Lane. Yet, tonight, they have a table for two. Strange.",
		firstNight: 49,
		otherNight: 0,
		summary: "You start knowing how many pairs of evil players there are.",
		icon: "chef",
		humanReadableRole: "Chef",
		script: "Trouble Brewing",
		type: "Townsfolk"
	},
	empath: {
		id: "empath",
		firstNightReminder: "Give a finger signal.",
		otherNightReminder: "Give a finger signal.",
		reminders: [],
		setup: false,
		flavor: "My skin prickles. Something is not right here. I can feel it.",
		firstNight: 50,
		otherNight: 69,
		summary: "Each night, you learn how many of your 2 alive neighbors are evil.",
		icon: "empath",
		humanReadableRole: "Empath",
		script: "Trouble Brewing",
		type: "Townsfolk"
	},
	fortuneteller: {
		id: "fortuneteller",
		firstNightReminder: "The Fortune Teller chooses 2 players. Nod if either is the Demon (or the *RED HERRING*).",
		otherNightReminder: "The Fortune Teller chooses 2 players. Nod if either is the Demon (or the *RED HERRING*).",
		reminders: ["Red Herring"],
		setup: false,
		flavor: "I sense great evil in your soul! But... that could just be your perfume. I am allergic to Elderberry.",
		firstNight: 51,
		otherNight: 70,
		summary: "Each night, choose 2 players: you learn if either is a Demon. There is a good player that registers as a Demon to you.",
		icon: "fortuneteller",
		humanReadableRole: "Fortune Teller",
		script: "Trouble Brewing",
		type: "Townsfolk"
	},
	undertaker: {
		id: "undertaker",
		firstNightReminder: "",
		otherNightReminder: "If a player was executed today, show their character token.",
		reminders: ["Died Today"],
		setup: false,
		flavor: "Hmmm....what have we here? The left boot is worn down to the heel, with flint shavings under the tongue. This is the garb of a Military man.",
		firstNight: 0,
		otherNight: 71,
		summary: "Each night*, you learn which character died by execution today.",
		icon: "undertaker",
		humanReadableRole: "Undertaker",
		script: "Trouble Brewing",
		type: "Townsfolk"
	},
	monk: {
		id: "monk",
		firstNightReminder: "",
		otherNightReminder: "The Monk chooses a player.",
		reminders: ["Safe"],
		setup: false,
		flavor: "'Tis an ill and deathly wind that blows tonight. Come, my brother, take shelter in the abbey while the storm rages. By my word, or by my life, you will be safe.",
		firstNight: 0,
		otherNight: 20,
		summary: "Each night*, choose a player (not yourself): they are safe from the Demon tonight.",
		icon: "monk",
		humanReadableRole: "Monk",
		script: "Trouble Brewing",
		type: "Townsfolk"
	},
	ravenkeeper: {
		id: "ravenkeeper",
		firstNightReminder: "",
		otherNightReminder: "If the Ravenkeeper died tonight, the Ravenkeeper chooses a player. Show that player's character token.",
		reminders: [],
		setup: false,
		flavor: "My birds will avenge me! Fly! Fly, my sweet and dutiful pets! To the manor and to the river! To the alleys and to the salons! Fly!",
		firstNight: 0,
		otherNight: 68,
		summary: "If you die at night, you are woken to choose a player: you learn their character.",
		icon: "ravenkeeper",
		humanReadableRole: "Ravenkeeper",
		script: "Trouble Brewing",
		type: "Townsfolk"
	},
	virgin: {
		id: "virgin",
		firstNightReminder: "",
		otherNightReminder: "",
		reminders: ["No Ability"],
		setup: false,
		flavor: "I am pure. Let those who are without sin cast themselves down and suffer in my stead. My reputation shall not be stained with your venomous accusations.",
		firstNight: 0,
		otherNight: 0,
		summary: "The 1st time you are nominated, if the nominator is a Townsfolk, they are executed immediately.",
		icon: "virgin",
		humanReadableRole: "Virgin",
		script: "Trouble Brewing",
		type: "Townsfolk"
	},
	slayer: {
		id: "slayer",
		firstNightReminder: "",
		otherNightReminder: "",
		reminders: ["No Ability"],
		setup: false,
		flavor: "Die.",
		firstNight: 0,
		otherNight: 0,
		summary: "Once per game, during the day, publicly choose a player: if they are the Demon, they die.",
		icon: "slayer",
		humanReadableRole: "Slayer",
		script: "Trouble Brewing",
		type: "Townsfolk"
	},
	soldier: {
		id: "soldier",
		firstNightReminder: "",
		otherNightReminder: "",
		reminders: [],
		setup: false,
		flavor: "As David said to Goliath, as Theseus said to the Minotaur, as Arjuna said to Bhagadatta... No.",
		firstNight: 0,
		otherNight: 0,
		summary: "You are safe from the Demon.",
		icon: "soldier",
		humanReadableRole: "Soldier",
		script: "Trouble Brewing",
		type: "Townsfolk"
	},
	mayor: {
		id: "mayor",
		firstNightReminder: "",
		otherNightReminder: "",
		reminders: [],
		setup: false,
		flavor: "We must put our differences aside, and cease this senseless killing. We are all taxpayers after all. Well, most of us.",
		firstNight: 0,
		otherNight: 0,
		summary: "If only 3 players live & no execution occurs, your team wins. If you die at night, another player might die instead.",
		icon: "mayor",
		humanReadableRole: "Mayor",
		script: "Trouble Brewing",
		type: "Townsfolk"
	},
	grandmother: {
		id: "grandmother",
		firstNightReminder: "Point to the grandchild player & show their character token.",
		otherNightReminder: "If the grandchild was killed by the Demon, the Grandmother dies too.",
		reminders: ["Grandchild", "Dead"],
		setup: false,
		flavor: "Take a jacket if you go outside, dearie. And your thermos. And your scarf. I have a weak heart, you know. Whatever would I do if you caught cold...or worse?",
		firstNight: 53,
		otherNight: 67,
		summary: "You start knowing a good player & their character. If the Demon kills them, you die too.",
		icon: "grandmother",
		humanReadableRole: "Grandmother",
		script: "Bad Moon Rising",
		type: "Townsfolk"
	},
	sailor: {
		id: "sailor",
		firstNightReminder: "The Sailor chooses a living player.",
		otherNightReminder: "The Sailor chooses a living player.",
		reminders: ["Drunk"],
		setup: false,
		flavor: "I'll drink any one of yer under the table! You! The chatterbox! Reckon you can take me? No? Howza 'bout you, Grandma? You ever tried Old McKillys Extra Spiced Rum before? Guaranteed to put hairs on yer chest! Step aboard, aye!",
		firstNight: 20,
		otherNight: 9,
		summary: "Each night, choose an alive player: either you or they are drunk until dusk. You can't die.",
		icon: "sailor",
		humanReadableRole: "Sailor",
		script: "Bad Moon Rising",
		type: "Townsfolk"
	},
	chambermaid: {
		id: "chambermaid",
		firstNightReminder: "The Chambermaid chooses 2 living players. Give a finger signal.",
		otherNightReminder: "The Chambermaid chooses 2 living players. Give a finger signal.",
		reminders: [],
		setup: false,
		flavor: "I aint seen nothin' untoward, Milady. Begging your pardon, but if I did see somethin', it certainly weren't the master o' the house sneaking into the professor's laboratory 'round eleven o'clock and mixing up fancy potions, just like you said, Miss.",
		firstNight: 70,
		otherNight: 88,
		summary: "Each night, choose 2 alive players (not yourself): you learn how many woke tonight due to their ability.",
		icon: "chambermaid",
		humanReadableRole: "Chambermaid",
		script: "Bad Moon Rising",
		type: "Townsfolk"
	},
	exorcist: {
		id: "exorcist",
		firstNightReminder: "",
		otherNightReminder: "The Exorcist chooses a player.  Put the Exorcist to sleep. If the Exorcist chose the Demon: Wake the Demon. Show the *THIS CHARACTER SELECTED YOU* & Exorcist tokens. Point to the Exorcist.",
		reminders: ["Chosen"],
		setup: false,
		flavor: "We cast you out, every unclean spirit, every satanic power, every onslaught of the infernal adversary, every legion, every diabolical group and sect, in the name and by the power of Our Lord Jesus Christ. We command you, begone and fly far from the Church of God, from the souls made by God in His image and redeemed by the precious blood of the divine Lamb.",
		firstNight: 0,
		otherNight: 32,
		summary: "Each night*, choose a player (different to last night): the Demon, if chosen, learns who you are then doesn't wake tonight.",
		icon: "exorcist",
		humanReadableRole: "Exorcist",
		script: "Bad Moon Rising",
		type: "Townsfolk"
	},
	innkeeper: {
		id: "innkeeper",
		firstNightReminder: "",
		otherNightReminder: "The Innkeeper chooses 2 players.",
		reminders: [
			"Safe",
			"Safe",
			"Drunk"
		],
		setup: false,
		flavor: "Come inside, fair traveller, and rest your weary bones. Drink and be merry, for the legions of the Dark One shall not harass thee tonight.",
		firstNight: 0,
		otherNight: 15,
		summary: "Each night*, choose 2 players: they can't die tonight, but 1 is drunk until dusk.",
		icon: "innkeeper",
		humanReadableRole: "Innkeeper",
		script: "Bad Moon Rising",
		type: "Townsfolk"
	},
	gambler: {
		id: "gambler",
		firstNightReminder: "",
		otherNightReminder: "The Gambler chooses a player & a character.",
		reminders: ["Dead"],
		setup: false,
		flavor: "Heads, I win. Tails, you lose.",
		firstNight: 0,
		otherNight: 17,
		summary: "Each night*, choose a player & guess their character: if you guess wrong, you die.",
		icon: "gambler",
		humanReadableRole: "Gambler",
		script: "Bad Moon Rising",
		type: "Townsfolk"
	},
	gossip: {
		id: "gossip",
		firstNightReminder: "",
		otherNightReminder: "If the Gossip is due to kill a player, they die.",
		reminders: ["Dead"],
		setup: false,
		flavor: "Blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah. Blah.",
		firstNight: 0,
		otherNight: 53,
		summary: "Each day, you may make a public statement. Tonight, if it was true, a player dies.",
		icon: "gossip",
		humanReadableRole: "Gossip",
		script: "Bad Moon Rising",
		type: "Townsfolk"
	},
	courtier: {
		id: "courtier",
		firstNightReminder: "The Courtier might choose a character.",
		otherNightReminder: "The Courtier might choose a character.",
		reminders: [
			"Drunk 3",
			"Drunk 2",
			"Drunk 1",
			"No Ability"
		],
		setup: false,
		flavor: "I am more afraid of an army of one hundred sheep led by a lion than an army of one hundred lions led by a sheep.",
		firstNight: 29,
		otherNight: 14,
		summary: "Once per game, at night, choose a character: they are drunk for 3 nights & 3 days.",
		icon: "courtier",
		humanReadableRole: "Courtier",
		script: "Bad Moon Rising",
		type: "Townsfolk"
	},
	professor: {
		id: "professor",
		firstNightReminder: "",
		otherNightReminder: "The Professor might choose a dead player.",
		reminders: ["Alive", "No Ability"],
		setup: false,
		flavor: "The process is simple. Attach the hydraulic confabulator to the modified chi matrix amplifier, add 20 CCs of pseudodorafine, keep his Z levels above 20%, and your husband will be fine. Now, all we need is a lightning strike.",
		firstNight: 0,
		otherNight: 59,
		summary: "Once per game, at night*, choose a dead player: if they are a Townsfolk, they are resurrected.",
		icon: "professor",
		humanReadableRole: "Professor",
		script: "Bad Moon Rising",
		type: "Townsfolk"
	},
	minstrel: {
		id: "minstrel",
		firstNightReminder: "",
		otherNightReminder: "",
		reminders: ["Everyone Is Drunk"],
		setup: false,
		flavor: "And I shall hear, tho' soft you tread above me... And all my dreams will warm and sweeter be... If you'll not fail to tell me that you love me... I simply sleep in peace until you come to me.",
		firstNight: 0,
		otherNight: 0,
		summary: "When a Minion dies by execution, all other players (except Travellers) are drunk until dusk tomorrow.",
		icon: "minstrel",
		humanReadableRole: "Minstrel",
		script: "Bad Moon Rising",
		type: "Townsfolk"
	},
	tealady: {
		id: "tealady",
		firstNightReminder: "",
		otherNightReminder: "",
		reminders: ["Cannot Die", "Cannot Die"],
		setup: false,
		flavor: "If you are cold, tea will warm you. If you are too heated, tea will cool you. If you are depressed, tea will cheer you. If you are excited, tea will calm you.",
		firstNight: 0,
		otherNight: 0,
		summary: "If both your alive neighbors are good, they can't die.",
		icon: "tealady",
		humanReadableRole: "Tea Lady",
		script: "Bad Moon Rising",
		type: "Townsfolk"
	},
	pacifist: {
		id: "pacifist",
		firstNightReminder: "",
		otherNightReminder: "",
		reminders: [],
		setup: false,
		flavor: "Distrust all in whom the impulse to punish is powerful.",
		firstNight: 0,
		otherNight: 0,
		summary: "Executed good players might not die.",
		icon: "pacifist",
		humanReadableRole: "Pacifist",
		script: "Bad Moon Rising",
		type: "Townsfolk"
	},
	fool: {
		id: "fool",
		firstNightReminder: "",
		otherNightReminder: "",
		reminders: ["No Ability"],
		setup: false,
		flavor: "...and the King said 'What?! I've never even owned a pair of rubber pantaloons, let alone a custard cannon!' Ho-ho! Jolly day!",
		firstNight: 0,
		otherNight: 0,
		summary: "The 1st time you die, you don't.",
		icon: "fool",
		humanReadableRole: "Fool",
		script: "Bad Moon Rising",
		type: "Townsfolk"
	},
	clockmaker: {
		id: "clockmaker",
		firstNightReminder: "Give a finger signal.",
		otherNightReminder: "",
		reminders: [],
		setup: false,
		flavor: "Do not disturb me. The tick must continue, for the circle is a symbol of life and contains all things - all answers - in its divine machinery. I must work.",
		firstNight: 54,
		otherNight: 0,
		summary: "You start knowing how many steps from the Demon to its nearest Minion.",
		icon: "clockmaker",
		humanReadableRole: "Clockmaker",
		script: "Sects & Violets",
		type: "Townsfolk"
	},
	dreamer: {
		id: "dreamer",
		firstNightReminder: "The Dreamer points to a player. Show 1 good & 1 evil character token, 1 of which is their character.",
		otherNightReminder: "The Dreamer points to a player. Show 1 good & 1 evil character token, 1 of which is their character.",
		reminders: [],
		setup: false,
		flavor: "I remember the Clockmaker. The sky was red and it was raining fractal triangles. There was a smell of violets and a bubbling sound. A woman with glowing eyes and a scraggly beard was hissing at the sky. Then, I awoke.",
		firstNight: 55,
		otherNight: 72,
		summary: "Each night, choose a player (not yourself or Travellers): you learn 1 good & 1 evil character, 1 of which is correct.",
		icon: "dreamer",
		humanReadableRole: "Dreamer",
		script: "Sects & Violets",
		type: "Townsfolk"
	},
	snakecharmer: {
		id: "snakecharmer",
		firstNightReminder: "The Snake Charmer chooses a player. If they chose the Demon: Show the *YOU ARE* & Demon tokens. Give a thumbs down. Swap the Snake Charmer & Demon tokens. Put the old Snake Charmer to sleep. Wake the old Demon. Show the *YOU ARE* and Snake Charmer tokens & give a thumbs up.",
		otherNightReminder: "The Snake Charmer chooses a player. If they chose the Demon: Show the *YOU ARE* & Demon tokens. Give a thumbs down. Swap the Snake Charmer & Demon tokens. Put the old Snake Charmer to sleep. Wake the old Demon. Show the *YOU ARE* and Snake Charmer tokens & give a thumbs up.",
		reminders: ["Poisoned"],
		setup: false,
		flavor: "Effendi... I am but a humble man, but my pipe is golden and a single tune will tame the wildest djinn, Inshallah. They say that greed hangs more men than rope. But not I, Effendi... not I.",
		firstNight: 31,
		otherNight: 19,
		summary: "Each night, choose an alive player: a chosen Demon swaps characters & alignments with you & is then poisoned.",
		icon: "snakecharmer",
		humanReadableRole: "Snake Charmer",
		script: "Sects & Violets",
		type: "Townsfolk"
	},
	mathematician: {
		id: "mathematician",
		firstNightReminder: "Give a finger signal.",
		otherNightReminder: "Give a finger signal.",
		reminders: [
			"Abnormal",
			"Abnormal",
			"Abnormal",
			"Abnormal",
			"Abnormal"
		],
		setup: false,
		flavor: "Any consistent formal system x, within which a certain amount of elementary arithmetic can be carried out is incomplete; that is, there are statements of the language of x which can neither be proved nor disproved in x. Ergo, you are drunk.",
		firstNight: 71,
		otherNight: 89,
		jinxes: [{
			id: "chambermaid",
			reason: "The Chambermaid learns if the Mathematician wakes tonight or not, even though the Chambermaid wakes first."
		}, {
			id: "lunatic",
			reason: "The Mathematician learns if the Lunatic attacks a different player(s) than the real Demon attacked."
		}],
		summary: "Each night, you learn how many players’ abilities worked abnormally (since dawn) due to another character's ability.",
		icon: "mathematician",
		humanReadableRole: "Mathematician",
		script: "Sects & Violets",
		type: "Townsfolk"
	},
	flowergirl: {
		id: "flowergirl",
		firstNightReminder: "",
		otherNightReminder: "Either nod or shake your head.",
		reminders: ["Demon Voted", "Demon Not Voted"],
		setup: false,
		flavor: "Yesterday's violets have withered and died, but today my poppies bloom.",
		firstNight: 0,
		otherNight: 73,
		summary: "Each night*, you learn if a Demon voted today.",
		icon: "flowergirl",
		humanReadableRole: "Flowergirl",
		script: "Sects & Violets",
		type: "Townsfolk"
	},
	towncrier: {
		id: "towncrier",
		firstNightReminder: "",
		otherNightReminder: "Either nod or shake your head.",
		reminders: ["Minions Not Nominated", "Minion Nominated"],
		setup: false,
		flavor: "Hear ye! Hear ye! Witchcraft in the labyrinth! Genius savant reveals all! Town in danger! Hear Ye!",
		firstNight: 0,
		otherNight: 74,
		summary: "Each night*, you learn if a Minion nominated today.",
		icon: "towncrier",
		humanReadableRole: "Town Crier",
		script: "Sects & Violets",
		type: "Townsfolk"
	},
	oracle: {
		id: "oracle",
		firstNightReminder: "",
		otherNightReminder: "Give a finger signal.",
		reminders: [],
		setup: false,
		flavor: "Only the chosen may gaze beyond the veil. The dead are restless, and they point in silence toward the icy north.",
		firstNight: 0,
		otherNight: 75,
		summary: "Each night*, you learn how many dead players are evil.",
		icon: "oracle",
		humanReadableRole: "Oracle",
		script: "Sects & Violets",
		type: "Townsfolk"
	},
	savant: {
		id: "savant",
		firstNightReminder: "",
		otherNightReminder: "",
		reminders: [],
		setup: false,
		flavor: "Seventy-two matchsticks on the floor... the sun sets early but the moon is unchanged... a torn piece of cloth... evil in the manor house... three by three... the one we trusted is not what he seems... green light means magnesium... residue, but the pattern is wrong... Seventy-two matchsticks on the floor...",
		firstNight: 0,
		otherNight: 0,
		summary: "Each day, you may visit the Storyteller to learn 2 things in private: 1 is true & 1 is false.",
		icon: "savant",
		humanReadableRole: "Savant",
		script: "Sects & Violets",
		type: "Townsfolk"
	},
	seamstress: {
		id: "seamstress",
		firstNightReminder: "The Seamstress might choose 2 players. Nod or shake your head.",
		otherNightReminder: "The Seamstress might choose 2 players. Nod or shake your head.",
		reminders: ["No Ability"],
		setup: false,
		flavor: "Did you hear that stranger in the cashmere coat put the word on our young Belle? And she said yes? Well, that's nothing compared to what Harry and that juggler got up to at the fair! The things I could say if I was a tattletale... my, yes.",
		firstNight: 56,
		otherNight: 76,
		summary: "Once per game, at night, choose 2 players (not yourself): you learn if they are the same alignment.",
		icon: "seamstress",
		humanReadableRole: "Seamstress",
		script: "Sects & Violets",
		type: "Townsfolk"
	},
	philosopher: {
		id: "philosopher",
		firstNightReminder: "The Philosopher might choose a character. If necessary, swap their character token.",
		otherNightReminder: "The Philosopher might choose a character. If necessary, swap their character token.",
		reminders: ["Drunk"],
		remindersGlobal: ["Is The Philosopher"],
		setup: false,
		special: [{
			type: "reveal",
			name: "replace-character"
		}],
		flavor: "If anything is real, beer is real. Drink, for tomorrow we may die.",
		firstNight: 9,
		otherNight: 7,
		summary: "Once per game, at night, choose a good character: gain that ability. If this character is in play, they are drunk.",
		icon: "philosopher",
		humanReadableRole: "Philosopher",
		script: "Sects & Violets",
		type: "Townsfolk"
	},
	artist: {
		id: "artist",
		firstNightReminder: "",
		otherNightReminder: "",
		reminders: ["No Ability"],
		setup: false,
		flavor: "Mon Dieu! C'est lumineux! My work, she is... how you say... Magnifique! Dieu est révélé! Oui.",
		firstNight: 0,
		otherNight: 0,
		summary: "Once per game, during the day, privately ask the Storyteller any yes/no question.",
		icon: "artist",
		humanReadableRole: "Artist",
		script: "Sects & Violets",
		type: "Townsfolk"
	},
	juggler: {
		id: "juggler",
		firstNightReminder: "",
		otherNightReminder: "Give a finger signal.",
		reminders: [
			"Correct",
			"Correct",
			"Correct",
			"Correct",
			"Correct"
		],
		setup: false,
		flavor: "For my next trick, as per request, I will need a flower, a bag of beans, a toy snake, a paintbrush, and a motorized gasoline-powered hedge trimming device. I warn you, this trick may be my last. Oh dear.",
		firstNight: 0,
		otherNight: 77,
		summary: "On your 1st day, publicly guess up to 5 players' characters. That night, you learn how many you got correct.",
		icon: "juggler",
		humanReadableRole: "Juggler",
		script: "Sects & Violets",
		type: "Townsfolk"
	},
	sage: {
		id: "sage",
		firstNightReminder: "",
		otherNightReminder: "If the Demon killed the Sage, wake the Sage and point to 2 players, 1 of which is the Demon.",
		reminders: [],
		setup: false,
		flavor: "These mountainous tomes guard the secret, I am sure of it! Twixt word and word, it lies in wait. More candles, boy! More ink! These notes may look arcane, but the infernal puzzle is revealing itself.",
		firstNight: 0,
		otherNight: 57,
		summary: "If the Demon kills you, you learn that it is 1 of 2 players.",
		icon: "sage",
		humanReadableRole: "Sage",
		script: "Sects & Violets",
		type: "Townsfolk"
	},
	noble: {
		id: "noble",
		firstNightReminder: "Point to all three players marked *KNOW*.",
		otherNightReminder: "",
		reminders: [
			"Know",
			"Know",
			"Know"
		],
		setup: false,
		flavor: "Sarcasm is indeed the lowest form of wit. But speaking in response to your criticism, Sir, it is, nevertheless, a form of wit.",
		firstNight: 59,
		otherNight: 0,
		summary: "You start knowing 3 players, 1 and only 1 of which is evil.",
		icon: "noble",
		humanReadableRole: "Noble",
		script: "",
		type: "Townsfolk"
	},
	bountyhunter: {
		id: "bountyhunter",
		firstNightReminder: "Point to the *KNOWN* player.",
		otherNightReminder: "If the *KNOWN* player died today or tonight, point to a new *KNOWN* player.",
		reminders: ["Known"],
		setup: false,
		flavor: "Alone, I walk these streets, paved with the sick stench of corruption. Its thickness worms its way into my nostrils, unbidden, burning with revulsion. And anticipation. The illness of this wretched place grows each night. And I... I am the cure.",
		firstNight: 63,
		otherNight: 81,
		jinxes: [{
			id: "philosopher",
			reason: "If the Philosopher gains the Bounty Hunter ability, a Townsfolk might turn evil."
		}, {
			id: "kazali",
			reason: "An evil Townsfolk is only created if the Bounty Hunter is still in play after the Kazali acts."
		}],
		summary: "You start knowing 1 evil player. If the player you know dies, you learn another evil player tonight. [1 Townsfolk is evil]",
		icon: "bountyhunter",
		humanReadableRole: "Bounty Hunter",
		script: "",
		type: "Townsfolk"
	},
	pixie: {
		id: "pixie",
		firstNightReminder: "Show the Townsfolk character token marked *MAD*.",
		otherNightReminder: "",
		reminders: ["Mad", "Has Ability"],
		setup: false,
		flavor: "Round and round the garden, go. Little girls run to and fro. Little boys climb up the tree. Which of these should Pixie be? Ladies smile and go to town.  Lords with axe chop forest down. What’s yours is mine. What’s mine, divine. Silly little Pixie, me.",
		firstNight: 42,
		otherNight: 0,
		summary: "You start knowing 1 in-play Townsfolk. If you were mad that you were this character, you gain their ability when they die.",
		icon: "pixie",
		humanReadableRole: "Pixie",
		script: "",
		type: "Townsfolk"
	},
	general: {
		id: "general",
		firstNightReminder: "Give a thumb signal.",
		otherNightReminder: "Give a thumb signal.",
		reminders: [],
		setup: false,
		flavor: "I don’t have time for quotes.",
		firstNight: 69,
		otherNight: 87,
		summary: "Each night, you learn which alignment the Storyteller believes is winning: good, evil, or neither.",
		icon: "general",
		humanReadableRole: "General",
		script: "",
		type: "Townsfolk"
	},
	preacher: {
		id: "preacher",
		firstNightReminder: "The Preacher chooses a player.  If they chose a Minion: Put the Preacher to sleep. Wake the target. Show the *THIS CHARACTER SELECTED YOU* token and the Preacher token.",
		otherNightReminder: "The Preacher chooses a player.  If they chose a Minion: Put the Preacher to sleep. Wake the target. Show the *THIS CHARACTER SELECTED YOU* token and the Preacher token.",
		reminders: [
			"No Ability",
			"No Ability",
			"No Ability"
		],
		setup: false,
		flavor: "It is better to be rich and healthy than poor and sick.",
		firstNight: 23,
		otherNight: 11,
		summary: "Each night, choose a player: a Minion, if chosen, learns this. All chosen Minions have no ability.",
		icon: "preacher",
		humanReadableRole: "Preacher",
		script: "",
		type: "Townsfolk"
	},
	king: {
		id: "king",
		firstNightReminder: "Wake the Demon. Show the *THIS PLAYER IS* token and the King token, then point to the King.",
		otherNightReminder: "If the dead equal or outnumber the living, show the character token of an alive player.",
		reminders: [],
		setup: false,
		flavor: "Betwixt the unknown strains of mortal strife / And morbid night, sweet with mystery and woe / Lies unfettered joys of fate’s long and colored life / Who’s garden blooms with each painted Face to Show.",
		firstNight: 19,
		otherNight: 80,
		summary: "Each night, if the dead equal or outnumber the living, you learn 1 alive character. The Demon knows you are the King.",
		icon: "king",
		humanReadableRole: "King",
		script: "",
		type: "Townsfolk"
	},
	balloonist: {
		id: "balloonist",
		firstNightReminder: "Show any player.",
		otherNightReminder: "Show a player with a different character type to previously.",
		reminders: ["Know"],
		setup: true,
		flavor: "More heat! Higher! Higher! Più alto! Ahhh... it is so beautiful from up here, don't you agree? Can you see the children fishing by the river, under the willow? Can you see the  glint of the sun on the circus tent-poles? What's this? An old man, alone, passed out in the vineyard? Less heat! Lower! Lower! Vai più in basso!",
		firstNight: 60,
		otherNight: 78,
		summary: "Each night, you learn a player of a different character type than last night. [+0 or +1 Outsider]",
		icon: "balloonist",
		humanReadableRole: "Balloonist",
		script: "",
		type: "Townsfolk"
	},
	cultleader: {
		id: "cultleader",
		firstNightReminder: "The Cult Leader might change alignment. If so, show the *YOU ARE* info token and a thumbs up or down for their new alignment.",
		otherNightReminder: "The Cult Leader might change alignment. If so, show the *YOU ARE* info token and a thumbs up or down for their new alignment.",
		reminders: [],
		setup: false,
		flavor: "Thinking themselves wise, they became fools.",
		firstNight: 65,
		otherNight: 83,
		summary: "Each night, you become the alignment of an alive neighbor. If all good players choose to join your cult, your team wins.",
		icon: "cultleader",
		humanReadableRole: "Cult Leader",
		script: "",
		type: "Townsfolk"
	},
	lycanthrope: {
		id: "lycanthrope",
		firstNightReminder: "",
		otherNightReminder: "The Lycanthrope chooses a player",
		reminders: ["Faux Paw", "Dead"],
		setup: false,
		flavor: "Beneath the thin veneer of civilisation lies a howling madness.",
		firstNight: 0,
		otherNight: 33,
		summary: "Each night*, choose an alive player. If good, they die & the Demon doesn’t kill tonight. One good player registers as evil.",
		icon: "lycanthrope",
		humanReadableRole: "Lycanthrope",
		script: "",
		type: "Townsfolk"
	},
	amnesiac: {
		id: "amnesiac",
		firstNightReminder: "Run the Amnesiac's ability, if applicable.",
		otherNightReminder: "Run the Amnesiac's ability, if applicable.",
		reminders: [
			"?",
			"?",
			"?"
		],
		setup: false,
		flavor: "Wait. What. Who? Oh, ok. Wait. What?",
		firstNight: 45,
		otherNight: 63,
		summary: "You do not know what your ability is. Each day, privately guess what it is: you learn how accurate you are.",
		icon: "amnesiac",
		humanReadableRole: "Amnesiac",
		script: "",
		type: "Townsfolk"
	},
	nightwatchman: {
		id: "nightwatchman",
		firstNightReminder: "The Nightwatchman might choose a player  Put the Nightwatchman to sleep. Wake the target and show the *THIS PLAYER IS* and Nightwatchman tokens and point to the Nightwatchman.",
		otherNightReminder: "The Nightwatchman might choose a player  Put the Nightwatchman to sleep. Wake the target and show the *THIS PLAYER IS* and Nightwatchman tokens and point to the Nightwatchman.",
		reminders: ["No Ability"],
		setup: false,
		flavor: "The night is cold and lonely, but I have the moon, the stars, the crisp wind and the soft thud of leather boots on cobbled stone for company. Yonder, candlelight flickers behind a murky window...",
		firstNight: 64,
		otherNight: 82,
		summary: "Once per game, at night, choose a player: they learn you are the Nightwatchman.",
		icon: "nightwatchman",
		humanReadableRole: "Nightwatchman",
		script: "",
		type: "Townsfolk"
	},
	engineer: {
		id: "engineer",
		firstNightReminder: "The Engineer might choose Minions or Demons.  If they do: Put the Engineer to sleep. Wake a target, show them the *YOU ARE* token and their new character token, then put that target to sleep. Repeat for all players that changed characters.",
		otherNightReminder: "The Engineer might choose Minions or Demons.  If they do: Put the Engineer to sleep. Wake a target, show them the *YOU ARE* token and their new character token, then put that target to sleep. Repeat for all players that changed characters.",
		reminders: ["No Ability"],
		setup: false,
		flavor: "If it bends, great. If it breaks, well, it probably needed fixing anyway.",
		firstNight: 22,
		otherNight: 10,
		summary: "Once per game, at night, choose which Minions or which Demon is in play.",
		icon: "engineer",
		humanReadableRole: "Engineer",
		script: "",
		type: "Townsfolk"
	},
	fisherman: {
		id: "fisherman",
		firstNightReminder: "",
		otherNightReminder: "",
		reminders: ["No Ability"],
		setup: false,
		flavor: "This was my favourite part of the river... see how the sunlight makes a rainbow from the monastery to the market? This was the best place for big fish. And the older I get, the bigger they were.",
		firstNight: 0,
		otherNight: 0,
		summary: "Once per game, during the day, visit the Storyteller for some advice to help your team win.",
		icon: "fisherman",
		humanReadableRole: "Fisherman",
		script: "",
		type: "Townsfolk"
	},
	huntsman: {
		id: "huntsman",
		firstNightReminder: "The Huntsman might choose a player.  If that player was the Damsel: Put the Huntsman to sleep. Wake the Damsel and show them the *YOU ARE* info token and their new character token.",
		otherNightReminder: "The Huntsman might choose a player.  If that player was the Damsel: Put the Huntsman to sleep. Wake the Damsel and show them the *YOU ARE* info token and their new character token.",
		reminders: ["No Ability"],
		setup: true,
		flavor: "My cabin is warm and sturdy. My axe by the door, my boots drying by the fire, and elk stew a-simmering… Hark! A scream echoes through the valley! The rain and the mud and the cold, cold wind mask the scent of the wolves, but I know the path and my pace is steady. I am coming.",
		firstNight: 43,
		otherNight: 61,
		summary: "Once per game, at night, choose a living player: the Damsel, if chosen, becomes a not-in-play Townsfolk. [+the Damsel]",
		icon: "huntsman",
		humanReadableRole: "Huntsman",
		script: "",
		type: "Townsfolk"
	},
	alchemist: {
		id: "alchemist",
		firstNightReminder: "Show the *YOU ARE* token and the character token of a Minion.",
		otherNightReminder: "",
		reminders: [],
		remindersGlobal: ["Is The Alchemist"],
		setup: false,
		special: [{
			type: "reveal",
			name: "replace-character"
		}],
		flavor: "Visit the interior of the Earth. By rectification thou shalt find the hidden stone. Above the gold, lieth the red. Kether in Malkuth.",
		firstNight: 10,
		otherNight: 0,
		summary: "You have a Minion ability. When using this, the Storyteller may prompt you to choose differently.",
		icon: "alchemist",
		humanReadableRole: "Alchemist",
		script: "",
		type: "Townsfolk"
	},
	farmer: {
		id: "farmer",
		firstNightReminder: "",
		otherNightReminder: "If the Farmer died tonight, wake an alive good player. Show them the *YOU ARE* info token and a Farmer character token. Replace their previous token with the Farmer token.",
		reminders: [],
		setup: false,
		flavor: "Even the high and mighty need food on the table. Without us, the city starves.",
		firstNight: 0,
		otherNight: 64,
		summary: "When you die at night, an alive good player becomes a Farmer.",
		icon: "farmer",
		humanReadableRole: "Farmer",
		script: "",
		type: "Townsfolk"
	},
	magician: {
		id: "magician",
		firstNightReminder: "Include the Magician in the Minion and Demon Info steps.",
		otherNightReminder: "",
		reminders: [],
		setup: false,
		flavor: "1... 2... Abra... 3... 4... Cadabra... *poof!* And, as you can see, ladies and gentlemen, Captain Farnsworth’s bag of gold has disappeared! Gone! Without a trace! Thank you, and goodnight!",
		firstNight: 13,
		otherNight: 0,
		summary: "The Demon thinks you are a Minion. Minions think you are a Demon.",
		icon: "magician",
		humanReadableRole: "Magician",
		script: "",
		type: "Townsfolk"
	},
	choirboy: {
		id: "choirboy",
		firstNightReminder: "",
		otherNightReminder: "If the Demon killed the King, point to the Demon player.",
		reminders: [],
		setup: true,
		flavor: "I saw it, I did. I was in the pews, tidying the hymn books, when a dreadful tune started from the pipe organ. The organist had a long cloak, and long fingers on the keys. And a hat that looked… just like… yours.",
		firstNight: 0,
		otherNight: 60,
		summary: "If the Demon kills the King, you learn which player is the Demon. [+the King]",
		icon: "choirboy",
		humanReadableRole: "Choirboy",
		script: "",
		type: "Townsfolk"
	},
	poppygrower: {
		id: "poppygrower",
		firstNightReminder: "Do not do the Minion Info and Demon Info steps. Wake the Demon, show the *THESE CHARACTERS ARE NOT IN PLAY* info token and any three good character tokens that are not in play.",
		otherNightReminder: "If the Poppy Grower died today or tonight, wake the Minions, show the *THIS IS THE DEMON* info token and point to the Demon. Put them to sleep. Wake the Demon, show the *THESE ARE YOUR MINIONS* info token and point to the Minions. Put the Demon to sleep.",
		reminders: ["Evil Wakes"],
		setup: false,
		flavor: "In the hidden groves of the deep forest, the black poppy dwells. To see its revelry is to be enchanted. To smell its thick aroma is to be lost forever, a slave to the gods of light and dark.",
		firstNight: 11,
		otherNight: 8,
		summary: "Minions & Demons do not know each other. If you die, they learn who each other are that night.",
		icon: "poppygrower",
		humanReadableRole: "Poppy Grower",
		script: "",
		type: "Townsfolk"
	},
	atheist: {
		id: "atheist",
		firstNightReminder: "",
		otherNightReminder: "",
		reminders: [],
		setup: true,
		special: [{
			type: "selection",
			name: "bag-duplicate"
		}],
		flavor: "Let us disperse with unnecessary conjecture and silly paranoia. There is a perfectly rational explanation for everything. Yes, a teacup may indeed be orbiting the planet, too small to see, but I shall drink my tea from the very real china in my very real hands.",
		firstNight: 0,
		otherNight: 0,
		summary: "The Storyteller can break the game rules, and if executed, good wins, even if you are dead. [No evil characters]",
		icon: "atheist",
		humanReadableRole: "Atheist",
		script: "",
		type: "Townsfolk"
	},
	cannibal: {
		id: "cannibal",
		firstNightReminder: "",
		otherNightReminder: "Wake the Cannibal and treat them like they have the ability of the most recently killed executee.",
		reminders: ["Poisoned", "Lunch"],
		setup: false,
		flavor: "I don’t like clowns. They taste funny.",
		firstNight: 0,
		otherNight: 0,
		jinxes: [
			{
				id: "butler",
				reason: "If the Cannibal gains the Butler ability, the Cannibal learns this."
			},
			{
				id: "juggler",
				reason: "If the Juggler guesses on their first day and dies by execution, tonight the living Cannibal learns how many guesses the Juggler got correct."
			},
			{
				id: "zealot",
				reason: "If the Cannibal gains the Zealot ability, the Cannibal learns this."
			},
			{
				id: "poppygrower",
				reason: "If the Cannibal eats the Poppy Grower, then dies or loses the Poppy Grower ability, the Demon and Minions learn each other that night."
			}
		],
		summary: "You have the ability of the recently killed executee. If they are evil, you are poisoned until a good player dies by execution.",
		icon: "cannibal",
		humanReadableRole: "Cannibal",
		script: "",
		type: "Townsfolk"
	},
	hermit: {
		icon: "hermit",
		id: "hermit",
		humanReadableRole: "Hermit",
		type: "Outsider",
		edition: "",
		reminders: [
			"1",
			"2",
			"3"
		],
		setup: true,
		summary: "You have all Outsider abilities. [-0 or -1 Outsider]",
		flavor: "In the lost and forgotten places of the earth, the soul’s light beckons.",
		firstNight: 0,
		otherNight: 0
	},
	acrobat: {
		id: "acrobat",
		firstNightReminder: "",
		otherNightReminder: "The Acrobat chooses a player.",
		reminders: ["Dead", "Chosen"],
		setup: false,
		flavor: "Welcome, one and all, to the greatest show on earth.",
		firstNight: 0,
		otherNight: 18,
		summary: "Each night*, choose a player: if they are or become drunk or poisoned tonight, you die.",
		icon: "acrobat",
		humanReadableRole: "Acrobat",
		script: "",
		type: "Townsfolk"
	},
	knight: {
		id: "knight",
		firstNightReminder: "Point to the two non-Demon players marked *KNOW*.",
		reminders: ["Know", "Know"],
		setup: false,
		flavor: "When a man lies, he murders some part of the world.",
		firstNight: 58,
		otherNight: 0,
		summary: "You start knowing 2 players that are not the Demon.",
		icon: "knight",
		humanReadableRole: "Knight",
		script: "",
		type: "Townsfolk"
	},
	steward: {
		id: "steward",
		firstNightReminder: "Point to the good player marked *KNOW*.",
		reminders: ["Know"],
		setup: false,
		flavor: "How DARE you accuse Her Ladyship of wrongdoing? I’ve known her my entire life! All nine years!",
		firstNight: 57,
		otherNight: 0,
		summary: "You start knowing 1 good player.",
		icon: "steward",
		humanReadableRole: "Steward",
		script: "",
		type: "Townsfolk"
	},
	highpriestess: {
		id: "highpriestess",
		firstNightReminder: "Point to a player.",
		otherNightReminder: "Point to a player.",
		reminders: [],
		setup: false,
		flavor: "There is life behind the personality that uses personalities as masks. There are times when life puts off the mask and deep answers to deep.",
		firstNight: 68,
		otherNight: 86,
		summary: "Each night, learn which player the Storyteller believes you should talk to most.",
		icon: "highpriestess",
		humanReadableRole: "High Priestess",
		script: "",
		type: "Townsfolk"
	},
	shugenja: {
		id: "shugenja",
		firstNightReminder: "Point clockwise or anticlockwise around the circle.",
		otherNightReminder: "",
		reminders: [],
		setup: false,
		flavor: "これは夢。それも夢。すべて夢です。",
		firstNight: 61,
		otherNight: 0,
		summary: "You start knowing if your closest evil player is clockwise or anti-clockwise. If equidistant, this info is arbitrary.",
		icon: "shugenja",
		humanReadableRole: "Shugenja",
		script: "",
		type: "Townsfolk"
	},
	villageidiot: {
		id: "villageidiot",
		firstNightReminder: "Choose a Village Idiot to be drunk. Wake the Village Idiots one at a time, they choose a player, show either good or evil thumbs according to the alignment of that player.",
		otherNightReminder: "Wake the Village Idiots one at a time, they choose a player, show either good or evil thumbs according to the alignment of that player.",
		reminders: ["Drunk"],
		setup: true,
		special: [{
			type: "selection",
			name: "bag-duplicate"
		}],
		flavor: "Roses are blue, and violets are red, Please reverse what I just said.",
		firstNight: 62,
		otherNight: 79,
		summary: "Each night, choose a player: you learn their alignment. [+0 to +2 Village Idiots. 1 of the extras is drunk]",
		icon: "villageidiot",
		humanReadableRole: "Village Idiot",
		script: "",
		type: "Townsfolk"
	},
	banshee: {
		id: "banshee",
		firstNightReminder: "",
		otherNightReminder: "If the Banshee was killed by the Demon tonight, announce to all players that the Banshee has died.",
		reminders: ["Has Ability"],
		setup: false,
		flavor: "Gorm do shúile, dearg do ghruaig, ní bheidh sé i bhfad, is a mbeidh tú san uaigh.",
		firstNight: 0,
		otherNight: 58,
		summary: "If the Demon kills you, all players learn this. From now on, you may nominate twice per day and vote twice per nomination.",
		icon: "banshee",
		humanReadableRole: "Banshee",
		script: "",
		type: "Townsfolk"
	},
	alsaahir: {
		id: "alsaahir",
		reminders: [],
		setup: false,
		flavor: "I am here because of you, and you are here because of me.",
		firstNight: 0,
		otherNight: 0,
		summary: "Each day, if you publicly guess which players are Minion(s) and which are Demon(s), good wins.",
		icon: "alsaahir",
		humanReadableRole: "Alsaahir",
		script: "",
		type: "Townsfolk"
	},
	minioninfo: {
		id: "minioninfo",
		firstNightReminder: "If there are 7 or more players, wake all Minions:\n	Show the *THIS IS THE DEMON* token. Point to the Demon.\n	Show the *THESE ARE YOUR MINIONS* token. Point to the other Minions.",
		firstNight: 14,
		otherNight: 0,
		icon: "minioninfo",
		humanReadableRole: "Minion Info",
		script: "special",
		type: "Minion"
	},
	poisoner: {
		id: "poisoner",
		firstNightReminder: "The Poisoner chooses a player.",
		otherNightReminder: "The Poisoner chooses a player.",
		reminders: ["Poisoned"],
		setup: false,
		flavor: "Add compound Alpha to compound Beta... NOT TOO MUCH!",
		firstNight: 27,
		otherNight: 13,
		summary: "Each night, choose a player: they are poisoned tonight and tomorrow day.",
		icon: "poisoner",
		humanReadableRole: "Poisoner",
		script: "Trouble Brewing",
		type: "Minion"
	},
	spy: {
		id: "spy",
		firstNightReminder: "Show the Grimoire for as long as the Spy needs.",
		otherNightReminder: "Show the Grimoire for as long as the Spy needs.",
		reminders: [],
		setup: false,
		special: [{
			type: "signal",
			name: "grimoire",
			time: "night"
		}],
		flavor: "Any brewmaster worth their liquor, knows no concoction pours trouble quicker, than one where spies seem double.",
		firstNight: 66,
		otherNight: 85,
		jinxes: [
			{
				id: "alchemist",
				reason: "If the Alchemist has the Spy ability, they do not see the Grimoire, and the real Spy cannot register falsely."
			},
			{
				id: "magician",
				reason: "When the Spy sees the Grimoire, the Demon and Magician's character tokens are removed."
			},
			{
				id: "poppygrower",
				reason: "If the Poppy Grower is in play, the Spy does not see the Grimoire until the Poppy Grower dies."
			},
			{
				id: "damsel",
				reason: "If the Spy is (or has been) in play, the Damsel is poisoned."
			},
			{
				id: "ogre",
				reason: "The Spy registers as evil to the Ogre."
			}
		],
		summary: "Each night, you see the Grimoire. You might register as good & as a Townsfolk or Outsider, even if dead.",
		icon: "spy",
		humanReadableRole: "Spy",
		script: "Trouble Brewing",
		type: "Minion"
	},
	scarletwoman: {
		id: "scarletwoman",
		firstNightReminder: "",
		otherNightReminder: "If the Scarlet Woman became the Demon today, show them the *YOU ARE* token, then the Demon token.",
		reminders: ["Is The Demon"],
		setup: false,
		flavor: "You have shown me the secrets of the Council of the Purple Flame. We have lain together in fire and in lust and in beastly commune, and I am forever your servant. But tonight, my dear, I am your master.",
		firstNight: 0,
		otherNight: 29,
		jinxes: [{
			id: "fanggu",
			reason: "If the Fang Gu chooses an Outsider and dies, the Scarlet Woman does not become the Fang Gu."
		}, {
			id: "alhadikhia",
			reason: "If there are two living Al-Hadikhias, the Scarlet Woman Al-Hadikhia becomes the Scarlet Woman again."
		}],
		summary: "If there are 5 or more players alive & the Demon dies, you become the Demon. (Travellers don't count.)",
		icon: "scarletwoman",
		humanReadableRole: "Scarlet Woman",
		script: "Trouble Brewing",
		type: "Minion"
	},
	baron: {
		id: "baron",
		firstNightReminder: "",
		otherNightReminder: "",
		reminders: [],
		setup: true,
		flavor: "This town has gone to the dogs, what? Cheap foreign labor... that's the ticket. Stuff them in the mine, I say. A bit of hard work never hurt anyone, and a clip'o'the ears to any brigand who says otherwise. It's all about the bottom line, what?",
		firstNight: 0,
		otherNight: 0,
		summary: "There are extra Outsiders in play. [+2 Outsiders]",
		icon: "baron",
		humanReadableRole: "Baron",
		script: "Trouble Brewing",
		type: "Minion"
	},
	godfather: {
		id: "godfather",
		firstNightReminder: "Show the character tokens of all in-play Outsiders.",
		otherNightReminder: "If an Outsider died today, the Godfather chooses a player.",
		reminders: ["Died Today", "Dead"],
		setup: true,
		flavor: "Normally, it's just business. But when you insult my daughter, you insult me. And when you insult me, you insult my family. You really should be more careful - it would be a shame if you had an unfortunate accident.",
		firstNight: 32,
		otherNight: 52,
		summary: "You start knowing which Outsiders are in play. If 1 died today, choose a player tonight: they die. [-1 or +1 Outsider]",
		icon: "godfather",
		humanReadableRole: "Godfather",
		script: "Bad Moon Rising",
		type: "Minion"
	},
	devilsadvocate: {
		id: "devilsadvocate",
		firstNightReminder: "The Devil's Advocate chooses a living player.",
		otherNightReminder: "The Devil's Advocate chooses a living player.",
		reminders: ["Survives Execution"],
		setup: false,
		flavor: "My client, should the objection be overruled, pleads innocent by virtue of the prosecution's non-observance of statute 27.B - incorrect or misleading conjugation of a verb. The fact that nine of the jury died last night is simply prima facie, which is, as Wills vs Thule set precedent for, further reason to acquit.",
		firstNight: 34,
		otherNight: 22,
		summary: "Each night, choose a living player (different to last night): if executed tomorrow, they don't die.",
		icon: "devilsadvocate",
		humanReadableRole: "Devil's Advocate",
		script: "Bad Moon Rising",
		type: "Minion"
	},
	assassin: {
		id: "assassin",
		firstNightReminder: "",
		otherNightReminder: "The Assassin might choose a player.",
		reminders: ["Dead", "No Ability"],
		setup: false,
		flavor: "...",
		firstNight: 0,
		otherNight: 51,
		summary: "Once per game, at night*, choose a player: they die, even if for some reason they could not.",
		icon: "assassin",
		humanReadableRole: "Assassin",
		script: "Bad Moon Rising",
		type: "Minion"
	},
	mastermind: {
		id: "mastermind",
		firstNightReminder: "",
		otherNightReminder: "",
		reminders: [],
		setup: false,
		flavor: "The tentacles of that monster are nailed to the doors of the church. Mothers and children are dancing in the street. Excellent. Everything is proceeding exactly as I have planned.",
		firstNight: 0,
		otherNight: 0,
		jinxes: [{
			id: "alhadikhia",
			reason: "If the Al-Hadikhia dies by execution, and the Mastermind is alive, the Al-Hadikhia chooses 3 good players tonight: if all 3 choose to live, evil wins. Otherwise, good wins."
		}],
		summary: "If the Demon dies by execution (ending the game), play for 1 more day. If a player is then executed, their team loses.",
		icon: "mastermind",
		humanReadableRole: "Mastermind",
		script: "Bad Moon Rising",
		type: "Minion"
	},
	eviltwin: {
		id: "eviltwin",
		firstNightReminder: "Wake both twins. Allow eye contact. Show the good twin's character token to the Evil Twin & vice versa.",
		otherNightReminder: "",
		reminders: ["Twin"],
		setup: false,
		flavor: "I'm not Sara! I'm Clara! SHE is Sara! Sara is the evil one! Not me!",
		firstNight: 35,
		otherNight: 0,
		summary: "You & an opposing player know each other. If the good player is executed, evil wins. Good can't win if you both live.",
		icon: "eviltwin",
		humanReadableRole: "Evil Twin",
		script: "Sects & Violets",
		type: "Minion"
	},
	witch: {
		id: "witch",
		firstNightReminder: "The Witch chooses a player.",
		otherNightReminder: "The Witch chooses a player.",
		reminders: ["Cursed"],
		setup: false,
		flavor: "Three drops of goat's blood. A lock of hair, torn in anger. The name is spoken, the shadow cast. Walk left foot first down that brambled path, and don't look back.",
		firstNight: 36,
		otherNight: 23,
		summary: "Each night, choose a player: if they nominate tomorrow, they die. If just 3 players live, you lose this ability.",
		icon: "witch",
		humanReadableRole: "Witch",
		script: "Sects & Violets",
		type: "Minion"
	},
	cerenovus: {
		id: "cerenovus",
		firstNightReminder: "The Cerenovus chooses a player & a character.  Put the Cerenovus to sleep. Wake the target. Show the *THIS CHARACTER SELECTED YOU* token, the Cerenovus token, then the madness-character token.",
		otherNightReminder: "The Cerenovus chooses a player & a character.  Put the Cerenovus to sleep. Wake the target. Show the *THIS CHARACTER SELECTED YOU* token, the Cerenovus token, then the madness-character token.",
		reminders: ["Mad"],
		setup: false,
		flavor: "Reality is merely an opinion. Specifically, my opinion.",
		firstNight: 37,
		otherNight: 24,
		jinxes: [{
			id: "goblin",
			reason: "The Cerenovus may choose to make a player mad that they are the Goblin."
		}],
		summary: "Each night, choose a player & a good character: they are “mad” they are this character tomorrow, or might be executed.",
		icon: "cerenovus",
		humanReadableRole: "Cerenovus",
		script: "Sects & Violets",
		type: "Minion"
	},
	pithag: {
		id: "pithag",
		firstNightReminder: "",
		otherNightReminder: "The Pit-Hag chooses a player & a character. If they chose a character that is not in play: Put the Pit-Hag to sleep. Wake the target. Show the *YOU ARE* token & their new character token.",
		reminders: [],
		setup: false,
		flavor: "Round about the cauldron go; In the poison'd entrails throw; Toad, that under cold stone; Days and nights has thirty-one; Sweated venom sleeping got; Boil thou first in the charmed pot.",
		firstNight: 0,
		otherNight: 25,
		jinxes: [
			{
				id: "damsel",
				reason: "If a Pit-Hag creates a Damsel, the Storyteller chooses which player it is."
			},
			{
				id: "politician",
				reason: "If the Pit-Hag turns an evil player into the Politician, they can't turn good due to their own ability."
			},
			{
				id: "villageidiot",
				reason: "If there is a spare token, the Pit-Hag can create an extra Village Idiot. If so, the drunk Village Idiot might change."
			},
			{
				id: "cultleader",
				reason: "If the Pit-Hag turns an evil player into the Cult Leader, they can't turn good due to their own ability."
			},
			{
				id: "goon",
				reason: "If the Pit-Hag turns an evil player into the Goon, they can't turn good due to their own ability."
			},
			{
				id: "ogre",
				reason: "If the Pit-Hag turns an evil player into the Ogre, they can't turn good due to their own ability."
			}
		],
		summary: "Each night*, choose a player & a character they become (if not in play). If a Demon is made, deaths tonight are arbitrary.",
		icon: "pithag",
		humanReadableRole: "Pit-Hag",
		script: "Sects & Violets",
		type: "Minion"
	},
	widow: {
		id: "widow",
		firstNightReminder: "Show the Grimoire for as long as the Widow needs. The Widow chooses a player.",
		otherNightReminder: "",
		reminders: ["Poisoned", "Knows"],
		remindersGlobal: [],
		setup: false,
		special: [{
			name: "grimoire",
			type: "signal",
			time: "night"
		}],
		flavor: "More wine? Château d’Ergot ’07 is a very special vintage. My yes, very special indeed.",
		firstNight: 28,
		otherNight: 0,
		jinxes: [
			{
				id: "alchemist",
				reason: "If the Alchemist has the Widow ability, they do not see the Grimoire."
			},
			{
				id: "magician",
				reason: "When the Widow sees the Grimoire, the Demon and Magician's character tokens are removed."
			},
			{
				id: "poppygrower",
				reason: "If the Poppy Grower is in play, the Widow does not see the Grimoire until the Poppy Grower dies."
			},
			{
				id: "damsel",
				reason: "If the Widow is (or has been) in play, the Damsel is poisoned."
			}
		],
		summary: "On your 1st night, look at the Grimoire & choose a player: they are poisoned. 1 good player knows a Widow is in play.",
		icon: "widow",
		humanReadableRole: "Widow",
		script: "",
		type: "Minion"
	},
	fearmonger: {
		id: "fearmonger",
		firstNightReminder: "The Fearmonger chooses a player.  Declare that \"the Fearmonger has chosen a player.\"",
		otherNightReminder: "The Fearmonger chooses a player.  If the player wasn't already marked with the *FEAR* reminder, declare that \"the Fearmonger has chosen a player.\"",
		reminders: ["Fear"],
		setup: false,
		flavor: "Beware of gazing long into the Abyss, lest the Abyss also gaze into you.",
		firstNight: 38,
		otherNight: 26,
		summary: "Each night, choose a player: if you nominate & execute them, their team loses. All players know if you choose a new player.",
		icon: "fearmonger",
		humanReadableRole: "Fearmonger",
		script: "",
		type: "Minion"
	},
	psychopath: {
		id: "psychopath",
		firstNightReminder: "",
		otherNightReminder: "",
		reminders: [],
		setup: false,
		flavor: "Surprise!",
		firstNight: 0,
		otherNight: 0,
		summary: "Each day, before nominations, you may publicly choose a player: they die. If executed, you only die if you lose roshambo.",
		icon: "psychopath",
		humanReadableRole: "Psychopath",
		script: "",
		type: "Minion"
	},
	goblin: {
		id: "goblin",
		firstNightReminder: "",
		otherNightReminder: "",
		reminders: ["Claimed"],
		setup: false,
		flavor: "You don’t want to insult the goblins. You really, really don’t. On a completely different note… can I have another piece of cake?",
		firstNight: 0,
		otherNight: 0,
		summary: "If you publicly claim to be the Goblin when nominated & are executed that day, your team wins.",
		icon: "goblin",
		humanReadableRole: "Goblin",
		script: "",
		type: "Minion"
	},
	mezepheles: {
		id: "mezepheles",
		firstNightReminder: "Show the written word.",
		otherNightReminder: "If a player is marked with the *TURNS EVIL* reminder, wake them. Show the *YOU ARE* info token and a thumbs down. The Mezepheles loses their ability",
		reminders: ["Turns Evil", "No Ability"],
		setup: false,
		flavor: "That which issues from the heart alone, will bend the hearts of others to your own.",
		firstNight: 40,
		otherNight: 28,
		summary: "You start knowing a secret word. The 1st good player to say this word becomes evil that night.",
		icon: "mezepheles",
		humanReadableRole: "Mezepheles",
		script: "",
		type: "Minion"
	},
	marionette: {
		id: "marionette",
		firstNightReminder: "Wake the Demon. Point to the player marked *IS THE MARIONETTE* and show the *THIS PLAYER IS* token and the Marionette character token.",
		otherNightReminder: "",
		reminders: [],
		remindersGlobal: ["Is The Marionette"],
		setup: true,
		special: [{
			type: "selection",
			name: "bag-disabled"
		}, {
			type: "reveal",
			name: "replace-character"
		}],
		flavor: "Words, words. They're all we have to go on.",
		firstNight: 21,
		otherNight: 0,
		jinxes: [
			{
				id: "lilmonsta",
				reason: "The Marionette neighbors a Minion, not the Demon. The Marionette is not woken to choose who takes the Lil' Monsta token, and does not learn they are the Marionette if they have the Lil' Monsta token."
			},
			{
				id: "poppygrower",
				reason: "When the Poppy Grower dies, the Demon learns the Marionette but the Marionette learns nothing."
			},
			{
				id: "snitch",
				reason: "The Marionette does not learn 3 not in-play characters. The Demon learns an extra 3 instead."
			},
			{
				id: "balloonist",
				reason: "If the Marionette thinks that they are the Balloonist, +1 Outsider might have been added."
			},
			{
				id: "damsel",
				reason: "The Marionette does not learn that a Damsel is in play."
			},
			{
				id: "huntsman",
				reason: "If the Marionette thinks that they are the Huntsman, the Damsel was added."
			}
		],
		summary: "You think you are a good character, but you are not. The Demon knows who you are. [You neighbor the Demon]",
		icon: "marionette",
		humanReadableRole: "Marionette",
		script: "",
		type: "Minion"
	},
	boomdandy: {
		id: "boomdandy",
		firstNightReminder: "",
		otherNightReminder: "",
		reminders: [],
		setup: false,
		special: [{
			type: "ability",
			name: "pointing",
			time: "day"
		}],
		flavor: "Tick... Tick... Tick... TOCK.",
		firstNight: 0,
		otherNight: 0,
		summary: "If you are executed, all but 3 players die. After a 10 to 1 countdown, the player with the most players pointing at them, dies.",
		icon: "boomdandy",
		humanReadableRole: "Boomdandy",
		script: "",
		type: "Minion"
	},
	organgrinder: {
		id: "organgrinder",
		firstNightReminder: "The Organ Grinder either nods their head yes to be drunk, or shakes their head no to be sober.",
		otherNightReminder: "The Organ Grinder either nods their head yes to be drunk, or shakes their head no to be sober.",
		reminders: ["About To Die", "Drunk"],
		setup: false,
		special: [{
			type: "vote",
			name: "hidden"
		}],
		flavor: "Round and round the handles go. The more you dance the less you know.",
		firstNight: 33,
		otherNight: 21,
		summary: "All players keep their eyes closed when voting and the vote tally is secret. Each night, choose if you are drunk until dusk.",
		icon: "organgrinder",
		humanReadableRole: "Organ Grinder",
		script: "",
		type: "Minion"
	},
	vizier: {
		id: "vizier",
		firstNightReminder: "Announce the Vizier player to the group.",
		reminders: [],
		setup: false,
		flavor: "An excellent decision, as always, sire. Such a petty crime as bumping into the Bishop indeed deserves your ‘justice’ and ‘mercy’. Take a stroll in the gardens. Visit the gallery and peruse the sculptures of Von Strauf. Relax, sire. Leave everything… to me.",
		firstNight: 74,
		otherNight: 0,
		jinxes: [
			{
				id: "investigator",
				reason: "If the Investigator learns that the Vizier is in play, the existence of the Vizier is not announced by the Storyteller."
			},
			{
				id: "preacher",
				reason: "If the Vizier loses their ability, they learn this. If the Vizier is executed while they have their ability, their team wins."
			},
			{
				id: "courtier",
				reason: "If the Vizier loses their ability, they learn this. If the Vizier is executed while they have their ability, their team wins."
			},
			{
				id: "magician",
				reason: "If the Vizier and Magician are both in play, the Demon does not learn the Minions."
			},
			{
				id: "fearmonger",
				reason: "The Vizier wakes with the Fearmonger, learns who they choose and cannot choose to immediately execute that player."
			},
			{
				id: "politician",
				reason: "The Politician might register as evil to the Vizier."
			},
			{
				id: "alsaahir",
				reason: "If the Vizier is in play, the Alsaahir must also guess which Demon(s) are in play."
			},
			{
				id: "zealot",
				reason: "The Zealot might register as evil to the Vizier."
			}
		],
		summary: "All players know you are the Vizier. You cannot die during the day. If good voted, you may choose to execute immediately.",
		icon: "vizier",
		humanReadableRole: "Vizier",
		script: "",
		type: "Minion"
	},
	harpy: {
		id: "harpy",
		firstNightReminder: "The Harpy chooses two players.   Put the Harpy to sleep. Wake the 1st target. Show the *THIS CHARACTER SELECTED YOU* token, the Harpy token, then point to the 2nd target.",
		otherNightReminder: "The Harpy chooses two players.   Put the Harpy to sleep. Wake the 1st target. Show the *THIS CHARACTER SELECTED YOU* token, the Harpy token, then point to the 2nd target.",
		reminders: ["Mad", "2nd"],
		setup: false,
		flavor: "So fair a day I never did see, nor so fowl a presence hanging over me.",
		firstNight: 39,
		otherNight: 27,
		summary: "Each night, choose 2 players: tomorrow, the 1st player is mad that the 2nd is evil, or one or both might die.",
		icon: "harpy",
		humanReadableRole: "Harpy",
		script: "",
		type: "Minion"
	},
	summoner: {
		id: "summoner",
		firstNightReminder: "Show the *THESE CHARACTERS ARE NOT IN PLAY* token. Show 3 not-in-play good character tokens.",
		otherNightReminder: "Change the Summoner reminder token to the relevant night. If it is night 3, the Summoner chooses a player and a Demon. Put the Summoner to sleep. Wake the chosen player. Show the *YOU ARE* token, a thumbs down and the chosen Demon token.",
		reminders: [
			"Night 1",
			"Night 2",
			"Night 3"
		],
		setup: true,
		flavor: "Hail the guardians of the north; by my intellect, thou art cut. Hail the guardians of the east; by my will, thou art dominated. Hail the guardians of the south; by that which lies beyond, the mystery is revealed. Hail the guardians of the west; a shield in the darkness",
		firstNight: 17,
		otherNight: 30,
		jinxes: [
			{
				id: "clockmaker",
				reason: "If the Summoner is in play, the Clockmaker does not receive their information until a Demon is created."
			},
			{
				id: "alchemist",
				reason: "If there is an Alchemist-Summoner in play, the game starts with a Demon in play, as normal. If the Alchemist-Summoner chooses a player, they make that player a Demon but do not change their alignment."
			},
			{
				id: "poppygrower",
				reason: "If the Poppy Grower is alive when the Summoner acts, the Summoner chooses which Demon, but the Storyteller chooses which player."
			},
			{
				id: "marionette",
				reason: "The Marionette neighbors the Summoner. The Summoner knows who the Marionette is."
			},
			{
				id: "pithag",
				reason: "The Summoner cannot create an in-play Demon. If the Summoner creates a not-in-play Demon, deaths tonight are arbitrary."
			},
			{
				id: "hatter",
				reason: "The Summoner cannot create an in-play Demon. If the Summoner creates a not-in-play Demon, deaths tonight are arbitrary."
			},
			{
				id: "courtier",
				reason: "If the Summoner is drunk on the 3rd night, the Summoner chooses which Demon, but the Storyteller chooses which player."
			},
			{
				id: "engineer",
				reason: "If the Engineer removes a Summoner from play before that Summoner uses their ability, the Summoner uses their ability immediately."
			},
			{
				id: "zombuul",
				reason: "If the Summoner turns a dead player into the Zombuul, the Storyteller treats that player as a Zombuul that has died once."
			},
			{
				id: "pukka",
				reason: "The Summoner may choose a player to become the Pukka on the 2nd night."
			},
			{
				id: "legion",
				reason: "If the Summoner creates Legion, most players (including all evil players) become evil Legion."
			},
			{
				id: "kazali",
				reason: "The Summoner cannot create an in-play Demon. If the Summoner creates a not-in-play Demon, deaths tonight are arbitrary."
			},
			{
				id: "preacher",
				reason: "If the Preacher chose the Summoner on or before the 3rd night, the Summoner chooses which Demon, but the Storyteller chooses which player."
			},
			{
				id: "lordoftyphon",
				reason: "If the Summoner creates a Lord of Typhon, the Lord of Typhon must neighbor a Minion. The other neighbor becomes a not-in-play evil Minion."
			}
		],
		summary: "You get 3 bluffs. On the 3rd night, choose a player: they become an evil Demon of your choice. [No Demon]",
		icon: "summoner",
		humanReadableRole: "Summoner",
		script: "",
		type: "Minion"
	},
	boffin: {
		id: "boffin",
		firstNightReminder: "Wake the Boffin and the Demon. Show the not-in-play good character token. Put the Boffin and the Demon to sleep.",
		reminders: [],
		setup: false,
		flavor: "Stellar hydrogen, vast, inert; carbon, oxygen, neon gases, all ruined. Molecular chaos, entropy, yields new cosmic phenomena, rebirth from atomic chaos, dense matter collapsing. All in a teeny little bottle.",
		firstNight: 8,
		otherNight: 0,
		jinxes: [
			{
				id: "cultleader",
				reason: "If the Demon has the Cult Leader ability, they can’t turn good due to this ability."
			},
			{
				id: "goon",
				reason: "If the Demon has the Goon ability, they can’t turn good due to this ability."
			},
			{
				id: "ogre",
				reason: "The Demon cannot have the Ogre ability."
			},
			{
				id: "politician",
				reason: "The Demon cannot have the Politician ability."
			},
			{
				id: "drunk",
				reason: "If the Demon would have the Drunk ability, the Boffin chooses a Townsfolk player to have this ability instead."
			},
			{
				id: "alchemist",
				reason: "If the Alchemist has the Boffin ability, the Alchemist does not learn what ability the Demon has."
			},
			{
				id: "villageidiot",
				reason: "If there is a spare token, the Boffin can give the Demon the Village Idiot ability."
			}
		],
		summary: "The Demon (even if drunk or poisoned) has a not-in-play good character’s ability. You both know which.",
		icon: "boffin",
		humanReadableRole: "Boffin",
		script: "",
		type: "Minion"
	},
	xaan: {
		id: "xaan",
		firstNightReminder: "Mark the Xaan with the *NIGHT 1* reminder. If X is 1, mark the Xaan with the *X* reminder token.",
		otherNightReminder: "Change the Xaan reminder token to the relevant night. If it is night X, mark the Xaan with the *X* reminder token.",
		reminders: [
			"Night 1",
			"Night 2",
			"Night 3",
			"X"
		],
		setup: true,
		flavor: "Down they fall. One by one. By two, by three, by five.",
		firstNight: 26,
		otherNight: 12,
		summary: "On night X, all Townsfolk are poisoned until dusk. [X Outsiders]",
		icon: "xaan",
		humanReadableRole: "Xaan",
		script: "",
		type: "Minion"
	},
	wizard: {
		id: "wizard",
		firstNightReminder: "Run the Wizard's ability, if applicable.",
		otherNightReminder: "Run the Wizard's ability, if applicable.",
		reminders: ["?", "?"],
		setup: false,
		flavor: "Every man and every woman is a star. Love is the law, love under will.",
		firstNight: 30,
		otherNight: 16,
		summary: "Once per game, choose to make a wish. If granted, it might have a price & leave a clue as to its nature.",
		icon: "wizard",
		humanReadableRole: "Wizard",
		script: "",
		type: "Minion"
	},
	butler: {
		id: "butler",
		firstNightReminder: "The Butler chooses a player.",
		otherNightReminder: "The Butler chooses a player.",
		reminders: ["Master"],
		setup: false,
		flavor: "Yes, sir... No, sir... Certainly, sir.",
		firstNight: 52,
		otherNight: 84,
		jinxes: [{
			id: "organgrinder",
			reason: "If the Organ Grinder is causing eyes closed voting, the Butler may raise their hand to vote but their vote is only counted if their master voted too."
		}],
		summary: "Each night, choose a player (not yourself): tomorrow, you may only vote if they are voting too.",
		icon: "butler",
		humanReadableRole: "Butler",
		script: "Trouble Brewing",
		type: "Outsider"
	},
	drunk: {
		id: "drunk",
		firstNightReminder: "",
		otherNightReminder: "",
		reminders: [],
		remindersGlobal: ["Is The Drunk"],
		setup: true,
		special: [{
			type: "selection",
			name: "bag-disabled"
		}, {
			type: "reveal",
			name: "replace-character"
		}],
		flavor: "I’m only a *hic* social drinker, my dear. Admittedly, I am a heavy *burp* socializer.",
		firstNight: 0,
		otherNight: 0,
		summary: "You do not know you are the Drunk. You think you are a Townsfolk character, but you are not.",
		icon: "drunk",
		humanReadableRole: "Drunk",
		script: "Trouble Brewing",
		type: "Outsider"
	},
	recluse: {
		id: "recluse",
		firstNightReminder: "",
		otherNightReminder: "",
		reminders: [],
		setup: false,
		flavor: "Garn git ya darn grub ya mitts ofma lorn yasee. Grr. Natsy pikkins yonder southwise ye begittin afta ya! Git! Me harvy no so widda licks and demmons no be fightin' hadsup ne'er ma kin. Git, assay!",
		firstNight: 0,
		otherNight: 0,
		summary: "You might register as evil & as a Minion or Demon, even if dead.",
		icon: "recluse",
		humanReadableRole: "Recluse",
		script: "Trouble Brewing",
		type: "Outsider"
	},
	saint: {
		id: "saint",
		firstNightReminder: "",
		otherNightReminder: "",
		reminders: [],
		setup: false,
		flavor: "Wisdom begets peace. Patience begets wisdom. Fear not, for the time shall come when fear too shall pass. Let us pray, and may the unity of our vision make saints of us all.",
		firstNight: 0,
		otherNight: 0,
		summary: "If you die by execution, your team loses.",
		icon: "saint",
		humanReadableRole: "Saint",
		script: "Trouble Brewing",
		type: "Outsider"
	},
	tinker: {
		id: "tinker",
		firstNightReminder: "",
		otherNightReminder: "The Tinker might die.",
		reminders: ["Dead"],
		setup: false,
		flavor: "I think I see the problem. Luckily, I have an idea! This catapult will shoot twice as far with just a minor adjustment...",
		firstNight: 0,
		otherNight: 65,
		summary: "You might die at any time.",
		icon: "tinker",
		humanReadableRole: "Tinker",
		script: "Bad Moon Rising",
		type: "Outsider"
	},
	moonchild: {
		id: "moonchild",
		firstNightReminder: "",
		otherNightReminder: "If the Moonchild is due to kill a good player, they die.",
		reminders: ["Dead"],
		setup: false,
		flavor: "Scorpio looks sideways at the lovers, and you have a choice to make. With silver cross my palm, and your fate shall be revealed. With steel cross my throat, and by the stars you shall regret it.",
		firstNight: 0,
		otherNight: 66,
		summary: "When you learn that you died, publicly choose 1 alive player. Tonight, if it was a good player, they die.",
		icon: "moonchild",
		humanReadableRole: "Moonchild",
		script: "Bad Moon Rising",
		type: "Outsider"
	},
	goon: {
		id: "goon",
		firstNightReminder: "",
		otherNightReminder: "",
		reminders: ["Drunk"],
		setup: false,
		flavor: "Yes boss. I explained fings real good to dat geezer. He don't want me explain it again. Nah boss, I don't need no doctor - it's only a knife wound. Be right come mornin'",
		firstNight: 0,
		otherNight: 0,
		summary: "Each night, the 1st player to choose you with their ability is drunk until dusk. You become their alignment.",
		icon: "goon",
		humanReadableRole: "Goon",
		script: "Bad Moon Rising",
		type: "Outsider"
	},
	lunatic: {
		id: "lunatic",
		firstNightReminder: "If there are 7 or more players, wake the Lunatic: Show the *THESE ARE YOUR MINIONS* token. Point to any players. Show the *THESE CHARACTERS ARE NOT IN PLAY* token. Show 3 good character tokens. Put the Lunatic to sleep. Wake the Demon. Show the *YOU ARE* info token and the Demon token. Show the *THIS PLAYER IS* info token and the Lunatic token, then point to the Lunatic.",
		otherNightReminder: "Do whatever needs to be done to simulate the Demon acting. Put the Lunatic to sleep. Wake the Demon. Show the Lunatic token & point to them, then their target(s).",
		reminders: [
			"Chosen",
			"Chosen",
			"Chosen"
		],
		setup: false,
		flavor: "I am the night... I think.",
		firstNight: 16,
		otherNight: 31,
		summary: "You think you are a Demon, but you are not. The Demon knows who you are & who you choose at night.",
		icon: "lunatic",
		humanReadableRole: "Lunatic",
		script: "Bad Moon Rising",
		type: "Outsider"
	},
	mutant: {
		id: "mutant",
		firstNightReminder: "",
		otherNightReminder: "",
		reminders: [],
		setup: false,
		flavor: "I am not a freak! I am a human being! Have mercy!",
		firstNight: 0,
		otherNight: 0,
		summary: "If you are “mad” about being an Outsider, you might be executed.",
		icon: "mutant",
		humanReadableRole: "Mutant",
		script: "Sects & Violets",
		type: "Outsider"
	},
	sweetheart: {
		id: "sweetheart",
		firstNightReminder: "",
		otherNightReminder: "If the Sweetheart died, a player became drunk immediately. If you haven't done this yet, do so now.",
		reminders: ["Drunk"],
		setup: false,
		flavor: "I will never forget her. Never.",
		firstNight: 0,
		otherNight: 56,
		summary: "When you die, 1 player is drunk from now on.",
		icon: "sweetheart",
		humanReadableRole: "Sweetheart",
		script: "Sects & Violets",
		type: "Outsider"
	},
	barber: {
		id: "barber",
		firstNightReminder: "",
		otherNightReminder: "If the Barber died today or tonight, show the Demon the *THIS CHARACTER SELECTED YOU* & Barber tokens. If the Demon chose 2 players, wake one at a time. Show the *YOU ARE* token & their new character token.",
		reminders: ["Haircuts Tonight"],
		setup: false,
		flavor: "Did you know that barbery and surgery were once the same profession? No? Well, now you do.",
		firstNight: 0,
		otherNight: 55,
		summary: "If you died today or tonight, the Demon may choose 2 players (not another Demon) to swap characters.",
		icon: "barber",
		humanReadableRole: "Barber",
		script: "Sects & Violets",
		type: "Outsider"
	},
	klutz: {
		id: "klutz",
		firstNightReminder: "",
		otherNightReminder: "",
		reminders: [],
		setup: false,
		flavor: "Oops.",
		firstNight: 0,
		otherNight: 0,
		summary: "When you learn that you died, publicly choose 1 alive player: if they are evil, your team loses.",
		icon: "klutz",
		humanReadableRole: "Klutz",
		script: "Sects & Violets",
		type: "Outsider"
	},
	princess: {
		id: "princess",
		humanReadableRole: "Princess",
		type: "Townsfolk",
		edition: "",
		icon: "princess",
		script: "",
		otherNightReminder: "If the Princess nominated the player who was executed today, the Demon wakes as normal, but no one dies to the Demon's ability.",
		reminders: ["Doesn't Kill"],
		setup: false,
		summary: "On your 1st day, if you nominated & executed a player, the Demon doesn't kill tonight.",
		flavor: "Our words are hounds, bound by silken threads, dear lords. Let kindness weave them true, lest the reigns unravel and rend our court.",
		firstNight: 0,
		otherNight: 35
	},
	wraith: {
		id: "wraith",
		humanReadableRole: "Wraith",
		type: "Minion",
		icon: "wraith",
		edition: "",
		firstNightReminder: "Wake the Wraith whenever other evil players wake.",
		otherNightReminder: "Wake the Wraith whenever other evil players wake.",
		reminders: [],
		setup: false,
		summary: "You may choose to open your eyes at night. You wake when other evil players do.",
		special: [{
			type: "player",
			name: "open-eyes",
			time: "night"
		}],
		firstNight: 2,
		otherNight: 2
	},
	snitch: {
		id: "snitch",
		firstNightReminder: "Wake each Minion. Show the *THESE CHARACTERS ARE NOT IN PLAY* token and three not-in-play character tokens. Put each Minion to sleep.",
		otherNightReminder: "",
		reminders: [],
		setup: false,
		flavor: "It was John.",
		firstNight: 15,
		otherNight: 0,
		summary: "Each Minion gets 3 bluffs.",
		icon: "snitch",
		humanReadableRole: "Snitch",
		script: "",
		type: "Outsider"
	},
	puzzlemaster: {
		id: "puzzlemaster",
		firstNightReminder: "",
		otherNightReminder: "",
		reminders: ["Drunk", "Guess Used"],
		setup: false,
		flavor: "When one begins to think that some thing is merely some other thing, one is usually on the brink of an error. Patience, patience. Don’t confuse just and should with is and isn’t.",
		firstNight: 0,
		otherNight: 0,
		summary: "1 player is drunk, even if you die. If you guess (once) who it is, learn the Demon player, but guess wrong & get false info.",
		icon: "puzzlemaster",
		humanReadableRole: "Puzzlemaster",
		script: "",
		type: "Outsider"
	},
	heretic: {
		id: "heretic",
		firstNightReminder: "",
		otherNightReminder: "",
		reminders: [],
		setup: false,
		flavor: "After the hail has smashed the roof and splintered the glass of the Cathedral windows, it melts again into the earth, like a dying lamb in the desert sun. Such is the parable of the madman.",
		firstNight: 0,
		otherNight: 0,
		jinxes: [
			{
				id: "godfather",
				reason: "Only 1 jinxed character can be in play."
			},
			{
				id: "baron",
				reason: "The Baron might only add 1 Outsider, not 2."
			},
			{
				id: "pithag",
				reason: "A Pit-Hag cannot create a Heretic."
			},
			{
				id: "spy",
				reason: "Only 1 jinxed character can be in play."
			},
			{
				id: "widow",
				reason: "Only 1 jinxed character can be in play."
			},
			{
				id: "lleech",
				reason: "If the Lleech has poisoned the Heretic then the Lleech dies, the Heretic remains poisoned."
			},
			{
				id: "boffin",
				reason: "The Demon cannot have the Heretic ability."
			}
		],
		summary: "Whoever wins, loses & whoever loses, wins, even if you are dead.",
		icon: "heretic",
		humanReadableRole: "Heretic",
		script: "",
		type: "Outsider"
	},
	damsel: {
		id: "damsel",
		firstNightReminder: "If the Damsel was chosen by the Huntsman, show them the *YOU ARE* info token and their new character token.",
		otherNightReminder: "If the Damsel was chosen by the Huntsman, show them the *YOU ARE* info token and their new character token.",
		reminders: ["Guess Used"],
		setup: false,
		flavor: "Don't touch the hair, honey.",
		firstNight: 44,
		otherNight: 62,
		summary: "All Minions know a Damsel is in play. If a Minion publicly guesses you (once), your team loses.",
		icon: "damsel",
		humanReadableRole: "Damsel",
		script: "",
		type: "Outsider"
	},
	golem: {
		id: "golem",
		firstNightReminder: "",
		otherNightReminder: "",
		reminders: ["May Not Nominate"],
		setup: false,
		flavor: "Golem help? Golem smash! Golem help.",
		firstNight: 0,
		otherNight: 0,
		summary: "You may only nominate once per game. When you do, if the nominee is not the Demon, they die.",
		icon: "golem",
		humanReadableRole: "Golem",
		script: "",
		type: "Outsider"
	},
	politician: {
		id: "politician",
		firstNightReminder: "",
		otherNightReminder: "",
		reminders: [],
		setup: false,
		flavor: "I'm glad you asked that question. Truly, I am. But I think the REAL question here is...",
		firstNight: 0,
		otherNight: 0,
		summary: "If you were the player most responsible for your team losing, you change alignment & win, even if dead.",
		icon: "politician",
		humanReadableRole: "Politician",
		script: "",
		type: "Outsider"
	},
	plaguedoctor: {
		id: "plaguedoctor",
		firstNightReminder: "",
		otherNightReminder: "",
		reminders: ["Storyteller Ability"],
		setup: false,
		flavor: "Pleauze shtay shtill. Thinks nid tiime for hillink. Myrhh-myrhh.",
		firstNight: 0,
		otherNight: 0,
		jinxes: [
			{
				id: "eviltwin",
				reason: "The Storyteller cannot gain the Evil Twin ability if the Plague Doctor dies."
			},
			{
				id: "fearmonger",
				reason: "If the Plague Doctor dies, a living Minion gains the Fearmonger ability in addition to their own ability, and learns this."
			},
			{
				id: "goblin",
				reason: "If the Plague Doctor dies, a living Minion gains the Goblin ability in addition to their own ability, and learns this."
			},
			{
				id: "spy",
				reason: "If the Plague Doctor dies, a living Minion gains the Spy ability in addition to their own ability, and learns this."
			},
			{
				id: "scarletwoman",
				reason: "If the Plague Doctor dies, a living Minion gains the Scarlet Woman ability in addition to their own ability, and learns this."
			},
			{
				id: "boomdandy",
				reason: "If the Plague Doctor is executed and the Storyteller would gain the Boomdandy ability, the Boomdandy ability triggers immediately."
			},
			{
				id: "baron",
				reason: "If the Storyteller gains the Baron ability, up to two players become not-in-play Outsiders."
			},
			{
				id: "marionette",
				reason: "If the Demon has a neighbor who is alive and a Townsfolk or Outsider when the Plague Doctor dies, that player becomes an evil Marionette. If there is already an extra evil player, this does not happen."
			}
		],
		summary: "When you die, the Storyteller gains a Minion ability.",
		icon: "plaguedoctor",
		humanReadableRole: "Plague Doctor",
		script: "",
		type: "Outsider"
	},
	hatter: {
		id: "hatter",
		firstNightReminder: "",
		otherNightReminder: "If the Hatter died today or tonight, wake Minions and Demons, allow them to choose new characters.",
		reminders: ["Tea Party Tonight"],
		setup: false,
		flavor: "One Hat. Too Hat. Three Hat. Tea Hat. Fore Hat. Thrive Hat. Six Hat. Sticks Hat.",
		firstNight: 0,
		otherNight: 54,
		summary: "If you died today or tonight, the Minion & Demon players may choose new Minion & Demon characters to be.",
		icon: "hatter",
		humanReadableRole: "Hatter",
		script: "",
		type: "Outsider"
	},
	ogre: {
		id: "ogre",
		firstNightReminder: "The Ogre points to a player.",
		reminders: ["Friend"],
		setup: false,
		flavor: "<grunt><grin></grunt>",
		firstNight: 67,
		otherNight: 0,
		jinxes: [{
			id: "recluse",
			reason: "If the Recluse registers as evil to the Ogre, the Ogre learns that they are evil."
		}],
		summary: "On your 1st night, choose a player (not yourself): you become their alignment (you don't know which) even if drunk or poisoned.",
		icon: "ogre",
		humanReadableRole: "Ogre",
		script: "",
		type: "Outsider"
	},
	zealot: {
		id: "zealot",
		reminders: [],
		setup: false,
		flavor: "I enjoy talking to you. Your mind appeals to me. It resembles my own mind except that you happen to be insane.",
		firstNight: 0,
		otherNight: 0,
		summary: "If there are 5 or more players alive, you must vote for every nomination.",
		icon: "zealot",
		humanReadableRole: "Zealot",
		script: "",
		type: "Outsider"
	},
	bureaucrat: {
		id: "bureaucrat",
		firstNightReminder: "The Bureaucrat chooses a player.",
		otherNightReminder: "The Bureaucrat chooses a player.",
		reminders: ["3 Votes"],
		setup: false,
		special: [{
			type: "vote",
			name: "multiplier",
			value: 3
		}],
		flavor: "Sign here please. And here. And here. Aaaaaaaaand here. This should all be sorted and tallied by the end of the day, assuming everyone's signatures are legible. We haven't had a mix-up in the paperwork for ages. Yesterday noon, if memory serves...",
		firstNight: 6,
		otherNight: 3,
		summary: "Each night, choose a player (not yourself): their vote counts as 3 votes tomorrow.",
		icon: "bureaucrat",
		humanReadableRole: "Bureaucrat",
		script: "Trouble Brewing",
		type: "Traveller"
	},
	thief: {
		id: "thief",
		firstNightReminder: "The Thief chooses a player.",
		otherNightReminder: "The Thief chooses a player.",
		reminders: ["Negative Vote"],
		setup: false,
		special: [{
			type: "vote",
			name: "multiplier",
			value: -1
		}],
		flavor: "I ain't done nuffink. I weren't even in dat alley last night! It weren't me what stole Mayor Bruno's briefcase wiv all dem fancy dockoments innit. Besides, it was too 'eavy to carry far.",
		firstNight: 7,
		otherNight: 4,
		summary: "Each night, choose a player (not yourself): their vote counts negatively tomorrow.",
		icon: "thief",
		humanReadableRole: "Thief",
		script: "Trouble Brewing",
		type: "Traveller"
	},
	gunslinger: {
		id: "gunslinger",
		firstNightReminder: "",
		otherNightReminder: "",
		reminders: [],
		setup: false,
		flavor: "It's time someone took matters into their own hands. That someone... is me.",
		firstNight: 0,
		otherNight: 0,
		summary: "Each day, after the 1st vote has been tallied, you may choose a player that voted: they die.",
		icon: "gunslinger",
		humanReadableRole: "Gunslinger",
		script: "Trouble Brewing",
		type: "Traveller"
	},
	scapegoat: {
		id: "scapegoat",
		firstNightReminder: "",
		otherNightReminder: "",
		reminders: [],
		setup: false,
		flavor: "Good evening! Thank you for inviting me to the ball. I'm not from around here, but you sure seem like a friendly bunch, by golly. I'm sure we'll get along just dandy. What's all that rope for?",
		firstNight: 0,
		otherNight: 0,
		summary: "If a player of your alignment is executed, you might be executed instead.",
		icon: "scapegoat",
		humanReadableRole: "Scapegoat",
		script: "Trouble Brewing",
		type: "Traveller"
	},
	beggar: {
		id: "beggar",
		firstNightReminder: "",
		otherNightReminder: "",
		reminders: [],
		setup: false,
		flavor: "Alms for the poor, good Sir? Spare a coin, Madam? Thank you. God bless! You're a right kind soul and no mistake! I'll have some swanky nosh tonight, I will!",
		firstNight: 0,
		otherNight: 0,
		summary: "You must use a vote token to vote. If a dead player gives you theirs, you learn their alignment. You are sober & healthy.",
		icon: "beggar",
		humanReadableRole: "Beggar",
		script: "Trouble Brewing",
		type: "Traveller"
	},
	apprentice: {
		id: "apprentice",
		firstNightReminder: "Show the Apprentice the 'You are' card, then a Townsfolk or Minion token. In the Grimoire, replace the Apprentice token with that character token, and put the Apprentice's 'Is the Apprentice' reminder by that character token.",
		otherNightReminder: "",
		reminders: ["Is The Apprentice"],
		setup: false,
		special: [{
			type: "signal",
			name: "grimoire",
			time: "night"
		}],
		flavor: "For years have I traveled, studying the ways of The Craft. Which craft, you ask? Simply that of the simple folk. Nothing to worry about. Not yet.",
		firstNight: 4,
		otherNight: 0,
		summary: "On your 1st night, you gain a Townsfolk ability (if good), or a Minion ability (if evil).",
		icon: "apprentice",
		humanReadableRole: "Apprentice",
		script: "Bad Moon Rising",
		type: "Traveller"
	},
	matron: {
		id: "matron",
		firstNightReminder: "",
		otherNightReminder: "",
		reminders: [],
		setup: false,
		flavor: "Miss Featherbottom, be quiet. Master Rutherford, a teacup needs just the four fingers, please. I know you are a father of nine, but age, or lack there-of as the case may be, is never an excuse for poor manners.",
		firstNight: 0,
		otherNight: 0,
		summary: "Each day, you may choose up to 3 sets of 2 players to swap seats. Players may not leave their seats to talk in private.",
		icon: "matron",
		humanReadableRole: "Matron",
		script: "Bad Moon Rising",
		type: "Traveller"
	},
	judge: {
		id: "judge",
		firstNightReminder: "",
		otherNightReminder: "",
		reminders: ["No Ability"],
		setup: false,
		flavor: "I find the defendant guilty of the crimes of murder, fraud, arson, larceny, impersonating an officer of the law, practicing medicine without a license, slander, regicide, and littering.",
		firstNight: 0,
		otherNight: 0,
		summary: "Once per game, if another player nominated, you may choose to force the current execution to pass or fail.",
		icon: "judge",
		humanReadableRole: "Judge",
		script: "Bad Moon Rising",
		type: "Traveller"
	},
	bishop: {
		id: "bishop",
		firstNightReminder: "",
		otherNightReminder: "",
		reminders: ["Nominate Good", "Nominate Evil"],
		setup: false,
		flavor: "In nomine Patris, et Filii, et Spiritus Sancti… Nos mos Dei. Deus vult de nobis.",
		firstNight: 0,
		otherNight: 0,
		summary: "Only the Storyteller can nominate. At least 1 opposing player must be nominated each day.",
		icon: "bishop",
		humanReadableRole: "Bishop",
		script: "Bad Moon Rising",
		type: "Traveller"
	},
	voudon: {
		id: "voudon",
		firstNightReminder: "",
		otherNightReminder: "",
		reminders: [],
		setup: false,
		flavor: "Bien venu. Sit down. Breathe deep. Enter the land of the dead. See with their eyes. Speak with their voice. Yon sel lang se janm ase.",
		firstNight: 0,
		otherNight: 0,
		summary: "Only you & the dead can vote. They don't need a vote token to do so. A 50% majority isn't required.",
		icon: "voudon",
		humanReadableRole: "Voudon",
		script: "Bad Moon Rising",
		type: "Traveller"
	},
	barista: {
		id: "barista",
		firstNightReminder: "Choose a player, wake them and tell them which Barista power is affecting them. Treat them accordingly (sober/healthy/true info or activate their ability twice).",
		otherNightReminder: "Choose a player, wake them and tell them which Barista power is affecting them. Treat them accordingly (sober/healthy/true info or activate their ability twice).",
		reminders: [
			"Sober & Healthy",
			"Acts Twice",
			"?",
			"?"
		],
		setup: false,
		flavor: "A cup of coffee with no cream, Monsieur? I’m terribly sorry, but we’re fresh out of cream — how about with no milk?",
		firstNight: 5,
		otherNight: 2,
		summary: "Each night, until dusk, 1) a player becomes sober, healthy & gets true info, or 2) their ability works twice. They learn which.",
		icon: "barista",
		humanReadableRole: "Barista",
		script: "Sects & Violets",
		type: "Traveller"
	},
	harlot: {
		id: "harlot",
		firstNightReminder: "",
		otherNightReminder: "The Harlot points at any living player. Then, put the Harlot to sleep. Wake the chosen player, show them the 'This character selected you' token, then the Harlot token. That player either nods their head yes or shakes their head no. If they nodded their head yes, wake the Harlot and show them the chosen player's character token. Then, you may decide that both players die.",
		reminders: ["Dead", "Dead"],
		setup: false,
		flavor: "Enchanté, Sailor. You look like you need someone to really listen to your troubles. I'm a good listener. Very, very good.",
		firstNight: 0,
		otherNight: 5,
		summary: "Each night*, choose a living player: if they agree, you learn their character, but you both might die.",
		icon: "harlot",
		humanReadableRole: "Harlot",
		script: "Sects & Violets",
		type: "Traveller"
	},
	butcher: {
		id: "butcher",
		firstNightReminder: "",
		otherNightReminder: "",
		reminders: [],
		setup: false,
		flavor: "It tastes like chicken. More please.",
		firstNight: 0,
		otherNight: 0,
		summary: "Each day, after the 1st execution, you may nominate again.",
		icon: "butcher",
		humanReadableRole: "Butcher",
		script: "Sects & Violets",
		type: "Traveller"
	},
	bonecollector: {
		id: "bonecollector",
		firstNightReminder: "",
		otherNightReminder: "The Bone Collector either shakes their head no or points at any dead player. If they pointed at any dead player, put the Bone Collector's 'Has Ability' reminder by the chosen player's character token. (They may need to be woken tonight to use it.)",
		reminders: ["No Ability", "Has Ability"],
		setup: false,
		flavor: "I collect many things. Hair. Teeth. Clothes. Fragments of poems. The dreams of lost lovers. My secret arts are not for you to know but my fee is a mere pittance. Bring me the blood of a noblewoman who died of heartbreak under a full moon, and you shall have your answers.",
		firstNight: 0,
		otherNight: 6,
		summary: "Once per game, at night*, choose a dead player: they regain their ability until dusk.",
		icon: "bonecollector",
		humanReadableRole: "Bone Collector",
		script: "Sects & Violets",
		type: "Traveller"
	},
	deviant: {
		id: "deviant",
		firstNightReminder: "",
		otherNightReminder: "",
		reminders: [],
		setup: false,
		flavor: "Twas the lady's quip, forsooth.",
		firstNight: 0,
		otherNight: 0,
		summary: "If you were funny today, you cannot die by exile.",
		icon: "deviant",
		humanReadableRole: "Deviant",
		script: "Sects & Violets",
		type: "Traveller"
	},
	gangster: {
		id: "gangster",
		firstNightReminder: "",
		otherNightReminder: "",
		reminders: [],
		setup: false,
		flavor: "I like your shoes. It would be such a shame if you had a little accident, and they got ruined. Now that you mention it, I like your cufflinks too.",
		firstNight: 0,
		otherNight: 0,
		summary: "Once per day, you may choose to kill an alive neighbor, if your other alive neighbor agrees.",
		icon: "gangster",
		humanReadableRole: "Gangster",
		script: "",
		type: "Traveller"
	},
	gnome: {
		id: "gnome",
		firstNightReminder: "",
		otherNightReminder: "",
		reminders: ["Amigo"],
		setup: false,
		flavor: "Four the score or seven beers, no shows are goes for me and my. A prank to crack the cranks and planks o’ the floor foundation length, so incontravertabubbilly mini. The large essays down streams of joyse, no greater than is scene, not inherdt. Ha-urrumph.",
		firstNight: 0,
		otherNight: 0,
		summary: "All players start knowing a player of your alignment. You may choose to kill anyone who nominates them.",
		icon: "gnome",
		humanReadableRole: "Gnome",
		script: "",
		type: "Traveller"
	},
	demoninfo: {
		id: "demoninfo",
		firstNightReminder: "If there are 7 or more players, wake the Demon:\n	Show the *THESE ARE YOUR MINIONS* token. Point to all Minions.\n	Show the *THESE CHARACTERS ARE NOT IN PLAY* token. Show 3 not-in-play good character tokens.",
		firstNight: 18,
		otherNight: 0,
		icon: "demoninfo",
		humanReadableRole: "Demon Info",
		script: "special",
		type: "Demon"
	},
	imp: {
		id: "imp",
		firstNightReminder: "",
		otherNightReminder: "The Imp chooses a player.  If the Imp chose themselves: Replace 1 alive Minion token with a spare Imp token. Put the old Imp to sleep. Wake the new Imp. Show the *YOU ARE* token, then show the Imp token.",
		reminders: ["Dead"],
		setup: false,
		flavor: "We must keep our wits sharp and our sword sharper. Evil walks among us, and will stop at nothing to destroy us good, simple folk, bringing our fine town to ruin. Trust no-one. But, if you must trust someone, trust me.",
		firstNight: 0,
		otherNight: 35,
		summary: "Each night*, choose a player: they die. If you kill yourself this way, a Minion becomes the Imp.",
		icon: "imp",
		humanReadableRole: "Imp",
		script: "Trouble Brewing",
		type: "Demon"
	},
	zombuul: {
		id: "zombuul",
		firstNightReminder: "",
		otherNightReminder: "If no one died today, the Zombuul chooses a player.",
		reminders: ["Died Today", "Dead"],
		setup: false,
		flavor: "I do not. Understand. Your ways. Fellow human. Show me. The dirt. Where the holy. Lay. Sleeping. I too. Must sleep. Soon.",
		firstNight: 0,
		otherNight: 36,
		summary: "Each night*, if no-one died today, choose a player: they die. The 1st time you die, you live but register as dead.",
		icon: "zombuul",
		humanReadableRole: "Zombuul",
		script: "Bad Moon Rising",
		type: "Demon"
	},
	pukka: {
		id: "pukka",
		firstNightReminder: "The Pukka chooses a player.",
		otherNightReminder: "The Pukka chooses a player.  The previously poisoned player dies then becomes healthy.",
		reminders: [
			"Poisoned",
			"Poisoned",
			"Dead"
		],
		setup: false,
		flavor: "You truly have been kind welcoming me into your beautiful home. I am so sorry I accidentally scratched you. A little thing. No matter. But please, take this golden toothpick as a humble token of my regret.",
		firstNight: 41,
		otherNight: 37,
		summary: "Each night, choose a player: they are poisoned. The previously poisoned player dies then becomes healthy.",
		icon: "pukka",
		humanReadableRole: "Pukka",
		script: "Bad Moon Rising",
		type: "Demon"
	},
	shabaloth: {
		id: "shabaloth",
		firstNightReminder: "",
		otherNightReminder: "A previously chosen player might be resurrected.  The Shabaloth chooses 2 players.",
		reminders: [
			"Dead",
			"Dead",
			"Alive"
		],
		setup: false,
		flavor: "Blarg f'taag nm mataan! No sho gumtha m'sik na yuuu. Fluuuuuuuuurg h-sikkkh.",
		firstNight: 0,
		otherNight: 38,
		summary: "Each night*, choose 2 players: they die. A dead player you chose last night might be regurgitated.",
		icon: "shabaloth",
		humanReadableRole: "Shabaloth",
		script: "Bad Moon Rising",
		type: "Demon"
	},
	po: {
		id: "po",
		firstNightReminder: "",
		otherNightReminder: "The Po may choose a player OR chooses 3 players if they chose no-one last night.",
		reminders: [
			"Dead",
			"Dead",
			"Dead",
			"3 Attacks"
		],
		setup: false,
		flavor: "Would you like a flower? I'm so lonely.",
		firstNight: 0,
		otherNight: 39,
		summary: "Each night*, you may choose a player: they die. If your last choice was no-one, choose 3 players tonight.",
		icon: "po",
		humanReadableRole: "Po",
		script: "Bad Moon Rising",
		type: "Demon"
	},
	fanggu: {
		id: "fanggu",
		firstNightReminder: "",
		otherNightReminder: "The Fang Gu chooses a player.  If they chose an Outsider (once only): Replace the Outsider token with the spare Fang Gu token. Put the Fang Gu to sleep. Wake the target. Show the *YOU ARE* and Fang Gu tokens & give a thumbs-down.",
		reminders: ["Dead", "Once"],
		setup: true,
		flavor: "Your walls and your weapons are but smoke in dreams.",
		firstNight: 0,
		otherNight: 40,
		summary: "Each night*, choose a player: they die. The 1st Outsider this kills becomes an evil Fang Gu & you die instead. [+1 Outsider]",
		icon: "fanggu",
		humanReadableRole: "Fang Gu",
		script: "Sects & Violets",
		type: "Demon"
	},
	cacklejack: {
		id: "cacklejack",
		humanReadableRole: "Cacklejack",
		type: "Traveller",
		otherNight: 1,
		otherNightReminder: "Replace the character token of any player (besides the player the Cacklejack chose today) with a different character token. Wake that player and show them the 'You are' card and their new character token.",
		icon: "cacklejack",
		reminders: ["Not Me"],
		setup: false,
		summary: "Each day, choose a player: a different player changes character tonight"
	},
	vigormortis: {
		id: "vigormortis",
		firstNightReminder: "",
		otherNightReminder: "The Vigormortis chooses a player.  If that player is a Minion, poison a neighboring Townsfolk.",
		reminders: [
			"Dead",
			"Has Ability",
			"Has Ability",
			"Has Ability",
			"Poisoned",
			"Poisoned",
			"Poisoned"
		],
		setup: true,
		flavor: "All doors are one door. All keys are one key. All cups are one cup, but whosoever drinketh of the water that I give shall never thirst, but the water shall be in him a well springing up into everlasting life.",
		firstNight: 0,
		otherNight: 44,
		summary: "Each night*, choose a player: they die. Minions you kill keep their ability & poison 1 Townsfolk neighbor. [-1 Outsider]",
		icon: "vigormortis",
		humanReadableRole: "Vigormortis",
		script: "Sects & Violets",
		type: "Demon"
	},
	nodashii: {
		id: "nodashii",
		firstNightReminder: "",
		otherNightReminder: "The No Dashii chooses a player.",
		reminders: [
			"Dead",
			"Poisoned",
			"Poisoned"
		],
		setup: false,
		flavor: "By the sins of Arnoch, I feel thy laden stench. By the curs-ed sun and her foul legion of tiny grinning gods, I corrupt thee. By the blessed night and the hidden depths of the horrid and unholy sea, I end thy squalid life upon this plane.",
		firstNight: 0,
		otherNight: 41,
		summary: "Each night*, choose a player: they die. Your 2 Townsfolk neighbors are poisoned.",
		icon: "nodashii",
		humanReadableRole: "No Dashii",
		script: "Sects & Violets",
		type: "Demon"
	},
	vortox: {
		id: "vortox",
		firstNightReminder: "",
		otherNightReminder: "The Vortox chooses a player.",
		reminders: ["Dead"],
		setup: false,
		flavor: "Black is White. Right is Wrong. Left is Right. Up is Long. Down is Sight. Short is Blind. Follow me. Answers find.",
		firstNight: 0,
		otherNight: 42,
		jinxes: [{
			id: "banshee",
			reason: "If the Vortox is in play and the Demon kills the Banshee, the players still learn that the Banshee has died."
		}],
		summary: "Each night*, choose a player: they die. Townsfolk abilities yield false info. Each day, if no-one is executed, evil wins.",
		icon: "vortox",
		humanReadableRole: "Vortox",
		script: "Sects & Violets",
		type: "Demon"
	},
	lilmonsta: {
		id: "lilmonsta",
		firstNightReminder: "Wake all Minions, allow them to choose a babysitter.",
		otherNightReminder: "Wake all Minions, allow them to choose a babysitter.  A player might die.",
		reminders: [],
		remindersGlobal: ["Is The Demon", "Dead"],
		setup: true,
		special: [{
			type: "ability",
			name: "pointing",
			time: "night",
			global: "minion"
		}, {
			type: "selection",
			name: "bag-disabled"
		}],
		flavor: "Step 1: Be cute. Step 2: World domination. Step 3: Bweakfast.",
		firstNight: 24,
		otherNight: 48,
		jinxes: [
			{
				id: "poppygrower",
				reason: "If the Poppy Grower is in play, Minions don't wake together. They are woken one by one, until one of them chooses to take the Lil' Monsta token."
			},
			{
				id: "magician",
				reason: "Each night, the Magician chooses a Minion: if that Minion & Lil' Monsta are alive, that Minion babysits Lil’ Monsta."
			},
			{
				id: "scarletwoman",
				reason: "If there are 5 or more players alive and the player holding the Lil' Monsta token dies, the Scarlet Woman is given the Lil' Monsta token tonight."
			},
			{
				id: "vizier",
				reason: "The Vizier can die by execution if they are babysitting Lil' Monsta."
			},
			{
				id: "hatter",
				reason: "If a Demon chooses Lil' Monsta, they also choose a Minion to become and babysit Lil' Monsta tonight."
			}
		],
		summary: "Each night, Minions choose who babysits Lil' Monsta & \"is the Demon\". Each night*, a player might die. [+1 Minion]",
		icon: "lilmonsta",
		humanReadableRole: "Lil' Monsta",
		script: "",
		type: "Demon"
	},
	lleech: {
		id: "lleech",
		firstNightReminder: "The Lleech chooses a player.",
		otherNightReminder: "The Lleech chooses a player.",
		reminders: ["Dead", "Poisoned"],
		setup: false,
		flavor: "Tasty, tasty, tasty, tasty, tasty, tasty, tasty, tasty brai- I mean pie! Yes. Tasty pie. That’s what I meant to say.",
		firstNight: 25,
		otherNight: 47,
		jinxes: [{
			id: "mastermind",
			reason: "If the Mastermind is alive and the Lleech's host dies by execution, the Lleech lives but loses their ability."
		}, {
			id: "slayer",
			reason: "If the Slayer slays the Lleech's host, the host dies."
		}],
		summary: "Each night*, choose a player: they die. You start by choosing a player: they are poisoned. You die if & only if they are dead.",
		icon: "lleech",
		humanReadableRole: "Lleech",
		script: "",
		type: "Demon"
	},
	alhadikhia: {
		id: "alhadikhia",
		firstNightReminder: "",
		otherNightReminder: "The Al-Hadikhia chooses three players.    Wake the player marked *1* and say \"the Al-Hadikhia has chosen\", then the player's name, then \"Do you choose to live?\" They either nod or shake their head. Put them to sleep and add or remove shrouds accordingly. Repeat for players marked *2* and *3*. If all three players are now alive, add a shroud to all three.",
		reminders: [
			"1",
			"2",
			"3"
		],
		setup: false,
		flavor: "Alsukut min dhahab.",
		firstNight: 0,
		otherNight: 46,
		summary: "Each night*, you may choose 3 players (all players learn who): each silently chooses to live or die, but if all live, all die.",
		icon: "alhadikhia",
		humanReadableRole: "Al-Hadikhia",
		script: "",
		type: "Demon"
	},
	legion: {
		id: "legion",
		firstNightReminder: "",
		otherNightReminder: "A player might die.",
		reminders: ["Dead", "About To Die"],
		setup: true,
		special: [{
			type: "selection",
			name: "bag-duplicate"
		}],
		flavor: "We are the chill wind on a winter’s day. We are the shadow in the moonless night. We are the poison in your tea and the whisper in your ear. We are everywhere.",
		firstNight: 0,
		otherNight: 34,
		jinxes: [
			{
				id: "engineer",
				reason: "Legion and the Engineer cannot both be in play at the start of the game. If the Engineer creates Legion, most players (including all evil players) become evil Legion."
			},
			{
				id: "preacher",
				reason: "If the Preacher chooses Legion, Legion keeps their ability, but the Preacher might learn they are Legion."
			},
			{
				id: "minstrel",
				reason: "If Legion died by execution today, Legion keeps their ability, but the Minstrel might learn they are Legion."
			},
			{
				id: "hatter",
				reason: "If the Hatter dies and Legion is in play, nothing happens. If the Hatter dies and an evil player chooses Legion, all current evil players become Legion."
			},
			{
				id: "zealot",
				reason: "The Zealot might register as evil to Legion's ability."
			}
		],
		summary: "Each night*, a player might die. Executions fail if only evil voted. You register as a Minion too. [Most players are Legion]",
		icon: "legion",
		humanReadableRole: "Legion",
		script: "",
		type: "Demon"
	},
	leviathan: {
		id: "leviathan",
		firstNightReminder: "Declare that \"The Leviathan is in play.\" Mark the Leviathan with the *DAY 1* reminder.",
		otherNightReminder: "Optionally, declare that \"The Leviathan is in play.\" Replace the reminder token.",
		reminders: [
			"Day 1",
			"Day 2",
			"Day 3",
			"Day 4",
			"Day 5",
			"Good Player Executed"
		],
		setup: false,
		flavor: "To the last, I grapple with thee. From Hell’s heart, I stab at thee. For hate’s sake, I spit my last breath at thee.",
		firstNight: 73,
		otherNight: 91,
		jinxes: [
			{
				id: "soldier",
				reason: "If the Leviathan is in play, the Soldier is safe from all evil abilities."
			},
			{
				id: "monk",
				reason: "If the Leviathan is in play, the Monk-protected-player is safe from all evil abilities."
			},
			{
				id: "innkeeper",
				reason: "If the Leviathan is in play, the Innkeeper-protected-players are safe from all evil abilities."
			},
			{
				id: "ravenkeeper",
				reason: "Each night*, the Leviathan chooses an alive player (different to previous nights): a chosen Ravenkeeper uses their ability but does not die."
			},
			{
				id: "banshee",
				reason: "Each night*, the Leviathan chooses an alive good player (different to previous nights): a chosen Banshee dies & gains their ability."
			},
			{
				id: "sage",
				reason: "Each night*, the Leviathan chooses an alive good player (different to previous nights): a chosen Sage uses their ability but does not die."
			},
			{
				id: "farmer",
				reason: "Each night*, the Leviathan chooses an alive good player (different to previous nights): a chosen Farmer uses their ability but does not die."
			},
			{
				id: "mayor",
				reason: "If the Leviathan is in play & no execution occurs on day 5, good wins."
			},
			{
				id: "exorcist",
				reason: "Evil does not win when more than 1 good player has been executed, if the Exorcist is alive and has ever successfully chosen the Leviathan."
			},
			{
				id: "grandmother",
				reason: "If Leviathan is in play and the Grandchild dies by execution, evil wins."
			},
			{
				id: "king",
				reason: "If the Leviathan is in play, and at least 1 player is dead, the King learns an alive character each night."
			},
			{
				id: "hatter",
				reason: "If the Hatter dies on or after day 5, the Demon cannot choose Leviathan."
			},
			{
				id: "pithag",
				reason: "After day 5, the Pit-Hag cannot choose Leviathan."
			}
		],
		summary: "If more than 1 good player is executed, evil wins. All players know you are in play. After day 5, evil wins.",
		icon: "leviathan",
		humanReadableRole: "Leviathan",
		script: "",
		type: "Demon"
	},
	riot: {
		id: "riot",
		firstNightReminder: "",
		otherNightReminder: "",
		reminders: [
			"Day 1",
			"Day 2",
			"Day 3"
		],
		setup: false,
		flavor: "Larga vida a la revolución! Mi revolucion!",
		firstNight: 0,
		otherNight: 0,
		jinxes: [
			{
				id: "mayor",
				reason: "The Mayor may choose to stop nominations. If they do so when only 1 Riot is alive, good wins. Otherwise, evil wins."
			},
			{
				id: "monk",
				reason: "If Riot is in play, the Monk-protected player is safe from all evil abilities."
			},
			{
				id: "farmer",
				reason: "Each night*, Riot chooses an alive good player (different to previous nights): a chosen Farmer uses their ability but does not die."
			},
			{
				id: "innkeeper",
				reason: "If Riot is in play, the Innkeeper-protected player is safe from all evil abilities."
			},
			{
				id: "sage",
				reason: "Each night*, Riot chooses an alive good player (different to previous nights): a chosen Sage uses their ability but does not die."
			},
			{
				id: "banshee",
				reason: "Each night*, Riot chooses an alive good player (different to previous nights): a chosen Banshee dies & gains their ability."
			},
			{
				id: "ravenkeeper",
				reason: "Each night*, Riot chooses an alive good player (different to previous nights): a chosen Ravenkeeper uses their ability but does not die."
			},
			{
				id: "soldier",
				reason: "If Riot is in play, the Soldier is safe from all evil abilities."
			},
			{
				id: "grandmother",
				reason: "If Riot is in play and the Grandchild dies during the day, the Grandmother dies too."
			},
			{
				id: "king",
				reason: "If Riot is in play, and at least 1 player is dead, the King learns an alive character each night."
			},
			{
				id: "exorcist",
				reason: "If the Exorcist chooses Riot on the 3rd night, Minions do not become Riot."
			}
		],
		summary: "On day 3, Minions become Riot & nominees die but nominate an alive player immediately. This must happen.",
		icon: "riot",
		humanReadableRole: "Riot",
		script: "",
		type: "Demon"
	},
	ojo: {
		id: "ojo",
		firstNightReminder: "",
		otherNightReminder: "The Ojo chooses a character.",
		reminders: ["Dead"],
		setup: false,
		flavor: "Like a bonfire on a moonless night… I see you, mortal.",
		firstNight: 0,
		otherNight: 45,
		summary: "Each night*, choose a character: they die. If they are not in play, the Storyteller chooses who dies.",
		icon: "ojo",
		humanReadableRole: "Ojo",
		script: "",
		type: "Demon"
	},
	kazali: {
		id: "kazali",
		firstNightReminder: "Wake the Kazali, allow them to choose Minions.",
		otherNightReminder: "The Kazali chooses a player.",
		reminders: ["Dead"],
		setup: true,
		flavor: "Gon(z)a7les6. Take cau8tun. The mech4an4ion is iNvert10d. E99ors insy6tum. Reco{7}fig.",
		firstNight: 3,
		otherNight: 50,
		jinxes: [
			{
				id: "goon",
				reason: "The Kazali can choose that the Goon player is one of their evil Minions."
			},
			{
				id: "marionette",
				reason: "If the Kazali chooses to create a Marionette, they must choose one of their neighbors."
			},
			{
				id: "huntsman",
				reason: "If the Kazali chooses the Damsel to become a Minion, and a Huntsman is in play, a good player becomes the Damsel."
			},
			{
				id: "choirboy",
				reason: "The Kazali cannot choose the King to become a Minion if a Choirboy is in play."
			},
			{
				id: "soldier",
				reason: "The Kazali can choose that the Soldier player is one of their evil Minions."
			}
		],
		summary: "Each night*, choose a player: they die. [You choose which players are which Minions. -? to +? Outsiders]",
		icon: "kazali",
		humanReadableRole: "Kazali",
		script: "",
		type: "Demon"
	},
	yaggababble: {
		id: "yaggababble",
		firstNightReminder: "Choose a secret phrase. Wake the Yaggababble and let them know their secret phrase.",
		otherNightReminder: "For each time the Yaggababble said the phrase today, you may choose a player. They die.",
		reminders: [
			"Dead",
			"Dead",
			"Dead"
		],
		setup: false,
		flavor: "Murders inside the Rue Morgue? Фальшивые новости! Hounds on the Baskerville moor? Фальшивые новости! Death while sailing the Nile? Фальшивые новости!",
		firstNight: 12,
		otherNight: 49,
		jinxes: [{
			id: "exorcist",
			reason: "If the Exorcist chooses the Yaggababble, the Yaggababble ability does not kill tonight."
		}],
		summary: "You start knowing a secret phrase. For each time you said it publicly today, a player might die.",
		icon: "yaggababble",
		humanReadableRole: "Yaggababble",
		script: "",
		type: "Demon"
	},
	lordoftyphon: {
		id: "lordoftyphon",
		firstNightReminder: "Replace neighbors of the Lord of Typhon with Minions, wake them, tell them their new alignment and character, then do minion info.",
		otherNightReminder: "The Lord of Typhon chooses a player.",
		reminders: ["Dead"],
		setup: true,
		flavor: "In the shadowed and forgotten corners of the cosmos, where the stars whisper secrets to the void, lies a truth so profound that the merest glimpse of it unravels the sanity of mortal minds.",
		firstNight: 2,
		otherNight: 43,
		summary: "Each night*, choose a player: they die. [Evil characters are in a line. You are in the middle. +1 Minion. -? to +? Outsiders]",
		icon: "lordoftyphon",
		humanReadableRole: "Lord of Typhon",
		script: "",
		type: "Demon"
	},
	doomsayer: {
		id: "doomsayer",
		firstNightReminder: "",
		otherNightReminder: "",
		reminders: [],
		setup: false,
		flavor: "And on the Seventh Day, there shall be a great flood and a pestilence upon the People of the Village of the Ravens! The dead shall rise and the living shall repent! O Woe! O Unholy day! Only by great sacrifice shall they prevail! So sayeth the Sages of Nostros and so sayeth I.",
		summary: "If 4 or more players live, each living player may publicly choose (once per game) that a player of their own alignment dies.",
		icon: "doomsayer",
		humanReadableRole: "Doomsayer",
		script: "fabled",
		type: "Fabled"
	},
	angel: {
		id: "angel",
		firstNight: 1,
		firstNightReminder: "Announce which players are protected by the Angel. Add the \"Protected\" token to the relevant players.",
		otherNightReminder: "",
		reminders: [
			"Protected",
			"Protected",
			"Something Bad"
		],
		setup: false,
		flavor: "Let those who are without sin dare to raise their hand to my chosen, for I shall strike such fools down with the fury and righteousness of a thousand storms.",
		summary: "Something bad might happen to whoever is most responsible for the death of a new player.",
		icon: "angel",
		humanReadableRole: "Angel",
		script: "fabled",
		type: "Fabled"
	},
	buddhist: {
		id: "buddhist",
		firstNight: 1,
		firstNightReminder: "Declare which players are affected by the Buddhist.",
		otherNightReminder: "",
		reminders: [],
		setup: false,
		flavor: "You throw thorns. Falling in my silence, they become flowers.",
		summary: "For the first 2 minutes of each day, veteran players may not talk.",
		icon: "buddhist",
		humanReadableRole: "Buddhist",
		script: "fabled",
		type: "Fabled"
	},
	hellslibrarian: {
		id: "hellslibrarian",
		firstNightReminder: "",
		otherNightReminder: "",
		reminders: ["Something Bad"],
		setup: false,
		flavor: "Shhhhhh. Please be quiet. It is best not to disturb the Librarian. I've heard it has a temper.",
		summary: "Something bad might happen to whoever talks when the Storyteller has asked for silence.",
		icon: "hellslibrarian",
		humanReadableRole: "Hell's Librarian",
		script: "fabled",
		type: "Fabled"
	},
	revolutionary: {
		id: "revolutionary",
		firstNightReminder: "",
		otherNightReminder: "",
		reminders: [
			"Register Falsely?",
			"Aligned",
			"Aligned"
		],
		setup: false,
		flavor: "United we feigned. Divided, we stalled.",
		summary: "2 neighboring players are known to be the same alignment. Once per game, 1 of them registers falsely.",
		icon: "revolutionary",
		humanReadableRole: "Revolutionary",
		script: "fabled",
		type: "Fabled"
	},
	fiddler: {
		id: "fiddler",
		firstNightReminder: "",
		otherNightReminder: "",
		reminders: [],
		setup: false,
		special: [{
			name: "pointing",
			type: "ability",
			time: "day"
		}],
		flavor: "I'll wager mi lyef ye cannae best me in a fiddle contest, ye boss-eyed snook! We'll go out on the lash, get the pub jammers an' have a right craic. I'll be layin' ma boots into ya come mornin' ye rumbly muppet.",
		summary: "Once per game, the Demon secretly chooses an opposing player: all players choose which of these 2 players win.",
		icon: "fiddler",
		humanReadableRole: "Fiddler",
		script: "fabled",
		type: "Fabled"
	},
	toymaker: {
		id: "toymaker",
		firstNight: 1,
		firstNightReminder: "Resolve the Minion Info and Demon Info steps even though there are fewer than 7 players.",
		otherNight: 1,
		otherNightReminder: "If it is a night when a Demon attack could end the game, and the Demon is marked “Final night: No Attack,” then the Demon does not act tonight. (Do not wake them.)",
		reminders: ["Final Night: No Attack"],
		setup: false,
		flavor: "It buzzes! It walks down stairs! It keeps you warm at night! It tastes like sugar! The kiddies love it! Introducing... the brand new... Warm'o-buzzy-wuzzy-walk'a'bot-thingy-contraption! Fun for all ages!",
		summary: "The Demon may choose not to attack & must do this at least once per game. Evil players get normal starting info.",
		icon: "toymaker",
		humanReadableRole: "Toymaker",
		script: "fabled",
		type: "Fabled"
	},
	fibbin: {
		id: "fibbin",
		firstNightReminder: "",
		otherNightReminder: "",
		reminders: ["No Ability"],
		setup: false,
		flavor: "Tee-hee-hee. Tee. Hee. Hee.",
		summary: "Once per game, 1 good player might get incorrect information.",
		icon: "fibbin",
		humanReadableRole: "Fibbin",
		script: "fabled",
		type: "Fabled"
	},
	duchess: {
		id: "duchess",
		firstNightReminder: "",
		otherNight: 1,
		otherNightReminder: "Wake each player marked “Visitor” or “False Info” one at a time. Show them the Duchess token, then fingers (1, 2, 3) equaling the number of evil players marked “Visitor” or, if you are waking the player marked “False Info,” show them any number of fingers except the number of evil players marked “Visitor.”",
		reminders: [
			"Visitor",
			"Visitor",
			"False Info"
		],
		setup: false,
		flavor: "We shall entertain between the hours of 6 and 7 precisely. Tea at 6:15. Scones at 6:45. Do not be late. Formal wear applies, as always.",
		summary: "Each day, 3 players may choose to visit you. At night*, each visitor learns how many visitors are evil, but 1 gets false info.",
		icon: "duchess",
		humanReadableRole: "Duchess",
		script: "fabled",
		type: "Fabled"
	},
	sentinel: {
		id: "sentinel",
		firstNightReminder: "",
		otherNightReminder: "",
		reminders: [],
		setup: true,
		flavor: "Name, please. Papers, please. Weapons, please.",
		summary: "There might be 1 extra or 1 fewer Outsider in play.",
		icon: "sentinel",
		humanReadableRole: "Sentinel",
		script: "fabled",
		type: "Fabled"
	},
	spiritofivory: {
		id: "spiritofivory",
		firstNightReminder: "",
		otherNightReminder: "",
		reminders: ["No More Evil"],
		setup: false,
		flavor: "The Wasteland calls. Bones rise to flesh, then fall to dust. The great spirit grows. The great spirit watches. The great spirit guides. The human listens, or the human is no more.",
		summary: "There can't be more than 1 extra evil player.",
		icon: "spiritofivory",
		humanReadableRole: "Spirit of Ivory",
		script: "fabled",
		type: "Fabled"
	},
	djinn: {
		id: "djinn",
		firstNightReminder: "",
		otherNightReminder: "",
		reminders: [],
		setup: false,
		flavor: "نحن لسنا هنا. انت لست حقيقي. كل شيء هو وهم. أسئلتك هي جبل نار في يوم صافٍ.",
		summary: "Use the Djinn's special rule. All players know what it is.",
		icon: "djinn",
		humanReadableRole: "Djinn",
		script: "fabled",
		type: "Fabled"
	},
	ferryman: {
		id: "ferryman",
		firstNightReminder: "",
		otherNightReminder: "",
		reminders: [],
		setup: false,
		special: [{
			name: "ghost-votes",
			type: "ability",
			time: "day"
		}],
		flavor: "When righteous dreams come, they have the weight of truth.",
		summary: "On the final day, all dead players regain their vote token.",
		icon: "ferryman",
		humanReadableRole: "Ferryman",
		script: "fabled",
		type: "Fabled"
	},
	pope: {
		id: "pope",
		firstNightReminder: "",
		otherNightReminder: "",
		reminders: [],
		setup: false,
		flavor: "...Pulcherrimae.",
		summary: "There are duplicate good characters in play. They might also be bluffs.",
		icon: "pope",
		humanReadableRole: "Pope",
		script: "loric",
		type: "Loric"
	},
	bigwig: {
		id: "bigwig",
		firstNightReminder: "",
		otherNightReminder: "",
		reminders: [],
		setup: false,
		flavor: "Vanity asks 'Is it popular?' Cowardice asks 'Is it safe?' Conscience asks 'Is it right?' Who among us will ask: 'Is it true?'”",
		summary: "Each nominee chooses a player: until voting, only they may speak & they are mad the nominee is good or they might die.",
		icon: "bigwig",
		humanReadableRole: "Big Wig",
		script: "loric",
		type: "Loric"
	},
	bootlegger: {
		id: "bootlegger",
		firstNightReminder: "",
		otherNightReminder: "",
		reminders: [],
		setup: false,
		flavor: "I've got the latest shipment from home, a brew I'd like to call 'Barrowfog'. Wanna try?",
		summary: "This script has homebrew characters or rules.",
		icon: "bootlegger",
		humanReadableRole: "Bootlegger",
		script: "loric",
		type: "Loric"
	},
	gardener: {
		id: "gardener",
		firstNightReminder: "",
		otherNightReminder: "",
		reminders: [],
		setup: false,
		flavor: "Oh now, this won't do. We've got the monkshood mixed in with the wolfsbane and the hemlock is smothering the hellebore! Oh dear me, we'd better start over. Fetch my shears.",
		summary: "The Storyteller assigns 1 or more players' characters.",
		icon: "gardener",
		humanReadableRole: "Gardener",
		script: "loric",
		type: "Loric"
	},
	hindu: {
		id: "hindu",
		firstNightReminder: "",
		otherNightReminder: "",
		reminders: [],
		setup: false,
		flavor: "चत्वारो मृत्युमध्ये पतन्ति, चत्वारो यात्री पुनरुद्गताः। चत्वारो धर्मे स्थितचित्तवृत्तेः, चत्वार एषां न पुनः क्षयः॥",
		summary: "The first 4 players to die are immediately reincarnated as Travellers of the same alignment.",
		icon: "hindu",
		humanReadableRole: "Hindu",
		script: "loric",
		type: "Loric"
	},
	stormcatcher: {
		id: "stormcatcher",
		firstNight: 1,
		firstNightReminder: "At the start of the night, announce which character is favoured by the Storm Catcher. If that character is in play, mark that player as \"Safe\". Wake each evil player and show them the character token, then the marked player.\n If not in play, wake each evil player, show them the \"These Characters Are Not In Play\" info token and the relevant character token.",
		otherNightReminder: "",
		reminders: ["Safe"],
		setup: false,
		flavor: "At dawn, the temple's long shadow creeps to the fountain. At dusk, the obelisk blocks the red glare, cooling warm water under the archway. All lines converge here. A storm is coming, and this, this pebbled and lush and holy place between the apple trees, is the eye.",
		summary: "Name a good character. If in play, they can only die by execution, but evil players learn which player it is.",
		icon: "stormcatcher",
		humanReadableRole: "Storm Catcher",
		script: "loric",
		type: "Loric"
	},
	tor: {
		id: "tor",
		firstNight: 1,
		firstNightReminder: "",
		otherNightReminder: "",
		reminders: [],
		setup: false,
		flavor: "With thunder as my voice and lightning as my blade, I, the eternal guardian, feast upon the fools who dare approach the forbidden gate. Behold, my sacred goal! To purge the beetle from the belly of the rocky earth, to ensnare it in a net of stars on the hilltop where heaven meets earth",
		summary: "Players don't know their character or alignment. They learn them when they die.",
		icon: "tor",
		humanReadableRole: "Tor",
		script: "loric",
		type: "Loric"
	},
	zenomancer: {
		id: "zenomancer",
		firstNightReminder: "",
		otherNightReminder: "",
		reminders: [],
		setup: false,
		flavor: "The universe is a verb not a noun, they say, and it is turtles, turtles all the way down. Turtles all the way down, my friend, turtles all the way down.",
		summary: "One or more players each have a goal. When achieved, that player learns a piece of true info.",
		icon: "zenomancer",
		humanReadableRole: "Zenomancer",
		script: "loric",
		type: "Loric"
	},
	godofug: {
		id: "godofug",
		firstNightReminder: "",
		otherNightReminder: "",
		reminders: [],
		setup: false,
		flavor: "Blessed are my children, for they see the beauty in simple things.",
		summary: "One Ug hat. When wear Ug hat, must speak one sound at a time but vote twice. If fail, pass Ug hat.",
		icon: "godofug",
		humanReadableRole: "God of Ug",
		script: "loric",
		type: "Loric"
	},
	knaves: {
		id: "knaves",
		firstNightReminder: "",
		otherNightReminder: "",
		reminders: [],
		setup: false,
		flavor: "Every wall is a door. Every meal is a feast.",
		summary: "There are 2 Storytellers: one lies & one tells the truth. Once per game, at dusk, they might switch.",
		icon: "knaves",
		humanReadableRole: "Knaves",
		script: "loric",
		type: "Loric"
	},
	ventriloquist: {
		id: "ventriloquist",
		firstNightReminder: "",
		otherNightReminder: "",
		reminders: ["Mad"],
		setup: false,
		flavor: "Well, folks, gather 'round! This here's my pal Charlie, and he's got a mouth on him that'd make a mule blush. But don't worry folks, I do all the talkin'... or do I?",
		summary: "If a player is mad as a fresh character during their nomination, they might not die if executed today.",
		icon: "ventriloquist",
		humanReadableRole: "Ventriloquist",
		script: "loric",
		type: "Loric"
	}
};
//#endregion
//#region src/state.js
/**
* @typedef {import("../types.js").Player} Player
* @typedef {import("../types.js").Token} Token
*/
/** @type {StatePlugin<GameState>} */
const drunk = {
	name: "drunk",
	update: (prevState, state) => {
		if (!state?.currentGame) return state;
		const players = state?.currentGame?.players;
		if (!players?.length) return state;
		const isDrunkToken = state.currentGame.tokens.find((t) => t.id === "drunk-Is The Drunk");
		return {
			...state,
			currentGame: {
				...state.currentGame,
				players: players.map((player) => {
					if (player?.suspectedRole?.id === "drunk") {
						const filtered = player.tokens.filter((t) => t.id !== "drunk-Is The Drunk");
						return {
							...player,
							tokens: isDrunkToken ? [...filtered, isDrunkToken] : filtered
						};
					}
					return player;
				})
			}
		};
	}
};
/** @type {StatePlugin<GameState>} */
const tealady = {
	name: "tealady",
	update: (prevState, state) => {
		if (!state?.currentGame) return state;
		const players = state?.currentGame?.players;
		if (!players?.length) return state;
		const n = players?.length;
		/** @type {Token} */
		const protectedToken = {
			id: "tealady-Cannot Die",
			role: "tealady",
			label: "Cannot die",
			icon: "tealady",
			type: "Townsfolk",
			humanReadableRole: "Tea Lady"
		};
		const index = players.findIndex((p) => p.suspectedRole?.id === "tealady");
		if (index === -1) return state;
		if (players[index].dead) {
			const updatedPlayers = players.map((player) => ({
				...player,
				tokens: player.tokens.filter((t) => t.id !== protectedToken.id)
			}));
			return {
				...state,
				currentGame: {
					...state.currentGame,
					players: updatedPlayers
				}
			};
		}
		/**
		* @param {number} startIndex
		* @param {number} direction
		* @returns
		*/
		function findAliveNeighbor(startIndex, direction) {
			let i = startIndex;
			for (let steps = 0; steps < n; steps++) {
				i = (i + direction + n) % n;
				if (!players[i].dead) return i;
			}
			return -1;
		}
		const leftIndex = findAliveNeighbor(index, -1);
		const rightIndex = findAliveNeighbor(index, 1);
		/** @param {import("../types.js").Player} p */
		const isGood = (p) => {
			const type = p.suspectedRole?.type?.toLowerCase();
			return type === "townsfolk" || type === "outsider" || !type;
		};
		const leftGood = leftIndex !== -1 && isGood(players[leftIndex]);
		const rightGood = rightIndex !== -1 && isGood(players[rightIndex]);
		const shouldProtect = leftGood && rightGood;
		const updatedPlayers = players.map((player, i) => {
			const filteredTokens = player.tokens.filter((t) => t.id !== protectedToken.id);
			if (shouldProtect && (i === leftIndex || i === rightIndex)) return {
				...player,
				tokens: [...filteredTokens, protectedToken]
			};
			return {
				...player,
				tokens: filteredTokens
			};
		});
		return {
			...state,
			currentGame: {
				...state.currentGame,
				players: updatedPlayers
			}
		};
	}
};
/** @type {StatePlugin<GameState>} */
const grandchild = {
	name: "grandchild",
	update: (prevState, state) => {
		if (!state?.currentGame) return state;
		const players = state.currentGame.players;
		const grandchild = players.find((p) => p.tokens.some((t) => t.id === "grandmother-Grandchild"));
		const grandmother = players.find((p) => p.suspectedRole?.id === "grandmother");
		if (!grandchild) return state;
		if (!grandmother) return state;
		if (!(grandchild?.dead?.type?.toLowerCase() === "demon" && !isProtected(grandmother))) return state;
		return {
			...state,
			currentGame: {
				...state.currentGame,
				players: players.map((player) => player === grandmother ? {
					...player,
					dead: grandchild.dead
				} : player)
			}
		};
	}
};
/** @type {StatePlugin<GameState>} */
const marionette = {
	name: "marionette",
	update: (prevState, state) => {
		if (!state?.currentGame) return state;
		const marionetteToken = state.currentGame.tokens.find((t) => t.id === "marionette-Is The Marionette");
		return {
			...state,
			currentGame: {
				...state.currentGame,
				players: state.currentGame.players.map((player) => {
					const isMarionette = player.suspectedRole?.id === "marionette";
					const alreadyTagged = player.tokens.some((t) => t.id === "marionette-Is The Marionette");
					if (isMarionette && !alreadyTagged && marionetteToken) return {
						...player,
						tokens: [...player.tokens, marionetteToken]
					};
					return player;
				})
			}
		};
	}
};
/** @type {StatePlugin<GameState>} */
const banshee = {
	name: "banshee",
	update: (prevState, state) => {
		if (!state?.currentGame) return state;
		const abilityToken = state.currentGame.tokens.find((t) => t.id === "banshee-Has Ability");
		return {
			...state,
			currentGame: {
				...state.currentGame,
				players: state.currentGame.players.map((player) => {
					if (player.suspectedRole?.id !== "banshee") return player;
					const killedByDemonTonight = player.tokens.some((t) => t.type?.toLowerCase() === "demon" && t.id.includes("Dead"));
					const hasAbility = player.tokens.some((t) => t.id === "banshee-Has Ability");
					if (killedByDemonTonight && !hasAbility && abilityToken) return {
						...player,
						tokens: [...player.tokens, abilityToken]
					};
					return player;
				})
			}
		};
	}
};
/** @type {StatePlugin<GameState>} */
const acrobat = {
	name: "acrobat",
	update: (prevState, state) => {
		if (!state?.currentGame) return state;
		const deadToken = state.currentGame.tokens.find((t) => t.id === "acrobat-Dead");
		return {
			...state,
			currentGame: {
				...state.currentGame,
				players: state.currentGame.players.map((player) => {
					const drunkOrPoisoned = player.tokens.some((t) => t.id.includes("Drunk") || t.id.includes("Poisoned"));
					if (player?.tokens?.some((t) => t.id === "acrobat-Chosen") && drunkOrPoisoned) {
						const filtered = player.tokens.filter((t) => t.id !== "acrobat-Dead");
						return {
							...player,
							tokens: deadToken ? [...filtered, deadToken] : filtered
						};
					}
					return player;
				})
			}
		};
	}
};
/** @type {StatePlugin<GameState>} */
const minstrel = {
	name: "minstrel",
	update: (prevState, state) => {
		if (!state?.currentGame) return state;
		if (!state?.currentGame?.stMode) return state;
		if (!state.currentGame.players.some((p) => p.suspectedRole?.id === "minstrel")) return state;
		const globalMinstrelToken = state.currentGame?.globalReminders?.find((r) => r.id === "minstrel");
		if (globalMinstrelToken && globalMinstrelToken?.day + 1 === state.currentGame?.day && state.currentGame?.nightPhaseIndex === 1 && prevState.currentGame?.nightPhaseIndex === 0) return {
			...state,
			currentGame: {
				...state.currentGame,
				globalReminders: state.currentGame.globalReminders.filter((r) => r.id !== "minstrel")
			}
		};
		/**
		* @param {Player} player
		* @returns {boolean}
		*/
		const isMinion = (player) => player?.suspectedRole?.type?.toLowerCase() === "minion" || player?.suspectedRole?.id === "marionette";
		const { players } = state.currentGame;
		const prevPlayers = prevState?.currentGame?.players || [];
		if (!players.find((player) => {
			const wasAlive = !prevPlayers.find((p) => p.id === player.id)?.dead?.id;
			const isDeadNow = !!player?.dead?.id;
			return wasAlive && isDeadNow && isMinion(player) && !isDroisoned(player);
		})) return state;
		return {
			...state,
			currentGame: {
				...state.currentGame,
				globalReminders: [...state.currentGame.globalReminders || [], (
				/** @type {Role} */
				{
					day: state.currentGame.day,
					id: "minstrel",
					type: "Townsfolk",
					icon: "minstrel",
					label: "Everyone Is Drunk",
					humanReadableRole: "Minstrel",
					summary: `Everyone is drunk until dusk of day ${state.currentGame.day + 1}`
				})]
			}
		};
	}
};
/** @type {StatePlugin<GameState>} */
const courtier = {
	name: "courtier",
	update: (prevState, state) => {
		if (!state?.currentGame) return state;
		const currentDay = state.currentGame.day;
		const previousDay = prevState?.currentGame?.day;
		if (!(typeof previousDay === "number" && previousDay < currentDay)) return state;
		if (!state.currentGame.players.some((p) => p.tokens.some((t) => /^courtier-Drunk \d$/.test(t.id)))) return state;
		const updatedPlayers = state.currentGame.players.map((player) => {
			let changed = false;
			const newTokens = player.tokens.flatMap((token) => {
				const match = token.id.match(/^courtier-Drunk (\d)$/);
				if (!match) return [token];
				changed = true;
				if (!token.graceUsed) return [{
					...token,
					graceUsed: true
				}];
				const count = parseInt(match[1], 10);
				if (count > 1) return [{
					...token,
					id: `courtier-Drunk ${count - 1}`,
					label: `Drunk ${count - 1}`
				}];
				return [];
			});
			return changed ? {
				...player,
				tokens: newTokens
			} : player;
		});
		return {
			...state,
			currentGame: {
				...state.currentGame,
				players: updatedPlayers
			}
		};
	}
};
/** @type {StatePlugin<GameState>} */
const nodashii = {
	name: "nodashii",
	update: (prevState, state) => {
		if (!state?.currentGame) return state;
		const players = state?.currentGame?.players;
		if (!players?.length) return state;
		/** @type {Token} */
		const token = {
			id: "nodashii-Poisoned",
			role: "nodashii",
			label: "Poisoned",
			icon: "nodashii",
			type: "Demon",
			humanReadableRole: "No Dashii"
		};
		const n = players.length;
		const index = players.findIndex((p) => p.suspectedRole?.id === token.role);
		if (index === -1) {
			const updatedPlayers = players.map((player, i) => {
				const filteredTokens = player.tokens.filter((t) => t.id !== token.id);
				return {
					...player,
					tokens: filteredTokens
				};
			});
			return {
				...state,
				currentGame: {
					...state.currentGame,
					players: updatedPlayers
				}
			};
		}
		/**
		* @param {number} startIndex
		* @param {number} direction
		* @returns
		*/
		function findNeighbor(startIndex, direction) {
			let i = startIndex;
			for (let steps = 0; steps < n; steps++) {
				i = (i + direction + n) % n;
				const p = players[i];
				const isTownsfolk = !p.suspectedRole?.type || p.suspectedRole?.type?.toLowerCase() === "townsfolk";
				const isMarionette = p.tokens.some((t) => t?.id === "marionette-Is The Marionette");
				if (isTownsfolk && !isMarionette) return i;
			}
			return -1;
		}
		const leftAlive = findNeighbor(index, -1);
		const rightAlive = findNeighbor(index, 1);
		const updatedPlayers = players.map((player, i) => {
			const filteredTokens = player.tokens.filter((t) => t.id !== token.id);
			if (i === leftAlive || i === rightAlive) return {
				...player,
				tokens: [...filteredTokens, token]
			};
			return {
				...player,
				tokens: filteredTokens
			};
		});
		return {
			...state,
			currentGame: {
				...state.currentGame,
				players: updatedPlayers
			}
		};
	}
};
/** @type {StatePlugin<GameState>} */
const barber = {
	name: "barber",
	update: (prevState, state) => {
		if (!state?.currentGame) return state;
		const players = state?.currentGame?.players;
		if (!players?.length) return state;
		/** @type {Token} */
		const token = {
			id: "barber-Haircuts Tonight",
			role: "barber",
			label: "Haircuts Tonight",
			icon: "barber",
			type: "Townsfolk",
			humanReadableRole: "Barber"
		};
		const prevBarber = prevState?.currentGame?.players?.find((p) => p.suspectedRole?.id === "barber");
		const currBarber = state?.currentGame?.players?.find((p) => p.suspectedRole?.id === "barber");
		if (!prevBarber?.dead?.id && (!!currBarber?.dead?.id || currBarber?.tokens.some((t) => t.id.includes("Dead")))) return {
			...state,
			currentGame: {
				...state.currentGame,
				players: players.map((player) => {
					if (player.suspectedRole?.id === "barber" && player.dead) {
						const filtered = player.tokens.filter((t) => t.id !== token.id);
						return {
							...player,
							tokens: [...filtered, token]
						};
					}
					return player;
				})
			}
		};
		return state;
	}
};
/** @type {StatePlugin<GameState>} */
const addMissingTokens = {
	name: "add-missing-tokens",
	update: (prevState, state) => {
		if (!state?.currentGame) return state;
		const travellers = state.currentGame.travellers;
		const rolesInPlay = state.currentGame.players.map((p) => p.suspectedRole?.id).filter(Boolean);
		const existingTokens = state.currentGame.tokens ?? [];
		const newTokens = rolesInPlay.flatMap((role) => {
			const r = window.rolesById?.[role];
			if (!r) return [];
			if (!travellers && r.type === "Traveller") return [];
			if (r.id === "juggler") return (r.reminders ?? []).map((reminder, i) => ({
				id: `${r.id}-${reminder} ${i + 1}`,
				role: r.id,
				label: `${reminder} ${i + 1}`,
				icon: r.id,
				type: r.type,
				humanReadableRole: r.humanReadableRole
			}));
			return [.../* @__PURE__ */ new Set([...r.reminders ?? [], ...r.remindersGlobal ?? []])].map((reminder) => ({
				id: `${r.id}-${reminder}`,
				role: r.id,
				label: reminder,
				image: Array.isArray(r.image) ? r.image[0] : r.image,
				icon: r.id,
				type: r.type,
				humanReadableRole: r.humanReadableRole
			}));
		});
		(state.currentGame.scriptData?.fabled ?? []).forEach((fabled) => {
			(fabled.reminders ?? []).forEach((reminder) => {
				newTokens.push({
					id: `${fabled.id}-${reminder}`,
					role: fabled.id,
					label: reminder,
					image: Array.isArray(fabled.image) ? fabled.image[0] : fabled.image,
					icon: fabled.id,
					type: fabled.type || "Fabled",
					humanReadableRole: fabled.humanReadableRole || fabled.name
				});
			});
		});
		(state.currentGame.scriptData?.loric ?? []).forEach((loric) => {
			(loric.reminders ?? []).forEach((reminder) => {
				newTokens.push({
					id: `${loric.id}-${reminder}`,
					role: loric.id,
					label: reminder,
					image: Array.isArray(loric.image) ? loric.image[0] : loric.image,
					icon: loric.id,
					type: loric.type || "Loric",
					humanReadableRole: loric.humanReadableRole || loric.name
				});
			});
		});
		const specialEvil = existingTokens.find((t) => t.id === "special-Evil");
		const specialGood = existingTokens.find((t) => t.id === "special-Good");
		if (state.currentGame.globalReminders.some((r) => r.id === "godofug") && !existingTokens.find((t) => t.id === "godofug-Hat")) newTokens.push({
			id: `godofug-Hat`,
			role: "loric",
			label: "Hat",
			icon: "godofug",
			type: "loric",
			humanReadableRole: "God of Ug"
		});
		if (!specialEvil) newTokens.push({
			id: `special-Evil`,
			role: "special",
			label: "Evil",
			icon: "evil",
			type: "demon",
			humanReadableRole: "Evil"
		});
		if (!specialGood) newTokens.push({
			id: `special-Good`,
			role: "special",
			label: "Good",
			icon: "good",
			type: "townsfolk",
			humanReadableRole: "Good"
		});
		const allTokens = [...existingTokens, ...newTokens];
		const uniqueTokens = Array.from(new Map(allTokens.map((token) => [token.id, token])).values());
		return {
			...state,
			currentGame: {
				...state.currentGame,
				tokens: uniqueTokens
			}
		};
	}
};
/** @type {StatePlugin<GameState>} */
const preacher = {
	name: "preacher",
	update: (prevState, state) => {
		if (!state?.currentGame) return state;
		if (!state.currentGame.players.some((p) => p.suspectedRole?.id === "preacher")) return state;
		const { players } = state.currentGame;
		const prevPlayers = prevState?.currentGame?.players || [];
		if (players.find((player) => {
			const wasAlive = !prevPlayers.find((p) => p.id === player.id)?.dead?.id;
			const isDeadNow = !!player?.dead?.id;
			return wasAlive && isDeadNow && player?.suspectedRole?.id === "preacher";
		})) return {
			...state,
			currentGame: {
				...state.currentGame,
				players: state.currentGame.players.map((player) => {
					if (player.tokens.some((t) => t.id === "preacher-No Ability")) {
						const filtered = player.tokens.filter((t) => !(t.id === "preacher-No Ability" && t.playerId === player.id));
						return {
							...player,
							tokens: filtered
						};
					}
					return player;
				})
			}
		};
		return state;
	}
};
/** @type {StatePlugin<GameState>} */
const leviathan = {
	name: "leviathan",
	update: (prevState, state) => {
		if (!state?.currentGame) return state;
		if (!state.currentGame.players.some((p) => p.suspectedRole?.id === "leviathan")) return state;
		const currentDay = state.currentGame.day;
		const { players } = state.currentGame;
		const prevPlayers = prevState?.currentGame?.players || [];
		if (players.find((player) => {
			const wasAlive = !prevPlayers.find((p) => p.id === player.id)?.dead?.id;
			const isDeadNow = !!player?.dead?.id;
			const wasTownExecution = player?.dead?.id === "unknowntown";
			return wasAlive && isDeadNow && isGood(player) && wasTownExecution;
		})) return {
			...state,
			currentGame: {
				...state.currentGame,
				players: state.currentGame.players.map((player) => {
					const isLeviathan = player?.suspectedRole?.id === "leviathan";
					const alreadyTagged = player.tokens.some((t) => t.id === "leviathan-Good Player Executed");
					if (isLeviathan && !alreadyTagged) return {
						...player,
						tokens: [...player.tokens || [], (
						/** @type {Token} */
						{
							id: "leviathan-Good Player Executed",
							role: "leviathan",
							label: `Good Player Executed`,
							icon: "leviathan",
							type: "Demon",
							humanReadableRole: "Leviathan"
						})]
					};
					return player;
				})
			}
		};
		if (currentDay < 1 || currentDay > 5) return state;
		if (!players.some((p) => p.suspectedRole?.id === "leviathan")) return state;
		/** @type {Token['id']} */
		const dayTokenId = `leviathan-Day ${currentDay}`;
		/** @type {Token} */
		const dayToken = state.currentGame.tokens?.find((t) => t.id === dayTokenId) ?? {
			id: dayTokenId,
			role: "leviathan",
			label: `Day ${currentDay}`,
			icon: "leviathan",
			type: "Demon",
			humanReadableRole: "Leviathan"
		};
		let changed = false;
		const updatedPlayers = players.map((player) => {
			if (player.suspectedRole?.id !== "leviathan") return player;
			const dayTokens = player.tokens.filter((t) => /^leviathan-Day \d$/.test(t.id));
			if (dayTokens.length === 1 && dayTokens[0].id === dayTokenId) return player;
			changed = true;
			const filtered = player.tokens.filter((t) => !/^leviathan-Day \d$/.test(t.id));
			return {
				...player,
				tokens: [...filtered, dayToken]
			};
		});
		if (!changed) return state;
		return {
			...state,
			currentGame: {
				...state.currentGame,
				players: updatedPlayers
			}
		};
	}
};
/** @type {StatePlugin<GameState>} */
const deadlogPlugin = {
	name: "deadlog",
	update: (prevState, state) => {
		if (!state?.currentGame) return state;
		const players = state.currentGame.players;
		if (!players?.length) return state;
		const currentDay = state.currentGame.day;
		const prevDeadlog = state.currentGame.deadlog ?? [];
		const prevDeadlogMap = state.currentGame.deadlogMap ?? {};
		const newEntries = [];
		const nextDeadlogMap = { ...prevDeadlogMap };
		players.forEach((player) => {
			const playerId = player.id;
			const currentDead = player.dead;
			const previousDead = prevDeadlogMap[playerId];
			if (currentDead && !previousDead) newEntries.push({
				id: crypto.randomUUID(),
				timestamp: (/* @__PURE__ */ new Date()).toISOString(),
				player,
				event: "death",
				day: currentDay
			});
			if (!currentDead && previousDead) newEntries.push({
				id: crypto.randomUUID(),
				timestamp: (/* @__PURE__ */ new Date()).toISOString(),
				player,
				event: "revival",
				day: currentDay
			});
			nextDeadlogMap[playerId] = currentDead ? true : false;
		});
		return {
			...state,
			currentGame: {
				...state.currentGame,
				deadlog: newEntries.length > 0 ? [...prevDeadlog, ...newEntries] : prevDeadlog,
				deadlogMap: nextDeadlogMap
			}
		};
	}
};
/**
* @template T
* @extends EventTarget
*/
/**
* `'state-changed'` event
* @template T
* @example this.dispatchEvent(new StateEvent(data));
*/
var StateEvent = class extends Event {
	/**
	* @param {T} state
	*/
	constructor(state) {
		super("state-changed");
		/** @type {T} */
		this.state = state;
	}
};
/**
* @template T
* @typedef {{
*   name: string,
*   update: (prevState: T, state: T) => T
* }} StatePlugin
*/
/**
* @template T
* @extends EventTarget
*/
var State = class extends EventTarget {
	/** @type {T} */
	#state;
	/** @type {string} */
	#idbkey;
	/** @type {boolean} */
	#saveToIdb;
	/** @type {StatePlugin<T>[]} */
	#plugins = [];
	/**
	* @param {T} initialState
	* @param {string} [idbkey="state"]
	*/
	constructor(initialState, idbkey = "state", saveToIdb = true) {
		super();
		this.#state = initialState;
		this.#idbkey = idbkey;
		this.#saveToIdb = saveToIdb;
	}
	/**
	* @param {T | ((prevState: T) => T)} state
	* @param {boolean} [broadcast=true]
	*/
	setState(state, broadcast = true) {
		const prevState = structuredClone(this.#state);
		const s = typeof state === "function" ? state(this.#state) : state;
		this.#state = this.#plugins.reduce((newState, plugin) => {
			return plugin.update(prevState, newState);
		}, { ...s });
		if (this.#saveToIdb) set(this.#idbkey, this.#state);
		if (broadcast) this.dispatchEvent(new StateEvent(this.#state));
	}
	/**
	* @returns {T}
	*/
	getState() {
		return this.#state;
	}
	/**
	* @param {StatePlugin<T>[]} plugins
	*/
	addPlugins(plugins) {
		this.#plugins.push(...plugins);
	}
};
const oldState = await get("state");
const oldSettings = await get("settings");
const oldStats = await get("stats");
const oldTimer = await get("timer");
/**
* @typedef {{
*  started: boolean,
*  duration: number,
*  startedAt: Date | null,
*  finished: boolean,
*  endsAt: Date | null,
*  formatted: string
* }} Timer
*/
/**
* @type {State<Timer>}
*/
const timer = oldTimer ? new State(oldTimer, "timer") : new State({
	started: false,
	duration: 0,
	startedAt: null,
	finished: false,
	formatted: ""
}, "timer");
const stats = oldStats ? new State(oldStats, "stats") : new State({ games: [] }, "stats");
/**
* @typedef {{
*  showFinal3Warning: boolean,
*  useAuthForHideGrim: boolean,
*  webAuthnId: string | null,
*  name: string | null,
*  hideGrim: boolean,
*  conversationTracking: boolean,
*  voteTracking: boolean,
*  highlightDoubleClaims: boolean,
*  showFirstLastNeighbors: boolean,
*  fontScale: number,
*  useOfficialIcons: boolean,
*  showNotifications: boolean,
*  showRole: boolean,
*  bagSelectionShowIcon: boolean,
*  displayTokenLabelInCircularMode: boolean,
*  displayRoleNamesInCircularMode: boolean,
*  showNightOrderNumbers: boolean,
*  nominationFlowKind: "default" | "minimal",
*  view: "circular" | "list",
*  experimentalSpeechRecognition: {
*   enabled: boolean,
*   lang: string,
*   buttonSize: "small" | "medium" | "large"
*  }
*  user?: {
*   uid: string,
*   email: string,
*   name: string,
*   isAdmin: boolean,
*   photoURL: string
*  }
* }} SettingsState
*/
/**
* @type {State<SettingsState>}
*/
const settings = oldSettings ? new State(oldSettings, "settings") : new State({
	showFinal3Warning: true,
	useAuthForHideGrim: false,
	webAuthnId: null,
	name: null,
	view: "circular",
	hideGrim: false,
	bagSelectionShowIcon: true,
	displayTokenLabelInCircularMode: false,
	displayRoleNamesInCircularMode: true,
	showNightOrderNumbers: true,
	showRole: false,
	useOfficialIcons: false,
	showNotifications: true,
	conversationTracking: false,
	voteTracking: false,
	highlightDoubleClaims: false,
	showFirstLastNeighbors: false,
	nominationFlowKind: "default",
	fontScale: 0,
	experimentalSpeechRecognition: {
		enabled: false,
		lang: "en-US",
		buttonSize: "small"
	}
}, "settings");
if ("nominationFlowKind" in settings.getState() === false) settings.setState((old) => ({
	...old,
	nominationFlowKind: "default"
}));
if ("showNotifications" in settings.getState() === false) settings.setState((old) => ({
	...old,
	showNotifications: true
}));
if ("useOfficialIcons" in settings.getState() === false) settings.setState((old) => ({
	...old,
	useOfficialIcons: false
}));
if (!settings?.getState().experimentalSpeechRecognition) settings.setState((old) => ({
	...old,
	experimentalSpeechRecognition: {
		enabled: false,
		lang: "en-EN",
		buttonSize: "small"
	}
}));
if ("view" in settings.getState() === false) settings.setState((old) => ({
	...old,
	view: "circular"
}));
if ("showRole" in settings.getState() === false) settings.setState((old) => ({
	...old,
	showRole: false
}));
if ("bagSelectionShowIcon" in settings.getState() === false) settings.setState((old) => ({
	...old,
	bagSelectionShowIcon: true
}));
if ("displayTokenLabelInCircularMode" in settings.getState() === false) settings.setState((old) => ({
	...old,
	displayTokenLabelInCircularMode: true
}));
if ("showNightOrderNumbers" in settings.getState() === false) settings.setState((old) => ({
	...old,
	showNightOrderNumbers: true
}));
if ("displayRoleNamesInCircularMode" in settings.getState() === false) settings.setState((old) => ({
	...old,
	displayRoleNamesInCircularMode: true
}));
/**
* @typedef {import('../types.js').Role} Role
*/
/**
* @typedef {import('../types.js').GameState} GameState
*/
/**
* @type {State<GameState>}
*/
const state = oldState ? new State(oldState) : new State({
	nightOrder: night_order_default,
	player: {},
	firstVisit: true,
	currentGame: {
		assign: "manual",
		deadlog: [],
		deadlogMap: {
			"4cbd41eb-bfa0-451f-859e-a2a1d47903ee": false,
			"db37b2ba-1ce2-4e92-b82d-a3111fb8ee3a": false,
			"f00f40d0-fdab-4e7b-9170-63b3e65cab0e": false,
			"88bf3907-9863-4421-b27b-10fa6c5ea313": false,
			"23d7d403-fa81-4e2c-9ae4-ff4224b39558": false,
			"ce9a4c08-efd6-49c0-a73a-70b64e95b5df": false,
			"b311adef-549e-4bab-9b6e-1cc9a0a4e26a": false,
			"89f43ace-b838-4288-a271-88fb2af9bbf3": false
		},
		scriptRoles: [],
		conversations: [],
		globalReminders: [],
		day: 0,
		demonBluffs: [
			rolesById_default.washerwoman,
			rolesById_default.mayor,
			rolesById_default.recluse
		],
		nightPhaseIndex: 0,
		nominations: [],
		players: [
			{
				tokens: [],
				name: "Sully",
				id: "4cbd41eb-bfa0-451f-859e-a2a1d47903ee",
				claims: [],
				notes: "",
				suspectedRole: rolesById_default.chef,
				dead: false,
				me: false,
				confirmed: false
			},
			{
				tokens: [],
				name: "Laurie",
				id: "db37b2ba-1ce2-4e92-b82d-a3111fb8ee3a",
				claims: [],
				notes: "",
				suspectedRole: rolesById_default.monk,
				dead: false,
				me: false,
				confirmed: false
			},
			{
				tokens: [],
				name: "Ken",
				id: "f00f40d0-fdab-4e7b-9170-63b3e65cab0e",
				claims: [],
				notes: "",
				suspectedRole: rolesById_default.slayer,
				dead: false,
				me: false,
				confirmed: false
			},
			{
				tokens: [],
				name: "Adam",
				id: "88bf3907-9863-4421-b27b-10fa6c5ea313",
				claims: [],
				notes: "",
				suspectedRole: rolesById_default.imp,
				dead: false,
				me: false,
				confirmed: false
			},
			{
				tokens: [{
					id: "drunk-Is The Drunk",
					role: "drunk",
					label: "Is The Drunk",
					icon: "drunk",
					type: "Outsider",
					humanReadableRole: "Drunk"
				}],
				name: "Dom",
				id: "23d7d403-fa81-4e2c-9ae4-ff4224b39558",
				claims: [],
				notes: "",
				suspectedRole: rolesById_default.drunk,
				dead: false,
				me: false,
				confirmed: false
			},
			{
				tokens: [],
				name: "Blair",
				id: "ce9a4c08-efd6-49c0-a73a-70b64e95b5df",
				claims: [],
				notes: "",
				suspectedRole: rolesById_default.fortuneteller,
				dead: false,
				me: false,
				confirmed: false
			},
			{
				tokens: [],
				name: "Jon",
				id: "b311adef-549e-4bab-9b6e-1cc9a0a4e26a",
				claims: [],
				notes: "",
				suspectedRole: rolesById_default.empath,
				dead: false,
				me: false,
				confirmed: false
			},
			{
				tokens: [],
				name: "Holly",
				id: "89f43ace-b838-4288-a271-88fb2af9bbf3",
				claims: [],
				notes: "",
				suspectedRole: rolesById_default.poisoner,
				dead: false,
				me: false,
				confirmed: false
			}
		],
		scriptData: {
			loric: [],
			townsfolk: [
				rolesById_default.washerwoman,
				rolesById_default.librarian,
				rolesById_default.investigator,
				rolesById_default.chef,
				rolesById_default.empath,
				rolesById_default.fortuneteller,
				rolesById_default.undertaker,
				rolesById_default.monk,
				rolesById_default.ravenkeeper,
				rolesById_default.virgin,
				rolesById_default.slayer,
				rolesById_default.soldier,
				rolesById_default.mayor
			],
			minion: [
				rolesById_default.poisoner,
				rolesById_default.spy,
				rolesById_default.scarletwoman,
				rolesById_default.baron
			],
			outsider: [
				rolesById_default.butler,
				rolesById_default.drunk,
				rolesById_default.recluse,
				rolesById_default.saint
			],
			traveller: [
				rolesById_default.bureaucrat,
				rolesById_default.thief,
				rolesById_default.gunslinger,
				rolesById_default.scapegoat,
				rolesById_default.beggar
			],
			demon: [rolesById_default.imp],
			fabled: []
		},
		rolesInPlay: [
			rolesById_default.slayer,
			rolesById_default.chef,
			rolesById_default.empath,
			rolesById_default.imp,
			rolesById_default.poisoner,
			rolesById_default.drunk,
			rolesById_default.fortuneteller,
			rolesById_default.monk
		],
		script: "Trouble Brewing",
		stMode: true,
		state: "in-progress",
		tokens: [
			{
				id: "slayer-No Ability",
				role: "slayer",
				label: "No Ability",
				icon: "slayer",
				type: "Townsfolk",
				humanReadableRole: "Slayer"
			},
			{
				id: "imp-Dead",
				role: "imp",
				label: "Dead",
				icon: "imp",
				type: "Demon",
				humanReadableRole: "Imp"
			},
			{
				id: "poisoner-Poisoned",
				role: "poisoner",
				label: "Poisoned",
				icon: "poisoner",
				type: "Minion",
				humanReadableRole: "Poisoner"
			},
			{
				id: "drunk-Is The Drunk",
				role: "drunk",
				label: "Is The Drunk",
				icon: "drunk",
				type: "Outsider",
				humanReadableRole: "Drunk"
			},
			{
				id: "fortuneteller-Red Herring",
				role: "fortuneteller",
				label: "Red Herring",
				icon: "fortuneteller",
				type: "Townsfolk",
				humanReadableRole: "Fortune Teller"
			},
			{
				id: "special-Evil",
				role: "special",
				label: "Evil",
				icon: "evil",
				type: "demon",
				humanReadableRole: "Evil"
			},
			{
				id: "special-Good",
				role: "special",
				label: "Good",
				icon: "good",
				type: "townsfolk",
				humanReadableRole: "Good"
			},
			{
				id: "monk-Safe",
				role: "monk",
				label: "Safe",
				icon: "monk",
				type: "Townsfolk",
				humanReadableRole: "Monk"
			}
		],
		travellers: true
	}
});
state.addPlugins([
	deadlogPlugin,
	minstrel,
	banshee,
	marionette,
	addMissingTokens,
	nodashii,
	tealady,
	courtier,
	grandchild,
	barber,
	drunk,
	acrobat,
	leviathan,
	preacher
]);
if ("firstVisit" in state.getState() === false) state.setState((old) => ({
	...old,
	firstVisit: false
}));
window.state = state;
//#endregion
export { APPENDED_ROLES as A, night_order_default as B, isProtected as C, tooltip as D, saveScript as E, api as F, get as H, images as I, e as L, SCRIPTS_DATA as M, SORT_ORDER as N, transformToSchemaScript as O, TRAVELLER_SHEET as P, i as R, isGood as S, nightOrder as T, set as U, del as V, getOnTheBlock as _, timer as a, img as b, MediaQueryController as c, alignment as d, cache as f, getNominationVoteCount as g, formatDate as h, stats as i, LETHAL_ROLES as j, traveller as k, SAO as l, capitalize as m, settings as n, rolesById_default as o, calculateEffectiveVoteCount as p, state as r, BREAKPOINTS as s, State as t, Service as u, getVoteId as v, mapBotcScript as w, isDroisoned as x, getVoteMultiplier as y, t as z };
