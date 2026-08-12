import { A as i, D as spacer40, I as i$1, P as b, S as neutral, _ as focus, f as border, g as elevation4, i as bg2, p as borderRadius, s as bg5, t as when, v as header, x as main5 } from "./CY602n9t.js";
import { c as MediaQueryController, r as state, s as BREAKPOINTS } from "./CP0hEE1l.js";
import "./vIOCOudq.js";
import { A as info, G as settings, n as customScript, o as chart, t as customRole } from "./CEyrKUT7.js";
import { t as achievement } from "./4XOd8FAf.js";
import { t as dialog } from "./Dm27KaR0.js";
import { t as context } from "./BgH8Gcb8.js";
import { t as buttonLink } from "./6PngWMwE.js";
//#region src/pages/menu.js
var BotcMenu = class extends i {
	media = new MediaQueryController(this, [BREAKPOINTS.LG.MIN], ({ media, matches }) => {
		switch (media) {
			case BREAKPOINTS.LG.MIN:
				this.mobile = !matches;
				break;
		}
	});
	static properties = { mobile: { type: Boolean } };
	static styles = [header, i$1`
      :host {
        display: flex;
        flex-direction: column;
        height: 100%;
        flex: 1;
        margin-left: 12px;
        margin-right: 12px;
      }

      h1 {
        flex: 1;
      }

      .grid-container {
        align-self: flex-end;
        padding: 12px;
        /* margin-top: 35%; */
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        grid-template-rows: repeat(2, 1fr);
        width: 100%;
        height: 100%;
        box-sizing: border-box;
      }

      .grid-item {
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 1.375rem;
        box-sizing: border-box;
        aspect-ratio: 1 / 1; /* Ensure the items are always square */
      }

      .grid-item:not(:nth-child(2n)) {
        border-right: 1px solid ${border};
      }

      .grid-item:not(:nth-last-child(-n + 2)) {
        border-bottom: 1px solid ${border};
      }

      .grid-item svg {
        width: 50px;
        height: 50px;
        fill: ${main5};
      }

      .inactive svg {
        fill: ${bg2};
      }

      .grid-item span {
        margin-top: 4px;
        font-size: 1rem;
      }

      .icon-container {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
      }

      a {
        text-decoration: none;
        color: inherit;
        -webkit-user-drag: none;
      }

      button {
        all: unset;
      }

      a div,
      button div {
        transition: transform 0.1s ease-in-out;
      }

      a:active div,
      button:not([disabled]):active div {
        transform: scale(0.8);
        transition: transform 0.1s ease-in-out;
      }

      @media (min-width: 840px) {
        h1 {
          flex: 0;
        }

        .grid-container {
          display: flex;
          height: auto;
          flex-direction: column;
        }

        .grid-item {
          padding: 12px;
          aspect-ratio: unset;
          border: unset !important;
          border-right: unset !important;
          border-bottom: unset !important;
          /* margin-bottom: 12px; */
          justify-content: unset;
        }

        .grid-item:not(:last-child) {
          /* border-bottom: 1px solid ${border}!important; */
        }

        .icon-container {
          display: flex;
          flex-direction: row;
        }

        .icon-container span {
          flex: 1;
          margin-left: 16px;
        }

        button.grid-item:hover,
        button.grid-item:active,
        button.grid-item:focus-visible,
        a.grid-item:hover,
        a.grid-item:active,
        a.grid-item:focus-visible {
          border-radius: 8px;
          border-bottom: unset !important;
          background-color: var(--ui-bg-4);
        }

        button.grid-item.inactive:active,
        button.grid-item.inactive:hover,
        a.grid-item.inactive:active,
        a.grid-item.inactive:hover {
          border-radius: 8px;
          border-bottom: unset !important;
          background-color: var(--ui-bg-5);
        }

        button.grid-item:focus-visible,
        a.grid-item:focus-visible {
          ${focus()}
        }

        .grid-item:empty {
          display: none;
        }

        .grid-container {
          border: 1px solid ${border};
          background: ${bg2};
          background-color: ${bg5};
          border-radius: ${borderRadius};
          border: solid 1px ${border};
          margin-bottom: ${spacer40};
          color: ${neutral};
          ${elevation4()}
        }
      }

      /* Tablet layout - keep original border style */
      @media (min-width: 600px) and (max-width: 839px) {
        .grid-container {
          gap: 0; /* Remove any grid gap */
        }

        .grid-item {
          margin: 0; /* Remove any margins */
          padding: 0; /* Reset padding, add it back inside */
          box-sizing: border-box; /* Ensure borders are included in dimensions */
        }
        .grid-container {
          max-width: 420px;
          margin: 0 auto;
          padding: 12px;
          /* Use fixed column sizes instead of 1fr to prevent gaps */
          display: grid;
          grid-template-columns: repeat(2, 190px);
          grid-template-rows: repeat(2, 190px);
          justify-content: center; /* Center the grid */
        }

        .grid-item {
          /* Remove max-width/height since grid cells are now fixed size */
          width: 100%;
          height: 100%;
          padding: 12px; /* Add padding back for content spacing */
        }

        /* Reinstate the original border logic */
        .grid-item:not(:nth-child(2n)) {
          border-right: 1px solid ${border};
        }

        .grid-item:not(:nth-last-child(-n + 2)) {
          border-bottom: 1px solid ${border};
        }
      }
    `];
	incrementDay() {
		state.setState((s) => ({
			...s,
			currentGame: {
				...s.currentGame,
				day: s.currentGame.day + 1
			}
		}));
		dialog.open({ id: "incrementDay" });
	}
	nomination() {
		dialog.open({ id: "nomination" });
	}
	conversation() {
		dialog.open({ id: "conversation" });
	}
	render() {
		return b`
      <h1 header>Menu</h1>
      <div class="grid-container">
        <a class="grid-item" href="/achievements">
          <div class="icon-container">
            ${achievement}
            <span>Achievements</span>
          </div>
        </a>
        ${when(this.mobile, () => b`
            <button
              ${context(dialog, () => b` <botc-stats-buttons></botc-stats-buttons> `)}
              class="grid-item"
            >
              <div class="icon-container">
                ${chart}
                <span>Stats</span>
              </div>
            </button>
          `, () => b`
            <a class="grid-item" href="/stats">
              <div class="icon-container">
                ${chart}
                <span>Stats</span>
              </div>
            </a>
          `)}
        ${when(this.mobile, () => b`<a class="grid-item" href="/scripts">
              <div class="icon-container">
                ${customScript}
                <span>Homebrew scripts</span>
              </div>
            </a> `)}
        ${when(this.mobile, () => b`
            <a class="grid-item" href="/homebrew-roles">
              <div class="icon-container">
                ${customRole}
                <span>Homebrew Roles</span>
              </div>
            </a>
          `)}
        <a class="grid-item" href="/info">
          <div class="icon-container">
            ${info}
            <span>Info</span>
          </div>
        </a>
        <a class="grid-item" href="/settings">
          <div class="icon-container">
            ${settings}
            <span>Settings</span>
          </div>
        </a>
      </div>
    `;
	}
};
customElements.define("botc-menu", BotcMenu);
var BotcStatsButtons = class extends i {
	static styles = [buttonLink];
	render() {
		return b`
      <a ui-button-link secondary href="/stats" @click=${() => dialog.close()}>
        Personal stats
      </a>
      <a
        ui-button-link
        secondary
        href="/global-stats"
        @click=${() => dialog.close()}
      >
        Global stats
      </a>
    `;
	}
};
customElements.define("botc-stats-buttons", BotcStatsButtons);
//#endregion
export { BotcMenu };
