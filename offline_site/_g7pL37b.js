//#region data/role-info/puzzlemaster.js
var puzzlemaster_default = [
	{ heading: "Summary" },
	"\"1 player is drunk, even if you die. If you guess (once) who it is, learn the Demon player, but guess wrong & get false info.\"",
	"The Puzzlemaster tries to figure out who is drunk.",
	[
		"A player is drunk for the whole game. It will most often be a Townsfolk, but could be an Outsider. This player does not know that they are drunk.",
		"Once per game, the Puzzlemaster may guess which player it is. They may guess publicly, or privately. Whatever their guess, the Storyteller privately tells the Puzzlemaster the name of one player. If the Puzzlemaster guessed correctly, they learn which player the Demon is. If the Puzzlemaster guessed incorrectly, they learn a different player instead.",
		"The Puzzlemaster isn’t told if they guessed correctly or not.",
		"Only the player made drunk by the Puzzlemaster counts as a successful guess. Players drunk by other means don’t count.",
		"If the Puzzlemaster dies, the drunk player is still drunk. A dead Puzzlemaster may not make a guess, as they don’t have that part of their ability."
	],
	{ heading: "How to Run" },
	"While preparing the first night, mark any player with the Puzzlemaster’s DRUNK reminder. This player is drunk.",
	"At any time during the game, the Puzzlemaster may guess a player, either publicly or by having a private discussion with you. If their guessed player is marked by the Puzzlemaster’s DRUNK reminder, privately tell the Puzzlemaster which player is the Demon. If their guessed player is not marked by the Puzzlemaster’s DRUNK reminder, privately tell the Puzzlemaster the name of a non-Demon player. (Do not say if they guessed correctly or not.) Either way, mark the Puzzlemaster with the GUESS USED reminder.",
	"While you can make a Minion or the Demon drunk with the Puzzlemaster ability, only do this if you have an excellent reason in mind. It is almost always best to select a Townsfolk player."
];
//#endregion
export { puzzlemaster_default as default };
