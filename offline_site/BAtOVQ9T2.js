import { I as i, L as r, P as b, _ as focus, c as bg6, g as elevation4, o as bg4, s as bg5, t as when, x as main5 } from "./CY602n9t.js";
import { i as provider, m as setDoc, n as auth, r as db, s as signInWithPopup, u as doc } from "./l4dTAMDA.js";
import { E as saveScript, F as api, H as get, M as SCRIPTS_DATA, N as SORT_ORDER, O as transformToSchemaScript, m as capitalize, n as settings } from "./CP0hEE1l.js";
import "./vIOCOudq.js";
import { n as add, t as remove } from "./dKNDhBkx.js";
import { t as check } from "./BTrKfjJH.js";
import { t as inlay } from "./Ue9OS-EJ.js";
import { t as button } from "./CbFrBy7s.js";
import { t as iconButton } from "./C0jyJKsx.js";
import { t as error } from "./BnMAryrf.js";
import { t as input } from "./_hTQLwBE.js";
import { t as visuallyHidden } from "./DZ8S2RMZ.js";
import { t as select } from "./C-op7emD.js";
import { t as radio } from "./Bx4sgpmC.js";
import "./D9Tfud2d2.js";
import { t as BotcFlowElement } from "./Fe0s9FWC2.js";
//#region src/flows/create-script/index.js
var CreateScriptStepOne = class extends BotcFlowElement {
	static properties = { loggedIn: { type: String } };
	mapStateToProps(state) {
		return { loggedIn: state.loggedIn };
	}
	static styles = [
		input,
		button,
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
      ${when(!this.loggedIn, () => b`
          <p>You need to be logged in to create a script.</p>
          <button
            ui-button
            primary
            @click=${() => {
			signInWithPopup(auth, provider).then((user) => {
				if (user?.user) {
					this.setState((state) => ({
						...state,
						loggedIn: true
					}));
					this.next();
				}
			});
		}}
          >
            Sign in
          </button>
        `, () => b`Log in successful.`)}
      <div class="buttons">
        <button
          ?disabled=${!this.loggedIn}
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
customElements.define("create-script-step-one", CreateScriptStepOne);
var CreateScriptStepTwo = class extends BotcFlowElement {
	static properties = {
		scriptName: { type: String },
		_formValid: { type: Boolean }
	};
	mapStateToProps(state) {
		return { scriptName: state.scriptName };
	}
	constructor() {
		super();
		this._formValid = false;
	}
	updated() {
		const input = this.shadowRoot.querySelector("input");
		if (input) this._formValid = input.checkValidity();
	}
	static styles = [
		button,
		select,
		input,
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
      <p>What's the name of your script?</p>
      <form @submit=${this.submit}>
        <label id="search" ui-label>
          <input
            @input=${this.handleInput}
            required
            .value=${this.scriptName}
            maxlength="50"
            pattern="[a-zA-Z0-9!?\\-\\+'& ]+"
            title="Only letters, numbers, spaces, !, ?, -, and & are allowed"
            ui-input
            type="text"
          />
          <span>Script name</span>
        </label>
      </form>

      <div class="buttons">
        <button
          ?disabled=${!this._formValid}
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
	handleInput(e) {
		const input = e.target;
		this._formValid = input.checkValidity();
		const scriptName = input.value;
		this.setState((state) => ({
			...state,
			scriptName
		}));
	}
	submit(e) {
		e.preventDefault?.();
		if (this._formValid) this.next();
	}
};
customElements.define("create-script-step-two", CreateScriptStepTwo);
var CreateScriptAuthorName = class extends BotcFlowElement {
	static properties = {
		authorName: { type: String },
		_formValid: { type: Boolean }
	};
	mapStateToProps(state) {
		return { authorName: state.authorName };
	}
	constructor() {
		super();
		this._formValid = false;
	}
	updated() {
		const input = this.shadowRoot.querySelector("input");
		if (input) this._formValid = input.checkValidity();
	}
	static styles = [
		button,
		select,
		input,
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
      <p>What name would you like to publish this script under?</p>
      <form @submit=${this.submit}>
        <label id="search" ui-label>
          <input
            @input=${this.handleInput}
            required
            .value=${this.authorName}
            maxlength="50"
            pattern="[a-zA-Z0-9!?\\-\\+& ]+"
            title="Only letters, numbers, spaces, !, ?, -, and & are allowed"
            ui-input
            type="text"
          />
          <span>Author name</span>
        </label>
      </form>

      <div class="buttons">
        <button
          ?disabled=${!this._formValid}
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
	handleInput(e) {
		const input = e.target;
		this._formValid = input.checkValidity();
		const authorName = input.value;
		this.setState((state) => ({
			...state,
			authorName
		}));
	}
	submit(e) {
		e.preventDefault?.();
		if (this._formValid) this.next();
	}
};
customElements.define("create-script-step-author-name", CreateScriptAuthorName);
var CreateScriptStepThree = class extends BotcFlowElement {
	static properties = {
		baseScript: { type: String },
		customScripts: { type: Object }
	};
	constructor() {
		super();
		this.customScripts = {};
	}
	mapStateToProps(state) {
		return { baseScript: state.baseScript };
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
	async connectedCallback() {
		super.connectedCallback();
		this.customScripts = await get("scripts") ?? {};
	}
	async changeBaseScript() {
		const newBaseScript = this.shadowRoot.querySelector("#script-select").value;
		if (newBaseScript !== this.baseScript) this.setState((state) => ({
			...state,
			selectedScriptRoles: []
		}));
		this.baseScript = newBaseScript;
		this.setState((state) => ({
			...state,
			baseScript: this.baseScript
		}));
		this.next();
	}
	render() {
		return b`
      <p>
        Do you want to base your script on an existing script on your device?
      </p>
      <label ui-label for="script-select">
        <select
          @change=${this.changeBaseScript}
          ui-select
          name="scripts"
          id="script-select"
        >
          <option ?selected=${this.baseScript === "None"}>None</option>
          ${Object.keys({
			...SCRIPTS_DATA,
			...this.customScripts
		}).filter((i) => i !== "All").map((script) => b`
                <option
                  ?selected=${this.baseScript === script}
                  value="${script}"
                >
                  ${script}
                </option>
              `)}
        </select>
        <span>Base script</span>
      </label>

      <div class="buttons">
        <button class="next" ui-button primary @click=${this.next}>Next</button>
        <button ui-button secondary @click=${this.close}>Close</button>
      </div>
    `;
	}
};
customElements.define("create-script-step-three", CreateScriptStepThree);
var CreateScriptStepFour = class extends BotcFlowElement {
	static properties = {
		type: { type: String },
		includeCustom: { type: Boolean }
	};
	constructor() {
		super();
		this.type = "";
	}
	mapStateToProps(state) {
		return {
			type: state.type,
			includeCustom: state.includeCustom
		};
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

      .wrapper {
        margin-bottom: 24px;
      }

      label:first-of-type {
        margin-bottom: 4px !important;
      }

      label[ui-label]:nth-of-type(3) {
        margin-bottom: 4px !important;
      }
    `
	];
	render() {
		return b`
      <div class="wrapper">
        <p>Is this a teensyville script, or a regular script?</p>
        <label ui-label for="regular">
          <input
            ui-radio
            type="radio"
            name="result"
            id="regular"
            ?checked=${this.type === "regular"}
            visually-hidden
            @change=${() => {
			this.setState((state) => ({
				...state,
				type: "regular"
			}));
		}}
          />
          <div>
            <div class="toggle"><span class="selected"></span></div>
            <div class="content">Regular</div>
          </div>
        </label>
        <label ui-label for="teensyville">
          <input
            ui-radio
            type="radio"
            name="result"
            id="teensyville"
            ?checked=${this.type === "teensyville"}
            visually-hidden
            @change=${() => {
			this.setState((state) => ({
				...state,
				type: "teensyville"
			}));
		}}
          />
          <div>
            <div class="toggle"><span class="selected"></span></div>
            <div class="content">Teensyville</div>
          </div>
        </label>
      </div>
      <div class="wrapper">
        <p>Would you like to include homebrew roles?</p>
        <label ui-label for="yes">
          <input
            ui-radio
            type="radio"
            name="custom"
            id="yes"
            ?checked=${this.includeCustom}
            visually-hidden
            @change=${() => {
			this.setState((state) => ({
				...state,
				includeCustom: true
			}));
		}}
          />
          <div>
            <div class="toggle"><span class="selected"></span></div>
            <div class="content">Yes</div>
          </div>
        </label>
        <label ui-label for="no">
          <input
            ui-radio
            type="radio"
            name="custom"
            id="no"
            ?checked=${!this.includeCustom}
            visually-hidden
            @change=${() => {
			this.setState((state) => ({
				...state,
				includeCustom: false,
				selectedScriptRoles: state.selectedScriptRoles.filter((r) => !r.custom)
			}));
		}}
          />
          <div>
            <div class="toggle"><span class="selected"></span></div>
            <div class="content">No</div>
          </div>
        </label>
      </div>
      <div class="buttons">
        <button class="next" ui-button primary @click=${this.next}>Next</button>
        <button ui-button secondary @click=${this.close}>Close</button>
      </div>
    `;
	}
};
customElements.define("create-script-step-four", CreateScriptStepFour);
var CreateScriptStepSix = class extends BotcFlowElement {
	static properties = {
		baseScript: { type: String },
		roles: { type: Array },
		state: { type: String },
		selectedScriptRoles: { type: Array },
		textFilter: { type: String },
		filters: { type: Object }
	};
	mapStateToProps(state) {
		return {
			selectedScriptRoles: state.selectedScriptRoles,
			filters: state.filters,
			textFilter: state.textFilter
		};
	}
	constructor() {
		super();
		this.textFilter = "";
		this.state = "initialized";
	}
	async connectedCallback() {
		super.connectedCallback();
		this.state = "pending";
		try {
			const rolesById = window.rolesById;
			const [scripts] = await Promise.all([SCRIPTS_DATA.All()]);
			const scriptRoles = Object.values(scripts).flat();
			this.roles = scriptRoles.filter((r) => r.id !== "demoninfo" && r.id !== "minioninfo").map((r) => ({
				...r,
				custom: !rolesById[r.id]
			}));
			this.selectedScriptRoles = this.selectedScriptRoles.filter((r) => r.id !== "minioninfo" && r.id !== "demoninfo");
			if (this.baseScript !== "None" && !this.selectedScriptRoles.length) {
				let baseScriptRoles = [];
				const customScripts = await get("scripts") ?? {};
				if (customScripts[this.baseScript]) {
					const customScript = customScripts[this.baseScript];
					baseScriptRoles = Object.values(customScript).flat().filter((r) => r.id !== "minioninfo" && r.id !== "demoninfo");
				} else if (SCRIPTS_DATA[this.baseScript]) {
					const officialScript = await SCRIPTS_DATA[this.baseScript]();
					baseScriptRoles = Object.values(officialScript).flat().filter((r) => r.id !== "minioninfo" && r.id !== "demoninfo");
				}
				const injected = [{
					id: "minioninfo",
					firstNightReminder: "Minion info reminder...",
					firstNight: 14,
					otherNight: 0,
					icon: "transparent",
					humanReadableRole: "MINION INFO",
					script: "special",
					type: "Minion"
				}, {
					id: "demoninfo",
					firstNightReminder: "Demon info reminder...",
					firstNight: 18,
					otherNight: 0,
					icon: "transparent",
					humanReadableRole: "DEMON INFO",
					script: "special",
					type: "Demon"
				}];
				this.setState((state) => ({
					...state,
					selectedScriptRoles: [...baseScriptRoles, ...injected]
				}));
			}
			this.state = "success";
		} catch (e) {
			this.state = "error";
			console.error("Error loading roles", e);
		}
	}
	static styles = [
		button,
		input,
		error,
		select,
		radio,
		inlay,
		i`
      :host {
        display: flex;
        flex-direction: column;
        flex: 1;
      }

      botc-disclosure {
        background-color: ${bg6};
      }

      botc-disclosure::part(button) {
        padding-top: 16px;
        padding-bottom: 16px;
      }

      .buttons {
        margin-top: auto;
      }

      .ui-checkbox {
        background-color: var(--ui-bg-5);
        display: flex;
        border: solid 1px var(--ui-border);
        border-radius: 4px;
        margin-top: 8px;
        margin-bottom: 8px;
        ${elevation4()}
      }

      .ui-checkbox div {
        border-radius: 4px;
        padding: 8px;
        height: 100%;
        width: 100%;
        display: flex;
      }

      .ui-checkbox input:focus-visible + * {
        background: ${bg5};
        transition: background 0.2s ease-in;
        ${focus()}
      }

      .ui-checkbox input:hover + * {
        background: ${bg5};
        transition: background 0.2s ease-in;
      }

      .ui-checkbox input:active + * {
        background: ${bg4};
        transition: background 0.2s ease-in;
      }

      .ui-checkbox .checkbox {
        width: 20px;
        height: 20px;
        border-radius: 50%;
        border: solid 2px var(--ui-bg-9);
        background: var(--ui-bg-8);
        margin-right: 8px;
      }

      .ui-checkbox input:checked + div .checkbox {
        border: solid 2px rgb(112, 210, 125);
        background: #586f5a;
      }

      .ui-checkbox input + div .checkbox span {
        display: none;
      }

      .ui-checkbox input:checked + div .checkbox span svg {
        width: 20px;
        height: 20px;
      }

      .ui-checkbox input:checked + div .checkbox span {
        display: flex;
        justify-content: center;
        align-items: center;
      }

      .ui-checkbox input:checked + div {
        background: ${bg4};
        transition:
          background 0.2s ease-in,
          border 0.2s ease-in;
      }

      ${r(visuallyHidden)}
    `
	];
	render() {
		return b`
      <p>Select the roles you want to include in the script.</p>
      ${when(this.state === "initialized" || this.state === "pending", () => b` <botc-spinner></botc-spinner> `)}
      ${when(this.state === "success", () => b`
          <botc-disclosure class="filters">
            <div slot="label">Filters</div>
            <div ui-inlay slot="detail">
              ${[
			"townsfolk",
			"outsiders",
			"minions",
			"demons",
			"travellers",
			"fabled",
			"loric",
			...this.includeCustom ? ["custom"] : []
		].map((kind) => b`
                  <label class="ui-checkbox">
                    <input
                      visually-hidden
                      type="checkbox"
                      name="${kind}"
                      id="${kind}"
                      ?checked=${this.filters[kind]}
                      @input=${(e) => {
			this.setState((s) => ({
				...s,
				filters: {
					...s.filters,
					[kind]: e.target.checked
				}
			}));
			this.shadowRoot.querySelector("botc-select-role").requestUpdate();
		}}
                    />
                    <div>
                      <span class="checkbox"><span>${check}</span></span>
                      <span>${capitalize(kind)}</span>
                    </div>
                  </label>
                `)}
            </div>
          </botc-disclosure>
          <label id="search" ui-label>
            <input
              ui-input
              type="text"
              .value=${this.textFilter}
              @input=${(e) => {
			this.setState((s) => ({
				...s,
				textFilter: e.target.value.toLowerCase()
			}));
			this.shadowRoot.querySelector("botc-select-role").requestUpdate();
		}}
            />
            <span>Filter role names</span>
          </label>
          <button
            class="next"
            ?disabled=${!this.selectedScriptRoles.length}
            ui-button
            primary
            @click=${this.next}
          >
            Next
          </button>
          <botc-select-role
            @selection-changed=${({ selection }) => {
			if (selection.length === 0 || selection.every((r) => ["minioninfo", "demoninfo"].includes(r.id))) {
				this.setState((s) => ({
					...s,
					selectedScriptRoles: []
				}));
				return;
			}
			const updated = [...selection];
			if (!updated.some((r) => r.id === "minioninfo")) updated.push({
				id: "minioninfo",
				firstNightReminder: "Minion info reminder...",
				firstNight: 14,
				otherNight: 0,
				icon: "transparent",
				humanReadableRole: "Minion Info",
				script: "special",
				type: "Minion"
			});
			if (!updated.some((r) => r.id === "demoninfo")) updated.push({
				id: "demoninfo",
				firstNightReminder: "Demon info reminder...",
				firstNight: 18,
				otherNight: 0,
				icon: "transparent",
				humanReadableRole: "Demon Info",
				script: "special",
				type: "Demon"
			});
			this.setState((s) => ({
				...s,
				selectedScriptRoles: updated.sort((a, b) => {
					return SORT_ORDER.indexOf(a.type.toLowerCase()) - SORT_ORDER.indexOf(b.type.toLowerCase());
				})
			}));
		}}
            .ignoreScrollToPreselected=${true}
            .multiple=${true}
            .roles=${this.roles}
            .filterFn=${(role) => {
			const filters = this.filters ?? {};
			const anyFiltersEnabled = Object.values(filters).some(Boolean);
			if (!this.includeCustom && role.custom) return false;
			if (this.textFilter && !role.humanReadableRole.toLowerCase().includes(this.textFilter)) return false;
			const mappedType = {
				townsfolk: "townsfolk",
				outsider: "outsiders",
				traveller: "travellers",
				minion: "minions",
				fabled: "fabled",
				loric: "loric",
				demon: "demons"
			}[role.type?.toLowerCase?.()];
			if (anyFiltersEnabled) {
				const matchType = mappedType && filters[mappedType];
				const matchCustom = role.custom && filters.custom;
				if (!matchType && !matchCustom) return false;
			}
			return true;
		}}
            .includeDescription=${true}
            .selected=${this.selectedScriptRoles}
          ></botc-select-role>
        `)}
      ${when(this.state === "error", () => b` <div ui-error>Failed to load roles</div> `)}
      <div class="buttons">
        <button
          class="next"
          ?disabled=${!this.selectedScriptRoles.length}
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
customElements.define("create-script-step-six", CreateScriptStepSix);
var CreateScriptStepSeven = class extends BotcFlowElement {
	static properties = {
		selectedScriptRoles: { type: Array },
		kind: { type: String }
	};
	constructor() {
		super();
	}
	mapStateToProps(state) {
		return { selectedScriptRoles: state.selectedScriptRoles };
	}
	static styles = [
		button,
		input,
		error,
		select,
		radio,
		inlay,
		i`
      :host {
        display: flex;
        flex-direction: column;
        flex: 1;
      }

      .buttons {
        margin-top: auto;
      }

      botc-select-role::part(roles-list) {
        margin: 0;
      }

      .roles-select {
        margin-top: 16px;
        margin-bottom: 16px;
      }
    `
	];
	render() {
		const orders = this.selectedScriptRoles.filter((r) => r[this.kind] > 0).map((r) => r[this.kind] ?? 0);
		const highest = orders.length ? Math.max(...orders) : 0;
		const lowest = orders.length ? Math.min(...orders) : 0;
		return b`
      <p>Would you like to change the nightorder?</p>
      <div class="roles-select">
        <botc-select-role
          .roles=${[{
			humanReadableRole: "Dusk",
			id: "dusk",
			[this.kind]: lowest - 1,
			type: ""
		}]}
          sortable
          .sortableDisabled=${true}
        ></botc-select-role>
        <botc-select-role
          .allowEmptyRoles=${true}
          @selection-changed=${({ selection }) => {
			setTimeout(() => {
				this.setState((s) => {
					const updatedRoles = selection.map((selectedRole, i) => {
						return {
							...s.selectedScriptRoles.find((r) => r.id === selectedRole.id),
							[this.kind]: i + 1
						};
					});
					const untouchedRoles = s.selectedScriptRoles.filter((r) => !selection.some((sel) => sel.id === r.id));
					return {
						...s,
						selectedScriptRoles: [...updatedRoles, ...untouchedRoles]
					};
				});
			});
		}}
          sortable
          .showMeta=${true}
          .roles=${this.selectedScriptRoles.filter((r) => r[this.kind] > 0).sort((a, b) => a[this.kind] - b[this.kind])}
        ></botc-select-role>
        <botc-select-role
          .roles=${[{
			humanReadableRole: "Dawn",
			id: "dawn",
			[this.kind]: highest + 1,
			type: ""
		}]}
          sortable
          .sortableDisabled=${true}
        ></botc-select-role>
      </div>
      <div class="buttons">
        <button class="next" ui-button primary @click=${this.next}>Next</button>
        <button ui-button secondary @click=${this.close}>Close</button>
      </div>
    `;
	}
};
customElements.define("create-script-step-seven", CreateScriptStepSeven);
var CreateScriptBootleggerRules = class extends BotcFlowElement {
	static properties = { bootlegger: { type: Array } };
	mapStateToProps(state) {
		return { bootlegger: state.bootlegger };
	}
	static styles = [
		input,
		button,
		iconButton,
		i`
      :host {
        display: flex;
        flex-direction: column;
        flex: 1;
      }

      .rule-wrapper {
        display: flex;
        align-items: flex-start;
        justify-content: center;
        margin-bottom: 16px;
      }

      .rule-wrapper textarea {
        flex: 1;
        margin-right: 8px;
        min-height: 80px;
        resize: vertical;
      }

      button[ui-button][secondary] {
        display: flex;
        align-items: center;
        justify-content: center;
        height: 42.5px;
      }

      button[ui-button][secondary] span {
        margin: 0;
        padding: 0;
        display: flex;
        align-items: center;
        justify-content: center;
      }

      button[ui-button][secondary] span.add-icon {
        margin-right: 8px;
      }

      .buttons {
        margin-top: auto;
      }

      .rule-counter {
        font-size: 0.875rem;
        color: var(--ui-bg-2);
        margin-bottom: 16px;
      }

      .max-reached {
        color: var(--ui-error-5);
      }
    `
	];
	render() {
		const ruleCount = this.bootlegger.length;
		const maxRules = 10;
		const canAddMore = ruleCount < maxRules;
		return b`
      <p><b>Optional:</b> Which Bootlegger rules would you like to add?</p>

      ${ruleCount > 0 ? b`
              <div class="rule-counter ${!canAddMore ? "max-reached" : ""}">
                ${ruleCount} of ${maxRules} rules
                ${!canAddMore ? "(maximum reached)" : ""}
              </div>
            ` : ""}
      ${this.bootlegger.map((rule, index) => b`
          <label ui-label for="rule-${index}">
            <div class="rule-wrapper">
              <textarea
                ui-input
                id="rule-${index}"
                .value=${rule}
                @input=${(e) => this.updateRuleText(e, index)}
                placeholder="Enter rule text here..."
                rows="3"
              ></textarea>

              <button
                ui-icon-button
                @click=${(e) => this.removeRule(e, index)}
                title="Remove rule"
              >
                ${remove}
              </button>
            </div>
            <span>Rule ${index + 1}</span>
          </label>
        `)}
      ${canAddMore ? b`
              <button ui-button secondary @click=${this.addRule}>
                <span class="add-icon">${add}</span><span>Add rule</span>
              </button>
            ` : ""}

      <div class="buttons">
        <button class="next" ui-button primary @click=${this.next}>Next</button>
        <button ui-button secondary @click=${this.close}>Close</button>
      </div>
    `;
	}
	updateRuleText(e) {
		const index = Number(e.target.id.split("-")[1]);
		const newValue = e.target.value;
		this.setState((state) => {
			const bootlegger = [...state.bootlegger || []];
			bootlegger[index] = newValue;
			return {
				...state,
				bootlegger
			};
		});
	}
	addRule(e) {
		e.preventDefault();
		if (this.bootlegger.length < 10) this.setState((state) => ({
			...state,
			bootlegger: [...state.bootlegger || [], ""]
		}));
	}
	removeRule(e, index) {
		e.preventDefault();
		this.setState((state) => ({
			...state,
			bootlegger: state.bootlegger.filter((_, i) => i !== index)
		}));
	}
};
customElements.define("create-script-bootlegger-rules", CreateScriptBootleggerRules);
var CreateScriptStepEight = class extends BotcFlowElement {
	static properties = {
		type: { type: String },
		scriptName: { type: String },
		selectedScriptRoles: { type: Array },
		published: { type: Boolean },
		state: { type: String },
		publishType: { type: String },
		bootlegger: { type: Array }
	};
	mapStateToProps(state) {
		return {
			published: state.published,
			publishType: state.publishType
		};
	}
	constructor() {
		super();
		this.state = "initialized";
	}
	static styles = [
		button,
		input,
		error,
		select,
		radio,
		inlay,
		i`
      :host {
        display: flex;
        flex-direction: column;
        flex: 1;
      }

      .balgruf {
        font-family: "Balgruf";
        font-size: 1.375rem;
        color: ${main5};
        text-shadow: 1px 1px 2px rgba(0, 0, 0, 1);
        margin: 0;
      }

      .buttons {
        margin-top: auto;
      }

      a {
        color: ${main5};
      }

      label[ui-label]:has(input[ui-radio]:checked),
      label[ui-label]:has(input[ui-radio]) {
        margin-top: 4px;
        margin-bottom: 4px;
      }

      p.disclaimer {
        margin-top: 0;
        margin-bottom: 2rem;
      }
    `
	];
	render() {
		return b`
      ${when(!this.published, () => b`
          <p>
            Do you want to publish script
            <span class="balgruf">"${this.scriptName}"</span> to
            <a href="https://www.botcscripts.com">botc-scripts</a>, or only make
            it available on your device?
          </p>
          <p class="disclaimer">
            Scripts that are published to botc-scripts are also stored on the
            device.
          </p>
          <label ui-label for="botc-scripts">
            <input
              ui-radio
              type="radio"
              name="result"
              id="botc-scripts"
              ?checked=${this.publishType === "botc-scripts"}
              visually-hidden
              @change=${() => {
			this.setState((s) => ({
				...s,
				publishType: "botc-scripts"
			}));
		}}
            />
            <div>
              <div class="toggle"><span class="selected"></span></div>
              <div class="content">Upload to botc-scripts</div>
            </div>
          </label>
          <label ui-label for="device">
            <input
              ui-radio
              type="radio"
              name="result"
              id="device"
              ?checked=${this.publishType === "device"}
              visually-hidden
              @change=${() => {
			this.setState((s) => ({
				...s,
				publishType: "device"
			}));
		}}
            />
            <div>
              <div class="toggle"><span class="selected"></span></div>
              <div class="content">Save to device only</div>
            </div>
          </label>

          ${when(this.state === "error", () => b`
              <div ui-error>
                Failed to publish script. Please report this issue on the
                <a href="https://discord.gg/aKNjG98w9S">Discord</a>
              </div>
            `)}
        `, () => b`
          ${when(this.state === "success", () => b`
              <p>
                Script <span class="balgruf">${this.scriptName}</span> has been
                ${this.publishType === "botc-scripts" ? "published" : "saved"}!
              </p>
              <p>You can now close this window.</p>
            `)}
        `)}
      ${when(this.state === "pending", () => b` <botc-spinner></botc-spinner> `)}

      <div class="buttons">
        ${when(!this.published, () => b`
            <button
              class="next publish"
              ui-button
              ?disabled=${["pending", "success"].includes(this.state)}
              primary
              @click=${this.publish}
            >
              ${this.publishType === "botc-scripts" ? "Publish" : "Save"}
            </button>
          `)}
        <button ui-button secondary @click=${this.close}>Close</button>
      </div>
    `;
	}
	async publish() {
		this.state = "pending";
		const script = {
			bootlegger: this.bootlegger,
			name: this.scriptName,
			authorName: this.authorName,
			authorId: settings.getState().user.uid,
			id: crypto.randomUUID(),
			createdAt: Date.now(),
			updatedAt: Date.now(),
			timesPlayed: 0,
			upvotes: 0,
			script: this.selectedScriptRoles.reduce((acc, role) => {
				const type = role.type.toLowerCase();
				if (!acc[type]) acc[type] = [];
				acc[type].push(role);
				return acc;
			}, {}),
			tags: [],
			type: this.type,
			includesCustom: this.selectedScriptRoles.some((r) => r.custom)
		};
		const formattedScript = transformToSchemaScript(script);
		try {
			saveScript(script.name, script.script);
			if (this.publishType === "botc-scripts") {
				try {
					const credentials = btoa("thegrimapp:9a4X,73_\\y1=(wBwS10r");
					const result = await api.post("https://www.botcscripts.com/api/scripts/", {
						name: script.name,
						version: "1",
						author: script.authorName,
						script_type: script.type === "teensyville" ? "Teensyville" : "Full",
						content: formattedScript
					}, { headers: { Authorization: `Basic ${credentials}` } });
					console.log("Script uploaded to botc-scripts:", result);
				} catch (e) {
					console.log("Failed to upload to botc-scripts, saving locally instead", e);
					this.state = "error";
					return;
				}
				await setDoc(doc(db, "scripts", script.id), { script: formattedScript });
			}
			this.state = "success";
			this.setState((s) => ({
				...s,
				published: true
			}));
			this.forceUpdateSteps();
			this.finalize();
		} catch (e) {
			this.state = "error";
			console.error("Error publishing script", e);
		}
	}
};
customElements.define("create-script-step-eight", CreateScriptStepEight);
var create_script_default = () => ({
	title: "Create Script",
	saveAndResume: true,
	initialState: {
		bootlegger: [],
		publishType: "botc-scripts",
		loggedIn: !!settings.getState()?.user,
		scriptName: "",
		baseScript: "None",
		type: "regular",
		includeCustom: false,
		selectedScriptRoles: [],
		textFilter: "",
		authorName: settings.getState()?.user?.name ?? "",
		published: false,
		filters: {
			townsfolk: false,
			outsiders: false,
			minions: false,
			demons: false,
			travellers: false,
			fabled: false,
			custom: false
		}
	},
	steps: [
		{
			id: "log-in",
			title: "Log in",
			condition: ({ loggedIn }) => !loggedIn,
			render: ({ loggedIn }) => {
				return b`<create-script-step-one
          .loggedIn=${loggedIn}
        ></create-script-step-one>`;
			}
		},
		{
			id: "script-name",
			title: "Script name",
			render: ({ scriptName }) => {
				return b`
          <create-script-step-two
            .scriptName=${scriptName}
          ></create-script-step-two>
        `;
			}
		},
		{
			id: "author-name",
			title: "Author name",
			render: ({ authorName }) => {
				return b`
          <create-script-step-author-name
            .authorName=${authorName}
          ></create-script-step-author-name>
        `;
			}
		},
		{
			id: "base-script",
			title: "Base script",
			render: ({ baseScript }) => {
				return b`
          <create-script-step-three
            .baseScript=${baseScript}
          ></create-script-step-three>
        `;
			}
		},
		{
			id: "script-options",
			title: "Script options",
			render: ({ type, includeCustom }) => b`<create-script-step-four
          .type=${type}
          .includeCustom=${includeCustom}
        ></create-script-step-four>`
		},
		{
			id: "select-roles",
			title: "Select roles",
			render: ({ baseScript, includeCustom, textFilter, filters, selectedScriptRoles }) => b`<create-script-step-six
          .textFilter=${textFilter}
          .filters=${filters}
          .selectedScriptRoles=${selectedScriptRoles}
          .includeCustom=${includeCustom}
          .baseScript=${baseScript}
        ></create-script-step-six>`
		},
		{
			id: "night-order-first",
			title: "Night order - first night",
			render: ({ selectedScriptRoles }) => b`<create-script-step-seven
          kind="firstNight"
          .selectedScriptRoles=${selectedScriptRoles}
        ></create-script-step-seven>`
		},
		{
			id: "night-order-other",
			title: "Night order - other night",
			render: ({ selectedScriptRoles }) => b`<create-script-step-seven
          kind="otherNight"
          .selectedScriptRoles=${selectedScriptRoles}
        ></create-script-step-seven>`
		},
		{
			id: "bootlegger-rules",
			title: "Bootlegger rules",
			condition: ({ selectedScriptRoles }) => selectedScriptRoles.some((r) => r.id === "bootlegger"),
			render: ({ bootlegger }) => b`<create-script-bootlegger-rules
          .bootlegger=${bootlegger}
        ></create-script-bootlegger-rules>`
		},
		{
			id: "publish",
			title: "Publish",
			hideBackButton: ({ published }) => published,
			render: ({ bootlegger, selectedScriptRoles, type, scriptName, published, authorName, publishType }) => b`<create-script-step-eight
          .bootlegger=${bootlegger}
          .publishType=${publishType}
          .authorName=${authorName}
          .type=${type}
          .scriptName=${scriptName}
          .published=${published}
          .selectedScriptRoles=${selectedScriptRoles}
        ></create-script-step-eight>`
		}
	]
});
//#endregion
export { create_script_default as default };
