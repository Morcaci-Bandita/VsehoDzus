//#region data/role-info/leviathan.js
var leviathan_default = [
	{ heading: "Summary" },
	"\"If more than 1 good player is executed, evil wins. All players know you are in play. After day 5, evil wins.\"",
	"The Leviathan doesn't kill.",
	[
		"All players know the Leviathan is in play, even if the Leviathan is created mid-game.",
		"Any number of evil players may be executed, but if more than one good player is executed, evil wins. It doesn’t matter which characters were executed, only the alignment of the player at the time they were executed.",
		"When the fifth day ends and night begins, if the Leviathan is still alive, evil wins.",
		"All types of execution count, even if the player doesn’t die. A player executed due to the Virgin, or due to revealing that they are the Mutant, is still executed. An executed player who lives due to the Pacifist is still executed."
	],
	{ heading: "How to Run" },
	"Immediately after dawn on the first day, declare that the Leviathan is in play. Mark the Leviathan with the DAY 1 reminder. At the beginning of each following day, mark the Leviathan with DAY 2, then DAY 3, then DAY 4, then DAY 5 reminders. If a day ends and the Leviathan is marked with the DAY 5 reminder, declare that evil wins.",
	"If a good player is executed, mark them with the GOOD PLAYER EXECUTED reminder.",
	"If a good player is executed and a player is already marked with the GOOD PLAYER EXECUTED reminder, declare that evil wins.",
	"For new players, it is helpful to declare that the Leviathan is in play each day, and to say what day it is. On the first day, say “The Leviathan is in play. It is day one.” On the second day, say “The Leviathan is in play. It is day two.” etc. This helps your players remember what Demon they are facing and avoid accidentally losing by forgetting to count the days."
];
//#endregion
export { leviathan_default as default };
