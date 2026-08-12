import { A as i, I as i$1, L as r, P as b, _ as focus, g as elevation4, o as bg4, s as bg5, t as when } from "./CY602n9t.js";
import { M as SCRIPTS_DATA, n as settings, r as state } from "./CP0hEE1l.js";
import "./vIOCOudq.js";
import { t as check } from "./BTrKfjJH.js";
import { t as button } from "./CbFrBy7s.js";
import { t as dialog } from "./Dm27KaR0.js";
import { t as input } from "./_hTQLwBE.js";
import { t as visuallyHidden } from "./DZ8S2RMZ.js";
import { t as select } from "./C-op7emD.js";
//#region src/components/dialog/create-game.js
var BotcCreateGame = class extends i {
	static properties = {
		amount: { type: Number },
		stMode: { type: Boolean }
	};
	constructor() {
		super();
		this.amount = 5;
		this.stMode = state.getState()?.currentGame?.stMode ?? false;
	}
	static styles = [
		button,
		input,
		select,
		i$1`
      ${r(visuallyHidden)}

      :host {
        display: block;
      }

      form {
        margin-top: 8px;
      }

      button[ui-button] {
        margin-top: 40px;
      }

      label.amount-of-players-select {
        margin-top: 16px;
      }

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
        height: 100%;
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
    `
	];
	render() {
		const players = state.getState()?.currentGame?.players;
		const numInputs = this.stMode ? this.amount : this.amount - 1;
		return b`
      <label ui-label for="script-select">
        <select ui-select name="scripts" id="script-select">
          ${Object.keys(SCRIPTS_DATA).filter((s) => s !== "All").map((script, i) => b`
                <option
                  ?selected=${state.getState()?.currentGame?.script === script || i === 0}
                  value="${script}"
                >
                  ${script}
                </option>
              `)}
        </select>
        <span>Script</span>
      </label>

      <label class="amount-of-players-select" ui-label for="amount-of-players">
        <select
          ui-select
          @change=${(e) => {
			this.amount = Number(e.target.value);
		}}
          name="amount"
          id="amount-of-players"
        >
          ${[...Array(20)].map((_, i) => i + 5).map((val) => b`
                <option
                  ?selected=${String(this.amount) === String(val)}
                  value="${val}"
                >
                  ${val}
                </option>
              `)}
        </select>
        <span>Amount of players</span>
      </label>

      <label class="travellers">
        <input
          visually-hidden
          type="checkbox"
          name="st"
          id="st"
          ?checked=${this.stMode}
          @input=${(e) => {
			this.stMode = e.target.checked;
		}}
        />
        <div>
          <span class="checkbox"><span>${check}</span></span>
          <span>Storyteller mode</span>
        </div>
      </label>

      <label class="travellers">
        <input
          visually-hidden
          type="checkbox"
          name="travellers"
          id="travellers"
        />
        <div>
          <span class="checkbox"><span>${check}</span></span>
          <span>Include travellers</span>
        </div>
      </label>

      ${when(!this.stMode, () => b`
          <label ui-label for="me">
            <input
              required
              ui-input
              type="text"
              value="${settings.getState().name ?? ""}"
              name="me"
              id="me"
              placeholder="Your name"
            />
            <span>Your name</span>
          </label>
        `)}

      <label ui-label>
        <span>Players</span>
      </label>

      <form @submit=${this.handleSubmit}>
        ${Array.from({ length: numInputs }).map((_, i) => {
			const player = players?.[i];
			if (player?.me) return null;
			return b`
            <label ui-label for="player-name-${i}">
              <input
                required
                ui-input
                type="text"
                value="${player?.name ?? ""}"
                name="player-name-${i}"
                id="player-name-${i}"
                placeholder="Player ${i + 1}"
              />
            </label>
          `;
		})}

        <button ui-button primary>Submit</button>
      </form>
    `;
	}
	async handleSubmit(e) {
		e.preventDefault();
		const formData = new FormData(e.target);
		/** @type {import('../../../types.js').Player[]} */
		const players = Array.from(formData.keys()).map((key) => ({
			tokens: [],
			name: formData.get(key),
			id: crypto.randomUUID(),
			claims: [],
			notes: "",
			suspectedRole: {},
			dead: false,
			me: false
		}));
		const me = this.shadowRoot.querySelector("#me");
		if (me) players.unshift({
			tokens: [],
			me: true,
			name: me.value,
			id: crypto.randomUUID(),
			claims: [],
			notes: "",
			suspectedRole: {},
			dead: false
		});
		const script = this.shadowRoot.querySelector("select[name=\"scripts\"]").value;
		const addTravellers = this.shadowRoot.querySelector("#travellers").checked;
		const stMode = this.shadowRoot.querySelector("#st").checked;
		const scriptRolesData = await SCRIPTS_DATA[script]();
		const scriptRoles = [
			...scriptRolesData.townsfolk,
			...scriptRolesData.outsider,
			...scriptRolesData.minion,
			...scriptRolesData.demon,
			...addTravellers ? scriptRolesData.traveller : []
		];
		state.setState((s) => ({
			...s,
			currentGame: {
				deadlog: [],
				deadlogMap: {},
				tokens: [],
				globalReminders: [],
				stMode,
				scriptRoles,
				nightPhaseIndex: 0,
				script,
				players,
				state: stMode ? "setup" : "in-progress",
				rolesInPlay: [],
				demonBluffs: [],
				nominations: [],
				conversations: [],
				travellers: addTravellers,
				day: 0
			}
		}));
		dialog.close();
		requestAnimationFrame(() => {
			window.scrollTo({
				top: 0,
				behavior: "instant"
			});
		});
	}
};
customElements.define("botc-create-game", BotcCreateGame);
//#endregion
export { BotcCreateGame };
