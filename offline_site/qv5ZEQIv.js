import { A as i, I as i$1, P as b, a as bg3, r as bg1, t as when, u as bg8, v as header, x as main5 } from "./CY602n9t.js";
import { A as APPENDED_ROLES, C as isProtected, D as tooltip, P as TRAVELLER_SHEET, S as isGood, b as img, c as MediaQueryController, d as alignment, m as capitalize, r as state, s as BREAKPOINTS, x as isDroisoned } from "./CP0hEE1l.js";
import { o as waitUntil } from "./vIOCOudq.js";
import { t as router } from "./CkjLjtft.js";
import "./ntwYzdyv.js";
import { A as info, M as eyeShow, R as grim, c as edit, j as eyeHide, y as cards } from "./CEyrKUT7.js";
import { n as moon, t as sun } from "./C15Vso4Y.js";
import { t as inlay } from "./Ue9OS-EJ.js";
import "./GnpzsBGp.js";
import { t as button } from "./CbFrBy7s.js";
import { t as iconButton } from "./C0jyJKsx.js";
import { t as dialog } from "./Dm27KaR0.js";
import { t as error } from "./BnMAryrf.js";
import { t as context } from "./BgH8Gcb8.js";
import "./DPxjp5Y3.js";
import { t as radio } from "./Bx4sgpmC.js";
import "./CXEVaKnf2.js";
//#region src/pages/night-phase.js
/**
* Computes which players will be newly dead at the end of the current night
* by mirroring the setState death logic without mutating state.
*
* @param {*} game
* @returns {Array} players that will die this night (with a computed `dead` property)
*/
function computeNightDeaths(game) {
	let grandchildDied = false;
	let nightDeaths = game.players.map((player) => {
		let computedDead = player.dead ?? null;
		const godfatherDeadToken = player.tokens.find((t) => t.id === "godfather-Dead");
		if (godfatherDeadToken) computedDead = {
			day: game.day,
			icon: godfatherDeadToken.icon,
			id: godfatherDeadToken.id,
			type: godfatherDeadToken.type,
			humanReadableRole: godfatherDeadToken.humanReadableRole,
			hasDeadVote: true
		};
		if (player.tokens.find((t) => t.id === "acrobat-Dead")) computedDead = {
			day: game.day,
			icon: "acrobat",
			id: "acrobat",
			type: "Townsfolk",
			humanReadableRole: "Acrobat",
			hasDeadVote: true
		};
		const gamblerDeadToken = player.tokens.find((t) => t.id === "gambler-Dead");
		if (gamblerDeadToken) computedDead = {
			day: game.day,
			icon: gamblerDeadToken.icon,
			id: gamblerDeadToken.id,
			type: gamblerDeadToken.type,
			humanReadableRole: gamblerDeadToken.humanReadableRole,
			hasDeadVote: true
		};
		if (player.tokens.find((t) => t.id === "shabaloth-Alive")) computedDead = null;
		const gossipDeadToken = player.tokens.find((t) => t.id === "gossip-Dead");
		if (gossipDeadToken) computedDead = {
			day: game.day,
			icon: gossipDeadToken.icon,
			id: gossipDeadToken.icon,
			type: gossipDeadToken.type,
			humanReadableRole: gossipDeadToken.humanReadableRole,
			hasDeadVote: true
		};
		const tinkerDeadToken = player.tokens.find((t) => t.id === "tinker-Dead");
		if (tinkerDeadToken) computedDead = {
			day: game.day,
			icon: tinkerDeadToken.icon,
			id: tinkerDeadToken.icon,
			type: tinkerDeadToken.type,
			humanReadableRole: tinkerDeadToken.humanReadableRole,
			hasDeadVote: true
		};
		const assassinDeadToken = player.tokens.find((t) => t.id === "assassin-Dead");
		if (assassinDeadToken) computedDead = {
			day: game.day,
			icon: assassinDeadToken.icon,
			id: assassinDeadToken.icon,
			type: assassinDeadToken.type,
			humanReadableRole: assassinDeadToken.humanReadableRole,
			hasDeadVote: true
		};
		const moonchildDeadToken = player.tokens.find((t) => t.id === "moonchild-Dead");
		if (moonchildDeadToken) computedDead = {
			day: game.day,
			icon: moonchildDeadToken.icon,
			id: moonchildDeadToken.icon,
			type: moonchildDeadToken.type,
			humanReadableRole: moonchildDeadToken.humanReadableRole,
			hasDeadVote: true
		};
		const demonDeadToken = player.tokens.find((t) => t.type.toLowerCase() === "demon" && t.label.toLowerCase() === "dead");
		if (demonDeadToken && !isProtected(player)) {
			if (player.tokens.some((t) => t.id === "grandmother-Grandchild")) grandchildDied = true;
			computedDead = {
				day: game.day,
				icon: demonDeadToken.icon,
				id: demonDeadToken.icon,
				type: demonDeadToken.type,
				humanReadableRole: demonDeadToken.humanReadableRole,
				hasDeadVote: true
			};
		}
		if (computedDead && !player.dead) {
			if (computedDead.id.toLowerCase().includes("assassin")) return {
				...player,
				dead: computedDead
			};
			if (isProtected(player)) return null;
			return {
				...player,
				dead: computedDead
			};
		}
		return null;
	}).filter(Boolean);
	if (grandchildDied) {
		const grandmother = game.players.find((p) => p.suspectedRole?.id === "grandmother");
		if (!nightDeaths.some((p) => p.id === grandmother.id) && !isProtected(grandmother)) nightDeaths.push({
			...grandmother,
			dead: {
				day: game.day,
				icon: "grandmother",
				id: "grandmother",
				type: "Townsfolk",
				humanReadableRole: "Grandchild",
				hasDeadVote: true
			}
		});
	}
	return nightDeaths;
}
/**
*
* @param {*} tokenName
* @param {*} label
* @param {*} game
* @param {*} parameters
* @returns
*/
function assignTokenToPlayer(tokenName, label, game, parameters = { showNightOrder: true }) {
	return b`<button
    ui-button
    primary
    @click=${() => {
		dialog.open({
			id: "playerSelect",
			parameters
		}).then((targets) => {
			const targetedMayor = tokenName.includes("-Dead") ? targets.find((p) => p.suspectedRole?.id === "mayor") : null;
			function applyToken(tokenName, targets) {
				let foundToken = game.tokens?.find((t) => t.id === tokenName);
				if (tokenName === "lilmonsta-Is The Demon") foundToken = {
					id: "lilmonsta-Is The Demon",
					role: "lilmonsta",
					label: "Is The Demon",
					icon: "lilmonsta",
					type: "demon",
					humanReadableRole: "Lil Monsta"
				};
				if (tokenName === "lilmonsta-Dead") foundToken = {
					id: "lilmonsta-Dead",
					role: "lilmonsta",
					label: "Dead",
					icon: "lilmonsta",
					type: "demon",
					humanReadableRole: "Lil Monsta"
				};
				state.setState((s) => {
					const players = s.currentGame.players.map((p) => {
						p.tokens = p.tokens.filter((t) => t.id !== tokenName);
						return p;
					});
					return {
						...s,
						currentGame: {
							...s.currentGame,
							players: players.map((p) => {
								if (targets.some((selectedPlayer) => selectedPlayer.id === p.id)) p.tokens.push(foundToken);
								if (parameters?.additionalActions) p = parameters.additionalActions(p, targets);
								return p;
							})
						}
					};
				});
				parameters?.callback?.(targets);
			}
			if (targets.length) if (targetedMayor) dialog.open({
				id: "playerSelect",
				parameters: {
					title: "Bounce kill?",
					autoScroll: false,
					text: "You chose the mayor, do you want to kill someone else instead?",
					selected: targets,
					...tokenName === "po-Dead" ? { multiple: true } : {},
					...tokenName === "po-Dead" ? { maxSelect: 3 } : {}
				}
			}).then((targets) => {
				applyToken(tokenName, targets);
			});
			else applyToken(tokenName, targets);
		});
	}}
  >
    ${label}
  </button>`;
}
function inlineDialog(fn, opts) {
	return dialog.open({
		id: "inline",
		parameters: {
			render: fn,
			button: opts?.button
		}
	});
}
const balgruf = b`
  h2 { font-family: "Balgruf"; font-size: 2.5rem; color: var(--ui-main-5);
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 1); margin: 0; text-align: center; }
`;
/**
*
* @param {*} param0
* @returns
*/
function showPlayer({ stText, title, role, nextBtn }) {
	return inlineDialog(() => b`
      <style>
        ${balgruf} h2 {
          line-height: 0.9;
        }

        .container {
          height: calc(100% - 80px);
          display: flex;
          flex: 1;
          align-items: center;
          flex-direction: column;
        }

        .big-role {
          width: 150px;
          display: block;
          margin: 0 auto;
          border-radius: 50%;
          margin-bottom: 20px;
          background-color: ${bg8};
        }

        .wrapper {
          flex: 1;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
        }

        img.red {
          border: solid 4px #d9403b;
        }
        img.blue {
          border: solid 4px #45a0f1;
        }

        h2 {
          color: var(--ui-main-5);
        }
        h2.red {
          color: #d9403b;
        }
        h2.blue {
          color: #45a0f1;
        }
        h2.yellow {
          color: #ffee00;
        }
        h2.green {
          color: #a7e16c;
        }
        img.yellow {
          border: solid 2px #ffee00;
        }
        img.green {
          border: solid 2px #a7e16c;
        }

        p {
          text-align: center;
          font-size: 0.625rem;
        }
      </style>
      <div class="container">
        ${when(!!stText, () => b` <p>${stText}</p> `)}
        ${when(!!title, () => b` <h2>${title}</h2> `)}

        <div class="wrapper">
          <img
            class="big-role ${alignment(role?.type)}"
            src="${img(role)}"
            alt="${role?.humanReadableRole}"
          />
          <h2 class="${alignment(role?.type)}">${role?.humanReadableRole}</h2>
        </div>
      </div>
    `, { ...nextBtn ? { button: b`<button
              ui-button
              primary
              @click=${() => dialog.close()}
            >
              Next
            </button>` } : {} });
}
/**
*
* @param {*} param0
* @returns
*/
function showPlayerName({ stText, title, name, nextBtn }) {
	return inlineDialog(() => b`
      <style>
        ${balgruf} h2 {
          line-height: 0.9;
        }

        .container {
          height: calc(100% - 80px);
          display: flex;
          flex: 1;
          align-items: center;
          flex-direction: column;
        }

        .big-role {
          width: 150px;
          display: block;
          margin: 0 auto;
          border-radius: 50%;
          margin-bottom: 20px;
          background-color: ${bg8};
        }

        .wrapper {
          flex: 1;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
        }

        img.red {
          border: solid 4px #d9403b;
        }
        img.blue {
          border: solid 4px #45a0f1;
        }

        h2 {
          color: var(--ui-main-5);
        }
        h2.red {
          color: #d9403b;
        }
        h2.blue {
          color: #45a0f1;
        }
        h2.yellow {
          color: #ffee00;
          h2.green {
            color: #a7e16c;
          }
        }
        img.yellow {
          border: solid 2px #ffee00;
          img.green {
            border: solid 2px #a7e16c;
          }
        }

        p {
          text-align: center;
          font-size: 0.625rem;
        }
      </style>
      <div class="container">
        ${when(!!stText, () => b` <p>${stText}</p> `)}
        ${when(!!title, () => b` <h2>${title}</h2> `)}

        <div class="wrapper">
          <h2 class="">${name}</h2>
        </div>
      </div>
    `, { ...nextBtn ? { button: b`<button
              ui-button
              primary
              @click=${() => dialog.close()}
            >
              Next
            </button>` } : {} });
}
function showPlayerRoleToken(player) {
	return b`<style>
    .big-role {
      width: 60%;
      display: block;
      margin: 0 auto;
      border-radius: 50%;
      background-color: ${bg8};
    }

    img.red {
      border: solid 4px #d9403b;
    }
    img.blue {
      border: solid 4px #45a0f1;
    }

    h2.red {
      color: #d9403b;
    }
    h2.blue {
      color: #45a0f1;
    }
         h2.yellow {
        color: #ffee00;
      }
        h2.green {
          color: #a7e16c;
        }
      img.yellow {
        border: solid 2px #ffee00;
      }
        img.green {
          border: solid 2px #a7e16c;
        }

    h2 {
      font-family: "Balgruf";
      font-size: 2.5rem;
      text-shadow: 1px 1px 2px rgba(0, 0, 0, 1);
      margin: 0;
      text-align: center;
    }

    .wrapper {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      flex: 1;
      height: calc(100% - 80px);
    }
  </style>
  <div class="wrapper">
    <img class="big-role ${alignment(player.suspectedRole.type)}" src=${img(player.suspectedRole)}></img>
    <h2 class="${alignment(player.suspectedRole.type)}">${player.suspectedRole?.humanReadableRole}</h2>
  </div>`;
}
function fanggu() {
	return ({ role, game }) => {
		const alreadyJumped = (game.players.find((p) => p.suspectedRole?.id === "fanggu")?.suspectedRole?.meta ?? {}).jumped;
		const fangguDeadToken = game.tokens.find((t) => t.id === "fanggu-Dead");
		return b`
      <button
        ui-button
        primary
        @click=${() => {
			dialog.open({
				id: "playerSelect",
				parameters: { showNightOrder: true }
			}).then(async ([selected]) => {
				if (selected?.suspectedRole?.id === "mayor") selected = await dialog.open({
					id: "playerSelect",
					parameters: {
						title: "Bounce kill?",
						autoScroll: false,
						text: "You chose the mayor, do you want to kill someone else instead?",
						selected: [selected]
					}
				}).then(([player]) => player);
				const isOutsider = selected?.suspectedRole?.type?.toLowerCase() === "outsider";
				const selectedIsProtected = isProtected(selected);
				const shouldJump = !alreadyJumped && isOutsider && !selectedIsProtected;
				let jumpedPlayerName = null;
				state.setState((s) => {
					const fanggu = s.currentGame.players.find((p) => p.suspectedRole?.id === "fanggu");
					const meta = {
						...fanggu?.suspectedRole?.meta ?? {},
						jumped: shouldJump ? true : fanggu?.suspectedRole?.meta?.jumped ?? false,
						jumpedTonight: shouldJump
					};
					return {
						...s,
						currentGame: {
							...s.currentGame,
							players: s.currentGame.players.map((p) => {
								if (shouldJump) {
									if (p.id === selected.id) {
										jumpedPlayerName = p.name;
										return {
											...p,
											suspectedRole: {
												...role,
												meta
											}
										};
									}
									if (p.id === fanggu.id) return {
										...p,
										suspectedRole: {
											...p.suspectedRole,
											meta
										},
										dead: {
											id: fangguDeadToken.id,
											day: s.currentGame.day,
											icon: fangguDeadToken.icon,
											type: fangguDeadToken.type,
											hasDeadVote: true,
											humanReadableRole: fangguDeadToken.humanReadableRole
										}
									};
								} else if (p.id === selected.id) return {
									...p,
									tokens: [...p.tokens, s.currentGame.tokens.find((t) => t.id === "fanggu-Dead")]
								};
								return p;
							})
						}
					};
				});
				if (shouldJump && jumpedPlayerName) showPlayer({
					stText: `Show ${capitalize(jumpedPlayerName)}`,
					title: `The Fang Gu jumped to ${capitalize(jumpedPlayerName)}`,
					role
				});
			});
		}}
      >
        Select a player
      </button>
    `;
	};
}
/**
* @import { GameState } from '../../types';
*
* @typedef {{
*  role: string,
*  game: GameState['currentGame'],
*  nightOrder: Array<GameState['currentGame']['players'][number] & { __sortOrder: number}>,
* }} RoleSpecificActionsParams
*/
const roleSpecificActions = {
	fanggu: fanggu(),
	shugenja: ({ role, nightOrder, game }) => {
		const players = game.players;
		const total = players.length;
		const isEvil = (p) => ["minion", "demon"].includes(p?.suspectedRole?.type?.toLowerCase());
		const shugenjaIndex = players.findIndex((p) => p.suspectedRole?.id === "shugenja");
		let clockwiseDistance = null;
		let counterDistance = null;
		for (let i = 1; i < total; i++) {
			const clockwisePlayer = players[(shugenjaIndex + i) % total];
			const counterPlayer = players[(shugenjaIndex - i + total) % total];
			if (clockwiseDistance === null && isEvil(clockwisePlayer)) clockwiseDistance = i;
			if (counterDistance === null && isEvil(counterPlayer)) counterDistance = i;
			if (clockwiseDistance !== null && counterDistance !== null) break;
		}
		let direction = "";
		if (clockwiseDistance !== null && counterDistance !== null) direction = clockwiseDistance < counterDistance ? "clockwise" : clockwiseDistance > counterDistance ? "anticlockwise" : Math.random() < .5 ? "clockwise" : "anticlockwise";
		else if (clockwiseDistance !== null) direction = "clockwise";
		else if (counterDistance !== null) direction = "anticlockwise";
		else direction = "neither (no evil players found)";
		return b`<p class="center">
      The nearest evil player is <span class="balgruf">${direction}</span>.
    </p>`;
	},
	acrobat: ({ role, game }) => {
		return assignTokenToPlayer("acrobat-Chosen", "Choose a player", game);
	},
	empath: ({ role, game }) => {
		const players = game.players;
		const totalPlayers = players.length;
		const empathIndex = players.findIndex((player) => player.suspectedRole?.id === "empath");
		const findAliveNeighbor = (start, direction) => {
			for (let i = 1; i < totalPlayers; i++) {
				const index = (start + i * direction + totalPlayers) % totalPlayers;
				if (!players[index].dead && !players[index].tokens.some((t) => t.id.includes("-Dead"))) return players[index];
			}
			return null;
		};
		const leftNeighbor = findAliveNeighbor(empathIndex, -1);
		const rightNeighbor = findAliveNeighbor(empathIndex, 1);
		return b`<p class="center">
        The empath has
        <span class="balgruf">${[leftNeighbor, rightNeighbor].filter(Boolean).filter((p) => ["minion", "demon"].includes(p?.suspectedRole?.type?.toLowerCase()) || p?.tokens?.some((t) => t.id.toLowerCase().includes("marionette"))).length}</span> alive evil
        neighbors.
      </p>
      <style>
        .empath-neighbors botc-player-details {
          margin-bottom: 12px;
        }

        .empath-neighbors .empath {
          opacity: 0.4;
        }
      </style>
      <div class="empath-neighbors">
        ${[
			leftNeighbor,
			players[empathIndex],
			rightNeighbor
		].map((p) => b`<botc-player-details
              class="${p.suspectedRole?.id}"
              .player=${p}
            ></botc-player-details>`)}
      </div> `;
	},
	widow: ({ role, game }) => {
		return b`
      ${when(!game.players.find((p) => p.tokens.some((t) => t.id === "widow-Poisoned")), () => assignTokenToPlayer("widow-Poisoned", "Choose a player to poison", game))}
      <button
        ui-button
        primary
        @click=${() => {
			dialog.open({
				id: "playerSelect",
				parameters: {
					allScriptRoles: true,
					filterFn: (player) => player.suspectedRole?.type?.toLowerCase() !== "minion" && player.suspectedRole?.type?.toLowerCase() !== "demon"
				}
			}).then(([player]) => {
				state.setState((s) => ({
					...s,
					currentGame: {
						...s.currentGame,
						players: s.currentGame.players.map((p) => {
							if (p.id === player.id) {
								p.tokens = p.tokens.filter((t) => t.id !== "widow-Knows");
								p.tokens.push(s.currentGame.tokens.find((t) => t.id === "widow-Knows"));
							}
							return p;
						})
					}
				}));
				inlineDialog(() => b`
                  <style>
                    p.smol {
                      font-size: 0.75rem;
                      margin-top: 0;
                      text-align: center;
                    }
                  </style>
                  <p class="smol">Show ${capitalize(player.name)}</p>
                  ${showPlayerRoleToken({ suspectedRole: rolesById.widow })}
                `);
			});
		}}
      >
        Choose a good player who Knows
      </button>

      <button
        ui-button
        primary
        @click=${() => {
			dialog.open({ id: "grim" });
		}}
      >
        Show grim
      </button>
    `;
	},
	cultleader: ({ role, game }) => {
		const cultLeader = game.players.find((p) => p.suspectedRole?.id === "cultleader");
		const players = game.players;
		const n = players.length;
		const cultLeaderIndex = players.findIndex((p) => p.id === cultLeader.id);
		const findAliveNeighbor = (start, direction) => {
			for (let i = 1; i < n; i++) {
				const index = (start + i * direction + n) % n;
				if (!players[index].dead && !players[index].tokens.some((t) => t.id.includes("-Dead"))) return players[index];
			}
			return null;
		};
		const leftNeighbor = findAliveNeighbor(cultLeaderIndex, -1);
		const rightNeighbor = findAliveNeighbor(cultLeaderIndex, 1);
		[leftNeighbor, rightNeighbor].filter(Boolean);
		const isEvil = cultLeader.tokens.some((t) => t.id === "special-Evil");
		const currentAlignment = isEvil ? "evil" : "good";
		return b`
      <style>
        .alignment-selection {
          display: flex;
          justify-content: center;
          margin: 20px 0;
          flex-direction: column;
        }
        .alignment-info {
          margin-bottom: 32px;
          margin-top: 32px;
        }

        .alignment-selection label[ui-label]:has(input[ui-radio]) {
          margin-bottom: 8px;
        }

        .good {
          color: #45a0f1 !important;
        }
        .evil {
          color: #d9403b !important;
        }

        botc-player-details {
          margin-bottom: 12px !important;
        }
        botc-player-details.cultleader {
          opacity: 0.4;
        }
      </style>

      <div class="alignment-selection">
        <label ui-label for="good-alignment">
          <input
            ui-radio
            type="radio"
            name="alignment"
            id="good-alignment"
            ?checked=${!isEvil}
            visually-hidden
            @change=${() => {
			state.setState((s) => ({
				...s,
				currentGame: {
					...s.currentGame,
					players: s.currentGame.players.map((p) => {
						if (p.id === cultLeader.id) {
							p.tokens = p.tokens.filter((t) => t.id !== "special-Evil");
							if (!p.tokens.some((t) => t.id === "special-Good")) p.tokens.push(game.tokens.find((t) => t.id === "special-Good"));
						}
						return p;
					})
				}
			}));
		}}
          />
          <div>
            <div class="toggle"><span class="selected"></span></div>
            <div class="content">Good</div>
          </div>
        </label>

        <label ui-label for="evil-alignment">
          <input
            ui-radio
            type="radio"
            name="alignment"
            id="evil-alignment"
            ?checked=${isEvil}
            visually-hidden
            @change=${() => {
			state.setState((s) => ({
				...s,
				currentGame: {
					...s.currentGame,
					players: s.currentGame.players.map((p) => {
						if (p.id === cultLeader.id) {
							p.tokens = p.tokens.filter((t) => t.id !== "special-Good");
							if (!p.tokens.some((t) => t.id === "special-Evil")) p.tokens.push(game.tokens.find((t) => t.id === "special-Evil"));
						}
						return p;
					})
				}
			}));
		}}
          />
          <div>
            <div class="toggle"><span class="selected"></span></div>
            <div class="content">Evil</div>
          </div>
        </label>
      </div>

      <button
        ui-button
        primary
        @click=${() => {
			inlineDialog(() => b`
              <style>
                ${balgruf} h2 {
                  font-size: 2rem;
                  text-align: center;
                  margin-bottom: 40px;
                }
                .container {
                  height: calc(100% - 80px);
                  display: flex;
                  align-items: center;
                  justify-content: center;
                  flex-direction: column;
                }
                .alignment {
                  font-size: 5rem;
                  margin: 40px 0;
                }
                .good {
                  color: #45a0f1;
                }
                .evil {
                  color: #d9403b;
                }
                p.smol {
                  font-size: 0.75rem;
                  margin-top: 0;
                  text-align: center;
                }
              </style>
              <p class="smol">Show ${capitalize(cultLeader.name)}</p>
              <div class="container">
                <h2>You are</h2>
                ${showPlayerRoleToken({ suspectedRole: {
				icon: currentAlignment,
				humanReadableRole: capitalize(currentAlignment),
				type: currentAlignment === "good" ? "Townsfolk" : "Demon"
			} })}
              </div>
            `);
		}}
      >
        Show alignment to Cult Leader
      </button>

      <div class="alignment-info">
        ${[
			leftNeighbor,
			cultLeader,
			rightNeighbor
		].map((n) => b`
            <botc-player-details
              class="${n.suspectedRole.id}"
              .player=${n}
            ></botc-player-details>
          `)}
      </div>
    `;
	},
	bureaucrat: ({ role, game }) => {
		return assignTokenToPlayer("bureaucrat-3 Votes", "Choose a player", game, { filterFn: (p) => {
			return !(p.suspectedRole?.id === "bureaucrat");
		} });
	},
	thief: ({ role, game }) => {
		return assignTokenToPlayer("thief-Negative Vote", "Choose a player", game, { filterFn: (p) => {
			return !(p.suspectedRole?.id === "thief");
		} });
	},
	chef: ({ role, game }) => {
		const totalPlayers = game.players.length;
		let evilPairs = 0;
		const isEvil = (player) => ["minion", "demon"].includes(player.suspectedRole?.type?.toLowerCase()) || player.tokens.some((t) => t.id.toLowerCase().includes("marionette"));
		for (let i = 0; i < totalPlayers; i++) {
			const currentPlayer = game.players[i];
			const nextPlayer = game.players[(i + 1) % totalPlayers];
			if (isEvil(currentPlayer) && isEvil(nextPlayer)) evilPairs++;
		}
		return b`<p class="center">
      There ${evilPairs !== 1 ? "are" : "is"}
      <span class="balgruf">${evilPairs}</span> evil
      pair${evilPairs !== 1 ? "s" : ""}.
    </p>`;
	},
	investigator: ({ role, game }) => {
		const minion = game.players.find((p) => p.tokens.some((t) => t.id === "investigator-Minion"));
		const wrong = game.players.find((p) => p.tokens.some((t) => t.id === "investigator-Wrong"));
		if (!wrong && !minion) return b`
        ${assignTokenToPlayer("investigator-Minion", "Choose a player to be minion", game)}
        ${assignTokenToPlayer("investigator-Wrong", "Choose a player to be wrong", game)}
      `;
		if (!minion) return assignTokenToPlayer("investigator-Minion", "Choose a player to be minion", game);
		if (!wrong) return assignTokenToPlayer("investigator-Wrong", "Choose a player to be wrong", game);
		if (minion && wrong) return b` <p class="center">
          The *MINION* is
          <span class="balgruf">${capitalize(minion.name)}</span>, and
          <span class="balgruf">${capitalize(wrong.name)}</span> is *WRONG*.
        </p>
        <button
          ui-button
          primary
          @click=${() => {
			dialog.open({
				id: "roleSelect",
				parameters: {
					allScriptRoles: true,
					selected: [minion.suspectedRole],
					filterFn: (r) => r.type.toLowerCase() !== "traveller"
				}
			}).then(([chosenRole]) => {
				if (!chosenRole) return;
				dialog.open({
					id: "playerSelect",
					parameters: {
						showNightOrder: true,
						multiple: true,
						maxSelect: 2,
						selected: [minion, wrong]
					}
				}).then(([a, b]) => {
					if (!a || !b) return;
					inlineDialog(() => showPlayer({
						title: `${capitalize(a.name)} or ${capitalize(b.name)} is:`,
						role: chosenRole
					}));
				});
			});
		}}
        >
          Show Minion token
        </button>`;
	},
	librarian: ({ role, game }) => {
		const outsider = game.players.find((p) => p.tokens.some((t) => t.id === "librarian-Outsider"));
		const wrong = game.players.find((p) => p.tokens.some((t) => t.id === "librarian-Wrong"));
		if (!game.players.some((p) => p?.suspectedRole?.type?.toLowerCase() === "outsider" || p?.tokens?.some((t) => t.id === "drunk-Is The Drunk"))) return b`<p class="center">There are no outsiders in play.</p>`;
		if (!wrong && !outsider) return b`
        ${assignTokenToPlayer("librarian-Outsider", "Choose a player to be outsider", game)}
        ${assignTokenToPlayer("librarian-Wrong", "Choose a player to be wrong", game)}
      `;
		if (!outsider) return assignTokenToPlayer("librarian-Outsider", "Choose a player to be outsider", game);
		if (!wrong) return assignTokenToPlayer("librarian-Wrong", "Choose a player to be wrong", game);
		if (outsider && wrong) return b` <p class="center">
          The *OUTSIDER* is
          <span class="balgruf">${capitalize(outsider.name)}</span>, and
          <span class="balgruf">${capitalize(wrong.name)}</span> is *WRONG*.
        </p>
        <button
          ui-button
          primary
          @click=${() => {
			dialog.open({
				id: "roleSelect",
				parameters: {
					allScriptRoles: true,
					selected: [outsider.suspectedRole],
					filterFn: (r) => r.type.toLowerCase() !== "traveller"
				}
			}).then(([chosenRole]) => {
				if (!chosenRole) return;
				dialog.open({
					id: "playerSelect",
					parameters: {
						showNightOrder: true,
						multiple: true,
						maxSelect: 2,
						selected: [outsider, wrong]
					}
				}).then(([a, b]) => {
					if (!a || !b) return;
					inlineDialog(() => showPlayer({
						title: `${capitalize(a.name)} or ${capitalize(b.name)} is:`,
						role: chosenRole
					}));
				});
			});
		}}
        >
          Show Outsider token
        </button>`;
	},
	banshee: ({ role, game }) => {
		const banshee = game.players.find((p) => p.suspectedRole?.id === "banshee");
		const hasAbility = banshee?.tokens.some((t) => t.id === "banshee-Has Ability");
		if (banshee.tokens.some((t) => t.type?.toLowerCase() === "demon" && t.id.includes("Dead")) && !hasAbility) return b` <p class="center">
        The Banshee was killed by the Demon tonight!<br />
        Announce this to all players.
      </p>`;
	},
	washerwoman: ({ role, game }) => {
		const townsfolk = game.players.find((p) => p.tokens.some((t) => t.id === "washerwoman-Townsfolk"));
		const wrong = game.players.find((p) => p.tokens.some((t) => t.id === "washerwoman-Wrong"));
		if (!wrong && !townsfolk) return b`
        ${assignTokenToPlayer("washerwoman-Townsfolk", "Choose a player to be townsfolk", game)}
        ${assignTokenToPlayer("washerwoman-Wrong", "Choose a player to be wrong", game)}
      `;
		if (!townsfolk) return assignTokenToPlayer("washerwoman-Townsfolk", "Choose a player to be townsfolk", game);
		if (!wrong) return assignTokenToPlayer("washerwoman-Wrong", "Choose a player to be wrong", game);
		if (townsfolk && wrong) return b` <p class="center">
          The *TOWNSFOLK* is
          <span class="balgruf">${capitalize(townsfolk.name)}</span>, and
          <span class="balgruf">${capitalize(wrong.name)}</span> is *WRONG*.
        </p>
        <button
          ui-button
          primary
          @click=${() => {
			dialog.open({
				id: "roleSelect",
				parameters: {
					allScriptRoles: true,
					selected: [townsfolk.suspectedRole],
					filterFn: (r) => r.type.toLowerCase() !== "traveller"
				}
			}).then(([chosenRole]) => {
				if (!chosenRole) return;
				dialog.open({
					id: "playerSelect",
					parameters: {
						showNightOrder: true,
						multiple: true,
						maxSelect: 2,
						selected: [townsfolk, wrong]
					}
				}).then(([a, b]) => {
					if (!a || !b) return;
					inlineDialog(() => showPlayer({
						title: `${capitalize(a.name)} or ${capitalize(b.name)} is:`,
						role: chosenRole
					}));
				});
			});
		}}
        >
          Show Townsfolk token
        </button>`;
	},
	pixie: ({ role, game }) => {
		game.players.find((p) => p.suspectedRole?.id === "pixie");
		const playerWithMadToken = game.players.find((p) => p.tokens.some((t) => t.id === "pixie-Mad"));
		if (playerWithMadToken) return b`
        <button
          ui-button
          primary
          @click=${() => {
			showPlayer({
				title: "Mad:",
				role: playerWithMadToken.suspectedRole
			});
		}}
        >
          Show Townsfolk token
        </button>
      `;
		const townsfolkInPlay = game.players.filter((p) => p.suspectedRole?.type?.toLowerCase() === "townsfolk").map((p) => p.suspectedRole);
		return b`
      <button
        ui-button
        primary
        @click=${() => {
			dialog.open({
				id: "roleSelect",
				parameters: {
					allScriptRoles: true,
					filterFn: (r) => r.type?.toLowerCase() === "townsfolk" && townsfolkInPlay.some((t) => t?.id === r.id) && r.id !== "pixie"
				}
			}).then(([chosenRole]) => {
				if (!chosenRole) return;
				const targetPlayer = game.players.find((p) => p.suspectedRole?.id === chosenRole.id);
				const pixieMadToken = game.tokens.find((t) => t.id === "pixie-Mad");
				if (targetPlayer) state.setState((s) => ({
					...s,
					currentGame: {
						...s.currentGame,
						players: s.currentGame.players.map((p) => {
							if (p.id === targetPlayer.id) return {
								...p,
								tokens: [...p.tokens, pixieMadToken]
							};
							return p;
						})
					}
				}));
				showPlayer({
					title: "Mad:",
					role: chosenRole
				});
			});
		}}
      >
        Choose Townsfolk to show
      </button>
    `;
	},
	poisoner: ({ role, game }) => {
		return assignTokenToPlayer("poisoner-Poisoned", "Poison player", game);
	},
	pithag: ({ role, game }) => {
		const rolesInPlay = game.players.map((p) => p.suspectedRole);
		return b`
      <button
        ui-button
        primary
        @click=${() => {
			dialog.open({
				id: "playerSelect",
				parameters: { showNightOrder: true }
			}).then(([selected]) => {
				if (!selected) return;
				dialog.open({
					id: "roleSelect",
					parameters: { allScriptRoles: true }
				}).then(([chosenRole]) => {
					if (!chosenRole) return;
					if (!rolesInPlay.some((r) => r.id === chosenRole.id)) {
						state.setState((s) => ({
							...s,
							currentGame: {
								...s.currentGame,
								players: s.currentGame.players.map((p) => {
									if (p.id === selected.id) return {
										...p,
										suspectedRole: chosenRole
									};
									return p;
								})
							}
						}));
						showPlayer({
							stText: `Show ${capitalize(selected.name)}`,
							title: `You are`,
							role: chosenRole
						});
					}
				});
			});
		}}
      >
        Choose a player
      </button>
    `;
	},
	spy: ({ game }) => {
		return b`<button
      ui-button
      primary
      @click=${() => {
			dialog.open({ id: "grim" });
		}}
    >
      Show grim
    </button> `;
	},
	monk: ({ role, game }) => {
		return assignTokenToPlayer("monk-Safe", "Protect player", game);
	},
	snakecharmer: ({ role, game }) => {
		const poisonedToken = game.tokens.find((t) => t.id === "snakecharmer-Poisoned");
		const snakecharmer = game.players.find((p) => p.suspectedRole?.id === "snakecharmer");
		const snakeCharmerRole = { ...snakecharmer.suspectedRole };
		return b`
      <button
        ui-button
        primary
        @click=${() => {
			dialog.open({
				id: "playerSelect",
				parameters: { showNightOrder: true }
			}).then(([selected]) => {
				if (!selected) return;
				const isDemon = selected.suspectedRole?.type?.toLowerCase() === "demon" || p.tokens?.some((t) => t.id === "lilmonsta-Is The Demon") || selected?.tokens?.some((t) => t.id === "lilmonsta-Is The Demon");
				const demonRole = { ...selected.suspectedRole };
				if (isDemon) {
					state.setState((s) => ({
						...s,
						currentGame: {
							...s.currentGame,
							players: s.currentGame.players.map((p) => {
								if (p.id === selected.id) return {
									...p,
									suspectedRole: role,
									tokens: [...p.tokens, poisonedToken]
								};
								if (p.id === snakecharmer.id) return {
									...p,
									suspectedRole: demonRole
								};
								return p;
							})
						}
					}));
					showPlayer({
						stText: `Show ${capitalize(snakecharmer.name)}`,
						title: `You are`,
						role: demonRole,
						nextBtn: true
					}).then(() => {
						showPlayer({
							stText: `Show ${capitalize(selected.name)}`,
							title: `You are`,
							role: snakeCharmerRole
						});
					});
				}
			});
		}}
      >
        Choose player
      </button>
    `;
	},
	harpy: ({ role, game }) => {
		return b`
      ${assignTokenToPlayer("harpy-Mad", "Choose a player to make Mad", game, { callback: ([player]) => {
			inlineDialog(() => b` <style>
                  p.smol {
                    font-size: 0.75rem;
                    margin-top: 0;
                    text-align: center;
                  }
                </style>
                <p class="smol">Show ${capitalize(player.name)}</p>
                ${showPlayerRoleToken({ suspectedRole: rolesById.harpy })}`);
		} })}
      ${assignTokenToPlayer("harpy-2nd", "Choose a 2nd player", game)}
    `;
	},
	balloonist: ({ role, game }) => {
		const balloonist = game.players.find((p) => p.suspectedRole?.id === "balloonist");
		const shownTypes = balloonist?.suspectedRole?.meta?.shownTypes || [];
		const remainingTypes = [...new Set(game.players.map((p) => p.suspectedRole?.type?.toLowerCase()).filter(Boolean))].filter((type) => !shownTypes.includes(type));
		return b`
      <p class="center">
        <strong>Already shown:</strong> ${shownTypes.length > 0 ? shownTypes.join(", ") : "none"}<br />
        <strong>Types not shown:</strong> ${remainingTypes.length > 0 ? remainingTypes.join(", ") : "all types shown"}
      </p>

      <button
        ui-button
        primary
        @click=${() => {
			dialog.open({
				id: "playerSelect",
				parameters: {
					showNightOrder: true,
					text: "Choose a player to show the Balloonist"
				}
			}).then(([selected]) => {
				if (!selected) return;
				const selectedType = selected.suspectedRole?.type?.toLowerCase();
				if (selectedType && !shownTypes.includes(selectedType)) state.setState((s) => ({
					...s,
					currentGame: {
						...s.currentGame,
						players: s.currentGame.players.map((p) => {
							if (p.id === balloonist.id) p.suspectedRole = {
								...p.suspectedRole,
								meta: {
									...p.suspectedRole?.meta || {},
									shownTypes: [...shownTypes, selectedType]
								}
							};
							return p;
						})
					}
				}));
				inlineDialog(() => b`
                  <style>
                    ${balgruf} h2 {
                      font-size: 3rem;
                      line-height: 0.9;
                      text-align: center;
                    }
                    .container {
                      height: 80%;
                      display: flex;
                      align-items: center;
                      justify-content: center;
                    }
                    p.smol {
                      font-size: 0.75rem;
                      margin-top: 0;
                      text-align: center;
                    }
                  </style>
                  <p class="smol">Show ${capitalize(balloonist.name)}</p>
                  <div class="container">
                    <h2 class="balgruf">${capitalize(selected.name)}</h2>
                  </div>
                `);
			});
		}}
      >
        Choose player to show
      </button>
    `;
	},
	dreamer: ({ role, game }) => {
		const dreamer = game.players.find((p) => p.suspectedRole?.id === "dreamer");
		return b`
      <button
        ui-button
        primary
        @click=${() => {
			dialog.open({
				id: "playerSelect",
				parameters: {
					showNightOrder: true,
					filterFn: (p) => p.suspectedRole?.id !== "dreamer" && p.suspectedRole?.type?.toLowerCase() !== "traveller"
				}
			}).then((player) => {
				const isEvil = player[0]?.suspectedRole?.type?.toLowerCase() === "minion" || player[0]?.suspectedRole?.type?.toLowerCase() === "demon" || player[0].tokens?.some((t) => t.id === "lilmonsta-Is The Demon");
				const good = ["townsfolk", "outsider"];
				const evil = ["minion", "demon"];
				const filter = isEvil ? evil : good;
				dialog.open({
					id: "roleSelect",
					parameters: {
						allScriptRoles: true,
						filterFn: (r) => !filter.includes(r.type.toLowerCase()) && r.type.toLowerCase() !== "traveller"
					}
				}).then((otherRole) => {
					dialog.open({
						id: "roleSelect",
						parameters: {
							allScriptRoles: true,
							selected: [player[0].suspectedRole],
							filterFn: (r) => r.type.toLowerCase() !== "traveller"
						}
					}).then((selectedRole) => {
						const roles = [selectedRole[0], otherRole[0]].sort((a) => {
							if (evil.includes(a.type.toLowerCase())) return 1;
							else if (good.includes(a.type.toLowerCase())) return -1;
							return 0;
						});
						inlineDialog(() => b`
                          <style>
                            ${balgruf} .container {
                              display: flex;
                              flex-direction: column;
                              height: calc(100% - 70px);
                              justify-content: space-evenly;
                            }

                            img {
                              width: 150px;
                              height: 150px;
                              display: block;
                              margin: 0 auto;
                              border-radius: 50%;
                              background-color: ${bg8};
                            }

                            .red img {
                              border: solid 4px #d9403b;
                            }
                            .blue img {
                              border: solid 4px #45a0f1;
                            }
                            .red h2 {
                              color: #d9403b;
                            }
                            .blue h2 {
                              color: #45a0f1;
                            }
                            p.smol {
                              font-size: 0.75rem;
                              margin-top: 0;
                              text-align: center;
                            }
                          </style>
                          <p class="smol">Show ${capitalize(dreamer.name)}</p>
                          <div class="container">
                            ${roles.map((role) => b`
                                <div class="role ${alignment(role.type)}">
                                  <img
                                    src=${img(role)}
                                    alt="${role.humanReadableRole}"
                                  />
                                  <h2 class="balgruf">
                                    ${role.humanReadableRole}
                                  </h2>
                                </div>
                              `)}
                          </div>
                        `);
					});
				});
			});
		}}
      >
        Choose player
      </button>
    `;
	},
	mathematician: ({ role, game }) => {
		const abnormalities = [];
		for (const player of game.players) if (player.tokens.find((t) => t.id === "mathematician-Abnormal")) abnormalities.push(player);
		return b`
      <p class="center">
        <span class="balgruf">${abnormalities.length}</span> players' abilities
        worked abnormally.
      </p>
    `;
	},
	gambler: ({ role, game }) => {
		const gamblerDeadToken = game.tokens.find((t) => t.id === "gambler-Dead");
		const killedGamblerAlready = game.players.find((p) => p.suspectedRole?.id === "gambler" && p.tokens.some((t) => t.id === "gambler-Dead"));
		return b`
      <button
        ui-button
        primary
        ?disabled=${killedGamblerAlready}
        @click=${() => {
			state.setState((s) => ({
				...s,
				currentGame: {
					...s.currentGame,
					players: s.currentGame.players.map((p) => {
						if (p.suspectedRole?.id === "gambler") {
							p.tokens = p.tokens.filter((t) => t.id !== "gambler-Dead");
							p.tokens.push(gamblerDeadToken);
						}
						return p;
					})
				}
			}));
		}}
      >
        ${killedGamblerAlready ? "The gambler has already been killed" : "The gambler chose wrong"}
      </button>
      ${killedGamblerAlready ? b`
              <button
                ui-button
                primary
                @click=${() => {
			state.setState((s) => ({
				...s,
				currentGame: {
					...s.currentGame,
					players: s.currentGame.players.map((p) => {
						if (p.suspectedRole?.id === "gambler") p.tokens = p.tokens.filter((t) => t.id !== "gambler-Dead");
						return p;
					})
				}
			}));
		}}
              >
                Undo
              </button>
            ` : ""}
    `;
	},
	pukka: ({ role, game }) => {
		const pukkaPoisonedToken = game.tokens.find((t) => t.id === "pukka-Poisoned");
		const pukkaDeadToken = game.tokens.find((t) => t.id === "pukka-Dead");
		return b`
      <button
        ui-button
        primary
        @click=${() => {
			dialog.open({
				id: "playerSelect",
				parameters: { showNightOrder: true }
			}).then((player) => {
				state.setState((s) => ({
					...s,
					currentGame: {
						...s.currentGame,
						players: s.currentGame.players.map((p) => {
							if (p.tokens.some((t) => t.id === "pukka-Poisoned")) {
								p.tokens = p.tokens.filter((t) => t.id !== "pukka-Poisoned");
								p.dead = {
									id: pukkaDeadToken.id,
									day: s.currentGame.day,
									icon: pukkaDeadToken.icon,
									type: pukkaDeadToken.type,
									hasDeadVote: true,
									humanReadableRole: pukkaDeadToken.humanReadableRole
								};
							}
							if (p.id === player[0].id) p.tokens.push(pukkaPoisonedToken);
							return p;
						})
					}
				}));
			});
		}}
      >
        Choose a player
      </button>
    `;
	},
	noble: ({ role, game }) => {
		const playersWithNobleToken = game.players.filter((p) => p.tokens.some((t) => t.id === "noble-Know"));
		return b`
      ${when(playersWithNobleToken.length < 3, () => b`
          ${assignTokenToPlayer("noble-Know", "Select 3 players", game, {
			maxSelect: 3,
			multiple: true
		})}
        `)}
      ${when(playersWithNobleToken.length > 0, () => b`<button
            ui-button
            primary
            @click=${() => dialog.open({
			id: "playerSelect",
			parameters: {
				multiple: true,
				maxSelect: 3,
				showNightOrder: true,
				selected: playersWithNobleToken
			}
		}).then((players) => {
			if (!players) return;
			showPlayerName({
				title: "Known:",
				name: players.map((p) => b`${capitalize(p.name)}<br />`)
			});
		})}
          >
            Show the known players
          </button>`)}
    `;
	},
	preacher: ({ player, role, game }) => {
		return b`
      <button
        ui-button
        primary
        @click=${() => {
			dialog.open({
				id: "playerSelect",
				parameters: { showNightOrder: true }
			}).then(([player]) => {
				if (!player) return;
				if (player?.suspectedRole?.type?.toLowerCase() === "minion") {
					state.setState((s) => ({
						...s,
						currentGame: {
							...s.currentGame,
							players: s.currentGame.players.map((p) => {
								const tokens = p.tokens.filter((t) => !(t.id === "preacher-No Ability" && t.playerId === player.id));
								if (p.suspectedRole?.type?.toLowerCase() === "minion") {
									const token = game.tokens.find((t) => t.id === "preacher-No Ability");
									token.playerId = player?.id;
									return {
										...player,
										tokens: [...tokens, token]
									};
								}
								return p;
							})
						}
					}));
					inlineDialog(() => b`
                    <style>
                      ${balgruf} h2 {
                        line-height: 0.9;
                      }
                      .container {
                        height: calc(100% - 80px);
                        display: flex;
                        align-items: center;
                        flex-direction: column;
                      }
                      .big-role {
                        width: 150px;
                        display: block;
                        margin: 0 auto;
                        border-radius: 50%;
                        margin-top: 100px;
                        margin-bottom: 30px;
                        background-color: ${bg8};
                      }
                      img.red {
                        border: solid 4px #d9403b;
                      }
                      img.blue {
                        border: solid 4px #45a0f1;
                      }
                      h2.red {
                        color: #d9403b;
                      }
                      h2.blue {
                        color: #45a0f1;
                      }
                      p {
                        text-align: center;
                        font-size: 0.625rem;
                      }
                    </style>
                    <div class="container">
                      <p>Show ${capitalize(player.name)}</p>
                      <h2 style="color: var(--ui-main-5);">
                        This character selected you
                      </h2>
                      <img
                        class="big-role ${alignment(role?.type)}"
                        alt=${role?.humanReadableRole}
                        src=${img(role)}
                      />
                      <h2 class="${alignment(role?.type)}">
                        ${role?.humanReadableRole}
                      </h2>
                    </div>
                  `);
				}
			});
		}}
      >
        Choose a player
      </button>
    `;
	},
	king: ({ role, game }) => {
		const deadPlayers = game.players.filter((p) => p.dead);
		const livingPlayers = game.players.filter((p) => !p.dead);
		const king = game.players.find((p) => p.suspectedRole?.id === "king");
		const demon = game.players.find((p) => p.suspectedRole?.type?.toLowerCase() === "demon" || p.tokens?.some((t) => t.id === "lilmonsta-Is The Demon") || p.tokens.some((t) => t.id === "lilmonsta-Is The Demon"));
		if (game.day === 0) return b`
        <button
          ui-button
          primary
          @click=${() => {
			inlineDialog(() => b`
                <style>
                  ${balgruf} h2 {
                    line-height: 0.9;
                  }

                  .container {
                    height: calc(100% - 80px);
                    display: flex;
                    align-items: center;
                    flex-direction: column;
                  }

                  .big-role {
                    width: 150px;
                    display: block;
                    margin: 0 auto;
                    border-radius: 50%;
                    margin-top: 100px;
                    margin-bottom: 30px;
                    background-color: ${bg8};
                  }

                  img.red {
                    border: solid 4px #d9403b;
                  }
                  img.blue {
                    border: solid 4px #45a0f1;
                  }

                  h2.red {
                    color: #d9403b;
                  }
                  h2.blue {
                    color: #45a0f1;
                  }
                  h2.yellow {
                    color: #ffee00;
                    h2.green {
                      color: #a7e16c;
                    }
                  }
                  img.yellow {
                    border: solid 2px #ffee00;
                    img.green {
                      border: solid 2px #a7e16c;
                    }
                  }
                  p {
                    text-align: center;
                    font-size: 0.625rem;
                  }
                </style>
                <div class="container">
                  <p>Show ${capitalize(demon.name)}</p>
                  <h2 style="color: var(--ui-main-5);">
                    ${capitalize(king.name)} is
                  </h2>
                  <img
                    class="big-role ${alignment(role?.type)}"
                    src=${img(role)}
                    alt=${role?.humanReadableRole}
                  />
                  <h2 class="${alignment(role?.type)}">
                    ${role?.humanReadableRole}
                  </h2>
                </div>
              `);
		}}
        >
          Wake the demon
        </button>
      `;
		else if (game.day !== 0 && deadPlayers.length >= livingPlayers.length) return b`
        <p class="center">
          The dead equal or outnumber the living, the King learns 1 alive
          player.
        </p>
        <button
          ui-button
          primary
          @click=${() => {
			dialog.open({
				id: "playerSelect",
				parameters: { showNightOrder: true }
			}).then(([selected]) => {
				if (!selected) return;
				showPlayer({ role: selected.suspectedRole });
			});
		}}
        ></button>
      `;
	},
	knight: ({ role, game }) => {
		const playersMarkedAsKnown = game.players.filter((p) => p.tokens.some((t) => t.id === "knight-Know"));
		if (playersMarkedAsKnown.length < 3) return b`
        <p class="center">Mark 2 players as Know that are not the demon.</p>
        ${assignTokenToPlayer("knight-Know", "Choose 2 players", game, {
			maxSelect: 2,
			multiple: true
		})}
      `;
		else if (playersMarkedAsKnown.length >= 2) return b`<p class="center">
        Show the Knight
        <span class="balgruf"
          >${capitalize(playersMarkedAsKnown?.[0]?.name)}</span
        >and
        <span class="balgruf"
          >${capitalize(playersMarkedAsKnown?.[1]?.name)}</span
        >
      </p>`;
	},
	steward: ({ role, game }) => {
		const playerMarkedAsKnown = game.players.find((p) => p.tokens.some((t) => t.id === "steward-Know"));
		if (!playerMarkedAsKnown) return b`
        <p class="center">Mark a player as Know.</p>
        ${assignTokenToPlayer("steward-Know", "Choose a player", game)}
      `;
		else if (playerMarkedAsKnown) return b`<p class="center">
        Show the Steward
        <span class="balgruf">${capitalize(playerMarkedAsKnown?.name)}</span>
      </p>`;
	},
	fearmonger: ({ role, game }) => {
		return assignTokenToPlayer("fearmonger-Fear", "Choose a player", game);
	},
	alchemist: ({ role, game }) => {
		const alchemist = game.players.find((p) => p.suspectedRole?.id === "alchemist");
		if (alchemist.tokens.find((t) => t.id === "alchemist-Minion")) return;
		return b`
      <button
        ui-button
        primary
        @click=${() => {
			dialog.open({
				id: "roleSelect",
				parameters: {
					allScriptRoles: true,
					filterFn: (r) => r.type?.toLowerCase() === "minion"
				}
			}).then(([chosenRole]) => {
				if (!chosenRole) return;
				showPlayer({
					title: `Your minion ability is:`,
					role: chosenRole
				});
				state.setState((s) => ({
					...s,
					currentGame: {
						...s.currentGame,
						players: s.currentGame.players.map((p) => {
							if (p.id === alchemist.id) {
								p.tokens = p.tokens.filter((t) => t.id !== "alchemist-Minion");
								p.tokens.push({
									id: `alchemist-Minion`,
									role: chosenRole.id,
									label: chosenRole.humanReadableRole,
									icon: chosenRole.icon,
									type: chosenRole.type,
									humanReadableRole: chosenRole.humanReadableRole
								});
							}
							return p;
						})
					}
				}));
			});
		}}
      >
        Assign minion ability
      </button>
    `;
	},
	nightwatchman: ({ role, game }) => {
		const nightwatchman = game.players.find((p) => p.suspectedRole?.id === "nightwatchman");
		if (nightwatchman.tokens.find((t) => t.id === "nightwatchman-No Ability")) return b`<p class="center">
        The Nightwatchman has already used their ability.
      </p>`;
		return b`
      <button
        ui-button
        primary
        @click=${() => {
			showPlayer({
				title: `${capitalize(nightwatchman.name)} is:`,
				role: nightwatchman.suspectedRole
			});
			state.setState((s) => ({
				...s,
				currentGame: {
					...s.currentGame,
					players: s.currentGame.players.map((p) => {
						if (p.id === nightwatchman.id) {
							p.tokens = p.tokens.filter((t) => t.id !== "nightwatchman-No Ability");
							p.tokens.push(game.tokens.find((t) => t.id === "nightwatchman-No Ability"));
						}
						return p;
					})
				}
			}));
		}}
      >
        Show chosen player the Nightwatchman
      </button>
    `;
	},
	wizard: ({ role, game }) => {
		return b`
      <botc-switch
        @checked-changed=${({ checked }) => {
			state.setState((s) => ({
				...s,
				currentGame: {
					...s.currentGame,
					players: s.currentGame.players.map((p) => {
						if (p.suspectedRole?.id === "wizard") if (checked) p.tokens.push({
							id: "wizard-Wish Granted",
							role: "wizard",
							label: "Wish Granted",
							icon: "wizard",
							type: "Minion",
							humanReadableRole: "Wizard"
						});
						else p.tokens = p.tokens.filter((t) => t.id !== "wizard-Wish Granted");
						return p;
					})
				}
			}));
		}}
        ?checked=${game.players.find((p) => p.suspectedRole?.id === "wizard").tokens.some((t) => t.id === "wizard-Wish Granted")}
        >Wish granted?</botc-switch
      >
    `;
	},
	gnome: ({ role, game }) => {
		return assignTokenToPlayer("gnome-Amigo", "Choose an Amigo for the Gnome", game);
	},
	organgrinder: ({ role, game }) => {
		const organgrinder = game.players.find((p) => p.suspectedRole?.id === "organgrinder");
		return b`
      <botc-switch
        @checked-changed=${({ checked }) => {
			state.setState((s) => ({
				...s,
				currentGame: {
					...s.currentGame,
					players: s.currentGame.players.map((p) => {
						if (p.id === organgrinder.id) if (checked) p.tokens.push(game.tokens.find((t) => t.id === "organgrinder-Drunk"));
						else p.tokens = p.tokens.filter((t) => t.id !== "organgrinder-Drunk");
						return p;
					})
				}
			}));
		}}
        ?checked=${!!game.players.find((p) => p.tokens.some((t) => t.id === "organgrinder-Drunk"))}
        >Drunk?</botc-switch
      >
    `;
	},
	ojo: ({ role, game }) => {
		return b`
      <button
        ui-button
        primary
        @click=${() => {
			dialog.open({
				id: "roleSelect",
				parameters: {
					allScriptRoles: true,
					filterFn: (p) => p.type.toLowerCase() !== "traveller",
					showNightOrder: true
				}
			}).then(([role]) => {
				if (game.rolesInPlay.some((r) => r.id === role.id)) dialog.open({
					id: "playerSelect",
					parameters: {
						showNightOrder: true,
						selected: [game.players.find((p) => p.suspectedRole?.id === role?.id)]
					}
				}).then(([player]) => {
					state.setState((s) => ({
						...s,
						currentGame: {
							...s.currentGame,
							players: s.currentGame.players.map((p) => {
								if (p.id === player.id) {
									p.tokens = p.tokens.filter((t) => t.id !== "ojo-Dead");
									p.tokens.push(game.tokens.find((t) => t.id === "ojo-Dead"));
								}
								return p;
							})
						}
					}));
				});
				else inlineDialog(() => b`
                    <style>
                      ${balgruf} h2 {
                        font-size: 3.75rem;
                        margin: 0;
                        hyphens: auto;
                        line-height: 0.9;
                      }

                      .card {
                        height: calc(100% - 40px);
                        display: flex;
                        justify-content: center;
                        align-items: center;
                        flex-direction: column;
                      }

                      .a {
                        margin-bottom: 40px;
                      }
                    </style>
                    <div class="card">
                      <h2>${role?.humanReadableRole} is not in play.</h2>
                    </div>
                  `);
			});
		}}
      >
        Select a role
      </button>
      ${assignTokenToPlayer("ojo-Dead", "Choose a player to die", game)}
    `;
	},
	lleech: ({ role, game }) => {
		const lleechHost = game.players.find((p) => p.tokens?.some((t) => t.id === "lleech-Poisoned"));
		return b`
      ${when(game.day === 0 && !lleechHost, () => assignTokenToPlayer("lleech-Poisoned", "Choose a Lleech host", game))}
      ${when(game.day > 0, () => assignTokenToPlayer("lleech-Dead", "Choose a player to die", game))}
    `;
	},
	ogre: ({ role, game }) => {
		if (game.day === 0) return b`
        ${assignTokenToPlayer("ogre-Friend", "Choose a player to be the Ogre's Friend", game, {
			filterFn: (p) => p.suspectedRole?.type?.toLowerCase() !== "traveller",
			additionalActions: (p, selected) => {
				if (p?.suspectedRole?.id === "ogre") {
					const kind = ["demon", "minion"].includes(selected?.[0]?.suspectedRole?.type?.toLowerCase()) ? "evil" : "good";
					p.tokens = p.tokens.filter((t) => !["special-Good", "special-Evil"].includes(t.id));
					p.tokens.push(game.tokens.find((t) => t.id === `special-${capitalize(kind)}`));
				}
				return p;
			}
		})}
      `;
	},
	huntsman: ({ role, game }) => {
		const huntsman = game.players.find((p) => p.suspectedRole?.id === "huntsman");
		if (huntsman?.tokens?.find((t) => t.id === "huntsman-No Ability")) return b`<p class="center">
        The Huntsman has already used their ability.
      </p>`;
		return b`
      <button
        ui-button
        primary
        @click=${() => {
			dialog.open({
				id: "playerSelect",
				parameters: { showNightOrder: true }
			}).then(([player]) => {
				if (!player) return;
				state.setState((s) => ({
					...s,
					currentGame: {
						...s.currentGame,
						players: s.currentGame.players.map((p) => {
							if (p.id === huntsman.id) {
								p.tokens = p.tokens.filter((t) => t.id !== "huntsman-No Ability");
								p.tokens.push(game.tokens.find((t) => t.id === "huntsman-No Ability"));
							}
							return p;
						})
					}
				}));
			});
		}}
      >
        Choose player
      </button>
    `;
	},
	choirboy: ({ game }) => {
		if (game.day <= 1) return;
		const king = game.players.find((p) => p.suspectedRole?.id === "king");
		const demon = game.players.find((p) => p.suspectedRole?.type?.toLowerCase() === "demon");
		if (king?.dead?.type?.toLowerCase() === "demon" && king?.dead?.day === game.day) return b`
        <button
          ui-button
          primary
          @click=${() => {
			dialog.open({
				id: "playerSelect",
				parameters: { selected: [demon] }
			}).then(([player]) => {
				if (!player) return;
				showPlayerName({ name: player.name });
			});
		}}
        >
          Show the Demon player
        </button>
      `;
	},
	bountyhunter: ({ role, game }) => {
		const evilTownPlayer = game.players.find((p) => p.tokens.some((t) => t.id === "special-Evil"));
		const knownPlayer = game.players.find((p) => p.tokens.some((t) => t.id === "bountyhunter-Known"));
		return b`
      ${when(!evilTownPlayer, () => assignTokenToPlayer("special-Evil", "Choose a good player to be evil", game))}
      ${when(!knownPlayer || !!knownPlayer?.dead, () => assignTokenToPlayer("bountyhunter-Known", "Choose an evil player to be Known", game))}
      ${when(knownPlayer && !knownPlayer?.dead, () => {
			return b`
          <style>
            botc-player-details {
              margin-bottom: 0;
              margin-top: 32px;
            }
          </style>
          <button
            ui-button
            primary
            @click=${() => {
				showPlayerName({ name: knownPlayer.name });
			}}
          >
            Show Known player
          </button>
          <botc-player-details .player=${knownPlayer}></botc-player-details>
        `;
		})}
    `;
	},
	yaggababble: ({ role, game }) => {
		const yaggababble = game.players.find((p) => p.suspectedRole?.id === "yaggababble");
		function setSecretPhrase(text = "") {
			dialog.open({
				id: "customText",
				parameters: { text }
			}).then((phrase) => {
				showSecretPhrase(phrase);
				state.setState((s) => ({
					...s,
					currentGame: {
						...s.currentGame,
						players: s.currentGame.players.map((p) => {
							if (p.id === yaggababble.id) p.suspectedRole = {
								...yaggababble.suspectedRole,
								meta: {
									...yaggababble.suspectedRole?.meta ?? {},
									phrase
								}
							};
							return p;
						})
					}
				}));
			});
		}
		function showSecretPhrase(phrase) {
			inlineDialog(() => b`
          <style>
            ${balgruf} h2 {
              font-size: 3.75rem;
              margin: 0;
              hyphens: auto;
              line-height: 0.9;
            }

            .card {
              height: calc(100% - 40px);
              display: flex;
              justify-content: center;
              align-items: center;
              flex-direction: column;
            }

            .a {
              margin-bottom: 40px;
            }
          </style>
          <div class="card">
            <h2 class="a">The secret phrase is:</h2>
            <h2>${phrase}</h2>
          </div>
        `);
		}
		return b`
      ${assignTokenToPlayer("yaggababble-Dead", "Choose players", game, {
			showNightOrder: true,
			multiple: true
		})}
      ${when(!yaggababble.suspectedRole?.meta?.phrase, () => b`
          <button
            ui-button
            primary
            @click=${() => {
			setSecretPhrase();
		}}
          >
            Choose secret phrase
          </button>
        `, () => b`
          <button
            ui-button
            primary
            @click=${() => {
			showSecretPhrase(yaggababble.suspectedRole?.meta?.phrase);
		}}
          >
            Show secret phrase
          </button>
          <button
            ui-button
            primary
            @click=${() => {
			setSecretPhrase(yaggababble.suspectedRole?.meta?.phrase);
		}}
          >
            Edit secret phrase
          </button>
        `)}
    `;
	},
	moonchild: ({ role, game }) => {
		const mayor = game.players.find((p) => p.suspectedRole?.id === "mayor");
		if (mayor?.tokens?.some((t) => t.id === "moonchild-Dead")) return b`<p class="center">
          The Moonchild chose the Mayor, do you want to bounce the kill?
        </p>
        ${assignTokenToPlayer("moonchild-Dead", "Bounce kill", game, { selected: [mayor] })}`;
	},
	butler: ({ role, game }) => {
		return assignTokenToPlayer("butler-Master", "Choose a player", game);
	},
	imp: ({ role, game }) => {
		const minions = game.players.filter((p) => p.suspectedRole?.type?.toLowerCase() === "minion");
		const imp = game.players.find((p) => p.suspectedRole?.id === "imp");
		if (game.players.find((p) => p.suspectedRole?.id === "imp" && p.suspectedRole?.meta?.jumpedOnDay === game.day) && role?.meta?.jumpedOnDay === game.day) return b`<p class="center">
        Became the demon tonight - can't kill yet.
      </p>`;
		return b`
      <button
        ui-button
        primary
        @click=${() => {
			dialog.open({ id: "playerSelect" }).then(async ([player]) => {
				if (!player) return;
				if (player.id === imp.id) dialog.open({
					id: "playerSelect",
					parameters: { players: minions }
				}).then(([minion]) => {
					if (!minion) return;
					state.setState((s) => ({
						...s,
						currentGame: {
							...s.currentGame,
							players: s.currentGame.players.map((p) => {
								if (p.id === imp.id) p.tokens.push(game.tokens.find((t) => t.id === "imp-Dead"));
								if (p.id === minion.id) p.suspectedRole = {
									...role,
									meta: {
										...role?.meta ?? {},
										jumpedOnDay: game.day
									}
								};
								return p;
							})
						}
					}));
					showPlayer({
						stText: `Show ${capitalize(minion.name)}`,
						title: `You are`,
						role
					});
				});
				else if (player.suspectedRole?.id === "mayor") dialog.open({
					id: "playerSelect",
					parameters: {
						title: "Bounce kill?",
						autoScroll: false,
						text: "You chose the mayor, do you want to kill someone else instead?",
						selected: [player]
					}
				}).then(([player]) => {
					state.setState((s) => ({
						...s,
						currentGame: {
							...s.currentGame,
							players: s.currentGame.players.map((p) => {
								if (p.id === player.id) p.tokens.push(game.tokens.find((t) => t.id === "imp-Dead"));
								return p;
							})
						}
					}));
				});
				else state.setState((s) => ({
					...s,
					currentGame: {
						...s.currentGame,
						players: s.currentGame.players.map((p) => {
							if (p.id === player.id) p.tokens.push(game.tokens.find((t) => t.id === "imp-Dead"));
							return p;
						})
					}
				}));
			});
		}}
      >
        Choose a player to die
      </button>
    `;
	},
	marionette: ({ role, game }) => {
		if (game.players.find((p) => p.suspectedRole?.id === "marionette")) return b`
        <button
          ui-button
          primary
          @click=${() => {
			dialog.open({
				id: "roleSelect",
				parameters: {
					allScriptRoles: true,
					filterFn: (r) => r.type?.toLowerCase() !== "traveller" && r.id !== "marionette"
				}
			}).then(([role]) => {
				if (!role) return;
				state.setState((s) => ({
					...s,
					currentGame: {
						...s.currentGame,
						players: s.currentGame.players.map((p) => {
							if (p.suspectedRole?.id === "marionette") p.suspectedRole = { ...role };
							return p;
						})
					}
				}));
			});
		}}
        >
          Select a role for the Marionette
        </button>
      `;
	},
	vigormortis: ({ role, game }) => {
		const deadToken = game.tokens.find((t) => t.id === "vigormortis-Dead");
		const hasAbilityToken = game.tokens.find((t) => t.id === "vigormortis-Has Ability");
		const poisonedToken = game.tokens.find((t) => t.id === "vigormortis-Poisoned");
		return b`
      <button
        ui-button
        primary
        @click=${() => {
			dialog.open({ id: "playerSelect" }).then(([selected]) => {
				if (!selected) return;
				const isMinion = selected.suspectedRole?.type?.toLowerCase() === "minion";
				state.setState((s) => {
					const players = s.currentGame.players;
					const n = players.length;
					const selectedIndex = players.findIndex((p) => p.id === selected.id);
					const findNearestAliveTownsfolk = (startIndex, direction) => {
						let index = startIndex;
						for (let i = 1; i < n; i++) {
							index = (index + direction + n) % n;
							const p = players[index];
							if (p.suspectedRole?.type?.toLowerCase() === "townsfolk" && !p.dead) return index;
						}
						return -1;
					};
					const clockwise = findNearestAliveTownsfolk(selectedIndex, 1);
					const counter = findNearestAliveTownsfolk(selectedIndex, -1);
					let poisonedIndex = -1;
					if (clockwise !== -1 && counter !== -1) poisonedIndex = (clockwise - selectedIndex + n) % n <= (selectedIndex - counter + n) % n ? clockwise : counter;
					else poisonedIndex = clockwise !== -1 ? clockwise : counter;
					return {
						...s,
						currentGame: {
							...s.currentGame,
							players: players.map((p, i) => {
								if (p.id === selected.id && !isMinion) return {
									...p,
									tokens: [...p.tokens, deadToken]
								};
								if (p.id === selected.id && isMinion) return {
									...p,
									tokens: [
										...p.tokens,
										hasAbilityToken,
										deadToken
									]
								};
								if (i === poisonedIndex && isMinion) return {
									...p,
									tokens: [...p.tokens, poisonedToken]
								};
								return p;
							})
						}
					};
				});
			});
		}}
      >
        Select player to kill
      </button>
    `;
	},
	shabaloth: ({ role, game }) => {
		return b`
      <button
        ui-button
        primary
        @click=${() => {
			dialog.open({
				id: "playerSelect",
				parameters: {
					multiple: true,
					maxSelect: 2,
					showNightOrder: true
				}
			}).then((players) => {
				const killedByShabaloth = game.players.filter((p) => p.dead?.id === "shabaloth");
				const shabalothDeadToken = game.tokens.find((t) => t.id === "shabaloth-Dead");
				const shabalothAliveToken = game.tokens.find((t) => t.id === "shabaloth-Alive");
				if (killedByShabaloth.length) dialog.open({
					id: "playerSelect",
					parameters: {
						text: "Regurgitate player?",
						players: killedByShabaloth
					}
				}).then((regurgitated) => {
					state.setState((s) => ({
						...s,
						currentGame: {
							...s.currentGame,
							players: s.currentGame.players.map((p) => {
								if (p.id === regurgitated?.[0]?.id) p.tokens.push(shabalothAliveToken);
								if (players.some((pl) => pl.id === p.id)) p.tokens.push(shabalothDeadToken);
								return p;
							})
						}
					}));
				});
				else if (players.some((p) => p.suspectedRole?.id === "mayor")) dialog.open({
					id: "playerSelect",
					parameters: {
						title: "Bounce kill?",
						autoScroll: false,
						text: "You chose the mayor, do you want to kill someone else instead?",
						selected: players,
						multiple: true,
						maxSelect: 2
					}
				}).then((players) => {
					state.setState((s) => ({
						...s,
						currentGame: {
							...s.currentGame,
							players: s.currentGame.players.map((p) => {
								if (players.some((pl) => pl.id === p.id)) p.tokens.push(shabalothDeadToken);
								return p;
							})
						}
					}));
				});
				else state.setState((s) => ({
					...s,
					currentGame: {
						...s.currentGame,
						players: s.currentGame.players.map((p) => {
							if (players.some((pl) => pl.id === p.id)) p.tokens.push(shabalothDeadToken);
							return p;
						})
					}
				}));
			});
		}}
      >
        Choose 2 players
      </button>
    `;
	},
	po: ({ role, game }) => {
		const po = game.players.find((p) => p.suspectedRole?.id === "po");
		const threeAttacks = po.tokens.find((t) => t.id === "po-3 Attacks");
		const threeAttacksToken = game.tokens.find((t) => t.id === "po-3 Attacks");
		return b`
      ${po?.meta?.day !== game.day && threeAttacks ? b`
              ${assignTokenToPlayer("po-Dead", "Choose 3 players", game, {
			showNightOrder: true,
			multiple: true,
			maxSelect: 3
		})}
            ` : b`
              ${!threeAttacks ? assignTokenToPlayer("po-Dead", "Choose a player", game) : ""}
            `}
      <button
        ?disabled=${po?.meta?.day === game.day && threeAttacks}
        ui-button
        primary
        @click=${() => {
			state.setState((s) => ({
				...s,
				currentGame: {
					...s.currentGame,
					players: s.currentGame.players.map((p) => {
						p.tokens = p.tokens.filter((t) => t.id !== "po-3 Attacks");
						if (p.id === po.id) {
							p.tokens.push(threeAttacksToken);
							p.meta = { day: s.currentGame.day };
						}
						return p;
					})
				}
			}));
		}}
      >
        Don't use ability
      </button>
    `;
	},
	ravenkeeper: ({ role, game }) => {
		game.players.find((p) => p.suspectedRole.id === "ravenkeeper");
		return b`<button
      ui-button
      primary
      @click=${() => {
			dialog.open({
				id: "playerSelect",
				parameters: { showNightOrder: true }
			}).then((player) => {
				dialog.open({
					id: "roleSelect",
					parameters: {
						allScriptRoles: true,
						selected: [player[0].suspectedRole],
						filterFn: (p) => p.type.toLowerCase() !== "traveller",
						showNightOrder: true
					}
				}).then((role) => {
					inlineDialog(() => showPlayerRoleToken({ suspectedRole: role[0] }));
				});
			});
		}}
    >
      Show player character token
    </button> `;
	},
	undertaker: ({ role, game }) => {
		const executedToday = game.players.find((p) => p?.dead?.day === game.day && p?.dead?.id === "unknowntown") ?? [];
		game.players.find((p) => p.suspectedRole.id === "undertaker");
		return b`
      <style>
        botc-player-details {
          margin-bottom: 0;
          margin-top: 32px;
        }
      </style>
      ${when(executedToday?.dead, () => b`
          <botc-player-details .player=${executedToday}></botc-player-details>
        `)}
      <button
        ui-button
        primary
        @click=${() => {
			if (executedToday?.dead) dialog.open({
				id: "roleSelect",
				parameters: {
					allScriptRoles: true,
					selected: [executedToday.suspectedRole],
					filterFn: (p) => p.type.toLowerCase() !== "traveller",
					showNightOrder: true
				}
			}).then((role) => {
				inlineDialog(() => showPlayerRoleToken({ suspectedRole: role[0] }));
			});
			else dialog.open({
				id: "playerSelect",
				parameters: {
					selected: [executedToday],
					showNightOrder: true
				}
			}).then((player) => {
				dialog.open({
					id: "roleSelect",
					parameters: {
						allScriptRoles: true,
						selected: [player[0].suspectedRole],
						filterFn: (p) => p.type.toLowerCase() !== "traveller",
						showNightOrder: true
					}
				}).then((role) => {
					inlineDialog(() => showPlayerRoleToken({ suspectedRole: role[0] }));
				});
			});
		}}
      >
        Show player character token
      </button>
    `;
	},
	scarletwoman: ({ role, game }) => {
		const demon = game.players.find((p) => p.suspectedRole?.type?.toLowerCase() === "demon" || p.tokens?.some((t) => t.id === "lilmonsta-Is The Demon") || p.tokens.some((t) => t.id === "lilmonsta-Is The Demon"));
		const alive = game.players.filter((p) => p.suspectedRole.type.toLowerCase() !== "traveller").filter((p) => !p.dead).length;
		const isTheDemonToken = game.tokens.find((t) => t.role === "scarletwoman");
		if (alive >= 5 && demon.dead) return b`<button
          ui-button
          primary
          @click=${() => {
			state.setState((s) => ({
				...s,
				currentGame: {
					...s.currentGame,
					players: s.currentGame.players.map((p) => {
						if (!p.tokens.some((t) => t.role === "scarletwoman") && p.suspectedRole.id === "scarletwoman") p.tokens.push(isTheDemonToken);
						return p;
					})
				}
			}));
			inlineDialog(() => b`
                <h2 style="color: var(--ui-main-5);">You are</h2>
                ${showPlayerRoleToken(demon)}
              `);
		}}
        >
          You are the demon
        </button>
        ${assignTokenToPlayer("imp-Dead", "Choose a player to die", game)} `;
		else if (demon?.dead) return assignTokenToPlayer("imp-Dead", "Choose a player to die", game);
	},
	fortuneteller: ({ role, game }) => {
		const redHerring = game.players.find((p) => p.tokens.some((t) => t.id === "fortuneteller-Red Herring"));
		const demon = game.players.find((p) => p.suspectedRole?.type?.toLowerCase() === "demon" || p.tokens?.some((t) => t.id === "lilmonsta-Is The Demon") || p.tokens.some((t) => t.id === "lilmonsta-Is The Demon"));
		if (redHerring && demon) return b`
        <style>
          botc-player-details {
            margin-bottom: 12px !important;
          }
        </style>
        <div style="margin-top: 24px;">
          <botc-player-details .player=${redHerring}></botc-player-details>
          <botc-player-details .player=${demon}></botc-player-details>
        </div>
      `;
		if (!redHerring) return assignTokenToPlayer("fortuneteller-Red Herring", "Choose a player to be red herring", game);
	},
	grandmother: ({ role, game }) => {
		const grandchild = game.players.find((p) => p.tokens.find((t) => t.id === "grandmother-Grandchild"));
		/**
		* @TODO ROLES-DIALOG
		* If the grandmother is poisoned or drunk, maybe we can show a different token?
		*/
		if (grandchild) return b`
        <p class="center">
          The grandchild is
          <span class="balgruf">${capitalize(grandchild.name)}</span>
        </p>
        <botc-player-details .player=${grandchild}></botc-player-details>
        ${game.day === 0 ? b`
                <button
                  ui-button
                  primary
                  @click=${() => inlineDialog(() => showPlayerRoleToken(grandchild))}
                >
                  Show grandchild's role
                </button>
              ` : ""}
      `;
		else return assignTokenToPlayer("grandmother-Grandchild", "Choose a player to be grandchild", game);
	},
	sailor: ({ role, game }) => {
		const sailorDrunk = game.tokens.find((t) => t.id === "sailor-Drunk");
		const sailor = game.players.find((p) => p.suspectedRole?.id === "sailor");
		return b`<button
      ui-button
      primary
      @click=${() => {
			dialog.open({
				id: "playerSelect",
				parameters: {
					aliveOnly: true,
					showNightOrder: true
				}
			}).then((player) => {
				dialog.open({
					id: "playerSelect",
					parameters: {
						showNightOrder: true,
						players: [player[0], sailor],
						text: "Who should be drunk?"
					}
				}).then((playerToBeDrunk) => {
					state.setState((s) => ({
						...s,
						currentGame: {
							...s.currentGame,
							players: s.currentGame.players.map((p) => {
								p.tokens = p.tokens.filter((t) => t.id !== "sailor-Drunk");
								if (p.id === playerToBeDrunk[0].id) p.tokens.push(sailorDrunk);
								return p;
							})
						}
					}));
				});
			});
		}}
    >
      Select player
    </button>`;
	},
	innkeeper: ({ role, game }) => {
		const innkeeperSafe = game.tokens.find((t) => t.id === "innkeeper-Safe");
		const innkeeperDrunk = game.tokens.find((t) => t.id === "innkeeper-Drunk");
		return b`<button
      ui-button
      primary
      @click=${() => {
			dialog.open({
				id: "playerSelect",
				parameters: {
					showNightOrder: true,
					multiple: true,
					maxSelect: 2
				}
			}).then((players) => {
				dialog.open({
					id: "playerSelect",
					parameters: {
						showNightOrder: true,
						players,
						text: "Who should be drunk?"
					}
				}).then((playerToBeDrunk) => {
					state.setState((s) => ({
						...s,
						currentGame: {
							...s.currentGame,
							players: s.currentGame.players.map((p) => {
								p.tokens = p.tokens.filter((t) => t.id !== "innkeeper-Safe" && t.id !== "innkeeper-Drunk");
								if (players.some((pl) => pl.id === p.id)) p.tokens.push(innkeeperSafe);
								if (playerToBeDrunk.some((pl) => pl.id === p.id)) p.tokens.push(innkeeperDrunk);
								return p;
							})
						}
					}));
				});
			});
		}}
    >
      Select 2 players
    </button>`;
	},
	lilmonsta: ({ role, game }) => {
		return b`
      ${assignTokenToPlayer("lilmonsta-Is The Demon", "Choose babysitter", game)}
      ${assignTokenToPlayer("lilmonsta-Dead", "A player might die", game)}
    `;
	},
	chambermaid: ({ nightOrder, role, game }) => {
		return b`<button
      ui-button
      primary
      @click=${() => {
			dialog.open({
				id: "playerSelect",
				parameters: {
					nightOrder: true,
					aliveOnly: true,
					multiple: true,
					maxSelect: 2
				}
			}).then((players) => {
				/**
				* @TODO
				* This will show the grandmother as waking up, but it shouldn't necessarily
				* Also zombuul if chosen by the exorcist doesnt wake up
				*/
				const playersWokenUp = players.filter((player) => nightOrder.some((p) => p.id === player.id));
				inlineDialog(() => b`
                <style>
                  ${balgruf}
                </style>
                ${playersWokenUp.length ? b`<h2 class="balgruf">
                        ${playersWokenUp.map((p) => capitalize(p.name)).join(" & ")}
                        woke up due to their ability
                      </h2>` : b`<h2 class="balgruf">No players woke up.</h2>`}
              `);
			});
		}}
    >
      Choose 2 alive players
    </button>`;
	},
	legion: ({ role, game }) => {
		return assignTokenToPlayer("legion-Dead", "Choose a player to die", game);
	},
	gossip: ({ role, game }) => {
		return assignTokenToPlayer("gossip-Dead", "Choose a player to die", game);
	},
	professor: ({ role, game }) => {
		const professorNoAbility = game.tokens.find((t) => t.id === "professor-No Ability");
		if (!game.players.find((p) => p.suspectedRole?.id === "professor").tokens.some((t) => t.id === "professor-No Ability")) return b`
        <button
          ui-button
          primary
          @click=${() => {
			dialog.open({
				id: "playerSelect",
				parameters: { deadOnly: true }
			}).then((player) => {
				state.setState((s) => ({
					...s,
					currentGame: {
						...s.currentGame,
						players: s.currentGame.players.map((p) => {
							if (p.id === player[0].id && p?.suspectedRole?.type?.toLowerCase() === "townsfolk") p.dead = null;
							if (p.suspectedRole.id === "professor") p.tokens.push(professorNoAbility);
							return p;
						})
					}
				}));
				inlineDialog(() => b`<style>
                        ${balgruf}
                      </style>
                      <h2>Revived ${capitalize(player[0].name)}</h2>`);
			});
		}}
        >
          Choose player
        </button>
      `;
		else return b`<p class="center">
        The professor has used their ability already.
      </p>`;
	},
	villageidiot: ({ player, role, game }) => {
		const drunk = isDroisoned(player);
		function show(good) {
			inlineDialog(() => b`
          <style>
            ${balgruf} h2 {
              font-size: 3.725rem;
              line-height: 0.9;
            }
            .container {
              height: 80%;
              display: flex;
              align-items: center;
            }
            h2 {
              flex: 1;
            }
            .blue {
              color: #45a0f1;
            }
            .red {
              color: #d9403b;
            }
          </style>
          <div class="container">
            <h2>
              <span class="${good ? "blue" : "red"}"
                >${good ? "Good" : "Evil"}</span
              >
            </h2>
          </div>
        `);
		}
		return b`
      ${when(drunk, () => b`
          <button
            ui-button
            primary
            ${context(dialog, () => b` <botc-vi-btns .fn=${show}></botc-vi-btns> `)}
          >
            Choose
          </button>
        `, () => b`
          <button
            ui-button
            primary
            @click=${() => {
			dialog.open({ id: "playerSelect" }).then(async ([player]) => {
				if (!player) return;
				if (isGood(player)) show(true);
				else show(false);
			});
		}}
          >
            Choose a player
          </button>
        `)}
    `;
	},
	devilsadvocate: ({ role, game }) => {
		const lastChosen = game.players.find((p) => p.tokens.some((t) => t.id === "devilsadvocate-Survives Execution"));
		return b`
      <style>
        botc-player-details {
          margin-bottom: 12px;
          margin-top: 32px;
        }
      </style>
      ${assignTokenToPlayer("devilsadvocate-Survives Execution", "Choose a living player", game, {
			aliveOnly: true,
			filterFn: (p) => !p.tokens.some((t) => t.id === "devilsadvocate-Survives Execution")
		})}
      ${when(lastChosen, () => b`
          <botc-player-details .player=${lastChosen}></botc-player-details>
        `)}
    `;
	},
	tinker: ({ role, game }) => {
		const tinker = game.players.find((p) => p.suspectedRole?.id === "tinker");
		const tinkerDeadToken = game.tokens.find((t) => t.id === "tinker-Dead");
		if (!tinker.dead) return b`<button
        ui-button
        primary
        @click=${() => {
			state.setState((s) => ({
				...s,
				currentGame: {
					...s.currentGame,
					players: s.currentGame.players.map((p) => {
						if (p.id === tinker.id) {
							p.tokens = p.tokens.filter((t) => t.id !== "tinker-Dead");
							p.tokens.push(tinkerDeadToken);
						}
						return p;
					})
				}
			}));
			inlineDialog(() => b`
              <style>
                ${balgruf} h2 {
                  font-size: 3.725rem;
                  line-height: 0.9;
                }
                .container {
                  height: 80%;
                  display: flex;
                  align-items: center;
                }
              </style>
              <div class="container">
                <h2>Executed ${capitalize(tinker.name)}</h2>
              </div>
            `);
		}}
      >
        Kill the tinker
      </button>`;
	},
	godfather: ({ role, game }) => {
		/** @TODO */
		const didOutsiderDieToday = game.players.find((p) => p?.dead?.day === game.day && p?.suspectedRole?.type?.toLowerCase() === "outsider");
		const outsiders = game.players.filter((p) => p.suspectedRole?.type?.toLowerCase() === "outsider").map((p) => p.suspectedRole);
		if (game.day === 0 && outsiders.length) return b`<button
        ui-button
        primary
        @click=${() => {
			inlineDialog(() => b`
              <style>
                ${balgruf} h2 {
                  font-size: 3.725rem;
                  line-height: 0.9;
                }
                .container {
                  height: 80%;
                  display: flex;
                  align-items: center;
                }
              </style>
              <div class="container">
                <h2 class="balgruf">
                  Outsiders in play: <br /><br />${outsiders.map((o) => o.humanReadableRole).join(", ")}
                </h2>
              </div>
            `);
		}}
      >
        Show outsiders
      </button>`;
		else if (game.day === 0 && !outsiders.length) return b`<p class="center">No outsiders in play</p>`;
		else if (didOutsiderDieToday) return assignTokenToPlayer("godfather-Dead", "Choose a player to die", game);
		else if (game.day > 0 && !didOutsiderDieToday) return b`<p class="center">No outsiders died today.</p>`;
	},
	assassin: ({ role, game }) => {
		const assassinNoAbilityToken = game.tokens.find((t) => t.id === "assassin-No Ability");
		if (!game.players.find((p) => p.tokens.some((t) => t.id === "assassin-No Ability"))) return assignTokenToPlayer("assassin-Dead", "Kill a player", game, { additionalActions: (p) => {
			if (p.suspectedRole?.id === "assassin" && !p.tokens.some((t) => t.id === "assassin-No Ability")) p.tokens.push(assassinNoAbilityToken);
			return p;
		} });
		else return b`<p class="center">
        The assassin has used their ability already.
      </p>`;
	},
	exorcist: ({ role, game }) => {
		return assignTokenToPlayer("exorcist-Chosen", "Choose a player", game, {
			aliveOnly: true,
			filterFn: (p) => !p.tokens.some((t) => t.id === "exorcist-Chosen")
		});
	},
	/** @TODO */
	zombuul: ({ role, game }) => {
		if (game.players.find((p) => p?.dead?.day === game.day)) return b`<p class="center">
        Someone died today, the Zombuul's ability is not active.
      </p>`;
		else return assignTokenToPlayer("zombuul-Dead", "Choose a player to die", game);
	},
	courtier: ({ role, game }) => {
		const hasAbility = !game.players.find((p) => p.suspectedRole?.id === "courtier").tokens.some((t) => t.id === "courtier-No Ability");
		const noAbilityToken = game.tokens.find((t) => t.id === "courtier-No Ability");
		if (hasAbility) return assignTokenToPlayer("courtier-Drunk 3", "Choose a player", game, { additionalActions: (p) => {
			if (p.suspectedRole?.id === "courtier" && !p.tokens.some((t) => t.id === "courtier-No Ability")) p.tokens.push(noAbilityToken);
			return p;
		} });
		else return b`<p class="center">
        The courtier has used their ability already.
      </p>`;
	},
	juggler: ({ role, game }) => {
		const correctToken = game.players.find((p) => p.suspectedRole?.id === "juggler").tokens.find((t) => /^juggler-Correct [1-5]$/.test(t.id));
		return b`
      <p class="center">
        The juggler has <span class="balgruf">${correctToken ? parseInt(correctToken.id.match(/^juggler-Correct (\d)$/)[1], 10) : 0}</span> correct
        guesses.
      </p>
    `;
	},
	nodashii: ({ role, game }) => {
		return assignTokenToPlayer("nodashii-Dead", "Choose a player to die", game);
	},
	vortox: ({ role, game }) => {
		return assignTokenToPlayer("vortox-Dead", "Choose a player to die", game);
	},
	kazali: ({ role, game }) => {
		const amount = TRAVELLER_SHEET[game.players.length].minions;
		const minionsInPlay = game.players.filter((p) => p.suspectedRole?.type?.toLowerCase() === "minion").map((p) => p.name);
		if (game.day === 0) return b`
        <p class="center">
          By default, there should be
          <span class="balgruf">${amount}</span>
          minion${amount !== 1 ? "s" : ""} in play.
        </p>
        <p class="center">
          <span class="balgruf">${minionsInPlay.length}</span>
          minion${minionsInPlay.length !== 1 ? "s" : ""} in play:
          <span class="balgruf">${minionsInPlay.join(", ")}</span>
        </p>
        <button
          primary
          ui-button
          @click=${() => {
			dialog.open({ id: "playerSelect" }).then(([player]) => {
				dialog.open({
					id: "roleSelect",
					parameters: {
						allScriptRoles: true,
						filterFn: (r) => r.type.toLowerCase() === "minion"
					}
				}).then(([role]) => {
					state.setState((s) => ({
						...s,
						currentGame: {
							...s.currentGame,
							players: s.currentGame.players.map((p) => {
								if (p.id === player.id) return {
									...p,
									suspectedRole: role
								};
								return p;
							})
						}
					}));
				});
			});
		}}
        >
          Choose minion
        </button>
      `;
		else return assignTokenToPlayer("kazali-Dead", "Choose a player to die", game);
	},
	lordoftyphon: ({ role, game }) => {
		return assignTokenToPlayer("lordoftyphon-Dead", "Choose a player to die", game);
	},
	sweetheart: ({ role, game }) => {
		if (game.players.find((p) => p.suspectedRole?.id === "sweetheart").dead && !game.players.some((p) => p.tokens.some((t) => t.id === "sweetheart-Drunk"))) return assignTokenToPlayer("sweetheart-Drunk", "Choose a player to be drunk", game);
	},
	philosopher: ({ role, game }) => {
		const philosopher = game.players.find((p) => p.suspectedRole?.id === "philosopher");
		if (!philosopher.tokens.some((t) => t.id === "philosopher-No Ability")) return b`<button
        ui-button
        primary
        @click=${() => {
			dialog.open({
				id: "roleSelect",
				parameters: {
					allScriptRoles: true,
					filterFn: (r) => r.type.toLowerCase() === "townsfolk" || r.type.toLowerCase() === "outsider"
				}
			}).then(([role]) => {
				const isRoleInPlayAlready = game.players.find((p) => p.suspectedRole?.id === role.id);
				state.setState((s) => ({
					...s,
					currentGame: {
						...s.currentGame,
						players: s.currentGame.players.map((p) => {
							if (p.suspectedRole?.id === isRoleInPlayAlready?.suspectedRole?.id) {
								p.tokens = p.tokens.filter((t) => t.id !== "philosopher-Drunk");
								p.tokens.push(game.tokens.find((t) => t.id === "philosopher-Drunk"));
							}
							if (p.suspectedRole?.id === "philosopher") {
								p.tokens = p.tokens.filter((t) => t.id !== "philosopher-No Ability");
								p.tokens.push({
									id: `philosopher-No Ability`,
									role: "philosopher",
									label: "No Ability",
									icon: "philosopher",
									type: "townsfolk",
									humanReadableRole: "Philosopher"
								});
								p.tokens.push({
									id: `philosopher-Role`,
									role: "philosopher",
									label: role.humanReadableRole,
									icon: role.icon,
									type: role.type,
									humanReadableRole: role.humanReadableRole
								});
							}
							return p;
						})
					}
				}));
				if (isRoleInPlayAlready) {}
			});
		}}
      >
        Choose player
      </button>`;
		else return b`<p class="center">
        The philosopher has used their ability already, they are now considered
        <span class="balgruf"
          >${philosopher.tokens.find((t) => t.id === "philosopher-Role").humanReadableRole}</span
        >.
      </p>`;
	},
	witch: ({ role, game }) => {
		if (game.players.filter((p) => !p.dead).length >= 3) return assignTokenToPlayer("witch-Cursed", "Choose a player to curse", game);
	},
	eviltwin: ({ role, game }) => {
		const assignedEvilTwin = game.players.find((p) => p.tokens.some((t) => t.id === "eviltwin-Twin"));
		const evilTwin = game.players.find((p) => p.suspectedRole?.id === "eviltwin");
		if (assignedEvilTwin) return b`<p class="center">
        <button
          ui-button
          primary
          @click=${() => {
			inlineDialog(() => b`
                <h2 style="color: var(--ui-main-5);">
                  ${capitalize(assignedEvilTwin.name)} is:
                </h2>
                ${showPlayerRoleToken(assignedEvilTwin)}
              `);
		}}
        >
          Show good twin character token
        </button>
        <button
          ui-button
          primary
          @click=${() => {
			inlineDialog(() => b`
                <h2 style="color: var(--ui-main-5);">
                  ${capitalize(evilTwin.name)} is:
                </h2>
                ${showPlayerRoleToken(evilTwin)}
              `);
		}}
        >
          Show evil twin character token
        </button>
      </p>`;
		else return assignTokenToPlayer("eviltwin-Twin", "Choose a player to be the evil twin", game);
	},
	clockmaker: ({ role, game }) => {
		const players = game.players;
		const n = players.length;
		const clockmakerIndex = players.findIndex((p) => p.suspectedRole?.id === "clockmaker");
		const demonIndexes = players.map((p, i) => p.suspectedRole?.type?.toLowerCase() === "demon" || p.tokens?.some((t) => t.id === "lilmonsta-Is The Demon") ? i : -1).filter((i) => i !== -1);
		const minionIndexes = players.map((p, i) => p.suspectedRole?.type?.toLowerCase() === "minion" ? i : -1).filter((i) => i !== -1);
		if (clockmakerIndex === -1 || demonIndexes.length === 0 || minionIndexes.length === 0) return b`
        <p class="center">The Clockmaker receives no information.</p>
      `;
		const distances = demonIndexes.flatMap((demon) => minionIndexes.map((minion) => {
			const diff = Math.abs(demon - minion);
			return Math.min(diff, n - diff);
		}));
		return b`
      <p class="center">
        The Clockmaker learns there are
        <span class="balgruf">${Math.min(...distances)}</span>
        steps between the Demon and their nearest Minion.
      </p>
    `;
	},
	oracle: ({ role, game }) => {
		const amountOfDeadEvilPlayers = game.players.filter((p) => (p.suspectedRole?.type?.toLowerCase() === "demon" || p?.suspectedRole?.type?.toLowerCase() === "minion") && p.dead);
		return b`
      <p class="center">
        The oracle learns there are
        <span class="balgruf">${amountOfDeadEvilPlayers.length}</span> dead evil
        players.
      </p>
      <style>
        botc-player-details {
          margin-bottom: 12px !important;
        }

        .dead-evil-players {
          margin-top: 24px;
        }
      </style>
      <div class="dead-evil-players">
        ${amountOfDeadEvilPlayers.map((p) => b`<botc-player-details .player=${p}></botc-player-details>`)}
      </div>
    `;
	},
	towncrier: ({ role, game }) => {
		const nominatedToken = game.players.some((p) => p.suspectedRole?.type?.toLowerCase() === "towncrier" && p.tokens.some((t) => t.id === "towncrier-Minions Nominated"));
		const minions = game.players.filter((p) => p.suspectedRole?.type?.toLowerCase() === "minion");
		const todaysNominations = game.nominations.filter((n) => n.day === game.day);
		return b`
      <p class="center">
        Today ${nominatedToken || todaysNominations.some((nom) => minions.some((m) => m.id === nom.nominator)) ? "a minion" : "no minions"} nominated.
      </p>
      <button
        ui-button
        primary
        @click=${() => {
			inlineDialog(() => b`
              <style>
                ${balgruf} h2 {
                  font-size: 3.725rem;
                  line-height: 0.9;
                }
                .container {
                  height: 80%;
                  display: flex;
                  align-items: center;
                }
              </style>
              <div class="container">
                <h2 class="balgruf">Did you<br />nominate?</h2>
              </div>
            `);
		}}
      >
        Did you nominate?
      </button>
    `;
	},
	seamstress: ({ role, game }) => {
		const seamstress = game.players.find((p) => p.suspectedRole?.id === "seamstress");
		if (!seamstress.tokens.some((t) => t.id === "seamstress-No Ability")) return b`<button
        ui-button
        primary
        @click=${() => {
			dialog.open({
				id: "playerSelect",
				parameters: {
					showNightOrder: true,
					multiple: true,
					maxSelect: 2
				}
			}).then((players) => {
				const areSameAlignment = players[0].suspectedRole.type === players[1].suspectedRole.type;
				inlineDialog(() => b`
                  <style>
                    ${balgruf} h2 {
                      font-size: 3.725rem;
                      line-height: 0.9;
                    }
                    .container {
                      height: 80%;
                      display: flex;
                      justify-content: center;
                      align-items: center;
                    }
                  </style>
                  <div class="container">
                    <h2 class="balgruf">${areSameAlignment ? "Yes" : "No"}</h2>
                  </div>
                `);
				state.setState((s) => ({
					...s,
					currentGame: {
						...s.currentGame,
						players: s.currentGame.players.map((p) => {
							if (p.id === seamstress.id) p.tokens.push(game.tokens.find((t) => t.id === "seamstress-No Ability"));
							return p;
						})
					}
				}));
			});
		}}
      >
        Choose 2 players
      </button>`;
		else return b`<p class="center">
        The seamstress has used their ability already.
      </p>`;
	},
	flowergirl: ({ role, game }) => {
		const voted = game.players.find((p) => p.suspectedRole?.type?.toLowerCase() === "flowergirl" && p.tokens.some((t) => t.id === "flowergirl-Demon Voted"));
		const demons = game.players.filter((p) => p.suspectedRole?.type?.toLowerCase() === "demon");
		const todaysNominations = game.nominations.filter((n) => n.day === game.day);
		return b`
      <p class="center">
        The demon ${!!(voted || todaysNominations.some((nom) => nom.votes.some((voterId) => demons.some((d) => d.id === voterId)))) ? "voted" : "did not vote"} today.
      </p>
      <button
        ui-button
        primary
        @click=${() => {
			inlineDialog(() => b`
              <style>
                ${balgruf} h2 {
                  font-size: 3.725rem;
                  line-height: 0.9;
                }
                .container {
                  height: 80%;
                  justify-content: center;
                  display: flex;
                  align-items: center;
                }
              </style>
              <div class="container">
                <h2 class="balgruf">Did you<br />vote?</h2>
              </div>
            `);
		}}
      >
        Did you vote?
      </button>
    `;
	},
	lunatic: ({ role, game }) => {
		if (game.day !== 0) return assignTokenToPlayer("lunatic-Chosen", "Choose a player to die", game);
	},
	cerenovus: ({ role, game }) => {
		const cerenovus = game.players.find((p) => p.suspectedRole?.id === "cerenovus");
		return b`
      <button
        ui-button
        primary
        @click=${() => {
			dialog.open({
				id: "playerSelect",
				parameters: { showNightOrder: true }
			}).then((player) => {
				dialog.open({
					id: "roleSelect",
					parameters: {
						allScriptRoles: true,
						filterFn: (r) => r.type.toLowerCase() !== "traveller"
					}
				}).then((roles) => {
					inlineDialog(() => b`
                      <style>
                        h2 {
                          line-height: 0.9;
                        }

                        .container {
                          height: calc(100% - 80px);
                          display: flex;
                          align-items: center;
                          flex-direction: column;
                        }
                        p.smol {
                          font-size: 0.625rem;
                          text-align: center;
                          margin: 0;
                          margin-bottom: 12px;
                        }
                      </style>
                      <div class="container">
                        <p class="smol">Show ${capitalize(player[0].name)}</p>
                        <h2 style="color: var(--ui-main-5);">
                          This character selected you
                        </h2>
                        ${showPlayerRoleToken(cerenovus)}
                      </div>
                    `, { button: b`<button
                        ui-button
                        primary
                        @click=${() => dialog.close()}
                      >
                        Next
                      </button>` }).then(() => {
						showPlayer({
							title: "You are mad that you are",
							role: roles[0],
							stText: `Show ${capitalize(player[0].name)}`
						});
					});
					state.setState((s) => ({
						...s,
						currentGame: {
							...s.currentGame,
							players: s.currentGame.players.map((p) => {
								p.tokens = p.tokens.filter((t) => t.id !== "cerenovus-Mad");
								if (p.id === player[0].id) p.tokens.push({
									id: `cerenovus-Mad`,
									role: "cerenovus",
									label: roles[0].humanReadableRole,
									icon: "cerenovus",
									type: "minion",
									humanReadableRole: roles[0].humanReadableRole
								});
								return p;
							})
						}
					}));
				});
			});
		}}
      >
        Choose
      </button>
    `;
	},
	sage: ({ role, game }) => {
		const targetedByDemon = game.players.find((p) => p.suspectedRole?.id === "sage").tokens.find((t) => t.type.toLowerCase() === "demon" && t.id.includes("Dead"));
		const demon = game.players.find((p) => p.suspectedRole?.type?.toLowerCase() === "demon" || p.tokens.some((t) => t.id === "lilmonsta-Is The Demon"));
		if (targetedByDemon) return b`<p class="center">
        Show the Sage <span class="balgruf">${capitalize(demon.name)}</span> and
        1 other player.
      </p>`;
		else return b`<p class="center">
        The sage was not targeted by the demon.
      </p>`;
	},
	/**
	* Type specific actions/reminders
	*/
	demon: ({ role, game }) => {
		const demon = game.players.find((p) => p.suspectedRole?.type?.toLowerCase() === "demon" || p.tokens.some((t) => t.id === "lilmonsta-Is The Demon"));
		const wasChosenByExorcist = game.players.find((p) => p.suspectedRole?.type?.toLowerCase() === "demon" && p.tokens.some((t) => t.id === "exorcist-Chosen"));
		const exorcist = game.players.find((p) => p.suspectedRole?.id?.toLowerCase() === "exorcist");
		const hasLunatic = game.players.find((p) => p.suspectedRole?.id?.toLowerCase() === "lunatic");
		const lunaticTarget = game.players.find((p) => p.tokens.some((t) => t.id === "lunatic-Chosen"));
		/**
		* @TODO
		* on barber died, set haircuts tonight, include the day maybe?
		*/
		const hairCutsTonight = game.players.find((p) => p.tokens.some((t) => t.id === "barber-Haircuts Tonight"));
		return {
			render: () => {
				const result = [];
				if (hairCutsTonight) result.push(b`
            <p class="center">
              The barber died today or tonight. show the Demon the *THIS
              CHARACTER SELECTED YOU* & Barber tokens. If the Demon chose 2
              players, wake one at a time. Show the *YOU ARE* token & their new
              character token.
            </p>
            <button
              ui-button
              primary
              @click=${() => {
					showPlayer({
						stText: `Show ${capitalize(demon.name)}`,
						title: `This character selected you`,
						role: hairCutsTonight.suspectedRole,
						nextBtn: true
					}).then(() => {
						dialog.open({
							id: "playerSelect",
							parameters: {
								showNightOrder: true,
								multiple: true,
								maxSelect: 2,
								filterFn: (p) => p?.suspectedRole?.type?.toLowerCase() !== "demon"
							}
						}).then((players) => {
							const [playerA, playerB] = players;
							const roleA = playerA.suspectedRole;
							const roleB = playerB.suspectedRole;
							const nameA = playerA.name;
							const nameB = playerB.name;
							state.setState((s) => ({
								...s,
								currentGame: {
									...s.currentGame,
									players: s.currentGame.players.map((p) => {
										p.tokens = p.tokens.filter((t) => t.id !== "barber-Haircuts Tonight");
										if (p.id === playerA.id) p.suspectedRole = roleB;
										else if (p.id === playerB.id) p.suspectedRole = roleA;
										return p;
									})
								}
							}));
							showPlayer({
								stText: `Show ${capitalize(nameA)}`,
								title: `You are`,
								role: playerA.suspectedRole,
								nextBtn: true
							}).then(() => {
								showPlayer({
									stText: `Show ${capitalize(nameB)}`,
									title: `You are`,
									role: playerB.suspectedRole,
									nextBtn: true
								});
							});
						});
					});
				}}
            >
              This character selected you
            </button>
          `);
				if (game.day > 0 && hasLunatic && lunaticTarget) result.push(b`
            <button
              ui-button
              primary
              @click=${() => {
					inlineDialog(() => b`
                    <style>
                      ${balgruf} h2 {
                        font-size: 3.725rem;
                        line-height: 0.9;
                      }
                      .container {
                        height: 80%;
                        display: flex;
                        align-items: center;
                      }
                    </style>
                    <div class="container">
                      <h2 class="balgruf">
                        The Lunatic chose: <br /><br />${capitalize(lunaticTarget.name)}
                      </h2>
                    </div>
                  `);
				}}
            >
              Show Lunatic target
            </button>
          `);
				if (wasChosenByExorcist) result.push(b`
            <p class="center">
              The demon was chosen by the exorcist, they learn who the exorcist
              is and don't wake.
            </p>
            <button
              ui-button
              primary
              @click=${() => {
					inlineDialog(() => b`
                    <h2 style="color: var(--ui-main-5);">
                      ${capitalize(exorcist.name)}
                    </h2>
                    ${showPlayerRoleToken(exorcist)}
                  `);
				}}
            >
              Show exorcist
            </button>
          `);
				return result;
			},
			disabled: !!wasChosenByExorcist
		};
	}
};
const tokenSpecificActions = { "marionette-Is The Marionette": ({ token, role, game, nightOrder, player }) => {
	const demon = game.players.find((p) => p.suspectedRole?.type?.toLowerCase() === "demon");
	if (game.day > 0) return;
	if (!(player.suspectedRole?.id === "marionette")) return b`
        <p class="center">
          <span class="balgruf">${capitalize(player.name)}</span> is the
          Marionette. Wake the Demon
          <span class="balgruf">${capitalize(demon.name)}</span> and show them
          the Marionette.
        </p>
        <button
          ui-button
          primary
          @click=${() => {
		inlineDialog(() => b`
                <h2 style="color: var(--ui-main-5);">
                  ${capitalize(player.name)} is:
                </h2>
                ${showPlayerRoleToken({ suspectedRole: window.rolesById.marionette })}
              `);
	}}
        >
          Show Marionette to the Demon
        </button>
      `;
} };
var BotcNightPhase = class extends i {
	media = new MediaQueryController(this, [BREAKPOINTS.LG.MIN], ({ media, matches }) => {
		switch (media) {
			case BREAKPOINTS.LG.MIN:
				this.mobile = !matches;
				break;
		}
	});
	static styles = [
		header,
		inlay,
		radio,
		button,
		iconButton,
		error,
		i$1`
      :host {
        /* height: calc(100% - calc(75px + env(safe-area-inset-bottom))); */
        flex: 1;
        display: flex;
        flex-direction: column;
      }

      p {
        margin-top: 0.4rem;
        margin-bottom: 0.4rem;
      }

      .balgruf {
        font-family: "Balgruf";
        font-size: 1.375rem;
        color: ${main5};
        text-shadow: 1px 1px 2px rgba(0, 0, 0, 1);
        margin: 0;
      }

      .center {
        font-size: 0.9rem;
        text-align: center;
      }

      h2 {
        font-family: "Balgruf";
        font-size: 1.375rem;
        color: ${bg1};
        text-shadow: 1px 1px 2px rgba(0, 0, 0, 1);
        margin: 0;
      }

      ul.page-list {
        list-style: none;
        padding: 0;
        margin: 0;
        width: 100vw;
        overflow-x: auto;
        /* border: solid 1px red; */
        display: flex;
        flex-direction: row;
        /* height: calc(
          calc(calc(100vh - calc(75px + env(safe-area-inset-bottom))) - 75px) -
            24px
        ); */
        flex: 1;
        scroll-snap-type: x mandatory;
        scrollbar-width: none; /* Firefox */
        -ms-overflow-style: none; /* IE 10+ */
      }

      ul::-webkit-scrollbar {
        display: none; /* Safari and Chrome */
      }

      li.page {
        scroll-snap-align: center;
        flex-shrink: 0;
        width: calc(100vw - 48px);
        /* height: 100%; */
        padding: 24px;
        display: flex;
        flex-direction: column;
        justify-content: center;
      }

      .progress-bar {
        display: flex;
        justify-content: center;
        gap: 6px;
        margin: 0;
        margin-bottom: 12px;
        padding: 0 16px;
      }

      .progress-bar-item {
        flex: 1;
        height: 4px;
        border-radius: 3px;
        background: ${bg3};
        transition: background 0.3s;
      }

      .progress-bar-item.active {
        background: ${main5};
      }

      .special-icon {
        margin-left: auto;
        margin-right: auto;
        width: 100px;
        height: 100px;
      }

      .special-icon svg {
        width: 100px;
        height: 100px;
        fill: ${main5};
      }

      .special-title {
        font-family: "Balgruf";
        font-size: 2.5rem;
        color: ${main5};
        text-align: center;
        text-shadow: 1px 1px 2px rgba(0, 0, 0, 1);
      }

      p.special-description {
        font-size: 0.9rem;
      }
      .special-description {
        text-align: center;
      }

      ul.night-deaths {
        margin-top: 8px;
        margin-bottom: 16px;
        overflow-y: auto;
        max-height: 40vh;
        margin: 0;
        padding: 0;
      }
      ul.night-deaths li botc-player-details {
        margin-bottom: 8px;
        margin-top: 12px;
      }

      p.for-player {
        font-size: 1.875rem;
      }

      h2.for-player {
        text-align: center;
        font-size: 2.5rem;
        color: ${main5};
        line-height: 0.9;
      }

      .for-st-reminder {
        font-size: 0.75rem;
        text-align: center;
      }

      ul.player-list {
        list-style: none;
        padding: 0;
        margin: 0;
      }

      li.player {
        display: flex;
        align-items: stretch;
        border: solid 1px var(--ui-border);
        background: var(--ui-bg-5);
        padding: 8px;
        border-radius: 8px;
        box-sizing: border-box;
        box-shadow:
          0 0 4px 0 rgba(0, 0, 0, 0.12),
          0 4px 4px 0 rgba(0, 0, 0, 0.24);
      }

      botc-player-details {
        margin-bottom: 48px;
      }

      li.player h2 {
        color: ${main5};
      }

      li.player:not(:last-child) {
        margin-bottom: 12px;
      }

      ul.bluff-list {
        list-style: none;
        padding: 0;
        margin: 0;
        margin-top: 24px;
        width: 100%;
      }

      li.bluff {
        display: flex;
        align-items: stretch;
        border: solid 1px var(--ui-border);
        background: var(--ui-bg-5);
        padding: 8px;
        border-radius: 8px;
        box-sizing: border-box;
        box-shadow:
          0 0 4px 0 rgba(0, 0, 0, 0.12),
          0 4px 4px 0 rgba(0, 0, 0, 0.24);
      }

      .you-are {
        font-family: "Balgruf";
        font-size: 2.5rem;
        color: ${main5};
        text-shadow: 1px 1px 2px rgba(0, 0, 0, 1);
        margin: 0;
        text-align: center;
      }

      .you-are-token h2 {
        font-size: 2.5rem;
      }

      .you-are-token .big-role {
        margin: 0;
        flex-shrink: 0;
      }

      .you-are-token {
        display: flex;
        flex: 1;
        flex-direction: column;
        justify-content: center;
        align-items: center;
      }

      li.bluff:not(:last-child) {
        margin-bottom: 12px;
      }

      ul.bluff-list li h2 {
        display: flex;
        align-items: center;
        color: #45a0f1;
      }

      ul.bluff-list li img {
        margin-right: 20px;
        width: 50px;
        height: 50px;
        border-radius: 50%;
        border: solid 2px #45a0f1;
        background-color: ${bg8};
      }

      .wrapper {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        flex: 1;
      }

      h2.demon-is {
        font-size: 4.5rem;
      }

      .quick-actions {
        margin-top: 20px;
        justify-content: center;
        display: flex;
      }

      .quick-actions button[ui-icon-button] {
        margin: 4px;
      }

      @media (min-width: 840px) {
        ul.page-list {
          width: 100%;
        }

        ul.page-list li.page {
          width: calc(100% - 48px);
        }
      }

      .desktop-arrows {
        padding: 0 16px;
        display: flex;
        justify-content: space-between;
      }

      .desktop-arrows button[ui-button][secondary] {
        box-shadow: unset;
        border: unset;
        justify-content: center;
        align-items: center;
        display: flex;
        font-weight: 300;
        color: white;
        fill: white;
        width: unset;
        font-family: "Poppins", sans-serif;
        padding: 8px;
        margin-top: 6px;
      }

      .desktop-arrows button[ui-button][secondary] svg {
        fill: white;
      }

      .desktop-arrows button[ui-button][secondary] > *:first-child {
        /* Your styles here */
        margin-right: 6px;
      }

      .desktop-arrows button[ui-button][secondary]:hover {
        box-shadow: unset;
        border: unset;
      }

      .show-progress svg,
      .grim svg {
        fill: white;
      }

      /* Special spacing when li.page contains div[ui-error].warning */
      li.page:has(div[ui-error].warning) botc-player-details {
        margin-top: 0px;
      }

      li.page div[ui-error].warning {
        margin-bottom: 12px;
      }
    `
	];
	static properties = {
		items: { type: Array },
		currentIndex: { type: Number },
		nightOrder: { type: Array },
		dayIncremented: { type: Boolean },
		mobile: { type: Boolean },
		showProgress: { type: Boolean },
		deadPlayerShowRoles: { type: Boolean }
	};
	constructor() {
		super();
		this.showProgress = true;
		this.currentIndex = 0;
		this.deadPlayerShowRoles = true;
		this.nightOrder = [];
		this.dayIncremented = false;
		this.callRequestUpdate = this.callRequestUpdate.bind(this);
	}
	firstUpdated() {
		this.scrollContainer = this.shadowRoot.querySelector("ul");
		this.scrollContainer.addEventListener("scroll", this._onScroll.bind(this));
		this.scrollToIndex();
	}
	scrollToIndex() {
		this.scrollContainer = this.shadowRoot.querySelector("ul");
		waitUntil(() => this.scrollContainer.querySelectorAll("li.page").length).then(() => {
			const index = state.getState().currentGame.nightPhaseIndex ?? 0;
			const children = this.scrollContainer.querySelectorAll("li.page");
			const targetChild = children[index];
			if (!targetChild) {
				console.warn("❌ scrollToIndex: targetChild is undefined", {
					index,
					childrenLength: children.length
				});
				return;
			}
			const containerRect = this.scrollContainer.getBoundingClientRect();
			const scrollOffset = targetChild.getBoundingClientRect().left - containerRect.left + this.scrollContainer.scrollLeft;
			this.scrollContainer.scrollTo({
				left: scrollOffset,
				behavior: "smooth"
			});
		});
	}
	callRequestUpdate() {
		this.nightOrder = this.createNightOrder();
		this.requestUpdate();
	}
	disconnectedCallback() {
		state.removeEventListener("state-changed", this.callRequestUpdate);
	}
	async connectedCallback() {
		super.connectedCallback();
		state.addEventListener("state-changed", this.callRequestUpdate);
		state.addEventListener("scroll-to-index", () => {
			this.scrollToIndex();
		});
		this.nightOrderJson = state.getState().nightOrder;
		this.nightOrder = this.createNightOrder();
	}
	createNightOrder() {
		const gameState = state.getState();
		const minionInfo = gameState?.currentGame?.scriptData?.minion?.find((r) => r.id === "minioninfo");
		if (minionInfo) minionInfo.__sortOrder = minionInfo.firstNight;
		const demonInfo = gameState?.currentGame?.scriptData?.demon?.find((r) => r.id === "demoninfo");
		if (demonInfo) demonInfo.__sortOrder = demonInfo.firstNight;
		const players = gameState.currentGame.players ?? [];
		const isFirstNight = gameState.currentGame.day === 0;
		const kind = isFirstNight ? "firstNight" : "otherNight";
		const minions = players.filter((p) => p.suspectedRole?.type?.toLowerCase?.() === "minion" || p?.tokens?.some((t) => t.id.toLowerCase().includes("marionette")));
		const lunatic = players.find((p) => p.suspectedRole?.id?.toLowerCase?.() === "lunatic");
		const lilmonstaGame = players.find((p) => p.suspectedRole?.id?.toLowerCase?.() === "lilmonsta" || p?.tokens?.some((t) => t.id === "lilmonsta-Is The Demon"));
		const roleEntries = players.filter((p) => {
			const hasAbilityToken = p.tokens?.some((t) => t.id?.includes("vigormortis-Has Ability"));
			const isZombuul = p.suspectedRole?.id === "zombuul";
			return !p.dead || hasAbilityToken || isZombuul;
		}).filter((p) => p.suspectedRole?.[kind] > 0).map((p) => ({
			...p,
			__sortOrder: p.suspectedRole[kind]
		}));
		const staticEntries = [];
		if (lunatic && gameState.currentGame.day === 0) {
			staticEntries.push({
				id: "lunatic-special",
				edition: "special",
				name: "Lunatic Info",
				team: "demon",
				firstNightReminder: `Select a demon${players.length >= 7 ? ", bluffs and minions" : ""} for the lunatic.`,
				firstNight: 18,
				otherNight: 0,
				__sortOrder: 18
			});
			if (players.length >= 7 && !lilmonstaGame) staticEntries.push(...[{
				id: "lunatic-demoninfo",
				edition: "special",
				name: "Demon Info",
				team: "demon",
				firstNightReminder: "Show the *THESE ARE YOUR MINIONS* token. Point to all Minions.\n	Show the *THESE CHARACTERS ARE NOT IN PLAY* token. Show 3 not-in-play good character tokens.",
				firstNight: 18,
				otherNight: 0,
				__sortOrder: 18
			}, {
				id: "lunatic-bluffs",
				edition: "special",
				name: "Demon Bluffs",
				team: "demon",
				firstNightReminder: "Show the *THESE CHARACTERS ARE NOT IN PLAY* token. Show 3 not-in-play good character tokens.",
				firstNight: 18,
				otherNight: 0,
				__sortOrder: 18
			}]);
		}
		staticEntries.push({
			id: "dusk",
			name: "Dusk",
			edition: "special",
			firstNightReminder: "Start the Night Phase.",
			otherNightReminder: "Start the Night Phase.",
			firstNight: 1,
			otherNight: 1,
			__sortOrder: 1
		});
		const hasDemon = players.some((p) => p.suspectedRole?.type?.toLowerCase?.() === "demon");
		if (isFirstNight && players.length >= 7 && minions.length && !lilmonstaGame && hasDemon) if (!minionInfo) staticEntries.push({
			id: "minioninfo",
			edition: "special",
			name: "Minion Info",
			team: "minion",
			firstNightReminder: "Show the *THIS IS THE DEMON* token. Point to the Demon.\n	Show the *THESE ARE YOUR MINIONS* token. Point to the other Minions.",
			firstNight: 14,
			otherNight: 0,
			__sortOrder: 14
		});
		else staticEntries.push(minionInfo);
		if (isFirstNight && players.length >= 7 && !lilmonstaGame && hasDemon) {
			if (lunatic) staticEntries.push({
				id: "demon-lunaticinfo",
				edition: "special",
				name: "Lunatic Info",
				team: "demon",
				firstNightReminder: "There is a lunatic in play. Show the demon who the lunatic is.",
				firstNight: demonInfo?.firstNight ?? 18,
				otherNight: 0,
				__sortOrder: demonInfo?.firstNight ?? 18
			});
			if (minions.length && !lilmonstaGame) if (!demonInfo) staticEntries.push({
				id: "demoninfo",
				edition: "special",
				name: "Demon Info",
				team: "demon",
				firstNightReminder: "Show the *THESE ARE YOUR MINIONS* token. Point to all Minions.\n	Show the *THESE CHARACTERS ARE NOT IN PLAY* token. Show 3 not-in-play good character tokens.",
				firstNight: 18,
				otherNight: 0,
				__sortOrder: 18
			});
			else staticEntries.push(demonInfo);
			if (!lilmonstaGame) staticEntries.push({
				id: "demonbluffs",
				edition: "special",
				name: "Demon Bluffs",
				team: "demon",
				firstNightReminder: "Show the *THESE CHARACTERS ARE NOT IN PLAY* token. Show 3 not-in-play good character tokens.",
				firstNight: 18,
				otherNight: 0,
				__sortOrder: 18
			});
		}
		if (lilmonstaGame) staticEntries.push({
			...window.rolesById["lilmonsta"],
			suspectedRole: window.rolesById["lilmonsta"],
			__sortOrder: isFirstNight ? 24 : 48
		});
		staticEntries.push({
			id: "dawn",
			name: "Dawn",
			edition: "special",
			firstNightReminder: "Wait for a few seconds. End the Night Phase.",
			otherNightReminder: "Wait for a few seconds. End the Night Phase.",
			firstNight: 72,
			otherNight: 90,
			__sortOrder: isFirstNight ? 72 : 90
		});
		return [...roleEntries, ...staticEntries].sort((a, b) => a.__sortOrder - b.__sortOrder);
	}
	_onScroll() {
		if (!this.scrollContainer) return;
		cancelAnimationFrame(this._raf);
		this._raf = requestAnimationFrame(() => {
			const children = [...this.scrollContainer.querySelectorAll("li.page")];
			const containerRect = this.scrollContainer.getBoundingClientRect();
			let closestIndex = 0;
			let closestDistance = Infinity;
			children.forEach((child, index) => {
				const rect = child.getBoundingClientRect();
				const childCenter = rect.left + rect.width / 2;
				const containerCenter = containerRect.left + containerRect.width / 2;
				const distance = Math.abs(containerCenter - childCenter);
				if (distance < closestDistance) {
					closestDistance = distance;
					closestIndex = index;
				}
			});
			this.currentIndex = closestIndex;
			if (state.getState().currentGame.nightPhaseIndex !== closestIndex) state.setState((s) => ({
				...s,
				currentGame: {
					...s.currentGame,
					nightPhaseIndex: closestIndex
				}
			}));
		});
	}
	render() {
		const game = state.getState().currentGame;
		const reminder = game?.day === 0 ? "firstNightReminder" : "otherNightReminder";
		const demonBluffs = game?.demonBluffs ?? [];
		const minions = game.players.filter((player) => player.suspectedRole?.type?.toLowerCase?.() === "minion" || player.tokens.some((t) => t.id.toLowerCase().includes("marionette")));
		const demon = game.players.find((player) => player.suspectedRole?.type?.toLowerCase?.() === "demon" || player.tokens.some((t) => t.id === "lilmonsta-Is The Demon"));
		const lunatic = game.players.find((player) => player.suspectedRole?.id?.toLowerCase?.() === "lunatic");
		const isVortoxGame = game.players.some((player) => player.suspectedRole?.id?.toLowerCase?.() === "vortox");
		return b`
      <h1 header>Night Phase</h1>
      ${when(this.showProgress, () => b`
          <div class="progress-bar">
            ${[...game?.day === 0 && game?.assign === "auto" ? Array(game.players.length).fill(0) : [], ...this.nightOrder].map((_, i) => b`
                <div
                  class="progress-bar-item ${this.currentIndex === i ? "active" : ""}"
                ></div>
              `)}
          </div>
        `)}
      ${when(!this.mobile, () => b`
          <div class="desktop-arrows">
            <div class="arrow left">
              ${when(this.currentIndex > 0, () => b`
                  <button
                    @click=${() => {
			state.setState((s) => ({
				...s,
				currentGame: {
					...s.currentGame,
					nightPhaseIndex: this.currentIndex - 1
				}
			}));
			state.dispatchEvent(new Event("scroll-to-index"));
		}}
                    ui-button
                    secondary
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      height="24px"
                      viewBox="0 -960 960 960"
                      width="24px"
                      fill="#e3e3e3"
                    >
                      <path
                        d="m313-440 224 224-57 56-320-320 320-320 57 56-224 224h487v80H313Z"
                      />
                    </svg>
                    <span>Back</span>
                  </button>
                `)}
            </div>
            <div class="arrow right">
              ${when(this.currentIndex < [...game?.day === 0 && game?.assign === "auto" ? Array(game.players.length).fill(0) : [], ...this.nightOrder].length - 1, () => b`
                  <button
                    @click=${() => {
			state.setState((s) => ({
				...s,
				currentGame: {
					...s.currentGame,
					nightPhaseIndex: this.currentIndex + 1
				}
			}));
			state.dispatchEvent(new Event("scroll-to-index"));
		}}
                    ui-button
                    secondary
                  >
                    <span>Next</span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      height="24px"
                      viewBox="0 -960 960 960"
                      width="24px"
                      fill="#e3e3e3"
                    >
                      <path
                        d="M647-440H200q-17 0-28.5-11.5T160-480q0-17 11.5-28.5T200-520h447L451-716q-12-12-11.5-28t12.5-28q12-11 28-11.5t28 11.5l264 264q6 6 8.5 13t2.5 15q0 8-2.5 15t-8.5 13L508-188q-11 11-27.5 11T452-188q-12-12-12-28.5t12-28.5l195-195Z"
                      />
                    </svg>
                  </button>
                `)}
            </div>
          </div>
        `)}
      <ul class="page-list">
        ${when(game?.day === 0 && game?.assign === "auto", () => game.players.map((p) => {
			const drunk = p?.suspectedRole?.id === "drunk";
			const lunatic = p?.suspectedRole?.id === "lunatic";
			const lunaticHasDemonAssigned = !!p?.meta?.demon;
			const lilmonsta = p?.suspectedRole?.id === "lilmonsta";
			const marionette = p?.suspectedRole?.id === "marionette";
			const gnome = p?.suspectedRole?.id === "gnome";
			return b`
              <li class="page">
                <p class="for-st-reminder">Show ${capitalize(p.name)}</p>
                <h2 class="you-are">You are</h2>
                <div class="you-are-token">
                  ${when(lunatic && !lunaticHasDemonAssigned, () => b`
                      ${showPlayerRoleToken(p)}
                      <button
                        ui-button
                        primary
                        @click=${() => {
				dialog.open({
					id: "roleSelect",
					parameters: {
						showNightOrder: true,
						allScriptRoles: true,
						filterFn: (r) => r?.type?.toLowerCase() === "demon"
					}
				}).then(([demon]) => {
					state.setState((s) => ({
						...s,
						currentGame: {
							...s.currentGame,
							players: s.currentGame.players.map((player) => {
								if (p.id === player.id) {
									if (!player.meta) player.meta = {};
									player.meta = {
										...player.meta,
										demon
									};
									player.tokens.push({
										id: "lunatic-Demon",
										role: "lunatic",
										icon: demon.icon,
										type: "demon",
										label: demon.humanReadableRole,
										humanReadableRole: demon.humanReadableRole
									});
								}
								return player;
							})
						}
					}));
				});
			}}
                      >
                        Choose demon
                      </button>
                    `)}
                  ${when(lunatic && lunaticHasDemonAssigned, () => {
				return showPlayerRoleToken({ suspectedRole: {
					type: p?.meta?.demon?.type,
					icon: p?.meta?.demon?.icon,
					humanReadableRole: p?.meta?.demon?.humanReadableRole
				} });
			})}
                  ${when(!lunatic, () => showPlayerRoleToken(p))}
                  ${when(lilmonsta, () => {
				return b`
                      <button
                        ui-button
                        primary
                        @click=${() => {
					dialog.open({
						id: "roleSelect",
						parameters: {
							showNightOrder: true,
							allScriptRoles: true,
							filterFn: (r) => r?.type?.toLowerCase() === "minion"
						}
					}).then(([role]) => {
						state.setState((s) => ({
							...s,
							currentGame: {
								...s.currentGame,
								players: s.currentGame.players.map((player) => {
									if (p.id === player.id) {
										player.suspectedRole = role;
										if (!player.tokens.find((t) => t.id === "lilmonsta-Is The Demon")) player.tokens.push({
											id: "lilmonsta-Is The Demon",
											role: "lilmonsta",
											icon: "lilmonsta",
											type: "Demon",
											label: "Is The Demon",
											humanReadableRole: "Is The Demon"
										});
									}
									return player;
								})
							}
						}));
					});
				}}
                      >
                        Choose minion role for Lil Monsta
                      </button>
                    `;
			})}
                  ${when(gnome, () => {
				return assignTokenToPlayer("gnome-Amigo", "Choose an Amigo for the Gnome", game);
			})}
                  ${when(marionette, () => {
				return b`
                      <button
                        ui-button
                        primary
                        @click=${() => {
					dialog.open({
						id: "roleSelect",
						parameters: {
							showNightOrder: true,
							allScriptRoles: true,
							filterFn: (r) => ["townsfolk", "outsider"].includes(r?.type?.toLowerCase())
						}
					}).then(([role]) => {
						state.setState((s) => ({
							...s,
							currentGame: {
								...s.currentGame,
								players: s.currentGame.players.map((player) => {
									if (p.id === player.id) player.suspectedRole = role;
									return player;
								})
							}
						}));
					});
				}}
                      >
                        Choose role for the Marionette
                      </button>
                    `;
			})}
                  ${when(drunk, () => {
				return b`
                      <button
                        ui-button
                        primary
                        @click=${() => {
					dialog.open({
						id: "roleSelect",
						parameters: {
							showNightOrder: true,
							allScriptRoles: true
						}
					}).then(([role]) => {
						state.setState((s) => ({
							...s,
							currentGame: {
								...s.currentGame,
								players: s.currentGame.players.map((player) => {
									if (p.id === player.id) {
										player.suspectedRole = role;
										if (!player.tokens.find((t) => t.id === "drunk-Is The Drunk")) player.tokens.push({
											id: "drunk-Is The Drunk",
											role: "drunk",
											icon: "drunk",
											type: "Outsider",
											label: "Is The Drunk",
											humanReadableRole: "Drunk"
										});
									}
									return player;
								})
							}
						}));
					});
				}}
                      >
                        Choose role for the Drunk
                      </button>
                    `;
			})}
                </div>
                ${this.renderQuickActions(game, p)}
              </li>
            `;
		}))}
        ${this.nightOrder.map((item) => {
			switch (item.id) {
				case "dusk": return b`
                <li class="page">
                  <div class="special-icon">${moon}</div>
                  <h2 class="special-title">${item.name}</h2>
                  ${when(game.day > 0, () => b`
                      <p class="special-description">End of day ${game.day}.</p>
                    `)}
                  <p class="special-description">${item.firstNightReminder}</p>
                </li>
              `;
				case "dawn": {
					const nightDeaths = computeNightDeaths(game);
					return b`
                <li class="page">
                  <div class="special-icon">${sun}</div>
                  <h2 class="special-title">${item.name}</h2>
                  <p class="special-description">
                    Start of day ${game.day + 1}.
                  </p>
                  <p class="special-description">${item.firstNightReminder}</p>
                  ${when(nightDeaths.length > 0, () => b`
                      <p class="special-description">
                        <b
                          >${nightDeaths.length === 1 ? "1 player died" : `${nightDeaths.length} players died`}
                          this night:</b
                        >
                      </p>
                      <ul class="night-deaths">
                        ${nightDeaths.map((player) => b`<li>
                              <botc-player-details
                                .hideGrim=${!this.deadPlayerShowRoles}
                                nodimdead
                                .player=${player}
                              ></botc-player-details>
                            </li>`)}
                      </ul>
                      <botc-switch
                        @checked-changed=${({ checked }) => {
						this.deadPlayerShowRoles = checked;
					}}
                        ?checked=${this.deadPlayerShowRoles}
                        >Show Roles</botc-switch
                      >
                    `)}
                  <button
                    ?disabled=${this.dayIncremented}
                    ui-button
                    primary
                    @click=${() => {
						this.dayIncremented = true;
						if (this.scrollContainer) this.scrollContainer.scrollLeft = 0;
						state.setState((s) => ({
							...s,
							currentGame: {
								...s.currentGame,
								nightPhaseIndex: 0,
								day: s.currentGame.day + 1,
								players: s.currentGame.players.map((player) => {
									const excludedIds = [
										"lunatic-Chosen",
										"barber-Haircuts Tonight",
										"flowergirl-Demon Voted",
										"flowergirl-Demon Not Voted"
									];
									player.tokens = player.tokens.filter((t) => !excludedIds.includes(t.id));
									if (player.tokens.find((t) => t.id === "thief-Negative Vote")) player.tokens = player.tokens.filter((t) => t.id !== "thief-Negative Vote");
									if (player.tokens.find((t) => t.id === "acrobat-Dead")) {
										player.tokens = player.tokens.filter((t) => t.id !== "acrobat-Dead");
										player.tokens = player.tokens.filter((t) => t.id !== "acrobat-Chosen");
										player.dead = {
											day: s.currentGame.day,
											icon: "acrobat",
											id: "acrobat",
											type: "Townsfolk",
											humanReadableRole: "Acrobat",
											hasDeadVote: true
										};
									}
									if (player.tokens.find((t) => t.id === "bureaucrat-3 Votes")) player.tokens = player.tokens.filter((t) => t.id !== "bureaucrat-3 Votes");
									const gamblerDeadToken = player.tokens.find((t) => t.id === "gambler-Dead");
									if (gamblerDeadToken) {
										player.tokens = player.tokens.filter((t) => t.id !== "gambler-Dead");
										player.dead = {
											day: s.currentGame.day,
											icon: gamblerDeadToken.icon,
											id: gamblerDeadToken.id,
											type: gamblerDeadToken.type,
											humanReadableRole: gamblerDeadToken.humanReadableRole,
											hasDeadVote: true
										};
									}
									if (player.tokens.find((t) => t.id === "shabaloth-Alive")) {
										player.tokens = player.tokens.filter((t) => t.id !== "shabaloth-Alive");
										player.dead = null;
									}
									if (player.tokens.find((t) => t.id === "po-3 Attacks") && player.meta.day !== s.currentGame.day) player.tokens = player.tokens.filter((t) => t.id !== "po-3 Attacks");
									const gossipDeadToken = player.tokens.find((t) => t.id === "gossip-Dead");
									if (gossipDeadToken) {
										player.tokens = player.tokens.filter((t) => t.id !== "gossip-Dead");
										player.dead = {
											day: s.currentGame.day,
											icon: gossipDeadToken.icon,
											id: gossipDeadToken.icon,
											type: gossipDeadToken.type,
											humanReadableRole: gossipDeadToken.humanReadableRole,
											hasDeadVote: true
										};
									}
									const godfatherDeadToken = player.tokens.find((t) => t.id === "godfather-Dead");
									if (godfatherDeadToken) {
										player.tokens = player.tokens.filter((t) => t.id !== "godfather-Dead");
										player.dead = {
											day: s.currentGame.day,
											icon: godfatherDeadToken.icon,
											id: godfatherDeadToken.icon,
											type: godfatherDeadToken.type,
											humanReadableRole: godfatherDeadToken.humanReadableRole,
											hasDeadVote: true
										};
									}
									const tinkerDeadToken = player.tokens.find((t) => t.id === "tinker-Dead");
									if (tinkerDeadToken) {
										player.tokens = player.tokens.filter((t) => t.id !== "tinker-Dead");
										player.dead = {
											day: s.currentGame.day,
											icon: tinkerDeadToken.icon,
											id: tinkerDeadToken.icon,
											type: tinkerDeadToken.type,
											humanReadableRole: tinkerDeadToken.humanReadableRole,
											hasDeadVote: true
										};
									}
									const demonDeadToken = player.tokens.find((t) => t.type.toLowerCase() === "demon" && t.label.toLowerCase() === "dead");
									const assassinDeadToken = player.tokens.find((t) => t.id === "assassin-Dead");
									if (assassinDeadToken) {
										player.tokens = player.tokens.filter((t) => t.id !== "assassin-Dead");
										player.dead = {
											day: s.currentGame.day,
											icon: assassinDeadToken.icon,
											id: assassinDeadToken.icon,
											type: assassinDeadToken.type,
											humanReadableRole: assassinDeadToken.humanReadableRole,
											hasDeadVote: true
										};
									}
									const moonchildDeadToken = player.tokens.find((t) => t.id === "moonchild-Dead");
									if (moonchildDeadToken) {
										player.tokens = player.tokens.filter((t) => t.id !== "moonchild-Dead");
										player.dead = {
											day: s.currentGame.day,
											icon: moonchildDeadToken.icon,
											id: moonchildDeadToken.icon,
											type: moonchildDeadToken.type,
											humanReadableRole: moonchildDeadToken.humanReadableRole,
											hasDeadVote: true
										};
									}
									/**
									* @TODO
									* take into account protection
									* - fool without "No Ability" token (but also SET No Ability token then)
									*/
									if (demonDeadToken) {
										player.tokens = player.tokens.filter((t) => t.type.toLowerCase() !== "demon" || t.label.toLowerCase() !== "dead");
										if (isProtected(player)) {} else player.dead = {
											day: s.currentGame.day,
											icon: demonDeadToken.icon,
											id: demonDeadToken.icon,
											type: demonDeadToken.type,
											humanReadableRole: demonDeadToken.humanReadableRole,
											hasDeadVote: true
										};
									}
									return player;
								})
							}
						}));
						setTimeout(() => {
							router.navigate("/");
						});
					}}
                  >
                    End Night Phase
                  </button>
                </li>
              `;
				}
				case "minioninfo": if (minions.length) return b`
                  <li class="page">
                    <div class="for-st-reminder">
                      Show the minion${minions.length > 1 ? "s" : ""}
                      ${minions.map((minion) => capitalize(minion.name)).join(", ")}:
                    </div>
                    <div class="wrapper">
                      <h2 class="for-player demon-is">
                        The<br />demon<br />is:
                      </h2>
                      <div class="container">
                        <br /><br />
                        <h2 class="for-player demon-is">
                          ${capitalize(demon.name)}
                        </h2>
                      </div>
                    </div>
                    ${this.renderQuickActions(game, item)}
                  </li>
                `;
				else return b``;
				case "demon-lunaticinfo": return b`
                <li class="page">
                  <div class="for-st-reminder">
                    Show ${capitalize(demon.name)}, ${capitalize(lunatic.name)}
                    the lunatic.
                  </div>
                  <div class="wrapper">
                    <p class="center">${item.firstNightReminder}</p>
                    <button
                      ui-button
                      primary
                      @click=${() => {
					inlineDialog(() => b`
                            <h2 style="color: var(--ui-main-5);">
                              ${capitalize(lunatic.name)}
                            </h2>
                            ${showPlayerRoleToken(lunatic)}
                          `);
				}}
                    >
                      Show lunatic
                    </button>
                  </div>
                </li>
              `;
				case "demoninfo": return b` <li class="page">
                ${demonInfoPage(demon, minions)}
                ${this.renderQuickActions(game, item)}
              </li>`;
				case "lunatic-special": return b`
                <li class="page">
                  <p class="center">
                    <span class="balgruf">${capitalize(lunatic.name)}</span> is
                    the lunatic. ${item.firstNightReminder}
                  </p>
                  ${when(!lunatic?.meta?.demon, () => b`
                      <button
                        ui-button
                        primary
                        @click=${() => {
					dialog.open({
						id: "roleSelect",
						parameters: {
							allScriptRoles: true,
							text: `The actual demon is ${demon.suspectedRole.humanReadableRole}.`,
							filterFn: (r) => r.type?.toLowerCase() === "demon"
						}
					}).then(([demon]) => {
						state.setState((s) => ({
							...s,
							currentGame: {
								...s.currentGame,
								players: s.currentGame.players.map((p) => {
									if (p.id === lunatic.id) {
										if (!p.meta) p.meta = {};
										p.meta = {
											...p.meta,
											demon
										};
										p.tokens.push({
											id: "lunatic-Demon",
											role: "lunatic",
											icon: demon.icon,
											type: "demon",
											label: demon.humanReadableRole,
											humanReadableRole: demon.humanReadableRole
										});
									}
									return p;
								})
							}
						}));
					});
				}}
                      >
                        Select demon
                      </button>
                    `)}
                  ${when(!lunatic?.meta?.bluffs, () => b`
                      <button
                        ui-button
                        primary
                        @click=${() => {
					dialog.open({
						id: "roleSelect",
						parameters: {
							allScriptRoles: true,
							multiple: true,
							filterFn: (r) => r?.type?.toLowerCase() === "townsfolk" || r?.type?.toLowerCase() === "outsider"
						}
					}).then((bluffs) => {
						state.setState((s) => ({
							...s,
							currentGame: {
								...s.currentGame,
								players: s.currentGame.players.map((p) => {
									if (p.id === lunatic.id) {
										if (!p.meta) p.meta = {};
										p.meta = {
											...p.meta,
											bluffs
										};
									}
									return p;
								})
							}
						}));
					});
				}}
                      >
                        Select bluffs
                      </button>
                    `)}
                  ${when(!lunatic?.meta?.minions, () => b`
                      <button
                        ui-button
                        primary
                        @click=${() => {
					dialog.open({
						id: "playerSelect",
						parameters: {
							showNightOrder: true,
							multiple: true
						}
					}).then((minions) => {
						state.setState((s) => ({
							...s,
							currentGame: {
								...s.currentGame,
								players: s.currentGame.players.map((p) => {
									if (p.id === lunatic.id) {
										if (!p.meta) p.meta = {};
										p.meta = {
											...p.meta,
											minions
										};
									}
									if (minions.some((m) => m.id === p.id)) p.tokens.push({
										id: "lunatic-Minion",
										role: "lunatic",
										icon: "lunatic",
										type: "townsfolk",
										label: "Minion",
										humanReadableRole: p.suspectedRole.humanReadableRole
									});
									return p;
								})
							}
						}));
					});
				}}
                      >
                        Select minions
                      </button>
                    `)}
                </li>
              `;
				case "lunatic-demoninfo": return b`
                <li class="page">
                  ${demonInfoPage(lunatic, lunatic?.meta?.minions ?? [])}
                  ${this.renderQuickActions(game, item)}
                </li>
              `;
				case "lunatic-bluffs": return b`
                <li class="page">
                  ${demonBluffsPage(lunatic, lunatic?.meta?.bluffs ?? [])}
                  ${this.renderQuickActions(game, item)}
                </li>
              `;
				case "demonbluffs": if (demonBluffs.length) return b`
                  <li class="page">
                    ${demonBluffsPage(demon, demonBluffs)}
                    ${this.renderQuickActions(game, item)}
                  </li>
                `;
				else return b``;
				default:
					const typeSpecificAction = roleSpecificActions?.[item.suspectedRole?.type.toLowerCase()]?.({
						player: item,
						role: item.suspectedRole,
						game,
						nightOrder: this.nightOrder
					});
					return b`<li class="page">
                ${when(isVortoxGame, () => b`
                    <p class="for-st-reminder">
                      There is a Vortox in play, townsfolk abilities yield false
                      info.
                    </p>
                  `)}
                ${when(item.id === "lilmonsta", () => b`
                    <botc-player-details
                      ability
                      .player=${{
						name: "",
						tokens: [],
						claims: [],
						suspectedRole: item
					}}
                    ></botc-player-details>
                  `, () => {
						const preacher = item.tokens.some((t) => t.id.includes("No Ability") && item?.suspectedRole?.type?.toLowerCase() === "minion");
						const droisoned = isDroisoned(item);
						return b`
                      ${when((droisoned || preacher) && this.showProgress, () => {
							return b`
                            <div ui-error pulsing class="warning">
                              ${when(preacher, () => b`<b>${capitalize(item.name)}</b> has no ability!`)}
                              ${when(droisoned, () => b`<b>${capitalize(item.name)}</b> is drunk or poisoned!`)}
                            </div>
                          `;
						})}
                      <botc-player-details
                        ability
                        .player=${item}
                      ></botc-player-details>
                    `;
					})}
                <p class="special-description">
                  ${item.suspectedRole?.[reminder]}
                </p>
                ${when(!typeSpecificAction?.disabled && roleSpecificActions[item.suspectedRole?.id], () => b`
                    <div class="specific-action">
                      ${roleSpecificActions[item.suspectedRole.id]({
						player: item,
						role: item.suspectedRole,
						game,
						nightOrder: this.nightOrder
					})}
                    </div>
                  `)}
                ${item?.tokens?.map((token) => {
						return tokenSpecificActions[token.id]?.({
							token,
							role: item.suspectedRole,
							game,
							nightOrder: this.nightOrder,
							player: item
						});
					})}
                ${when(!!typeSpecificAction?.render, typeSpecificAction?.render)}
                ${this.renderQuickActions(game, item)}
              </li>`;
			}
		})}
      </ul>
    `;
	}
	renderQuickActions(game, item) {
		return b`
      <div class="quick-actions">
        <button
          ${tooltip("Show a card")}
          ${context(dialog, () => b`
              <botc-quick-actions-cards
                .game=${game}
                .player=${item}
              ></botc-quick-actions-cards>
            `)}
          ui-icon-button
        >
          ${cards}
        </button>
        <button
          ${tooltip("Player actions")}
          ${context(dialog, () => b`
              <botc-quick-actions-add
                .game=${game}
                .player=${item}
              ></botc-quick-actions-add>
            `)}
          ui-icon-button
        >
          ${edit}
        </button>
        <button
          class="grim"
          ${tooltip("Open grim")}
          @click=${() => {
			dialog.open({ id: "grim" });
		}}
          ui-icon-button
        >
          ${grim}
        </button>
        ${when(!!item?.suspectedRole?.id && !!window?.originalRoles?.[item.suspectedRole.id], () => b`
            <button
              class="grim"
              ${tooltip("Role info")}
              @click=${() => {
			dialog.open({
				id: "moreRoleInfo",
				parameters: {
					id: item.suspectedRole.id,
					humanReadableRole: item.suspectedRole.humanReadableRole
				}
			});
		}}
              ui-icon-button
            >
              ${info}
            </button>
          `)}
        <button
          class="show-progress"
          ${tooltip(`${this.showProgress ? "Hide" : "Show"} progress bar`)}
          ui-icon-button
          @click=${() => {
			this.showProgress = !this.showProgress;
		}}
        >
          ${this.showProgress ? eyeHide : eyeShow}
        </button>
      </div>
    `;
	}
};
var BotcQuickActionsCards = class extends i {
	static properties = {
		game: { type: Object },
		player: { type: Object }
	};
	static styles = [button, i$1`
      .custom-scripts button[ui-button] {
        display: flex;
        justify-content: center;
        align-items: center;
      }

      .custom-scripts button[ui-button] svg {
        fill: var(--ui-main-5);
      }

      .custom-scripts button[ui-button] span {
        flex: 1;
        margin-left: -24px;
      }
    `];
	async openDialog(id, parameters) {
		dialog.close();
		await dialog.closed;
		await new Promise((r) => requestAnimationFrame(r));
		return dialog.open({
			id,
			parameters: {
				...parameters,
				player: this.player
			}
		});
	}
	constructor() {
		super();
		this.game = {};
		this.player = {};
	}
	render() {
		return b`
      <div class="custom-scripts">
        <button
          @click=${() => this.openDialog("roleSelect", {
			appendRoles: APPENDED_ROLES,
			selected: [this.player.suspectedRole],
			allScriptRoles: true,
			filterFn: (r) => r.type?.toLowerCase() !== "traveller"
		}).then(([role]) => {
			showPlayer({
				title: "You are",
				role
			});
		})}
          ui-button
          secondary
        >
          ${cards} <span>You are</span>
        </button>
        <button
          @click=${() => this.openDialog("roleSelect", {
			allScriptRoles: true,
			appendRoles: APPENDED_ROLES,
			filterFn: (r) => r.type?.toLowerCase() !== "traveller"
		}).then(([role]) => {
			showPlayer({ role });
		})}
          ui-button
          secondary
        >
          ${cards} <span>Show a role token</span>
        </button>
        <button
          @click=${() => {
			this.openDialog("playerSelect", { showNightOrder: true }).then(([player]) => {
				if (!player) return;
				this.openDialog("roleSelect", { allScriptRoles: true }).then(([role]) => {
					showPlayer({
						title: `${capitalize(player.name)} is:`,
						role
					});
				});
			});
		}}
          ui-button
          secondary
        >
          ${cards} <span>This player is</span>
        </button>
        <button
          @click=${() => this.openDialog("roleSelect", {
			allScriptRoles: true,
			filterFn: (r) => r.type?.toLowerCase() !== "traveller"
		}).then(([role]) => {
			showPlayer({
				title: "You are mad that you are:",
				role
			});
		})}
          ui-button
          secondary
        >
          ${cards} <span>You are mad</span>
        </button>
        <button
          @click=${() => this.openDialog("playerSelect", { multiple: true }).then((players) => {
			const names = players.map((p) => capitalize(p.name));
			this.openDialog("inline", { render: () => b`
                  <style>
                    ${balgruf} h2 {
                      font-size: 5rem;
                      line-height: 0.9;
                    }

                    .card {
                      display: flex;
                      flex: 1;
                      height: calc(100% - 40px);
                      justify-content: center;
                      align-items: center;
                    }
                  </style>
                  <div class="card">
                    <h2>${names.join(", ")}</h2>
                  </div>
                ` });
		})}
          ui-button
          secondary
        >
          ${cards} <span>Show player</span>
        </button>
        <button
          @click=${() => this.openDialog("inline", { render: () => b`
                <style>
                  ${balgruf} h2 {
                    font-size: 5rem;
                    line-height: 0.9;
                  }

                  .card {
                    display: flex;
                    flex: 1;
                    height: calc(100% - 40px);
                    justify-content: center;
                    align-items: center;
                  }
                </style>
                <div class="card">
                  <h2>Did<br />you<br />nominate?</h2>
                </div>
              ` })}
          ui-button
          secondary
        >
          ${cards} <span>Did you nominate?</span>
        </button>
        <button
          @click=${() => this.openDialog("inline", { render: () => b`
                <style>
                  ${balgruf} h2 {
                    font-size: 5rem;
                    line-height: 0.9;
                  }

                  .card {
                    display: flex;
                    flex: 1;
                    height: calc(100% - 40px);
                    justify-content: center;
                    align-items: center;
                  }
                </style>
                <div class="card">
                  <h2>Did<br />you<br />vote?</h2>
                </div>
              ` })}
          ui-button
          secondary
        >
          ${cards} <span>Did you vote?</span>
        </button>
        <button
          @click=${() => this.openDialog("customText").then((text) => {
			inlineDialog(() => b`
                  <style>
                    ${balgruf} h2 {
                      font-size: 3.75rem;
                      margin: 0;
                      hyphens: auto;
                    }

                    .card {
                      height: calc(100% - 40px);
                      display: flex;
                      justify-content: center;
                      align-items: center;
                    }
                  </style>
                  <div class="card">
                    <h2>${text}</h2>
                  </div>
                `);
		})}
          ui-button
          secondary
        >
          ${cards} <span>Custom text</span>
        </button>
      </div>
    `;
	}
};
customElements.define("botc-quick-actions-cards", BotcQuickActionsCards);
var BotcQuickActionsAdd = class extends i {
	static properties = {
		game: { type: Object },
		player: { type: Object }
	};
	static styles = [button, i$1`
      .custom-scripts button[ui-button] {
        display: flex;
        justify-content: center;
        align-items: center;
      }

      .custom-scripts button[ui-button] svg {
        fill: var(--ui-main-5);
      }

      .custom-scripts button[ui-button] span {
        flex: 1;
      }
    `];
	async openDialog(id, parameters) {
		dialog.close();
		await dialog.closed;
		await new Promise((r) => requestAnimationFrame(r));
		return dialog.open({
			id,
			parameters: {
				...parameters,
				player: this.player
			}
		});
	}
	constructor() {
		super();
		this.game = {};
		this.player = {};
	}
	render() {
		return b`
      <div class="custom-scripts">
        <button ui-button primary @click=${() => this.openDialog("killedBy")}>
          <span>Kill</span>
        </button>
        <button ui-button primary @click=${() => this.openDialog("setRole")}>
          <span>Change role</span>
        </button>
        <button ui-button primary @click=${() => this.openDialog("addToken")}>
          <span>Reminders</span>
        </button>
        <button
          ui-button
          primary
          @click=${() => this.openDialog("inline", {
			header: "Player notes",
			render: () => b`
                <label ui-label>
                  <textarea
                    .value=${this.player.notes || ""}
                    rows="5"
                    @input=${(e) => {
				state.setState((s) => {
					const player = s.currentGame.players.find((p) => p.id === this.player.id);
					if (!player) return s;
					player.notes = e.target.value;
					return {
						...s,
						currentGame: {
							...s.currentGame,
							players: s.currentGame.players.map((p) => p.id === player.id ? player : p)
						}
					};
				});
			}}
                    name="name"
                    ui-input
                    type="text"
                  ></textarea>
                  <span>Notes</span>
                </label>
              `
		})}
        >
          <span>Edit player notes</span>
        </button>
      </div>
    `;
	}
};
customElements.define("botc-quick-actions-add", BotcQuickActionsAdd);
var BotcViBtns = class extends i {
	static styles = [button];
	async openDialog(good) {
		dialog.close();
		await dialog.closed;
		await new Promise((r) => requestAnimationFrame(r));
		this.fn(good);
	}
	render() {
		return b`
      <button ui-button primary @click=${() => this.openDialog(true)}>
        <span>Good</span>
      </button>
      <button ui-button primary @click=${() => this.openDialog(false)}>
        <span>Evil</span>
      </button>
    `;
	}
};
customElements.define("botc-vi-btns", BotcViBtns);
function demonInfoPage(demon = { name: "" }, minions) {
	return b`
    <div class="for-st-reminder">
      Show ${capitalize(demon.name)}, the demon:
    </div>
    <div class="wrapper">
      <h2 class="for-player demon-is">
        Your<br />minion${minions?.length > 1 ? "s" : ""}<br />
        ${minions?.length > 1 ? "are" : "is"}:
      </h2>
      <br /><br />
      <h2 class="for-player demon-is">
        ${minions?.map((minion) => capitalize(minion.name)).join(", ")}
      </h2>
    </div>
  `;
}
function demonBluffsPage(demon = { name: "" }, demonBluffs) {
	return b`
    <div class="for-st-reminder">
      Show ${capitalize(demon.name)}, the demon:
    </div>
    <div class="wrapper">
      <h2 class="for-player">These roles are not in play:</h2>
      <br />
      <ul class="bluff-list">
        ${demonBluffs?.map((bluff) => {
		return b`
            <li class="bluff">
              <img alt="${bluff.humanReadableRole}" src="${img(bluff)}" />
              <h2>${bluff.humanReadableRole}</h2>
            </li>
          `;
	})}
      </ul>
    </div>
  `;
}
customElements.define("botc-night-phase", BotcNightPhase);
//#endregion
export { showPlayer as n, BotcNightPhase as t };
