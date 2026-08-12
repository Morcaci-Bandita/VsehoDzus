//#region data/role-info/witch.js
var witch_default = [
	{ heading: "Summary" },
	"\"Each night, choose a player: if they nominate tomorrow, they die. If just 3 players live, you lose this ability.\"",
	"The Witch curses players, so that they die if they nominate.",
	[
		"Each night, the Witch chooses a player to curse. That player dies if they nominate any player on the next day, although their nomination still counts.",
		"The Witch’s curse lasts only for one day, but the Witch may curse the same player again and again each night.",
		"As soon as just three players are left alive, the Witch’s curse is immediately removed, and the Witch acts no more."
	],
	{ heading: "How to Run" },
	"Each night, wake the Witch. They point at any player. Put the Witch to sleep. Mark the chosen player with the CURSED reminder.",
	"The next day, if the player marked CURSED makes a nomination, immediately declare that they die. (Nominations continue as normal.)"
];
//#endregion
export { witch_default as default };
