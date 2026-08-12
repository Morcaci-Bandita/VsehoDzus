//#region data/role-info/preacher.js
var preacher_default = [
	{ heading: "Summary" },
	"\"Each night, choose a player: a Minion, if chosen, learns this. All chosen Minions have no ability.\"",
	"The Preacher removes Minion abilities.",
	[
		"If the Preacher chooses a Minion, that Minion is woken to learn that they have been preached, and can no longer act while the Preacher is alive, sober, and healthy.",
		"If the Preacher chooses a player who is not a Minion, nothing happens.",
		"The Preacher may choose dead players.",
		"If the Preacher is drunk or poisoned at the time they choose a player, that player is not affected by the Preacher’s ability.",
		"If the Preacher becomes drunk or poisoned, preached Minions regain their abilities until the Preacher is sober and healthy."
	],
	{ heading: "How to Run" },
	"Each night, wake the Preacher. They point to a player. Put the Preacher to sleep. If the Preacher choose a Minion, mark that Minion with a NO ABILITY reminder, wake the Minion and show them the THIS CHARACTER SELECTED YOU info token then the Preacher token, then put them to sleep.",
	"All Minions marked NO ABILITY have no ability while the Preacher is alive."
];
//#endregion
export { preacher_default as default };
