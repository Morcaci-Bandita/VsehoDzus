import { I as i, L as r, P as b, _ as focus, d as bg9, f as border, g as elevation4, o as bg4, s as bg5, t as when, u as bg8 } from "./CY602n9t.js";
import { M as SCRIPTS_DATA, N as SORT_ORDER, P as TRAVELLER_SHEET, b as img, d as alignment, m as capitalize, n as settings, r as state } from "./CP0hEE1l.js";
import "./vIOCOudq.js";
import { n as sortableListStyles, t as SortableListMixin } from "./BiTbQJWR.js";
import { D as plus, O as drag, P as trash, T as minus } from "./CEyrKUT7.js";
import { t as inlay } from "./Ue9OS-EJ.js";
import { t as button } from "./CbFrBy7s.js";
import { t as iconButton } from "./C0jyJKsx.js";
import { t as input } from "./_hTQLwBE.js";
import { t as c } from "./CINdyCSV.js";
import { t as visuallyHidden } from "./DZ8S2RMZ.js";
import { t as select } from "./C-op7emD.js";
import { t as radio } from "./Bx4sgpmC.js";
import "./D9Tfud2d2.js";
import { t as BotcFlowElement } from "./Fe0s9FWC2.js";
//#region src/flows/create-game/utils.js
/**
* Roles that modify the standard traveller-sheet composition.
*
* Each entry may take one of seven forms:
*
* 1. **Regular swap** `{ type, amount, removeFrom }` — always fires; removes
*    up to `amount` seats of `removeFrom` and adds the same to `type`.
*
* 2. **Optional swap** `{ type, amount, removeFrom, optional: true }` — the
*    Storyteller may or may not apply the swap.  Both the base composition and
*    the swapped composition are valid.
*
* 3. **Choice swap** (array of swaps) — the Storyteller must apply exactly one
*    of the listed swaps.  Each swap is tried independently and all resulting
*    compositions are valid.
*
* 4. **Required-role pairing** `{ requiredRole }` — no composition effect; the
*    paired role must also be in play.
*
* 5. **Max-count constraint** `{ maxCount }` — the role may appear in the game
*    at most `maxCount` times (including itself); no composition-count effect.
*
* 6. **Wildcard types** `{ wildcardTypes: string[] }` — any count of the listed
*    types is valid; composition violations for those types are suppressed.
*
* 7. **Exact counts** `{ exactCounts: Record<string, number> }` — the listed
*    types must be exactly the given count regardless of player count or other
*    roles.  Combined with `wildcardTypes` for types that are unrestricted.
*    Only meaningful on entries that also carry `override: true`.
*
* **Override flag** `override: true` — when present, all other special-case
* composition modifiers are ignored; only this role's own `wildcardTypes` and
* `exactCounts` apply.  Role-adjustment violations from other roles are
* suppressed entirely.
*/
const specialCases = {
	lordoftyphon: {
		wildcardTypes: ["townsfolk", "outsider"],
		exactCounts: { minion: 0 },
		override: true
	},
	huntsman: {
		requiredRole: "damsel",
		type: "outsider",
		amount: 1,
		removeFrom: "townsfolk"
	},
	choirboy: { requiredRole: "king" },
	baron: {
		type: "outsider",
		amount: 2,
		removeFrom: "townsfolk"
	},
	fanggu: {
		type: "outsider",
		amount: 1,
		removeFrom: "townsfolk"
	},
	vigormortis: {
		type: "townsfolk",
		amount: 1,
		removeFrom: "outsider"
	},
	summoner: {
		type: "townsfolk",
		amount: 1,
		removeFrom: "demon"
	},
	balloonist: {
		type: "outsider",
		amount: 1,
		removeFrom: "townsfolk",
		optional: true
	},
	hermit: {
		type: "townsfolk",
		amount: 1,
		removeFrom: "outsider",
		optional: true
	},
	godfather: [{
		type: "townsfolk",
		amount: 1,
		removeFrom: "outsider"
	}, {
		type: "outsider",
		amount: 1,
		removeFrom: "townsfolk"
	}],
	villageidiot: { maxCount: 3 },
	kazali: {
		wildcardTypes: ["townsfolk", "outsider"],
		exactCounts: { minion: 0 },
		override: true
	},
	xaan: {
		wildcardTypes: ["townsfolk", "outsider"],
		override: true
	}
};
/**
* Returns true when `val` is a `{min, max}` range object rather than a plain
* number.
*
* @param {number | {min: number, max: number}} val
* @returns {val is {min: number, max: number}}
*/
function isRange(val) {
	return typeof val === "object" && val !== null && "min" in val;
}
/**
* Returns true when `n` satisfies `val`.  For a plain number this is strict
* equality; for a range it is an inclusive bounds check.
*
* @param {number | {min: number, max: number}} val
* @param {number} n
* @returns {boolean}
*/
function rangeIncludes(val, n) {
	if (isRange(val)) return n >= val.min && n <= val.max;
	return val === n;
}
/**
* Returns a human-readable string for a plain number or a `{min, max}` range.
*
* @param {number | {min: number, max: number}} val
* @returns {string}
*/
function formatRange(val) {
	if (isRange(val)) return `${val.min}–${val.max}`;
	return String(val);
}
/** @param {Array} arr */
function permutations(arr) {
	if (arr.length <= 1) return [arr.slice()];
	const result = [];
	for (let i = 0; i < arr.length; i++) {
		const rest = arr.filter((_, j) => j !== i);
		for (const perm of permutations(rest)) result.push([arr[i], ...perm]);
	}
	return result;
}
/**
* Yields every combination from the Cartesian product of `optionLists`.
* Each sub-array in `optionLists` is the list of choices for one role.
* Yields one flat array per combination (one choice per role).
*
* @param {Array<Array<any>>} optionLists
*/
function* cartesian(optionLists) {
	if (optionLists.length === 0) {
		yield [];
		return;
	}
	const [first, ...rest] = optionLists;
	for (const choice of first) for (const tail of cartesian(rest)) yield [choice, ...tail];
}
/**
* Returns every distinct composition that can result from applying the
* composition-modifying roles in `rolesInPlay` in any order.
*
* Each modifier is an *atomic swap*: it removes `min(amount, available)`
* seats from `removeFrom` and adds the same number to `type`.  Because the
* swap is clamped by availability, applying modifiers in different orders can
* yield different final compositions when a source type would run out.  Every
* permutation is tried and unique results are collected.
*
* Optional modifiers (`optional: true`) are tried both applied and not applied.
* Choice modifiers (arrays) are tried with each alternative independently.
*
* @param {Array<{id: string, type: string}>} rolesInPlay
* @param {number} amountOfPlayers
* @returns {Array<{townsfolk:number, outsider:number, minion:number, demon:number}> | null}
*/
function getValidCompositions(rolesInPlay, amountOfPlayers) {
	const sheet = TRAVELLER_SHEET[amountOfPlayers];
	if (!sheet) return null;
	const base = {
		townsfolk: sheet.players,
		outsider: sheet.outsiders,
		minion: sheet.minions,
		demon: sheet.demons
	};
	const seenIds = /* @__PURE__ */ new Set();
	let overrideCase = null;
	for (const role of rolesInPlay) {
		if (seenIds.has(role.id)) continue;
		seenIds.add(role.id);
		const sc = specialCases[role.id];
		if (sc && !Array.isArray(sc) && sc.override) {
			overrideCase = sc;
			break;
		}
	}
	if (overrideCase) {
		const comp = { ...base };
		if (overrideCase.exactCounts) Object.assign(comp, overrideCase.exactCounts);
		return [comp];
	}
	const optionLists = [];
	seenIds.clear();
	for (const role of rolesInPlay) {
		if (seenIds.has(role.id)) continue;
		seenIds.add(role.id);
		const sc = specialCases[role.id];
		if (!sc) continue;
		if (!Array.isArray(sc) && sc.type === void 0) continue;
		if (Array.isArray(sc)) optionLists.push(sc);
		else if (sc.optional) {
			const { optional: _opt, ...mod } = sc;
			optionLists.push([null, mod]);
		} else optionLists.push([sc]);
	}
	if (optionLists.length === 0) return [{ ...base }];
	const seen = /* @__PURE__ */ new Set();
	const results = [];
	for (const combo of cartesian(optionLists)) {
		const activeModifiers = combo.filter(Boolean);
		for (const perm of permutations(activeModifiers)) {
			const comp = { ...base };
			for (const mod of perm) {
				const swapped = Math.min(mod.amount, comp[mod.removeFrom] ?? 0);
				comp[mod.removeFrom] -= swapped;
				comp[mod.type] += swapped;
			}
			const key = JSON.stringify(comp);
			if (!seen.has(key)) {
				seen.add(key);
				results.push(comp);
			}
		}
	}
	return results;
}
/**
* Returns the expected role counts as per-type ranges derived from all valid
* compositions.  When all valid compositions agree on a type's value that type
* is returned as a plain number; when they differ it is returned as
* `{min, max}`.
*
* @param {Array<{id: string, type: string}>} rolesInPlay
* @param {number} amountOfPlayers
* @returns {{ townsfolk: number|{min:number,max:number},
*             outsider:  number|{min:number,max:number},
*             minion:    number|{min:number,max:number},
*             demon:     number|{min:number,max:number} } | null}
*/
function getAdjustedExpected(rolesInPlay, amountOfPlayers) {
	const validComps = getValidCompositions(rolesInPlay, amountOfPlayers);
	if (!validComps) return null;
	const expected = {};
	for (const type of [
		"townsfolk",
		"outsider",
		"minion",
		"demon"
	]) {
		const values = validComps.map((c) => c[type]);
		const min = Math.min(...values);
		const max = Math.max(...values);
		expected[type] = min === max ? min : {
			min,
			max
		};
	}
	return expected;
}
/**
* Returns the set of role types that are entirely unrestricted due to wildcard
* roles in play (e.g. Xaan makes townsfolk and outsider counts unrestricted).
* The returned strings are lowercase role type names (e.g. `"townsfolk"`,
* `"outsider"`), matching the keys used by {@link getActualCounts}.
*
* @param {Array<{id: string}>} rolesInPlay
* @returns {Set<string>}
*/
function getWildcardTypes(rolesInPlay) {
	const wildcardTypes = /* @__PURE__ */ new Set();
	for (const role of rolesInPlay) {
		const sc = specialCases[role.id];
		if (sc?.wildcardTypes) for (const t of sc.wildcardTypes) wildcardTypes.add(t);
	}
	return wildcardTypes;
}
/**
* Returns the actual counts of each role type in `rolesInPlay`.
*
* @param {Array<{type: string}>} rolesInPlay
* @returns {{ townsfolk: number, outsider: number, minion: number, demon: number }}
*/
function getActualCounts(rolesInPlay) {
	const actual = {
		townsfolk: 0,
		outsider: 0,
		minion: 0,
		demon: 0
	};
	for (const role of rolesInPlay) {
		const type = role.type?.toLowerCase();
		if (type in actual) actual[type]++;
	}
	return actual;
}
/**
* Returns a list of violations between the selected roles and the expected
* traveller-sheet composition.
*
* The validity check compares the actual composition against *every* valid
* composition produced by `getValidCompositions`.  A combination is accepted
* as soon as it matches any one of those compositions exactly, so all valid
* orderings of conflicting modifiers are accepted without a warning.
*
* @param {Array<{id: string, type: string}>} rolesInPlay
* @param {number} amountOfPlayers
* @returns {Array<object>}
*/
function getTravellerSheetViolations(rolesInPlay, amountOfPlayers) {
	if (!rolesInPlay?.length || !amountOfPlayers) return [];
	const validComps = getValidCompositions(rolesInPlay, amountOfPlayers);
	if (!validComps) return [];
	const violations = [];
	const seenIds = /* @__PURE__ */ new Set();
	const actual = getActualCounts(rolesInPlay);
	for (const role of rolesInPlay) {
		const id = role.id;
		if (seenIds.has(id)) continue;
		seenIds.add(id);
		const sc = specialCases[id];
		if (!sc || sc.requiredRole === void 0) continue;
		if (!rolesInPlay.some((r) => r.id === sc.requiredRole)) violations.push({
			type: "missing-role",
			role,
			requiredId: sc.requiredRole
		});
	}
	seenIds.clear();
	for (const role of rolesInPlay) {
		const id = role.id;
		if (seenIds.has(id)) continue;
		seenIds.add(id);
		const sc = specialCases[id];
		if (!sc || sc.maxCount === void 0) continue;
		const count = rolesInPlay.filter((r) => r.id === id).length;
		if (count > sc.maxCount) violations.push({
			type: "max-count",
			role,
			maxCount: sc.maxCount,
			actual: count
		});
	}
	const wildcardTypes = getWildcardTypes(rolesInPlay);
	const hasOverride = rolesInPlay.some((r) => {
		const sc = specialCases[r.id];
		return sc && !Array.isArray(sc) && sc.override;
	});
	if (validComps.some((comp) => (wildcardTypes.has("townsfolk") || comp.townsfolk === actual.townsfolk) && (wildcardTypes.has("outsider") || comp.outsider === actual.outsider) && comp.minion === actual.minion && comp.demon === actual.demon)) return violations;
	const expected = getAdjustedExpected(rolesInPlay, amountOfPlayers);
	const explainedTypes = /* @__PURE__ */ new Set();
	seenIds.clear();
	if (!hasOverride) for (const role of rolesInPlay) {
		const id = role.id;
		if (seenIds.has(id)) continue;
		seenIds.add(id);
		const sc = specialCases[id];
		if (!sc) continue;
		if (!Array.isArray(sc) && sc.type === void 0) continue;
		const mods = Array.isArray(sc) ? sc : [sc];
		for (const mod of mods) {
			if (mod.type) explainedTypes.add(mod.type);
			if (mod.removeFrom) explainedTypes.add(mod.removeFrom);
		}
		if (mods.every((mod) => wildcardTypes.has(mod.type) && wildcardTypes.has(mod.removeFrom))) continue;
		if (Array.isArray(sc) ? true : mods.some((mod) => !wildcardTypes.has(mod.type) && !rangeIncludes(expected[mod.type], actual[mod.type]) || !wildcardTypes.has(mod.removeFrom) && !rangeIncludes(expected[mod.removeFrom], actual[mod.removeFrom]))) violations.push({
			type: "role-adjustment",
			role,
			specialCase: sc
		});
	}
	for (const [type, count] of Object.entries(expected)) if (!wildcardTypes.has(type) && !rangeIncludes(count, actual[type]) && !explainedTypes.has(type)) violations.push({
		type: "count",
		roleType: type,
		actual: actual[type],
		expected: count
	});
	return violations;
}
//#endregion
//#region src/flows/create-game/index.js
var CreateGameStepOne = class extends BotcFlowElement {
	static properties = {
		scriptName: { type: String },
		travellers: { type: Boolean }
	};
	constructor() {
		super();
		this.scriptName = "";
		this.travellers = false;
	}
	mapStateToProps(state) {
		return {
			scriptName: state.scriptName,
			travellers: state.travellers
		};
	}
	async handleScriptChange(e) {
		const selectedScript = e.target.value;
		this.setState((state) => ({
			...state,
			scriptName: selectedScript,
			rolesInPlay: []
		}));
		this.next();
	}
	static styles = [
		button,
		select,
		i`
      :host {
        display: flex;
        flex-direction: column;
        flex: 1;
      }

      ${r(visuallyHidden)}

      .travellers div {
        border-radius: 4px;
        padding: 8px;
        width: 100%;
        display: flex;
      }

      .travellers input:focus-visible + * {
        background: ${bg5};
        transition: background 0.2s ease-in;
        ${focus()}
      }

      .travellers input:hover + * {
        background: ${bg5};
        transition: background 0.2s ease-in;
      }

      .travellers input:active + * {
        background: ${bg4};
        transition: background 0.2s ease-in;
      }

      .travellers .checkbox {
        width: 20px;
        height: 20px;
        border-radius: 50%;
        border: solid 2px var(--ui-bg-9);
        background: var(--ui-bg-8);
        margin-right: 8px;
      }

      .travellers input:checked + div .checkbox {
        border: solid 2px rgb(112, 210, 125);
        background: #586f5a;
      }

      .travellers input + div .checkbox span {
        display: none;
      }

      .travellers input:checked + div .checkbox span svg {
        width: 20px;
        height: 20px;
      }

      .travellers input:checked + div .checkbox span {
        display: flex;
        justify-content: center;
        align-items: center;
      }

      .travellers input:checked + div {
        background: ${bg4};
        transition:
          background 0.2s ease-in,
          border 0.2s ease-in;
      }

      .buttons {
        margin-top: auto;
      }

      a.link {
        color: var(--ui-main-5);
      }
    `
	];
	render() {
		return b`
      <p>Which script would you like to play?</p>
      <label ui-label for="script-select">
        <select
          @change=${this.handleScriptChange}
          ui-select
          name="scripts"
          id="script-select"
        >
          ${Object.keys(SCRIPTS_DATA).filter((s) => s !== "All").map((script, i) => b`
                <option
                  ?selected=${this.scriptName === script || i === 0}
                  value="${script}"
                >
                  ${script}
                </option>
              `)}
        </select>
        <span>Script</span>
      </label>
      <p>
        You can find more scripts in the
        <a
          @click=${() => {
			this.close();
		}}
          class="link"
          href="/scripts"
          >Homebrew Scripts</a
        >
        section of the app, or import/create your own scripts.
      </p>
      <div class="buttons">
        <button class="next" ui-button primary @click=${this.next}>Next</button>
        <button ui-button secondary @click=${this.close}>Close</button>
      </div>
    `;
	}
};
customElements.define("create-game-step-one", CreateGameStepOne);
var CreateGameStepTwo = class extends BotcFlowElement {
	static properties = { amountOfPlayers: { type: Number } };
	mapStateToProps(state) {
		return { amountOfPlayers: state.amountOfPlayers };
	}
	static styles = [
		button,
		input,
		select,
		i`
      :host {
        display: flex;
        flex-direction: column;
        flex: 1;
      }

      .buttons {
        margin-top: auto;
      }
    `
	];
	render() {
		return b`
      <p>How many players are in your party?</p>
      <label class="amount-of-players-select" ui-label for="amount-of-players">
        <select
          ui-select
          @change=${(e) => {
			this.setState((state) => ({
				...state,
				amountOfPlayers: Number(e.target.value),
				playerNames: (state.playerNames ?? []).slice(0, Number(state.gameMode === "player" ? e.target.value - 1 : e.target.value))
			}));
			this.next();
		}}
          name="amount"
          id="amount-of-players"
        >
          ${[...Array(20)].map((_, i) => i + 5).map((val) => b`
                <option
                  ?selected=${String(this.amountOfPlayers) === String(val)}
                  value="${val}"
                >
                  ${val}
                </option>
              `)}
        </select>
        <span>Amount of players</span>
      </label>

      <div class="buttons">
        <button class="next" ui-button primary @click=${this.next}>Next</button>
        <button ui-button secondary @click=${this.close}>Close</button>
      </div>
    `;
	}
};
customElements.define("create-game-step-two", CreateGameStepTwo);
var CreateGameStepThree = class extends BotcFlowElement {
	static properties = { gameMode: { type: String } };
	constructor() {
		super();
		this.gameMode = "";
	}
	mapStateToProps(state) {
		return { gameMode: state.gameMode };
	}
	static styles = [
		button,
		input,
		select,
		radio,
		i`
      :host {
        display: flex;
        flex-direction: column;
        flex: 1;
      }

      .buttons {
        margin-top: auto;
      }

      label:first-of-type {
        margin-bottom: 4px !important;
      }
    `
	];
	render() {
		return b`
      <p>Are you playing as a player, or are you the storyteller?</p>
      <label ui-label for="player">
        <input
          ui-radio
          type="radio"
          name="result"
          id="player"
          ?checked=${this.gameMode === "player"}
          visually-hidden
          @change=${() => {
			this.resultSelected = true;
			this.setState((state) => ({
				...state,
				gameMode: "player"
			}));
			this.next();
		}}
        />
        <div>
          <div class="toggle"><span class="selected"></span></div>
          <div class="content">Player</div>
        </div>
      </label>
      <label ui-label for="st">
        <input
          ui-radio
          type="radio"
          name="result"
          id="st"
          ?checked=${this.gameMode === "st"}
          visually-hidden
          @change=${() => {
			this.resultSelected = true;
			this.setState((state) => ({
				...state,
				gameMode: "st"
			}));
			this.next();
		}}
        />
        <div>
          <div class="toggle"><span class="selected"></span></div>
          <div class="content">Storyteller</div>
        </div>
      </label>
      <div class="buttons">
        <button
          ?disabled=${!this.gameMode}
          class="next"
          ui-button
          primary
          @click=${this.next}
        >
          Next
        </button>
        <button ui-button secondary @click=${this.close}>Close</button>
      </div>
    `;
	}
};
customElements.define("create-game-step-three", CreateGameStepThree);
var CreateGameStepFour = class extends SortableListMixin(BotcFlowElement) {
	static properties = {
		amountOfPlayers: { type: Number },
		gameMode: { type: String },
		isFormValid: { type: Boolean },
		playerNames: { type: Array }
	};
	constructor() {
		super();
		this.playerNames = [];
		this.gameMode = "";
		this.amountOfPlayers = 0;
		this._playerIds = [];
	}
	mapStateToProps(state) {
		return {
			amountOfPlayers: state.amountOfPlayers,
			playerNames: state.playerNames ?? []
		};
	}
	static styles = [
		button,
		input,
		select,
		radio,
		iconButton,
		sortableListStyles,
		i`
      :host {
        display: flex;
        flex-direction: column;
        flex: 1;
      }

      .buttons {
        margin-top: auto;
      }

      .player-list {
        list-style: none;
        padding: 0;
        margin: 0;
      }

      .player-list li {
        display: flex;
        width: 100%;
      }

      .player-row {
        width: 100%;
        display: flex;
        align-items: center;
        margin-bottom: 4px !important;
      }

      .drag-handle {
        display: flex;
        align-items: center;
        align-self: stretch;
        cursor: move;
        padding: 0 4px;
        flex-shrink: 0;
      }

      .drag-handle svg {
        width: 20px;
        height: 20px;
      }

      .player-row label {
        flex: 1;
      }

      #clear {
        margin-bottom: 80px;
      }

      label[ui-label].input-lbl {
        display: flex;
        flex: 1;
        flex-direction: row;
        align-items: center;
      }
      .input-lbl input[ui-input] {
        flex: 1;
        width: 100%;
      }
      button[ui-icon-button] {
        margin-left: 8px;
      }

      .tp {
        display: flex;
      }
      .tp label {
        flex: 1;
      }
      .tp button[ui-icon-button] {
        margin-left: 12px;
      }
    `
	];
	firstUpdated() {
		const form = this.shadowRoot.querySelector("#playernames");
		this.isFormValid = form.checkValidity();
		const numInputs = this.gameMode === "player" ? this.amountOfPlayers - 1 : this.amountOfPlayers;
		this._playerIds = Array.from({ length: numInputs }, (_, i) => i);
		if ((this.playerNames ?? []).filter(Boolean).length === 0) {
			const fallbackNames = [...state.getState()?.currentGame?.players ?? []].filter((p) => !p?.me).map((p) => p?.name ?? "");
			const defaultLength = this.gameMode === "player" ? this.amountOfPlayers - 1 : this.amountOfPlayers;
			const filled = Array.from({ length: defaultLength }).map((_, i) => fallbackNames[i] ?? "");
			this.setState((s) => ({
				...s,
				playerNames: filled
			}));
		}
	}
	render() {
		const currentPlayers = state.getState()?.currentGame?.players ?? Array.from({ length: this.amountOfPlayers - 1 }).fill(null);
		const numInputs = this.gameMode === "player" ? this.amountOfPlayers - 1 : this.amountOfPlayers;
		const fallbackNames = [...currentPlayers].filter((p) => !p?.me).map((p) => p?.name ?? "").slice(0, numInputs);
		return b`
      ${when(this.gameMode === "player", () => b`
          <label ui-label for="me">
            <input
              required
              ui-input
              @input=${this.handleInput}
              type="text"
              value="${settings.getState().name ?? ""}"
              name="me"
              id="me"
              placeholder="Your name"
            />
            <span>Your name</span>
          </label>
        `)}
      <p>
        Entering player names is optional, you can also edit names later, during
        the game.
      </p>
      <div class="tp">
        <label ui-label><span>Players</span></label
        ><button
          ui-icon-button
          @click=${() => {
			this.setState((s) => {
				this._playerIds = [this._nextId(), ...this._playerIds];
				return {
					...s,
					playerNames: ["", ...s.playerNames],
					amountOfPlayers: s.amountOfPlayers + 1
				};
			});
		}}
        >
          ${plus}
        </button>
      </div>

      <form id="playernames" @submit=${this.handleSubmit}>
        <ul
          class="player-list"
          sortable-list
          @sortable-list-order-changed=${(e) => {
			this._onPlayerOrderChanged(e);
		}}
        >
          ${c(this._playerIds, (id) => id, (id, i) => {
			const name = this.playerNames?.[i] ?? fallbackNames[i] ?? "";
			return b`
                <li sortable-dragged-item-container>
                  <div class="player-row" data-id="${id}">
                    <div sortable-dragged-item-trigger class="drag-handle">
                      ${drag}
                    </div>
                    <label class="input-lbl" ui-label for="player-name-${id}">
                      <input
                        ui-input
                        type="text"
                        name="player-name-${id}"
                        id="player-name-${id}"
                        placeholder="Player ${i + 1} (optional)"
                        .value=${name}
                        @input=${(e) => this.updatePlayerName(i, e.target.value)}
                      />
                    </label>
                    <button
                      ui-icon-button
                      @click=${(e) => {
				e.preventDefault();
				this.removePlayer(i);
			}}
                    >
                      ${trash}
                    </button>
                  </div>
                </li>
              `;
		})}
        </ul>
      </form>
      <button id="clear" ui-button secondary @click=${this.clearNames}>
        Clear names
      </button>

      <div class="buttons">
        <button form="playernames" class="next" type="submit" ui-button primary>
          ${this.gameMode === "player" ? "Start game" : "Next"}
        </button>
        <button ui-button secondary @click=${this.close}>Close</button>
      </div>
    `;
	}
	removePlayer(index) {
		this._playerIds = this._playerIds.filter((_, i) => i !== index);
		this.setState((s) => {
			const playerNames = [...s.playerNames ?? []];
			playerNames.splice(index, 1);
			return {
				...s,
				playerNames,
				amountOfPlayers: Math.max(0, s.amountOfPlayers - 1)
			};
		});
		this.updateComplete.then(() => this.handleInput());
	}
	_nextId() {
		return this._idCounter = (this._idCounter ?? this._playerIds.length) + 1;
	}
	handleInput() {
		const form = this.shadowRoot.querySelector("#playernames");
		const meInput = this.shadowRoot.querySelector("#me");
		const valid = form.checkValidity();
		this.isFormValid = this.gameMode === "player" ? valid && meInput?.checkValidity() : valid;
	}
	updatePlayerName(index, name) {
		this.handleInput();
		const updated = [...this.playerNames];
		updated[index] = name;
		this.setState((s) => ({
			...s,
			playerNames: updated
		}));
	}
	clearNames() {
		const cleared = this.playerNames.map(() => "");
		this.setState((s) => ({
			...s,
			playerNames: cleared
		}));
	}
	async _onPlayerOrderChanged(e) {
		const { currentIndex, nextIndex } = e.detail;
		const updated = [...this.playerNames ?? []];
		if (currentIndex < 0 || nextIndex < 0 || currentIndex >= updated.length || nextIndex >= updated.length) return;
		const list = this.shadowRoot.querySelector("ul.player-list");
		const items = Array.from(list.children);
		const firstRects = /* @__PURE__ */ new Map();
		for (const li of items) {
			const wrapper = li.querySelector(".player-row");
			if (!wrapper) continue;
			const id = wrapper.dataset.id;
			firstRects.set(id, wrapper.getBoundingClientRect());
		}
		[updated[currentIndex], updated[nextIndex]] = [updated[nextIndex], updated[currentIndex]];
		const ids = [...this._playerIds];
		[ids[currentIndex], ids[nextIndex]] = [ids[nextIndex], ids[currentIndex]];
		this._playerIds = ids;
		this.setState((s) => ({
			...s,
			playerNames: updated
		}));
		await this.updateComplete;
		const newItems = Array.from(this.shadowRoot.querySelector("ul.player-list").children);
		for (const li of newItems) {
			if (li.hasAttribute("dragged")) continue;
			const wrapper = li.querySelector(".player-row");
			if (!wrapper) continue;
			const id = wrapper.dataset.id;
			const oldRect = firstRects.get(id);
			if (!oldRect) continue;
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
	async handleSubmit(e) {
		e.preventDefault();
		const me = this.shadowRoot.querySelector("#me")?.value;
		let playerCounter = 1;
		const filledNames = this.playerNames.map((name) => {
			if (name?.trim()) return name;
			return `Player ${playerCounter++}`;
		});
		this.setState((s) => ({
			...s,
			playerNames: filledNames
		}));
		if (!settings.getState().name && me) settings.setState((s) => ({
			...s,
			name: me
		}));
		const scriptData = await SCRIPTS_DATA[this.scriptName]();
		if (this.gameMode === "player") {
			await startGame({
				playerNames: filledNames,
				me: this.shadowRoot.querySelector("#me")?.value,
				gameMode: this.gameMode,
				scriptName: this.scriptName,
				travellers: this.travellers,
				scriptData
			});
			this.finalize();
			this.close();
		} else this.next();
	}
};
customElements.define("create-game-step-four", CreateGameStepFour);
var CreateGameStepFive = class extends BotcFlowElement {
	static properties = {
		rolesInPlay: { type: Array },
		amountOfPlayers: { type: Number },
		roles: { type: Array }
	};
	constructor() {
		super();
		this.roles = [];
	}
	mapStateToProps(state) {
		return {
			rolesInPlay: state.rolesInPlay,
			amountOfPlayers: state.amountOfPlayers
		};
	}
	static styles = [
		button,
		input,
		select,
		inlay,
		radio,
		iconButton,
		i`
      :host {
        display: flex;
        flex-direction: column;
        flex: 1;
      }

      .traveller-sheet {
        padding: 0;
        list-style: none;
        margin: 0;
        padding: 16px;
        /* margin-bottom: 24px; */
      }

      .traveller-sheet li {
        display: flex;
        padding-bottom: 6px;
        padding-top: 6px;
        align-items: center;
      }

      .traveller-sheet li:not(:last-of-type) {
        border-bottom: solid 1px ${border};
      }

      .traveller-sheet li .traveller-kind {
        flex: 1;
      }

      .traveller-nr {
        font-variant-numeric: tabular-nums;
      }

      .traveller-sheet li.mismatch .traveller-nr {
        color: #d9403b;
        font-weight: bold;
      }

      .buttons {
        margin-top: auto;
      }

      button[ui-button][primary].randomize {
        margin-top: 22px;
      }

      .roles-list {
        list-style: none;
        padding: 0;
      }

      button.role-info {
        all: unset;
        margin-right: 10px;
      }

      .roles-list .role .role-info {
        display: flex;
        flex: 1;
        align-items: center;
      }

      .roles-list .role .role-text {
        flex: 1;
      }

      .roles-list .role {
        ${elevation4()}
        display: flex;
        align-items: center;
        /* margin-bottom: 10px; */
        background: ${bg5};
        border: solid 1px ${border};
        border-radius: 8px;
        padding: 8px;
        transition: background 0.2s;
        margin-bottom: 10px;
      }

      .roles-list .role.selected {
        border: solid 2px rgb(112, 210, 125);
        background: #4c564d;
        padding: 7px;
      }

      .roles-list img {
        width: 50px;
        height: 50px;
        border-radius: 50%;
        border: solid 2px ${bg9};
        background-color: ${bg8};
        margin-right: 10px;
      }

      .balgruf {
        font-family: "Balgruf";
        font-size: 1.375rem;
        color: var(--ui-main-5);
        text-shadow: 1px 1px 2px rgba(0, 0, 0, 1);
        margin: 0;
      }

      .roles-list .blue {
        color: #45a0f1;
      }

      .roles-list .red {
        color: #d9403b;
      }
      .roles-list .yellow {
        color: #ffee00;
      }
      .roles-list .green {
        color: #a7e16c;
      }

      .roles-list img.blue {
        border: solid 2px #45a0f1;
      }
      .roles-list img.red {
        border: solid 2px #d9403b;
      }
      .roles-list img.yellow {
        border: solid 2px #ffee00;
      }
      .roles-list img.green {
        border: solid 2px #a7e16c;
      }

      .description {
        font-size: 0.85rem;
      }

      .roles-list .counter {
        display: flex;
      }

      .roles-list .counter-amount {
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 2rem;
        line-height: 0;
        width: 25px;
        color: var(--ui-bg-2);
      }

      .balgruf.blue,
      .special-notes .blue,
      .roles-list .counter-amount.blue {
        color: #45a0f1;
      }
      .balgruf.red,
      .special-notes .red,
      .roles-list .counter-amount.red {
        color: #d9403b;
      }
      .special-notes .yellow,
      .roles-list .counter-amount.yellow {
        color: #ffee00;
      }
      .special-notes .green,
      .roles-list .counter-amount.green {
        color: #a7e16c;
      }
      .special-notes .orange,
      .roles-list .counter-amount.orange {
        color: var(--ui-main-5);
      }

      .special-notes {
        list-style: none;
        padding: 0;
        margin-top: 26px;
      }

      .special-notes li {
        display: flex;
        align-items: center;
      }

      .special-notes li strong {
        display: flex;
        flex-shrink: 0;
        margin-right: 8px;
      }

      .traveller-df {
        flex-basis: 20px;
        text-align: center;
      }

      .traveller-df.is-range {
        flex-basis: 35px;
      }

      .traveller-std {
        color: #838383;
      }

      .pl {
        flex: 1;
      }

      .traveller-sheet li.players {
        margin-bottom: 20px;
        border-bottom: unset;
      }
      li.players.mismatch .players-nr {
        color: #d9403b;
        font-weight: bold;
      }
    `
	];
	async connectedCallback() {
		super.connectedCallback();
		this.roles = Object.values(await SCRIPTS_DATA[this.scriptName]()).reduce((acc, roles) => acc.concat(roles), []);
	}
	randomize() {
		const allRoles = this.roles.filter((r) => r.type && r.type.toLowerCase() !== "traveller" && r.id !== "demoninfo" && r.id !== "minioninfo");
		const counts = TRAVELLER_SHEET[this.amountOfPlayers];
		const selected = [];
		for (const [key, count] of Object.entries(counts)) {
			let type;
			switch (key) {
				case "players":
					type = "townsfolk";
					break;
				case "outsiders":
					type = "outsider";
					break;
				case "minions":
					type = "minion";
					break;
				case "demons":
					type = "demon";
					break;
				default: continue;
			}
			const rolesOfType = allRoles.filter((r) => r.type?.toLowerCase() === type);
			for (let i = 0; i < count && rolesOfType.length; i++) {
				const index = Math.floor(Math.random() * rolesOfType.length);
				selected.push(rolesOfType.splice(index, 1)[0]);
			}
		}
		this.setState((s) => ({
			...s,
			rolesInPlay: selected
		}));
	}
	render() {
		const allRoles = {};
		this.roles.forEach((role) => {
			const id = role.id;
			allRoles[id] = this.rolesInPlay.filter((r) => r.id === id).length;
		});
		const adjustedExpected = getAdjustedExpected(this.rolesInPlay, this.amountOfPlayers);
		const wildcardTypes = getWildcardTypes(this.rolesInPlay);
		function getTypeKey(key) {
			let typeKey;
			switch (key) {
				case "players":
					typeKey = "townsfolk";
					break;
				case "outsiders":
					typeKey = "outsider";
					break;
				case "minions":
					typeKey = "minion";
					break;
				case "demons":
					typeKey = "demon";
					break;
				default: typeKey = key;
			}
			return typeKey;
		}
		const rangeInPlay = Object.keys(TRAVELLER_SHEET[this.amountOfPlayers]).some((key) => {
			const typeKey = getTypeKey(key);
			return formatRange(adjustedExpected?.[typeKey] ?? TRAVELLER_SHEET[this.amountOfPlayers][key]).includes("-");
		});
		const showOfficial = this.rolesInPlay.some((r) => r.id?.toLowerCase() === "xaan");
		return b`
      <ul ui-inlay class="traveller-sheet">
        <li
          class="players ${this.rolesInPlay.length !== this.amountOfPlayers ? "mismatch" : ""}"
        >
          <div class="balgruf pl">Roles selected:</div>
          <div class="traveller-df players-nr">${this.rolesInPlay.length}</div>
          <div class="traveller-df">/</div>
          <div class="traveller-df ${rangeInPlay ? "is-range" : ""}">
            ${this.amountOfPlayers}
          </div>
          ${when(rangeInPlay || showOfficial, () => b`<div class="traveller-df traveller-std"></div>`)}
        </li>
        ${(() => {
			let hasRange = false;
			return Object.keys(TRAVELLER_SHEET[this.amountOfPlayers]).map((key) => {
				let typeKey = getTypeKey(key);
				const actual = this.rolesInPlay.filter((r) => r.type?.toLowerCase() === typeKey).length;
				const isWildcard = wildcardTypes.has(typeKey);
				const expected = adjustedExpected?.[typeKey] ?? TRAVELLER_SHEET[this.amountOfPlayers][key];
				const range = formatRange(expected);
				const isRange = range.includes("-");
				if (isRange && !hasRange) hasRange = true;
				return b`
                <li
                  class="${!isWildcard && !rangeIncludes(expected, actual) ? "mismatch" : ""}"
                >
                  <div
                    class="balgruf ${alignment({ suspectedRole: { type: typeKey } })} traveller-kind"
                  >
                    ${capitalize(typeKey)}:
                  </div>
                  <div class="traveller-df traveller-nr">${actual}</div>
                  <div class="traveller-df traveller-slash">/</div>
                  <div
                    class="traveller-df ${isRange || hasRange ? "is-range" : ""} traveller-expected"
                  >
                    ${isWildcard ? "?" : range}
                  </div>
                  ${when(hasRange || showOfficial, () => b`<div class="traveller-df traveller-std">
                        ${TRAVELLER_SHEET[this.amountOfPlayers][key]}
                      </div>`)}
                </li>
              `;
			});
		})()}
        ${(() => {
			const seen = /* @__PURE__ */ new Set();
			const setupNotes = this.rolesInPlay.map((r) => {
				if (seen.has(r.id)) return null;
				seen.add(r.id);
				const match = r.summary?.match(/\[(.+?)\]/);
				return match ? {
					role: r,
					note: match[1]
				} : null;
			}).filter(Boolean);
			return setupNotes.length ? b`<ul class="special-notes">
                ${setupNotes.map(({ role, note }) => b`<li>
                      <strong
                        class="${alignment({ suspectedRole: role })} balgruf"
                        >${role.humanReadableRole}:</strong
                      >
                      ${note}
                    </li>`)}
              </ul>` : "";
		})()}
      </ul>

      <button class="randomize" ui-button primary @click=${this.randomize}>
        Randomize
      </button>
      <ul class="roles-list">
        ${this.roles.filter((role) => {
			const type = role.type?.toLowerCase();
			if (role.id === "minioninfo" || role.id === "demoninfo") return;
			if (type === "fabled") return false;
			if (type === "loric") return false;
			if (type === "traveller") return false;
			return true;
		}).sort((a, b) => {
			const typeA = a.type?.toLowerCase();
			const typeB = b.type?.toLowerCase();
			const indexA = SORT_ORDER.indexOf(typeA);
			const indexB = SORT_ORDER.indexOf(typeB);
			if (indexA === -1 && indexB === -1) return 0;
			if (indexA === -1) return 1;
			if (indexB === -1) return -1;
			return indexA - indexB;
		}).map((role) => b`
              <li class="role ${allRoles[role.id] > 0 ? "selected" : ""}">
                <button
                  @click=${() => allRoles[role.id] > 0 || this.rolesInPlay.length >= this.amountOfPlayers ? this.removeRole(role) : this.addRole(role)}
                  class="role-info"
                >
                  <img
                    class="${alignment(role.type)}"
                    src="${img(role)}"
                    alt="${role.humanReadableRole}"
                  />
                  <div class="role-text">
                    <h3 class="balgruf ${alignment(role.type)}">
                      ${capitalize(role?.humanReadableRole?.toLowerCase() ?? "")}
                    </h3>
                    <div class="description">${role.summary}</div>
                  </div>
                </button>
                <div class="counter">
                  <button
                    ?disabled=${allRoles[role.id] === 0}
                    @click=${() => this.removeRole(role)}
                    ui-icon-button
                  >
                    ${minus}
                  </button>
                  <div
                    class="${allRoles[role.id] > 0 ? alignment({ suspectedRole: role }) : ""} balgruf ${role.type?.toLowerCase()} counter-amount"
                  >
                    ${allRoles[role.id] || 0}
                  </div>
                  <button
                    ?disabled=${this.rolesInPlay.length >= this.amountOfPlayers}
                    @click=${() => this.addRole(role)}
                    ui-icon-button
                  >
                    ${plus}
                  </button>
                </div>
              </li>
            `)}
      </ul>
      <div class="buttons">
        <button
          class="next"
          ?disabled=${this.rolesInPlay.length !== this.amountOfPlayers}
          @click=${this.next}
          ui-button
          primary
        >
          Next
        </button>
        <button ui-button secondary @click=${this.close}>Close</button>
      </div>
    `;
	}
	addRole(role) {
		this.setState((state) => ({
			...state,
			rolesInPlay: [...state.rolesInPlay, role]
		}));
	}
	removeRole(role) {
		this.setState((state) => {
			const idx = state.rolesInPlay.map((r) => r.id).lastIndexOf(role.id);
			if (idx === -1) return state;
			const updated = [...state.rolesInPlay];
			updated.splice(idx, 1);
			return {
				...state,
				rolesInPlay: updated
			};
		});
	}
	onSelectionChanged({ selection }) {
		this.setState((state) => ({
			...state,
			rolesInPlay: selection
		}));
	}
};
customElements.define("create-game-step-five", CreateGameStepFive);
var CreateGameStepFiveWarning = class extends BotcFlowElement {
	static properties = {
		rolesInPlay: { type: Array },
		amountOfPlayers: { type: Number }
	};
	mapStateToProps(state) {
		return {
			rolesInPlay: state.rolesInPlay,
			amountOfPlayers: state.amountOfPlayers
		};
	}
	static styles = [
		button,
		inlay,
		i`
      :host {
        display: flex;
        flex-direction: column;
        flex: 1;
      }

      .traveller-sheet {
        padding: 0;
        list-style: none;
        margin: 0;
        padding: 16px;
      }

      .traveller-sheet li {
        display: flex;
        padding-bottom: 6px;
        padding-top: 6px;
        align-items: center;
      }

      .traveller-sheet li:not(:last-of-type) {
        border-bottom: solid 1px ${border};
      }

      .traveller-sheet li .traveller-kind {
        flex: 1;
      }

      .traveller-nr {
        font-variant-numeric: tabular-nums;
      }

      .traveller-sheet li.mismatch .traveller-nr {
        color: #d9403b;
        font-weight: bold;
      }

      .violations {
        list-style: none;
        padding: 0;
        margin: 0 0 16px;
      }

      .violations li {
        margin-bottom: 8px;
      }

      .buttons {
        margin-top: auto;
      }

      .balgruf {
        font-family: "Balgruf";
        font-size: 1.375rem;
        color: var(--ui-main-5);
        text-shadow: 1px 1px 2px rgba(0, 0, 0, 1);
        margin: 0;
      }

      .balgruf.blue {
        color: #45a0f1;
      }
      .balgruf.red {
        color: #d9403b;
      }
      .balgruf.yellow {
        color: #ffee00;
      }
      .balgruf.green {
        color: #a7e16c;
      }
      .traveller-df {
        flex-basis: 20px;
        text-align: center;
      }

      .traveller-df.is-range {
        flex-basis: 30px;
      }

      .traveller-std {
        color: #838383;
      }
    `
	];
	render() {
		const rolesInPlay = this.rolesInPlay ?? [];
		const expected = getAdjustedExpected(rolesInPlay, this.amountOfPlayers);
		if (!expected) return b``;
		const actual = getActualCounts(rolesInPlay);
		const wildcardTypes = getWildcardTypes(rolesInPlay);
		const violations = getTravellerSheetViolations(rolesInPlay, this.amountOfPlayers);
		return b`
      <p>
        The selected roles don't match the traveller sheet. This might not
        necessarily be wrong, but let's double check.
        <br /><br />
        Are you sure you want to continue?
      </p>

      <ul ui-inlay class="traveller-sheet">
        ${(() => {
			let hasRange = false;
			let showOfficial = false;
			return Object.entries(expected).map(([type, count]) => {
				let key;
				switch (type) {
					case "townsfolk":
						key = "players";
						break;
					case "outsider":
						key = "outsiders";
						break;
					case "minion":
						key = "minions";
						break;
					case "demon":
						key = "demons";
						break;
					default: key = type;
				}
				showOfficial = this.rolesInPlay.some((r) => r.id?.toLowerCase() === "xaan");
				const isWildcard = wildcardTypes.has(type);
				const range = formatRange(count);
				const isRange = range.includes("-");
				if (isRange && !hasRange) hasRange = true;
				return b`
              <li
                class="${!wildcardTypes.has(type) && !rangeIncludes(count, actual[type]) ? "mismatch" : ""}"
              >
                <div
                  class="balgruf ${alignment({ suspectedRole: { type } })} traveller-kind"
                >
                  ${capitalize(type)}:
                </div>
                <div class="traveller-df traveller-nr">${actual[type]}</div>
                <div class="traveller-df traveller-slash">/</div>
                <div
                  class="traveller-df ${isRange || hasRange ? "is-range" : ""} traveller-expected"
                >
                  ${isWildcard ? "?" : range}
                </div>
                ${when(hasRange || showOfficial, () => b`<div
                      class="traveller-df ${isRange || hasRange ? "is-range" : ""} traveller-std"
                    >
                      ${TRAVELLER_SHEET[this.amountOfPlayers][key]}
                    </div>`)}
              </li>
            `;
			});
		})()}
      </ul>

      <ul class="violations">
        ${violations.map((v) => {
			if (v.type === "role-adjustment") {
				const sc = v.specialCase;
				const name = window.rolesById?.[v.role.id]?.humanReadableRole ?? v.role.humanReadableRole ?? capitalize(v.role.id);
				if (Array.isArray(sc)) {
					const parts = sc.map((mod) => {
						return `${`adds ${mod.amount} ${mod.type}${mod.amount !== 1 ? "s" : ""}`} and ${`removes ${mod.amount} ${mod.removeFrom}${mod.amount !== 1 ? "s" : ""}`}`;
					});
					return b`<li>
                <p>
                  <span class="balgruf ${alignment({ suspectedRole: v?.role })}"
                    >${name}</span
                  >
                  ${parts.join(", or ")}.
                </p>
              </li>`;
				}
				const addsPart = `${sc.optional ? "may add" : "adds"} ${sc.amount} ${sc.type}${sc.amount !== 1 ? "s" : ""}`;
				const removesPart = `${sc.optional ? "removing" : "removes"} ${sc.amount} ${sc.removeFrom}${sc.amount !== 1 ? "s" : ""}`;
				return b`<li>
              <p>
                <span class="balgruf ${alignment({ suspectedRole: v?.role })}"
                  >${name}</span
                >
                ${addsPart}, ${sc.optional ? "" : "and "}${removesPart}.
              </p>
            </li>`;
			} else if (v.type === "count") {
				const plural = isRange(v.expected) || v.expected !== 1;
				return b`<li>
              <p>
                Expected ${formatRange(v.expected)}
                ${v.roleType}${plural ? "s" : ""}, but ${v.actual}
                ${v.actual === 1 ? "is" : "are"} selected.
              </p>
            </li>`;
			} else if (v.type === "missing-role") {
				const name = window.rolesById?.[v.role.id]?.humanReadableRole ?? v.role.humanReadableRole ?? capitalize(v.role.id);
				return b`<li>
              <p>
                <span class="balgruf ${alignment({ suspectedRole: v?.role })}"
                  >${name}</span
                >
                is in play, but there is no ${capitalize(v.requiredId)}.
              </p>
            </li>`;
			} else if (v.type === "max-count") {
				if (v.role?.id === "villageidiot") return b`<li>
                <p>
                  Too many
                  <span class="balgruf ${alignment({ suspectedRole: v?.role })}"
                    >Village Idiots</span
                  >
                  selected.
                </p>
              </li>`;
				const name = window.rolesById?.[v.role.id]?.humanReadableRole ?? v.role.humanReadableRole ?? capitalize(v.role.id);
				return b`<li>
              <p>
                There can be at most ${v.maxCount} <span class="balgruf ${alignment({ suspectedRole: v?.role })}"></span>${name}s</span> in the game, but
                ${v.actual} are selected.
              </p>
            </li>`;
			}
		})}
      </ul>

      <div class="buttons">
        <button @click=${this.next} ui-button primary>Continue anyway</button>
        <button ui-button secondary @click=${this.close}>Close</button>
      </div>
    `;
	}
};
customElements.define("create-game-step-five-warning", CreateGameStepFiveWarning);
var CreateGameStepBagWarning = class extends BotcFlowElement {
	static properties = { rolesInPlay: { type: Array } };
	mapStateToProps(state) {
		return { rolesInPlay: state.rolesInPlay };
	}
	static styles = [
		button,
		inlay,
		i`
      :host {
        display: flex;
        flex-direction: column;
        flex: 1;
      }

      .traveller-sheet {
        padding: 0;
        list-style: none;
        margin: 0;
        padding: 16px;
      }

      .traveller-sheet li {
        display: flex;
        padding-bottom: 6px;
        padding-top: 6px;
        align-items: center;
      }

      .traveller-sheet li:not(:last-of-type) {
        border-bottom: solid 1px ${border};
      }

      .traveller-sheet li .traveller-kind {
        flex: 1;
      }

      .traveller-nr {
        font-variant-numeric: tabular-nums;
      }

      .traveller-sheet li.mismatch .traveller-nr {
        color: #d9403b;
        font-weight: bold;
      }

      .violations {
        list-style: none;
        padding: 0;
        margin: 0 0 16px;
      }

      .violations li {
        margin-bottom: 8px;
      }

      .buttons {
        margin-top: auto;
      }

      .balgruf {
        font-family: "Balgruf";
        font-size: 1.375rem;
        color: var(--ui-main-5);
        text-shadow: 1px 1px 2px rgba(0, 0, 0, 1);
        margin: 0;
      }

      .balgruf.blue {
        color: #45a0f1;
      }
      .balgruf.red {
        color: #d9403b;
      }
      .balgruf.yellow {
        color: #ffee00;
      }
      .balgruf.green {
        color: #a7e16c;
      }
      .traveller-df {
        flex-basis: 20px;
        text-align: center;
      }

      .traveller-df.is-range {
        flex-basis: 30px;
      }

      .traveller-std {
        color: #838383;
      }

      botc-player-details {
        flex: 1;
      }
    `
	];
	render() {
		return b`
      <p>
        You've selected <span class="balgruf">bag selection</span> mode, which
        means players will choose their own tokens from the bag.

        <br />
        <br />
        Currently, the bag contains tokens that players are not supposed to see.
        Are you sure you want to continue?
      </p>

      <ul class="traveller-sheet">
        ${(this.rolesInPlay ?? []).filter((role) => [
			"lilmonsta",
			"marionette",
			"drunk",
			"lunatic"
		].includes(role.id)).map((role) => b`<li>
                <botc-player-details
                  .player=${{
			suspectedRole: {
				...role,
				humanReadableRole: ""
			},
			name: role.humanReadableRole
		}}
                ></botc-player-details>
              </li>`)}
      </ul>

      <div class="buttons">
        <button @click=${this.next} ui-button primary>Continue anyway</button>
        <button ui-button secondary @click=${this.close}>Close</button>
      </div>
    `;
	}
};
customElements.define("create-game-step-bag-warning", CreateGameStepBagWarning);
var CreateGameStepSix = class extends BotcFlowElement {
	static properties = {
		rolesInPlay: { type: Array },
		bluffs: { type: Array },
		scriptName: { type: String }
	};
	constructor() {
		super();
	}
	mapStateToProps(state) {
		return {
			rolesInPlay: state.rolesInPlay,
			bluffs: state.bluffs
		};
	}
	static styles = [
		button,
		input,
		select,
		inlay,
		radio,
		i`
      :host {
        display: flex;
        flex-direction: column;
        flex: 1;
      }

      .traveller-sheet {
        padding: 0;
        list-style: none;
        margin: 0;
        padding: 16px;
        /* margin-bottom: 24px; */
      }

      .traveller-sheet li {
        display: flex;
        padding-bottom: 6px;
        padding-top: 6px;
      }

      .traveller-sheet li:not(:last-child) {
        border-bottom: solid 1px ${border};
      }

      .traveller-sheet li .traveller-kind {
        flex: 1;
      }

      .traveller-nr {
        font-variant-numeric: tabular-nums;
      }

      .buttons {
        margin-top: auto;
      }
    `
	];
	render() {
		return b`
      <p>The evil team is:</p>
      <botc-select-role
        .roles=${this.rolesInPlay.filter((r) => {
			const type = r.type?.toLowerCase();
			return type === "minion" || type === "demon";
		})}
        disabled
      /></botc-select-role>
      <p>
  ${this.bluffs.length < 3 ? `Select ${3 - this.bluffs.length} demon bluff${3 - this.bluffs.length === 1 ? "" : "s"}:` : "All demon bluffs selected"}
</p>

      <botc-select-role
        .script=${this.scriptName}
        allScriptRoles
        @selection-changed=${this.onSelectionChanged}
        multiple
        .selected=${this.bluffs}
        .maxSelect=${3}
        .filterFn=${(role) => {
			const isRoleInPlay = this.rolesInPlay.some((r) => r.id === role.id);
			const isAllowedType = role.type.toLowerCase() === "townsfolk" || role.type.toLowerCase() === "outsider";
			return !isRoleInPlay && isAllowedType;
		}}
      ></botc-select-role>
      <div class="buttons">
        <button
          class="next"
          ?disabled=${this.bluffs.length !== 3}
          @click=${this.next}
          ui-button
          primary
        >
          Next
        </button>
        <button ui-button secondary @click=${this.close}>Close</button>
      </div>
    `;
	}
	onSelectionChanged({ selection }) {
		this.setState((state) => ({
			...state,
			bluffs: selection
		}));
	}
};
customElements.define("create-game-step-six", CreateGameStepSix);
var CreateGameStepSeven = class extends BotcFlowElement {
	static properties = { assign: { type: String } };
	mapStateToProps(state) {
		return { assign: state.assign };
	}
	static styles = [
		button,
		input,
		select,
		inlay,
		radio,
		i`
      :host {
        display: flex;
        flex-direction: column;
        flex: 1;
      }

      label:first-of-type,
      label:nth-of-type(2) {
        margin-bottom: 0px !important;
      }

      .buttons {
        margin-top: auto;
      }
    `
	];
	render() {
		return b`
      <p>
        Assign roles to players manually, automatically or use bag selection?
      </p>
      <label ui-label for="bag-selection">
        <input
          ui-radio
          type="radio"
          name="assign"
          id="bag-selection"
          visually-hidden
          ?checked=${this.assign === "bag-selection"}
          @change=${() => {
			this.setState((state) => ({
				...state,
				assign: "bag-selection"
			}));
			this.forceUpdateSteps();
		}}
        />
        <div>
          <div class="toggle"><span class="selected"></span></div>
          <div class="content">Bag Selection</div>
        </div>
      </label>
      <label ui-label for="auto">
        <input
          ui-radio
          type="radio"
          name="assign"
          id="auto"
          visually-hidden
          ?checked=${this.assign === "auto"}
          @change=${() => {
			this.setState((state) => ({
				...state,
				assign: "auto"
			}));
			this.forceUpdateSteps();
		}}
        />
        <div>
          <div class="toggle"><span class="selected"></span></div>
          <div class="content">Auto</div>
        </div>
      </label>
      <label ui-label for="manual">
        <input
          ui-radio
          type="radio"
          name="assign"
          id="manual"
          visually-hidden
          ?checked=${this.assign === "manual"}
          @change=${() => {
			this.setState((state) => ({
				...state,
				assign: "manual"
			}));
			this.forceUpdateSteps();
		}}
        />
        <div>
          <div class="toggle"><span class="selected"></span></div>
          <div class="content">Manual</div>
        </div>
      </label>
      <div class="buttons">
        <button class="next" @click=${this.next} ui-button primary>Next</button>
        <button ui-button secondary @click=${this.close}>Close</button>
      </div>
    `;
	}
};
customElements.define("create-game-step-seven", CreateGameStepSeven);
var CreateGameStepEight = class extends BotcFlowElement {
	static properties = {
		assign: { type: String },
		playerNames: { type: Array },
		rolesInPlay: { type: Array },
		travellers: { type: Boolean },
		bluffs: { type: Array },
		scriptName: { type: String }
	};
	static styles = [button, i`
      :host {
        display: flex;
        flex-direction: column;
        flex: 1;
      }

      .buttons {
        margin-top: auto;
      }
    `];
	render() {
		return b`
      <p>Are you ready to start the game?</p>
      <div class="buttons">
        <button class="next" @click=${this.startGame} ui-button primary>
          Start game
        </button>
        <button ui-button secondary @click=${this.close}>Close</button>
      </div>
    `;
	}
	async startGame() {
		const assign = this.assign;
		let players = this.playerNames.map((name) => ({
			tokens: [],
			name,
			id: crypto.randomUUID(),
			claims: [],
			notes: "",
			suspectedRole: {},
			dead: false,
			me: false
		}));
		const roles = this.rolesInPlay;
		const travellers = this.travellers;
		const tokens = roles.map((r) => {
			if (!travellers && r.type === "Traveller") return null;
			if (r.id === "juggler") return r.reminders?.map((reminder, i) => ({
				id: `${r.id}-${reminder} ${i + 1}`,
				role: r.id,
				label: `${reminder} ${i + 1}`,
				icon: r.id,
				type: r.type,
				humanReadableRole: r.humanReadableRole
			}));
			if (r.reminders?.length || r.remindersGlobal?.length) return [...new Set(r?.reminders ?? []), ...new Set(r?.remindersGlobal ?? [])].map((reminder) => ({
				id: `${r.id}-${reminder}`,
				role: r.id,
				label: reminder,
				image: Array.isArray(r.image) ? r.image[0] : r.image,
				icon: r.id,
				type: r.type,
				humanReadableRole: r.humanReadableRole
			}));
		}).filter((r) => !!r).flat();
		tokens.push({
			id: `special-Evil`,
			role: "special",
			label: "Evil",
			icon: "evil",
			type: "demon",
			humanReadableRole: "Evil"
		});
		tokens.push({
			id: `special-Good`,
			role: "special",
			label: "Good",
			icon: "good",
			type: "townsfolk",
			humanReadableRole: "Good"
		});
		if (assign === "auto") {
			const shuffledRoles = [...this.rolesInPlay].sort(() => Math.random() - .5);
			players = players.map((player, index) => {
				return {
					...player,
					suspectedRole: shuffledRoles[index]
				};
			});
		}
		const scriptData = await SCRIPTS_DATA[this.scriptName]();
		state.setState((s) => ({
			...s,
			currentGame: {
				assign,
				deadlog: [],
				deadlogMap: {},
				scriptRoles: [],
				conversations: [],
				globalReminders: [],
				day: 0,
				demonBluffs: this.bluffs,
				nightPhaseIndex: 0,
				nominations: [],
				players,
				scriptData,
				rolesInPlay: this.rolesInPlay,
				script: this.scriptName,
				stMode: true,
				state: assign === "bag-selection" ? "bag-selection" : "in-progress",
				tokens,
				travellers: this.travellers
			}
		}));
		if (assign === "bag-selection" && this.gameMode === "st") {
			settings.setState((s) => ({
				...s,
				hideGrim: true,
				view: "circular"
			}));
			state.setState((s) => ({
				...s,
				currentGame: {
					...s.currentGame,
					bag: [...this.rolesInPlay].sort(() => Math.random() - .5).map((role) => ({
						...role,
						uuid: crypto.randomUUID(),
						taken: false
					}))
				}
			}));
		}
		this.finalize();
		this.close();
	}
};
customElements.define("create-game-step-eight", CreateGameStepEight);
async function startGame({ playerNames, me, gameMode, scriptName, travellers, assign, scriptData }) {
	const players = playerNames.map((name) => ({
		tokens: [],
		name,
		id: crypto.randomUUID(),
		claims: [],
		notes: "",
		suspectedRole: {},
		dead: false,
		me: false
	}));
	if (me) players.unshift({
		tokens: [],
		me: true,
		name: me,
		id: crypto.randomUUID(),
		claims: [],
		notes: "",
		suspectedRole: {},
		dead: false
	});
	const scriptRolesData = await SCRIPTS_DATA[scriptName]();
	const scriptRoles = [
		...scriptRolesData.townsfolk,
		...scriptRolesData.outsider,
		...scriptRolesData.minion,
		...scriptRolesData.demon,
		...travellers ? scriptRolesData?.traveller ?? [] : []
	];
	const tokens = scriptRoles.map((r) => {
		if (!travellers && r.type === "Traveller") return null;
		if (r.id === "juggler") return r.reminders?.map((reminder, i) => ({
			id: `${r.id}-${reminder} ${i + 1}`,
			role: r.id,
			label: `${reminder} ${i + 1}`,
			icon: r.icon,
			type: r.type,
			humanReadableRole: r.humanReadableRole
		}));
		if (r.reminders?.length || r.remindersGlobal?.length) return [...new Set(r?.reminders ?? []), ...new Set(r?.remindersGlobal ?? [])].map((reminder) => ({
			id: `${r.id}-${reminder}`,
			role: r.id,
			label: reminder,
			icon: r.icon,
			type: r.type,
			humanReadableRole: r.humanReadableRole
		}));
	}).filter((r) => !!r).flat();
	state.setState((s) => ({
		...s,
		currentGame: {
			stMode: gameMode === "st",
			scriptRoles,
			deadlog: [],
			deadlogMap: {},
			nightPhaseIndex: 0,
			script: scriptName,
			players,
			tokens,
			scriptData,
			state: "in-progress",
			globalReminders: [],
			rolesInPlay: [],
			demonBluffs: [],
			nominations: [],
			conversations: [],
			travellers,
			day: 0
		}
	}));
}
var create_game_default = ({ amountOfPlayers, gameMode }) => ({
	title: "Create Game",
	saveAndResume: true,
	initialState: {
		scriptName: state.getState()?.currentGame?.script ?? "Trouble Brewing",
		gameMode: state.getState()?.currentGame?.stMode ? "st" : "player",
		amountOfPlayers,
		travellers: true,
		rolesInPlay: [],
		assign: "bag-selection",
		playerNames: [],
		bluffs: []
	},
	steps: [
		{
			id: "select-script",
			title: "Select script",
			render: ({ scriptName, travellers }) => {
				return b`
          <create-game-step-one
            .travellers=${travellers}
            .scriptName=${scriptName}
          ></create-game-step-one>
        `;
			}
		},
		{
			id: "game-mode",
			title: "Game Mode",
			render: ({ gameMode }) => b`<create-game-step-three
          .gameMode=${gameMode}
        ></create-game-step-three>`
		},
		{
			id: "players",
			title: "Players",
			render: ({ amountOfPlayers }) => {
				return b`
          <create-game-step-two
            .amountOfPlayers=${amountOfPlayers}
          ></create-game-step-two>
        `;
			}
		},
		{
			id: "enter-player-names",
			title: "Enter player names",
			render: ({ gameMode, scriptName, playerNames, travellers, amountOfPlayers }) => b`<create-game-step-four
          .scriptName=${scriptName}
          .travellers=${travellers}
          .gameMode=${gameMode}
          .amountOfPlayers=${amountOfPlayers}
          .playerNames=${playerNames}
        ></create-game-step-four>`
		},
		{
			id: "assign",
			title: "Assign",
			condition: ({ gameMode }) => gameMode === "st",
			render: ({ assign }) => b`<create-game-step-seven
          .assign=${assign}
        ></create-game-step-seven>`
		},
		{
			id: "role-selection",
			title: "Role selection",
			condition: ({ gameMode, assign }) => gameMode === "st" && (assign === "bag-selection" || assign === "auto"),
			render: ({ amountOfPlayers, scriptName, rolesInPlay, travellers }) => b`<create-game-step-five
          .scriptName=${scriptName}
          .rolesInPlay=${rolesInPlay}
          .travellers=${travellers}
          .amountOfPlayers=${amountOfPlayers}
        ></create-game-step-five>`
		},
		{
			id: "bag-warning",
			title: "Bag warning",
			condition: ({ gameMode, rolesInPlay, assign }) => gameMode === "st" && assign === "bag-selection" && rolesInPlay.some((r) => [
				"drunk",
				"marionette",
				"lilmonsta",
				"lunatic"
			].includes(r.id)),
			render: ({ rolesInPlay }) => b`<create-game-step-bag-warning
          .rolesInPlay=${rolesInPlay}
        ></create-game-step-bag-warning>`
		},
		{
			id: "setup-warning",
			title: "Setup warning",
			condition: ({ gameMode, rolesInPlay, amountOfPlayers }) => gameMode === "st" && getTravellerSheetViolations(rolesInPlay ?? [], amountOfPlayers).length > 0,
			render: ({ rolesInPlay, amountOfPlayers }) => b`<create-game-step-five-warning
          .rolesInPlay=${rolesInPlay}
          .amountOfPlayers=${amountOfPlayers}
        ></create-game-step-five-warning>`
		},
		{
			id: "demon-bluffs",
			title: "Demon Bluffs",
			condition: ({ gameMode, amountOfPlayers, assign }) => gameMode === "st" && amountOfPlayers >= 7 && (assign === "bag-selection" || assign === "auto"),
			render: ({ rolesInPlay, scriptName, bluffs }) => b` <create-game-step-six
          .scriptName=${scriptName}
          .rolesInPlay=${rolesInPlay}
          .bluffs=${bluffs}
        ></create-game-step-six>`
		},
		{
			id: "ready",
			title: "Ready?",
			condition: ({ gameMode }) => gameMode === "st",
			render: ({ assign, playerNames, rolesInPlay, gameMode, scriptName, travellers, bluffs }) => b`<create-game-step-eight
          .bluffs=${bluffs}
          .assign=${assign}
          .playerNames=${playerNames}
          .rolesInPlay=${rolesInPlay}
          .gameMode=${gameMode}
          .scriptName=${scriptName}
          .travellers=${travellers}
        ></create-game-step-eight>`
		}
	]
});
//#endregion
export { create_game_default as default };
