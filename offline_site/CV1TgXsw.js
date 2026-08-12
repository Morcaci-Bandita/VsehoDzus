import { I as images, T as nightOrder, d as alignment, m as capitalize } from "./CP0hEE1l.js";
import { z as deadVote } from "./CEyrKUT7.js";
//#region src/render-game-as-svg.js
const CONFIG = {
	radiusPercent: .4,
	minRadius: 100,
	maxRadius: 280,
	tokenSize: 70,
	startAngle: -90,
	clockwise: true
}, SVG_WIDTH = 600, SVG_HEIGHT = 820, CIRCLE_CENTER_X = SVG_WIDTH / 2;
const COLORS = {
	main4: "#fcc050",
	main5: "#fcb93c",
	bg2: "#b6b8bd",
	bg3: "rgb(98, 100, 104)",
	bg4: "rgb(77, 79, 84)",
	bg7: "rgb(38, 40, 44)",
	bg8: "#2b2d31",
	bg9: "#161618",
	border: "rgb(109, 110, 117)",
	neutral: "rgb(255, 255, 255)",
	blue: "#45a0f1",
	red: "#d9403b",
	yellow: "#ffee00",
	green: "#a7e16c"
};
const svgCache = {};
const imageBase64Cache = {};
let balgrufFontBase64 = null;
function extractSvgFromLitTemplate(litTemplate) {
	if (!litTemplate) return "";
	if (litTemplate.strings) return litTemplate.strings.join("");
	if (typeof litTemplate === "string") return litTemplate;
	return "";
}
const ICONS = { deadVote: extractSvgFromLitTemplate(deadVote) };
async function fetchImageAsBase64(path) {
	if (!path) return null;
	if (imageBase64Cache[path]) return imageBase64Cache[path];
	try {
		const response = await fetch(path);
		if (!response.ok) throw new Error(`Failed to fetch ${path}`);
		const blob = await response.blob();
		return new Promise((resolve, reject) => {
			const reader = new FileReader();
			reader.onloadend = () => {
				imageBase64Cache[path] = reader.result;
				resolve(reader.result);
			};
			reader.onerror = reject;
			reader.readAsDataURL(blob);
		});
	} catch (err) {
		console.warn(`Could not fetch image as base64 for ${path}:`, err);
		return null;
	}
}
async function loadFontAsBase64() {
	if (balgrufFontBase64) return balgrufFontBase64;
	try {
		const response = await fetch("assets/fonts/balgruf.woff");
		if (!response.ok) return null;
		const blob = await response.blob();
		return new Promise((resolve, reject) => {
			const reader = new FileReader();
			reader.onloadend = () => {
				balgrufFontBase64 = reader.result;
				resolve(reader.result);
			};
			reader.onerror = reject;
			reader.readAsDataURL(blob);
		});
	} catch (err) {
		console.warn("Could not load Balgruf font:", err);
		return null;
	}
}
async function fetchSvgString(iconId) {
	if (!iconId) return null;
	if (svgCache[iconId]) return svgCache[iconId];
	const path = images.any(iconId, void 0, false);
	if (!path.endsWith(".svg")) return null;
	try {
		const response = await fetch(path);
		if (!response.ok) throw new Error(`Failed to fetch ${path}`);
		const svgText = await response.text();
		svgCache[iconId] = svgText;
		return svgText;
	} catch (err) {
		console.warn(`Could not fetch SVG for ${iconId}:`, err);
		return null;
	}
}
function getRoleSvg(role) {
	if (!role) return null;
	if (role.icon && svgCache[role.icon]) return svgCache[role.icon];
	return null;
}
function getRoleTypeColor(type) {
	const t = type?.toLowerCase();
	if (t === "fabled") return COLORS.yellow;
	if (t === "loric") return COLORS.green;
	return COLORS.yellow;
}
function collectIconIds(game) {
	const iconIds = /* @__PURE__ */ new Set();
	for (const player of game.players || []) {
		if (player.suspectedRole?.icon) iconIds.add(player.suspectedRole.icon);
		if (player.dead?.icon) iconIds.add(player.dead.icon);
		for (const token of player.tokens || []) if (token.icon) iconIds.add(token.icon);
	}
	for (const bluff of game.demonBluffs || []) if (bluff.icon) iconIds.add(bluff.icon);
	for (const reminder of game.globalReminders || []) if (reminder.icon) iconIds.add(reminder.icon);
	return iconIds;
}
async function preloadSvgs(game) {
	const iconIds = collectIconIds(game);
	await Promise.all(Array.from(iconIds).map(async (id) => {
		const path = images.any(id, void 0, false);
		if (!path) return;
		if (path.endsWith(".svg")) await fetchSvgString(id);
		else await fetchImageAsBase64(path);
	}));
	await loadFontAsBase64();
}
function transformSvgForToken(svgString, size, options = {}) {
	if (!svgString) return "";
	const { isDead = false, x = 0, y = 0, padding = 5 } = options;
	const svgElement = new DOMParser().parseFromString(svgString, "image/svg+xml").querySelector("svg");
	if (!svgElement) return "";
	let viewBox = svgElement.getAttribute("viewBox");
	if (!viewBox) {
		const w = svgElement.getAttribute("width") || "400";
		const h = svgElement.getAttribute("height") || "400";
		viewBox = `0 0 ${parseFloat(w)} ${parseFloat(h)}`;
	}
	const innerContent = svgElement.innerHTML;
	return `
    <svg x="${x + padding}" y="${y + padding}" width="${size - padding * 2}" height="${size - padding * 2}" 
         viewBox="${viewBox}" preserveAspectRatio="xMidYMid meet"
         ${isDead ? "filter=\"url(#grayscale)\"" : ""}>
      ${innerContent}
    </svg>`;
}
function transformIconSvg(svgString, size, x, y, fillColor = null) {
	if (!svgString) return "";
	const svgElement = new DOMParser().parseFromString(svgString, "image/svg+xml").querySelector("svg");
	if (!svgElement) return "";
	let viewBox = svgElement.getAttribute("viewBox");
	if (!viewBox) {
		const w = svgElement.getAttribute("width") || "24";
		const h = svgElement.getAttribute("height") || "24";
		viewBox = `0 0 ${parseFloat(w)} ${parseFloat(h)}`;
	}
	const innerContent = svgElement.innerHTML;
	return `
    <svg x="${x}" y="${y}" width="${size}" height="${size}" 
         viewBox="${viewBox}" preserveAspectRatio="xMidYMid meet"
         ${fillColor ? `fill="${fillColor}"` : ""}>
      ${innerContent}
    </svg>`;
}
function getAlignmentColorFromString(alignmentStr) {
	if (!alignmentStr) return COLORS.bg9;
	if (alignmentStr === "blue") return COLORS.blue;
	if (alignmentStr === "red") return COLORS.red;
	if (alignmentStr === "yellow") return COLORS.yellow;
	return COLORS.bg9;
}
const escapeXml = (str) => str ? str.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;") : "";
function wrapText(text, maxCharsPerLine) {
	if (!text) return [];
	const words = text.split(" ");
	const lines = [];
	let currentLine = "";
	for (const word of words) {
		const testLine = currentLine ? `${currentLine} ${word}` : word;
		if (testLine.length <= maxCharsPerLine) currentLine = testLine;
		else {
			if (currentLine) lines.push(currentLine);
			currentLine = word;
		}
	}
	if (currentLine) lines.push(currentLine);
	return lines;
}
function calculateCirclePosition(index, total, centerY) {
	let radius = Math.max(CONFIG.minRadius, Math.min(CONFIG.maxRadius, SVG_WIDTH * CONFIG.radiusPercent));
	const angle = CONFIG.startAngle * Math.PI / 180 + (CONFIG.clockwise ? 1 : -1) * index * (2 * Math.PI / total);
	return {
		x: CIRCLE_CENTER_X + Math.cos(angle) * radius,
		y: centerY + Math.sin(angle) * radius
	};
}
function generateGlobalRemindersSvg(globalReminders, centerX, startY) {
	if (!globalReminders || globalReminders.length === 0) return {
		svg: "",
		height: 0
	};
	const paddingX = 16;
	const paddingY = 16;
	const iconSize = 36;
	const lineHeight = 14;
	const maxCharsPerLine = 65;
	const borderWidth = 1;
	const boxWidth = SVG_WIDTH - 40;
	const boxX = (SVG_WIDTH - boxWidth) / 2;
	const reminderHeights = globalReminders.map((reminder) => {
		const summaryLines = wrapText(reminder.summary || "", maxCharsPerLine);
		const titleHeight = 20;
		const summaryHeight = summaryLines.length * lineHeight;
		return {
			lines: summaryLines,
			totalHeight: Math.max(iconSize, titleHeight + summaryHeight + 4)
		};
	});
	const rowGap = 12;
	const totalBoxHeight = reminderHeights.reduce((sum, r) => sum + r.totalHeight, 0) + (globalReminders.length - 1) * rowGap + paddingY * 2;
	let svg = "";
	svg += `<rect x="${boxX}" y="${startY}" width="${boxWidth}" height="${totalBoxHeight}" rx="8" 
          fill="${COLORS.bg7}" stroke="${COLORS.bg9}" stroke-width="${borderWidth}"/>`;
	let currentRowY = startY + paddingY;
	globalReminders.forEach((reminder, i) => {
		const { lines, totalHeight } = reminderHeights[i];
		const color = getRoleTypeColor(reminder.type);
		const iconY = currentRowY;
		const iconCenterX = 54;
		const iconCenterY = iconY + iconSize / 2;
		svg += `<circle cx="${iconCenterX}" cy="${iconCenterY}" r="${iconSize / 2}" 
            fill="${COLORS.bg8}" stroke="${color}" stroke-width="2"/>`;
		const clipId = `clip-reminder-${i}-${Math.random().toString(36).substr(2, 9)}`;
		svg += `<defs><clipPath id="${clipId}"><circle cx="${iconCenterX}" cy="${iconCenterY}" r="${iconSize / 2 - 2}"/></clipPath></defs>`;
		const iconPath = images.any(reminder.icon, void 0, false);
		if (iconPath) if (iconPath.endsWith(".svg") && svgCache[reminder.icon]) {
			const innerSize = iconSize - 8;
			svg += `<g clip-path="url(#${clipId})">`;
			svg += transformSvgForToken(svgCache[reminder.icon], innerSize, {
				x: iconCenterX - innerSize / 2,
				y: iconCenterY - innerSize / 2,
				padding: 0
			});
			svg += `</g>`;
		} else {
			const imgSrc = imageBase64Cache[iconPath] || iconPath;
			svg += `<image clip-path="url(#${clipId})" href="${imgSrc}" x="40" y="${iconY + 4}" width="${iconSize - 8}" height="${iconSize - 8}" preserveAspectRatio="xMidYMid meet"/>`;
		}
		const textX = 86;
		const titleY = currentRowY + 16;
		svg += `<text x="${textX}" y="${titleY}" font-family="Balgruf, Georgia, serif" font-size="16" fill="${color}" filter="url(#textShadow)">${escapeXml(reminder.humanReadableRole)}</text>`;
		lines.forEach((line, lineIndex) => {
			const lineY = titleY + 6 + (lineIndex + 1) * lineHeight;
			svg += `<text x="${textX}" y="${lineY}" font-family="Poppins, sans-serif" font-size="11" fill="${COLORS.neutral}">${escapeXml(line)}</text>`;
		});
		if (i < globalReminders.length - 1) {
			const lineY = currentRowY + totalHeight + rowGap / 2;
			svg += `<line x1="36" y1="${lineY}" x2="${580 - paddingX}" y2="${lineY}" stroke="${COLORS.border}" stroke-width="1"/>`;
		}
		currentRowY += totalHeight + rowGap;
	});
	return {
		svg,
		height: totalBoxHeight + 20
	};
}
function generateSmallRoleToken(role, x, y, size, options = {}) {
	const { borderColor = COLORS.border } = options;
	const half = size / 2;
	const iconSvg = transformSvgForToken(getRoleSvg(role), size, {
		x: 0,
		y: 0,
		padding: 4
	});
	let svg = `<g transform="translate(${x - half}, ${y - half})">
    <circle cx="${half}" cy="${half}" r="${half - 1}" fill="${COLORS.bg8}" stroke="${borderColor}" stroke-width="2" filter="url(#tokenShadow)"/>
    ${iconSvg}`;
	if (role.humanReadableRole) {
		const rolePathId = `bluff-role-arc-${role.id}-${Math.random().toString(36).substr(2, 9)}`;
		svg += `
    <svg x="0" y="0" width="${size}" height="${size}" viewBox="0 0 100 100" overflow="visible">
      <defs>
        <path id="${rolePathId}" d="M 8,48 A 42 42 0 0 0 92,48"/>
      </defs>
      <text font-size="10" fill="white" font-family="Poppins, sans-serif" font-weight="500" letter-spacing="0.3" filter="url(#roleTextShadow)">
        <textPath href="#${rolePathId}" startOffset="50%" text-anchor="middle">${escapeXml(role.humanReadableRole)}</textPath>
      </text>
    </svg>`;
	}
	svg += `</g>`;
	return svg;
}
function generateDemonBluffsSvg(demonBluffs, centerX, startY) {
	if (!demonBluffs || demonBluffs.length === 0) return {
		svg: "",
		height: 0
	};
	const tokenSize = 50;
	const tokenGap = 15;
	const headingHeight = 30;
	const startX = centerX - (demonBluffs.length * tokenSize + (demonBluffs.length - 1) * tokenGap) / 2 + tokenSize / 2;
	let svg = "";
	svg += `<text x="${centerX}" y="${startY + 20}" text-anchor="middle" font-family="Balgruf, Georgia, serif" font-size="18" fill="${COLORS.main4}" filter="url(#textShadow)">Demon Bluffs</text>`;
	const tokensY = startY + headingHeight + tokenSize / 2 + 5;
	demonBluffs.forEach((bluff, i) => {
		const tokenX = startX + i * 65;
		svg += generateSmallRoleToken(bluff, tokenX, tokensY, tokenSize, { borderColor: COLORS.blue });
	});
	return {
		svg,
		height: 105
	};
}
function generatePlayerSvg(player, position, gameState, options = {}) {
	const { x, y } = position;
	const { hideGrim = false, showRole = true, nightOrderData = null } = options;
	const size = CONFIG.tokenSize, half = size / 2;
	const playerAlignment = !hideGrim ? alignment(player) : null;
	const color = getAlignmentColorFromString(playerAlignment);
	const isDead = !!player.dead;
	let borderColor = COLORS.bg4;
	if (!hideGrim && playerAlignment) borderColor = color;
	if (isDead && !hideGrim) borderColor = COLORS.bg3;
	let iconSvg = "";
	if (!hideGrim) if (player.me) {
		if (showRole) iconSvg = transformSvgForToken(getRoleSvg(player.suspectedRole), size, { isDead });
	} else iconSvg = transformSvgForToken(getRoleSvg(player.suspectedRole), size, { isDead });
	const name = capitalize(player.name);
	const displayName = name.length > 10 ? name.substring(0, 9) + "…" : name;
	const role = player.suspectedRole?.humanReadableRole || "";
	const nightOrderNr = nightOrderData ? nightOrder(player, nightOrderData) : null;
	const rolePathId = `role-arc-${player.id}`;
	let svg = `<g transform="translate(${x - half}, ${y - half})">
    <circle cx="${half}" cy="${half}" r="${half - 2}" fill="${COLORS.bg8}" stroke="${borderColor}" stroke-width="2" filter="url(#tokenShadow)"/>
    ${iconSvg}
    
    <!-- Curved role label at bottom of token -->
    ${!hideGrim && role ? `
    <svg x="0" y="0" width="${size}" height="${size}" viewBox="0 0 100 100" overflow="visible">
      <defs>
        <path id="${rolePathId}" d="M 8,48 A 42 42 0 0 0 92,48"/>
      </defs>
      <text font-size="11" fill="white" font-family="Poppins, sans-serif" font-weight="500" letter-spacing="0.5" filter="url(#roleTextShadow)">
        <textPath href="#${rolePathId}" startOffset="50%" text-anchor="middle">${escapeXml(role)}</textPath>
      </text>
    </svg>` : ""}`;
	if (player.dead) {
		const deathType = player.dead.type?.toLowerCase();
		let shroudColor = COLORS.border;
		if (deathType === "townsfolk" || deathType === "outsider") shroudColor = COLORS.blue;
		else if (deathType === "minion" || deathType === "demon") shroudColor = COLORS.red;
		else if (deathType === "fabled" || deathType === "traveller") shroudColor = COLORS.yellow;
		const shroudIconId = hideGrim ? "dead" : player.dead.icon;
		const shroudSize = 25;
		const shroudCenterX = half;
		const shroudCenterY = 4.5;
		const shroudPath = images.any(shroudIconId, void 0, false);
		const isSvg = shroudPath && shroudPath.endsWith(".svg");
		svg += `<circle cx="${shroudCenterX}" cy="${shroudCenterY}" r="${shroudSize / 2}" fill="${COLORS.bg8}" stroke="${shroudColor}" stroke-width="1" filter="url(#shroudShadow)"/>`;
		if (isSvg && svgCache[shroudIconId]) {
			const shroudSvg = transformSvgForToken(svgCache[shroudIconId], shroudSize - 4, {
				x: shroudCenterX - (shroudSize - 4) / 2,
				y: shroudCenterY - (shroudSize - 4) / 2,
				padding: 0
			});
			svg += shroudSvg;
		} else if (shroudPath) {
			const imgSrc = imageBase64Cache[shroudPath] || shroudPath;
			svg += `<image href="${imgSrc}" x="${shroudCenterX - (shroudSize - 6) / 2}" y="${shroudCenterY - (shroudSize - 6) / 2}" width="${shroudSize - 6}" height="${shroudSize - 6}" preserveAspectRatio="xMidYMid meet"/>`;
		}
	}
	if (player.dead?.hasDeadVote) {
		const dvSize = 14;
		const dvCenterX = -1;
		const dvCenterY = half;
		const deadVoteSvg = transformIconSvg(ICONS.deadVote, 10, dvCenterX - 5, dvCenterY - 5, COLORS.neutral);
		svg += `<circle cx="${dvCenterX}" cy="${dvCenterY}" r="${dvSize / 2}" fill="${COLORS.bg8}" stroke="${COLORS.bg9}" stroke-width="2"/>
      ${deadVoteSvg || `<text x="${dvCenterX}" y="${dvCenterY + 3}" text-anchor="middle" font-size="7" fill="${COLORS.neutral}">✋</text>`}`;
	}
	if (!hideGrim && nightOrderNr) {
		const noSize = 14;
		const noCenterY = size + 12 - noSize / 2 + noSize / 2;
		const displayNr = player.me && !hideGrim ? "?" : nightOrderNr;
		svg += `<circle cx="${half}" cy="${noCenterY}" r="${noSize / 2}" fill="${COLORS.bg8}" stroke="${COLORS.bg9}" stroke-width="2"/>
      <text x="${half}" y="${noCenterY + 3}" text-anchor="middle" font-size="8" font-family="Poppins, sans-serif" fill="${COLORS.neutral}">${displayNr}</text>`;
	}
	if (!hideGrim && player.tokens?.length) {
		const tokenSize = 25;
		const tokenGap = 4;
		const tokensStartX = size - 6;
		const tokensStartY = half - (player.tokens.length * tokenSize + (player.tokens.length - 1) * tokenGap) / 2;
		player.tokens.forEach((token, i) => {
			const tokenY = tokensStartY + i * 29;
			const tokenCenterX = tokensStartX + tokenSize / 2;
			const tokenCenterY = tokenY + tokenSize / 2;
			const tokenType = token.type?.toLowerCase();
			let tokenColor = COLORS.border;
			if (tokenType === "townsfolk" || tokenType === "outsider") tokenColor = COLORS.blue;
			else if (tokenType === "minion" || tokenType === "demon") tokenColor = COLORS.red;
			else if (tokenType === "fabled" || tokenType === "traveller") tokenColor = COLORS.yellow;
			const tokenSvg = transformSvgForToken(svgCache[token.icon], tokenSize - 4, {
				x: tokenCenterX - (tokenSize - 4) / 2,
				y: tokenCenterY - (tokenSize - 4) / 2,
				padding: 0
			});
			const pathId = `token-arc-${player.id}-${i}`;
			svg += `<circle cx="${tokenCenterX}" cy="${tokenCenterY}" r="${tokenSize / 2}" fill="${COLORS.bg8}" stroke="${tokenColor}" stroke-width="1" filter="url(#tokenShadow)"/>
        ${tokenSvg}
        <svg x="${tokensStartX}" y="${tokenY}" width="${tokenSize}" height="${tokenSize}" viewBox="0 0 20 20" overflow="visible">
          <defs>
            <path id="${pathId}" d="M 2,10 A 5 5 0 0 0 18,10"/>
          </defs>
          <text font-size="3.5" fill="white" font-family="Poppins, sans-serif" font-weight="500">
            <textPath href="#${pathId}" startOffset="50%" text-anchor="middle">${escapeXml(token.label)}</textPath>
          </text>
        </svg>`;
		});
	}
	svg += `</g>`;
	const labelY = y + half + 4;
	let labelTextColor = COLORS.main4;
	if (isDead) labelTextColor = COLORS.bg2;
	else if (!hideGrim && playerAlignment) labelTextColor = color;
	const labelBorderColor = COLORS.bg9;
	const isConfirmed = !hideGrim && player.confirmed;
	const labelHeight = 20;
	const labelWidth = 70;
	svg += `<g>
    <rect x="${x - labelWidth / 2}" y="${labelY}" width="${labelWidth}" height="${labelHeight}" rx="4" 
          fill="${COLORS.bg7}" stroke="${labelBorderColor}" stroke-width="1" 
          ${isConfirmed ? "stroke-dasharray=\"4,2\"" : ""}/>
    <text x="${x}" y="${labelY + 14}" text-anchor="middle" font-family="Balgruf, Georgia, serif" font-size="12" fill="${labelTextColor}" filter="url(#textShadow)">${escapeXml(displayName)}</text>
  </g>`;
	return svg;
}
function generateGameSvg(game, options = {}) {
	const { hideGrim = false, showRole = true } = options;
	const players = game.players || [];
	const aliveCount = players.filter((p) => !p.dead && p?.suspectedRole?.type?.toLowerCase() !== "traveller").length;
	let aliveDisplay = `${aliveCount} alive`;
	let aliveColor = COLORS.main4;
	if (game.state === "in-progress") {
		if (aliveCount === 4) {
			aliveDisplay = "Final 4!";
			aliveColor = "#ea9eb1";
		} else if (aliveCount === 3) {
			aliveDisplay = "Final 3!";
			aliveColor = "#ea9eb1";
		}
	}
	const dayNumber = Number(game.day || 0) + (game.stMode ? 0 : 1);
	let resultText = "";
	if (game.result) if (game.stMode) resultText = capitalize(game.result || "") + " win";
	else {
		const playerType = players.find((p) => p.me)?.suspectedRole?.type?.toLowerCase();
		const isGood = playerType === "townsfolk" || playerType === "outsider";
		const isEvil = playerType === "minion" || playerType === "demon";
		let winningAlignment = "";
		if (game.result === "win") winningAlignment = isGood ? "Good" : isEvil ? "Evil" : "";
		else if (game.result === "loss") winningAlignment = isGood ? "Evil" : isEvil ? "Good" : "";
		resultText = winningAlignment ? `${winningAlignment} win` : capitalize(game.result || "");
	}
	let headerEndY = resultText ? 80 : 55;
	const hasGlobalReminders = !hideGrim && game.globalReminders && game.globalReminders.length > 0;
	const hasDemonBluffs = !hideGrim && game.demonBluffs && game.demonBluffs.length > 0;
	let globalRemindersHeight = 0;
	if (hasGlobalReminders) {
		const lineHeight = 14;
		const maxCharsPerLine = 65;
		const paddingY = 16;
		const rowGap = 12;
		let contentHeight = 0;
		game.globalReminders.forEach((reminder, i) => {
			const summaryLines = wrapText(reminder.summary || "", maxCharsPerLine);
			const titleHeight = 20;
			const summaryHeight = summaryLines.length * lineHeight;
			const rowHeight = Math.max(36, titleHeight + summaryHeight + 4);
			contentHeight += rowHeight;
			if (i < game.globalReminders.length - 1) contentHeight += rowGap;
		});
		globalRemindersHeight = contentHeight + paddingY * 2 + 20;
	}
	let demonBluffsHeight = 0;
	if (hasDemonBluffs) demonBluffsHeight = 105;
	const circleTopMargin = 30;
	const circleBottomMargin = 110;
	const circleRadius = Math.max(CONFIG.minRadius, Math.min(CONFIG.maxRadius, SVG_WIDTH * CONFIG.radiusPercent));
	const circleCenterY = headerEndY + globalRemindersHeight + circleTopMargin + circleRadius + 50;
	const svgHeight = circleCenterY + circleRadius + circleBottomMargin + demonBluffsHeight + 30;
	let svg = `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="${SVG_WIDTH}" height="${svgHeight}">
    <defs>
      <style>
        @import url('https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,300;0,500;1,300&amp;display=swap');
        ${balgrufFontBase64 ? `
        @font-face {
          font-family: 'Balgruf';
          src: url('${balgrufFontBase64}') format('woff');
          font-weight: 600;
          font-style: normal;
        }
        ` : ""}
      </style>
      
      <filter id="grayscale">
        <feColorMatrix type="saturate" values="0"/>
      </filter>
      
      <filter id="tokenShadow" x="-50%" y="-50%" width="200%" height="200%">
        <feDropShadow dx="0" dy="2" stdDeviation="3" flood-color="rgba(0,0,0,0.75)"/>
      </filter>
      
      <filter id="shroudShadow" x="-50%" y="-50%" width="200%" height="200%">
        <feDropShadow dx="1" dy="1" stdDeviation="1" flood-color="rgba(0,0,0,0.75)"/>
      </filter>
      
      <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
        <feGaussianBlur stdDeviation="4" result="coloredBlur"/>
        <feMerge>
          <feMergeNode in="coloredBlur"/>
          <feMergeNode in="SourceGraphic"/>
        </feMerge>
      </filter>
      
      <filter id="textShadow" x="-50%" y="-50%" width="200%" height="200%">
        <feDropShadow dx="1" dy="1" stdDeviation="1" flood-color="rgba(0,0,0,1)" flood-opacity="1"/>
      </filter>
      
      <!-- Thick shadow for role label on token -->
      <filter id="roleTextShadow" x="-50%" y="-50%" width="200%" height="200%">
        <feDropShadow dx="0" dy="1" stdDeviation="1.5" flood-color="rgba(0,0,0,1)" flood-opacity="1"/>
        <feDropShadow dx="0" dy="1" stdDeviation="2.5" flood-color="rgba(0,0,0,0.8)" flood-opacity="1"/>
      </filter>
    </defs>
    
    <rect width="100%" height="100%" fill="#2f3136"/>
    
    <text x="${SVG_WIDTH / 2}" y="40" text-anchor="middle" font-family="Balgruf, Georgia, serif" font-size="28" fill="${COLORS.main5}" filter="url(#textShadow)">${escapeXml(game.script || "Game")}</text>
    
    ${resultText ? `<text x="${SVG_WIDTH / 2}" y="65" text-anchor="middle" font-family="Balgruf, Georgia, serif" font-size="16" fill="${COLORS.main4}" filter="url(#textShadow)">${escapeXml(resultText)}</text>` : ""}`;
	let currentY = headerEndY;
	if (hasGlobalReminders) {
		const globalRemindersResult = generateGlobalRemindersSvg(game.globalReminders, CIRCLE_CENTER_X, currentY);
		svg += globalRemindersResult.svg;
	}
	svg += `<text x="${CIRCLE_CENTER_X}" y="${circleCenterY}" text-anchor="middle" font-family="Balgruf, Georgia, serif" font-size="32" fill="${COLORS.main5}" filter="url(#textShadow)">Day ${dayNumber}</text>
    <text x="${CIRCLE_CENTER_X}" y="${circleCenterY + 25}" text-anchor="middle" font-family="Poppins, sans-serif" font-size="13" font-weight="300" fill="${aliveColor}">${aliveDisplay}</text>`;
	players.forEach((player, i) => {
		svg += generatePlayerSvg(player, calculateCirclePosition(i, players.length, circleCenterY), game, {
			hideGrim,
			showRole,
			nightOrderData: game.nightOrder
		});
	});
	if (hasDemonBluffs) {
		const demonBluffsY = circleCenterY + circleRadius + circleBottomMargin;
		const demonBluffsResult = generateDemonBluffsSvg(game.demonBluffs, CIRCLE_CENTER_X, demonBluffsY);
		svg += demonBluffsResult.svg;
	}
	return svg + "</svg>";
}
/**
* Generate a PNG blob from a game object
* @param {Object} game - The game object
* @param {Object} options - Options for rendering
* @param {boolean} options.hideGrim - Whether to hide role information
* @param {boolean} options.showRole - Whether to show your own role
* @param {number} options.scale - Scale factor for PNG (default 4)
* @returns {Promise<Blob>} - PNG blob
*/
async function generateGamePng(game, options = {}) {
	const { hideGrim = false, showRole = true, scale = 4 } = options;
	await preloadSvgs(game);
	const svgString = generateGameSvg(game, {
		hideGrim,
		showRole
	});
	const widthMatch = svgString.match(/width="(\d+)"/);
	const heightMatch = svgString.match(/height="(\d+(?:\.\d+)?)"/);
	const width = widthMatch ? parseInt(widthMatch[1]) : SVG_WIDTH;
	const height = heightMatch ? Math.ceil(parseFloat(heightMatch[1])) : SVG_HEIGHT;
	const canvas = document.createElement("canvas");
	const ctx = canvas.getContext("2d");
	canvas.width = width * scale;
	canvas.height = height * scale;
	const svgBlob = new Blob([svgString], { type: "image/svg+xml;charset=utf-8" });
	const url = URL.createObjectURL(svgBlob);
	return new Promise((resolve, reject) => {
		const img = new Image();
		img.onload = () => {
			ctx.scale(scale, scale);
			ctx.drawImage(img, 0, 0);
			URL.revokeObjectURL(url);
			canvas.toBlob((blob) => {
				if (blob) resolve(blob);
				else reject(/* @__PURE__ */ new Error("Failed to create PNG blob"));
			}, "image/png");
		};
		img.onerror = () => {
			URL.revokeObjectURL(url);
			reject(/* @__PURE__ */ new Error("Failed to load SVG image"));
		};
		img.src = url;
	});
}
/**
* Generate a PNG file from a game object
* @param {Object} game - The game object
* @param {Object} options - Options for rendering
* @returns {Promise<File>} - PNG file ready for sharing
*/
async function generateGamePngFile(game, options = {}) {
	const blob = await generateGamePng(game, options);
	const filename = `${game.script || "game"}-day-${(game.day || 0) + (game.stMode ? 0 : 1)}.png`;
	return new File([blob], filename, { type: "image/png" });
}
/**
* Share a game as a PNG image using the Web Share API
* @param {Object} game - The game object
* @param {Object} options - Options for rendering and sharing
* @param {string} options.shareText - Text to include with the share
* @returns {Promise<void>}
*/
async function shareGameAsImage(game, options = {}) {
	const { shareText = "" } = options;
	const file = await generateGamePngFile(game, options);
	if (navigator.share && navigator.canShare && navigator.canShare({ files: [file] })) await navigator.share({
		title: `${game.script || "Game"} - Day ${(game.day || 0) + (game.stMode ? 0 : 1)}`,
		text: shareText,
		files: [file]
	});
	else throw new Error("Web Share API not supported or cannot share files");
}
//#endregion
export { shareGameAsImage as t };
