//#region data/role-info/professor.js
var professor_default = [
	{ heading: "Summary" },
	"\"Once per game, at night*, choose a dead player: if they are a Townsfolk, they are resurrected.\"",
	"The Professor can bring someone back from the dead.",
	[
		"Once per game, the Professor can choose a dead player. If that player is a Townsfolk, they are resurrected, becoming alive again.",
		"If the Professor chooses an Outsider, Minion, or Demon, then nothing happens, and the Professor’s ability is gone.",
		"The resurrected player regains their ability, even a “once per game” ability they used already.",
		"Resurrected Townsfolk may or may not get to act on the night of their resurrection, depending on whether they would act before or after the Professor. If they had a “first night only” or “you start knowing” ability, they immediately wake to use it again, as soon as the Professor goes to sleep."
	],
	{ heading: "How to Run" },
	"Each night except the first, wake the Professor. The Professor either shakes their head no or points to a dead player. Put the Professor to sleep.",
	"If the Professor chose a dead Townsfolk, the chosen player becomes alive again—mark them with the Professor’s ALIVE reminder and remove their shroud. (They wake later tonight if they normally would. If they wake on the first night only, they wake now to use their ability.) At dawn, after declaring which players died, declare which player is alive again. (Do not say why.) The Professor loses their ability—mark them with the NO ABILITY reminder and remove their night token from the night sheet."
];
//#endregion
export { professor_default as default };
