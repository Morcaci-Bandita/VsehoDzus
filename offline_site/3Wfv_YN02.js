//#region data/role-info/chambermaid.js
var chambermaid_default = [
	{ heading: "Summary" },
	"\"Each night, choose 2 alive players (not yourself): you learn how many woke tonight due to their ability.\"",
	"The Chambermaid learns who woke up at night.",
	[
		"Each night, the Chambermaid chooses two players and learns if they woke tonight. They must choose alive players, and may not choose themself. This does not detect which of those players woke, only how many.",
		"This ability only detects characters who woke in order to use their ability. It does not detect characters who woke for any other reason—such as if the Storyteller woke a Minion to let them know who the Demon is, woke the Demon to give them their starting Demon info, woke a player due to the ability of a different character, or woke someone accidentally.",
		"If the character woke on a previous night but not this night, they are not detected by the Chambermaid.",
		"Players that woke tonight due to their ability but are drunk or poisoned still count as having woke tonight.",
		"If the Chambermaid chooses a dead player accidentally, the Storyteller prompts them to choose again."
	],
	{ heading: "How to Run" },
	"Each night, wake the Chambermaid. They point at any two alive players except themself. Show the Chambermaid fingers (0, 1, or 2) equaling the number of chosen characters who woke tonight. Put the Chambermaid to sleep.",
	"Do not wake the Chambermaid if there are not two players alive to be chosen (due to the Mastermind, Zombuul, etc.)."
];
//#endregion
export { chambermaid_default as default };
