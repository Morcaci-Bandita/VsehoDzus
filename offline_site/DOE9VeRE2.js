//#region data/role-info/knaves.js
var knaves_default = [
	{ heading: "Summary" },
	"\"There are 2 Storytellers: one lies & one tells the truth. Once per game, at dusk, they might switch.\"",
	"The Knaves are two Storytellers.",
	[
		"When the Knaves is in play, there are two Storytellers. When players get their information from character abilities, one Storyteller gives true information, and the other Storyteller gives false information.",
		"The players do not know which Storyteller is which. Each player chooses which Storyteller will give them information each time that they communicate.",
		"Storytellers always tell the truth when it comes to game rules, and non-character ability information, such as declaring who has been nominated, giving Demon bluffs, the Minion info step etc.",
		"If a player is drunk or poisoned, a Storyteller can tell the truth or lie.",
		"Once per game, usually when the good players start to figure out which Storyteller is which, the truth-telling Storyteller can become the lying Storyteller, and vice versa."
	],
	{ heading: "How to Run" },
	"There are two Storytellers. Before the 1st night, decide which of you will tell the truth, and which will lie.",
	"Each night when a player wakes to receive information due to their ability, or when a player visits the Storyteller during the day, prompt them to choose which Storyteller will give them their info.",
	"Once per game, at dusk, if both Storytellers agree, the truth-telling Storyteller becomes the lying Storyteller, and the lying Storyteller becomes the truth-telling Storyteller.",
	{ heading: "Examples" },
	"There are two Storytellers, Ben and Lachlan. The Chef wakes and chooses Lachlan, who is the lying Storyteller. The Chef learns a \"3\", even though there are only 2 pairs of evil players.",
	"Later that game, the Storytellers switch. The Savant visits Ben and Lachlan and chooses Lachlan. The Savant learns 2 pieces of true information."
];
//#endregion
export { knaves_default as default };
