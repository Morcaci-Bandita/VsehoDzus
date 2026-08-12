import { A as i, C as spacer12, D as spacer40, I as i$1, P as b, S as neutral, f as border, g as elevation4, p as borderRadius, s as bg5, t as when, x as main5 } from "./CY602n9t.js";
//#region src/components/botc-card.js
var BotcCard = class extends i {
	static properties = { label: { type: String } };
	static styles = i$1`
    :host {
      display: block;
      background-color: ${bg5};
      border-radius: ${borderRadius};
      border: solid 1px ${border};
      margin-bottom: ${spacer40};
      color: ${neutral};
      ${elevation4()}
    }

    header {
      display: flex;
      align-items: center;
      border-bottom: solid 1px ${border};
    }

    h3 {
      flex: 1;
      font-weight: 700;
      color: ${main5};
      margin: 0;
      font-size: 1rem;
    }

    header,
    .body {
      padding: ${spacer12};
    }
  `;
	render() {
		return b`
      <article>
        ${when(this.label, () => b` <header>
              <h3>${this.label}</h3>
              <slot name="icon"></slot>
            </header>`)}
        <div class="body">
          <slot></slot>
        </div>
      </article>
    `;
	}
};
customElements.define("botc-card", BotcCard);
//#endregion
