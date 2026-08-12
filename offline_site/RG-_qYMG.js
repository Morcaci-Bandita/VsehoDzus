//#region data/role-info/golem.js
var golem_default = [
	{ heading: "Summary" },
	"\"You may only nominate once per game. When you do, if the nominee is not the Demon, they die.\"",
	"The Golem kills the player they nominate.",
	[
		"When the Golem nominates a player, that player immediately dies. The nomination process continues.",
		"If the Golem nominates the Demon, nothing happens. The Storyteller doesn’t confirm or deny that the Golem nominated, and continues with the voting process as normal. The Storyteller may say “nothing happens” if clarity is asked for.",
		"After the Golem has nominated once, whether or not the nominee dies, the Golem may not nominate again this game. It is the player’s responsibility to refrain from nominating, not the Storyteller’s. Deliberately nominating when they shouldn’t is considered cheating."
	],
	{ heading: "How to Run" },
	"If the Golem nominates a non-Demon, that player dies, then the vote continues as normal. Mark the Golem with the MAY NOT NOMINATE reminder.",
	"If the Golem nominates the Demon, the vote continues as normal. (Do not say why.) Mark the Golem with the MAY NOT NOMINATE reminder.",
	"If the Golem accidentally nominates when they shouldn’t, you can either accept or not accept the nomination. It is best to not accept the nomination—as long as you think that this won’t confirm that a Golem is in play. To keep things fair, also do this for players bluffing as the Golem, reminding them that the Golem cannot nominate more than once."
];
//#endregion
export { golem_default as default };
