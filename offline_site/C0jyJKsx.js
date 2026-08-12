import { E as spacer4, I as i, O as spacer8, S as neutral, _ as focus, a as bg3, o as bg4 } from "./CY602n9t.js";
//#region src/components/botc-icon-button.js
const iconButton = i`
  button[ui-icon-button] {
    width: 40px;
    height: 40px;
    display: flex;
    padding: ${spacer8};
    border-radius: ${spacer4};
    background: none;
    border: none;
    fill: ${neutral};
    transition: all 0.2s ease-in-out;
  }

  button[ui-icon-button][disabled] svg {
    fill: ${bg3};
  }

  @media (min-width: 840px) {
    button[ui-icon-button]:not([disabled]):hover,
    button[ui-icon-button]:not([disabled]):active {
      background: ${bg4};
    }
  }
  /* button[ui-icon-button]:not([disabled]):hover, */
  button[ui-icon-button]:not([disabled]):focus-visible {
    background: ${bg4};
  }

  button[ui-icon-button]:not([disabled]):focus-visible {
    background: ${bg4};
    ${focus()}
  }

  button[ui-icon-button]:not([disabled]):active {
    background: ${bg3};
    transform: scale(0.85);
  }
`;
//#endregion
export { iconButton as t };
