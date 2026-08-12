import { I as i } from "./CY602n9t.js";
import { r as debounceAtFrame } from "./vIOCOudq.js";
//#region src/components/sortable-list-mixin.js
const sortableListStyles = i`
  [sortable-dragged-item-container] > * {
    transform: scale(1);
    /* transform-origin: center; */
    transition: transform 100ms ease-in-out;
  }

  [dragging] [sortable-dragged-item-container] {
    /* background-color: transparent !important; */
  }

  [sortable-dragged-item-container][dragged] > * {
    position: fixed;
    z-index: 1;
    /* background-color: var(--bg_default); */
    border-radius: 4px;
    transform: scale(1.03);
    transition: transform 200ms ease-in-out;
  }

  [sortable-dragged-item-container][dragged] [sortable-dragged-item-trigger] {
    cursor: move; /* Fallback if grabbing cursor is unsupported. */
    cursor: grab;
    cursor: grabbing;
    cursor: -moz-grabbing;
    cursor: -webkit-grabbing;
  }
`;
function getDeepActiveElement() {
	let host = document.activeElement || document.body;
	while (host && host.shadowRoot && host.shadowRoot.activeElement) host = host.shadowRoot.activeElement;
	return host;
}
/** Clears selected document text. */
function clearDocumentSelection() {
	if (document.selection && document.selection.empty) document.selection.empty();
	if (window.getSelection) window.getSelection().removeAllRanges();
}
/** Clears selected input text. */
function clearInputSelection() {
	const activeElm = getDeepActiveElement();
	if (activeElm) {
		activeElm.blur();
		if (activeElm.nodeName) {
			if (activeElm.nodeName === "TEXTAREA" || activeElm.nodeName === "INPUT" && activeElm.type === "text") activeElm.selectionStart = activeElm.selectionEnd;
		}
	}
}
/** Clears selected document and input text. */
function clearSelection() {
	clearDocumentSelection();
	clearInputSelection();
}
/**
* @typedef {object} Coords
* @property {number} x
* @property {number} y
*/
/**
* @typedef {object} RelativeMousePos
* @property {number} x
* @property {number} y
* @property {number} top
*/
/**
* Get the current mouse x and y position. Accounts for touch device position.
*
* @param {Event} event
* @returns {Coords} position
*/
function getMousePosition(event) {
	let pos = event;
	if (event.type === "touchstart" || event.type === "touchmove") {
		const toEvent = event.originalEvent || event;
		const touches = toEvent.touches || toEvent.changedTouches;
		pos = touches && touches.length ? touches[0] : {};
	}
	return {
		x: pos.pageX,
		y: pos.pageY
	};
}
/**
* Gets the current mouse position relative to the top left corner of the draggable list.
*
* @param {HTMLElement} list
* @param {Coords} mousePos
* @returns {RelativeMousePos} position
*/
function getRelativeMousePosition(list, mousePos) {
	const listRect = list.getBoundingClientRect();
	return {
		x: mousePos.x - listRect.left,
		y: mousePos.y - listRect.top - window.scrollY,
		top: listRect.top
	};
}
/**
* Gets the next position of the dragged item, based on the current mouse position
* and the start position. The start position is the point relative of the list
* we started dragging.
*
* @param {Coords} mousePos
* @param {RelativeMousePos} relativeStartPos
* @returns {Coords}
*/
function getNextDraggedItemPosition(mousePos, relativeStartPos) {
	return {
		x: mousePos.x - relativeStartPos.x,
		y: mousePos.y - relativeStartPos.y
	};
}
/**
* Gets the current index of the dragged item in the list. Calculated by checking the mouse
* position, and calculating the height of the individual items in the list.
*
* @param {HTMLElement} list
* @param {HTMLElement[]} items
* @param {BoundingClientRect} draggedItemRect
* @param {Coords} mousePos
* @param {Window} window
* @returns {number}
*/
function getDraggedItemIndex(list, items, draggedItemRect, mousePos, _window = window) {
	const draggedCenterY = mousePos.y - draggedItemRect.height / 2;
	for (let i = 0; i < items.length; i++) {
		const itemRect = items[i].getBoundingClientRect();
		if (draggedCenterY < itemRect.top + _window.scrollY + itemRect.height / 2) return i;
	}
	return items.length - 1;
}
const dragEvents = ["touchstart", "mousedown"];
const dropEvents = ["touchend", "mouseup"];
const moveEvents = ["touchmove", "mousemove"];
/**
* @typedef {object} DragContext
* @property {HTMLElement} list the list in which an item is being dragged
* @property {HTMLElement} item the item that's being dragged
* @property {HTMLElement} trigger the element which triggered the drag. can be the same as item
* @property {ClientRect} itemRect the cached item client rect
* @property {{ x: number, y: number, top: number }} relativeStartPos the mouse position relative
*  to the list where we started dragging
*/
function cancelEvent(e) {
	e.preventDefault();
	e.stopImmediatePropagation();
}
const SortableListMixin = (base) => class extends base {
	constructor() {
		super();
		this._onDropEvent = this._onDropEvent.bind(this);
		this._onStartDragEvent = this._onStartDragEvent.bind(this);
		this._onMoveEventSync = this._onMoveEventSync.bind(this);
		this._onMoveEvent = debounceAtFrame(this._onMoveEventSync);
		dragEvents.forEach((name) => {
			this.addEventListener(name, this._onStartDragEvent);
		});
	}
	/**
	* Whether we are currently dragging something.
	* @type {boolean}
	*/
	get dragging() {
		return !!this._dragContext;
	}
	/**
	* Handles a drag start event. If the event occurred in a sortable list on a sortable item,
	* dragging is started.
	* @param {*} event
	*/
	_onStartDragEvent(event) {
		if (this.dragging) return;
		const list = event.composedPath().find((e) => e.hasAttribute && e.hasAttribute("sortable-list"));
		const trigger = event.composedPath().find((e) => e.hasAttribute && e.hasAttribute("sortable-dragged-item-trigger"));
		if (trigger?.classList?.contains("disabled")) return;
		if (list && trigger) {
			const item = event.composedPath().find((e) => e.hasAttribute && e.hasAttribute("sortable-dragged-item-container")) || trigger;
			event.preventDefault();
			event.stopImmediatePropagation();
			clearSelection();
			this._startDragging({
				list,
				item,
				trigger
			}, event);
		}
	}
	_scrollOnDrag(pos) {
		const itemHeight = this._dragContext.item.firstElementChild.clientHeight;
		const scrollSpeed = 20;
		/**
		*  Arbitrary distance to top and bottom to trigger scroll on drag.
		* It is hard to get parts of the shell to programmatically set the limits,
		* we have to go through lots of shadowRoots of the global layout of the app.
		*/
		const distanceFromWindowEdge = 60;
		const bottomScrollPoint = window.scrollY + window.innerHeight - itemHeight - distanceFromWindowEdge;
		const topScrollPoint = window.scrollY + distanceFromWindowEdge;
		if (pos.y > bottomScrollPoint) window.scrollTo(0, window.scrollY + scrollSpeed);
		if (pos.y < topScrollPoint) window.scrollTo(0, window.scrollY - scrollSpeed);
	}
	_updatePosition(pos) {
		const el = this._dragContext.item.firstElementChild;
		el.style.setProperty("top", `${pos.y - window.scrollY}px`);
		el.style.setProperty("left", `${pos.x}px`);
		this._scrollOnDrag(pos);
	}
	_onDropEvent() {
		if (this.dragging) this._stopDragging();
	}
	/**
	* Initiates dragging, register events handlers, sets up styling and attributes and calculates initial position.
	* @param {DragContext} context the dragging context
	* @param {Event} startEvent the event that initiated the dragging, used to calculate mosue position
	*/
	_startDragging(context, startEvent) {
		const { list, item } = context;
		this._dragContext = context;
		dropEvents.forEach((name) => {
			window.addEventListener(name, this._onDropEvent);
		});
		moveEvents.forEach((name) => {
			window.addEventListener(name, this._onMoveEvent);
		});
		window.addEventListener("contextmenu", cancelEvent, true);
		this._dragContext.itemRect = item.getBoundingClientRect();
		const marginBottom = getComputedStyle(item).marginBottom;
		this._dragContext.originalMarginBottom = marginBottom;
		item.style.marginBottom = marginBottom;
		item.firstElementChild.style.margin = "0";
		[item, item.firstElementChild].forEach((element) => {
			element.style.setProperty("height", `${this._dragContext.itemRect.height}px`);
			element.style.setProperty("width", `${this._dragContext.itemRect.width}px`);
		});
		const mousePos = getMousePosition(startEvent);
		this._dragContext.relativeStartPos = getRelativeMousePosition(item, mousePos);
		const nextDraggedPos = getNextDraggedItemPosition(mousePos, this._dragContext.relativeStartPos);
		this._updatePosition(nextDraggedPos);
		list.setAttribute("dragging", "");
		item.setAttribute("dragged", "");
		list.dispatchEvent(new CustomEvent("sortable-list-drag-started", { bubbles: true }));
	}
	/**
	* Stops dragging. Removes event listeners and cleans up attributes.
	*/
	_stopDragging() {
		if (!this.dragging) return;
		const { list, item } = this._dragContext;
		list.removeAttribute("dragging");
		item.removeAttribute("dragged");
		[item, item.firstElementChild].forEach((el) => {
			[
				"top",
				"left",
				"width",
				"height"
			].forEach((prop) => {
				el.style.removeProperty(prop);
			});
		});
		this._dragContext = void 0;
		dropEvents.forEach((name) => {
			window.removeEventListener(name, this._onDropEvent);
		});
		moveEvents.forEach((name) => {
			window.removeEventListener(name, this._onMoveEvent);
		});
		window.removeEventListener("contextmenu", cancelEvent, true);
		list.dispatchEvent(new CustomEvent("sortable-list-drag-stopped", { bubbles: true }));
	}
	/**
	* Handles a drag move (mouse/touch move) event. Updates the dragged item to the new
	* position, and calculates the new index of the item. If it was dragged to a new index,
	* the container is notified to update the data source.
	*
	* Calls to this method are debounced.
	*
	* @param {MouseEvent | TouchEvent} event the event which initiated the move
	*/
	_onMoveEventSync(event) {
		if (this._dragContext) {
			const { list, item, relativeStartPos, itemRect } = this._dragContext;
			const mousePos = getMousePosition(event);
			const nextDraggedPos = getNextDraggedItemPosition(mousePos, relativeStartPos);
			this._updatePosition(nextDraggedPos);
			const items = list.querySelectorAll("[sortable-dragged-item-container]");
			const currentIndex = Array.prototype.indexOf.call(items, item);
			const nextIndex = getDraggedItemIndex(list, items, itemRect, mousePos);
			if (currentIndex !== nextIndex) list.dispatchEvent(new CustomEvent("sortable-list-order-changed", {
				bubbles: true,
				detail: {
					currentIndex,
					nextIndex
				}
			}));
		}
	}
};
//#endregion
export { sortableListStyles as n, SortableListMixin as t };
