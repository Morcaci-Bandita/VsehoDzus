//#region data/role-info/damsel.js
var damsel_default = [
	{ heading: "Summary" },
	"\"All Minions know a Damsel is in play. If a Minion publicly guesses you (once), your team loses.\"",
	"The Damsel needs to avoid being found by the Minions.",
	[
		"If a Minion guesses that you are the Damsel, and does so publicly (so that all players know that they are a Minion), evil wins.",
		"No matter how many Minions are in play, they only get one guess, total. If a Minion makes a guess and is wrong, future guesses by this Minion or by other Minions don’t count.",
		"If the Demon pretends to be a Minion making a guess, that doesn’t count as a guess. Minions may still make a guess and win.",
		"Minions may make a guess at any time.",
		"If the Damsel dies, they are no longer at risk of being guessed by a Minion, since the Damsel loses their ability when dead.",
		"There may not be a Huntsman in play. But if there is, and the Huntsman chooses the Damsel at night, the Damsel becomes a not-in-play Townsfolk, and is no longer the Damsel. The Damsel learns which Townsfolk and has that Townsfolk ability from then on."
	],
	{ heading: "How to Run" },
	"During the first night, wake each Minion. Show the Damsel token. Put each Minion to sleep.",
	"At any time during the game, if a Minion publicly guesses which player is the Damsel and is incorrect, mark the Damsel with the GUESS USED reminder. Future guesses by Minion players have no effect.",
	"At any time during the game, if a Minion publicly guesses which player is the Damsel and is correct, the game ends. Declare that the evil team wins."
];
//#endregion
export { damsel_default as default };
