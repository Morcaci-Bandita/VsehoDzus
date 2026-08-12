import { I as i, _ as focus, d as bg9, f as border, g as elevation4, o as bg4, s as bg5, u as bg8, x as main5 } from "./CY602n9t.js";
//#region src/components/botc-radio.js
/**
* label
*  input
*  div
*   div radio toggle
*   div content
*/
const radio = i`
  label[ui-label]:has(input[ui-radio]) {
    display: flex;
    ${elevation4()}
    position: relative;
    align-items: center;
    margin-bottom: 10px;
    background: ${bg5};
    border: solid 1px ${border};
    border-radius: 4px;
    padding: 8px;
    transition:
      background 0.2s,
      border 0.2s;
    cursor: pointer;
  }

  label[ui-label]:has(input[ui-radio]) input[ui-radio] {
    position: absolute;
    opacity: 0; /* Ensure the input is hidden but still functional */
  }

  label[ui-label]:has(input[ui-radio]) div {
    display: flex;
    align-items: center;
    width: 100%;
  }

  label[ui-label]:has(input[ui-radio]) .toggle {
    width: 18px;
    height: 18px;
    border-radius: 50%;
    border: solid 2px ${bg9};
    background: ${bg8};
    margin-right: 8px;
    display: flex;
    justify-content: center;
    align-items: center;
    box-sizing: border-box;
    flex-shrink: 0;
  }

  label[ui-label]:has(input[ui-radio]) .selected {
    display: none;
  }

  /* Ensure the selected circle is shown when checked */

  label[ui-label]:has(input[ui-radio]:checked) .selected {
    display: block;
    width: 10px;
    height: 10px;
    border-radius: 50%;
    background-color: ${main5};
    ${elevation4()}
  }

  /* Handle focus-visible for accessibility */
  label[ui-label]:has(input[ui-radio]:focus-visible) .toggle {
    ${focus()}
    border-radius: 50%;
  }

  label[ui-label] input[ui-radio]:checked + div .selected {
    display: block;
  }

  /* Ensure the selected circle is shown on focus or checked */
  label[ui-label]:has(input[ui-radio]:focus-visible) .selected,
  label[ui-label]:has(input[ui-radio]:checked) .selected {
    display: block;
  }

  /* Update the label background and border when checked */
  label[ui-label]:has(input[ui-radio]:checked) {
    border: solid 1px ${main5};
    background-color: ${bg4};
  }
`;
//#endregion
export { radio as t };
