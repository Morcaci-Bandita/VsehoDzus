//#region data/role-info/bishop.js
var bishop_default = [
	{ heading: "Summary" },
	"\"Only the Storyteller can nominate. At least 1 opposing player must be nominated each day.\"",
	"The Bishop prevents players from nominating at all. Instead, the Storyteller does all nominating.",
	[
		"The Storyteller makes nominations during the nomination process instead of the players, and the Storyteller may nominate as few or as many players as they wish. To make things fair, they must nominate at least one player whose alignment is opposite the Bishop’s alignment each day.",
		"The Bishop does not alter who can and cannot vote. Each player may do so normally.",
		"Since Travellers are exiled, not executed, any player may call for the Bishop or another Traveller to be exiled."
	],
	{ heading: "How to Run" },
	"Each dawn, mark the good Bishop with their NOMINATE EVIL reminder, or mark the evil Bishop with their NOMINATE GOOD reminder.",
	"During the nomination process for execution, the players cannot make nominations, but you can. (Voting happens as normal.) When you nominate a player whose alignment is opposite the alignment of the Bishop, remove the Bishop’s reminder. You cannot end the nomination process if the Bishop is marked with their reminder.",
	"Usually, you’ll want to nominate about three to five players each day, with at least one of them being evil. You do not have to nominate the Demon each day, but you should nominate all alive players on the final day. Which players you nominate is up to you, but it’s best to nominate more evil players if the Bishop is good, and to nominate fewer evil players if the Bishop is evil."
];
//#endregion
export { bishop_default as default };
