//#region data/role-info/empath.js
var empath_default = [
	{ heading: "Summary" },
	"\"Each night, you learn how many of your 2 alive neighbors are evil.\"",
	"The Empath keeps learning if their living neighbours are good or evil.",
	[
		"The Empath only learns how many of their neighbours are evil, not which one is evil.",
		"The Empath does not detect dead players. So, if the Empath is sitting next to a dead player, they do not get info about that dead player. Instead, they get info about the closest alive player in that direction.",
		"The Empath acts after the Demon, so if the Demon kills one of the Empath's alive neighbours, the Empath does not learn about the now-dead player. The Empath's information is accurate at dawn, not at dusk."
	],
	{ heading: "How to Run" },
	"Each night, wake the Empath. Show them fingers (0, 1, or 2) equaling the number of evil players neighbouring the Empath. Put the Empath to sleep."
];
//#endregion
export { empath_default as default };
