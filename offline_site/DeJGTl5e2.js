import { I as i, L as r, P as b, _ as focus, b as main4, d as bg9, f as border, g as elevation4, o as bg4, s as bg5, t as when, u as bg8 } from "./CY602n9t.js";
import { H as get, U as set, b as img, d as alignment, m as capitalize } from "./CP0hEE1l.js";
import "./D8HaG3T3.js";
import "./vIOCOudq.js";
import { n as add, t as remove } from "./dKNDhBkx.js";
import { t as check } from "./BTrKfjJH.js";
import { t as inlay } from "./Ue9OS-EJ.js";
import { t as button } from "./CbFrBy7s.js";
import { t as iconButton } from "./C0jyJKsx.js";
import { t as input } from "./_hTQLwBE.js";
import { t as visuallyHidden } from "./DZ8S2RMZ.js";
import { t as select } from "./C-op7emD.js";
import { t as BotcFlowElement } from "./Fe0s9FWC2.js";
//#region src/flows/create-role/index.js
var CreateRoleStepOne = class extends BotcFlowElement {
	static properties = {
		name: { type: String },
		_formValid: { type: Boolean }
	};
	mapStateToProps(state) {
		return { name: state.name };
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
	handleInput(e) {
		const input = e.target;
		this._formValid = input.checkValidity();
		const name = input.value;
		this.setState((state) => ({
			...state,
			name,
			id: name.toLowerCase().replace(/[^a-z0-9]/g, "")
		}));
	}
	updated() {
		const input = this.shadowRoot.querySelector("input");
		if (input) this._formValid = input.checkValidity();
	}
	submit(e) {
		e.preventDefault();
		if (this._formValid) this.next();
	}
	render() {
		return b`
      <p>
        What's the name of the role you want to
        ${this.kind === "create" ? "create" : "edit"}?
      </p>
      <form @submit=${this.submit}>
        <label id="search" ui-label>
          <input
            @input=${this.handleInput}
            required
            .value=${this.name}
            maxlength="50"
            pattern="[a-zA-Z0-9 ]+"
            title="Only letters, numbers, and spaces are allowed"
            ui-input
            type="text"
          />
          <span>Role name</span>
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
};
customElements.define("create-role-step-one", CreateRoleStepOne);
var CreateRoleStepTwo = class extends BotcFlowElement {
	static properties = { flavor: { type: String } };
	mapStateToProps(state) {
		return { flavor: state.flavor };
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
	handleInput(e) {
		const flavor = e.target.value;
		this.setState((state) => ({
			...state,
			flavor
		}));
	}
	submit(e) {
		e.preventDefault();
		this.next();
	}
	render() {
		return b`
      <p><b>Optional:</b> Would you like to add flavor text?</p>
      <form @submit=${this.submit}>
        <label id="search" ui-label>
          <textarea
            @input=${this.handleInput}
            .value=${this.flavor}
            ui-input
            type="text"
            rows="5"
          ></textarea>
          <span>Flavor</span>
        </label>
      </form>
      <div class="buttons">
        <button class="next" ui-button primary @click=${this.next}>Next</button>
        <button ui-button secondary @click=${this.close}>Close</button>
      </div>
    `;
	}
};
customElements.define("create-role-step-two", CreateRoleStepTwo);
var CreateRoleStepThree = class extends BotcFlowElement {
	static properties = { type: { type: String } };
	mapStateToProps(state) {
		return { type: state.type };
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
	async changeType() {
		const type = this.shadowRoot.querySelector("#type-select").value;
		if (type !== "None") {
			console.log(type);
			this.setState((state) => ({
				...state,
				type
			}));
		}
		this.next();
	}
	render() {
		return b`
      <p>Which alignment does your character have?</p>
      <label ui-label for="type-select">
        <select
          @change=${this.changeType}
          ui-select
          name="scripts"
          id="type-select"
        >
          <option disabled ?selected=${this.type === "None"}>None</option>
          <option ?selected=${this.type === "Townsfolk"}>Townsfolk</option>
          <option ?selected=${this.type === "Outsider"}>Outsider</option>
          <option ?selected=${this.type === "Minion"}>Minion</option>
          <option ?selected=${this.type === "Demon"}>Demon</option>
          <option ?selected=${this.type === "Traveller"}>Traveller</option>
          <option ?selected=${this.type === "Fabled"}>Fabled</option>
          <option ?selected=${this.type === "Loric"}>Loric</option>
        </select>
        <span>Alignment</span>
      </label>

      <div class="buttons">
        <button
          class="next"
          ui-button
          primary
          @click=${this.next}
          ?disabled=${this.type === "None"}
        >
          Next
        </button>
        <button ui-button secondary @click=${this.close}>Close</button>
      </div>
    `;
	}
};
customElements.define("create-role-step-three", CreateRoleStepThree);
var CreateRoleStepFour = class extends BotcFlowElement {
	static properties = {
		image: { type: String },
		_formValid: { type: Boolean }
	};
	mapStateToProps(state) {
		return { image: state.image };
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
	handleInput(e) {
		const input = e.target;
		this._formValid = input.checkValidity();
		const image = input.value;
		this.setState((state) => ({
			...state,
			image
		}));
	}
	updated() {
		const input = this.shadowRoot.querySelector("input");
		if (input) this._formValid = input.checkValidity();
	}
	submit(e) {
		e.preventDefault();
		if (this._formValid) this.next();
	}
	render() {
		return b`
      <p>Please provide a valid link to an image for your homebrew role.</p>
      <form @submit=${this.submit}>
        <label id="search" ui-label>
          <input
            required
            @input=${this.handleInput}
            .value=${this.image}
            ui-input
            name="image"
            type="url"
          ></input>
          <span>Image</span>
        </label>
      </form>
      <div class="buttons">
        <button class="next" ui-button primary ?disabled=${!this._formValid} @click=${this.next}>Next</button>
        <button ui-button secondary @click=${this.close}>Close</button>
      </div>
    `;
	}
};
customElements.define("create-role-step-four", CreateRoleStepFour);
var CreateRoleAbility = class extends BotcFlowElement {
	static properties = {
		summary: { type: String },
		_formValid: { type: Boolean }
	};
	mapStateToProps(state) {
		return { summary: state.summary };
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
	handleInput(e) {
		const input = e.target;
		this._formValid = input.checkValidity();
		const summary = input.value;
		this.setState((state) => ({
			...state,
			summary
		}));
	}
	updated() {
		const input = this.shadowRoot.querySelector("textarea");
		if (input) this._formValid = input.checkValidity();
	}
	submit(e) {
		e.preventDefault();
		if (this._formValid) this.next();
	}
	render() {
		return b`
      <p>Describe your roles ability.</p>
      <form @submit=${this.submit}>
        <label id="search" ui-label>
          <textarea
            required
            @input=${this.handleInput}
            .value=${this.summary}
            ui-input
            rows="5"
            type="text"
          ></textarea>
          <span>Ability</span>
        </label>
      </form>
      <div class="buttons">
        <button
          class="next"
          ui-button
          primary
          ?disabled=${!this._formValid}
          @click=${this.next}
        >
          Next
        </button>
        <button ui-button secondary @click=${this.close}>Close</button>
      </div>
    `;
	}
};
customElements.define("create-role-ability", CreateRoleAbility);
var CreateRoleSetupAbility = class extends BotcFlowElement {
	static properties = { setup: { type: String } };
	mapStateToProps(state) {
		return { setup: state.setup };
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

      ${r(visuallyHidden)}

      .travellers {
        display: flex;
        border: solid 1px var(--ui-border);
        border-radius: 4px;
        margin-top: 16px;
        margin-bottom: 16px;
        ${elevation4()}
      }

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
    `
	];
	render() {
		return b`
      <p>Is the ability a setup ability?</p>
      <label class="travellers">
        <input
          ?checked=${this.setup}
          visually-hidden
          @input=${(e) => {
			this.setState((state) => ({
				...state,
				setup: e.target.checked
			}));
		}}
          type="checkbox"
          name="travellers"
          id="travellers"
        />
        <div>
          <span class="checkbox"><span>${check}</span></span>
          <span>Setup ability</span>
        </div>
      </label>
      <div class="buttons">
        <button class="next" ui-button primary @click=${this.next}>Next</button>
        <button ui-button secondary @click=${this.close}>Close</button>
      </div>
    `;
	}
};
customElements.define("create-role-setup-ability", CreateRoleSetupAbility);
var CreateRoleStepFive = class extends BotcFlowElement {
	static properties = {
		firstNight: { type: Number },
		firstNightReminder: { type: String }
	};
	mapStateToProps(state) {
		return {
			firstNight: state.firstNight,
			firstNightReminder: state.firstNightReminder
		};
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
	handleInput(e) {
		const firstNightReminder = e.target.value;
		this.setState((state) => ({
			...state,
			firstNightReminder
		}));
	}
	handleNrInput(e) {
		const firstNight = e.target.valueAsNumber;
		this.setState((state) => ({
			...state,
			firstNight
		}));
	}
	submit(e) {
		e.preventDefault();
		this.next();
	}
	render() {
		return b`
      <p><b>Optional:</b> Does your homebrew role have a first night ability?</p>
      <form @submit=${this.submit}>
        <label id="search" ui-label>
          <input
            @input=${this.handleNrInput}
            .value=${this.firstNight}
            ui-input
            type="number"
          ></input>
          <span>First Night order</span>
        </label>
        <label id="search" ui-label>
          <textarea
            @input=${this.handleInput}
            .value=${this.firstNightReminder}
            ui-input
            type="text"
            rows="5"
          ></textarea>
          <span>First Night Reminder text</span>
        </label>
      </form>
      <div class="buttons">
        <button class="next" ui-button primary @click=${this.next}>Next</button>
        <button ui-button secondary @click=${this.close}>Close</button>
      </div>
    `;
	}
};
customElements.define("create-role-step-five", CreateRoleStepFive);
var CreateRoleStepSix = class extends BotcFlowElement {
	static properties = {
		otherNight: { type: Number },
		otherNightReminder: { type: String }
	};
	mapStateToProps(state) {
		return {
			otherNight: state.otherNight,
			otherNightReminder: state.otherNightReminder
		};
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
	handleInput(e) {
		const otherNightReminder = e.target.value;
		this.setState((state) => ({
			...state,
			otherNightReminder
		}));
	}
	handleNrInput(e) {
		const otherNight = e.target.valueAsNumber;
		this.setState((state) => ({
			...state,
			otherNight
		}));
	}
	submit(e) {
		e.preventDefault();
		this.next();
	}
	render() {
		return b`
      <p><b>Optional:</b> Does your homebrew role have a other night ability?</p>
      <form @submit=${this.submit}>
        <label id="search" ui-label>
          <input
            @input=${this.handleNrInput}
            .value=${this.otherNight}
            ui-input
            type="number"
          ></input>
          <span>Other Night order</span>
        </label>
        <label id="search" ui-label>
          <textarea
            @input=${this.handleInput}
            .value=${this.otherNightReminder}
            ui-input
            type="text"
            rows="5"
          ></textarea>
          <span>Other Night Reminder text</span>
        </label>
      </form>
      <div class="buttons">
        <button class="next" ui-button primary @click=${this.next}>Next</button>
        <button ui-button secondary @click=${this.close}>Close</button>
      </div>
    `;
	}
};
customElements.define("create-role-step-six", CreateRoleStepSix);
var CreateRoleStepSeven = class extends BotcFlowElement {
	static properties = { reminders: { type: Array } };
	mapStateToProps(state) {
		return { reminders: state.reminders };
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

      .reminder-wrapper {
        display: flex;
        align-items: center;
        justify-content: center;
      }
      .reminder-wrapper input {
        flex: 1;
        margin-right: 8px;
      }

      button[ui-button][secondary] span.reminder-icon {
        margin-right: 8px;
      }

      .buttons {
        margin-top: auto;
      }
    `
	];
	render() {
		return b`
      <p>
        <b>Optional:</b> Would you like to add reminder tokens for your custom
        role? (e.g.: "Dead", "Poisoned", etc.)
      </p>
      ${this.reminders.map((reminder, index) => b`
          <label ui-label for="reminder-${index}">
            <div class="reminder-wrapper">
              <input
                .value=${reminder}
                ui-input
                id="reminder-${index}"
                type="text"
                data-index=${index}
                @input=${this.updateReminderText}
              />

              <button
                ui-icon-button
                @click=${(e) => this.removeReminder(e, index)}
              >
                ${remove}
              </button>
            </div>
            <span>Reminder ${index + 1}</span>
          </label>
        `)}
      <button ui-button secondary @click=${this.addReminder}>
        <span class="reminder-icon">${add}</span><span>Add reminder</span>
      </button>

      <div class="buttons">
        <button class="next" ui-button primary @click=${this.next}>Next</button>
        <button ui-button secondary @click=${this.close}>Close</button>
      </div>
    `;
	}
	updateReminderText(e) {
		const index = Number(e.target.dataset.index);
		const newValue = e.target.value;
		this.setState((state) => {
			const reminders = [...state.reminders || []];
			reminders[index] = newValue;
			return {
				...state,
				reminders
			};
		});
	}
	addReminder(e) {
		e.preventDefault();
		this.setState((state) => ({
			...state,
			reminders: [...state.reminders || [], ""]
		}));
	}
	removeReminder(e, index) {
		e.preventDefault();
		this.setState((state) => ({
			...state,
			reminders: state.reminders.filter((_, i) => i !== index)
		}));
	}
};
customElements.define("create-role-step-seven", CreateRoleStepSeven);
var CreateRoleStepEight = class extends BotcFlowElement {
	static properties = {
		jinxes: { type: Array },
		roles: { type: Array }
	};
	mapStateToProps(state) {
		return { jinxes: state.jinxes };
	}
	constructor() {
		super();
		this.roles = [];
	}
	static styles = [
		input,
		button,
		select,
		iconButton,
		i`
      :host {
        display: flex;
        flex-direction: column;
        flex: 1;
      }

      .buttons {
        margin-top: auto;
      }

      .jinx-controls {
        display: flex;
        align-items: center;
        gap: 8px;
        margin-bottom: 8px;
      }

      .jinx-controls select {
        flex: 1;
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

      .reminder-wrapper {
        display: flex;
        align-items: center;
        justify-content: center;
      }
      .reminder-wrapper input {
        flex: 1;
        margin-right: 8px;
      }

      button[ui-button][secondary] span.reminder-icon {
        margin-right: 8px;
      }

      .buttons {
        margin-top: auto;
      }
    `
	];
	async connectedCallback() {
		super.connectedCallback();
		const customRoles = await get("roles") || [];
		const all = [...Object.entries(window.rolesById || {}).map(([id, role]) => ({
			id,
			humanReadableRole: role.humanReadableRole
		})), ...customRoles].filter((r) => r?.id && r?.humanReadableRole).sort((a, b) => a.humanReadableRole.localeCompare(b.humanReadableRole));
		this.roles = all;
	}
	render() {
		return b`
      <p><b>Optional:</b> Would you like to add jinxes?</p>

      ${this.jinxes.map((jinx, index) => b`
          <div>
            <label ui-label for="jinx-select-${index}">
              <div class="jinx-controls">
                <select
                  ui-select
                  id="jinx-select-${index}"
                  @change=${(e) => this.updateJinxId(e, index)}
                >
                  <option value="" disabled ?selected=${!jinx.id}>
                    Select a role
                  </option>
                  ${this.roles.map((role) => b`
                      <option value=${role.id} ?selected=${jinx.id === role.id}>
                        ${role.humanReadableRole}
                      </option>
                    `)}
                </select>
                <button
                  ui-icon-button
                  @click=${(e) => this.removeJinx(e, index)}
                >
                  ${remove}
                </button>
              </div>
              <span>Role</span>
            </label>

            <label id="jinx-reason-${index}" ui-label>
              <textarea
                ui-input
                rows="2"
                @input=${(e) => this.updateJinxReason(e, index)}
              >
${jinx.reason}</textarea>
              <span>Reason</span>
            </label>
          </div>
        `)}

      <button class="add-jinx" ui-button secondary @click=${this.addJinx}>
        <span class="reminder-icon">${add}</span><span>Add jinx</span>
      </button>

      <div class="buttons">
        <button class="next" ui-button primary @click=${this.next}>Next</button>
        <button ui-button secondary @click=${this.close}>Close</button>
      </div>
    `;
	}
	updateJinxId(e, index) {
		const newId = e.target.value;
		this.setState((state) => {
			const jinxes = [...state.jinxes || []];
			jinxes[index] = {
				...jinxes[index],
				id: newId
			};
			return {
				...state,
				jinxes
			};
		});
	}
	updateJinxReason(e, index) {
		const reason = e.target.value;
		this.setState((state) => {
			const jinxes = [...state.jinxes || []];
			jinxes[index] = {
				...jinxes[index],
				reason
			};
			return {
				...state,
				jinxes
			};
		});
	}
	addJinx(e) {
		e.preventDefault();
		this.setState((state) => ({
			...state,
			jinxes: [...state.jinxes || [], {
				id: "",
				reason: ""
			}]
		}));
	}
	removeJinx(e, index) {
		e.preventDefault();
		this.setState((state) => ({
			...state,
			jinxes: state.jinxes.filter((_, i) => i !== index)
		}));
	}
};
customElements.define("create-role-step-eight", CreateRoleStepEight);
var CreateRoleSpecialInteractions = class extends BotcFlowElement {
	static properties = { special: { type: Array } };
	mapStateToProps(state) {
		return { special: state.special };
	}
	static styles = [
		input,
		button,
		select,
		iconButton,
		i`
      :host {
        display: flex;
        flex-direction: column;
        flex: 1;
      }

      .buttons {
        margin-top: auto;
      }

      .special-controls {
        display: flex;
        align-items: flex-start;
        gap: 8px;
        margin-bottom: 16px;
      }

      .special-fields {
        flex: 1;
        display: flex;
        flex-direction: column;
        gap: 12px;
      }

      .special-controls select,
      .special-controls textarea {
        width: 100%;
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

      .remove-special {
        align-self: flex-start;
        margin-top: 8px;
      }

      .validation-error {
        color: var(--ui-error-5);
        font-size: 0.875rem;
        margin-top: 4px;
      }

      .special-item {
        margin-bottom: 16px;
      }

      .remove {
        margin-right: 8px;
      }

      a {
        color: var(--ui-main-5);
      }

      .explanation {
        margin-top: 0;
        margin-bottom: 1.5rem;
      }
    `
	];
	render() {
		return b`
      <p>
        <b>Optional:</b> Would you like to add any special interactions for your
        homebrew role?
      </p>
      <p class="explanation">
        Special interactions are used in the
        <a href="https://botc.app">official app</a> to add to or enhance a
        role's behavior.
      </p>

      ${this.special.map((specialItem, index) => {
			const hasTypeError = !specialItem.type;
			const hasNameError = !specialItem.name;
			return b`
          <botc-card>
            <div class="special-item ${hasTypeError || hasNameError ? "has-error" : ""}">
              <div class="special-controls">
                <div class="special-fields">
                  <label ui-label for="special-type-${index}">
                    <select
                      ui-select
                      id="special-type-${index}"
                      @change=${(e) => this.updateSpecialType(e, index)}
                      ?required=${true}
                    >
                      <option value="" disabled ?selected=${!specialItem.type}>
                        Select integration type
                      </option>
                      <option
                        value="selection"
                        ?selected=${specialItem.type === "selection"}
                      >
                        selection
                      </option>
                      <option
                        value="ability"
                        ?selected=${specialItem.type === "ability"}
                      >
                        ability
                      </option>
                      <option
                        value="signal"
                        ?selected=${specialItem.type === "signal"}
                      >
                        signal
                      </option>
                      <option
                        value="vote"
                        ?selected=${specialItem.type === "vote"}
                      >
                        vote
                      </option>
                      <option
                        value="reveal"
                        ?selected=${specialItem.type === "reveal"}
                      >
                        reveal
                      </option>
                    </select>
                    <span>Integration Type *</span>
                  </label>

                  <label ui-label for="special-name-${index}">
                    <select
                      ui-select
                      id="special-name-${index}"
                      @change=${(e) => this.updateSpecialName(e, index)}
                      ?required=${true}
                    >
                      <option value="" disabled ?selected=${!specialItem.name}>
                        Select feature name
                      </option>
                      <option
                        value="grimoire"
                        ?selected=${specialItem.name === "grimoire"}
                      >
                        grimoire
                      </option>
                      <option
                        value="pointing"
                        ?selected=${specialItem.name === "pointing"}
                      >
                        pointing
                      </option>
                      <option
                        value="ghost-votes"
                        ?selected=${specialItem.name === "ghost-votes"}
                      >
                        ghost-votes
                      </option>
                      <option
                        value="distribute-roles"
                        ?selected=${specialItem.name === "distribute-roles"}
                      >
                        distribute-roles
                      </option>
                      <option
                        value="bag-disabled"
                        ?selected=${specialItem.name === "bag-disabled"}
                      >
                        bag-disabled
                      </option>
                      <option
                        value="bag-duplicate"
                        ?selected=${specialItem.name === "bag-duplicate"}
                      >
                        bag-duplicate
                      </option>
                      <option
                        value="multiplier"
                        ?selected=${specialItem.name === "multiplier"}
                      >
                        multiplier
                      </option>
                      <option
                        value="hidden"
                        ?selected=${specialItem.name === "hidden"}
                      >
                        hidden
                      </option>
                      <option
                        value="replace-character"
                        ?selected=${specialItem.name === "replace-character"}
                      >
                        replace-character
                      </option>
                      <option
                        value="player"
                        ?selected=${specialItem.name === "player"}
                      >
                        player
                      </option>
                      <option
                        value="card"
                        ?selected=${specialItem.name === "card"}
                      >
                        card
                      </option>
                    </select>
                    <span>Feature Name *</span>
                  </label>

                  <label ui-label for="special-value-${index}">
                    <input
                      ui-input
                      id="special-value-${index}"
                      type="text"
                      .value=${specialItem.value || ""}
                      @input=${(e) => this.updateSpecialValue(e, index)}
                      maxlength="50"
                      placeholder="Text or numeric value"
                    />
                    <span>Value (optional)</span>
                  </label>

                  <label ui-label for="special-time-${index}">
                    <select
                      ui-select
                      id="special-time-${index}"
                      @change=${(e) => this.updateSpecialTime(e, index)}
                    >
                      <option value="" disabled ?selected=${!specialItem.time}>
                        Select timing
                      </option>
                      <option
                        value="pregame"
                        ?selected=${specialItem.time === "pregame"}
                      >
                        pregame
                      </option>
                      <option
                        value="day"
                        ?selected=${specialItem.time === "day"}
                      >
                        day
                      </option>
                      <option
                        value="night"
                        ?selected=${specialItem.time === "night"}
                      >
                        night
                      </option>
                      <option
                        value="firstNight"
                        ?selected=${specialItem.time === "firstNight"}
                      >
                        firstNight
                      </option>
                      <option
                        value="firstDay"
                        ?selected=${specialItem.time === "firstDay"}
                      >
                        firstDay
                      </option>
                      <option
                        value="otherNight"
                        ?selected=${specialItem.time === "otherNight"}
                      >
                        otherNight
                      </option>
                      <option
                        value="otherDay"
                        ?selected=${specialItem.time === "otherDay"}
                      >
                        otherDay
                      </option>
                    </select>
                    <span>Time (optional)</span>
                  </label>

                  <label ui-label for="special-global-${index}">
                    <select
                      ui-select
                      id="special-global-${index}"
                      @change=${(e) => this.updateSpecialGlobal(e, index)}
                    >
                      <option
                        value=""
                        disabled
                        ?selected=${!specialItem.global}
                      >
                        Select scope
                      </option>
                      <option
                        value="townsfolk"
                        ?selected=${specialItem.global === "townsfolk"}
                      >
                        townsfolk
                      </option>
                      <option
                        value="outsider"
                        ?selected=${specialItem.global === "outsider"}
                      >
                        outsider
                      </option>
                      <option
                        value="minion"
                        ?selected=${specialItem.global === "minion"}
                      >
                        minion
                      </option>
                      <option
                        value="demon"
                        ?selected=${specialItem.global === "demon"}
                      >
                        demon
                      </option>
                      <option
                        value="traveller"
                        ?selected=${specialItem.global === "traveller"}
                      >
                        traveller
                      </option>
                      <option
                        value="dead"
                        ?selected=${specialItem.global === "dead"}
                      >
                        dead
                      </option>
                    </select>
                    <span>Global Ability Scope (optional)</span>
                  </label>
                </div>
              </div>
              <button
                ui-button
                secondary
                class="remove-special"
                @click=${(e) => this.removeSpecial(e, index)}
                title="Remove special interaction"
              >
                <span class="remove">${remove}</span>
                <span>Remove special interaction</span>
              </button>
            </div>
          </botc-card>
        `;
		})}

      <button ui-button secondary @click=${this.addSpecial}>
        <span class="add-icon">${add}</span>
        <span>Add special interaction</span>
      </button>

      <div class="buttons">
        <button
          class="next"
          ui-button
          primary
          @click=${this.next}
          ?disabled=${this.hasValidationErrors()}
        >
          Next
        </button>
        <button ui-button secondary @click=${this.close}>Close</button>
      </div>
    `;
	}
	hasValidationErrors() {
		return this.special.some((item) => !item.type || !item.name);
	}
	updateSpecialType(e, index) {
		const type = e.target.value;
		this.setState((state) => {
			const special = [...state.special || []];
			special[index] = {
				...special[index],
				type
			};
			return {
				...state,
				special
			};
		});
	}
	updateSpecialName(e, index) {
		const name = e.target.value;
		this.setState((state) => {
			const special = [...state.special || []];
			special[index] = {
				...special[index],
				name
			};
			return {
				...state,
				special
			};
		});
	}
	updateSpecialValue(e, index) {
		const value = e.target.value;
		this.setState((state) => {
			const special = [...state.special || []];
			if (value === "") {
				const { value: _, ...itemWithoutValue } = special[index];
				special[index] = itemWithoutValue;
			} else {
				const numericValue = Number(value);
				const finalValue = !isNaN(numericValue) && value.trim() !== "" ? numericValue : value;
				special[index] = {
					...special[index],
					value: finalValue
				};
			}
			return {
				...state,
				special
			};
		});
	}
	updateSpecialTime(e, index) {
		const time = e.target.value;
		this.setState((state) => {
			const special = [...state.special || []];
			if (time === "") {
				const { time: _, ...itemWithoutTime } = special[index];
				special[index] = itemWithoutTime;
			} else special[index] = {
				...special[index],
				time
			};
			return {
				...state,
				special
			};
		});
	}
	updateSpecialGlobal(e, index) {
		const global = e.target.value;
		this.setState((state) => {
			const special = [...state.special || []];
			if (global === "") {
				const { global: _, ...itemWithoutGlobal } = special[index];
				special[index] = itemWithoutGlobal;
			} else special[index] = {
				...special[index],
				global
			};
			return {
				...state,
				special
			};
		});
	}
	addSpecial(e) {
		e.preventDefault();
		this.setState((state) => ({
			...state,
			special: [...state.special || [], {
				type: "",
				name: ""
			}]
		}));
	}
	removeSpecial(e, index) {
		e.preventDefault();
		this.setState((state) => ({
			...state,
			special: state.special.filter((_, i) => i !== index)
		}));
	}
};
customElements.define("create-role-special-interactions", CreateRoleSpecialInteractions);
var CreateRoleStepNine = class extends BotcFlowElement {
	static properties = {
		name: { type: String },
		type: { type: String },
		image: { type: String },
		flavor: { type: String },
		summary: { type: String },
		reminders: { type: Array },
		jinxes: { type: Array },
		firstNight: { type: Number },
		firstNightReminder: { type: String },
		otherNight: { type: Number },
		otherNightReminder: { type: String },
		rolesById: { type: Object },
		state: { type: String },
		setup: { type: Boolean },
		special: { type: Array }
	};
	static styles = [
		input,
		button,
		inlay,
		i`
      :host {
        display: flex;
        flex-direction: column;
        flex: 1;
      }

      .name {
        font-family: "Balgruf";
        font-size: 2rem;
        color: var(--ui-main-5);
        text-shadow: 1px 1px 2px rgba(0, 0, 0, 1);
        text-align: center;
        line-height: 0.9;
        margin-top: 0px;
        margin-bottom: 16px;
      }

      .flavor {
        font-style: italic;
        text-align: center;
      }

      .buttons {
        margin-top: auto;
      }

      .img {
        border-radius: 50%;
        border: solid 2px var(--ui-bg-9);
        background-color: var(--ui-bg-8);

        width: 75px;
        height: 75px;
        border-radius: 50%;
        display: block;
        margin-left: auto;
        margin-right: auto;
        margin-bottom: 24px;
        margin-top: 8px;
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

      .tokens {
        display: flex;
        justify-content: center;
      }

      .token {
        display: flex;
        flex-direction: column;
        align-items: center;
        margin-right: 20px;
      }

      .token img {
        width: 50px;
        height: 50px;
        border-radius: 50%;
        border: solid 2px ${border};
        box-shadow: 1px 1px 2px 1px rgba(0, 0, 0, 0.75);
      }

      .token img.red {
        border: solid 2px #d9403b;
      }
      .token img.blue {
        border: solid 2px #45a0f1;
      }

      .tokens p {
        margin-top: 8px;
        font-size: 0.9rem;
        margin-bottom: 0;
      }

      .type {
        text-align: center;
      }

      .jinxes h2.jinx-title {
        text-align: center;
        display: block;
        margin-bottom: 32px;
      }

      .jinxes .jinx .jinx-role {
        display: flex;
        align-items: center;
        margin-bottom: 12px;
      }

      .jinxes h2 {
        display: flex;
        color: ${main4};
        font-family: "Balgruf";
        font-size: 1.375rem;
        text-shadow: 1px 1px 2px rgba(0, 0, 0, 1);
        margin: 0;
      }

      .jinxes img {
        margin-right: 12px;
        width: 50px;
        height: 50px;
        border-radius: 50%;
        border: solid 2px ${bg9};
        background-color: ${bg8};
      }

      .jinxes img.blue {
        border: solid 2px #45a0f1;
      }
      .jinxes h2.blue {
        color: #45a0f1;
      }

      .jinxes img.red {
        border: solid 2px #d9403b;
      }
      .jinxes h2.red {
        color: #d9403b;
      }

      ul.jinx-list {
        list-style: none;
        padding: 8px;
        margin: 0;
      }

      ul.jinx-list li.jinx-item {
        display: flex;
        align-items: center;
        padding-top: 12px;
        padding-bottom: 12px;
      }

      ul.jinx-list li.jinx-item:not(:last-child) {
        border-bottom: solid 1px ${border};
      }

      ul.jinx-list li.jinx-item p.reason {
        font-size: 0.85rem;
        margin-top: 0;
        margin-bottom: 0;
      }

      .special-interaction-item {
        margin-bottom: 12px;
        padding-bottom: 12px;
        border-bottom: 1px solid ${border};
      }

      .special-interaction-item:last-child {
        border-bottom: none;
        margin-bottom: 0;
        padding-bottom: 0;
      }

      .special-header {
        display: flex;
        gap: 8px;
        margin-bottom: 4px;
        font-weight: 500;
      }

      .special-detail {
        display: flex;
        gap: 4px;
        font-size: 0.875rem;
        margin-bottom: 2px;
      }

      .detail-label {
        font-weight: 500;
      }
    `
	];
	constructor() {
		super();
		this.state = "initialized";
	}
	async connectedCallback() {
		super.connectedCallback();
		const customRoles = await get("roles") || [];
		const regularRoles = window.rolesById;
		this.rolesById = {
			...regularRoles,
			...customRoles
		};
	}
	render() {
		const tokens = [...new Set(this?.reminders ?? [])].map((reminder) => ({
			id: `${this.id}-${reminder}`,
			role: this.id,
			label: reminder,
			image: this.image,
			type: this.type,
			humanReadableRole: this.name
		}));
		return b`
      <p>If you're happy with your homebrew role, you can now save it.</p>
      <botc-card>
        <img src=${this.image} class="img ${alignment(this.type)}" />
        <h2 class="name ${alignment(this.type)}">${capitalize(this.name)}</h2>
        <p class="type">${this.type}</p>
        <div class="flavor" ui-inlay>"${this.flavor}"</div>
      </botc-card>

      <botc-card label="Ability ${this.setup ? "(+setup)" : ""}">
        <p class="summary">${this.summary}</p>
        <p class="first-night">
          <b>First Night:</b>
          ${this.firstNight > 0 ? `Order ${this.firstNight} - ${this.firstNightReminder}` : "None"}
        </p>
        <p class="other-night">
          <b>Other Night:</b>
          ${this.otherNight > 0 ? `Order ${this.otherNight} - ${this.otherNightReminder}` : "None"}
        </p>
      </botc-card>

      ${when(tokens.length > 0, () => b`
          <botc-card label="Reminder tokens">
            <ul ui-inlay class="tokens">
              ${tokens.map((token) => b`
                  <li class="token">
                    <img
                      class="${alignment(token.type)}"
                      src="${token.image}"
                      alt="${token.humanReadableRole + " " + token.label}"
                      title="${token.humanReadableRole + " " + token.label}"
                    />
                    <p>${token.label}</p>
                  </li>
                `)}
            </ul>
          </botc-card>
        `)}
      ${when(this.jinxes.length, () => b`
          <botc-card class="jinxes" label="Jinxes">
            <ul class="jinx-list" ui-inlay>
              ${this.jinxes.map((jinx) => {
			const role = this.rolesById?.[jinx.id];
			if (!role) return b``;
			return b`
                    <li class="jinx-item">
                  <img class="${alignment(role.type)}" src=${img({ icon: jinx.id })}></img>
                  <div>
                    <h2 class="${alignment(role.type)}">${role.humanReadableRole}</h2>
                  <p class="reason">${jinx.reason}</p>

                  </div>
                    </li>
                  `;
		})}
            </ul>
          </botc-card>
        `)}
      ${when(this.special.length, () => b`
          <botc-card label="Special interactions">
            ${this.special.map((specialItem, index) => b`
                <div class="special-interaction-item">
                  <div class="special-detail">
                    <span class="detail-label">Type:</span>
                    <span class="detail-value">${specialItem.type}</span>
                  </div>
                  <div class="special-detail">
                    <span class="detail-label">Name:</span>
                    <span class="detail-value">${specialItem.name}</span>
                  </div>

                  ${when(specialItem.value, () => b`
                      <div class="special-detail">
                        <span class="detail-label">Value:</span>
                        <span class="detail-value">${specialItem.value}</span>
                      </div>
                    `)}
                  ${when(specialItem.time, () => b`
                      <div class="special-detail">
                        <span class="detail-label">Timing:</span>
                        <span class="detail-value">${specialItem.time}</span>
                      </div>
                    `)}
                  ${when(specialItem.global, () => b`
                      <div class="special-detail">
                        <span class="detail-label">Global scope:</span>
                        <span class="detail-value">${specialItem.global}</span>
                      </div>
                    `)}
                </div>
              `)}
          </botc-card>
        `)}
      ${when(this.state === "pending", () => b` <botc-spinner></botc-spinner> `)}

      <div class="buttons">
        <button
          class="next"
          ?disabled=${this.state === "pending"}
          ui-button
          primary
          @click=${this.save}
        >
          Save homebrew role
        </button>
        <button ui-button secondary @click=${this.close}>Close</button>
      </div>
    `;
	}
	async save() {
		this.state = "pending";
		const role = {
			script: "",
			id: this.id,
			type: this.type,
			image: this.image,
			flavor: this.flavor,
			summary: this.summary,
			firstNight: this.firstNight,
			firstNightReminder: this.firstNightReminder,
			otherNight: this.otherNight,
			otherNightReminder: this.otherNightReminder,
			reminders: this.reminders,
			jinxes: this.jinxes,
			humanReadableRole: this.name,
			setup: this.setup,
			special: this.special
		};
		try {
			const customRoles = await get("roles") ?? [];
			if (this.kind === "edit") if (customRoles.find((r) => r.id === this.id)) {
				await set("roles", customRoles.map((r) => r.id === this.id ? role : r));
				state.dispatchEvent(new Event("custom-roles-updated"));
				this.state = "success";
				this.close();
			} else {
				await set("roles", [...customRoles, role]);
				state.dispatchEvent(new Event("custom-roles-updated"));
				this.state = "success";
				this.close();
			}
			else {
				await set("roles", [...customRoles, role]);
				state.dispatchEvent(new Event("custom-roles-updated"));
				this.state = "success";
				this.close();
			}
			this.finalize();
		} catch (error) {
			console.log("Error saving custom role:", error);
			this.state = "error";
		}
	}
};
customElements.define("create-role-step-nine", CreateRoleStepNine);
var create_role_default = ({ kind, name, id, roleId, flavor, type, image, firstNight, firstNightReminder, otherNight, otherNightReminder, reminders, jinxes, setup, summary, humanReadableRole, special }) => ({
	title: ({ kind }) => `${kind === "create" ? "Create" : "Edit"} Role`,
	saveAndResume: kind === "create" ? true : { key: ({ id }) => id },
	initialState: {
		kind,
		setup: setup ?? false,
		name: humanReadableRole ?? "",
		id: roleId ?? id ?? "",
		flavor: flavor ?? "",
		type: type ?? "None",
		image: image ?? "",
		firstNight: firstNight ?? 0,
		firstNightReminder: firstNightReminder ?? "",
		otherNight: otherNight ?? 0,
		otherNightReminder: otherNightReminder ?? "",
		reminders: reminders ?? [],
		jinxes: jinxes ?? [],
		summary: summary ?? "",
		special: special ?? []
	},
	steps: [
		{
			id: "name",
			condition: ({ kind }) => kind === "create",
			title: ({ kind }) => `${kind === "create" ? "Create" : "Edit"} Role`,
			render: ({ kind, name }) => {
				return b`<create-role-step-one
          .kind=${kind}
          .name=${name}
        ></create-role-step-one>`;
			}
		},
		{
			id: "flavor-text",
			title: "Flavor text",
			render: ({ flavor }) => {
				return b`
          <create-role-step-two .flavor=${flavor}></create-role-step-two>
        `;
			}
		},
		{
			id: "alignment",
			title: "Alignment",
			render: ({ type }) => {
				return b`
          <create-role-step-three .type=${type}></create-role-step-three>
        `;
			}
		},
		{
			id: "image",
			title: "Image",
			render: ({ image }) => {
				return b`
          <create-role-step-four .image=${image}></create-role-step-four>
        `;
			}
		},
		{
			id: "ability",
			title: "Ability",
			render: ({ summary }) => b`<create-role-ability .summary=${summary}></create-role-ability>`
		},
		{
			id: "setup-ability",
			title: "Setup ability",
			render: ({ setup }) => b`<create-role-setup-ability
          .setup=${setup}
        ></create-role-setup-ability>`
		},
		{
			id: "first-night",
			title: "First Night",
			render: ({ firstNight, firstNightReminder }) => b`<create-role-step-five
          .firstNight=${firstNight}
          .firstNightReminder=${firstNightReminder}
        ></create-role-step-five>`
		},
		{
			id: "other-night",
			title: "Other Night",
			render: ({ otherNight, otherNightReminder }) => b`<create-role-step-six
          .otherNight=${otherNight}
          .otherNightReminder=${otherNightReminder}
        ></create-role-step-six>`
		},
		{
			id: "reminder-tokens",
			title: "Reminder Tokens",
			render: ({ reminders }) => b`<create-role-step-seven
          .reminders=${reminders}
        ></create-role-step-seven>`
		},
		{
			id: "jinxes",
			title: "Jinxes",
			render: ({ jinxes }) => b`<create-role-step-eight
          .jinxes=${jinxes}
        ></create-role-step-eight>`
		},
		{
			id: "special-interactions",
			title: "Special Interactions",
			render: ({ special }) => b` <create-role-special-interactions
          .special=${special}
        ></create-role-special-interactions>`
		},
		{
			id: "review",
			title: "Review",
			render: ({ id, name, type, image, flavor, summary, reminders, jinxes, firstNight, firstNightReminder, otherNight, otherNightReminder, special, setup }) => b`<create-role-step-nine
          .id=${id}
          .kind=${kind}
          .name=${name}
          .type=${type}
          .image=${image}
          .flavor=${flavor}
          .summary=${summary}
          .reminders=${reminders}
          .jinxes=${jinxes}
          .firstNight=${firstNight}
          .firstNightReminder=${firstNightReminder}
          .otherNight=${otherNight}
          .otherNightReminder=${otherNightReminder}
          .special=${special}
          .setup=${setup}
        ></create-role-step-nine>`
		}
	]
});
//#endregion
export { create_role_default as default };
