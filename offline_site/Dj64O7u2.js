//#region data/role-info/pukka.js
var pukka_default = [
	{ heading: "Summary" },
	"\"Each night, choose a player: they are poisoned. The previously poisoned player dies then becomes healthy.\"",
	"The Pukka poisons its victims, who die at a later time.",
	[
		"When the Pukka attacks, their victim is poisoned immediately. The next night, just after the Pukka attacks again, that player dies.",
		"Unlike other Demons, the Pukka acts during the first night.",
		"The Exorcist prevents the Pukka from waking to poison a player. The Innkeeper prevents the Pukka from killing a poisoned player, then that player is no longer poisoned.",
		"If the Pukka is drunk and chooses a player, that player does not become poisoned, so does not die the following night.",
		"If the Pukka was sober when they chose a player the previous night, but is drunk at night, that player does not die. But when the Pukka sobers up, the poison resumes and kills the player at night."
	],
	{ heading: "How to Run" },
	"Each night, wake the Pukka. They point at any player. Put the Pukka to sleep. The chosen player is poisoned—mark them with a POISONED reminder.",
	"Each night except the first, the other player marked POISONED dies—mark them with a DEAD reminder, then remove their POISONED reminder.",
	"Players that the Pukka kills are still poisoned at their time of death. If you are using characters from other editions, you may need to keep the POISONED reminder by the DEAD reminder until their death ability is resolved. For example, if the Pukka kills the Sage, the Sage may get false information due to being poisoned by the Pukka."
];
//#endregion
export { pukka_default as default };
