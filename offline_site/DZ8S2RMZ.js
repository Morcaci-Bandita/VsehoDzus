//#region node_modules/@generic-components/components/utils/visually-hidden.js
const _visuallyHidden = `
  position: fixed;
  /* keep it on viewport */
  top: 0px;
  left: 0px;
  /* give it non-zero size, VoiceOver on Safari requires at least 2 pixels
     before allowing buttons to be activated. */
  width: 4px;
  height: 4px;
  /* visually hide it with overflow and opacity */
  opacity: 0;
  overflow: hidden;
  /* remove any margin or padding */
  border: none;
  margin: 0;
  padding: 0;
  /* ensure no other style sets display to none */
  display: block;
  visibility: visible;
  pointer-events: none;
`;
//#endregion
//#region node_modules/@generic-components/components/generic-visually-hidden/visually-hidden.js
/** For usage as constructible stylesheet  */
const visuallyHidden = `
  [visually-hidden] {
    ${_visuallyHidden}
  }
`;
`${_visuallyHidden}`;
//#endregion
export { visuallyHidden as t };
