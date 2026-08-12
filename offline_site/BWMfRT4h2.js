//#region data/role-info/knight.js
var knight_default = [
	{ heading: "Summary" },
	"\"You start knowing 2 players that are not the Demon.\"",
	"The Knight knows players that are not the Demon.",
	[
		"On the first night, the Knight learns two players who are not the Demon.",
		"On subsequent nights, they learn nothing more.",
		"The Knight can learn Townsfolk, Outsiders or even Minions but does not learn which character type they are."
	],
	{ heading: "How to Run" },
	"During setup, mark two non-Demon players with the Knight’s KNOW reminders. During the first night, wake the Knight. Point to the two players marked KNOW."
];
//#endregion
export { knight_default as default };
