import { j as A } from "./CY602n9t.js";
import { L as e, R as i } from "./CP0hEE1l.js";
import { t as KEYCODES } from "./B6k5sWc7.js";
//#region src/components/context/index.js
var Context = class extends i {
	constructor(partInfo) {
		super(partInfo);
		const button = partInfo.element;
		button.addEventListener("click", (e) => {
			this.open(e);
		});
		button.setAttribute("aria-expanded", "false");
		button.addEventListener("keydown", (e) => {
			switch (e.keyCode) {
				case KEYCODES.UP:
					this.open(e, "last");
					e.preventDefault();
					break;
				case KEYCODES.DOWN:
					this.open(e, "first");
					e.preventDefault();
					break;
			}
		});
	}
	open(e, openAt) {
		this.dialog.open({
			id: "context",
			parameters: {
				target: e,
				template: this.template,
				openAt
			}
		});
	}
	render(dialog, template) {
		this.dialog = dialog;
		this.template = template;
		return A;
	}
};
const context = e(Context);
//#endregion
export { context as t };
