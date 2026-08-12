//#region data/role-info/gunslinger.js
var gunslinger_default = [
	{ heading: "Summary" },
	"\"Each day, after the 1st vote has been tallied, you may choose a player that voted: they die.\"",
	"The Gunslinger kills players who vote.",
	[
		"Each day, after the first vote for execution has been tallied, the Gunslinger may publicly choose a player that just voted to die immediately. The Gunslinger does not have to kill a player—it is entirely up to them. Whether they use their ability or not, the Gunslinger cannot kill any further players that day.",
		"It is the Gunslinger’s responsibility to speak up and let the Storyteller know that they wish to use their ability.",
		"Since exiles are not affected by character abilities in any way, the Gunslinger cannot use their ability to kill a player that supports an exile."
	],
	{ heading: "How to Run" },
	"Each day, immediately after the first vote for execution is tallied, the Gunslinger can declare that they wish to use their ability. If so, the Gunslinger points at any player who voted for this execution. The chosen player dies.",
	"If the Gunslinger is a new player, you may wish to remind them that they can use their ability.",
	"When the Gunslinger wants to use their ability, you may need to ask all players who voted to raise their hand again, so the Gunslinger doesn’t accidentally choose a player that didn’t vote."
];
//#endregion
export { gunslinger_default as default };
