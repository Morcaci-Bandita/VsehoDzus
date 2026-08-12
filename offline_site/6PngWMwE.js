import { C as spacer12, D as spacer40, I as i, O as spacer8, T as spacer20, _ as focus, a as bg3, b as main4, c as bg6, d as bg9, g as elevation4, o as bg4, s as bg5, x as main5, y as main3 } from "./CY602n9t.js";
//#region src/components/botc-button-link.js
const buttonLink = i`
  a[ui-button-link] {
    margin-top: ${spacer8};
    margin-bottom: ${spacer8};
    width: fit-content;
    border-radius: 4px;
    display: flex;
    ${elevation4()};
    padding: ${spacer12} ${spacer20};
    border: none;
    border-radius: 4px;
    font-weight: 700;
    font-family: Arial, Helvetica, sans-serif;
    font-size: 1rem;
    transition: background 0.1s ease-in;
    justify-content: center;
    text-underline-offset: 1px;
    width: calc(100% - 42px);
  }

  @media (max-width: 840px) {
    a[ui-button-link] {
      -webkit-touch-callout: none; /* iOS Safari */
      -webkit-user-select: none; /* Safari */
      -khtml-user-select: none; /* Konqueror HTML */
      -moz-user-select: none; /* Old versions of Firefox */
      -ms-user-select: none; /* Internet Explorer/Edge */
      user-select: none;
    }
  }

  /** Primary */
  a[ui-button-link]:not([disabled]) {
    background: ${main5};
    color: ${bg9};
  }

  a[ui-button-link]:not([disabled]):focus-visible {
    ${focus()}
  }

  a[ui-button-link]:not([disabled]):hover {
    box-shadow:
      rgb(0 0 0 / 25%) 0px 0px 6px 0px,
      rgb(0 0 0 / 50%) 0px 6px 6px 0px;
  }

  a[ui-button-link]:not([disabled]):hover,
  a[ui-button-link]:not([disabled]):focus-visible {
    text-underline-offset: 3px;
    background: ${main4};
  }

  a[ui-button-link]:not([disabled]):active {
    background: ${main3};
  }

  /** Secondary */
  a[ui-button-link]:not([disabled])[secondary] {
    background: ${bg6};
    color: ${main4};
    border: solid 1px ${main4};
  }

  a[ui-button-link]:not([disabled])[secondary]:focus-visible {
    ${focus()}
  }

  a[ui-button-link]:not([disabled])[secondary]:hover {
    box-shadow:
      rgb(0 0 0 / 25%) 0px 0px 6px 0px,
      rgb(0 0 0 / 50%) 0px 6px 6px 0px;
  }

  a[ui-button-link]:not([disabled])[secondary]:hover,
  a[ui-button-link]:not([disabled])[secondary]:focus-visible {
    text-underline-offset: 3px;
    background: ${bg5};
  }

  a[ui-button-link]:not([disabled])[secondary]:active {
    background: ${bg4};
  }

  a[ui-button-link][disabled] {
    background: ${bg3};
    color: ${bg6};
  }

  a[ui-button-link][secondary][disabled] {
    background: ${bg6};
    color: ${bg3};
    border: solid 1px ${bg3};
  }

  @media (max-width: 480px) {
    a[ui-button-link] {
      width: calc(100% - ${spacer40});
    }

    a[ui-button-link][secondary] {
      width: calc(calc(100% - ${spacer40}) - 2px);
    }
  }
`;
//#endregion
export { buttonLink as t };
