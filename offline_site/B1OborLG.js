import { A as i, I as i$1, P as b, S as neutral, _ as focus, x as main5 } from "./CY602n9t.js";
//#region src/components/botc-back-button.js
var BotcBackButton = class extends i {
	static properties = { href: { type: String } };
	static styles = i$1`
    :host {
      display: block;
    }

    a {
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
      color: ${neutral};
      border-radius: 4px;
      background-color: var(--ui-bg-6);
      transition: all 0.2s ease-in-out;
      text-decoration: none;
      width: fit-content;
    }

    a:hover,
    a:active,
    a:focus-visible {
      text-decoration: underline;
      background-color: var(--ui-bg-5);
      color: white;
      box-shadow:
        0 0 0 2px ${main5},
        0 0 0 4px white;
      border-radius: 4px;
    }

    a:active {
      transform: scale(0.95);
    }

    a:focus-visible {
      ${focus()}
    }

    a svg {
      fill: white;
    }

    a > *:first-child {
      /* Your styles here */
      margin-right: 6px;
    }

    a:hover {
      box-shadow: unset;
      border: unset;
    }

    a span {
      margin-right: 6px;
    }

    @media (max-width: 840px) {
      a {
        margin-top: 20px;
      }
    }
  `;
	render() {
		return b`
      <a part="anchor" href="${this.href}">
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
      </a>
    `;
	}
};
customElements.define("botc-back-button", BotcBackButton);
//#endregion
