//#region data/role-info/flowergirl.js
var flowergirl_default = [
	{ heading: "Summary" },
	"\"Each night*, you learn if a Demon voted today.\"",
	"The Flowergirl knows if the Demon voted or not.",
	[
		"A Demon’s vote counts whether or not the nominee was executed.",
		"The Flowergirl does not detect if the Demon raised their hand for other reasons, such as when the players “vote” on what to order for dinner, or when the players raise their hand to exile a Traveller.",
		"If the Demon changes players after the original Demon voted but before the Flowergirl wakes to learn their information, the Flowergirl detects the original Demon.",
		"If there are two (or more!) Demons, even dead Demons, the Flowergirl detects if any of them voted. If even one Demon voted, the Flowergirl learns a “yes”."
	],
	{ heading: "How to Run" },
	"Each dawn, mark the Flowergirl with the DEMON NOT VOTED reminder, and remove the DEMON VOTED reminder, if any.",
	"Each day, if the Demon votes for any execution, replace the DEMON NOT VOTED reminder with the DEMON VOTED reminder.",
	"Each night except the first, wake the Flowergirl. If the Flowergirl is marked DEMON NOT VOTED, shake your head no. If the Flowergirl is marked DEMON VOTED, nod your head yes. Then, put the Flowergirl to sleep.",
	"If you forget whether the Demon voted or not, wake the Demon at night and ask by showing them the DID YOU VOTE TODAY? info token. They must answer honestly, then go to sleep."
];
//#endregion
export { flowergirl_default as default };
