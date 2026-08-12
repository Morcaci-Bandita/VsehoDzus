import { A as i, I as i$1, P as b, _ as focus, c as bg6, f as border, t as when, u as bg8, v as header, x as main5 } from "./CY602n9t.js";
import { D as tooltip, E as saveScript, F as api, H as get, M as SCRIPTS_DATA, O as transformToSchemaScript, U as set, c as MediaQueryController, m as capitalize, r as state, s as BREAKPOINTS, t as State, u as Service, w as mapBotcScript } from "./CP0hEE1l.js";
import { i as debounceAtTimeout } from "./vIOCOudq.js";
import "./ntwYzdyv.js";
import { D as plus, K as chevronLeft, N as external, R as grim, T as minus, U as kebab, V as copy, h as clear, m as filter, w as download } from "./CEyrKUT7.js";
import { t as remove } from "./dKNDhBkx.js";
import { t as check } from "./BTrKfjJH.js";
import { t as inlay } from "./Ue9OS-EJ.js";
import { t as button } from "./CbFrBy7s.js";
import { t as iconButton } from "./C0jyJKsx.js";
import { n as cross, t as dialog } from "./Dm27KaR0.js";
import { t as error } from "./BnMAryrf.js";
import { t as input } from "./_hTQLwBE.js";
import { t as context } from "./BgH8Gcb8.js";
import { t as buttonLink } from "./6PngWMwE.js";
import "./CXEVaKnf2.js";
import "./B1OborLG.js";
//#region src/pages/scripts.js
const debouncedSetSearch = debounceAtTimeout((value) => {
	filters.setState((s) => ({
		...s,
		search: value,
		page: 1
	}));
}, 500);
async function deleteScript(script) {
	await set("roles", (await get("roles") ?? []).filter((r) => r.script !== script));
	const scripts = await get("scripts") ?? {};
	delete scripts[script];
	await set("scripts", scripts);
	delete SCRIPTS_DATA[script];
	if (script === state.getState().currentGame?.script) state.setState((s) => ({
		...s,
		currentGame: null
	}));
	state.dispatchEvent(new Event("custom-scripts-updated"));
}
const DEFAULT_FILTERS = {
	page: 1,
	includeCustom: false,
	include: [],
	exclude: [],
	type: "regular",
	search: ""
};
const filters = new State({ ...DEFAULT_FILTERS }, "filters");
function filtersToQueryString(filters) {
	const params = new URLSearchParams();
	params.set("search", filters?.search ?? "");
	params.set("script_type", "");
	params.set("edition", "");
	params.set("author", "");
	params.set("page", filters.page);
	if (filters.includeCustom) params.set("include_homebrew", "on");
	if (filters.include?.length) {
		const ids = filters.include.map((r) => r.id).join(",");
		params.set("include", ids);
	} else params.set("include", "");
	if (filters.exclude?.length) {
		const ids = filters.exclude.map((r) => r.id).join(",");
		params.set("exclude", ids);
	} else params.set("exclude", "");
	return `?${params.toString()}`;
}
async function renameScript(oldName, newName) {
	await set("roles", (await get("roles") ?? []).map((r) => {
		if (r.script === oldName) return {
			...r,
			script: newName
		};
		return r;
	}));
	const scripts = await get("scripts") ?? {};
	const script = scripts[oldName];
	delete scripts[oldName];
	delete SCRIPTS_DATA[oldName];
	SCRIPTS_DATA[newName] = () => script;
	scripts[newName] = script;
	await set("scripts", scripts);
	state.dispatchEvent(new Event("custom-scripts-updated"));
}
var BotcScripts = class extends i {
	botcScripts = new Service(this, async () => {
		return api.get(`https://www.botcscripts.com/api/scripts/${filtersToQueryString(filters.getState())}`);
	});
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
		error,
		input,
		inlay,
		iconButton,
		i$1`
      :host {
        display: block;
        padding: 16px;
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

      .search-result {
        font-size: 0.9rem;
      }

      .actions {
        display: flex;
        align-items: center;
      }

      .actions button:not(:last-child) {
        margin-right: 8px;
      }

      button[ui-button][primary] svg {
        fill: ${bg6};
        margin-right: 8px;
      }
      button[ui-button][primary].create {
        display: flex;
        justify-content: center;
        align-items: center;
        /* margin-bottom: 24px; */
      }

      ul.loaded-scripts {
        padding: 0;
        list-style: none;
        margin-top: 0;
        margin-bottom: 0;
      }

      ul.loaded-scripts li:not(:last-child) {
        border-bottom: solid 1px ${border};
      }

      ul.loaded-scripts li {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding-top: 8px;
        padding-bottom: 8px;
      }

      .script-type {
        margin-left: 16px;
        text-align: right;
      }

      .script-info {
        display: flex;
        align-items: center;
        flex: 1;
        margin-right: 8px;
        justify-content: space-between;
      }

      @media (max-width: 840px) {
        .script-info {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
        }

        .script-type {
          text-align: left;
          margin: 0;
          font-size: 0.85rem;
        }
      }

      .tags {
        margin: 0;
        padding: 0;
        list-style: none;
        display: flex;
        flex-wrap: wrap;
      }

      .tags:not(:last-child) {
        margin-bottom: 8px;
      }

      .tag {
        display: flex;
        align-items: center;
        justify-content: center;
        width: fit-content;
        padding: 0px 6px;
        padding-left: 10px;
        flex-grow: 0;
        border-top-left-radius: 16px;
        border-top-right-radius: 16px;
        border-bottom-left-radius: 16px;
        border-bottom-right-radius: 16px;
        background-color: var(--ui-bg-7);
        color: white;
        font-size: 0.85rem;
      }

      .tag:not(:first-child) {
        margin-left: 4px;
      }

      .tag svg {
        fill: none;
        width: 16px;
        height: 16px;
      }

      .tag button {
        display: flex;
        align-items: center;
        justify-content: center;
        margin-left: 4px;
        background: unset;
        color: unset;
        border: unset;
        padding: 0;
        border-radius: 4px;
        transition: all 0.2s ease-in-out;
      }

      .tag button:active {
        transform: scale(0.8);
      }

      .tag.include {
        border: solid 1px rgb(112, 210, 125);
        background: #586f5a;
      }

      .tag.exclude {
        border: solid 1px #d9403b;
        background: #351f1e;
      }

      .tag.include button:active,
      .tag.include button:focus-visible,
      .tag.include button:hover {
        background: #648166;
      }
      .tag.exclude button:active,
      .tag.exclude button:focus-visible,
      .tag.exclude button:hover {
        background: #754745;
      }

      .tag.exclude button:focus-visible,
      .tag.include button:focus-visible {
        ${focus()}
      }

      .interface {
        margin-bottom: 24px;
      }

      .balgruf {
        font-family: "Balgruf";
        font-size: 1.375rem;
        color: ${main5};
        text-shadow: 1px 1px 2px rgba(0, 0, 0, 1);
        margin: 0;
      }

      .search {
        display: flex;
        /* margin-bottom: 24px; */
      }

      .search label {
        flex: 1;
        margin-right: 8px;
      }

      .search button[ui-icon-button] {
        margin-bottom: 13px;
        align-self: flex-end;
      }

      .no-scripts {
        margin-bottom: 24px;
        text-align: center;
      }

      button[aria-label="search"] {
        margin-right: 4px;
      }

      .prev-next {
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin-top: 16px;
      }

      .prev-next button[ui-button][secondary] svg {
        fill: ${main5};
      }
      .prev-next button[ui-button][secondary] {
        display: flex;
        align-items: center;
        justify-content: center;
        width: fit-content;
      }

      .prev-next button[ui-button][secondary].next {
        padding-right: 10px;
        margin-left: auto;
      }
      .prev-next button[ui-button][secondary].prev {
        padding-left: 10px;
      }

      .btns {
        display: flex;
        gap: 12px;
        margin-bottom: 24px;
      }

      .btns button[ui-button][primary],
      .btns button[ui-button][secondary] {
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;
      }
      .btns button[ui-button][primary] svg,
      .btns button[ui-button][secondary] svg {
        width: 50px;
        height: 50px;
        margin-top: 0px;
        margin-bottom: 8px;
      }
    `
	];
	static properties = {
		response: { type: Object },
		mobile: { type: Boolean },
		customScripts: { type: Object },
		loadedScripts: { type: Array }
	};
	constructor() {
		super();
		this.customScripts = {};
		this.loadedScripts = [];
		this.callRequestUpdate = this.callRequestUpdate.bind(this);
	}
	callRequestUpdate() {
		this.botcScripts.request();
		this.requestUpdate();
	}
	async connectedCallback() {
		super.connectedCallback();
		this.botcScripts.request();
		filters.addEventListener("state-changed", this.callRequestUpdate);
		this.customScripts = await get("scripts") ?? {};
		state.addEventListener("custom-scripts-updated", async () => {
			this.customScripts = await get("scripts") ?? {};
			this.requestUpdate();
		});
	}
	disconnectedCallback() {
		super.disconnectedCallback();
		filters.removeEventListener("state-changed", this.callRequestUpdate);
	}
	async search(e) {
		e.preventDefault();
		this.botcScripts.request();
	}
	render() {
		const filterState = filters.getState();
		return b`
      ${when(this.mobile, () => b`<botc-back-button href="/menu"></botc-back-button>`)}
      <h1 header>Scripts</h1>
      <div>
        <div class="btns">
          <button
            ui-button
            primary
            class="create"
            @click=${() => dialog.open({
			id: "flow",
			parameters: { flow: { id: "import-json" } }
		})}
          >
            ${download}
            <span>Import JSON</span>
          </button>
          <button
            class="create"
            ui-button
            secondary
            @click=${() => {
			dialog.open({
				id: "flow",
				parameters: { flow: { id: "create-script" } }
			});
		}}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="24px"
              viewBox="0 -960 960 960"
              width="24px"
              fill="#e3e3e3"
            >
              <path
                d="M440-440v120q0 17 11.5 28.5T480-280q17 0 28.5-11.5T520-320v-120h120q17 0 28.5-11.5T680-480q0-17-11.5-28.5T640-520H520v-120q0-17-11.5-28.5T480-680q-17 0-28.5 11.5T440-640v120H320q-17 0-28.5 11.5T280-480q0 17 11.5 28.5T320-440h120Zm40 360q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-80q134 0 227-93t93-227q0-134-93-227t-227-93q-134 0-227 93t-93 227q0 134 93 227t227 93Zm0-320Z"
              />
            </svg>
            <span>Create script</span>
          </button>
        </div>

        <botc-card label="Scripts">
          <div class="interface">
            <form @submit=${this.search}>
              <div class="search">
                <label ui-label for="scriptname">
                  <input
                    @input=${(e) => {
			debouncedSetSearch(e.target.value);
		}}
                    .value=${filters.getState().search}
                    ui-input
                    type="text"
                    name="scriptname"
                    id="scriptname"
                    placeholder="Script name"
                  />
                  <span>Search</span>
                </label>
                <button
                  ${tooltip("Filters")}
                  type="button"
                  ui-icon-button
                  aria-label="filter"
                  @click=${(e) => {
			e.preventDefault();
		}}
                  ${context(dialog, () => b` <botc-search-filters></botc-search-filters> `)}
                >
                  ${filter}
                </button>
              </div>
            </form>

            ${when(filterState.include.length, () => b`
                <ul class="tags">
                  ${filterState.include?.map((r) => b`
                      <li class="tag include">
                        <span>${r.humanReadableRole}</span
                        ><button
                          @click=${() => {
			filters.setState((s) => ({
				...s,
				page: 1,
				include: s.include.filter((i) => i.id !== r.id)
			}));
		}}
                        >
                          ${cross}
                        </button>
                      </li>
                    `)}
                </ul>
              `)}
            ${when(filterState.exclude.length, () => b`
                <ul class="tags">
                  ${filterState.exclude?.map((r) => b`
                      <li class="tag exclude">
                        <span>${r.humanReadableRole}</span
                        ><button
                          @click=${() => {
			filters.setState((s) => ({
				...s,
				page: 1,
				exclude: s.exclude.filter((i) => i.id !== r.id)
			}));
		}}
                        >
                          ${cross}
                        </button>
                      </li>
                    `)}
                </ul>
              `)}
          </div>
          ${this.botcScripts.render({
			success: (response) => b`
              <ul class="loaded-scripts">
                ${response.results.map((script) => b`
                    <li>
                      <div class="script-info">
                        <div>
                          <span class="balgruf"
                            >${capitalize(script.name)}</span
                          >
                        </div>
                        <div class="script-type">${script.author}</div>
                      </div>
                      <div class="actions">
                        <button
                          ui-icon-button
                          ${context(dialog, () => b`
                              <botc-loaded-script-buttons
                                .script=${script}
                              ></botc-loaded-script-buttons>
                            `)}
                        >
                          ${kebab}
                        </button>
                      </div>
                    </li>
                  `)}
              </ul>
              <div class="prev-next">
                ${when(response.previous, () => b`
                    <button
                      ui-button
                      secondary
                      class="prev"
                      @click=${() => filters.setState((s) => ({
				...s,
				page: s.page - 1
			}))}
                    >
                      ${chevronLeft} Previous
                    </button>
                  `)}
                ${when(response.next, () => b`
                    <button
                      ui-button
                      secondary
                      class="next"
                      @click=${() => filters.setState((s) => ({
				...s,
				page: s.page + 1
			}))}
                    >
                      Next
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        height="24px"
                        viewBox="0 -960 960 960"
                        width="24px"
                        fill="#e3e3e3"
                      >
                        <path
                          d="M504-480 348-636q-11-11-11-28t11-28q11-11 28-11t28 11l184 184q6 6 8.5 13t2.5 15q0 8-2.5 15t-8.5 13L404-268q-11 11-28 11t-28-11q-11-11-11-28t11-28l156-156Z"
                        />
                      </svg>
                    </button>
                  `)}
              </div>
            `,
			error: () => b`<div ui-error>Failed to load scripts.</div>`
		})}
        </botc-card>

        ${when(Object.keys(this.customScripts).length, () => b`
            <botc-card label="Scripts on this device">
              <div ui-inlay class="manage-custom-scripts">
                <ul class="custom-scripts-list">
                  ${Object.keys(this.customScripts).map((script) => b`
                      <li>
                        <span>${capitalize(script)}</span>
                        <div class="actions">
                          <button
                            ui-icon-button
                            ${context(dialog, () => b`
                                <botc-script-buttons-2
                                  .name=${script}
                                  .delete=${() => deleteScript(script)}
                                  .rename=${renameScript}
                                ></botc-script-buttons-2>
                              `)}
                          >
                            ${kebab}
                          </button>
                        </div>
                      </li>
                    `)}
                </ul>
              </div>
            </botc-card>
          `)}
      </div>
    `;
	}
	clear() {
		filters.setState({ ...DEFAULT_FILTERS });
	}
};
async function encode(script) {
	const json = typeof script === "string" ? script : JSON.stringify(script);
	const stream = new Blob([json]).stream().pipeThrough(new CompressionStream("gzip"));
	const bytes = new Uint8Array(await new Response(stream).arrayBuffer());
	let bin = "";
	for (let i = 0; i < bytes.length; i += 32768) bin += String.fromCharCode.apply(null, bytes.subarray(i, i + 32768));
	return encodeURIComponent(btoa(bin));
}
var BotcLoadedScriptButtons = class extends i {
	static properties = {
		script: { type: Object },
		scriptToolUrl: { type: String }
	};
	static styles = [
		button,
		buttonLink,
		i$1`
      .custom-scripts a[ui-button-link] {
        text-align: center;
      }

      .custom-scripts a[ui-button-link],
      .custom-scripts button[ui-button] {
        display: flex;
        justify-content: center;
        align-items: center;
      }

      .custom-scripts a[ui-button-link] svg,
      .custom-scripts button[ui-button] svg {
        fill: var(--ui-main-5);
      }

      .custom-scripts a[ui-button-link] span,
      .custom-scripts button[ui-button] span {
        flex: 1;
        margin-left: -24px;
      }
    `
	];
	async openDialog(id, parameters) {
		dialog.close();
		await dialog.closed;
		await new Promise((r) => requestAnimationFrame(r));
		dialog.open({
			id,
			parameters
		});
	}
	async connectedCallback() {
		super.connectedCallback();
		encode(this.script.content).then((encoded) => {
			this.scriptToolUrl = `https://script.bloodontheclocktower.com?script=${encoded}`;
		});
	}
	render() {
		const script = mapBotcScript(this.script);
		const name = this.script?.content?.[0]?.name || this.script?.name || "Untitled Script";
		return b`
      <div class="custom-scripts">
        <a
          ui-button-link
          secondary
          target="_blank"
          href="${this.scriptToolUrl}"
          @click=${() => dialog.close()}
        >
          ${external} <span>Open in Script Tool</span>
        </a>
        <button
          ui-button
          secondary
          @click=${() => this.openDialog("viewCustomScript", {
			script,
			name
		})}
        >
          ${grim} <span>Quick view script</span>
        </button>

        <a
          ui-button-link
          secondary
          href="/almanac/${this.script.pk}"
          @click=${() => dialog.close()}
        >
          ${grim} <span>Almanac</span>
        </a>
        <button ui-button secondary @click=${this.copy}>
          ${copy} <span>Copy JSON</span>
        </button>
        <button
          ui-button
          secondary
          @click=${async () => {
			try {
				await saveScript(name, script);
				this.openDialog("inline", {
					header: "Script saved",
					render: () => b`Script downloaded successfully, you can find it in
                  "Scripts on this device".`
				});
			} catch (e) {
				this.openDialog("inline", {
					header: "Error",
					render: () => b`Something went wrong trying to download the script.
                  Please try again later.`
				});
			}
		}}
        >
          ${download} <span>Download</span>
        </button>
      </div>
    `;
	}
	async copy() {
		const script = this.script?.content ?? this.script;
		if (!script) {
			this.openDialog("inline", {
				header: "Error",
				render: () => b`Failed to copy script.`
			});
			return;
		}
		navigator.clipboard.writeText(JSON.stringify(script, null, 2)).then(() => {
			this.openDialog("inline", {
				header: "Script copied",
				render: () => b`
            <p ui-success>${check} Script JSON copied to clipboard.</p>
            <div ui-inlay>
              <code>
                <pre style="overflow:auto;">
${JSON.stringify(script, null, 2).trim()}</pre>
              </code>
            </div>
          `
			});
		}).catch(() => {
			this.openDialog("inline", {
				header: "Error",
				render: () => b`Failed to copy script JSON. Please try again later.`
			});
		});
	}
};
customElements.define("botc-loaded-script-buttons", BotcLoadedScriptButtons);
var BotcScriptButtons2 = class extends i {
	static properties = {
		name: { type: String },
		scriptToolUrl: { type: String }
	};
	connectedCallback() {
		super.connectedCallback();
		SCRIPTS_DATA[this.name]().then((script) => {
			encode(transformToSchemaScript({
				script,
				name: this.name
			})).then((encoded) => {
				this.scriptToolUrl = `https://script.bloodontheclocktower.com?script=${encoded}`;
			});
		});
	}
	static styles = [
		button,
		buttonLink,
		i$1`
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

      .custom-scripts a[ui-button-link] {
        text-align: center;
      }

      .custom-scripts a[ui-button-link],
      .custom-scripts button[ui-button] {
        display: flex;
        justify-content: center;
        align-items: center;
      }

      .custom-scripts a[ui-button-link] svg,
      .custom-scripts button[ui-button] svg {
        fill: var(--ui-main-5);
      }

      .custom-scripts a[ui-button-link] span,
      .custom-scripts button[ui-button] span {
        flex: 1;
        margin-left: -24px;
      }
    `
	];
	async openDialog(id, parameters) {
		dialog.close();
		await dialog.closed;
		await new Promise((r) => requestAnimationFrame(r));
		dialog.open({
			id,
			parameters
		});
	}
	render() {
		return b`
      <div class="custom-scripts">
        <a
          ui-button-link
          secondary
          target="_blank"
          href="${this.scriptToolUrl}"
          @click=${() => dialog.close()}
        >
          ${external} <span>Open in Script Tool</span>
        </a>
        <button
          ui-button
          secondary
          @click=${() => this.openDialog("viewCustomScript", { name: this.name })}
        >
          ${grim} <span>Quick view script</span>
        </button>
        <a
          ui-button-link
          secondary
          href="/almanac?name=${encodeURIComponent(this.name)}"
          @click=${() => dialog.close()}
        >
          ${grim} <span>Almanac</span>
        </a>
        <button ui-button secondary @click=${this.copy}>
          ${copy} <span>Copy JSON</span>
        </button>
        <button
          @click=${() => this.openDialog("deleteCustomScript", {
			name: this.name,
			delete: this.delete
		})}
          ui-button
          secondary
        >
          ${remove} <span>Delete script</span>
        </button>
      </div>
    `;
	}
	async copy() {
		const script = await SCRIPTS_DATA[this.name]();
		if (!script) {
			this.openDialog("inline", {
				header: "Error",
				render: () => b`Script not found.`
			});
			return;
		}
		const transformedScript = transformToSchemaScript({
			script,
			name: this.name
		});
		navigator.clipboard.writeText(JSON.stringify(transformedScript, null, 2)).then(() => {
			this.openDialog("inline", {
				header: "Script copied",
				render: () => b`
            <p ui-success>${check} Script JSON copied to clipboard.</p>
            <div ui-inlay>
              <code>
                <pre style="overflow:auto;">
${JSON.stringify(transformedScript, null, 2).trim()}</pre>
              </code>
            </div>
          `
			});
		}).catch(() => {
			this.openDialog("inline", {
				header: "Error",
				render: () => b`Failed to copy script JSON. Please try again later.`
			});
		});
	}
};
customElements.define("botc-script-buttons-2", BotcScriptButtons2);
var BotcSearchFilters = class extends i {
	static properties = {};
	static styles = [
		button,
		buttonLink,
		i$1`
      button[ui-button] {
        display: flex;
        align-items: center;
      }

      button[ui-button] span:nth-of-type(2) {
        flex: 1;
        margin-left: -24px;
      }

      button[ui-button] span:nth-of-type(1) {
        display: flex;
        justify-content: center;
        align-items: center;
      }

      svg {
        fill: ${main5};
      }

      button[ui-button][primary] svg {
        fill: ${bg8};
      }
    `
	];
	constructor() {
		super();
		this.callRequestUpdate = this.callRequestUpdate.bind(this);
	}
	connectedCallback() {
		super.connectedCallback();
		filters.addEventListener("state-changed", this.callRequestUpdate);
	}
	disconnectedCallback() {
		filters.removeEventListener("state-changed", this.callRequestUpdate);
	}
	callRequestUpdate() {
		console.log("filters state changed", filters.getState());
		this.requestUpdate();
	}
	async openDialog(id, parameters) {
		dialog.close();
		await dialog.closed;
		await new Promise((r) => requestAnimationFrame(r));
		return dialog.open({
			id,
			parameters
		});
	}
	render() {
		return b`
      <div class="custom-scripts">
        <button
          ui-button
          secondary
          @click=${() => {
			this.openDialog("roleSelect", {
				allScriptRoles: true,
				multiple: true,
				sortFn: (a, b) => a.humanReadableRole.localeCompare(b.humanReadableRole),
				selected: filters.getState().include,
				script: "All"
			}).then((roles) => {
				filters.setState((s) => ({
					...s,
					page: 1,
					include: roles.map((r) => ({
						id: r.id,
						humanReadableRole: r.humanReadableRole
					}))
				}));
			});
		}}
        >
          <span>${plus}</span> <span>Include roles</span>
        </button>
        <button
          @click=${() => {
			this.openDialog("roleSelect", {
				allScriptRoles: true,
				multiple: true,
				sortFn: (a, b) => a.humanReadableRole.localeCompare(b.humanReadableRole),
				selected: filters.getState().exclude,
				script: "All"
			}).then((roles) => {
				filters.setState((s) => ({
					...s,
					page: 1,
					exclude: roles.map((r) => ({
						id: r.id,
						humanReadableRole: r.humanReadableRole
					}))
				}));
			});
		}}
          ui-button
          secondary
        >
          <span>${minus}</span> <span>Exclude roles</span>
        </button>
        <botc-switch
          ?checked=${filters.getState().includeCustom}
          @checked-changed=${(e) => {
			filters.setState((s) => ({
				...s,
				page: 1,
				includeCustom: e.target.checked
			}));
		}}
          >Include custom</botc-switch
        >
        <button
          @click=${() => {
			filters.setState({ ...DEFAULT_FILTERS });
			dialog.close();
		}}
          ui-button
          secondary
        >
          <span>${clear}</span> <span>Clear filters</span>
        </button>
      </div>
    `;
	}
};
customElements.define("botc-search-filters", BotcSearchFilters);
customElements.define("botc-scripts", BotcScripts);
//#endregion
export { BotcScripts };
