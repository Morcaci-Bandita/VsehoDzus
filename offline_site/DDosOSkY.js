import { A as i, D as spacer40, I as i$1, P as b, S as neutral, _ as focus, f as border, g as elevation4, i as bg2, p as borderRadius, s as bg5, t as when, v as header, x as main5 } from "./CY602n9t.js";
import { n as settings, r as state } from "./CP0hEE1l.js";
import "./vIOCOudq.js";
import { t as o } from "./BAPyi3WL.js";
import { S as nomination, f as roles, r as nightOrder, x as conversation, y as cards, z as deadVote } from "./CEyrKUT7.js";
import { n as moon } from "./C15Vso4Y.js";
import { t as dialog } from "./Dm27KaR0.js";
//#region src/icons/bluffs.svg.js
const bluffs = b`<svg
  xmlns="http://www.w3.org/2000/svg"
  height="24px"
  viewBox="0 -960 960 960"
  width="24px"
  fill="#e3e3e3"
>
  <path
    d="M40-200v-120q0-34 23.5-57t56.5-23h131q20 0 38 10t29 27q29 39 71.5 61t90.5 22q49 0 91.5-22t70.5-61q13-17 30.5-27t36.5-10h131q34 0 57 23t23 57v120q0 17-11.5 28.5T880-160H680q-17 0-28.5-11.5T640-200v-51q-35 25-75.5 38T480-200q-43 0-84-13.5T320-252v52q0 17-11.5 28.5T280-160H80q-17 0-28.5-11.5T40-200Zm440-120q-38 0-72-17.5T351-386q-17-25-42.5-39.5T253-440q22-37 93-58.5T480-520q63 0 134 21.5t93 58.5q-29 0-55 14.5T609-386q-22 32-56 49t-73 17ZM160-440q-50 0-85-35t-35-85q0-51 35-85.5t85-34.5q51 0 85.5 34.5T280-560q0 50-34.5 85T160-440Zm640 0q-50 0-85-35t-35-85q0-51 35-85.5t85-34.5q51 0 85.5 34.5T920-560q0 50-34.5 85T800-440ZM480-560q-50 0-85-35t-35-85q0-51 35-85.5t85-34.5q51 0 85.5 34.5T600-680q0 50-34.5 85T480-560Z"
  />
</svg>`;
//#endregion
//#region src/pages/actions.js
var BotcActions = class extends i {
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

        button.grid-item.inactive:hover,
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
      button.grid-item:focus-visible,
      a.grid-item:focus-visible {
        ${focus()}
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
		dialog.open({
			id: "flow",
			parameters: { flow: { id: "nomination" } }
		});
	}
	conversation() {
		dialog.open({ id: "conversation" });
	}
	render() {
		const inactive = !state.getState().currentGame;
		const stMode = state.getState()?.currentGame?.stMode;
		const gameState = state.getState()?.currentGame?.state;
		return b`
      <h1 header>Actions</h1>
      <div class="grid-container">
        <a
          href="${o(inactive || gameState === "finished" || gameState === "bag-selection" || settings.getState().hideGrim ? void 0 : "/demon-bluffs")}"
          class="grid-item ${inactive || gameState === "finished" || gameState === "bag-selection" || settings.getState().hideGrim ? "inactive" : ""}"
        >
          <div class="icon-container">
            ${bluffs}
            <span>Demon bluffs</span>
          </div>
        </a>
        ${stMode ? b`` : b`
                <button
                  ?disabled=${inactive || gameState === "finished" || gameState === "bag-selection"}
                  @click=${this.incrementDay}
                  class="grid-item ${inactive || gameState === "finished" || gameState === "bag-selection" ? "inactive" : ""}"
                >
                  <div class="icon-container">
                    ${moon}
                    <span>Next day</span>
                  </div>
                </button>
              `}
        ${when(!stMode, () => b`
            <button
              ?disabled=${inactive || !settings.getState().voteTracking}
              @click=${this.nomination}
              class="grid-item ${inactive || !settings.getState().voteTracking ? "inactive" : ""}"
            >
              <div class="icon-container">
                ${nomination}
                <span>Nomination</span>
              </div>
            </button>
            <button
              ?disabled=${inactive || !settings.getState().conversationTracking}
              @click=${this.conversation}
              class="grid-item ${inactive || !settings.getState().conversationTracking ? "inactive" : ""}"
            >
              <div class="icon-container">
                ${conversation}
                <span>Conversation</span>
              </div>
            </button>
          `)}
        ${when(stMode, () => b`
            <a
              href="${o(inactive || gameState === "finished" || gameState === "bag-selection" || settings.getState().hideGrim ? void 0 : "/cards")}"
              class="grid-item ${inactive || gameState === "finished" || gameState === "bag-selection" || settings.getState().hideGrim ? "inactive" : ""}"
            >
              <div class="icon-container">
                ${cards}
                <span>Cards</span>
              </div>
            </a>

            <button
              ?disabled=${inactive || gameState === "bag-selection" || gameState === "finished"}
              @click=${this.nomination}
              class="grid-item ${inactive || gameState === "bag-selection" || gameState === "finished" ? "inactive" : ""}"
            >
              <div class="icon-container">
                ${nomination}
                <span>Nomination</span>
              </div>
            </button>
            <button
              ?disabled=${inactive || gameState === "finished" || gameState === "bag-selection"}
              class="grid-item ${inactive || gameState === "finished" || gameState === "bag-selection" ? "inactive" : ""}"
              @click=${() => dialog.open({ id: "deadVotes" })}
            >
              <div class="icon-container">
                ${deadVote}
                <span>Dead votes</span>
              </div>
            </button>
          `)}
        <a class="grid-item" href="/roles">
          <div class="icon-container">
            ${roles}
            <span>Roles</span>
          </div>
        </a>
        <a href="/nightorder" class="grid-item">
          <div class="icon-container">
            ${nightOrder}
            <span>Night order</span>
          </div>
        </a>
      </div>
    `;
	}
};
customElements.define("botc-actions", BotcActions);
//#endregion
export { BotcActions };
