import { A as i, I as i$1, P as b, d as bg9, t as when, u as bg8, v as header } from "./CY602n9t.js";
import { b as img, r as state } from "./CP0hEE1l.js";
import "./vIOCOudq.js";
import "./ntwYzdyv.js";
import { t as inlay } from "./Ue9OS-EJ.js";
import { t as button } from "./CbFrBy7s.js";
import { t as dialog } from "./Dm27KaR0.js";
import { t as select } from "./C-op7emD.js";
import "./CXEVaKnf2.js";
import "./B1OborLG.js";
//#region src/pages/demon-bluffs.js
var BotcDemonBluffs = class extends i {
	static styles = [
		button,
		inlay,
		header,
		select,
		i$1`
      :host {
        display: block;
        padding: 16px;
      }

      .demon-bluffs {
        display: flex;
        justify-content: space-evenly;
      }

      .bluff {
        display: flex;
        flex-direction: column;
        align-items: center;
        min-width: 5rem;
      }

      .demon-bluffs p {
        margin-bottom: 0;
      }

      .bluff img {
        margin: 0;
        border: solid 2px #45a0f1;
      }

      .bluff-title {
        text-align: center;
      }

      .bluff::not(:last-child) {
        margin-right: 16px;
      }

      img {
        margin-right: 20px;
        width: 50px;
        height: 50px;
        border-radius: 50%;
        border: solid 2px ${bg9};
        background-color: ${bg8};
      }

      img.blue {
        border: solid 2px #45a0f1;
      }

      #addBluffs {
        margin-top: 24px;
      }
    `
	];
	connectedCallback() {
		super.connectedCallback();
		state.addEventListener("state-changed", () => {
			this.requestUpdate();
		});
	}
	render() {
		return b`
      <botc-back-button href="/actions"></botc-back-button>
      <h1 header>Demon bluffs</h1>
      ${when(state.getState()?.currentGame?.demonBluffs?.length, () => b`
          <div class="demon-bluffs" ui-inlay slot="detail">
            ${state.getState().currentGame.demonBluffs.map((role) => b`
                <div class="bluff">
                  <img
                    class="blue"
                    src="${img(role)}"
                    alt="${role.humanReadableRole}"
                  />
                  <div class="bluff-title">
                    <p>${role.humanReadableRole}</p>
                  </div>
                </div>
              `)}
          </div>
        `)}
      <button
        id="addBluffs"
        ui-button
        primary
        @click=${() => dialog.open({ id: "demonBluffs" })}
      >
        Add bluffs
      </button>
    `;
	}
};
customElements.define("botc-demon-bluffs", BotcDemonBluffs);
//#endregion
export { BotcDemonBluffs };
