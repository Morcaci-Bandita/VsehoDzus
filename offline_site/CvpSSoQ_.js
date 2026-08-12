//#region data/role-info/vizier.js
var vizier_default = [
	{ heading: "Summary" },
	"\"All players know you are the Vizier. You cannot die during the day. If good voted, you may choose to execute immediately.\"",
	"The Vizier executes players without the town’s consent.",
	[
		"On the first day, all players learn that the Vizier is in play, and which player it is.",
		"During the day, the Vizier can not die by any means.",
		"After a vote is tallied, if the Vizier chooses to execute the nominee (and at least one good player voted), they are executed immediately. This counts as the 1 execution allowed each day.",
		"After a vote is tallied, if the Vizier chooses to execute the nominee (and no good players voted), nothing happens.",
		"Even if the vote tally is less than 50% of the living players, the Vizier may still execute. Even if another player has more votes than the current player, the Vizier may still execute.",
		"The Vizier does not have to force an execution each day."
	],
	{ heading: "How to Run" },
	"When the first night has ended, declare that the Vizier is in play, and which player it is."
];
//#endregion
export { vizier_default as default };
