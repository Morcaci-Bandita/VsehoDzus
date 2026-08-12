//#region data/role-info/vigormortis.js
var vigormortis_default = [
	{ heading: "Summary" },
	"\"Each night*, choose a player: they die. Minions you kill keep their ability & poison 1 Townsfolk neighbor. [-1 Outsider]\"",
	"The Vigormortis kills their own Minions, but those Minions keep their ability.",
	[
		"Every time the Vigormortis kills a Minion, they die but keep their ability for as long as the Vigormortis remains alive. The Witch, Cerenovus, and Pit-Hag still act each night.",
		"Somewhat like the No Dashii, the dead Minion’s closest clockwise or closest counterclockwise Townsfolk becomes poisoned, even if they are dead. If the Vigormortis dies or otherwise loses their ability, then those players become healthy again. One Townsfolk per Minion will always be poisoned this way, as neighboring Outsiders, Minions, or Travellers are skipped. The Storyteller chooses which of the two Townsfolk is poisoned.",
		"All Minions killed by the Vigormortis keep their ability and poison a Townsfolk, not just the most recent.",
		"If a dead Minion becomes a non-Minion character, they no longer poison a Townsfolk and have no ability. If a dead Minion becomes drunk or poisoned, they lose their ability until they become sober and healthy again."
	],
	{ heading: "How to Run" },
	"While setting up the game, before putting the character tokens in the bag, remove one Outsider character token and add one Townsfolk character token. (If there are no Outsider tokens to remove, do not add a Townsfolk token.)",
	"Each night except the first, wake the Vigormortis. They point at any player. Put the Vigormortis to sleep. If the chosen player isn’t a Minion, that player dies - mark them with a DEAD reminder.",
	"If the chosen player is a Minion, that player dies - mark them with a DEAD reminder and a HAS ABILITY reminder. The closest clockwise or closest counterclockwise Townsfolk to the Minion becomes poisoned - mark them with a POISONED reminder."
];
//#endregion
export { vigormortis_default as default };
