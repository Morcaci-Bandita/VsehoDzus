import { A as i, I as i$1, P as b, _ as focus, a as bg3, b as main4, d as bg9, f as border, t as when, u as bg8, v as header, x as main5 } from "./CY602n9t.js";
import { D as tooltip, E as saveScript, F as api, M as SCRIPTS_DATA, N as SORT_ORDER, O as transformToSchemaScript, b as img, c as MediaQueryController, d as alignment, m as capitalize, s as BREAKPOINTS, u as Service, w as mapBotcScript } from "./CP0hEE1l.js";
import "./D8HaG3T3.js";
import "./vIOCOudq.js";
import { V as copy, g as iosshare, w as download } from "./CEyrKUT7.js";
import { t as check } from "./BTrKfjJH.js";
import { t as inlay } from "./Ue9OS-EJ.js";
import { t as button } from "./CbFrBy7s.js";
import { t as iconButton } from "./C0jyJKsx.js";
import "./Dm27KaR0.js";
import { t as error } from "./BnMAryrf.js";
import { t as context } from "./BgH8Gcb8.js";
import "./D9Tfud2d2.js";
import "./CXEVaKnf2.js";
import "./D6Dmypk12.js";
import "./B1OborLG.js";
//#region src/pages/almanac.js
var BotcAlmanac = class extends i {
	script = new Service(this, async ({ id, name }) => {
		if (!id && !!name) return {
			script: await SCRIPTS_DATA[decodeURIComponent(name)](),
			name
		};
		else return api.get(`https://www.botcscripts.com/api/scripts/${this.id}/json/`).then((r) => {
			if (Array.isArray(r)) {
				let [{ name, firstNight, otherNight, bootlegger }, ...roles] = r;
				if (!name) name = "Untitled";
				return {
					script: mapBotcScript(roles),
					...bootlegger ? { bootlegger } : {},
					...firstNight ? { firstNight } : {},
					...otherNight ? { otherNight } : {},
					name,
					id: this.id
				};
			} else return {
				...r.bootlegger ? { bootlegger: r.bootlegger } : {},
				script: mapBotcScript(r.content),
				...r.firstNight ? { firstNight: r.firstNight } : {},
				...r.otherNight ? { otherNight: r.otherNight } : {},
				name: r.name,
				id: this.id
			};
		});
	});
	media = new MediaQueryController(this, [BREAKPOINTS.LG.MIN], ({ media, matches }) => {
		switch (media) {
			case BREAKPOINTS.LG.MIN:
				this.mobile = !matches;
				break;
		}
	});
	static properties = {
		mobile: { type: Boolean },
		currentIndex: { type: Number }
	};
	constructor() {
		super();
		this.currentIndex = 0;
		this.sortOrder = SORT_ORDER;
	}
	async connectedCallback() {
		super.connectedCallback();
		this.script.request({
			id: this.id,
			name: this.name
		});
	}
	firstUpdated() {
		this.script.resolved.then(() => {
			this.scrollContainer = this.shadowRoot.querySelector("ul");
			this.scrollContainer.addEventListener("scroll", this._onScroll.bind(this));
		});
	}
	disconnectedCallback() {
		super.disconnectedCallback();
	}
	scrollToHash(id) {
		const el = this.shadowRoot.getElementById(id);
		if (el) el.scrollIntoView({ behavior: "smooth" });
	}
	static styles = [
		button,
		iconButton,
		error,
		inlay,
		header,
		i$1`
      :host {
        flex: 1;
        display: flex;
        flex-direction: column;
        padding-bottom: env(safe-area-inset-bottom);
      }

      .top-btns {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding-left: 16px;
        padding-right: 16px;
        margin-bottom: 8px;
      }

      .content {
        flex: 1;
        display: flex;
        flex-direction: column;
      }

      .navigation {
        display: flex;
        justify-content: space-between;
        padding: 0 16px;
      }

      .content {
        padding: 16px;
        overflow: auto;
      }

      .title-wrapper {
        display: flex;
        justify-content: center;
        align-items: center;
        height: 100%;
        margin-top: 60px;
      }

      .top h1 {
        font-size: 0.9rem;
        text-align: center;
        font-weight: 700;
        color: white;
        margin-top: 0;
        margin-bottom: 0;
      }

      .title {
        word-break: break-word;
        -webkit-hyphens: auto;
        -moz-hyphens: auto;
        -ms-hyphens: auto;
        hyphens: auto;
        line-height: 0.9;
        margin-top: -60px;
        display: flex;
        justify-content: center;
        align-items: center;
        height: 100%;
        max-width: 70%;
        margin-left: auto;
        margin-right: auto;
      }

      a#almanac-link {
        color: var(--ui-main-5);
        display: flex;
        justify-content: center;
        align-items: center;
        text-decoration: none;
      }

      a#almanac-link:hover,
      a#almanac-link:active,
      a#almanac-link:focus-visible {
        text-decoration: underline;
      }

      a#almanac-link:focus-visible {
        outline: none;
        border: none;
      }
      a#almanac-link h1 {
        padding: 8px;
      }
      a#almanac-link:focus-visible h1 {
        ${focus()}
      }

      .reminder {
        text-align: center;
      }

      .desktop-progress {
        padding: 24px;
        width: 300px;
      }

      .desktop-progress ul {
        padding: 16px;
      }

      .desktop-progress h1 {
        /* margin-top: 10px; */
        font-family: "Balgruf";
        font-size: 2rem;
        color: var(--ui-main-5);
        text-shadow: 1px 1px 2px rgba(0, 0, 0, 1);
        line-height: 0.9;
        text-align: center;
        margin-top: 6px;
        margin-bottom: 16px;
      }

      @media (min-width: 840px) {
        :host {
          flex-direction: row;
          max-width: 1120px;
          margin-left: auto;
          overflow-y: auto;
          margin-right: auto;
        }

        .content {
          overflow-y: auto;
          scrollbar-width: none; /* Firefox */
          -ms-overflow-style: none; /* IE 10+ */
        }
        .content::-webkit-scrollbar {
          display: none; /* Chrome, Safari */
        }

        .top-wrapper {
          overflow-y: auto;
          scrollbar-width: none; /* Firefox */
          -ms-overflow-style: none; /* IE 10+ */
          overflow: auto;
          background: var(--ui-bg-7);
        }

        .top-wrapper::-webkit-scrollbar {
          display: none;
        }

        .progress-bar {
          padding: 0;
        }

        .content {
          padding: 38px;
        }

        :host {
          display: grid;
          grid-template-columns: 348px minmax(0, calc(1120px - 348px));
          margin-inline: auto;
          width: 100%;
          max-width: 1120px;
          position: relative;
          --sidebar-width: 348px;
          --max-width: 1120px;
          --left-bg: var(--ui-bg-7);
          --right-bg: var(--ui-bg-6);
        }

        /* background gutters */
        :host::before,
        :host::after {
          content: "";
          position: fixed;
          top: 0;
          bottom: 0;
          pointer-events: none;
          z-index: 0;
        }

        :host::before {
          left: 0;
          right: 50%;
          background: var(--left-bg);
        }

        :host::after {
          left: 50%;
          right: 0;
          background: var(--right-bg);
        }

        /* stack backgrounds correctly */
        .top-wrapper,
        .content {
          position: relative;
          z-index: 1;
          background: var(--right-bg);
        }

        .top-wrapper {
          background: var(--left-bg);
        }

        /*         
.content {
  overflow-y: auto;
  scroll-snap-type: y mandatory;
}

ul.page-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

ul.page-list li {
  scroll-snap-align: start;
  min-height: 100vh;
} */
      }

      .night-order-link,
      .kind ul {
        margin-top: 0;
        margin-bottom: 0;
      }

      .night-order-link li a,
      .kind ul li a {
        color: white;
        text-decoration: none;
      }
      .night-order-link li a:hover,
      .night-order-link li a:focus-visible,
      .night-order-link li a:active,
      .kind ul li a:hover,
      .kind ul li a:focus-visible,
      .kind ul li a:active {
        color: var(--ui-main-5);
        text-decoration: underline;
      }

      .night-order-link li a:focus-visible,
      .kind ul li a:focus-visible {
        ${focus()}
      }

      .role-title {
        display: flex;
        flex-direction: column;
      }

      .role-title p {
        font-family: "Poppins";
        margin-top: 4px;
        margin-bottom: 4px;
        font-weight: 100;
        font-size: 1rem;
      }

      h1 {
        font-family: "Balgruf";
        font-size: 5rem;
        color: ${main5};
        margin-top: 0;
        margin-bottom: 0;
        text-shadow: 1px 1px 2px rgba(0, 0, 0, 1);
        text-align: center;
      }

      h2 {
        font-family: "Balgruf";
        font-size: 1.375rem;
        color: ${main5};
        margin-top: 0;
        margin-bottom: 0;
        text-shadow: 1px 1px 2px rgba(0, 0, 0, 1);
      }

      .content {
        scroll-snap-type: y mandatory;
      }

      ul.page-list {
        list-style: none;
        padding: 0;
        margin: 0;
        scroll-snap-type: y mandatory;
      }

      ul.page-list li.page {
        padding: 48px;
        height: calc(100vh - 176px);
        scroll-snap-align: start;
      }

      li#overview,
      li#night-order {
        overflow: auto;
      }
      li#overview,
      li#night-order {
        overflow-y: auto;
        scrollbar-width: none; /* Firefox */
        -ms-overflow-style: none; /* IE 10+ */
      }
      li#overview::-webkit-scrollbar li#night-order::-webkit-scrollbar {
        display: none; /* Chrome, Safari */
      }
      .night-order {
        display: flex;
      }
      .night-order div {
        flex: 1;
        margin: 12px;
      }

      .night-order h2 {
        text-align: center;
      }

      .big-role {
        width: 40%;
        display: block;
        margin: 0 auto;
        border-radius: 50%;
        background-color: ${bg8};
        margin-bottom: 16px;
      }

      img.big-role.red {
        border: solid 4px #d9403b;
      }
      img.big-role.blue {
        border: solid 4px #45a0f1;
      }

      img.big-role {
        border: solid 4px ${bg9};
      }

      h2.red.role {
        color: #d9403b;
      }
      h2.blue.role {
        color: #45a0f1;
      }
      h2.yellow {
        color: #ffee00;
      }
      h2.green {
        color: #a7e16c;
      }
      img.yellow {
        border: solid 2px #ffee00;
      }
      img.green {
        border: solid 2px #a7e16c;
      }

      h2.role {
        font-family: "Balgruf";
        font-size: 2.5rem;
        text-shadow: 1px 1px 2px rgba(0, 0, 0, 1);
        margin: 0;
        text-align: center;
      }

      .wrapper {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        flex: 1;
        height: calc(100% - 80px);
      }

      button[ui-button][secondary].back-button {
        box-shadow: unset;
        border: unset;
        justify-content: center;
        align-items: center;
        display: flex;
        font-weight: 300;
        color: white;
        fill: white;
        width: unset;
        font-family: "Poppins", sans-serif;
        padding: 8px;
        margin-top: 6px;
      }

      button[ui-button][secondary].back-button svg {
        fill: white;
      }

      button[ui-button][secondary].back-button > *:first-child {
        /* Your styles here */
        margin-right: 6px;
      }

      button[ui-button][secondary].back-button:hover {
        box-shadow: unset;
        border: unset;
      }

      #jinxes {
        overflow-y: auto;
        scrollbar-width: none; /* Firefox */
        -ms-overflow-style: none; /* IE 10+ */
      }
      #jinxes::-webkit-scrollbar {
        display: none; /* Chrome, Safari */
      }

      .jinxes {
      }

      .jinxes h2.jinx-title {
        text-align: center;
        display: block;
        margin-bottom: 32px;
      }

      .jinxes .jinx .jinx-role {
        display: flex;
        align-items: center;
        margin-bottom: 12px;
      }

      .jinxes h2 {
        display: flex;
        color: ${main4};
        font-family: "Balgruf";
        font-size: 1.375rem;
        text-shadow: 1px 1px 2px rgba(0, 0, 0, 1);
      }

      .jinxes img {
        margin-right: 12px;
        width: 50px;
        height: 50px;
        border-radius: 50%;
        border: solid 2px ${bg9};
        background-color: ${bg8};
      }

      .jinxes img.blue {
        border: solid 2px #45a0f1;
      }
      .jinxes h2.blue {
        color: #45a0f1;
      }

      .jinxes img.red {
        border: solid 2px #d9403b;
      }
      .jinxes h2.red {
        color: #d9403b;
      }

      ul.jinx-list {
        list-style: none;
        padding: 8px;
        margin: 0;
      }

      ul.jinx-list li.jinx-item {
        display: flex;
        align-items: center;
        padding-top: 8px;
        padding-bottom: 8px;
      }

      ul.jinx-list li.jinx-item:not(:last-child) {
        border-bottom: solid 1px ${border};
      }

      ul.jinx-list li.jinx-item p.reason {
        font-size: 0.85rem;
        margin-top: 0;
        margin-bottom: 0;
      }

      @media (max-width: 840px) {
        :host {
          height: calc(100vh - calc(125px + env(safe-area-inset-bottom)));
          padding-bottom: calc(60px + env(safe-area-inset-bottom));
        }
        .top h1 {
          font-family: balgruf;
          letter-spacing: -1px;
          font-weight: 600;
          text-align: center;
          font-size: 2rem;
          color: var(--ui-main-4);
          margin-top: 0px;
          text-shadow: rgb(0, 0, 0) 1px 1px 2px;
        }

        .content {
          padding: 0;
          overflow: hidden;
          height: 100%;
        }

        ul.page-list {
          list-style: none;
          padding: 0;
          margin: 0;
          display: flex;
          flex-direction: row;
          overflow-x: auto;
          scroll-snap-type: x mandatory;
          scroll-behavior: smooth;
          width: 100vw;
          height: 100%;
          scrollbar-width: none; /* Firefox */
        }

        ul.page-list::-webkit-scrollbar {
          display: none; /* Chrome/Safari */
        }

        ul.page-list li.page {
          scroll-snap-align: center;
          width: 100vw;
          max-height: 100%;
          overflow-y: auto;
          -webkit-overflow-scrolling: touch;
          padding: 24px;
          box-sizing: border-box;
          flex-shrink: 0;
          display: flex;
          flex-direction: column;
          height: 100%;
        }

        ul.page-list li.page {
          overflow-y: auto;
          scrollbar-width: none; /* Firefox */
          -ms-overflow-style: none; /* IE 10+ */
        }
        ul.page-list li.page::-webkit-scrollbar {
          display: none; /* Chrome, Safari */
        }

        line.page#night-order {
        }

        .reminder {
          margin-bottom: 48px;
        }

        .top-btns botc-back-button::part(anchor) {
          margin-top: 0;
        }

        .progress-bar {
          display: flex;
          justify-content: center;
          gap: 6px;
          margin: 0;
          margin-bottom: 12px;
          padding: 0 16px;
        }

        .progress-bar-item {
          flex: 1;
          height: 4px;
          border-radius: 3px;
          background: ${bg3};
          transition: background 0.3s;
        }

        .progress-bar-item.active {
          background: ${main5};
        }
      }

      .script-type {
        text-align: right;
      }
    `
	];
	_onScroll() {
		if (!this.scrollContainer) return;
		cancelAnimationFrame(this._raf);
		this._raf = requestAnimationFrame(() => {
			const children = [...this.scrollContainer.querySelectorAll("li.page")];
			const containerRect = this.scrollContainer.getBoundingClientRect();
			let closestIndex = 0;
			let closestDistance = Infinity;
			children.forEach((child, index) => {
				const rect = child.getBoundingClientRect();
				const childCenter = rect.left + rect.width / 2;
				const containerCenter = containerRect.left + containerRect.width / 2;
				const distance = Math.abs(containerCenter - childCenter);
				if (distance < closestDistance) {
					closestDistance = distance;
					closestIndex = index;
				}
			});
			this.currentIndex = closestIndex;
		});
	}
	render() {
		return b`
      <div class="top-wrapper">
        ${when(!this.mobile, () => this.renderRolesOverview())}

        <div class="top">
          ${when(this.mobile, () => b`
              <h1 header>Almanac</h1>
              ${this.script.success((script) => {
			const { roles, jinxes } = this.getRolesAndJinxes(script.script);
			return b`
                  <div class="progress-bar">
                    ${[
				"almanac",
				"night-order-1",
				"night-order-2",
				"overview",
				...(script?.bootlegger)?.length ? ["bootlegger"] : [],
				...jinxes.length ? ["jinxes"] : [],
				...roles
			].map((_, i) => b`
                        <div
                          class="progress-bar-item ${this.currentIndex === i ? "active" : ""}"
                        ></div>
                      `)}
                  </div>
                  <div class="top-btns">
                    <botc-back-button href="/scripts"></botc-back-button>

                    <button
                      ${tooltip("Share or download")}
                      ${context(dialog, () => b`
                          <botc-almanac-buttons
                            .localScript=${!!this.name}
                            .name=${script.name}
                            .id=${this.id}
                            .script=${script}
                          ></botc-almanac-buttons>
                        `)}
                      ui-icon-button
                      secondary
                    >
                      ${iosshare}
                    </button>
                  </div>
                `;
		})}
            `)}
        </div>
      </div>
      <div class="content">
        ${this.script.render({
			success: (script) => {
				const bootlegger = script?.bootlegger || [];
				const { roles, jinxes } = this.getRolesAndJinxes(script.script);
				const rolesById = Object.fromEntries(roles.map((r) => [r.id, r]));
				function buildNightArray(nightIds, fallbackKey) {
					const result = [];
					if (Array.isArray(nightIds) && nightIds.length) nightIds.forEach((id, i) => {
						if (id === "minioninfo" || id === "demoninfo" || id === "dawn" || id === "dusk" && fallbackKey === "firstNight") result.push({
							id,
							humanReadableRole: id.toUpperCase().replace("INFO", " INFO"),
							order: i,
							type: id === "minioninfo" || id === "demoninfo" ? "Minion" : ""
						});
						else {
							const r = rolesById[id];
							if (r) result.push({
								id: r.id,
								icon: r.icon,
								image: r.image,
								type: r.type,
								humanReadableRole: r.humanReadableRole,
								order: i
							});
						}
					});
					else {
						for (const r of roles) {
							const order = r[fallbackKey];
							if (order && order > 0) result.push({
								id: r.id,
								icon: r.icon,
								image: r.image,
								type: r.type,
								humanReadableRole: r.humanReadableRole,
								order
							});
						}
						if (!result.find((r) => r.id === "minioninfo") && fallbackKey === "firstNight") result.push({
							id: "minioninfo",
							humanReadableRole: "MINION INFO",
							order: 14,
							type: "Minion"
						});
						if (!result.find((r) => r.id === "demoninfo") && fallbackKey === "firstNight") result.push({
							id: "demoninfo",
							humanReadableRole: "DEMON INFO",
							order: 18,
							type: "Minion"
						});
						const orders = result.map((r) => r.order ?? 0);
						const highest = orders.length ? Math.max(...orders) : 0;
						const lowest = orders.length ? Math.min(...orders) : 0;
						result.push({
							id: "dawn",
							humanReadableRole: "Dawn",
							order: highest + 1,
							type: ""
						});
						result.push({
							id: "dusk",
							humanReadableRole: "Dusk",
							order: lowest - 1,
							type: ""
						});
						result.sort((a, b) => a.order - b.order);
					}
					return result;
				}
				const firstNight = buildNightArray(script.firstNight, "firstNight");
				const otherNight = buildNightArray(script.otherNight, "otherNight");
				return b`
              <ul class="page-list">
                <li id="almanac" class="page">
                  ${when(!this.mobile, () => b` <div class="top-btns">
                        <botc-back-button href="/scripts"></botc-back-button>

                        <button
                          ${tooltip("Share or download")}
                          ${context(dialog, () => b`
                              <botc-almanac-buttons
                                .localScript=${!!this.name}
                                .name=${script.name}
                                .id=${this.id}
                                .script=${script}
                              ></botc-almanac-buttons>
                            `)}
                          ui-icon-button
                          secondary
                        >
                          ${iosshare}
                        </button>
                      </div>`)}

                  <div class="title">
                    <h1>${capitalize(script.name)}</h1>
                  </div>
                </li>
                <li id="overview" class="page">
                  <h2 style="text-align: center;">Roles overview</h2>
                  <botc-roles-list .script=${script.script}></botc-roles-list>
                </li>
                ${when(this.mobile, () => {
					return b`
                      <li id="night-order1" class="page">
                        <div class="night-order">
                          <div>
                            <h2>First night</h2>
                            <botc-select-role
                              .showMeta=${true}
                              .roles=${firstNight}
                              .sortFn=${(a, b) => a.order - b.order}
                              .disabled=${true}
                            ></botc-select-role>
                          </div>
                        </div>
                      </li>
                      <li id="night-order2" class="page">
                        <div class="night-order">
                          <div>
                            <h2>Other night</h2>
                            <botc-select-role
                              .showMeta=${true}
                              .roles=${otherNight}
                              .sortFn=${(a, b) => a.order - b.order}
                              .disabled=${true}
                            ></botc-select-role>
                          </div>
                        </div>
                      </li>
                    `;
				}, () => {
					return b`
                      <li id="night-order" class="page">
                        <div class="night-order">
                          <div>
                            <h2>First night</h2>
                            <botc-select-role
                              .showMeta=${true}
                              .roles=${firstNight}
                              .sortFn=${(a, b) => a.order - b.order}
                              .disabled=${true}
                            ></botc-select-role>
                          </div>
                          <div>
                            <h2>Other night</h2>
                            <botc-select-role
                              .showMeta=${true}
                              .roles=${otherNight}
                              .sortFn=${(a, b) => a.order - b.order}
                              .disabled=${true}
                            ></botc-select-role>
                          </div>
                        </div>
                      </li>
                    `;
				})}
                ${when(jinxes.length, () => b`
                    <li id="jinxes" class="page">
                      <div class="jinxes">
                        <h2 class="jinx-title">Jinxes</h2>
                        ${jinxes.map((role) => b`
                          <botc-card>
                            <div class="jinx">
                              <div class="jinx-role">
                                <img class="${alignment(role.type)}" src=${img(role)}></img>
                                <h2 class="${alignment(role.type)}">${role.humanReadableRole}</h2>
                                </div>
                          <ul class="jinx-list" ui-inlay>
                            ${role.jinxes.map((jinx) => {
					const role = window.rolesById[jinx.id];
					if (!role) return b``;
					return b`
                                <li class="jinx-item">
                              <img class="${alignment(role.type)}" src=${img({ icon: jinx.id })}></img>
                              <div>
                                <h2 class="${alignment(role.type)}">${role.humanReadableRole}</h2>
                              <p class="reason">${jinx.reason}</p>

                              </div>
                                </li>
                              `;
				})}
                          </ul>
                            </div>
                          </botc-card>
                        `)}
                      </div>
                    </li>
                  `)}
                ${when(bootlegger && bootlegger.length, () => b`
                    <li id="bootlegger-rules" class="page">
                      <div class="jinxes">
                        <h2 class="jinx-title">Bootlegger</h2>
                        ${bootlegger.map((rule) => b` <botc-card>${rule}</botc-card> `)}
                      </div>
                    </li>
                  `)}
                ${roles.filter((r) => r.id !== "minioninfo" && r.id !== "demoninfo").map((role) => b`
                      <li class="page" id=${role.id} class="role">
                        <div class="wrapper">
                            <img class="big-role ${alignment(role.type)}" src=${img(role)}></img>
                            <h2 class="role ${alignment(role.type)}">${role?.humanReadableRole}</h2>
                          </div>
                          
                              <div class="reminder">${role.summary}</div>
                      </li>
                    `)}
              </ul>
            `;
			},
			loading: () => b`
            <div class="title-wrapper">
              <botc-spinner></botc-spinner>
            </div>
          `
		})}
      </div>
    `;
	}
	getRolesAndJinxes(script) {
		const roles = Object.keys(script).reduce((acc, role) => {
			return acc.concat(script[role]);
		}, []).sort((a, b) => {
			const aType = a.type?.toLowerCase?.() || "";
			const bType = b.type?.toLowerCase?.() || "";
			return this.sortOrder.indexOf(aType) - this.sortOrder.indexOf(bType);
		});
		return {
			roles,
			jinxes: roles.map((r) => {
				if (!r.jinxes || !r.jinxes.length) return null;
				const jinxes = r.jinxes.filter((j) => {
					return roles.find((role) => role.id === j.id);
				});
				if (!jinxes.length) return null;
				return {
					...r,
					jinxes
				};
			}).filter(Boolean)
		};
	}
	renderRolesOverview() {
		return b`
      <div class="desktop-progress">
        <a
          id="almanac-link"
          href="#almanac"
          @click=${(e) => {
			e.preventDefault();
			this.scrollToHash("almanac");
		}}
          ><h1>Almanac</h1></a
        >

        ${this.script.success(({ script, bootlegger }) => {
			const sorted = Object.entries(script ?? {}).sort(([a], [b]) => this.sortOrder.indexOf(a) - this.sortOrder.indexOf(b));
			const { jinxes } = this.getRolesAndJinxes(script);
			return b`
            <ul class="night-order-link">
              <li>
                <a
                  @click=${(e) => {
				e.preventDefault();
				this.scrollToHash("overview");
			}}
                  href="#overview"
                >
                  Overview</a
                >
              </li>
              <li>
                <a
                  @click=${(e) => {
				e.preventDefault();
				this.scrollToHash("night-order");
			}}
                  href="#night-order"
                >
                  Night order</a
                >
              </li>

              ${when(jinxes.length, () => b`
                  <li>
                    <a
                      @click=${(e) => {
				e.preventDefault();
				this.scrollToHash("jinxes");
			}}
                      href="#jinxes"
                    >
                      Jinxes</a
                    >
                  </li>
                `)}
              ${when(bootlegger && bootlegger.length, () => b`
                  <li>
                    <a
                      @click=${(e) => {
				e.preventDefault();
				this.scrollToHash("bootlegger-rules");
			}}
                      href="#bootlegger-rules"
                    >
                      Bootlegger</a
                    >
                  </li>
                `)}
            </ul>

            ${sorted.map(([key, value]) => {
				if (!value.length) return "";
				return b`
                <div class="kind">
                  <h2>${capitalize(key)}</h2>
                  <ul>
                    ${value.map((role) => {
					if (role.id === "minioninfo" || role.id === "demoninfo") return "";
					return b`
                        <li>
                          <a
                            @click=${(e) => {
						e.preventDefault();
						this.scrollToHash(role.id);
					}}
                            href="#${role.id}"
                            >${role.humanReadableRole}</a
                          >
                        </li>
                      `;
				})}
                  </ul>
                </div>
              `;
			})}
          `;
		})}
      </div>
    `;
	}
};
customElements.define("botc-almanac", BotcAlmanac);
var BotcAlmanacButtons = class extends i {
	static properties = {
		name: { type: String },
		script: { type: Object },
		id: { type: String },
		localScript: { type: Boolean }
	};
	static styles = [button, i$1`
      .custom-scripts a[ui-button-link] {
        text-align: center;
      }

      .custom-scripts a[ui-button-link],
      .custom-scripts button[ui-button] {
        display: flex;
        justify-content: center;
        align-items: center;
      }

      .custom-scripts a[ui-button-link] svg,
      .custom-scripts button[ui-button] svg {
        fill: var(--ui-main-5);
      }

      .custom-scripts a[ui-button-link] span,
      .custom-scripts button[ui-button] span {
        flex: 1;
        margin-left: -24px;
      }
    `];
	async openDialog(id, parameters) {
		dialog.close();
		await dialog.closed;
		await new Promise((r) => requestAnimationFrame(r));
		dialog.open({
			id,
			parameters
		});
	}
	render() {
		return b`
      <div class="custom-scripts">
        ${when(!this.localScript, () => b`
            <button
              ui-button
              secondary
              @click=${() => this.openDialog("shareAlmanac", { id: this.id })}
            >
              ${iosshare} <span>Share</span>
            </button>
          `)}
        <button ui-button secondary @click=${this.copy}>
          ${copy} <span>Copy JSON</span>
        </button>
        ${when(!this.localScript, () => b`
            <button
              ui-button
              secondary
              @click=${async () => {
			try {
				await saveScript(this.name, this.script.script);
				this.openDialog("inline", {
					header: "Script saved",
					render: () => b`Script downloaded successfully, you can find it in
                      "Scripts on this device".`
				});
			} catch (e) {
				console.log(e);
				this.openDialog("inline", {
					header: "Error",
					render: () => b`Something went wrong trying to download the script.
                      Please try again later.`
				});
			}
		}}
            >
              ${download} <span>Download</span>
            </button>
          `)}
      </div>
    `;
	}
	async copy() {
		let script;
		if (this.localScript) {
			const s = await SCRIPTS_DATA[this.name]();
			if (!s) {
				this.openDialog("inline", {
					header: "Error",
					render: () => b`Script not found.`
				});
				return;
			}
			script = transformToSchemaScript({
				script: s,
				name: this.name
			});
		} else {
			script = this.script?.content ?? this.script;
			script = transformToSchemaScript({
				bootlegger: this.script?.bootlegger,
				script: script.script,
				name: this.name
			});
			if (!script) {
				this.openDialog("inline", {
					header: "Error",
					render: () => b`Failed to copy script.`
				});
				return;
			}
		}
		navigator.clipboard.writeText(JSON.stringify(script, null, 2)).then(() => {
			this.openDialog("inline", {
				header: "Script copied",
				render: () => b`
            <p ui-success>${check} Script JSON copied to clipboard.</p>
            <div ui-inlay>
              <code>
                <pre style="overflow:auto;">
${JSON.stringify(script, null, 2).trim()}</pre>
              </code>
            </div>
          `
			});
		}).catch(() => {
			this.openDialog("inline", {
				header: "Error",
				render: () => b`Failed to copy script JSON. Please try again later.`
			});
		});
	}
};
customElements.define("botc-almanac-buttons", BotcAlmanacButtons);
//#endregion
