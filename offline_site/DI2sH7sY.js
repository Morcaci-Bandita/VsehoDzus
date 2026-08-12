//#region data/role-info/acrobat.js
var acrobat_default = [
	{ heading: "Summary" },
	"\"Each night*, choose a player: if they are or become drunk or poisoned tonight, you die.\"",
	"The Acrobat dies when they find a drunk or poisoned player.",
	[
		"Each night except the first, the Acrobat chooses a player. If the chosen player is sober and healthy, nothing happens. If the player is drunk or poisoned, the Acrobat dies.",
		"If the Acrobat is drunk or poisoned, they cannot die to their own ability.",
		"The Acrobat may choose any player, dead or alive, even themself.",
		"If the chosen player is sober and healthy at the time the Acrobat picks, but becomes drunk or poisoned later in the night, the Acrobat dies.",
		"The Acrobat does not learn if the player they selected was drunk, or poisoned, or both.",
		"The Drunk registers as drunk to the Acrobat."
	],
	{ heading: "How to Run" },
	"Each night except the first, wake the Acrobat. They point to a player. Put the Acrobat to sleep.",
	"If the player the Acrobat pointed to is drunk or poisoned, or becomes drunk or poisoned at any time tonight, the Acrobat dies.",
	{ heading: "Examples" },
	"The Sailor chooses the Assassin, and the Storyteller makes the Sailor drunk. The Acrobat chooses the Sailor, and dies because the Sailor is drunk.",
	"The Acrobat chooses the Tinker, who is sober and healthy. Nothing happens.",
	"The Acrobat chooses the Preacher. Later that night, the Pukka poisons the Preacher. The Acrobat dies, because the Preacher is no longer healthy."
];
//#endregion
export { acrobat_default as default };
