//#region data/role-info/ventriloquist.js
var ventriloquist_default = [
	{ heading: "Summary" },
	"\"If a player is mad as a fresh character during their nomination, they might not die if executed today.\"",
	"The Ventriloquist rewards players for lying about who they are.",
	[
		"Being \"mad as a fresh character\" means to claim to be a character that is different to a character that you have previously claimed to be.",
		"A player benefits from the Ventriloquist only if they are mad as a fresh character during the time that they are nominated.",
		"It doesn't matter what their real character is. Players may be mad as a fake character then later mad as their real character, mad as their real character then later mad as a fake character, or mad as two fake characters.",
		"If the player does not die, they learn this after the execution happens. They don't learn whether it was due to the Ventriloquist or not.",
		"The Storyteller judges whether the player is mad or not, and might let them die even if they were convincingly mad.",
		"This can protect the Demon, but the Storyteller will not protect the Demon if that means that evil wins.",
		"A player is only protected from dying on the same day that they were mad as a fresh character."
	],
	{ heading: "How to Run" },
	"When a player is nominated, before the vote is completed, if they are mad as a character that is different from a character they have been mad as previously, even if either character is their true character, and that player becomes about to die, mark them with the MAD reminder.",
	"If an execution occurs, and the executee is marked MAD due to the Ventriloquist, declare that they are executed and you may declare that they do not die.",
	{ heading: "Examples" },
	"Abdallah is the Gambler. On the 1st day, he is mad that he is the Gambler. When nominated, he is mad that he is the Hatter. Later that day, Abdallah is executed and does not die.",
	"Marianna is the Professor. She has been claiming to be the Empath all game. When nominated, she claims to be the Huntsman. When executed, Marianna does not die.",
	"Julian is the Hermit. Julian is quiet for 3 days. When nominated, Julian is mad as the Knight, and says that Evin and Alex are not the Demon. When executed, Julian dies, because he was not mad as a fresh character."
];
//#endregion
export { ventriloquist_default as default };
