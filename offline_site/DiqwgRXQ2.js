//#region data/role-info/cannibal.js
var cannibal_default = [
	{ heading: "Summary" },
	"\"You have the ability of the recently killed executee. If they are evil, you are poisoned until a good player dies by execution.\"",
	"The Cannibal eats executed characters, gaining their ability.",
	[
		"If a good player dies by execution, the Cannibal gains that player’s ability. If an evil player dies by execution, the Cannibal only thinks that they gain an ability, since the Cannibal is poisoned. The Storyteller may be lying to them.",
		"Each time a player dies by execution, the Cannibal loses the ability of the previous player.",
		"Executing a dead player won’t grant the Cannibal an ability. Executing a living player who doesn’t die won’t grant the Cannibal an ability. A player must be executed and die for the Cannibal to gain their ability.",
		"The Cannibal is not told which ability they have gained. They must figure that out for themselves.",
		"If the Cannibal has an “even if dead” ability, such as the Recluse, or an ability that implies it works while dead, such as the Ravenkeeper or Sweetheart, the Cannibal keeps that ability when they die, but loses their Cannibal ability."
	],
	{ heading: "How to Run" },
	"If a good player dies by execution, mark them with the LUNCH reminder, and remove the Cannibal’s POISONED reminder if necessary. The Cannibal now has this good player’s ability (do not say which), and will wake at night when this good character would normally wake.",
	"If an evil player dies by execution, mark them with the LUNCH reminder and mark the Cannibal with the POISONED reminder. The Cannibal is poisoned. You may wake them when this evil character would normally wake, and pretend that they have a new ability.",
	"Pay attention to which character each evil player is bluffing as. If they are executed, then their bluffed ability is the best one to pretend that the Cannibal has gained."
];
//#endregion
export { cannibal_default as default };
