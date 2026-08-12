import { A as i, I as i$1, P as b, t as when } from "./CY602n9t.js";
import { E as saveScript, F as api, H as get, U as set } from "./CP0hEE1l.js";
import "./D8HaG3T3.js";
import "./vIOCOudq.js";
import { t as button } from "./CbFrBy7s.js";
import { t as error } from "./BnMAryrf.js";
import { t as input } from "./_hTQLwBE.js";
//#region src/components/dialog/custom-script.js
function mapBloodStarTeamToType(team) {
	switch (team) {
		case "townsfolk": return "Townsfolk";
		case "outsider": return "Outsider";
		case "minion": return "Minion";
		case "demon": return "Demon";
		case "traveler": return "Traveller";
		case "fabled": return "Fabled";
		default: return team;
	}
}
var BotcCustomScript = class extends i {
	static properties = {
		state: { type: String },
		newScriptName: { type: String },
		source: { type: String }
	};
	constructor() {
		super();
		this.state = "idle";
		this.newScriptName = "";
		this.source = "";
	}
	static styles = [
		button,
		error,
		input,
		i$1``
	];
	render() {
		return b`
      ${when(this.source === "botc-scripts", () => b`
          <p>
            You can import homebrew scripts from the
            <a href="https://www.botcscripts.com/" target="_blank"
              >unofficial script tool</a
            >. Select a script, and click the "JSON" button to get the link to
            the script, and paste it down below.
          </p>
        `)}
      ${when(this.source === "bloodstar", () => b`
          <p>
            You can import homebrew scripts from
            <a href="https://www.bloodstar.xyz/" target="_blank">Bloodstar</a>.
            If you have the link to the script's almanac.html, paste it down
            below.
          </p>
        `)}
      <form @submit=${this.addCustomScript}>
        <label ui-label for="link">
          <input
            value="${this.source === "botc-scripts" ? "https://www.botcscripts.com/api/scripts/8999/json/" : "https://www.bloodstar.xyz/p/Alerriaiscute/Areyoumyteamatev10/almanac.html"}"
            ui-input
            required
            id="link"
            type="text"
          />
          <span>Link</span>
        </label>
        <label ui-label for="customName">
          <input ui-input id="customName" type="text" />
          <span>Script name</span>
        </label>
        ${when(this.state === "pending", () => b` <botc-spinner></botc-spinner> `)}
        ${when(this.state === "failed", () => b` <div ui-error>Failed to load script.</div> `)}
        ${when(this.state === "success", () => b`
            <div>Script "${this.newScriptName}" loaded successfully.</div>
          `)}
        <button
          type="submit"
          ?disabled=${this.state === "success"}
          ui-button
          primary
        >
          Import homebrew script
        </button>
      </form>
    `;
	}
	async addCustomScript(e) {
		e.preventDefault();
		this.state = "pending";
		const link = this.shadowRoot.querySelector("#link").value;
		const customName = this.shadowRoot.querySelector("#customName").value;
		const rolesById = window.rolesById;
		if (this.source === "botc-scripts") {
			let data;
			try {
				data = await api.get(link.replace("/json/", "").replace("/json", ""));
				data = data.content;
			} catch (e) {
				try {
					data = await api.get(link.replace("/json/", "/json/?format=json"));
				} catch (e) {
					this.state = "failed";
					return;
				}
			}
			let [{ name }, ...r] = data;
			if (!name) {
				name = customName ? customName : "unnamed";
				r = data.content;
			}
			const processedScript = r.map((role) => rolesById[role.id]).reduce((acc, role) => {
				const type = role.type.toLowerCase();
				if (!acc[type]) acc[type] = [];
				acc[type].push(role);
				return acc;
			}, {});
			this.newScriptName = name ?? "unnamed";
			saveScript(name, processedScript);
			this.state = "success";
		} else if (this.source === "bloodstar") {
			const customRoles = await get("roles") ?? [];
			try {
				let [{ name: scriptName }, ...roles] = await fetch(link.replace("almanac.html", "script.json")).then((r) => r.json());
				this.newScriptName = scriptName ?? "unnamed";
				const processedScript = roles.map((r) => {
					const role = {
						...r,
						humanReadableRole: r.name,
						script: scriptName,
						type: mapBloodStarTeamToType(r.team),
						summary: r.ability
					};
					delete r.team;
					delete r.ability;
					const id = r.id.split("_")[0];
					if (!rolesById[id]) {
						if (!customRoles.some((role) => role.id === r.id)) customRoles.push(role);
					}
					return role;
				}).reduce((acc, role) => {
					const type = role.type.toLowerCase();
					if (!acc[type]) acc[type] = [];
					acc[type].push(role);
					return acc;
				}, {});
				await set("roles", customRoles);
				saveScript(scriptName, processedScript);
				this.state = "success";
			} catch (e) {
				console.log(e);
				this.state = "failed";
			}
		}
	}
};
customElements.define("botc-custom-script", BotcCustomScript);
//#endregion
export { BotcCustomScript };
