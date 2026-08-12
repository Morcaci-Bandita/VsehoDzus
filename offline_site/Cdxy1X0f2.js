import { A as i, I as i$1, P as b } from "./CY602n9t.js";
import { E as arrowDown } from "./CEyrKUT7.js";
import { t as inlay } from "./Ue9OS-EJ.js";
import "./GnpzsBGp.js";
import { t as button } from "./CbFrBy7s.js";
import { t as input } from "./_hTQLwBE.js";
//#region src/components/dialog/speech-recognition-result.js
var BotcSpeechRecognitionResult = class extends i {
	static properties = {
		old: { type: Object },
		new: { type: Object },
		transcription: { type: String }
	};
	constructor() {
		super();
		this.old = void 0;
		this.new = void 0;
		this.transcription = "";
	}
	async connectedCallback() {
		super.connectedCallback();
	}
	static styles = [
		button,
		inlay,
		input,
		i$1`
      botc-player-details {
        margin: 0;
      }

      .arrow {
        display: flex;
        justify-content: center;
        margin-top: 16px;
        margin-bottom: 16px;
      }

      .transcription {
        font-style: italic;
        margin-bottom: 16px;
        text-align: center;
      }

      .transcript {
        font-size: 0.85rem;
        margin-bottom: 8px;
        text-align: center;
        margin-top: 24px;
      }
    `
	];
	render() {
		if (!this.old || !this.new) return b`<botc-spinner></botc-spinner>`;
		return b`
      <div class="transcript">Transcript:</div>
      <div class="transcription" ui-inlay>"${this.transcription}"</div>
      <botc-player-details
        style="margin-top: 40px;"
        .player=${this.old}
      ></botc-player-details>
      <div class="arrow">${arrowDown}</div>
      <botc-player-details .player=${this.new}></botc-player-details>
    `;
	}
};
customElements.define("botc-speech-recognition-result", BotcSpeechRecognitionResult);
//#endregion
export { BotcSpeechRecognitionResult };
