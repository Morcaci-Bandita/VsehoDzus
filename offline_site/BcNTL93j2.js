//#region data/role-info/towncrier.js
var towncrier_default = [
	{ heading: "Summary" },
	"\"Each night*, you learn if a Minion nominated today.\"",
	"The Town Crier knows when Minions nominate.",
	["Each night, the Town Crier learns either a “yes” or a “no”.", "They do not learn which players are Minions or how many Minions made nominations, just whether or not any Minions made nominations today."],
	{ heading: "How to Run" },
	"Each dawn, mark the Town Crier with the MINIONS NOT NOMINATED reminder, and remove the MINION NOMINATED reminder, if any.",
	"Each day, if any Minion makes a nomination, replace the MINIONS NOT NOMINATED reminder with the MINION NOMINATED reminder.",
	"Each night except the first, wake the Town Crier. If the Town Crier is marked MINIONS NOT NOMINATED, shake your head no. If the Town Crier is marked MINION NOMINATED, nod your head yes. Then, put the Town Crier to sleep. Remove the MINION NOMINATED reminder, if any.",
	"If you forget whether a Minion made a nomination or not, wake each Minion at night and ask by showing them the DID YOU NOMINATE TODAY? info token. They must answer honestly, then go to sleep."
];
//#endregion
export { towncrier_default as default };
