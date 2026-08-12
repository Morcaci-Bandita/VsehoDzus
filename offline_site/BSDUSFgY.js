//#region data/role-info/fearmonger.js
var fearmonger_default = [
	{ heading: "Summary" },
	"\"Each night, choose a player: if you nominate & execute them, their team loses. All players know if you choose a new player.\"",
	"The Fearmonger creates paranoia about who nominates whom.",
	[
		"During the first night, when the Fearmonger selects a player, all players learn this.",
		"During other nights, each time the Fearmonger selects a new player, all players learn this. If the Fearmonger selects the same player as previously, the players learn nothing.",
		"The players only learn that the Fearmonger has acted, not which player was selected.",
		"If the Fearmonger nominates their chosen player, and that nomination results in their execution, the chosen player loses, their team loses, and the game ends.",
		"Only the currently chosen player is susceptible to the Fearmonger’s ability. Previously chosen players don’t count.",
		"If the chosen player is executed but does not die, the chosen player’s team still loses."
	],
	{ heading: "How to Run" },
	"Each night, wake the Fearmonger. They point at any player. Put the Fearmonger to sleep. Mark the chosen player with the FEAR reminder. If the Fearmonger chose a player who wasn’t already marked with the FEAR reminder, declare that “The Fearmonger has chosen a player.” (This informs the group that the Fearmonger is alive and has chosen a new player.)",
	"If the Fearmonger nominates the player marked FEAR, and that nomination results in their execution, declare that the game is over and which team has won."
];
//#endregion
export { fearmonger_default as default };
