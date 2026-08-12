//#region data/role-info/lycanthrope.js
var lycanthrope_default = [
	{ heading: "Summary" },
	"\"Each night*, choose an alive player. If good, they die & the Demon doesn’t kill tonight. One good player registers as evil.\"",
	"The Lycanthrope roams at night, killing the innocent, whilst the Demon cowers indoors.",
	[
		"The Lycanthrope must choose an alive player each night. If the Lycanthrope chooses a dead player, the Storyteller shakes their head no and prompts the Lycanthrope to choose a different player.",
		"If the player that the Lycanthrope chooses is good, that player dies, and the Demon cannot kill tonight.",
		"If the player the Lycanthrope attacks is evil, that player does not die, and the Demon may still kill tonight.",
		"If the Lycanthrope attacks a good player but that good player doesn’t die, the Demon may still kill tonight.",
		"While the Lycanthrope lives, one good player registers as evil. They cannot be killed by the Lycanthrope.",
		"This evil-registration does not effect win conditions. The good player that registers as evil still wins or loses with the good team."
	],
	{ heading: "How to Run" },
	"During setup, mark one good player with the Lycanthrope’s FAUX PAW reminder.",
	"Each night except the first, wake the Lycanthrope. They point at any player. Put the Lycanthrope to sleep. If the chosen player is good, that player dies—mark them with the Lycanthrope’s DEAD reminder. Later that night, wake the Demon, as normal, but the Demon cannot kill. If the chosen player is evil, nothing happens."
];
//#endregion
export { lycanthrope_default as default };
