//#region data/role-info/organgrinder.js
var organgrinder_default = [
	{ heading: "Summary" },
	"\"All players keep their eyes closed when voting and the vote tally is secret. Each night, choose if you are drunk until dusk.\"",
	"The Organ Grinder makes voting secret.",
	[
		"When a player is nominated, players vote with eyes closed.",
		"The Storyteller does not count the votes out loud, and does not reveal how many players voted once voting is complete.",
		"The Storyteller doesn’t reveal which player is “about to die”.",
		"After nominations have closed, the Storyteller reveals which player is executed, as normal.",
		"Dead players may vote once if they have a vote token. Their vote token is removed at the end of the day instead of after the vote.",
		"If the Organ Grinder is drunk, the vote happens with eyes open, as normal. The Storyteller makes no comment as to whether the Organ Grinder is dead or alive. That night, the Organ Grinder chooses to become sober or drunk again."
	],
	{ heading: "How to Run" },
	"Each night, wake the Organ Grinder. The Organ Grinder either nods or shakes their head. If they nod their head, mark them with the DRUNK reminder. Put the Organ Grinder to sleep.",
	"When a player has been nominated and a vote is just about to begin, and the Organ Grinder is sober, ask all players to close their eyes. If they ask why, tell them that an Organ Grinder is in play. When counting votes, do so silently. Afterwards, do not reveal how many players voted, nor if the nominee is “about to die”. If there were enough votes to execute the nominee, mark them with the ABOUT TO DIE reminder. Ask players to open their eyes, and if there are any more nominations.",
	"When nominations are closed, declare that the player marked ABOUT TO DIE, is executed.",
	"Each dusk, remove the DRUNK reminder.",
	"Players are not allowed to use other methods to determine who is voting, such as touch or sound. It is a secret."
];
//#endregion
export { organgrinder_default as default };
