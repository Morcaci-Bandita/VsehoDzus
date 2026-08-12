//#region data/role-info/fanggu.js
var fanggu_default = [
	{ heading: "Summary" },
	"\"Each night*, choose a player: they die. The 1st Outsider this kills becomes an evil Fang Gu & you die instead. [+1 Outsider]\"",
	"The Fang Gu possesses Outsiders.",
	[
		"The first time a Fang Gu attacks and kills an Outsider, the Fang Gu dies, and the Outsider becomes a Fang Gu and turns evil.",
		"This can only happen once per game. If the new Fang Gu attacks an Outsider, the Outsider dies as normal.",
		"The new Fang Gu counts as the Demon, and good wins if they die. They do not learn which players are Minions.",
		"There is an extra Outsider in play.",
		"If the Fang Gu attacks an Outsider but that Outsider does not die, that Outsider does not become an evil Fang Gu and the Fang Gu does not die."
	],
	{ heading: "How to Run" },
	"While setting up the game, before putting character tokens in the bag, add one extra Outsider character token and remove one Townsfolk character token.",
	"Each night except the first, wake the Fang Gu. They point at any player. Put the Fang Gu to sleep.",
	"If the chosen player is not an Outsider, that player dies—mark them with the DEAD reminder.",
	"If the chosen player is an Outsider and the ONCE reminder is in the center of the Grimoire, that player dies—mark them with the DEAD reminder.",
	"If the chosen player is an Outsider and the ONCE reminder is not in the centre of the Grimoire, the Fang Gu dies—mark them with the DEAD reminder. Wake the chosen Outsider. Show them the YOU ARE info token, then the Fang Gu token, then the YOU ARE info token, then a thumbs-down. Change their character to a Fang Gu—swap their character token with the spare Fang Gu token. They become evil. Put the new Fang Gu to sleep. Put the ONCE reminder in the center of the Grimoire. (Unlike “Once per game” abilities, this reminder stays there for the rest of the game. Don’t remove it, even if the Fang Gu dies or changes character.)"
];
//#endregion
export { fanggu_default as default };
