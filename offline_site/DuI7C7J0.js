//#region data/role-info/nightwatchman.js
var nightwatchman_default = [
	{ heading: "Summary" },
	"\"Once per game, at night, choose a player: they learn you are the Nightwatchman.\"",
	"The Nightwatchman is known by one player.",
	[
		"At night, the Nightwatchman chooses a player. This player wakes, and learns which player the Nightwatchman is.",
		"The Nightwatchman and their chosen player do not make eye contact. They wake separately.",
		"The Nightwatchman player chooses which night to act."
	],
	{ heading: "How to Run" },
	"Each night, wake the Nightwatchman. The Nightwatchman either shakes their head or points at any player. Put the Nightwatchman to sleep.",
	"If the Nightwatchman pointed at a player, wake them and show them the Nightwatchman token, then point to the Nightwatchman player. Put the chosen player to sleep. The Nightwatchman loses their ability – mark them with a NO ABILITY reminder and remove their night token from the night sheet."
];
//#endregion
export { nightwatchman_default as default };
