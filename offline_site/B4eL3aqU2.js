//#region data/role-info/apprentice.js
var apprentice_default = [
	{ heading: "Summary" },
	"\"On your 1st night, you gain a Townsfolk ability (if good) or a Minion ability (if evil).\"",
	"The Apprentice has either a Townsfolk or a Minion ability.",
	[
		"A good Apprentice gains a Townsfolk ability. An evil Apprentice gains a Minion ability. They have this ability until they die.",
		"The Apprentice learns their ability on their first night, and they may act that night if the character whose ability they gain would do so.",
		"Only abilities listed on the character sheet may be gained.",
		"If the Apprentice gains an ability that normally only functions on the first night of the game, such as the Grandmother’s, it functions on the Apprentice’s first night instead.",
		"The Apprentice does not literally become the character whose ability they gain. They are the Apprentice, a Traveller, so they may be exiled but not executed, and they do not count toward the number of alive players to see if evil wins due to just two players being alive. Also, other characters’ abilities that detect characters would detect the Apprentice as the Apprentice."
	],
	{ heading: "How to Run" },
	"During the first night after the Apprentice enters play, wake the Apprentice. Show them the YOU ARE info token, then a Townsfolk or Minion token. In the Grimoire, replace the Apprentice token with that character token, and mark them with the IS THE APPRENTICE reminder. That player remains the Apprentice but gains the ability of their character token.",
	"You will almost certainly want to choose a not-in-play character ability, because there is only one of each character token and the Apprentice needs to use that token."
];
//#endregion
export { apprentice_default as default };
