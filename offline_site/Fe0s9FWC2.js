import { A as i } from "./CY602n9t.js";
//#region src/flow/botc-flow-element.js
var BotcFlowElement = class extends i {
	__state;
	constructor() {
		super();
		this.__callRequestUpdate = this.__callRequestUpdate.bind(this);
	}
	connectedCallback() {
		super.connectedCallback();
		this.__state?.addEventListener("state-changed", this.__callRequestUpdate);
	}
	disconnectedCallback() {
		super.disconnectedCallback();
		this.__state?.removeEventListener("state-changed", this.__callRequestUpdate);
	}
	__callRequestUpdate() {
		this.requestUpdate();
	}
	setState(updateFn) {
		this.__state?.setState?.(updateFn);
		if (this.mapStateToProps) {
			const props = this.mapStateToProps(this.__state.getState());
			Object.keys(props).forEach((key) => {
				this[key] = props[key];
			});
			this.requestUpdate();
		}
	}
	forceUpdateSteps() {
		this.__state.dispatchEvent(new Event("botc-flow-update-steps"));
	}
	next() {
		this.__state.dispatchEvent(new Event("botc-flow-next"));
	}
	close() {
		this.__state.dispatchEvent(new Event("botc-flow-close"));
	}
	finalize() {
		this.__state.dispatchEvent(new Event("botc-flow-finalize"));
	}
};
//#endregion
export { BotcFlowElement as t };
