//#region data/role-info/huntsman.js
var huntsman_default = [
	{ heading: "Summary" },
	"\"Once per game, at night, choose a living player: the Damsel, if chosen, becomes a not-in-play Townsfolk. [+the Damsel]\"",
	"The Huntsman saves the Damsel before the Minions find her... hopefully.",
	[
		"The Damsel can be in play without the Huntsman. During the setup phase, if the Huntsman is in play and the Damsel isn’t, the Damsel is added. If a Damsel is already in play, the Huntsman doesn’t add a second Damsel.",
		"If the Huntsman correctly chooses the Damsel at night, the Damsel becomes a not-in-play Townsfolk immediately. The Storyteller chooses which Townsfolk character, and the Damsel learns which one.",
		"When the Damsel becomes a Townsfolk, they gain that Townsfolk ability and lose the Damsel ability.",
		"The Huntsman gets one guess, and makes it at night.",
		"The Minions get one guess in total, and make it publicly during the day. If a Minion guesses who the Damsel is, evil wins. If a Minion incorrectly guesses who the Damsel is, the guess is used, and other Minions cannot win by correctly guessing the Damsel.",
		"If the Damsel is drunk or poisoned but the Huntsman is sober and healthy, the Damsel can still become a Townsfolk."
	],
	{ heading: "How to Run" },
	"While setting up the game, before putting character tokens in the bag, if the Damsel is not already in play, remove a Townsfolk character token and add the Damsel character token.",
	"Each night, wake the Huntsman.",
	"If they shake their head no, put the Huntsman to sleep.",
	"If they point to a player, put the Huntsman to sleep. The Huntsman loses their ability—mark them with the NO ABILITY reminder and remove their night token from the night sheet. If they chose the Damsel, wake the Damsel, show the YOU ARE info token, then a not-in-play Townsfolk token, then put the Damsel to sleep. The Damsel now has this Townsfolk ability, so replace the Damsel character token with this Townsfolk character token."
];
//#endregion
export { huntsman_default as default };
