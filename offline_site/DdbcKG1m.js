//#region data/role-info/monk.js
var monk_default = [
	{ heading: "Summary" },
	"\"Each night*, choose a player (not yourself): they are safe from the Demon tonight.\"",
	"The Monk protects other players from the Demon.",
	[
		"Each night except the first, the Monk may choose to protect any player except themself.",
		"If the Demon attacks a player who has been protected by the Monk, then that player does not die. The Demon does not get to attack another player—there is simply no death tonight.",
		"The Monk does not protect against the Demon nominating and executing someone."
	],
	{ heading: "How to Run" },
	"Each night except the first, wake the Monk. The Monk points at any player except themself. (If the Monk points at themself, shake your head no and prompt them to point at another player.) Put the Monk to sleep. Put the Monk's SAFE reminder token by the chosen player's character token.",
	"If the Demon attacks the player marked SAFE, the player remains alive. (Do not mark them with the Demon's DEAD reminder token or add a shroud as you normally would.) At dawn, declare that no one died at night. (Do not say why.)",
	"At dawn, remove the SAFE reminder token.",
	"In other editions, Demons may have abilities other than killing. The Monk's protection also prevents all other harmful effects of the Demon's ability, such as poisoning or turning the protected player evil."
];
//#endregion
export { monk_default as default };
