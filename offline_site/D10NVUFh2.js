//#region data/role-info/barber.js
var barber_default = [
	{ heading: "Summary" },
	"\"If you died today or tonight, the Demon may choose 2 players (not another Demon) to swap characters.\"",
	"The Barber allows the Demon to swap any 2 player's characters.",
	[
		"The players’ alignments stay the same when they swap characters. Each player learns which character they become.",
		"The Demon may choose not to swap players.",
		"If a player becomes a new character, they gain the new ability, even if it was a “you start knowing” ability or a “once per game” ability that the original character already used.",
		"If there is more than one living Demon, the Storyteller chooses which Demon makes the swap.",
		"The Demon may choose themself to swap.",
		"The Demon may not choose another Demon player to swap.",
		"If a player dies then becomes the Barber, the Demon may not swap two players’ characters tonight."
	],
	{ heading: "How to Run" },
	"If the Barber dies, mark them with the HAIRCUTS TONIGHT reminder.",
	"During that night, wake the Demon. Show them the THIS CHARACTER SELECTED YOU info token, then the Barber token. The Demon either shakes their head no or points to two players. Put the Demon to sleep. Remove the HAIRCUTS TONIGHT reminder.",
	"If the Demon pointed to two players, swap the character tokens of the chosen players. One at a time, wake each swapped player, show them the YOU ARE info token and their new character token, then put them to sleep. If a player’s alignment does not match the color of their character token, turn it upside-down.",
	"If a good player becomes a Minion or Demon, or an evil player becomes a Townsfolk or Outsider, you may wish to remind them that their alignment has not changed."
];
//#endregion
export { barber_default as default };
