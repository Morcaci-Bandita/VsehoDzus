//#region data/role-info/chef.js
var chef_default = [
	{ heading: "Summary" },
	"\"You start knowing how many pairs of evil players there are.\"",
	"The Chef knows if evil players are sitting next to each other.",
	["On the first night, the Chef learns exactly how many pairs of evil players there are in total. A pair is two players, but one player may be a part of two pairs. So, two players sitting next to each other is one pair. Three players sitting next to each other is two pairs. Four players sitting next to each other is three pairs. And so on.", "The Chef detects evil Travellers just like other character types, but only if those Travellers joined the game before the Chef acts."],
	{ heading: "How to Run" },
	"During the first night, wake the Chef. Show the Chef fingers (0, 1, 2, etc.) equaling the number of pairs of neighboring evil players. Put the Chef to sleep."
];
//#endregion
export { chef_default as default };
