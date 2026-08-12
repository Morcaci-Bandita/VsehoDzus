import { C as spacer12, I as i, O as spacer8, T as spacer20, _ as focus, a as bg3, b as main4, c as bg6, d as bg9, g as elevation4, o as bg4, s as bg5, x as main5, y as main3 } from "./CY602n9t.js";
//#region src/components/botc-button.js
const button = i`
  button[ui-button] {
    display: block;
    margin-top: ${spacer8};
    margin-bottom: ${spacer8};
    width: fit-content;
    border-radius: 4px;
    ${elevation4()};

    padding: ${spacer12} ${spacer20};
    border: none;
    border-radius: 4px;
    font-weight: 700;
    font-family: Arial, Helvetica, sans-serif;
    font-size: 1rem;
    transition: background 0.1s ease-in;
    justify-content: center;
  }

  @media (max-width: 840px) {
    button[ui-button] {
      -webkit-touch-callout: none; /* iOS Safari */
      -webkit-user-select: none; /* Safari */
      -khtml-user-select: none; /* Konqueror HTML */
      -moz-user-select: none; /* Old versions of Firefox */
      -ms-user-select: none; /* Internet Explorer/Edge */
      user-select: none;
    }
  }

  button[ui-button] svg {
    fill: ${main5};
  }

  /** Primary */
  button[ui-button][primary] {
    transition: transform 0.1s ease-in-out;
    background: ${main5};
    color: ${bg9};
  }

  button[ui-button][primary]:not([disabled]):focus-visible {
    ${focus()}
  }

  button[ui-button][primary]:not([disabled]):hover {
    box-shadow:
      rgb(0 0 0 / 25%) 0px 0px 6px 0px,
      rgb(0 0 0 / 50%) 0px 6px 6px 0px;
  }

  button[ui-button][primary]:not([disabled]):hover,
  button[ui-button][primary]:not([disabled]):focus-visible {
    background: ${main4};
  }

  button[ui-button][primary]:not([disabled]):active {
    transition: transform 0.1s ease-in-out;
    transform: scale(0.95);
    background: ${main3};
  }

  button[ui-button][primary][disabled] {
    background: ${bg3};
    color: ${bg6};
  }

  /** Secondary */
  button[ui-button][secondary] {
    transition: transform 0.1s ease-in-out;
    background: ${bg6};
    color: ${main4};
    border: solid 1px ${main4};
  }

  button[ui-button][secondary]:not([disabled]):focus-visible {
    ${focus()}
  }

  button[ui-button][secondary]:not([disabled]):hover {
    box-shadow:
      rgb(0 0 0 / 25%) 0px 0px 6px 0px,
      rgb(0 0 0 / 50%) 0px 6px 6px 0px;
  }

  button[ui-button][secondary]:not([disabled]):hover,
  button[ui-button][secondary]:not([disabled]):focus-visible {
    background: ${bg5};
  }

  button[ui-button][secondary]:not([disabled]):active {
    transition: transform 0.1s ease-in-out;
    transform: scale(0.95);
    background: ${bg4};
  }

  button[ui-button][secondary][disabled] {
    background: ${bg6};
    color: ${bg3};
    border: solid 1px ${bg3};
  }

  /* @media(max-width: 480px) { */
  button[ui-button] {
    width: 100%;
  }
`;
//#endregion
export { button as t };
