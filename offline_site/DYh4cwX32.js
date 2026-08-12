//#region data/role-info/bountyhunter.js
var bountyhunter_default = [
	{ heading: "Summary" },
	"\"You start knowing 1 evil player. If the player you know dies, you learn another evil player tonight. [1 Townsfolk is evil]\"",
	"The Bounty Hunter tracks down evil players, one at a time.",
	[
		"The Bounty Hunter starts knowing one evil player. When that player dies, they learn another evil player.",
		"The Bounty Hunter only learns the evil player, not their character.",
		"If the Bounty Hunter is drunk or poisoned when they should learn a new player, the Storyteller may show them a good player. When the recently shown player dies, the Bounty Hunter learns a new player that night.",
		"The Bounty Hunter cannot learn the same evil player twice.",
		"If the Bounty Hunter is in the game at setup, one Townsfolk is evil. The Bounty Hunter may learn the evil Townsfolk."
	],
	{ heading: "How to Run" },
	"During setup, turn one Townsfolk character token upside down, to represent that they are evil. Mark one evil player with the KNOW reminder.",
	"During the first night, wake the Bounty Hunter. Point to the player marked KNOW. Put the Bounty Hunter to sleep.",
	"Each time the player marked KNOW dies, mark a new evil player with the KNOW reminder. That night, wake the Bounty Hunter, point to the player marked KNOW, then put the Bounty Hunter to sleep."
];
//#endregion
export { bountyhunter_default as default };
