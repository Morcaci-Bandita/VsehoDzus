//#region data/role-info/cultleader.js
var cultleader_default = [
	{ heading: "Summary" },
	"\"Each night, you become the alignment of an alive neighbor. If all good players choose to join your cult, your team wins.\"",
	"The Cult Leader wins if everyone joins their cult.",
	[
		"At the end of each night, the Cult Leader becomes the alignment of a living neighbor.",
		"Once per day, the Cult Leader may publicly choose to form a cult. If all good players vote to join the cult, the game ends immediately and the Cult Leader’s team wins.",
		"The Cult Leader may form a cult at any point in the day.",
		"Voting to join a cult does not require a vote token.",
		"Players may say whatever they want at any time, so a player bluffing as the Cult Leader may pretend to form a cult."
	],
	{ heading: "How to Run" },
	"Each night, turn the Cult Leader character token right side up (if both alive neighbors are good) or upside down (if both alive neighbors are evil) or either (if one alive neighbor is good and the other alive neighbor is evil). If the Cult Leader's alignment changes, wake the Cult Leader and give a thumbs up or a thumbs down, then put the Cult Leader to sleep. If the Cult Leader’s alignment doesn’t change, do not wake them.",
	"During the day, the Cult Leader may declare that they wish to use their ability. If so, enter the circle and run a vote in the same way that you would for an Exile. If all good players raise their hand, declare which team has won. If not all good players raise their hand, nothing happens."
];
//#endregion
export { cultleader_default as default };
