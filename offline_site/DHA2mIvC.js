//#region data/role-info/gossip.js
var gossip_default = [
	{ heading: "Summary" },
	"\"Each day, you may make a public statement. Tonight, if it was true, a player dies.\"",
	"The Gossip deliberately speaks lies, in the hope of uncovering the truth.",
	[
		"Each day, the Gossip may make a public statement. If this statement is true, the Storyteller kills a player that night. If it is false, then no players die due to the Gossip.",
		"Mumbled words, whispers, statements the Storyteller doesn’t know are true or false, or statements that someone cannot hear don’t count. Like the Slayer’s ability, the Storyteller and every player must be able to hear and understand the Gossip and be aware that the Gossip is using their ability in order for the Storyteller to judge what happens next.",
		"If the Gossip made a true statement during the day while drunk or poisoned, but is sober and healthy when their ability triggers that night, the Storyteller still kills a player."
	],
	{ heading: "How to Run" },
	"Each day, if the Gossip makes a definite, true public statement, put the Gossip’s DEAD reminder in the center of the left side of the Grimoire as a reminder to yourself to place it tonight.",
	"Each night except the first, if the Gossip made a definite, true public statement today, you choose any player. The chosen player dies—mark them with the DEAD reminder.",
	"When choosing a player to die due to the Gossip ability, we recommend that you choose a character that will actually die, not one protected from death by an ability (like the Fool or Tea Lady). The Gossip gains knowledge when their statement caused a death. This is more helpful to the good team, and more fun for everyone."
];
//#endregion
export { gossip_default as default };
