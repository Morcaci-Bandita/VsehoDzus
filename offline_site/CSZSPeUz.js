import { A as i, I as i$1, L as r, P as b, _ as focus, c as bg6, d as bg9, f as border, g as elevation4, s as bg5, u as bg8 } from "./CY602n9t.js";
import { M as SCRIPTS_DATA, b as img, d as alignment, r as state } from "./CP0hEE1l.js";
import { o as waitUntil } from "./vIOCOudq.js";
import "./ntwYzdyv.js";
import { t as button } from "./CbFrBy7s.js";
import { t as dialog } from "./Dm27KaR0.js";
import { t as input } from "./_hTQLwBE.js";
import { t as visuallyHidden } from "./DZ8S2RMZ.js";
//#region src/components/dialog/add-token.js
var BotcToken = class extends i {
	static properties = {
		player: { type: Number },
		script: { type: Object },
		tokens: { type: Array },
		scriptRoles: { type: Array },
		nonScriptRoles: { type: Array }
	};
	constructor() {
		super();
		this.player = {};
		this.script = {};
		this.tokens = [];
		this.scriptRoles = [];
		this.nonScriptRoles = [];
	}
	async connectedCallback() {
		super.connectedCallback();
		const travellers = state.getState().currentGame.travellers;
		const script = state.getState().currentGame.script;
		const stMode = state.getState().currentGame.stMode;
		this.script = await SCRIPTS_DATA[script]();
		if (stMode) this.tokens = state.getState().currentGame.tokens;
		else {
			const tokens = (stMode ? state.getState().currentGame.tokens : Object.values(this.script).reduce((acc, roles) => acc.concat(roles), [])).map((r) => {
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
			if (state.getState().currentGame.globalReminders.some((r) => r.id === "godofug") && !tokens.find((t) => t.id === "godofug-Hat")) tokens.push({
				id: `godofug-Hat`,
				role: "loric",
				label: "Hat",
				icon: "godofug",
				type: "loric",
				humanReadableRole: "God of Ug"
			});
			if (!tokens.some((t) => t.id === "special-Evil")) tokens.push({
				id: `special-Evil`,
				role: "special",
				label: "Evil",
				icon: "evil",
				type: "demon",
				humanReadableRole: "Evil"
			});
			if (!tokens.some((t) => t.id === "special-Good")) tokens.push({
				id: `special-Good`,
				role: "special",
				label: "Good",
				icon: "good",
				type: "townsfolk",
				humanReadableRole: "Good"
			});
			this.tokens = tokens;
		}
		const gameState = state.getState().currentGame;
		if (gameState.scriptData) {
			const allScriptRoles = [
				...gameState.scriptData.townsfolk || [],
				...gameState.scriptData.outsider || [],
				...gameState.scriptData.minion || [],
				...gameState.scriptData.demon || [],
				...gameState.scriptData.traveller || [],
				...gameState.scriptData.fabled || [],
				...gameState.scriptData.loric || []
			].filter((role) => role.id !== "minioninfo" && role.id !== "demoninfo");
			this.scriptRoles = allScriptRoles.map((role) => ({
				id: `role-${role.id}`,
				role: role.id,
				label: role.humanReadableRole || role.name,
				icon: role.icon,
				type: role.type,
				humanReadableRole: role.humanReadableRole || role.name
			}));
		}
		if (window.rolesById) {
			const scriptRoleIds = /* @__PURE__ */ new Set([
				...(gameState.scriptData?.townsfolk || []).map((r) => r.id),
				...(gameState.scriptData?.outsider || []).map((r) => r.id),
				...(gameState.scriptData?.minion || []).map((r) => r.id),
				...(gameState.scriptData?.demon || []).map((r) => r.id),
				...(gameState.scriptData?.traveller || []).map((r) => r.id),
				...(gameState.scriptData?.fabled || []).map((r) => r.id),
				...(gameState.scriptData?.loric || []).map((r) => r.id)
			]);
			const nonScriptRoles = Object.values(window.rolesById).filter((role) => !scriptRoleIds.has(role.id) && role.id !== "minioninfo" && role.id !== "demoninfo");
			this.nonScriptRoles = nonScriptRoles.map((role) => ({
				id: `role-${role.id}`,
				role: role.id,
				label: role.humanReadableRole || role.name,
				icon: role.icon,
				type: role.type,
				humanReadableRole: role.humanReadableRole || role.name
			})).sort((a, b) => a.humanReadableRole.localeCompare(b.humanReadableRole));
		}
	}
	static styles = [
		button,
		input,
		i$1`
      img {
        width: 50px;
        height: 50px;
        border-radius: 50%;
        border: solid 2px ${bg9};
        background-color: ${bg8};
        margin-right: 10px;
      }

      ul {
        list-style: none;
        padding: 0;
      }

      ul label.role {
        ${elevation4()}
        display: flex;
        align-items: center;
        margin-bottom: 10px;
        background: ${bg5};
        border: solid 1px ${border};
        border-radius: 4px;
        padding: 8px;
        transition: background 0.2s;
      }

      ul label.role.selected {
        border: solid 2px rgb(112, 210, 125);
        background: #4c564d;
        padding: 7px;
      }

      .clear {
        display: flex;
        margin-bottom: 10px;
      }

      input:checked + label {
        border: solid 2px rgb(112, 210, 125);
        background: #4c564d;
        padding: 7px;
      }

      .label {
        margin-top: 0;
        font-size: 0.9rem;
        margin-bottom: 4px;
      }

      .role-label {
        color: var(--ui-main-4);
        font-family: "Balgruf";
        font-size: 1.375rem;
        text-shadow: 1px 1px 2px rgba(0, 0, 0, 1);
      }

      img.blue {
        border: solid 2px #45a0f1;
      }
      div.blue {
        color: #45a0f1;
      }

      img.red {
        border: solid 2px #d9403b;
      }
      div.red {
        color: #d9403b;
      }
      div.green {
        color: #a7e16c;
      }
      img.green {
        border: solid 2px #a7e16c;
      }
      div.yellow {
        color: #ffee00;
      }
      img.yellow {
        border: solid 2px #ffee00;
      }

      ${r(visuallyHidden)}

      input:focus-visible + label {
        ${focus()}
      }

      input:focus-visible:not(:checked) + label {
        background: var(--ui-bg-4);
      }

      @media (hover: hover) and (pointer: fine) {
        input:not(:checked) + label.role:hover {
          background: var(--ui-bg-4);
        }
      }

      botc-disclosure {
        background-color: ${bg6};
      }

      botc-disclosure::part(button) {
        padding-top: 16px;
        padding-bottom: 16px;
      }
    `
	];
	async firstUpdated() {
		if (this.player.tokens.length) {
			await waitUntil(() => this.shadowRoot.querySelectorAll("input").length);
			const items = this.shadowRoot.querySelectorAll("input");
			if (items.length) requestAnimationFrame(() => {
				const found = [...items].find((li) => this.player.tokens.some((token) => li.dataset.id === token.id));
				if (found) found.parentElement.scrollIntoView({
					behavior: "instant",
					block: "center"
				});
			});
		}
	}
	render() {
		return b`
      <ul>
        <li class="clear">
          <button @click=${() => this.handleInput(null)} ui-button secondary>
            Clear tokens
          </button>
        </li>
        ${this.tokens.map((token, i) => b`
            <li
              class="${this.player.tokens.find((r) => r.id === token.id) ? "selected" : ""}"
            >
              <input
                data-id=${token.id}
                visually-hidden
                @input=${() => {
			this.handleInput(token);
		}}
                id=${i}
                type="checkbox"
                .checked=${this.player.tokens.find((r) => r.id === token.id)}
              />
              <label for=${i} class="role">
                <img
                  class="${alignment(token.type)}"
                  src="${img(token)}"
                  alt="${token.label}"
                />
                <div>
                  <div class="role-label ${alignment(token.type)}">
                    ${token.humanReadableRole}
                  </div>
                  <div class="label">${token.label}</div>
                </div>
              </label>
            </li>
          `)}
      </ul>
      <botc-disclosure>
        <div slot="label">Script roles</div>
        <div ui-inlay slot="detail">
          <ul>
            ${this.scriptRoles.map((token, i) => b`
                <li
                  class="${this.player.tokens.find((r) => r.id === token.id) ? "selected" : ""}"
                >
                  <input
                    data-id=${token.id}
                    visually-hidden
                    @input=${() => {
			this.handleInput(token);
		}}
                    id=${"script-" + i}
                    type="checkbox"
                    .checked=${this.player.tokens.find((r) => r.id === token.id)}
                  />
                  <label for=${"script-" + i} class="role">
                    <img
                      class="${alignment(token.type)}"
                      src="${img(token)}"
                      alt="${token.label}"
                    />
                    <div>
                      <div class="role-label ${alignment(token.type)}">
                        ${token.humanReadableRole}
                      </div>
                      <div class="label">${token.label}</div>
                    </div>
                  </label>
                </li>
              `)}
          </ul>
        </div>
      </botc-disclosure>
      <botc-disclosure>
        <div slot="label">Non-script roles</div>
        <div ui-inlay slot="detail">
          <ul>
            ${this.nonScriptRoles.map((token, i) => b`
                <li
                  class="${this.player.tokens.find((r) => r.id === token.id) ? "selected" : ""}"
                >
                  <input
                    data-id=${token.id}
                    visually-hidden
                    @input=${() => {
			this.handleInput(token);
		}}
                    id=${"non-script-" + i}
                    type="checkbox"
                    .checked=${this.player.tokens.find((r) => r.id === token.id)}
                  />
                  <label for=${"non-script-" + i} class="role">
                    <img
                      class="${alignment(token.type)}"
                      src="${img(token)}"
                      alt="${token.label}"
                    />
                    <div>
                      <div class="role-label ${alignment(token.type)}">
                        ${token.humanReadableRole}
                      </div>
                      <div class="label">${token.label}</div>
                    </div>
                  </label>
                </li>
              `)}
          </ul>
        </div>
      </botc-disclosure>
      <button ui-button primary @click=${() => dialog.close()}>Save</button>
    `;
	}
	handleInput(token) {
		state.setState((state) => {
			const player = state.currentGame.players.find((player) => player.id === this.player.id);
			if (!token) {
				player.tokens = [];
				dialog.close();
				return state;
			}
			const tokenIndex = player.tokens.findIndex((r) => r.id === token.id);
			if (tokenIndex > -1) player.tokens.splice(tokenIndex, 1);
			else {
				if (token.id === "special-Evil") player.tokens = player.tokens.filter((t) => t.id !== "special-Good");
				else if (token.id === "special-Good") player.tokens = player.tokens.filter((t) => t.id !== "special-Evil");
				if (token.id === "godofug-Hat") state.currentGame.players.forEach((p) => {
					if (p.id !== player.id) p.tokens = p.tokens.filter((t) => t.id !== "godofug-Hat");
				});
				player.tokens.push(token);
			}
			this.player = { ...player };
			return state;
		});
	}
};
customElements.define("botc-add-token", BotcToken);
//#endregion
export { BotcToken };
