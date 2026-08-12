import { A as i, I as i$1, P as b, s as bg5, t as when, v as header, x as main5 } from "./CY602n9t.js";
import "./vIOCOudq.js";
import "./ntwYzdyv.js";
import { a as iosShare, i as iosSave } from "./CEyrKUT7.js";
import { t as inlay } from "./Ue9OS-EJ.js";
import { t as button } from "./CbFrBy7s.js";
import "./CXEVaKnf2.js";
import "./B1OborLG.js";
//#region src/pages/info.js
var BotcInfo = class extends i {
	static styles = [
		button,
		inlay,
		header,
		i$1`
      :host {
        display: block;
        padding: 16px;
      }

      botc-disclosure {
        background-color: ${bg5};
      }

      botc-disclosure::part(button) {
        padding-top: 16px;
        padding-bottom: 16px;
      }

      h2 {
        font-family: "Balgruf";
        font-size: 1.375rem;
        color: ${main5};
        text-shadow: 1px 1px 2px rgba(0, 0, 0, 1);
        margin-top: 0;
      }

      svg {
        fill: ${main5};
      }

      .ios-header {
        margin-top: 32px;
      }

      .no-margin {
        margin-top: 0;
      }

      div[ui-inlay][slot="detail"] div.info {
        font-size: 1rem !important;
      }
    `
	];
	connectedCallback() {
		super.connectedCallback();
	}
	async handlePrompt(e) {
		e.preventDefault();
		window?.deferredPrompt?.prompt?.();
		const { outcome } = await window.deferredPrompt.userChoice;
		if (outcome === "accepted") window.deferredPrompt = null;
	}
	render() {
		const isNotInstalled = !window.matchMedia("(display-mode: standalone)").matches;
		return b`
      <botc-back-button href="/menu"></botc-back-button>

      <h1 header>Info</h1>
      <botc-card label="">
        <botc-disclosure>
          <div slot="label">Install the app</div>
          <div class="install" ui-inlay slot="detail">
            <div class="info">
              ${when(isNotInstalled && !!window?.deferredPrompt, () => b`
                  <h2 class="android">Android</h2>
                  <p>For Android, click the install button:</p>
                  <button ui-button primary @click=${this.handlePrompt}>
                    Install
                  </button>
                `)}
              <h2
                class="ios-header ${!(isNotInstalled && !!window?.deferredPrompt) ? "no-margin" : ""}"
              >
                iOS
              </h2>
              <p>For iOS, follow these steps in the <b>Safari</b> browser:</p>
              <ul class="ios-instructions">
                <li class="ios">
                  ${iosShare} <span>Press the <b>share</b> button</span>
                </li>
                <li class="ios">
                  ${iosSave}
                  <span
                    >Scroll down and find the
                    <b>Add to homescreen</b> button</span
                  >
                </li>
              </ul>
            </div>
          </div>
        </botc-disclosure>
        <botc-disclosure>
          <div slot="label">Bug reports/feature requests</div>
          <div ui-inlay slot="detail">
            <div class="info">
              You can reach out to me on
              <a href="https://discord.gg/aKNjG98w9S" target="_blank"
                >Discord</a
              >
              if you run into any bugs or would like to request a feature.
            </div>
          </div>
        </botc-disclosure>
        <botc-disclosure>
          <div slot="label">Importing game data from the official app</div>
          <div ui-inlay slot="detail">
            <div class="info">
              <p>
                You can import game data from the official app by installing a
                Chrome extension called
                <a
                  href="https://chromewebstore.google.com/detail/the-grim-extension/pjjicncnilodbeiebkmicfehpmabafdj"
                  >"The Grim Extension"</a
                >. At any point during a game, (or for the best results; during
                the Grim Reveal) you can click the extension icon in your
                browser to make a QR code appear.
              </p>
              <p>
                You can then, in the Grim app, go to the <b>settings</b> menu,
                click on <b>stats</b> and then click the
                <b>import from official app</b> button to scan that QR code.
              </p>
              <p>
                The game data from the official app will be imported into the
                Grim app, and you can then use the Grim app to view your game
                stats.
              </p>
              <p>
                You can also import game data from
                <a href="https://botc.games">Digital Grimoire</a> by clicking
                <b>Game</b> and then <b>Export</b> (Thanks to Gareth), as well
                as from
                <a href="https://pocketgrimoire.co.uk">Pocket Grimoire</a>
                (Thanks to Skateside).
              </p>
            </div>
          </div>
        </botc-disclosure>
        <botc-disclosure>
          <div slot="label">Troubleshooting</div>
          <div ui-inlay slot="detail">
            <div class="info">
              If you're running into issues with the app, please try to nuke the
              game state. You can find this under the <b>settings</b> menu,
              <b>danger zone</b>, <b>nuke game state</b>. If the issue persists,
              please reach out to me on
              <a href="https://discord.gg/aKNjG98w9S" target="_blank">Discord</a
              >.
            </div>
          </div>
        </botc-disclosure>
        <botc-disclosure>
          <div slot="label">Contact</div>
          <div ui-inlay slot="detail">
            <div class="info">
              You can reach out to me on
              <a href="https://discord.gg/aKNjG98w9S" target="_blank">Discord</a
              >.
            </div>
          </div>
        </botc-disclosure>
        <botc-disclosure>
          <div slot="label">Data storage</div>
          <div ui-inlay slot="detail">
            <div class="info">
              When the user is not logged in, all data is stored locally on the
              device. If a user has logged in (on the settings page), their
              games will be synced and backed up in a database, to make sure
              games don't get lost, and to make the game data transferable
              between devices.
            </div>
          </div>
        </botc-disclosure>
        <botc-disclosure>
          <div slot="label">Disclaimer</div>
          <div ui-inlay slot="detail">
            <div class="info">
              <div>
                This project is not affiliated with The Pandemonium Institute.
                All roles, content are the property of Steven Medway and The
                Pandemonium Institute.
              </div>
              <br />
              <div>
                This app is free of use, and will always be free of use. This
                app was made for fun as a hobby project. I hope you find it
                useful, and enjoy it.
              </div>
            </div>
          </div>
        </botc-disclosure>
      </botc-card>
    `;
	}
};
customElements.define("botc-info", BotcInfo);
//#endregion
export { BotcInfo };
