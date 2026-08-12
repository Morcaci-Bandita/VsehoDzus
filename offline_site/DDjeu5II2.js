//#region data/role-info/lleech.js
var lleech_default = [
	{ heading: "Summary" },
	"\"Each night*, choose a player: they die. You start by choosing a player: they are poisoned. You die if & only if they are dead.\"",
	"The Lleech lives if their host lives, and dies if their host dies.",
	[
		"On the first night, the Lleech chooses a player, who is poisoned for the rest of the game.",
		"If this player is alive, the Lleech cannot die. If the Lleech is executed, the Storyteller tells the group that the player lives, but not why.",
		"If the player that the Lleech chose dies, the Lleech dies as well. If this means that only one or two players are left alive, good still wins, because the Demon is dead.",
		"From the second night onwards, players that the Lleech attacks die but are not poisoned.",
		"If a Lleech is created mid-game, they poison a player that night. They must choose an alive player."
	],
	{ heading: "How to Run" },
	"During the first night, wake the Lleech. They point at any player. That player is poisoned—mark them with the POISONED reminder. Put the Lleech to sleep.",
	"Each night except the first, wake the Lleech. They point at any player. That player dies—mark them with the DEAD reminder. Put the Lleech to sleep.",
	"If the Lleech would die but the player marked with the Lleech’s POISONED reminder is alive, the Lleech does not die. If the player marked with the Lleech’s POISONED reminder is dead, the Lleech dies and the good team wins.",
	"When giving false information to a good player poisoned by the Lleech, make sure this information seems true. If the good player believes it to be false, they will quickly execute themselves and win the game."
];
//#endregion
export { lleech_default as default };
