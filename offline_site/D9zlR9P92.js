//#region data/role-info/balloonist.js
var balloonist_default = [
	{ heading: "Summary" },
	"\"Each night, you learn a player of a different character type than last night. [+0 or +1 Outsider]\"",
	"The Balloonist learns players of different character types.",
	[
		"Each time the Balloonist learns a player, the player must have a different character type to the previously shown player.",
		"The Balloonist does not learn the character type of the player they learn.",
		"The shown player can be alive or dead.",
		"The shown player can be good or evil.",
		"If the Balloonist is drunk or poisoned, they may learn a character of the same type as the previously shown player. When the Balloonist becomes sober and healthy, they must learn a player of a different character type to the previously shown player.",
		"During setup, the Storyteller may choose to add an Outsider due to the Balloonist’s ability."
	],
	{ heading: "How to Run" },
	"During setup, you may add an Outsider.",
	"When preparing the first night, mark any player with the KNOW reminder. When preparing each night afterwards, mark a character of a different type than the current with the KNOW reminder.",
	"Each night, wake the Balloonist. Point to the player marked KNOW. Put the Balloonist to sleep."
];
//#endregion
export { balloonist_default as default };
