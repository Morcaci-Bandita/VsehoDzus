import { i as detectOverflow, r as computePosition } from "./CRHdpoM6.js";
//#region src/components/context/positioning.js
async function compute(target, dialog) {
	let { x, y } = await computePosition(target, dialog, { middleware: [{
		name: "pos",
		async fn(middlewareArguments) {
			const { placement } = middlewareArguments;
			let newPlacement;
			const overflow = await detectOverflow(middlewareArguments);
			const left = Math.abs(overflow.left);
			const right = Math.abs(overflow.right);
			let vertical = "bottom";
			let horizontal;
			if (left > right) horizontal = "end";
			else horizontal = "start";
			if (overflow.bottom > 0) vertical = "top";
			newPlacement = `${vertical}-${horizontal}`;
			dialog.classList.add(newPlacement);
			if (placement !== "bottom-end" && placement !== "bottom-start" && placement !== "top-end" && placement !== "top-start") return { reset: { placement: newPlacement } };
			return {};
		}
	}] });
	Object.assign(dialog.style, {
		left: `${x}px`,
		top: `${y}px`
	});
}
//#endregion
export { compute };
