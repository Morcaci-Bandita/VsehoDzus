import { A as i$1, C as spacer12, I as i, P as b, p as borderRadius, w as spacer16 } from "./CY602n9t.js";
//#region src/components/botc-error.js
const error = i`
  [ui-error] {
    color: white;
    border: solid 1px #d9403b;
    border-radius: ${borderRadius};
    background: #351f1e;
    padding: ${spacer12} ${spacer16};
  }

  @keyframes pulse {
    0% {
      box-shadow:
        #d9403b 0px 0px 8px,
        #d9403b 0px 0px 8px,
        #d9403b 0px 0px 4px;
    }
    50% {
      box-shadow:
        #d9403b 0px 0px 0px,
        #d9403b 0px 0px 0px,
        #d9403b 0px 0px 0px;
    }
    100% {
      box-shadow:
        #d9403b 0px 0px 8px,
        #d9403b 0px 0px 8px,
        #d9403b 0px 0px 4px;
    }
  }

  [ui-error][pulsing] {
    animation: pulse 1.5s ease-in-out infinite;
  }
`;
var BotcError = class extends i$1 {
	static styles = [error];
	render() {
		return b`
      <div ui-error>
        <slot></slot>
      </div>
    `;
	}
};
customElements.define("botc-error", BotcError);
//#endregion
export { error as t };
