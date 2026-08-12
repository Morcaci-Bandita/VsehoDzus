import { A as i, I as i$1, P as b, w as spacer16, x as main5 } from "./CY602n9t.js";
//#region node_modules/@generic-components/components/generic-spinner/GenericSpinner.js
const template = document.createElement("template");
template.innerHTML = `
  <style>
    :host {
      --generic-spinner-width: 50px;
      --generic-spinner-height: 50px;
      --generic-spinner-color: #828282;
      --generic-spinner-stroke-width: 4px;
      display: block;
      width: var(--generic-spinner-width);
      height: var(--generic-spinner-height);
    }

    svg {
      animation: rotate 2000ms linear infinite;
      transform-origin: center center;
      margin: auto;
      stroke: var(--generic-spinner-color);

    }

    circle {
      stroke-dasharray: 85, 200;
      /* 0px is requires for edge 15 and lower */
      stroke-dashoffset: 0px;
      animation: dash 2000ms ease-in-out infinite;
      stroke-linecap: round;
      stroke-width: var(--generic-spinner-stroke-width);
      stroke-miterlimit: 10;
      fill: none;
    }

    @keyframes rotate {
      100% {
        transform: rotate(360deg);
      }
    }

    @keyframes dash {
      0% {
        stroke-dasharray: 1, 200;
        /* 0px is requires for edge 15 and lower */
        stroke-dashoffset: 0px;
      }
      50% {
        stroke-dasharray: 89, 200;
        stroke-dashoffset: -35px;
      }
      100% {
        stroke-dasharray: 89, 200;
        stroke-dashoffset: -124px;
      }
    }

    @media screen and (-ms-high-contrast: active), (-ms-high-contrast: none) {
      svg {
        animation-duration: 1500ms;
      }
      circle {
        stroke-linecap: square;
      }
    }

    @media (prefers-reduced-motion: reduce) {
      svg {
        animation-duration: 20000ms;
      }
      circle {
        animation: dash 20000ms ease-in-out infinite;
      }
    }

  </style>
  <svg part="spinner" viewBox="25 25 50 50">
    <circle part="circle" cx="50" cy="50" r="20" />
  </svg>
`;
/**
* @cssproperty --generic-spinner-width - Controls the width of the spinner
* @cssproperty --generic-spinner-height - Controls the height of the spinner
* @cssproperty --generic-spinner-color - Controls the color of the spinner
* @cssproperty --generic-spinner-stroke-width - Controls the width of the stroke
*
* @csspart spinner - Style the spinner SVG
* @csspart circle - Style the circle SVG
*/
var GenericSpinner = class extends HTMLElement {
	static is = "generic-spinner";
	constructor() {
		super();
		this.attachShadow({ mode: "open" });
		this.shadowRoot.appendChild(template.content.cloneNode(true));
	}
	connectedCallback() {
		this.setAttribute("role", "status");
		this.setAttribute("aria-live", "polite");
		this.setAttribute("aria-label", "loading");
		this.handleAttributes();
	}
	static get observedAttributes() {
		return ["label"];
	}
	attributeChangedCallback() {
		this.handleAttributes();
	}
	handleAttributes() {
		if (this.hasAttribute("label")) this.setAttribute("aria-label", this.getAttribute("label"));
	}
};
//#endregion
//#region node_modules/@generic-components/components/spinner.js
customElements.define(GenericSpinner.is, GenericSpinner);
//#endregion
//#region src/components/botc-spinner.js
var BotcSpinner = class extends i {
	static styles = i$1`
    :host {
      display: block;
      width: 100%;
    }

    generic-spinner {
      --generic-spinner-color: var(--spinner-color, ${main5});
      --generic-spinner-width: var(--spinner-size, 50px);
      --generic-spinner-height: var(--spinner-size, 50px);
    }

    .spinner {
      display: flex;
      justify-content: center;
      margin-bottom: ${spacer16};
      margin-top: ${spacer16};
    }
  `;
	static properties = {
		color: { type: String },
		size: { type: String }
	};
	updated(changedProperties) {
		if (changedProperties.has("color")) this.style.setProperty("--spinner-color", this.color);
		if (changedProperties.has("size")) this.style.setProperty("--spinner-size", this.size);
	}
	render() {
		return b`<div part="spinner-wrapper" class="spinner">
      <generic-spinner></generic-spinner>
    </div>`;
	}
};
customElements.define("botc-spinner", BotcSpinner);
//#endregion
