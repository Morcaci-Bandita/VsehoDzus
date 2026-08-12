//#region data/role-info/xaan.js
var xaan_default = [
	{ heading: "Summary" },
	"\"On night X, all Townsfolk are poisoned until dusk. [X Outsiders]\"",
	"The Xaan poisons all Townsfolk.",
	[
		"The Xaan poisons all Townsfolk players for one night then one day. The night that this happens equals the number of Outsiders in play. For example, if there are 2 Outsiders, the Xaan poisons on night 2.",
		"There can be any number of Outsiders in play, but usually 1 to 4. This can be the normal number of Outsiders if the Xaan was not in play, or something different. This overrides other characters that add or remove Outsiders, such as the Baron.",
		"If the number of Outsiders changes during the game, the Xaan poisons on the night corresponding to the number of Outsiders during setup.",
		"The Xaan needs to be alive in order to poison."
	],
	{ heading: "How to Run" },
	"While setting up the game, before putting character tokens in the bag, add or remove any number of Outsider tokens, including zero. Remove any unnecessary Xaan reminders.",
	"On the 1st night, add the NIGHT 1 Xaan reminder to the Grimoire. On the 2nd night, add the NIGHT 2 Xaan reminder to the Grimoire. On the 3rd night, add the NIGHT 3 Xaan reminder to the Grimoire. On the night that equals the number of Outsiders in play when the game began, add the X reminder to the Grimoire, and remove it the following dusk.",
	"When the X reminder is in the Grimoire, all Townsfolk players are poisoned."
];
//#endregion
export { xaan_default as default };
