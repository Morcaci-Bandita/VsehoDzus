//#region data/role-info/gambler.js
var gambler_default = [
	{ heading: "Summary" },
	"\"Each night*, choose a player & guess their character: if you guess wrong, you die.\"",
	"The Gambler can guess who is who... but pays the ultimate price if they guess wrong.",
	[
		"Each night except the first, the Gambler chooses a player and guesses their character by pointing to its icon on the character sheet. If the guess is correct, nothing happens. If the guess is incorrect, the Gambler dies.",
		"The Gambler does not learn from the Storyteller whether their guess is correct or incorrect.",
		"The Gambler may choose any player, dead or alive, even themself."
	],
	{ heading: "How to Run" },
	"Each night except the first, wake the Gambler. They point at any player, then point at any character icon on their character sheet. Put the Gambler to sleep. If the chosen player is a different character from the chosen character icon, the Gambler dies—mark them with the DEAD reminder."
];
//#endregion
export { gambler_default as default };
