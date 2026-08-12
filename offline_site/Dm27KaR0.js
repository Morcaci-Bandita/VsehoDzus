import { A as i, I as i$1, M as D, P as b, S as neutral, _ as focus, a as bg3, c as bg6, o as bg4, p as borderRadius, t as when, v as header, x as main5 } from "./CY602n9t.js";
import { H as get, c as MediaQueryController, i as stats, m as capitalize, r as state, s as BREAKPOINTS, t as State } from "./CP0hEE1l.js";
import "./D8HaG3T3.js";
import { a as onePaint, n as animationsComplete, r as debounceAtFrame, s as createLogger, t as media } from "./vIOCOudq.js";
import { a as iosShare, i as iosSave, q as chevronDown } from "./CEyrKUT7.js";
import { t as inlay } from "./Ue9OS-EJ.js";
import { t as button } from "./CbFrBy7s.js";
import { t as iconButton } from "./C0jyJKsx.js";
import { t as error } from "./BnMAryrf.js";
import { t as input } from "./_hTQLwBE.js";
import { t as KEYCODES } from "./B6k5sWc7.js";
//#region src/icons/cross.svg.js
const cross$1 = b`
  <svg
    aria-hidden="true"
    xmlns="http://www.w3.org/2000/svg"
    class="icon icon-tabler icon-tabler-x"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    stroke-width="2"
    stroke="currentColor"
    fill="none"
    stroke-linecap="round"
    stroke-linejoin="round"
  >
    <path stroke="none" d="M0 0h24v24H0z" />
    <line stroke="white" x1="18" y1="6" x2="6" y2="18" />
    <line stroke="white" x1="6" y1="6" x2="18" y2="18" />
  </svg>
`;
//#endregion
//#region src/components/dialog/modal-container.js
var ModalContainer = class extends i {
	static properties = {
		header: { type: String },
		state: { type: String },
		importPromise: {},
		button: {}
	};
	constructor() {
		super();
		this.state = "pending";
	}
	static styles = [
		header,
		button,
		iconButton,
		inlay,
		error,
		input,
		i$1`
      :host {
        flex: 1;
        height: 100%;
        width: 100%;
        display: flex;
        flex-direction: column;
        /* overflow: auto; */
      }
      @media (max-width: 840px) {
        * {
          -webkit-tap-highlight-color: transparent;
          -webkit-touch-callout: none;
          touch-action: manipulation;
        }
      }

      button[ui-button] {
        width: calc(100% - 10px);
        align-self: center;
        /* margin-bottom: 20px; */
      }

      header {
        display: flex;
        align-items: center;
      }

      h1 {
        color: ${main5};
        margin: 0;
        margin-right: -40px;
        flex: 1;
        text-align: center;
        font-size: 1.875rem;
      }

      .template {
        flex: 1;
        overflow: auto;
        padding-left: 5px;
        padding-right: 5px;
      }

      .template::-webkit-scrollbar {
        display: none; /* Safari and Chrome */
      }

      [ui-success] {
        display: flex;
        border: solid 2px rgb(112, 210, 125);
        background: #4c564d;
        padding: 7px;
        border-radius: 6px;
      }

      [ui-success] svg {
        margin-right: 4px;
      }
    `
	];
	updated(changedProperties) {
		if (changedProperties.has("importPromise")) this.importPromise.then(() => {
			this.state = "success";
		}).catch((e) => {
			console.log(e);
			this.state = "error";
		});
	}
	render() {
		return b`
      <header>
        ${when(this.header, () => b`<h1 header>${this.header}</h1>`)}
        <button
          @click=${this.dialog.close.bind(this.dialog)}
          ui-icon-button
          value="close"
        >
          ${cross$1}
        </button>
      </header>

      <div class="template">
        ${when(this.state === "pending", () => b`<botc-spinner></botc-spinner>`)}
        ${when(this.state === "success", () => this.template)}
        ${when(this.state === "error", () => b`<div ui-error>Something went wrong.</div>`)}
      </div>

      ${when(this.button, () => this.button)}
      <button
        @click=${this.dialog.close.bind(this.dialog)}
        ui-button
        secondary
        value="close"
      >
        Close
      </button>
    `;
	}
};
customElements.define("modal-container", ModalContainer);
//#endregion
//#region src/components/dialog/modal.js
function modal(config) {
	return { opening: ({ dialog, parameters, id }) => {
		dialog.id = "modal";
		const title = typeof config.title === "function" ? config.title({
			id,
			parameters
		}) : config.title;
		D(b`
          <modal-container
            .dialog=${dialog}
            .template=${config.render({
			id,
			parameters,
			title
		})}
            .importPromise=${config?.import?.() ?? Promise.resolve()}
            .header=${title}
            .button=${config?.button ? config.button({
			id,
			parameters,
			dialog
		}) : void 0}
          >
          </modal-container>
        `, dialog.form);
	} };
}
//#endregion
//#region src/components/context/contextMenu.js
const FOCUSABLE_ELEMENTS = "button:not([disabled]), [href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex=\"-1\"]):not([disabled]), details:not([disabled]), summary:not(:disabled)";
/**
* @param {{
*  orientation?: 'horizontal' | 'vertical'
* }} config
*/
function contextMenu(config = { orientation: "vertical" }) {
	let handleResize;
	let index = 0;
	let target;
	return {
		opening: async ({ dialog, parameters }) => {
			dialog.id = "context";
			D(parameters.template(), dialog.form);
			target = parameters.target.composedPath().find((e) => e.localName === "button") || parameters.target;
			target.setAttribute("aria-expanded", "true");
			if (media.MIN.LG()) {
				const { compute } = await import("./D2DdxhTa.js");
				await compute(target, dialog);
			}
			function onMenuKeyDown(e) {
				let focusableElements;
				const dialogContent = dialog.querySelector("form").firstElementChild;
				focusableElements = (!!dialogContent.shadowRoot ? dialogContent.shadowRoot : dialog).querySelectorAll(FOCUSABLE_ELEMENTS);
				const START = 0;
				const END = focusableElements.length - 1;
				switch (e.keyCode) {
					case KEYCODES.UP:
						index--;
						break;
					case KEYCODES.DOWN:
						index++;
						break;
					case KEYCODES.HOME:
						index = START;
						break;
					case KEYCODES.END:
						index = END;
						break;
				}
				if (!e.shiftKey && e.keyCode === KEYCODES.TAB) {
					index++;
					e.preventDefault();
				}
				if (e.shiftKey && e.keyCode === KEYCODES.TAB) {
					index--;
					e.preventDefault();
				}
				if (index < START) index = END;
				if (index > END) index = START;
				focusableElements[index].focus();
			}
			handleResize = debounceAtFrame(async () => {
				if (media.MIN.LG()) {
					const { compute } = await import("./D2DdxhTa.js");
					await compute(target, dialog);
				} else Object.assign(dialog.style, {
					marginBottom: "0px",
					marginLeft: "0px",
					marginRight: "0px",
					marginTop: "revert"
				});
			});
			dialog.addEventListener("keydown", onMenuKeyDown);
			window.addEventListener("resize", handleResize);
		},
		closing: () => {
			target.setAttribute("aria-expanded", "false");
			index = 0;
			window.removeEventListener("resize", handleResize);
		}
	};
}
//#endregion
//#region node_modules/@thepassle/app-tools/utils/CONSTANTS.js
const APP_TOOLS = "app-tools";
//#endregion
//#region src/dialog-class.js
const log = createLogger("dialog");
const DIALOG_STYLES_ID = "dialog-styles";
var DialogStateEvent = class extends Event {
	/**
	* @param {'opening' | 'opened' | 'closing' | 'closed'} kind
	* @param {import('./types.js').Context} context
	*/
	constructor(kind, context) {
		super(kind);
		this.context = context;
	}
};
function setupGlobalDialogStyles() {
	let el = document.head.querySelector(`style[${APP_TOOLS}][version="1.x"]#${DIALOG_STYLES_ID}`);
	if (!el) {
		el = document.createElement("style");
		el.setAttribute(APP_TOOLS, "");
		el.setAttribute("version", "1.x");
		el.id = DIALOG_STYLES_ID;
		el.innerHTML = `
      html:has(dialog[${APP_TOOLS}][version="1.x"][open]) {
        overflow: hidden;
      }

      dialog[${APP_TOOLS}][version="1.x"]:modal {
        max-width: 100%;
        max-height: 100%;
      }

      dialog[${APP_TOOLS}][version="1.x"] {
        pointer-events: none;
        inset: 0;
        position: fixed;
        display: block;

        padding: 0;
        width: 200px;
        height: 200px;
      }

      dialog[${APP_TOOLS}][version="1.x"] > form[${APP_TOOLS}][version="1.x"] {
        width: calc(100% - 10px);
        height: calc(100% - 10px);
        margin: 0;
        padding: 5px;
      }

      dialog[${APP_TOOLS}][version="1.x"][open] {
        pointer-events: auto;
      }

      @media (max-width: 840px) {
        /* Drag handle styles for bottomsheet dialogs */
        dialog[${APP_TOOLS}][version="1.x"]#context::before {
          content: '';
          position: absolute;
          top: 8px;
          left: 50%;
          transform: translateX(-50%);
          width: 36px;
          height: 4px;
          background: var(--ui-bg-3);
          border-radius: 2px;
          z-index: 1;
        }
  
        /* Ensure drag handle is visible */
        dialog[${APP_TOOLS}][version="1.x"]#context > form {
          padding-top: 20px;
        }
      }
    `;
		document.head.prepend(el);
	}
}
/**
* @typedef {import('./types.js').DialogNode} DialogNode
* @typedef {import('./types.js').DialogCallbacks} DialogCallbacks
* @typedef {import('./types.js').Config} Config
* @typedef {import('./types.js').OpenDialogOptions} OpenDialogOptions
* @typedef {import('./types.js').Context} Context
*/
setupGlobalDialogStyles();
var Dialog = class extends EventTarget {
	#id = "";
	/** @type {Config} */
	#config = {};
	isOpen = false;
	opened = new Promise((resolve) => {
		this.__resolveOpened = resolve;
	});
	closed = new Promise((resolve) => {
		this.__resolveClosed = resolve;
	});
	/** @type {Context} */
	context = {
		dialog: void 0,
		id: "",
		parameters: {}
	};
	#isDragging = false;
	#startY = 0;
	#currentY = 0;
	#initialTransform = 0;
	#dragThreshold = 100;
	#velocityThreshold = .5;
	/**
	*
	* @param {Config} config
	*/
	constructor(config) {
		super();
		this.#config = config;
	}
	/**
	* @returns {DialogNode}
	*/
	__initDialogNode() {
		const dialogNode = document.createElement("dialog");
		dialogNode.setAttribute(APP_TOOLS, "");
		dialogNode.setAttribute("version", "1.x");
		dialogNode.addEventListener("close", this.__onDialogClose);
		dialogNode.addEventListener("mousedown", this.__onLightDismiss);
		dialogNode.addEventListener("touchstart", this.__onTouchStart, { passive: false });
		dialogNode.addEventListener("touchmove", this.__onTouchMove, { passive: false });
		dialogNode.addEventListener("touchend", this.__onTouchEnd, { passive: false });
		const form = document.createElement("form");
		form.setAttribute(APP_TOOLS, "");
		form.setAttribute("version", "1.x");
		form.setAttribute("method", "dialog");
		dialogNode.form = form;
		dialogNode.appendChild(form);
		return dialogNode;
	}
	__onTouchStart = (e) => {
		if (this.#id !== "context") return;
		if (e.composedPath().some((e) => e.localName === "input" && e.type === "range")) return;
		const touch = e.touches[0];
		this.#isDragging = true;
		this.#startY = touch.clientY;
		this.#currentY = touch.clientY;
		this.#initialTransform = 0;
		this.__dialog.style.transition = "none";
	};
	__onTouchMove = (e) => {
		if (!this.#isDragging || this.#id !== "context") return;
		const touch = e.touches[0];
		const deltaY = touch.clientY - this.#startY;
		if (deltaY > 0) {
			e.preventDefault();
			this.#currentY = touch.clientY;
			const resistance = deltaY * .8;
			const newTransform = this.#initialTransform + resistance;
			this.__dialog.style.transform = `translateY(${newTransform}px)`;
			const backdrop = this.__dialog;
			const opacityThreshold = this.#dragThreshold * 4;
			const progress = Math.min(deltaY / opacityThreshold, 1);
			backdrop.style.setProperty("--backdrop-opacity", `${.8 * (1 - progress)}`);
		}
	};
	__onTouchEnd = (e) => {
		if (!this.#isDragging || this.#id !== "context") return;
		this.#isDragging = false;
		const deltaY = this.#currentY - this.#startY;
		const touchDuration = e.timeStamp - (e.timeStamp - 100);
		const velocity = Math.abs(deltaY) / Math.max(touchDuration, 1);
		this.__dialog.style.transition = "transform 0.03s ease-out";
		if ((deltaY > this.#dragThreshold || velocity > this.#velocityThreshold) && deltaY > 0) {
			this.__dialog.style.transition = "transform 0.03s ease-in";
			this.__dialog.style.transform = "translateY(100%)";
			setTimeout(() => {
				this.__dialog.style.display = "none";
				this.__dialog.close("swipe");
			}, 150);
		} else {
			this.__dialog.style.transform = `translateY(${this.#initialTransform}px)`;
			this.__dialog.style.removeProperty("--backdrop-opacity");
		}
	};
	__onLightDismiss = ({ target }) => {
		if (target.nodeName === "DIALOG") this.close("dismiss");
	};
	close = async (kind = "programmatic") => {
		this.__dialog?.close(kind);
		if (kind === "programmatic") {
			await this.closed;
			setTimeout(() => {
				this.__resolveReturnValue(this.__returnValue);
			});
		}
	};
	__onDialogClose = async () => {
		const id = this.#id;
		const d = this.__dialog;
		log(`Closing dialog "${id}"`, this.context);
		if (d) {
			d.style.transition = "";
			d.style.transform = "";
			d.style.removeProperty("--backdrop-opacity");
		}
		const wasSwipeClose = d?.returnValue === "swipe";
		if (!wasSwipeClose) {
			d.removeAttribute("opened");
			d.setAttribute("closing", "");
			this.dispatchEvent(new DialogStateEvent("closing", this.context));
			try {
				await this.#config[id]?.closing?.(this.context);
			} catch (e) {
				log(`Dialog "${id}" error on closing hook`);
				throw e;
			}
			await animationsComplete(d);
		}
		this.isOpen = false;
		if (!wasSwipeClose) {
			d.removeAttribute("closing");
			d.setAttribute("closed", "");
		}
		this.__resolveClosed(this.context);
		this.dispatchEvent(new DialogStateEvent("closed", this.context));
		try {
			await this.#config[id]?.closed?.(this.context);
		} catch (e) {
			log(`Dialog "${id}" error on closed hook`);
			throw e;
		}
		log(`Closed dialog "${id}"`, this.context);
		d?.remove();
		this.context = {
			dialog: void 0,
			id: "",
			parameters: {}
		};
		this.__dialog = void 0;
		this.opened = new Promise((resolve) => {
			this.__resolveOpened = resolve;
		});
		this.#id = "";
	};
	/**
	* @param {OpenDialogOptions} options
	* @returns
	*/
	async open({ id, parameters }) {
		if (!(id in this.#config)) throw new Error(`No dialog configured for id: ${id}`);
		this.setReturnValue(null);
		this.#id = id;
		if (this.isOpen) {
			log(`Tried to open dialog "${id}" while it was already open.`, {
				id,
				parameters,
				dialog: this.__dialog
			});
			return;
		}
		this.__dialog = this.__initDialogNode();
		this.context = {
			dialog: this.__dialog,
			id,
			parameters
		};
		document.body.appendChild(this.__dialog);
		log(`Openening dialog "${id}"`, this.context);
		this.__dialog.setAttribute("opening", "");
		this.dispatchEvent(new DialogStateEvent("opening", this.context));
		try {
			await this.#config?.[id]?.opening?.(this.context);
		} catch (e) {
			log(`Dialog "${this.#id}" error on opening hook`);
			throw e;
		}
		await onePaint();
		this.__dialog.showModal();
		await animationsComplete(this.__dialog);
		this.isOpen = true;
		this.__dialog.removeAttribute("opening");
		this.__dialog.setAttribute("opened", "");
		this.__resolveOpened(this.context);
		this.dispatchEvent(new DialogStateEvent("opened", this.context));
		try {
			await this.#config?.[id]?.opened?.(this.context);
		} catch (e) {
			log(`Dialog "${this.#id}" error on opened hook`);
			throw e;
		}
		log(`Opened dialog "${id}"`, this.context);
		this.closed = new Promise((resolve) => {
			this.__resolveClosed = resolve;
		});
		return new Promise((resolve) => {
			this.__resolveReturnValue = resolve;
		});
	}
	setReturnValue = (returnValue) => {
		this.__returnValue = returnValue;
	};
	/**
	* Can be used to modify the dialog
	*
	* @example
	* dialog.modify(node => {node.classList.add('foo')});
	* @param {(dialog: DialogNode | undefined) => void} cb
	*/
	modify(cb) {
		cb(this.__dialog);
	}
};
//#endregion
//#region src/flow/botc-flow-disclosure.js
var OpenedChangedEvent = class extends Event {
	constructor(detail) {
		super("opened-changed");
		this.detail = detail;
	}
};
var BotcFlowDisclosure = class extends i {
	static properties = { expanded: {
		type: Boolean,
		reflect: true
	} };
	constructor() {
		super();
		this.expanded = false;
	}
	static styles = i$1`
    @media (max-width: 840px) {
      * {
        -webkit-tap-highlight-color: transparent;
        -webkit-touch-callout: none;
        touch-action: manipulation;
      }
    }

    :host {
      display: block;
      width: calc(100% - 16px);
      height: auto;
      background-color: ${bg6};
      margin: 8px;
    }

    :host([expanded]) {
      border-bottom: none;
    }

    :host slot[name="detail"] {
      display: none;
    }
    :host([expanded]) slot[name="detail"] {
      display: block;
    }

    button {
      text-align: left;
      width: 100%;
      border: none;
      margin: 0;
      overflow: visible;
      background: transparent;
      font-size: 0.9rem;
      color: ${neutral};

      font-weight: 700;
      padding: 12px 16px;
      display: flex;
      align-items: center;
      font-family: "Poppins", sans-serif;
      border-radius: ${borderRadius};
    }

    button svg {
      transform: rotate(180deg);
      transition: all 0.2s ease-in-out;
    }

    :host([expanded]) svg {
      transition: all 0.2s ease-in-out;
      transform: rotate(0deg);
      color: ${main5};
    }

    :host([expanded]) div {
      color: ${neutral};
    }

    /* button:hover, */
    button:focus-visible {
      background: ${bg4};
    }

    button:active {
      background: ${bg3};
    }

    button:focus-visible {
      ${focus()}
    }

    :host(:last-of-type) {
      border-bottom: none;
    }

    div[part="label"] {
      flex: 1;
      margin-left: 24px;
    }
  `;
	connectedCallback() {
		super.connectedCallback();
		if (this.hasAttribute("expanded")) this.__open(false);
	}
	handleClick() {
		if (this.expanded) {
			this.expanded = false;
			this.__close();
		} else {
			this.expanded = true;
			this.__open(true);
		}
	}
	__open(dispatch) {
		if (dispatch) this.dispatchEvent(new OpenedChangedEvent(true));
	}
	__close() {
		this.dispatchEvent(new OpenedChangedEvent(false));
	}
	render() {
		return b`
      <button
        part="button"
        @click=${this.handleClick}
        aria-expanded=${this.expanded}
      >
        <div part="label"><slot name="label"></slot></div>
        ${chevronDown}
      </button>
      <slot name="detail"></slot>
    `;
	}
};
customElements.define("botc-flow-disclosure", BotcFlowDisclosure);
//#endregion
//#region src/flow/flows.js
const FLOWS = {
	"create-game": () => import("./Ds9AmuUH2.js").then((m) => m.default),
	"create-role": () => import("./DeJGTl5e2.js").then((m) => m.default),
	"create-script": () => import("./BAtOVQ9T2.js").then((m) => m.default),
	"end-game": () => import("./Cl8NIip-.js").then((m) => m.default),
	"import-json": () => import("./psIrScvf.js").then((m) => m.default),
	nomination: () => import("./DKEg1jTn.js").then((m) => m.default),
	"quick-add": () => import("./BHKchjfi.js").then((m) => m.default)
};
//#endregion
//#region src/flow/botc-flow.js
const OLD_FLOW_HISTORY = await get("FLOW_HISTORY");
/**
* @template T
* @type {State<{
*  [key: string]: {
*    timestamp: number,
*    stepIndex: number,
*    state: T
*  }
* }>}
*/
const FLOW_HISTORY = OLD_FLOW_HISTORY ? new State(OLD_FLOW_HISTORY, "FLOW_HISTORY") : new State({}, "FLOW_HISTORY");
const cross = b`<svg
  xmlns="http://www.w3.org/2000/svg"
  height="24px"
  viewBox="0 -960 960 960"
  width="24px"
  fill="#e3e3e3"
>
  <path
    d="M480-424 284-228q-11 11-28 11t-28-11q-11-11-11-28t11-28l196-196-196-196q-11-11-11-28t11-28q11-11 28-11t28 11l196 196 196-196q11-11 28-11t28 11q11 11 11 28t-11 28L536-480l196 196q11 11 11 28t-11 28q-11 11-28 11t-28-11L480-424Z"
  />
</svg>`;
/**
*
* Intended usage:
* ```js
* dialog.open({ id: "flow", parameters: { flow: fooFlow({foo: "bar"}) }});
* ```
*/
globalThis.FLOW_HISTORY = FLOW_HISTORY;
var BotcFlow = class extends i {
	media = new MediaQueryController(this, [BREAKPOINTS.LG.MIN], ({ media, matches }) => {
		switch (media) {
			case BREAKPOINTS.LG.MIN:
				this.mobile = !matches;
				break;
		}
	});
	static properties = {
		mobile: { type: Boolean },
		flow: { type: Object },
		stepIndex: { type: Number },
		currentStep: { type: Object },
		importState: { type: String },
		flowImportState: { type: String }
	};
	constructor() {
		super();
		this.flow = {};
		this.stepIndex = 0;
		this.currentStep = {};
		this.importState = "pending";
		this.flowImportState = "pending";
		this.__currentFlowHistoryKey = null;
	}
	/**
	* Resolves the flow history key based on the saveAndResume configuration.
	*
	* saveAndResume can be:
	* - false: no caching
	* - true: use the flow id as the key
	* - { key: (state) => string }: use a function to generate the key from state
	*
	* @param {Object} state - The current flow state (optional, will use current state if not provided)
	* @returns {string|null} The resolved key or null if saveAndResume is disabled
	*/
	__getFlowHistoryKey(state = null) {
		const { saveAndResume } = this.flow;
		if (!saveAndResume) return null;
		if (typeof saveAndResume === "object" && typeof saveAndResume.key === "function") {
			const currentState = state ?? this.flow.state?.getState() ?? this.__originalFlow;
			const dynamicKey = saveAndResume.key(currentState);
			return `${this.__originalFlow.id}:${dynamicKey}`;
		}
		return this.__originalFlow.id;
	}
	/**
	* Check if saveAndResume is enabled (either true or an object with key function)
	*/
	__isSaveAndResumeEnabled() {
		const { saveAndResume } = this.flow;
		return saveAndResume === true || typeof saveAndResume === "object" && typeof saveAndResume.key === "function";
	}
	__updateFlowHistory() {
		if (!this.__isSaveAndResumeEnabled()) return;
		const key = this.__getFlowHistoryKey();
		if (!key) return;
		if (this.__currentFlowHistoryKey && this.__currentFlowHistoryKey !== key) FLOW_HISTORY.setState((s) => {
			const newState = { ...s };
			delete newState[this.__currentFlowHistoryKey];
			return newState;
		});
		this.__currentFlowHistoryKey = key;
		FLOW_HISTORY.setState((s) => ({
			...s,
			[key]: {
				timestamp: Date.now(),
				state: this.flow.state.getState(),
				stepIndex: this.stepIndex
			}
		}));
	}
	__clearFlowHistory() {
		const key = this.__currentFlowHistoryKey ?? this.__getFlowHistoryKey();
		if (!key) return;
		FLOW_HISTORY.setState((s) => {
			const newState = { ...s };
			delete newState[key];
			return newState;
		});
	}
	async connectedCallback() {
		super.connectedCallback();
		this.__originalFlow = structuredClone(this.flow);
		await this.initFlow();
	}
	async initFlow() {
		const flowId = this.flow.id;
		this.flow = await FLOWS[flowId]();
		this.flow = this.flow(this.__originalFlow);
		this.flowImportState = "success";
		this.flow.state = new State(this.flow.initialState, flowId, false);
		let restore = false;
		let restoreState, restoreStepIndex;
		if (this.__isSaveAndResumeEnabled()) {
			const key = this.__getFlowHistoryKey(this.flow.initialState);
			if (key) {
				const history = FLOW_HISTORY.getState();
				const entry = history[key];
				if (entry && Date.now() - entry.timestamp < 300 * 1e3) {
					restore = true;
					restoreState = entry.state;
					restoreStepIndex = Math.max(0, typeof entry.stepIndex === "number" ? entry.stepIndex - 1 : 0);
					this.__currentFlowHistoryKey = key;
				} else if (entry) {
					const newHistory = { ...history };
					delete newHistory[key];
					FLOW_HISTORY.setState(newHistory);
				}
			}
		}
		if (restore && restoreState) {
			this.flow.state.setState(restoreState);
			this.stepIndex = restoreStepIndex;
		} else {
			this.stepIndex = -1;
			if (this.flow.initialStep) {
				const initialStepIndex = this.flow.steps.findIndex((s) => s.id === this.flow.initialStep);
				if (initialStepIndex !== -1) this.stepIndex = initialStepIndex - 1;
				else console.warn(`[botc-flow] initialStep "${this.flow.initialStep}" not found, starting from beginning.`);
			}
		}
		this.flow.state.addEventListener("state-changed", () => {
			this.__updateFlowHistory();
		});
		this.flow.state.addEventListener("botc-flow-update-steps", () => {
			this.requestUpdate();
		});
		this.flow.state.addEventListener("botc-flow-next", () => {
			do {
				this.stepIndex++;
				this.currentStep = this.flow.steps[this.stepIndex];
			} while (this.currentStep?.condition && !this.currentStep.condition(this.flow.state.getState()));
			if (this.currentStep) {
				this.renderedStep = this.renderStep(this.currentStep);
				this.requestUpdate();
			} else console.warn("No more valid steps to render.");
			this.__updateFlowHistory();
		});
		this.flow.state.addEventListener("botc-flow-finalize", () => {
			this.__clearFlowHistory();
		});
		this.flow.state.addEventListener("botc-flow-close", () => {
			dialog.close();
		});
		do {
			this.stepIndex++;
			this.currentStep = this.flow.steps[this.stepIndex];
		} while (this.currentStep?.condition && !this.currentStep.condition(this.flow.state.getState()));
		if (this.currentStep) {
			this.renderedStep = this.renderStep(this.currentStep);
			this.requestUpdate();
		} else console.warn("No more valid steps to render.");
		this.currentStep = this.flow.steps[this.stepIndex];
		this.renderStep(this.currentStep);
	}
	static styles = [
		button,
		iconButton,
		error,
		i$1`
      :host {
        flex: 1;
        width: 100%;
        display: flex;
        flex-direction: column;
        padding-bottom: env(safe-area-inset-bottom);
      }

      a {
        color: var(--ui-main-5);
      }

      .content {
        flex: 1;
        display: flex;
        flex-direction: column;
      }

      #progress ul {
        margin-top: 0;
        margin-bottom: 22px;
      }

      .progress-bar {
        display: flex;
        justify-content: center;
        gap: 6px;
        margin: 0;
        margin-bottom: 4px;
        padding: 0 16px;
      }

      .progress-bar-item {
        flex: 1;
        height: 4px;
        border-radius: 3px;
        background: ${bg3};
        transition: background 0.3s;
      }

      .progress-bar-item.active {
        background: ${main5};
      }

      .navigation {
        display: flex;
        justify-content: space-between;
        padding: 0 16px;
      }

      .navigation button[ui-button][secondary] {
        box-shadow: unset;
        border: unset;
        justify-content: center;
        align-items: center;
        display: flex;
        font-weight: 300;
        color: white;
        fill: white;
        width: unset;
        font-family: "Poppins", sans-serif;
        padding: 8px;
        margin-top: 6px;
      }

      .navigation button[ui-button][secondary] svg {
        fill: white;
      }

      .navigation button[ui-button][secondary] > *:first-child {
        /* Your styles here */
        margin-right: 6px;
      }

      .navigation button[ui-button][secondary]:hover {
        box-shadow: unset;
        border: unset;
      }

      .navigation button svg {
        /* width: 20px;
        height: 20px; */
        /* fill: ${main5}; */
        /* margin-right: 6px; */
      }

      .btn-wrapper {
        display: flex;
        align-items: center;
        justify-content: center;
      }

      .navigation button:only-child {
        margin-left: auto;
      }

      .content {
        padding: 16px;
        overflow: auto;
      }

      .next {
        padding: 4px 16px;
      }

      .top {
        /* background: var(--ui-bg-5); */
      }

      .title {
        font-family: "Balgruf";
        font-size: 2rem;
        color: var(--ui-main-5);
        text-shadow: 1px 1px 2px rgba(0, 0, 0, 1);
        text-align: center;
        line-height: 0.9;

        margin-top: 0px;
        margin-bottom: 16px;
      }

      .intro-title {
        font-family: "Balgruf";
        font-size: 2.5rem;
        color: var(--ui-main-5);
        text-shadow: 1px 1px 2px rgba(0, 0, 0, 1);
        margin: 0;
        text-align: center;
        font-size: 5rem;
        line-height: 0.9;
      }

      .title-wrapper {
        display: flex;
        justify-content: center;
        align-items: center;
        height: 100%;
        margin-top: 60px;
      }

      ul .current {
        color: var(--ui-main-5);
        font-weight: 700;
      }

      ul .less {
        color: white;
      }

      ul {
        list-style: auto;
      }

      ul .more {
        color: var(--ui-bg-2);
      }

      .top h1 {
        font-size: 0.9rem;
        text-align: center;
        font-weight: 700;
        color: white;
        margin-top: 0;
        margin-bottom: 0;
      }

      @media (min-width: 840px) {
        :host {
          flex-direction: row;
          max-width: 1120px;
          margin-left: auto;
          margin-right: auto;
        }

        .top-wrapper {
          background: var(--ui-bg-7);
        }

        .desktop-progress {
          padding: 24px;
          width: 300px;
        }

        .desktop-progress ul {
          padding: 16px;
        }

        .desktop-progress h1 {
          /* margin-top: 10px; */
          font-family: "Balgruf";
          font-size: 2rem;
          color: var(--ui-main-5);
          text-shadow: 1px 1px 2px rgba(0, 0, 0, 1);
          line-height: 0.9;
          text-align: center;
          margin-top: 6px;
          margin-bottom: 16px;
        }

        .progress-bar {
          padding: 0;
        }

        .content {
          padding: 38px;
        }

        :host {
          display: grid;
          grid-template-columns: 348px minmax(0, calc(1120px - 348px));
          margin-inline: auto;
          width: 100%;
          max-width: 1120px;
          position: relative;
          --sidebar-width: 348px;
          --max-width: 1120px;
          --left-bg: var(--ui-bg-7);
          --right-bg: var(--ui-bg-6);
        }

        /* background gutters */
        :host::before,
        :host::after {
          content: "";
          position: fixed;
          top: 0;
          bottom: 0;
          pointer-events: none;
          z-index: 0;
        }

        :host::before {
          left: 0;
          right: 50%;
          background: var(--left-bg);
        }

        :host::after {
          left: 50%;
          right: 0;
          background: var(--right-bg);
        }

        /* stack backgrounds correctly */
        .top-wrapper,
        .content {
          position: relative;
          z-index: 1;
          background: var(--right-bg);
        }

        .top-wrapper {
          background: var(--left-bg);
        }
      }

      .content {
        overflow-y: auto;
        scrollbar-width: none; /* Firefox */
        -ms-overflow-style: none; /* IE 10+ */
      }
      .content::-webkit-scrollbar {
        display: none; /* Chrome, Safari */
      }
    `
	];
	getSteps() {
		return this.flow?.steps?.filter((step) => !step.intro).filter((step) => !step.condition || step.condition(this.flow.state.getState()));
	}
	render() {
		const flowHasIntro = this.flow?.steps?.some((step) => step.intro);
		const visibleStepIndex = this.getSteps()?.findIndex((step) => step === this.flow?.steps?.[this.stepIndex]);
		return b`
      <div class="top-wrapper">
        ${when(!this.mobile && !this.currentStep?.intro, () => b`<div class="desktop-progress">
              <h1>
                ${typeof this.flow.title === "function" ? this.flow.title(this.flow.state.getState()) : this.flow.title}
              </h1>
              ${this.renderProgress()}
              <ul>
                ${this.getSteps()?.map((step, index) => {
			const stepIndex = visibleStepIndex + (flowHasIntro ? -1 : 0);
			return b`
                    <li
                      class="${stepIndex === index ? "current" : ""}${index < stepIndex ? "less" : ""}${index > stepIndex ? "more" : ""}"
                    >
                      ${typeof step.title === "function" ? step.title(this.flow.state.getState()) : step.title}
                    </li>
                  `;
		})}
              </ul>
            </div>`)}
        ${when(!this.currentStep?.intro, () => b`
            <div class="top">
              ${when(this.mobile, () => b`
                  <botc-flow-disclosure id="progress">
                    <div slot="label">
                      <h1>
                        ${typeof this.flow.title === "function" ? this.flow.title(this.flow.state.getState()) : this.flow.title}
                      </h1>
                    </div>
                    <div slot="detail">
                      <ul>
                        ${this.getSteps()?.map((step, index) => {
			const stepIndex = visibleStepIndex + (flowHasIntro ? -1 : 0);
			return b`
                            <li
                              class="${stepIndex === index ? "current" : ""}${index < stepIndex ? "less" : ""}${index > stepIndex ? "more" : ""}"
                            >
                              ${typeof step.title === "function" ? step.title(this.flow.state.getState()) : step.title}
                            </li>
                          `;
		})}
                      </ul>
                    </div>
                  </botc-flow-disclosure>

                  ${when(this.mobile, () => this.renderProgress())}
                `)}
            </div>
          `)}
        ${when(this.mobile, () => this.renderButtons())}
      </div>
      <div class="content">
        ${when(this.flowImportState === "pending", () => b` ${this.renderButtons()}
              <botc-spinner></botc-spinner>`, () => b`
            ${when(this.flowImportState === "error", () => b` ${this.renderButtons()}
                  <div ui-error>
                    Failed to load flow. Please report this issue on the
                    <a href="https://discord.gg/aKNjG98w9S">Discord</a>.
                  </div>`, () => b`
                ${when(this.currentStep.title && !this.currentStep?.intro, () => b`
                    ${when(!this.mobile, () => b` ${this.renderButtons()} `)}
                    <h2 class="title">
                      ${typeof this.currentStep.title === "function" ? this.currentStep.title(this.flow.state.getState()) : this.currentStep.title}
                    </h2>
                  `)}
                ${when(this.importState === "pending", () => b`<botc-spinner></botc-spinner>`)}
                ${when(this.importState === "success", () => this.renderedStep)}
                ${when(this.importState === "error", () => b`<div ui-error>Failed to load step.</div>`)}
              `)}
          `)}
      </div>
    `;
	}
	renderProgress() {
		const flowHasIntro = this.flow?.steps?.some((step) => step.intro);
		const steps = this.getSteps();
		const visibleStepIndex = steps?.findIndex((step) => step === this.flow?.steps?.[this.stepIndex]);
		return b`<div class="progress-bar">
      ${steps?.map((step, index) => b` <div
            class="progress-bar-item ${index === visibleStepIndex + (flowHasIntro ? -1 : 0) ? "active" : ""}"
          ></div>`)}
    </div>`;
	}
	renderButtons() {
		const visibleStepIndex = this.getSteps()?.findIndex((step) => step === this.flow.steps[this.stepIndex]);
		return b`
      <div class="navigation">
        ${when(!this.currentStep?.intro && visibleStepIndex > 0 && !this.currentStep?.hideBackButton?.(this.flow?.state?.getState()), () => b`
            <button @click=${this.prevStep} ui-button secondary>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="24px"
                viewBox="0 -960 960 960"
                width="24px"
                fill="#e3e3e3"
              >
                <path
                  d="m313-440 224 224-57 56-320-320 320-320 57 56-224 224h487v80H313Z"
                />
              </svg>
              <span>Back</span>
            </button>
          `)}
        ${when(!this.currentStep?.intro, () => b`
            <button ui-button secondary @click=${() => dialog.close()}>
              <span>Close</span>
              ${cross}
            </button>
          `)}
      </div>
    `;
	}
	prevStep() {
		do {
			this.stepIndex--;
			this.currentStep = this.flow.steps[this.stepIndex];
		} while (this.currentStep?.condition && !this.currentStep.condition(this.flow.state.getState()));
		if (this.currentStep) {
			this.renderStep(this.currentStep);
			this.requestUpdate();
		} else console.warn("No more valid steps to go back to.");
		this.__updateFlowHistory();
	}
	async renderStep(step) {
		const wrapper = document.createElement("div");
		const state = this.flow.state.getState();
		this.importState = "pending";
		(step?.import ?? (() => Promise.resolve()))().then(() => {
			D(step.render(state), wrapper);
			const stepElement = wrapper.firstElementChild;
			if (stepElement) stepElement.__state = this.flow.state;
			this.renderedStep = stepElement ?? wrapper;
			this.importState = "success";
			this.shadowRoot.querySelector(".content").scrollTo({ top: 0 });
		}).catch((e) => {
			console.error(`Failed to render step: ${e}`);
			this.importState = "error";
		});
	}
};
customElements.define("botc-flow", BotcFlow);
//#endregion
//#region src/dialog.js
var BotcDialog = class extends Dialog {
	open(...all) {
		window?.gtag?.("event", `dialog.${all?.[0]?.id ?? "unknown"}`, {
			event_category: "dialog",
			event_label: all?.[0]?.id ?? "unknown"
		});
		return super.open(...all);
	}
};
function inline() {
	return { opening: ({ dialog, parameters, id }) => {
		dialog.id = "modal";
		const template = parameters.render();
		const header = parameters?.header ?? b`<div></div>`;
		D(b`
          <modal-container
            .dialog=${dialog}
            .template=${template}
            .importPromise=${Promise.resolve()}
            .header=${header}
            .button=${parameters.button}
          >
          </modal-container>
        `, dialog.form);
	} };
}
function flow() {
	return { opening: ({ dialog, parameters }) => {
		dialog.id = "flow";
		if (media.MIN.LG()) dialog.addEventListener("keydown", (e) => {
			if (e.key === "Escape") {
				e.preventDefault();
				e.stopImmediatePropagation();
			}
		});
		D(b`<botc-flow .flow=${parameters.flow}></botc-flow>`, dialog.form);
	} };
}
const dialog = new BotcDialog({
	flow: flow(),
	context: contextMenu(),
	inline: inline(),
	test: modal({
		title: "Test",
		button: ({ id, parameters, dialog }) => b`
      <button ui-button primary @click=${() => dialog.close()}>Submit</button>
    `,
		render: () => b`<p>
        Test
        <button
          @click=${() => {
			dialog.setReturnValue({ foo: "bar" });
			dialog.close();
		}}
        >
          close
        </button>
      </p>`
	}),
	createGame: modal({
		title: "Create Game",
		import: () => import("./CCVo_ZYc.js"),
		render: ({ parameters }) => b`<botc-create-game
        .amount=${parameters.amountOfPlayers}
      ></botc-create-game>`
	}),
	timer: modal({
		title: "Timer",
		import: () => import("./D_eG6Sh62.js"),
		render: ({ parameters }) => b`<botc-timer></botc-timer>`
	}),
	endGame: modal({
		title: "End Game",
		import: () => import("./Dreobo_i.js"),
		render: () => b`<botc-end-game></botc-end-game>`
	}),
	incrementDay: modal({
		title: "Next day",
		render: () => b`<p style="margin-top: 30px; margin-bottom: 30px;">
        It is now day: ${Number(state.getState().currentGame.day) + 1}
      </p>`
	}),
	setRole: modal({
		title: "Set Role",
		import: () => import("./CKg3lmvJ2.js"),
		render: ({ parameters }) => b`<botc-set-role
        .all=${parameters?.all}
        .player=${parameters.player}
      ></botc-set-role>`
	}),
	notes: modal({
		title: "Notes",
		import: () => import("./DrYb6n9X2.js"),
		render: ({ parameters }) => b`<botc-notes
        .notes=${parameters.player.notes}
        .playerId=${parameters.player.id}
      ></botc-notes>`
	}),
	addClaims: modal({
		title: "Add claims",
		import: () => import("./Dhvokmtb.js"),
		render: ({ parameters }) => b`<botc-add-claims .player=${parameters.player}></botc-add-claims>`
	}),
	restart: modal({
		title: "Restart game?",
		import: () => import("./1_Ty_erS2.js"),
		render: () => b`<botc-restart></botc-restart>`
	}),
	nomination: modal({
		title: "Nomination",
		import: () => import("./DkZCL7nZ2.js"),
		render: () => b`<botc-nomination></botc-nomination>`
	}),
	conversation: modal({
		title: "Conversation",
		import: () => import("./BhvqsoIV.js"),
		render: () => b`<botc-conversation></botc-conversation>`
	}),
	deadVotes: modal({
		title: "Dead votes",
		import: () => import("./CwEtZZhL.js"),
		render: () => b`<botc-dead-votes></botc-dead-votes>`
	}),
	reset: modal({
		title: "Sure?",
		import: () => import("./CaQZCfC52.js"),
		render: () => b`<botc-reset></botc-reset>`
	}),
	customscript: modal({
		title: "Homebrew Script",
		import: () => import("./B727ULNQ.js"),
		render: ({ parameters }) => b`<botc-custom-script
        .source=${parameters?.source}
      ></botc-custom-script>`
	}),
	customrole: modal({
		title: "Homebrew Role",
		import: () => import("./DV0JkDZ7.js"),
		render: ({ parameters }) => b`<botc-custom-role
        .type=${parameters.type}
        .role=${parameters?.role ?? void 0}
      ></botc-custom-role>`
	}),
	viewCustomRole: modal({
		title: ({ parameters }) => `Role`,
		import: () => import("./B_Z1IqN52.js"),
		render: ({ parameters }) => b`<botc-view-custom-role
        .role=${parameters?.role ?? void 0}
      ></botc-view-custom-role>`
	}),
	shareAchievement: modal({
		title: "Achievement!",
		import: () => import("./CfZSRjn-2.js"),
		render: ({ parameters }) => b`<botc-share-achievement
        .id=${parameters.id}
      ></botc-share-achievement>`
	}),
	killedBy: modal({
		title: "Killed by",
		import: () => import("./DJszuLhf.js"),
		render: ({ parameters }) => b`<botc-killed-by .player=${parameters.player}></botc-killed-by>`
	}),
	prevGame: modal({
		title: ({ parameters }) => parameters.title,
		import: () => import("./Dn3eVFma2.js"),
		render: ({ parameters }) => b`<botc-prev-game .game=${parameters.game}></botc-prev-game>`
	}),
	moreRoleInfo: modal({
		title: ({ parameters }) => parameters.humanReadableRole,
		import: () => import("./Dpf66dgQ.js"),
		render: ({ parameters }) => b`<botc-more-role-info .id=${parameters.id}></botc-more-role-info>`
	}),
	deletePrevGame: modal({
		title: "Delete game",
		render: ({ parameters }) => b`
      <p>Are you sure?</p>
      <button
        ui-button
        primary
        @click=${() => {
			stats.setState((s) => ({
				...s,
				games: s.games.map((game) => {
					if (game.date === parameters.game.date) {
						game.delete = true;
						game.synced = false;
						return game;
					}
					return game;
				})
			}));
			setTimeout(() => {
				dialog.close();
			});
		}}
      >
        Delete game
      </button>
    `
	}),
	addPlayer: modal({
		title: "Add player",
		import: () => import("./CAVWD0z8.js"),
		render: () => b`<botc-add-player></botc-add-player>`
	}),
	speechRecognitionResult: modal({
		title: ({ parameters }) => capitalize(parameters?.action),
		import: () => import("./Cdxy1X0f2.js"),
		button: ({ parameters }) => b`
      <button
        ui-button
        primary
        @click=${() => {
			parameters?.fn();
			dialog.close();
		}}
      >
        Accept changes
      </button>
    `,
		render: ({ parameters }) => b`<botc-speech-recognition-result
        .transcription=${parameters?.transcription}
        .old=${parameters?.old}
        .new=${parameters?.new}
      ></botc-speech-recognition-result>`
	}),
	customText: modal({
		title: "Custom Text",
		import: () => import("./DmmUXsG4.js"),
		render: ({ parameters }) => b`<botc-custom-text
        .text=${parameters?.text ?? ""}
      ></botc-custom-text>`
	}),
	addToken: modal({
		title: "Reminders",
		import: () => import("./CSZSPeUz.js"),
		render: ({ parameters }) => b`<botc-add-token .player=${parameters.player}></botc-add-token>`
	}),
	editName: modal({
		title: "Edit name",
		import: () => import("./Cfsuc1JV.js"),
		render: ({ parameters }) => b`<botc-edit-name .player=${parameters.player}></botc-edit-name>`
	}),
	demonBluffs: modal({
		title: "Add demon bluffs",
		import: () => import("./CV6Npuwg.js"),
		render: () => b`<botc-add-demon-bluffs></botc-add-demon-bluffs>`
	}),
	scriptSaved: modal({
		title: "Script saved",
		render: ({ parameters }) => b`Script <b>"${parameters.name}"</b> saved successfully!`
	}),
	install: modal({
		title: "Install",
		render: () => b`<div>
        <p>To install, follow these steps in the <b>Safari</b> browser:</p>
        <ul style="fill: var(--ui-main-5);">
          <li>
            ${iosShare} <span>Press the <b>share</b> button</span>
          </li>
          <li>
            ${iosSave}
            <span
              >Scroll down and find the <b>Add to homescreen</b> button</span
            >
          </li>
        </ul>
      </div>`
	}),
	shareGameQr: modal({
		title: "Share game state",
		import: () => import("./BzATkjHZ2.js"),
		render: ({ parameters }) => b`<botc-share-game-qr
        .includeData=${parameters?.includeData}
      ></botc-share-game-qr>`
	}),
	shareAlmanac: modal({
		title: "Share script",
		import: () => import("./Cnz5lVpo2.js"),
		render: ({ parameters }) => b`<botc-share-almanac .id=${parameters.id}></botc-share-almanac>`
	}),
	shareGameUrl: modal({
		title: "Share game url",
		import: () => import("./BnRfzL-s2.js"),
		render: ({ parameters }) => b`<botc-share-game-url
        .game=${parameters.game}
      ></botc-share-game-url>`
	}),
	shareMyAchievements: modal({
		title: "Share my achievements",
		import: () => import("./B3jfoLJf2.js"),
		render: ({ parameters }) => b`<botc-share-achievements-url
        .shareUrl=${parameters.shareUrl}
      ></botc-share-achievements-url>`
	}),
	sharedPersonalAchievements: modal({
		title: ({ parameters }) => `${parameters?.name ? `${capitalize(parameters.name)}'s ` : ""}Achievements`,
		import: () => import("./BbyzPziW2.js"),
		render: ({ parameters }) => b`<botc-shared-personal-achievements
        .ids=${parameters.ids}
      ></botc-shared-personal-achievements>`
	}),
	grim: modal({
		title: "Grim",
		render: () => b`
      <br />
      ${state.getState().currentGame.players.map((p) => b`
            <botc-player-details .player=${p}></botc-player-details>
          `)}
      <br />
    `
	}),
	importGameQr: modal({
		title: ({ parameters }) => parameters?.title ?? "Import game state",
		import: () => import("./CTtLst6m.js"),
		render: ({ parameters }) => {
			return b`<botc-import-game-qr
        .readOnly=${parameters?.readOnly ?? false}
        .game=${parameters?.game ?? {}}
        .qrState=${parameters?.qrState ?? "initialized"}
      ></botc-import-game-qr>`;
		}
	}),
	importFromOfficial: modal({
		title: "Import game",
		import: () => import("./BrZd8Ddk.js"),
		render: () => b`<botc-import-from-official></botc-import-from-official>`
	}),
	deleteCustomScript: modal({
		title: "Are you sure?",
		render: ({ parameters }) => b`
      <div>
        <p>
          Are you sure you want to delete the script
          <b>"${parameters.name}"</b>?
        </p>
        <button
          ui-button
          primary
          @click=${() => {
			parameters.delete();
			setTimeout(() => {
				dialog.close();
			});
		}}
        >
          Delete
        </button>
      </div>
    `
	}),
	deleteCustomRole: modal({
		title: "Are you sure?",
		render: ({ parameters }) => b`
      <div>
        <p>
          Are you sure you want to delete the role <b>"${parameters.name}"</b>?
        </p>
        <button
          ui-button
          primary
          @click=${() => {
			parameters.delete();
			setTimeout(() => {
				dialog.close();
			});
		}}
        >
          Delete
        </button>
      </div>
    `
	}),
	viewCustomScript: modal({
		title: ({ parameters }) => capitalize(parameters.name),
		import: () => import("./X11Zh8vE2.js"),
		render: ({ parameters }) => {
			return b`
        <botc-view-custom-script
          .script=${parameters.script}
          .name=${parameters.name}
        ></botc-view-custom-script>
      `;
		}
	}),
	card: modal({
		title: () => b`<div></div>`,
		render: ({ parameters }) => b`
      <style>
        .card {
          display: flex;
          flex: 1;
          height: calc(100% - 40px);
          justify-content: center;
          align-items: center;
        }
        h2 {
          font-family: Balgruf;
          hyphens: auto;
          font-size: 5rem;
          line-height: 0.9;
          color: var(--ui-main-5);
          text-align: center;
          text-shadow: 3px 3px 6px rgba(0, 0, 0, 1);
          margin: 0;
        }
      </style>
      <div class="card">
        <h2>${parameters.render}</h2>
      </div>
    `
	}),
	editCustomScript: modal({
		title: "Edit script",
		render: ({ parameters }) => b`
      <div>
        <p>Rename script <b>"${parameters.name}"</b></p>
        <form
          @submit=${(e) => {
			e.preventDefault();
			const name = new FormData(e.target).get("scriptname");
			if (!name) return;
			parameters.rename(parameters.name, name);
			setTimeout(() => {
				dialog.close();
			});
		}}
        >
          <label ui-label for="scriptname">
            <input
              ui-input
              type="text"
              value="${parameters.name}"
              name="scriptname"
              id="scriptname"
              placeholder="Script name"
            />
            <span>Script name</span>
          </label>
          <button ui-button primary type="submit">Edit name</button>
        </form>
      </div>
    `
	}),
	playerSelect: modal({
		title: ({ parameters }) => parameters?.title ?? "Select player",
		import: () => import("./CXULIlEB2.js"),
		render: ({ parameters }) => b`<botc-player-select
        .showNightOrder=${parameters?.showNightOrder}
        .deadOnly=${parameters?.deadOnly}
        .filterFn=${parameters?.filterFn}
        .maxSelect=${parameters?.maxSelect ?? Infinity}
        .text=${parameters?.text ?? ""}
        .players=${parameters?.players ?? state.getState().currentGame.players}
        .aliveOnly=${parameters?.aliveOnly ?? false}
        .selected=${parameters?.selected ?? []}
        .multiple=${parameters?.multiple ?? false}
        .hideGrim=${parameters?.hideGrim ?? false}
        .autoScroll=${parameters?.autoScroll ?? true}
      ></botc-player-select>`,
		button: ({ id, parameters }) => b`<button ui-button primary @click=${() => dialog.close()}>
        ${parameters?.buttonText ?? "Select"}
      </button>`
	}),
	roleSelect: modal({
		title: "Select role",
		import: () => import("./EHh9qgbq2.js"),
		render: ({ parameters }) => b`<botc-select-role
        .includeDescription=${parameters?.includeDescription ?? false}
        .appendRoles=${parameters?.appendRoles ?? []}
        .roles=${parameters?.roles ?? []}
        .sortFn=${parameters?.sortFn}
        .script=${parameters?.script}
        .multiple=${parameters?.multiple}
        .text=${parameters?.text}
        .allScriptRoles=${parameters?.allScriptRoles}
        .filterFn=${parameters?.filterFn}
        .selected=${parameters?.selected ?? []}
        .showDemonBluffs=${parameters?.showDemonBluffs ?? false}
        .showAlreadyInPlayRoles=${parameters?.showAlreadyInPlayRoles ?? false}
      ></botc-select-role>`,
		button: ({ id, parameters }) => b`<button ui-button primary @click=${() => dialog.close()}>
        ${parameters?.buttonText ?? "Select"}
      </button>`
	})
});
window.dialog = dialog;
//#endregion
export { cross$1 as n, dialog as t };
