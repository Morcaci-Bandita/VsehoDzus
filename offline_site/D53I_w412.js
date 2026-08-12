//#region data/role-info/barista.js
var barista_default = [
	{ heading: "Summary" },
	"\"Each night, until dusk, 1) a player becomes sober, healthy & gets true info, or 2) their ability works twice. They learn which.\"",
	"The Barista either makes people sober & healthy, or allows them to act twice as much as normal.",
	[
		"The Storyteller chooses which player the Barista affects each night, and which one of the two Barista abilities is in effect. The Barista does not know who or what the Storyteller chooses, but the affected player does.",
		"If the affected player is acting twice, then they do so at the normal time. If they would normally wake at night, they act, go to sleep, then wake to act again. If they have already used a “once per game” ability, they may use that ability again. If they have a “once per game” ability but have not used it yet, they may use it twice before dusk.",
		"If the Barista makes a player sober and healthy, their drunkenness and poisoning, if any, is removed, and they may not become drunk or poisoned until dusk. This player must get true information, even if a Vortox is in play."
	],
	{ heading: "How to Run" },
	"Each night, remove previous reminders then put the Barista’s SOBER AND HEALTHY reminder or their ACTS TWICE reminder by any character token. Wake that character’s player and show them the THIS CHARACTER SELECTED YOU info token, the Barista token, then one finger (to show they are sober and healthy) or two fingers (to show they act twice). Put that player to sleep.",
	"A player marked SOBER AND HEALTHY is sober and healthy (even if they’re also marked DRUNK or POISONED) and always gets true information (even if an ability would make them drunk or poisoned).",
	"A player marked ACTS TWICE acts twice at the appropriate time. (If the ability is optional, they may use it twice. If it is mandatory, they must use it twice.) Use the Barista’s ? reminders if needed, to substitute for the character’s own reminders.",
	"Some characters are better off knowing they are sober and healthy, as they gain no benefit from acting twice, such as the Flowergirl, Town Crier, or Oracle.",
	"The Barista ensures players get true information even if an ability causes false information, such as a Fortune Teller, Spy, or Recluse."
];
//#endregion
export { barista_default as default };
