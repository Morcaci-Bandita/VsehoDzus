import { A as i, I as i$1, P as b, f as border, g as elevation4, t as when, v as header, x as main5 } from "./CY602n9t.js";
import { H as get, U as set, b as img, c as MediaQueryController, d as alignment, r as state, s as BREAKPOINTS } from "./CP0hEE1l.js";
import "./vIOCOudq.js";
import "./ntwYzdyv.js";
import { U as kebab, V as copy, c as edit } from "./CEyrKUT7.js";
import { t as remove } from "./dKNDhBkx.js";
import { t as check } from "./BTrKfjJH.js";
import { t as inlay } from "./Ue9OS-EJ.js";
import { t as button } from "./CbFrBy7s.js";
import { t as iconButton } from "./C0jyJKsx.js";
import { t as dialog } from "./Dm27KaR0.js";
import { t as context } from "./BgH8Gcb8.js";
import { t as buttonLink } from "./6PngWMwE.js";
import "./CXEVaKnf2.js";
import "./B1OborLG.js";
//#region src/pages/custom-roles.js
async function deleteRole(role) {
	await set("roles", (await get("roles") ?? []).filter((r) => r.id !== role.id));
	state.dispatchEvent(new Event("custom-roles-updated"));
}
var BotcCustomRoles = class extends i {
	media = new MediaQueryController(this, [BREAKPOINTS.LG.MIN], ({ media, matches }) => {
		switch (media) {
			case BREAKPOINTS.LG.MIN:
				this.mobile = !matches;
				break;
		}
	});
	static styles = [
		header,
		buttonLink,
		button,
		inlay,
		iconButton,
		i$1`
      :host {
        display: block;
        padding: 16px;
      }

      botc-disclosure {
      }

      botc-disclosure::part(button) {
        padding-top: 16px;
        padding-bottom: 16px;
      }

      .manage-custom-scripts ul {
        padding: 0;
        list-style: none;
        margin-top: 0;
        margin-bottom: 0;
      }

      .manage-custom-scripts ul li {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding-top: 8px;
        padding-bottom: 8px;
      }

      .manage-custom-scripts ul li:not(:last-child) {
        border-bottom: solid 1px ${border};
      }

      botc-disclosure::part(button) {
        padding-top: 16px;
        padding-bottom: 16px;
      }

      svg {
        fill: white;
      }

      .actions {
        display: flex;
        align-items: center;
      }

      .actions button:not(:last-child) {
        margin-right: 8px;
      }

      h2 {
        font-family: "Balgruf";
        font-size: 1.375rem;
        color: ${main5};
        text-shadow: 1px 1px 2px rgba(0, 0, 0, 1);
        margin-top: 0;
        margin-bottom: 0;
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

      img {
        display: block;
        border-radius: 50%;
        ${elevation4()}
        margin-right: 16px;
        width: 50px;
        height: 50px;
        border-radius: 50%;
        border: solid 2px var(--ui-bg-9);
        background-color: var(--ui-bg-8);
      }

      .role-text {
        flex: 1;
      }

      .role-text p {
        margin: 0;
        font-size: 0.9rem;
      }

      ul li:not(:last-child) {
        border-bottom: solid 1px ${border};
        padding-bottom: 12px;
      }

      .actions {
        margin-left: 8px;
      }
    `
	];
	static properties = { customRoles: { type: Object } };
	constructor() {
		super();
		this.customRoles = {};
	}
	async connectedCallback() {
		super.connectedCallback();
		this.customRoles = await get("roles") ?? [];
		state.addEventListener("custom-roles-updated", async () => {
			this.customRoles = await get("roles") ?? [];
			this.requestUpdate();
		});
	}
	render() {
		return b`
      ${when(this.mobile, () => b` <botc-back-button href="/menu"></botc-back-button> `)}
      <h1 header>Homebrew Roles</h1>
      <div>
        <botc-card label="Create Homebrew Role">
          <button
            ui-button
            primary
            @click=${() => {
			dialog.open({
				id: "flow",
				parameters: { flow: {
					id: "create-role",
					kind: "create"
				} }
			});
		}}
          >
            Create homebrew role
          </button>
        </botc-card>
        ${when(this.customRoles.length, () => b`
            <botc-card label="Manage Homebrew Roles">
              <div class="manage-custom-scripts">
                <div ui-inlay>
                  <ul class="custom-scripts-list">
                    ${this.customRoles.map((role) => b`
                        <li>
                          <div>
                            <img
                              src="${img(role)}"
                              alt="${role.humanReadableRole}"
                              width="25"
                              height="25"
                              class="${alignment(role.type)}"
                            />
                          </div>
                          <div class="role-text">
                            <h2 class="${alignment(role.type)}">
                              ${role.humanReadableRole}
                            </h2>
                            ${when(role.flavor, () => b` <p>${role.flavor}</p> `)}
                          </div>
                          <div class="actions">
                            <button
                              ui-icon-button
                              ${context(dialog, () => b`
                                  <botc-roles-buttons
                                    .role=${role}
                                    .name=${role.humanReadableRole}
                                    .delete=${() => deleteRole(role)}
                                  ></botc-roles-buttons>
                                `)}
                            >
                              ${kebab}
                            </button>
                          </div>
                        </li>
                      `)}
                  </ul>
                </div>
              </div>
            </botc-card>
          `)}
      </div>
    `;
	}
};
var BotcRolesButtons = class extends i {
	static properties = {
		name: { type: String },
		role: { type: Object },
		script: { type: Object }
	};
	static styles = [button, i$1`
      .custom-scripts button[ui-button] {
        display: flex;
        justify-content: center;
        align-items: center;
      }

      .custom-scripts button[ui-button] svg {
        fill: var(--ui-main-5);
      }

      .custom-scripts button[ui-button] span {
        flex: 1;
        margin-left: -24px;
      }
    `];
	async openDialog(id, parameters) {
		dialog.close();
		await dialog.closed;
		await new Promise((r) => requestAnimationFrame(r));
		dialog.open({
			id,
			parameters
		});
	}
	constructor() {
		super();
		this.name = "";
		this.role = {};
		this.script = "";
	}
	render() {
		return b`
      <div class="custom-scripts">
        <button
          ui-button
          secondary
          @click=${() => this.openDialog("viewCustomRole", { role: this.role })}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="24px"
            viewBox="0 -960 960 960"
            width="24px"
            fill="#e3e3e3"
          >
            <path
              d="M480-320q75 0 127.5-52.5T660-500q0-75-52.5-127.5T480-680q-75 0-127.5 52.5T300-500q0 75 52.5 127.5T480-320Zm0-72q-45 0-76.5-31.5T372-500q0-45 31.5-76.5T480-608q45 0 76.5 31.5T588-500q0 45-31.5 76.5T480-392Zm0 192q-146 0-266-81.5T40-500q54-137 174-218.5T480-800q146 0 266 81.5T920-500q-54 137-174 218.5T480-200Zm0-300Zm0 220q113 0 207.5-59.5T832-500q-50-101-144.5-160.5T480-720q-113 0-207.5 59.5T128-500q50 101 144.5 160.5T480-280Z"
            />
          </svg>
          <span>View role</span>
        </button>
        <button
          ui-button
          secondary
          @click=${() => {
			const { id: roleId, ...roleData } = this.role;
			this.openDialog("flow", { flow: {
				id: "create-role",
				kind: "edit",
				roleId,
				...roleData
			} });
		}}
        >
          ${edit} <span>Edit role</span>
        </button>
        <button ui-button secondary @click=${this.copy}>
          ${copy} <span>Copy JSON</span>
        </button>
        <button
          @click=${() => this.openDialog("deleteCustomRole", {
			name: this.name,
			delete: this.delete
		})}
          ui-button
          secondary
        >
          ${remove} <span>Delete role</span>
        </button>
      </div>
    `;
	}
	async copy() {
		const roleJson = {
			id: this.role.id,
			name: this.role.humanReadableRole,
			team: this.role.type.toLowerCase(),
			ability: this.role.summary,
			...this.role.image && { image: this.role.image },
			...this.role.flavor && { flavor: this.role.flavor },
			...this.role.firstNight && { firstNight: this.role.firstNight },
			...this.role.firstNightReminder && { firstNightReminder: this.role.firstNightReminder },
			...this.role.otherNight && { otherNight: this.role.otherNight },
			...this.role.otherNightReminder && { otherNightReminder: this.role.otherNightReminder },
			...this.role.reminders?.length && { reminders: this.role.reminders },
			...this.role.setup && { setup: this.role.setup },
			...this.role.jinxes?.length && { jinxes: this.role.jinxes },
			...this.role.special?.length && { special: this.role.special }
		};
		navigator.clipboard.writeText(JSON.stringify(roleJson, null, 2)).then(() => {
			this.openDialog("inline", {
				header: "Role copied",
				render: () => b`
            <p ui-success>${check} Role JSON copied to clipboard.</p>
            <div ui-inlay>
              <code>
                <pre style="overflow:auto;">
${JSON.stringify(roleJson, null, 2).trim()}</pre>
              </code>
            </div>
          `
			});
		}).catch(() => {
			this.openDialog("inline", {
				header: "Error",
				render: () => b`Failed to copy role JSON. Please try again later.`
			});
		});
	}
};
customElements.define("botc-roles-buttons", BotcRolesButtons);
customElements.define("botc-custom-roles", BotcCustomRoles);
//#endregion
export { BotcCustomRoles };
