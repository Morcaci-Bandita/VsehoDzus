import { A as i, I as i$1, L as r, P as b, _ as focus, o as bg4, t as when, x as main5 } from "./CY602n9t.js";
import { r as state } from "./CP0hEE1l.js";
import { o as waitUntil } from "./vIOCOudq.js";
import "./GnpzsBGp.js";
import { t as button } from "./CbFrBy7s.js";
import { t as dialog } from "./Dm27KaR0.js";
import { t as input } from "./_hTQLwBE.js";
import { t as visuallyHidden } from "./DZ8S2RMZ.js";
import { t as select } from "./C-op7emD.js";
//#region src/components/dialog/player-select.js
var BotcPlayerSelect = class extends i {
	static styles = [
		button,
		select,
		input,
		i$1`
      ${r(visuallyHidden)}

      ul {
        list-style: none;
        padding: 0;
      }

      h2 {
        font-family: "Balgruf";
        font-size: 1.375rem;
        color: ${main5};
        text-shadow: 1px 1px 2px rgba(0, 0, 0, 1);
        margin: 0;
      }

      .txt {
        margin-top: 12px;
        margin-bottom: 12px;
      }

      ul li:has(input:focus-visible:not(:checked)) botc-player-details {
        background: ${bg4};
      }
      ul li:has(input:focus-visible) botc-player-details {
        ${focus()}
      }
    `
	];
	constructor() {
		super();
		this.selected = [];
		this.multiple = false;
		this.dimUsedDeadVotes = false;
		this.aliveOnly = false;
		this.deadOnly = false;
		this.maxSelect = Infinity;
		this.players = state.getState().currentGame.players;
		this.text = "";
		this.showNightOrder = false;
		this.hideGrim = false;
		this.autoScroll = true;
	}
	connectedCallback() {
		super.connectedCallback();
		dialog.setReturnValue(this.selected);
	}
	static properties = {
		hideGrim: { type: Boolean },
		selected: { type: Array },
		multiple: { type: Boolean },
		aliveOnly: { type: Boolean },
		deadOnly: { type: Boolean },
		maxSelect: { type: Number },
		players: { type: Array },
		text: { type: String },
		showNightOrder: { type: Boolean },
		dimUsedDeadVotes: { type: Boolean },
		autoScroll: { type: Boolean }
	};
	async firstUpdated() {
		if (this.selected.length && this.autoScroll) {
			await waitUntil(() => this.shadowRoot.querySelectorAll("input").length);
			const items = this.shadowRoot.querySelectorAll("input");
			if (items.length) requestAnimationFrame(() => {
				const found = [...items].find((li) => this.selected.some((selected) => li.dataset.id === selected.id));
				if (found) found.parentElement.scrollIntoView({
					behavior: "instant",
					block: "center"
				});
			});
		}
	}
	render() {
		let players = this.players;
		if (this.aliveOnly) players = players.filter((player) => !player.dead);
		if (this.deadOnly) players = players.filter((player) => player.dead);
		if (this.filterFn) players = players.filter(this.filterFn);
		if (this.sortFn) players = [...players].sort(this.sortFn);
		return b`
      ${when(this.text, () => b` <div class="txt">${this.text}</div> `)}
      <ul>
        ${players.map((player, i) => {
			const selected = this.selected.find((p) => p.id === player.id);
			const disableBecauseDeadVote = this.dimUsedDeadVotes && player.dead && !player.dead?.hasDeadVote;
			return b`
            <li>
              <input
                ?checked=${selected}
                @input=${(e) => this.handleSelection(e, player)}
                visually-hidden
                id=${i}
                data-id=${player.id}
                type="checkbox"
                ?disabled=${!selected && this.selected.length >= this.maxSelect || disableBecauseDeadVote}
              />
              <label for=${i} class="role">
                <botc-player-details
                  .dimUsedDeadVote=${disableBecauseDeadVote}
                  .hideGrim=${this.hideGrim}
                  .showNightOrder=${this.showNightOrder}
                  ?selected=${selected}
                  .player=${player}
                  .readOnly=${true}
                ></botc-player-details>
              </label>
            </li>
          `;
		})}
      </ul>
    `;
	}
	handleSelection(event, player) {
		if (this.multiple) if (event.target.checked) {
			if (this.selected.length < this.maxSelect) this.selected = [...this.selected, player];
		} else this.selected = this.selected.filter((p) => p.id !== player.id);
		else {
			if (event.target.checked) this.selected = [player];
			else this.selected = [];
			this.shadowRoot.querySelectorAll("input[type=\"checkbox\"]").forEach((input) => {
				if (input.dataset.id !== player.id) input.checked = false;
			});
		}
		this.dispatchEvent(new SelectionChangedEvent(this.selected));
		dialog.setReturnValue(this.selected);
		this.requestUpdate();
	}
};
var SelectionChangedEvent = class extends Event {
	constructor(selection) {
		super("selection-changed");
		this.selection = selection;
	}
};
customElements.define("botc-player-select", BotcPlayerSelect);
//#endregion
export { BotcPlayerSelect as t };
