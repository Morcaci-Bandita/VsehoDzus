//#region data/role-info/bureaucrat.js
var bureaucrat_default = [
	{ heading: "Summary" },
	"\"Each night, choose a player (not yourself): their vote counts as 3 votes tomorrow.\"",
	"The Bureaucrat gives extra votes to a player of their choice.",
	[
		"When a player chosen by the Bureaucrat votes, that vote counts as three votes. This happens every time that player votes that day.",
		"The player with the triple vote loses it immediately if the Bureaucrat dies, including if the Bureaucrat is exiled, because the Bureaucrat loses their ability.",
		"Exiles are never affected by abilities, so the player with the triple vote can only support exiles once, not three times.",
		"Since the Storyteller counts the number of votes out loud as they move their hand around the circle, all players will know which player the Bureaucrat chose."
	],
	{ heading: "How to Run" },
	"Each night, wake the Bureaucrat. They point at any player. Mark the chosen player with the Bureaucrat’s 3 VOTES reminder. Put the Bureaucrat to sleep.",
	"Each time you tally the vote of a player marked 3 VOTES, count it as three votes instead of one. (Count this out loud, as normal.)"
];
//#endregion
export { bureaucrat_default as default };
