import { E as spacer4, I as i, O as spacer8, S as neutral, _ as focus, a as bg3, b as main4, f as border, g as elevation4, i as bg2, o as bg4, s as bg5 } from "./CY602n9t.js";
//#region src/components/botc-input.js
const input = i`
  label[ui-label] {
    color: white;
    margin-top: ${spacer8};
    margin-bottom: ${spacer8};
    font-weight: 700;
    display: flex;
    flex-direction: column-reverse;
    font-size: 0.9rem;
  }

  textarea[ui-input] {
    resize: none;
  }

  textarea[ui-input] + *,
  input[ui-input] + * {
    margin-bottom: ${spacer4};
    color: ${neutral};
    transition: color 0.2s ease-in;
    font-size: 0.9rem;
  }

  textarea[ui-input]:focus-visible + *,
  input[ui-input]:focus-visible + * {
    color: ${main4};
  }

  textarea[ui-input][disabled] + *,
  input[ui-input][disabled] + * {
    color: ${bg2};
  }

  textarea[ui-input]:required + *::after,
  input[ui-input]:required + *::after {
    content: "*";
    margin-left: ${spacer4};
  }

  textarea[ui-input]:invalid + *::after,
  input[ui-input]:invalid + *::after {
    content: "*";
    margin-left: ${spacer4};
  }

  textarea[ui-input]:invalid + *,
  input[ui-input]:invalid + * {
    color: var(--ui-error-5);
  }

  textarea[ui-input],
  input[ui-input] {
    font-weight: 300;
    margin-bottom: ${spacer4};
    margin-top: ${spacer4};
    outline: 0;
    padding: ${spacer8} ${spacer8};
    background: ${bg4};
    border-radius: ${spacer4};
    border: initial;
    transition: background 0.2s ease-in;
    caret-color: ${neutral};
    color: ${neutral};
    font-size: 1rem;
    font-family: "Poppins";
    ${elevation4()}
    border: solid 1px ${border};
  }

  input[ui-input]:active,
  textarea[ui-input]:focus-visible,
  input[ui-input]:active,
  input[ui-input]:focus-visible {
    -webkit-appearance: none;
  }

  textarea[ui-input]:focus-visible,
  input[ui-input]:focus-visible {
    ${focus()}
  }

  textarea[ui-input]::placeholder,
  input[ui-input]::placeholder {
    color: ${bg2};
  }

  textarea[ui-input][disabled],
  input[ui-input][disabled] {
    background-color: ${bg5};
  }

  textarea[ui-input]:not([disabled]):hover,
  input[ui-input]:not([disabled]):hover {
    background: ${bg3};
    transition: background 0.2s ease-in;
  }
`;
//#endregion
export { input as t };
