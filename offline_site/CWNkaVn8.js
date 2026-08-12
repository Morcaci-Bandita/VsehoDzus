import { A as i, I as i$1, P as b, f as border, t as when, v as header } from "./CY602n9t.js";
import { c as collection, f as getDocs, r as db } from "./l4dTAMDA.js";
import "./D8HaG3T3.js";
import "./vIOCOudq.js";
import { t as inlay } from "./Ue9OS-EJ.js";
import { t as error } from "./BnMAryrf.js";
import "./B1OborLG.js";
//#region src/pages/users.js
var BotcUsers = class extends i {
	static styles = [
		header,
		error,
		inlay,
		i$1`
      :host {
        display: flex;
        flex-direction: column;
        height: 100%;
        flex: 1;
        margin-left: 12px;
        margin-right: 12px;
      }

      .users-list {
        list-style: none;
        padding: 0;
        padding-left: 16px;
        padding-right: 16px;
      }

      .users-list li:not(:last-child) {
        border-bottom: solid 1px ${border};
      }

      .user {
        display: flex;
        align-items: center;
        padding-top: 16px;
        padding-bottom: 16px;
      }

      .user h2 {
        display: flex;
        color: var(--ui-main-4);
        font-family: "Balgruf";
        font-size: 1.375rem;
        text-shadow: 1px 1px 2px rgba(0, 0, 0, 1);
        margin-bottom: 0;
        margin-top: 0;
      }

      .user-name p {
        margin: 0;
        font-size: 0.9rem;
      }

      .user-img {
        display: flex;
        align-items: center;
        justify-content: center;
      }

      .user-img img {
        margin-right: 16px;
        width: 50px;
        height: 50px;
        border-radius: 50%;
        border: solid 2px var(--ui-bg-9);
        background-color: var(--ui-bg-8);
      }
    `
	];
	static properties = {
		users: { type: Array },
		state: { type: String }
	};
	constructor() {
		super();
		this.users = [];
		this.state = "initialized";
	}
	async connectedCallback() {
		super.connectedCallback();
		try {
			this.state = "pending";
			const usersSnap = await getDocs(collection(db, "users"));
			this.users = usersSnap.docs.map((doc) => ({
				id: doc.id,
				...doc.data()
			}));
			this.requestUpdate();
			this.state = "success";
		} catch (error) {
			console.error("Error fetching users: ", error);
			this.state = "error";
		}
	}
	render() {
		return b`
      <botc-back-button href="/admin"></botc-back-button>

      <h1 header>Users</h1>
      ${when(this.state === "pending" || this.state === "initialized", () => b`<botc-spinner></botc-spinner>`)}
      ${when(this.state === "error", () => b`<div ui-error>Error loading users</div>`)}
      ${when(this.state === "success", () => b`
          <ul ui-inlay class="users-list">
            ${this.users.map((user) => b`
                <li class="user">
                  <div class="user-img">
                    <img
                      src=${user.photoURL}
                      alt=${user.name}
                      width="50"
                      height="50"
                    />
                  </div>
                  <div class="user-name">
                    <h2>${user.name}</h2>
                    <p>${user.email}</p>
                  </div>
                </li>
              `)}
          </ul>
        `)}
    `;
	}
};
customElements.define("botc-users", BotcUsers);
//#endregion
export { BotcUsers };
