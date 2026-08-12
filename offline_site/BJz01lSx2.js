//#region data/role-info/king.js
var king_default = [
	{ heading: "Summary" },
	"\"Each night, if the dead equal or outnumber the living, you learn 1 alive character. The Demon knows you are the King.\"",
	"The King learns which characters are still alive.",
	[
		"The King gains this ability after a few nights have passed — once the dead players equal or outnumber the living.",
		"At the start of the game, the Demon learns who the King is. If a King is created mid-game, the Demon learns who the King is that night.",
		"The King may not survive long enough to use their ability. Once the number of dead players is equal to or greater than the number of alive players, the King learns one alive character each night.",
		"The King may learn good or evil characters, and may even learn the same character more than once.",
		"There may not be a Choirboy in play. But if there is, and they are still alive when the Demon kills the King, the Choirboy learns who the Demon is."
	],
	{ heading: "How to Run" },
	"During the first night, wake the Demon. Show them the THIS PLAYER IS info token, then the King token, then point at the King player. Put the Demon to sleep.",
	"When the number of dead players equals or exceeds the number of alive players, add a night token to the King’s entry on the night sheet.",
	"Each night, if the King has a night token on the night sheet, wake the King. Show one alive character token. Put the King to sleep.",
	"Think carefully about what character tokens to show the King. Don’t be afraid to give great information. Most Kings will die before the final day. A King that lives to the final day will usually win, and that’s ok."
];
//#endregion
export { king_default as default };
