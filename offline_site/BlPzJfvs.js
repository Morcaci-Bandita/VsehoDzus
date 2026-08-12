//#region data/role-info/mathematician.js
var mathematician_default = [
	{ heading: "Summary" },
	"\"Each night, you learn how many players' abilities worked abnormally (since dawn) due to another character's ability.\"",
	"The Mathematician knows how many things have gone wrong since dawn today.",
	[
		"When an ability does not work in the intended way due to another character's interference, the Mathematician will learn that it happened. They'll learn that something went wrong if a piece of information was false but was supposed to be true, or if an ability should have worked but didn't, due to another character.",
		"The Mathematician does not learn which players this happened to, only how many times it happened.",
		"The Mathematician does not detect their own ability failing.",
		"The Mathematician does not detect drunkenness or poisoning itself, but does detect when drunk or poisoned players' abilities did not work as intended. The Recluse registering as evil to the Chef, and the poisoned Soldier dying from the Imp's attack, would each be detected. The poisoned Empath getting true information would not."
	],
	{ heading: "How to Run" },
	"Each time a character's ability works abnormally due to another character's ability, mark them with an ABNORMAL reminder.",
	"Each night, wake the Mathematician. Show fingers (0, 1, 2, etc.) equaling the number of characters with ABNORMAL reminders. Put the Mathematician to sleep. Remove all ABNORMAL reminders."
];
//#endregion
export { mathematician_default as default };
