import { A as i, I as i$1, L as r, P as b, _ as focus, a as bg3, d as bg9, f as border, g as elevation4, h as elevation24, o as bg4, s as bg5, t as when, u as bg8 } from "./CY602n9t.js";
import { M as SCRIPTS_DATA, b as img, d as alignment, l as SAO, m as capitalize, r as state } from "./CP0hEE1l.js";
import { i as debounceAtTimeout, o as waitUntil } from "./vIOCOudq.js";
import { n as sortableListStyles, t as SortableListMixin } from "./BiTbQJWR.js";
import { O as drag } from "./CEyrKUT7.js";
import { n as moon, t as sun } from "./C15Vso4Y.js";
import { t as button } from "./CbFrBy7s.js";
import { t as dialog } from "./Dm27KaR0.js";
import { t as input } from "./_hTQLwBE.js";
import { t as c } from "./CINdyCSV.js";
import { t as visuallyHidden } from "./DZ8S2RMZ.js";
//#region src/components/dialog/select-role.js
const debounceSelectionChanged = debounceAtTimeout((el) => {
	el.dispatchEvent(new SelectionChangedEvent(el.roles));
}, 100);
var BotcSelectRole = class extends SortableListMixin(i) {
	static properties = {
		roles: { type: Array },
		selected: { type: Array },
		allScriptRoles: { type: Boolean },
		text: { type: String },
		multiple: { type: Boolean },
		maxSelect: { type: Number },
		script: { type: String },
		ignoreScrollToPreselected: { type: Boolean },
		sortable: { type: Boolean },
		showMeta: { type: Boolean },
		disabled: { type: Boolean },
		sortableDisabled: { type: Boolean },
		allowEmptyRoles: { type: Boolean },
		appendRoles: { type: Array },
		includeDescription: { type: Boolean },
		showDemonBluffs: { type: Boolean },
		showAlreadyInPlayRoles: { type: Boolean }
	};
	async _onItemOrderChanged(e) {
		const { currentIndex, nextIndex } = e.detail;
		const list = this.shadowRoot.querySelector("ul");
		const items = Array.from(list.children);
		const firstRects = /* @__PURE__ */ new Map();
		for (const li of items) {
			const roleId = li.querySelector("input")?.dataset.id;
			if (roleId) firstRects.set(roleId, li.getBoundingClientRect());
		}
		const roles = [...this.roles];
		[roles[currentIndex], roles[nextIndex]] = [roles[nextIndex], roles[currentIndex]];
		this.roles = roles;
		await this.updateComplete;
		const newItems = Array.from(this.shadowRoot.querySelector("ul").children);
		for (const li of newItems) {
			if (li.hasAttribute("dragged")) continue;
			const wrapper = li.querySelector(".item-wrapper");
			const roleId = li.querySelector("input")?.dataset.id;
			const oldRect = firstRects.get(roleId);
			if (!oldRect || !wrapper) continue;
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
		debounceSelectionChanged(this);
	}
	constructor() {
		super();
		this.ignoreScrollToPreselected = false;
		this.maxSelect = Infinity;
		this.multiple = false;
		this.selected = [];
		this.roles = [];
		this.allScriptRoles = false;
		this.text = "";
		this.script = null;
		this.sortable = false;
		this.showMeta = false;
		this.disabled = false;
		this.allowEmptyRoles = false;
		this.appendRoles = [];
		this.includeDescription = false;
		this.showDemonBluffs = false;
		this.showAlreadyInPlayRoles = false;
	}
	async connectedCallback() {
		super.connectedCallback();
		if (this.allScriptRoles && !this.roles.length) {
			const script = this.script ?? state.getState().currentGame.script;
			this.roles = Object.values(await SCRIPTS_DATA[script]()).reduce((acc, roles) => acc.concat(roles), []);
		} else if (!this.roles.length && !this.allowEmptyRoles) this.roles = state.getState().currentGame.rolesInPlay;
		dialog.setReturnValue(this.selected);
	}
	static styles = [
		button,
		input,
		sortableListStyles,
		i$1`
      ${r(visuallyHidden)}

      .animate {
        transition: all 0.2s ease-in-out;
      }

      .dawn-dusk {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 50px;
        height: 50px;
        border-radius: 50%;
        border: solid 2px ${bg9};
        background-color: ${bg8};
        margin-right: 10px;
      }

      .dawn-dusk svg {
        width: 30px;
        height: 30px;
        fill: var(--ui-main-5);
      }

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

      ul li label.role {
        ${elevation4()}
        display: flex;
        align-items: center;
        /* margin-bottom: 10px; */
        background: ${bg5};
        border: solid 1px ${border};
        border-radius: 4px;
        padding: 8px;
        transition: background 0.2s;
      }

      ul li {
        margin-bottom: 10px;
      }

      ul li.role button {
        all: unset;
        flex: 1;
        display: flex;
        align-items: center;
      }

      ul li label.role.selected {
        border: solid 2px rgb(112, 210, 125);
        background: #4c564d;
        padding: 7px;
      }

      ul li label.role {
        display: flex;
        align-items: center;
      }

      .clear {
        display: flex;
        margin-bottom: 10px;
      }

      ul li:has(input:focus-visible:not(:checked)) label.role {
        background: ${bg4};
      }
      ul li:has(input:focus-visible) label.role {
        ${focus()}
      }

      .txt {
        margin-top: 12px;
        margin-bottom: 12px;
      }
      .drag-handle {
        display: flex;
        margin-right: 6px;
        cursor: move;
      }

      [sortable-list] li .item-wrapper,
      [sortable-list] li {
        transition:
          box-shadow 0.3s,
          transform 0.3s;
      }

      .item-wrapper {
        transition:
          box-shadow 200ms ease,
          transform 200ms ease;
      }

      [sortable-list][dragging] [dragged] .item-wrapper {
        ${elevation24()}
      }

      .drag-handle.disabled {
        cursor: not-allowed;
      }

      .drag-handle.disabled svg {
        fill: ${bg3};
      }

      .balgruf {
        font-size: 1.375rem;
        font-family: "Balgruf";
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
      .balgruf.orange {
        color: var(--ui-main-5);
      }

      img.blue {
        border: solid 2px #45a0f1;
      }
      img.red {
        border: solid 2px #d9403b;
      }
      img.yellow {
        border: solid 2px #ffee00;
      }
      img.green {
        border: solid 2px #a7e16c;
      }

      .description {
        font-size: 0.85rem;
      }

      .already-in-play img.blue,
      .already-in-play img.red,
      .already-in-play img.yellow,
      .already-in-play img.green,
      .bluff img.blue,
      .bluff img.red,
      .bluff img.yellow,
      .bluff img.green {
        border: solid 2px var(--ui-bg-2);
        filter: grayscale(100%);
      }

      .already-in-play .balgruf.blue,
      .already-in-play .balgruf.red,
      .already-in-play .balgruf.yellow,
      .already-in-play .balgruf.green,
      .bluff .balgruf.blue,
      .bluff .balgruf.red,
      .bluff .balgruf.yellow,
      .bluff .balgruf.green {
        color: var(--ui-bg-2);
      }

      .role-txt {
        display: flex;
        flex-direction: column;
        font-size: 0.75rem;
      }

      .role-txt .already-in-play,
      .role-txt .bluff-indicator {
        margin-top: -4px;
      }

      @media (hover: hover) and (pointer: fine) {
        ul li label.role:not(.selected):hover {
          background: var(--ui-bg-4);
        }
      }
    `
	];
	async firstUpdated() {
		if (this.selected.length && !this.ignoreScrollToPreselected) {
			await waitUntil(() => this.shadowRoot.querySelectorAll("input").length);
			const items = this.shadowRoot.querySelectorAll("input");
			if (items.length) requestAnimationFrame(() => {
				const found = [...items].find((li) => this.selected.some((selected) => li.dataset.id === selected.id));
				if (found) found.parentElement.scrollIntoView({
					behavior: "instant",
					block: "center"
				});
			});
		}
		if (this.sortable) {
			const ul = this.shadowRoot.querySelector("ul");
			ul.addEventListener("sortable-list-order-changed", (e) => {
				this._onItemOrderChanged(e);
			});
			ul.setAttribute("sortable-list", "");
			await waitUntil(() => ul.querySelectorAll("li").length);
			ul.querySelectorAll("li").forEach((li) => {
				li.setAttribute("sortable-dragged-item-container", "");
			});
		}
	}
	render() {
		let roles = this.roles;
		const bluffs = this.showDemonBluffs ? state.getState().currentGame?.demonBluffs?.map((bluff) => bluff.id) ?? [] : [];
		if (this.appendRoles.length) roles = roles.concat(this.appendRoles);
		if (this.filterFn) roles = roles.filter(this.filterFn);
		if (!this.sortable) if (this.sortFn) roles = roles.sort(this.sortFn);
		else roles = roles.sort(SAO);
		if (!this.showMeta) roles = roles.filter((role) => role.id !== "minioninfo" && role.id !== "demoninfo");
		const rolesInPlay = state.getState().currentGame?.players.map((p) => p.suspectedRole?.id) ?? [];
		return b`
      <ul part="roles-list">
        ${when(this.text, () => b` <p class="txt">${this.text}</p> `)}
        ${c(roles, (role) => role.id, (role, i) => {
			const selected = this.selected.some((r) => r.id === role.id);
			const isBluff = this.showDemonBluffs && bluffs.includes(role.id);
			const isAlreadyInPlay = this.showAlreadyInPlayRoles && rolesInPlay.includes(role.id);
			return b`
              <li
                data-id=${i}
                class="${isBluff ? "bluff" : ""} ${isAlreadyInPlay ? "already-in-play" : ""}"
              >
                <div class="item-wrapper">
                  <input
                    ?checked=${selected}
                    @input=${(e) => this.handleSelection(e, role)}
                    visually-hidden
                    id=${i}
                    data-id=${role.id}
                    type="checkbox"
                    ?disabled=${this.disabled}
                  />
                  <label for=${i} class="role ${selected ? "selected" : ""}">
                    ${when(this.sortable, () => b`
                        <div
                          sortable-dragged-item-trigger
                          class="drag-handle ${role.id === "dawn" || role.id === "dusk" || this.sortableDisabled ? "disabled" : ""}"
                        >
                          ${drag}
                        </div>
                      `)}
                    ${when(role.id?.toLowerCase() === "dawn" || role.id?.toLowerCase() === "dusk", () => b`
                        <div class="dawn-dusk">
                          ${role.id?.toLowerCase() === "dawn" ? sun : moon}
                        </div>
                      `, () => b`
                        <img
                          class="${alignment(role.type)}"
                          src="${img(role)}"
                          alt="${role.humanReadableRole}"
                        />
                      `)}
                    <div class="role-txt">
                      ${when(this.includeDescription, () => b`
                          <div class="balgruf ${alignment(role.type)}">
                            ${capitalize(role?.humanReadableRole?.toLowerCase() ?? "")}
                          </div>
                          <div class="description">${role.summary}</div>
                        `, () => b`
                          <div class="balgruf ${alignment(role.type)}">
                            ${capitalize(role?.humanReadableRole?.toLowerCase() ?? "")}
                          </div>
                        `)}
                      ${isAlreadyInPlay ? b`<div class="already-in-play">
                              Already in play
                            </div>` : ""}
                      ${isBluff ? b`<div class="bluff-indicator">Demon bluff</div>` : ""}
                    </div>
                  </label>
                </div>
              </li>
            `;
		})}
      </ul>
    `;
	}
	handleSelection(event, role) {
		if (this.sortable) return;
		if (this.multiple) if (event.target.checked) {
			if (this.selected.length < this.maxSelect) this.selected = [...this.selected, role];
		} else this.selected = this.selected.filter((p) => p.id !== role.id);
		else {
			if (event.target.checked) this.selected = [role];
			else this.selected = [];
			this.shadowRoot.querySelectorAll("input[type=\"checkbox\"]").forEach((input) => {
				if (input.dataset.id !== role.id) input.checked = false;
			});
		}
		this.dispatchEvent(new SelectionChangedEvent(this.selected));
		dialog.setReturnValue(this.selected);
	}
};
var SelectionChangedEvent = class extends Event {
	constructor(selection) {
		super("selection-changed");
		this.selection = selection;
	}
};
customElements.define("botc-select-role", BotcSelectRole);
//#endregion
export { BotcSelectRole as t };
