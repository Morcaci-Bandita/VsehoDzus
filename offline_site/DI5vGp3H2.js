//#region data/role-info/assassin.js
var assassin_default = [
	{ heading: "Summary" },
	"\"Once per game, at night*, choose a player: they die, even if for some reason they could not.\"",
	"The Assassin kills who the Demon cannot.",
	[
		"Once per game at night, the Assassin can kill a player. This player dies, even if they are protected from death in any way, such as from an ability.",
		"The Assassin ability is affected by drunkenness and poisoning, as normal.",
		"If the Assassin attacks the Goon, the Goon dies and turns evil."
	],
	{ heading: "How to Run" },
	"Each night except the first, wake the Assassin. They either shake their head no or point at any player. Put the Assassin to sleep.",
	"If the Assassin chose a player, that player dies— mark them with the DEAD reminder. This cannot be prevented in any way (except if the Assassin doesn’t have their ability, such as if they’re drunk or poisoned). The Assassin loses their ability—mark them with the NO ABILITY reminder and remove their night token from the night sheet. (The Assassin won’t wake again.)"
];
//#endregion
export { assassin_default as default };
