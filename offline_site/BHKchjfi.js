import { I as i, P as b } from "./CY602n9t.js";
import { o as syncGames } from "./l4dTAMDA.js";
import { F as api, M as SCRIPTS_DATA, i as stats, n as settings } from "./CP0hEE1l.js";
import { t as button } from "./CbFrBy7s.js";
import { t as input } from "./_hTQLwBE.js";
import { t as select } from "./C-op7emD.js";
import { t as radio } from "./Bx4sgpmC.js";
import "./D9Tfud2d2.js";
import { t as BotcFlowElement } from "./Fe0s9FWC2.js";
//#region src/flows/quick-add/index.js
var QuickAddStepOne = class extends BotcFlowElement {
	static properties = { name: { type: String } };
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
	render() {
		return b`
      <p>
        In the future, you can prevent this step by configuring your name in the
        Settings menu.
      </p>
      <label ui-label for="name">
        <input
          required
          ui-input
          value=${this.name}
          type="text"
          name="name"
          id="name"
          @input=${(e) => {
			settings.setState((state) => ({
				...state,
				name: e.target.value
			}));
			this.setState((state) => ({
				...state,
				name: e.target.value
			}));
		}}
        />
        <span>Enter your name</span>
      </label>
      <div class="buttons">
        <button
          ?disabled=${!(this.name && this.name.trim().length > 0)}
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
customElements.define("quick-add-step-one", QuickAddStepOne);
var QuickAddStepTwo = class extends BotcFlowElement {
	static properties = { scriptName: { type: String } };
	mapStateToProps(state) {
		return { scriptName: state.scriptName };
	}
	async handleScriptChange(e) {
		const selectedScript = e.target.value;
		this.setState((state) => ({
			...state,
			scriptName: selectedScript
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

      .buttons {
        margin-top: auto;
      }
    `
	];
	render() {
		return b`
      <p>Which script did you play?</p>
      <label ui-label for="script-select">
        <select
          @change=${this.handleScriptChange}
          ui-select
          name="scripts"
          id="script-select"
        >
          <option value="" disabled ?selected=${!this.scriptName}>
            Select script
          </option>

          ${Object.keys(SCRIPTS_DATA).filter((s) => s !== "All").map((script) => b`
                <option
                  ?selected=${script === this.scriptName}
                  value="${script}"
                >
                  ${script}
                </option>
              `)}
          <option value="custom">Custom</option>
        </select>
        <span>Scripts</span>
      </label>
      <div class="buttons">
        <button
          ?disabled=${!this.scriptName}
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
customElements.define("quick-add-step-two", QuickAddStepTwo);
var QuickAddStepThree = class extends BotcFlowElement {
	static properties = {
		scriptName: { type: String },
		roles: { type: Array },
		role: { type: Object },
		filter: { type: String }
	};
	constructor() {
		super();
		this.roles = [];
		this.scriptName = "";
		this.role = null;
		this.filter = "";
	}
	mapStateToProps(state) {
		return { role: state.role };
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
		const script = await SCRIPTS_DATA[this.scriptName]();
		this.roles = Object.keys(script).reduce((allCharacters, category) => {
			return allCharacters.concat(script[category]);
		}, []).sort((a, b) => {
			return a.humanReadableRole.localeCompare(b.humanReadableRole);
		});
		this.roles = this.roles.concat([
			{
				humanReadableRole: "Homebrew Townsfolk",
				id: "homebrew-townsfolk",
				type: "Townsfolk",
				icon: "transparent",
				script: ""
			},
			{
				humanReadableRole: "Homebrew Outsider",
				id: "homebrew-outsider",
				type: "Outsider",
				icon: "transparent",
				script: ""
			},
			{
				humanReadableRole: "Homebrew Minion",
				id: "homebrew-minion",
				type: "Minion",
				icon: "transparent",
				script: ""
			},
			{
				humanReadableRole: "Homebrew Demon",
				id: "homebrew-demon",
				type: "Demon",
				icon: "transparent",
				script: ""
			}
		]);
		this.allRoles = this.roles;
	}
	onRoleChange({ selection }) {
		this.setState((state) => ({
			...state,
			role: selection[0]
		}));
		this.next();
	}
	handleFilter(e) {
		const filter = e.target.value.toLowerCase();
		if (filter === "") {
			this.filter = "";
			this.shadowRoot.querySelector("botc-select-role").requestUpdate();
			return;
		}
		this.filter = filter;
		this.shadowRoot.querySelector("botc-select-role").requestUpdate();
	}
	render() {
		const selected = [...this.role ? [this.role] : []];
		return b`
      <p>Which role did you play?</p>
      <label id="search" ui-label>
        <input @input=${this.handleFilter} ui-input type="text" />
        <span>Search role</span>
      </label>
      <botc-select-role
        script=${this.scriptName}
        allScriptRoles
        .selected=${selected}
        .filterFn=${(r) => {
			if (this.filter === "") return true;
			return r.id.includes(this.filter);
		}}
        @selection-changed=${this.onRoleChange}
        .sortFn=${(a, b) => {
			return a.humanReadableRole.localeCompare(b.humanReadableRole);
		}}
      ></botc-select-role>
      <div class="buttons">
        <button
          ?disabled=${!this.role}
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
customElements.define("quick-add-step-three", QuickAddStepThree);
var QuickAddStepFour = class extends BotcFlowElement {
	static properties = { result: { type: String } };
	constructor() {
		super();
		this.result = "";
	}
	mapStateToProps(state) {
		return { role: state.role };
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
      <p>Did you win or lose?</p>
      <label ui-label for="win">
        <input
          ui-radio
          type="radio"
          name="result"
          id="win"
          ?checked=${this.result === "win"}
          visually-hidden
          @change=${() => {
			this.resultSelected = true;
			this.setState((state) => ({
				...state,
				result: "win"
			}));
			this.next();
		}}
        />
        <div>
          <div class="toggle"><span class="selected"></span></div>
          <div class="content">Win</div>
        </div>
      </label>
      <label ui-label for="loss">
        <input
          ui-radio
          type="radio"
          name="result"
          id="loss"
          ?checked=${this.result === "loss"}
          visually-hidden
          @change=${() => {
			this.resultSelected = true;
			this.setState((state) => ({
				...state,
				result: "loss"
			}));
			this.next();
		}}
        />
        <div>
          <div class="toggle"><span class="selected"></span></div>
          <div class="content">Loss</div>
        </div>
      </label>
      <div class="buttons">
        <button
          ?disabled=${!this.result}
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
customElements.define("quick-add-step-four", QuickAddStepFour);
var QuickAddStepFive = class extends BotcFlowElement {
	static properties = {
		notes: { type: String },
		script: { type: String },
		result: { type: String },
		role: { type: Object },
		name: { type: String }
	};
	constructor() {
		super();
		this.notes = "";
	}
	mapStateToProps(state) {
		return { notes: state.notes };
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
    `
	];
	updateNotes(e) {
		this.setState((state) => ({
			...state,
			notes: e.target.value
		}));
	}
	render() {
		return b`
      <p>Optional: Would you like to add some notes about this game?</p>
      <textarea
        .value=${this.notes}
        @input=${this.updateNotes}
        ui-input
        rows="5"
      ></textarea>
      <div class="buttons">
        <button
          class="next"
          ui-button
          primary
          @click=${() => {
			const script = this.script;
			const result = this.result;
			const name = this.name;
			const role = this.role;
			let gameResult;
			stats.setState((s) => {
				gameResult = {
					id: crypto.randomUUID(),
					synced: false,
					kind: "quick-add",
					notes: this.notes,
					date: (/* @__PURE__ */ new Date()).toISOString(),
					script,
					result,
					players: [{
						name,
						suspectedRole: role,
						me: true,
						dead: false,
						notes: "",
						confirmed: false,
						tokens: [],
						claims: [],
						id: crypto.randomUUID()
					}]
				};
				return {
					...s,
					games: [...s.games, gameResult]
				};
			});
			setTimeout(() => {
				this.close();
			});
			setTimeout(async () => {
				if (window.location.hostname !== "localhost") if (settings.getState().user) try {
					syncGames();
				} catch (e) {}
				else try {
					await api.post("https://qr-thing.netlify.app/.netlify/functions/games", gameResult);
				} catch {}
			});
		}}
        >
          Save game
        </button>
        <button ui-button secondary @click=${this.close}>Close</button>
      </div>
    `;
	}
};
customElements.define("quick-add-step-five", QuickAddStepFive);
var quick_add_default = () => ({
	title: "Quick Add",
	initialState: { name: settings.getState().name },
	steps: [
		...settings.getState().name !== null ? [] : [{
			id: "enter-your-name",
			title: "Enter your name",
			render: ({ name }) => b`<quick-add-step-one .name=${name}></quick-add-step-one>`
		}],
		{
			id: "select-script",
			title: "Select script",
			render: ({ scriptName }) => {
				return b`
          <quick-add-step-two .scriptName=${scriptName}></quick-add-step-two>
        `;
			}
		},
		{
			id: "select-role",
			title: "Select role",
			render: ({ scriptName, role }) => {
				return b`
          <quick-add-step-three
            .scriptName=${scriptName}
            .role=${role}
          ></quick-add-step-three>
        `;
			}
		},
		{
			id: "result",
			title: "Result",
			render: ({ result }) => b`<quick-add-step-four .result=${result}></quick-add-step-four>`
		},
		{
			id: "notes-and-submit",
			title: "Notes & Submit",
			render: ({ result, scriptName, role, name }) => b`<quick-add-step-five
          .result=${result}
          .script=${scriptName}
          .role=${role}
          .name=${name}
        ></quick-add-step-five>`
		}
	]
});
//#endregion
export { quick_add_default as default };
