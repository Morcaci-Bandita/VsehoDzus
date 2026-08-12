//#region data/role-info/philosopher.js
var philosopher_default = [
	{ heading: "Summary" },
	"\"Once per game, at night, choose a good character: gain that ability. If this character is in play, they are drunk.\"",
	"The Philosopher has no ability until they decide which character they want to emulate.",
	[
		"They can do this once per game. When they do so, they gain that character’s ability. They do not become that character.",
		"They may want to wait a while to choose. If the Philosopher chooses a character that is already in play, the player of that character becomes drunk. If the Philosopher then dies or becomes drunk or poisoned, the player they are making drunk becomes sober again.",
		"If the Philosopher chose a character that was not in play at the time but is in play now, that character is drunk.",
		"If the Philosopher gains an ability that works at night, they wake when that character would wake. If this ability is used on the first night only, they use it tonight.",
		"If the Philosopher regains their ability via the Bone Collector, or uses their ability twice via the Barista, the Philosopher may choose a new ability, or the same ability as before.",
		"If the Philosopher’s ability works while dead, such as the Klutz’s, it works if the Philosopher is dead."
	],
	{ heading: "How to Run" },
	"Each night, wake the Philosopher. They either shake their head no or point at any Townsfolk icon or any Outsider icon on their character sheet. Put the Philosopher to sleep.",
	"If they pointed to an icon of a character not in play, swap the Philosopher token with the chosen character token and mark them with the IS THE PHILOSOPHER reminder.",
	"If they pointed to an icon of a character in play, the player of the chosen character becomes drunk - mark them with the DRUNK reminder. (You can now use the duplicated character’s reminders for the Philosopher). If the Philosopher dies, the player made drunk by the Philosopher becomes sober - remove the DRUNK reminder."
];
//#endregion
export { philosopher_default as default };
