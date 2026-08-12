//#region data/role-info/legion.js
var legion_default = [
	{ heading: "Summary" },
	"\"Each night*, a player might die. Executions fail if only evil voted. You register as a Minion too. [Most players are Legion]\"",
	"Legion is many Demons.",
	[
		"The recommended number of good and evil players is the reverse of the normal. For example, for a ten player game, there are roughly seven Legion and three good players.",
		"The players that are not Legion may be Townsfolk or Outsiders, in any combination.",
		"If at least one good player voted for the nomination, and that player is “about to die”, then the execution happens as normal. If only evil players vote for a nomination, the vote tally for that nominee is zero.",
		"Each Legion registers as a Minion as well as a Demon.",
		"The Storyteller chooses which player dies at night.",
		"If only one good player remains alive, the Storyteller may declare that evil wins, since good cannot win.",
		"The Storyteller can decide not to give Legion players bluffs."
	],
	{ heading: "How to Run" },
	"During the first night, during the Demon Info step, let all Legion players make eye contact. (You may want to point to the non-Legion players so that Legion knows who they are.)",
	"Each night except the first, you may decide that a player dies.",
	"When counting votes, count out loud, as normal. If the vote tally is enough to make a player about to die but only evil players voted, declare that the vote tally is zero.",
	"Most nights, kill a Legion. Killing a good player is usually unfair. Your aim is to get to three players alive—two good players and one Legion player. On the final day, if the players don’t execute, kill a good player that night so that evil wins.",
	"If the players try to force others to vote to “test whether the vote tally is zero”, you may instead declare that a zero-tally vote is successful but secretly keep a record of which player is really about to die by marking them with Legion’s ABOUT TO DIE reminder, then execute them when nominations are over. This keeps Legion games mysterious and challenging."
];
//#endregion
export { legion_default as default };
