//#region data/role-info/dreamer.js
var dreamer_default = [
	{ heading: "Summary" },
	"\"Each night, choose a player (not yourself or Travellers): you learn 1 good & 1 evil character, 1 of which is correct.\"",
	"The Dreamer learns players' characters, but is not sure if their information is entirely correct.",
	[
		"Each night, the Dreamer chooses a player and learns two characters—one that the player is, and one that the player isn’t.",
		"The false character token depends on the chosen player’s true character type. If the Dreamer chooses a player who is a Townsfolk or Outsider, the false character token is any Minion or Demon. If they choose a player who is a Minion or Demon, the false character token is a Townsfolk or Outsider.",
		"The Dreamer may not choose themself, and may not choose a Traveller."
	],
	{ heading: "How to Run" },
	"Each night, wake the Dreamer. They point at any player. If the chosen player’s character is a Townsfolk or Outsider, show their character token and any Minion or Demon token to the Dreamer. If the chosen player’s character is a Minion or Demon, show their character token and any Townsfolk or Outsider token to the Dreamer. Then, put the Dreamer to sleep.",
	"If the Dreamer chooses an evil player, you can help the evil team if you show the Dreamer the good character that this evil player is bluffing as, or if you show a more secretive character such as the Snake Charmer, Sage, Mutant, or Klutz."
];
//#endregion
export { dreamer_default as default };
