//#region data/role-info/thief.js
var thief_default = [
	{ heading: "Summary" },
	"\"Each night, choose a player (not yourself): their vote counts negatively tomorrow.\"",
	"The Thief steals votes from a player, making their vote count negatively.",
	[
		"When a player chosen by the Thief votes, the vote tally goes down by one instead of up by one. This happens every time that player votes that day.",
		"The player with the negative vote changes back to having a positive vote immediately if the Thief dies, including if the Thief is exiled, because the Thief loses their ability.",
		"Exiles are never affected by abilities, so the player with the negative vote can support exiles unaffected by the Thief’s ability.",
		"Since the Storyteller counts the number of votes out loud as they move their hand around the circle, all players will know which player the Thief chose."
	],
	{ heading: "How to Run" },
	"Each night, wake the Thief. They point at any player. Mark the chosen player with the Thief’s NEGATIVE VOTE reminder. Put the Thief to sleep.",
	"Each time you tally the vote of a player marked NEGATIVE VOTE, count it as subtracting one vote instead of adding one vote. (Count this out loud, as normal.)"
];
//#endregion
export { thief_default as default };
