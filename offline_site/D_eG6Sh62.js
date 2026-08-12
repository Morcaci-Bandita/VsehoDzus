import { A as i, I as i$1, P as b, x as main5 } from "./CY602n9t.js";
import { a as timer, r as state } from "./CP0hEE1l.js";
import { D as plus, T as minus } from "./CEyrKUT7.js";
import { t as button } from "./CbFrBy7s.js";
import { t as iconButton } from "./C0jyJKsx.js";
import { t as dialog } from "./Dm27KaR0.js";
import { t as input } from "./_hTQLwBE.js";
//#region src/components/dialog/timer.js
var BotcTimer = class extends i {
	static properties = {
		duration: { type: Number },
		remaining: { type: Number },
		intervalId: { type: Number }
	};
	static styles = [
		button,
		iconButton,
		input,
		i$1`
      :host {
        display: flex;
        flex-direction: column;
        height: 100%;
      }
      .plus-minus-btns {
        display: flex;
        align-items: center;
        flex: 1;
      }

      .plus-minus-btns .duration {
        flex: 1;
        text-align: center;
      }

      .balgruf {
        text-align: center;
        font-size: 5rem;
        font-family: "Balgruf";
        color: ${main5};
        text-shadow: 1px 1px 2px rgba(0, 0, 0, 1);
        margin: 0;
        margin-top: 60px;
        margin-bottom: 80px;
      }

      .timer-running button[ui-button] {
        display: flex;
        justify-content: center;
        align-items: center;
      }

      .init {
        flex-direction: row;
        flex: 1;
        display: flex;
        justify-content: center;
        align-items: center;
        gap: 32px;
      }

      .min {
        font-family: "Poppins";
        font-size: 1rem;
        color: white;
      }

      .init .countdown {
        display: flex;
        flex-direction: column;
        align-items: center;
      }

      button[ui-icon-button] {
        width: 80px;
        height: 80px;
        display: flex;
        justify-content: center;
        align-items: center;
      }
      button[ui-icon-button] svg {
        width: 40px;
        height: 40px;
      }
    `
	];
	constructor() {
		super();
		this.duration = Math.ceil(state.getState().currentGame?.players?.filter((p) => !p.dead)?.length / 2) || 0;
		this.remaining = 0;
		this.intervalId = null;
	}
	connectedCallback() {
		super.connectedCallback();
		this._maybeStartInterval();
		timer.addEventListener("state-changed", () => {
			this.requestUpdate();
		});
	}
	disconnectedCallback() {
		super.disconnectedCallback();
		this._clearInterval();
	}
	_maybeStartInterval() {
		const t = timer.getState();
		if (t.started && t.endsAt) {
			if (timer.interval) {
				clearInterval(timer.interval);
				timer.interval = null;
			}
			this._updateTimerState();
			timer.interval = setInterval(() => {
				this._updateTimerState();
			}, 800);
		}
	}
	_clearInterval() {
		if (this.intervalId) {
			clearInterval(this.intervalId);
			this.intervalId = null;
		}
	}
	_updateRemaining() {
		const t = timer.getState();
		if (!t.started || !t.endsAt) {
			this.remaining = 0;
			this._clearInterval();
			return;
		}
		const now = /* @__PURE__ */ new Date();
		const endsAt = new Date(t.endsAt);
		const diff = Math.max(0, Math.floor((endsAt - now) / 1e3));
		this.remaining = diff;
		if (diff <= 0) {
			timer.setState((state) => ({
				...state,
				finished: true,
				started: false
			}));
			this._clearInterval();
		}
	}
	_restartTimer() {
		const now = /* @__PURE__ */ new Date();
		const durationMs = timer.getState().duration * 60 * 1e3;
		timer.setState((state) => ({
			...state,
			started: true,
			finished: false,
			startedAt: now,
			endsAt: new Date(now.getTime() + durationMs)
		}));
		this._maybeStartInterval();
	}
	_endTimer() {
		timer.setState((state) => ({
			...state,
			started: false,
			finished: true,
			endsAt: null,
			remaining: 0,
			formatted: "0:00"
		}));
		if (timer.interval) {
			clearInterval(timer.interval);
			timer.interval = null;
		}
		this._clearInterval();
		this.requestUpdate();
	}
	_updateTimerState() {
		const t = timer.getState();
		if (!t.started || !t.endsAt) {
			if (timer.interval) {
				clearInterval(timer.interval);
				timer.interval = null;
			}
			timer.setState((state) => ({
				...state,
				remaining: 0,
				formatted: "0:00"
			}));
			return;
		}
		const now = /* @__PURE__ */ new Date();
		const endsAt = new Date(t.endsAt);
		const diff = Math.max(0, Math.floor((endsAt.getTime() - now.getTime()) / 1e3));
		const minutes = Math.floor(diff / 60);
		const seconds = String(diff % 60).padStart(2, "0");
		timer.setState((state) => ({
			...state,
			remaining: diff,
			formatted: `${minutes}:${seconds}`
		}));
		if (diff <= 0) {
			timer.setState((state) => ({
				...state,
				finished: true,
				started: false
			}));
			alert("Everybody back to town!");
			if (timer.interval) {
				clearInterval(timer.interval);
				timer.interval = null;
			}
		}
	}
	render() {
		const t = timer.getState();
		if (t.started && t.endsAt) return b`
        <div class="timer-running">
          <div class="countdown balgruf">${t.formatted || "0:00"}</div>
          <div class="timer-actions">
            <button ui-button primary @click=${() => this._restartTimer()}>
              Restart
            </button>
            <button ui-button primary @click=${() => this._endTimer()}>
              Stop
            </button>
          </div>
        </div>
      `;
		return b`
      <div class="plus-minus-btns">
        <div class="timer-running init">
          <button
            ?disabled=${this.duration <= 1}
            ui-icon-button
            @click=${() => {
			this.duration = Math.max(1, this.duration - 1);
		}}
          >
            ${minus}
          </button>

          <div class="countdown balgruf">
            <div>${this.duration}</div>
            <div class="min">min</div>
          </div>
          <button
            ui-icon-button
            @click=${() => {
			this.duration = Math.min(15, this.duration + 1);
		}}
          >
            ${plus}
          </button>
        </div>
      </div>
      <button ui-button primary @click=${this.startTimer}>Start timer</button>
    `;
	}
	async startTimer() {
		const now = /* @__PURE__ */ new Date();
		const durationMs = this.duration * 60 * 1e3;
		timer.setState((state) => ({
			...state,
			started: true,
			duration: this.duration,
			startedAt: now,
			finished: false,
			endsAt: new Date(now.getTime() + durationMs)
		}));
		this._maybeStartInterval();
		dialog.close();
	}
};
customElements.define("botc-timer", BotcTimer);
//#endregion
export { BotcTimer };
