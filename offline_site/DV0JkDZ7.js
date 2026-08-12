import { A as i, I as i$1, P as b, t as when } from "./CY602n9t.js";
import { H as get, U as set, r as state } from "./CP0hEE1l.js";
import "./D8HaG3T3.js";
import "./vIOCOudq.js";
import { t as o } from "./BAPyi3WL.js";
import "./CEyrKUT7.js";
import { n as add, t as remove } from "./dKNDhBkx.js";
import { t as button } from "./CbFrBy7s.js";
import { t as iconButton } from "./C0jyJKsx.js";
import { t as error } from "./BnMAryrf.js";
import { t as input } from "./_hTQLwBE.js";
import { t as select } from "./C-op7emD.js";
//#region src/components/dialog/custom-role.js
var BotcCustomRole = class extends i {
	static properties = {
		state: { type: String },
		newScriptName: { type: String },
		roleName: { type: String },
		type: { type: String },
		role: { type: Object },
		error: { type: String },
		reminders: { type: Array }
	};
	constructor() {
		super();
		this.type = "add";
		this.state = "idle";
		this.roleName = "";
		this.role = void 0;
		this.error = "";
		this.reminders = [];
	}
	static styles = [
		button,
		error,
		iconButton,
		input,
		select,
		i$1`
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
    `
	];
	connectedCallback() {
		super.connectedCallback();
		if (this.type === "edit") this.reminders = this.role?.reminders || [];
	}
	render() {
		return b`
      <label ui-label for="alignment-select">
        <select ui-select name="alignment" id="alignment-select">
          <option
            ?selected=${this.type === "add" || this.role?.type === "Townsfolk"}
          >
            Townsfolk
          </option>
          <option ?selected=${this.role?.type === "Outsider"}>Outsider</option>
          <option ?selected=${this.role?.type === "Minion"}>Minion</option>
          <option ?selected=${this.role?.type === "Demon"}>Demon</option>
          <option ?selected=${this.role?.type === "Traveller"}>
            Traveller
          </option>
          <option ?selected=${this.role?.type === "Fabled"}>Fabled</option>
          <option ?selected=${this.role?.type === "Loric"}>Loric</option>
        </select>
        <span>Alignment</span>
      </label>
      <form @submit=${this.addCustomRole}>
        <label ui-label for="name">
          <input
            title="Only letters (a-z, A-Z), spaces and single quotes (') are allowed."
            pattern="[a-zA-Z' ]+"
            ui-input
            maxlength="30"
            required
            id="name"
            type="text"
            value=${o(this.type === "edit" ? this.role?.humanReadableRole : void 0)}
          />
          <span>Name</span>
        </label>

        <label ui-label for="ability">
          <input
            value=${o(this.type === "edit" ? this.role?.summary : void 0)}
            ui-input
            maxlength="200"
            required
            id="ability"
            type="text"
          />
          <span>Ability</span>
        </label>

        <label ui-label for="imgurl">
          <input
            value=${o(this.type === "edit" ? this.role?.image : void 0)}
            ui-input
            required
            id="imgurl"
            type="url"
            placeholder="https://example.com/role.png"
          />
          <span>Img (url)</span>
        </label>

        ${this.reminders.map((reminder, index) => b`
            <label ui-label for="reminder-${index}">
              <div class="reminder-wrapper">
                <input
                  value=${reminder}
                  ui-input
                  id="reminder-${index}"
                  type="text"
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

        <label ui-label for="firstNight">
          <input
            ui-input
            id="firstNight"
            type="number"
            value="${this.type === "edit" ? this.role?.firstNight : 0}"
            placeholder="0"
          />
          <span>firstNight</span>
        </label>
        <label ui-label for="otherNight">
          <input
            ui-input
            id="otherNight"
            type="number"
            value="${this.type === "edit" ? this.role?.otherNight : 0}"
            placeholder="0"
          />
          <span>otherNight</span>
        </label>
        <label ui-label for="firstNightReminder">
          <input
            ui-input
            id="firstNightReminder"
            type="text"
            value="${o(this.type === "edit" ? this.role?.firstNightReminder : void 0)}"
          />
          <span>firstNightReminder</span>
        </label>
        <label ui-label for="otherNightReminder">
          <input
            ui-input
            id="otherNightReminder"
            type="text"
            value="${o(this.type === "edit" ? this.role?.otherNightReminder : void 0)}"
          />
          <span>otherNightReminder</span>
        </label>
        <label ui-label for="script">
          <input ui-input id="script" type="text" />
          <span>Script</span>
        </label>

        ${when(this.state === "success", () => b`
            <div>
              Role "${this.roleName}"
              ${this.type === "edit" ? "edited" : "added"} successfully.
            </div>
          `)}
        ${when(this.state === "failed", () => b` <div ui-error>${this.error}</div> `)}
        <button
          type="submit"
          ?disabled=${this.state === "success"}
          ui-button
          primary
        >
          ${this.type === "edit" ? "Edit" : "Submit"} homebrew role
        </button>
      </form>
    `;
	}
	addReminder(e) {
		e.preventDefault();
		this.reminders.push("");
		this.requestUpdate();
	}
	removeReminder(e, index) {
		e.preventDefault();
		this.reminders.splice(index, 1);
		this.requestUpdate();
	}
	async addCustomRole(e) {
		e.preventDefault();
		this.state = "pending";
		const remindersInputs = this.shadowRoot.querySelectorAll("input[id^='reminder-']");
		const reminders = Array.from(remindersInputs).map((r) => r.value);
		const firstNight = this.shadowRoot.querySelector("#firstNight").valueAsNumber;
		const otherNight = this.shadowRoot.querySelector("#otherNight").valueAsNumber;
		const firstNightReminder = this.shadowRoot.querySelector("#firstNightReminder").value;
		const otherNightReminder = this.shadowRoot.querySelector("#otherNightReminder").value;
		const script = this.shadowRoot.querySelector("#script").value;
		const nameInput = this.shadowRoot.querySelector("#name");
		const alignment = this.shadowRoot.querySelector("#alignment-select").value;
		const name = nameInput.value;
		if (nameInput.validity.valid === false) {
			nameInput.setCustomValidity("Only letters (a-z, A-Z) and single quotes (') are allowed.");
			nameInput.reportValidity();
			return;
		}
		this.roleName = name;
		const ability = this.shadowRoot.querySelector("#ability").value;
		const imgurl = this.shadowRoot.querySelector("#imgurl").value;
		const role = {
			id: name.replace(/\s+/g, "").toLowerCase(),
			humanReadableRole: name,
			script: script ? script : "Homebrew",
			summary: ability,
			image: imgurl,
			type: alignment,
			reminders,
			icon: "",
			firstNight,
			otherNight,
			firstNightReminder,
			otherNightReminder
		};
		try {
			const customRoles = await get("roles") ?? [];
			if (this.type === "add") {
				const existingRole = customRoles.find((r) => r.id === role.id);
				if (existingRole) {
					this.state = "failed";
					this.error = `Role "${existingRole.humanReadableRole}" already exists.`;
					return;
				}
				await set("roles", [...customRoles, role]);
			} else if (this.type === "edit") {
				const index = customRoles.findIndex((r) => r.id === this.role.id);
				if (index !== -1) {
					customRoles[index] = role;
					await set("roles", customRoles);
				}
			}
			state.dispatchEvent(new Event("custom-roles-updated"));
			this.state = "success";
		} catch (e) {
			this.state = "failed";
		}
	}
};
customElements.define("botc-custom-role", BotcCustomRole);
//#endregion
export { BotcCustomRole };
