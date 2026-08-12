//#region data/role-info/bonecollector.js
var bonecollector_default = [
	{ heading: "Summary" },
	"\"Once per game, at night*, choose a dead player: they regain their ability until dusk.\"",
	"The Bone Collector temporarily gives dead players their ability back.",
	[
		"The Bone Collector must choose a dead player. The chosen player remains dead, but they get their ability to use. If their ability was a “you start knowing” or a “once per game” ability—such as the Virgin, Slayer, Clockmaker, Seamstress, or Juggler—they may use it again, even if it was already used, until dusk falls.",
		"When the Bone Collector chooses a player, that player does not learn they were selected by the Bone Collector, although they find out soon enough when they are woken to use their ability.",
		"If the Bone Collector dies, that player no longer has the ability they regained due to the Bone Collector."
	],
	{ heading: "How to Run" },
	"Each night except the first, wake the Bone Collector. They either shake their head no or point at any dead player. Put the Bone Collector to sleep.",
	"If they pointed at a dead player, the chosen player regains their ability—mark their character token with the Bone Collector’s HAS ABILITY reminder. (They may need to be woken tonight to use their ability.) The Bone Collector loses their ability—mark them with their NO ABILITY reminder. The next dusk, the chosen player loses their ability—remove the HAS ABILITY reminder."
];
//#endregion
export { bonecollector_default as default };
