//#region data/role-info/ogre.js
var ogre_default = [
	{ heading: "Summary" },
	"\"On your 1st night, choose a player (not yourself): you become their alignment (you don't know which) even if drunk or poisoned.”",
	"The Ogre is someone's best friend.",
	[
		"The Ogre's chosen player does not change, even if the Ogre is drunk or poisoned when they chose.",
		"The Ogre becomes the same alignment as their chosen player immediately on the first night, even if the Ogre is drunk or poisoned.",
		"The Ogre is not told their alignment at the beginning of the game.",
		"If the Ogre changes alignment by other means, the Ogre learns their new alignment, as normal.",
		"If an Ogre is created mid-game, the Ogre chooses a player that night, and becomes their alignment."
	],
	{ heading: "How to Run" },
	"During the first night, wake the Ogre. The Ogre points to a player. Put the Ogre to sleep. If the Ogre pointed to an evil player, flip the Ogre's character token upside down to represent that the Ogre is evil.",
	"Optional rule: Mark the Ogre’s chosen player with a FRIEND reminder. The Ogre is always the same alignment as their friend. If the Ogre’s friend changes alignment, the Ogre changes alignment too, but the Ogre does not learn this.",
	"This is only recommended for games of 15 players or more, so that there are not too many evil players."
];
//#endregion
export { ogre_default as default };
