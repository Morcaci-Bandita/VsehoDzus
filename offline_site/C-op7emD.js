import { I as i, O as spacer8, _ as focus, b as main4, g as elevation4, o as bg4 } from "./CY602n9t.js";
//#region src/components/botc-select.js
const select = i`
  label[ui-label] {
    color: white;
    margin-top: ${spacer8};
    margin-bottom: ${spacer8};
    font-weight: 700;
    display: flex;
    flex-direction: column-reverse;
    font-size: 0.9rem;
  }

  select[ui-select]:valid {
    color: white;
  }

  select[ui-select]:invalid {
    color: var(--ui-bg-2);
  }

  select[ui-select]:invalid + * {
    color: var(--ui-error-5);
  }

  select[ui-select] {
    -webkit-appearance: none; /* Remove native styles */
    -moz-appearance: none; /* For Firefox */
    background: ${bg4}
      url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 9 12 15 18 9"></polyline></svg>')
      no-repeat right ${spacer8} center;
    background-size: 1rem;
    padding-right: 2rem; /* Add space for the icon */

    ${elevation4()}
    font-size: 1rem;
    padding: ${spacer8};
    margin-top: 8px;
    border: solid 1px var(--ui-border);
    border-radius: 6px;
    background-color: ${bg4};
    font-weight: 300;
    font-family: "Poppins";

    color: white;
  }

  select[ui-select]:focus-visible {
    ${focus()}
  }

  select[ui-select]:focus-visible + * {
    color: ${main4};
  }
`;
//#endregion
export { select as t };
