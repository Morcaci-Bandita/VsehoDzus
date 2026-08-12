import { A as i, I as i$1, P as b } from "./CY602n9t.js";
import { t as error } from "./BnMAryrf.js";
//#region src/components/botc-scan-qr.js
var BotcScanQr = class extends i {
	static styles = [error, i$1`
      video {
        width: 100%;
        border-radius: 8px;
      }
    `];
	constructor() {
		super();
		this.localStream = null;
		this.barcodeDetector = null;
		this.decoding = false;
		this.interval = null;
	}
	async connectedCallback() {
		super.connectedCallback();
		if ("BarcodeDetector" in window) this.barcodeDetector = new window.BarcodeDetector();
		else {
			const polyfill = await import("./tgNKwOeF.js");
			this.barcodeDetector = new polyfill.BarcodeDetectorPolyfill();
		}
	}
	render() {
		return b`
      <div>
        <video
          class="camera"
          autoplay
          muted
          playsinline
          @loadeddata="${this.onPlayed}"
        ></video>
      </div>
    `;
	}
	firstUpdated() {
		this.play();
	}
	disconnectedCallback() {
		super.disconnectedCallback();
		this.stop();
	}
	async play() {
		this.stop();
		try {
			const stream = await navigator.mediaDevices.getUserMedia({
				video: { facingMode: { ideal: "environment" } },
				audio: false
			});
			this.localStream = stream;
			const video = this.renderRoot.querySelector(".camera");
			video.srcObject = stream;
		} catch (err) {
			console.error("getUserMediaError", err);
		}
	}
	stop() {
		clearInterval(this.interval);
		if (this.localStream) this.localStream.getTracks().forEach((track) => track.stop());
	}
	onPlayed() {
		this.startDecoding();
	}
	startDecoding() {
		clearInterval(this.interval);
		this.interval = setInterval(() => this.decode(), 40);
	}
	async decode() {
		if (!this.decoding && this.barcodeDetector) {
			const video = this.renderRoot.querySelector(".camera");
			this.decoding = true;
			const barcodes = await this.barcodeDetector.detect(video);
			this.decoding = false;
			if (barcodes.length > 0) {
				this.stop();
				this.dispatchEvent(new CustomEvent("qr-detected", {
					detail: barcodes,
					bubbles: true,
					composed: true
				}));
			}
		}
	}
};
customElements.define("botc-scan-qr", BotcScanQr);
//#endregion
