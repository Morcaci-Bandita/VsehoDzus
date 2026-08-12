//#region data/role-info/farmer.js
var farmer_default = [
	{ heading: "Summary" },
	"\"When you die at night, an alive good player becomes a Farmer.\"",
	"The Farmer creates more farmers.",
	[
		"If a Farmer dies at night, another player becomes a Farmer too.",
		"Only players that are good can become Farmers this way.",
		"If this new Farmer also dies at night, another Farmer is created.",
		"Farmers that die during the day, such as by execution, do not create more Farmers.",
		"Farmers that have turned evil, such as from the Mezepheles’ ability, can create more Farmers. But Townsfolk and Outsiders that have turned evil cannot become a Farmer.",
		"Farmers do not learn who each other are, but each player that becomes a Farmer learns that they are now a Farmer.",
		"When a player becomes a Farmer, they are no longer their old character, and do not have that ability. Any ongoing effects of their old ability immediately end."
	],
	{ heading: "How to Run" },
	"If the Farmer died tonight, wake an alive good player. Show them the YOU ARE info token and a Farmer character token, then put them to sleep. Replace their previous character token with a Farmer character token."
];
//#endregion
export { farmer_default as default };
