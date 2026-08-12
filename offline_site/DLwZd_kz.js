//#region data/role-info/exorcist.js
var exorcist_default = [
	{ heading: "Summary" },
	"\"Each night*, choose a player (different to last night): the Demon, if chosen, learns who you are then doesn't wake tonight.\"",
	"The Exorcist prevents the Demon from waking to attack.",
	[
		"Each night, the Exorcist chooses a player. If they choose a player who is not the Demon, the Demon may still attack. If they choose the Demon, the Demon does not wake tonight, so does not choose players to attack tonight. The Demon learns that they cannot attack and who the Exorcist is.",
		"Any other Demon abilities still function—such as the Zombuul staying alive if killed, the Pukka killing a player they attacked on a previous night, or the Shabaloth regurgitating a player.",
		"The Exorcist may not choose the same player two nights in a row."
	],
	{ heading: "How to Run" },
	"Each night except the first, wake the Exorcist. They point at any player. Mark the chosen player’s character token with the CHOSEN reminder. Put the Exorcist to sleep.",
	"If the Exorcist chose the Demon, wake the Demon. Show them the THIS CHARACTER SELECTED YOU info token and the Exorcist token, then point at the Exorcist player. Put the Demon to sleep. Later tonight, do not wake the Demon.",
	"A Demon chosen by the Exorcist will not wake to use their Demon ability, but will still wake if they need to due to other characters’ abilities. This may be relevant if using the Exorcist with characters from other editions."
];
//#endregion
export { exorcist_default as default };
