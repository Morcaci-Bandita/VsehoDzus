import { F as j$1, N as E } from "./CY602n9t.js";
import { L as e$1, R as i$1, z as t$1 } from "./CP0hEE1l.js";
//#region node_modules/lit-html/directive-helpers.js
/**
* @license
* Copyright 2020 Google LLC
* SPDX-License-Identifier: BSD-3-Clause
*/ const { I: t } = j$1, i = (o) => o, s = () => document.createComment(""), v = (o, n, e) => {
	const l = o._$AA.parentNode, d = void 0 === n ? o._$AB : n._$AA;
	if (void 0 === e) {
		const i = l.insertBefore(s(), d), n = l.insertBefore(s(), d);
		e = new t(i, n, o, o.options);
	} else {
		const t = e._$AB.nextSibling, n = e._$AM, c = n !== o;
		if (c) {
			let t;
			e._$AQ?.(o), e._$AM = o, void 0 !== e._$AP && (t = o._$AU) !== n._$AU && e._$AP(t);
		}
		if (t !== d || c) {
			let o = e._$AA;
			for (; o !== t;) {
				const t = i(o).nextSibling;
				i(l).insertBefore(o, d), o = t;
			}
		}
	}
	return e;
}, u$1 = (o, t, i = o) => (o._$AI(t, i), o), m = {}, p = (o, t = m) => o._$AH = t, M = (o) => o._$AH, h = (o) => {
	o._$AR(), o._$AA.remove();
};
//#endregion
//#region node_modules/lit-html/directives/repeat.js
/**
* @license
* Copyright 2017 Google LLC
* SPDX-License-Identifier: BSD-3-Clause
*/
const u = (e, s, t) => {
	const r = /* @__PURE__ */ new Map();
	for (let l = s; l <= t; l++) r.set(e[l], l);
	return r;
}, c = e$1(class extends i$1 {
	constructor(e) {
		if (super(e), e.type !== t$1.CHILD) throw Error("repeat() can only be used in text expressions");
	}
	dt(e, s, t) {
		let r;
		void 0 === t ? t = s : void 0 !== s && (r = s);
		const l = [], o = [];
		let i = 0;
		for (const s of e) l[i] = r ? r(s, i) : i, o[i] = t(s, i), i++;
		return {
			values: o,
			keys: l
		};
	}
	render(e, s, t) {
		return this.dt(e, s, t).values;
	}
	update(s, [t, r, c]) {
		const d = M(s), { values: p$1, keys: a } = this.dt(t, r, c);
		if (!Array.isArray(d)) return this.ut = a, p$1;
		const h$1 = this.ut ??= [], v$1 = [];
		let m, y, x = 0, j = d.length - 1, k = 0, w = p$1.length - 1;
		for (; x <= j && k <= w;) if (null === d[x]) x++;
		else if (null === d[j]) j--;
		else if (h$1[x] === a[k]) v$1[k] = u$1(d[x], p$1[k]), x++, k++;
		else if (h$1[j] === a[w]) v$1[w] = u$1(d[j], p$1[w]), j--, w--;
		else if (h$1[x] === a[w]) v$1[w] = u$1(d[x], p$1[w]), v(s, v$1[w + 1], d[x]), x++, w--;
		else if (h$1[j] === a[k]) v$1[k] = u$1(d[j], p$1[k]), v(s, d[x], d[j]), j--, k++;
		else if (void 0 === m && (m = u(a, k, w), y = u(h$1, x, j)), m.has(h$1[x])) if (m.has(h$1[j])) {
			const e = y.get(a[k]), t = void 0 !== e ? d[e] : null;
			if (null === t) {
				const e = v(s, d[x]);
				u$1(e, p$1[k]), v$1[k] = e;
			} else v$1[k] = u$1(t, p$1[k]), v(s, d[x], t), d[e] = null;
			k++;
		} else h(d[j]), j--;
		else h(d[x]), x++;
		for (; k <= w;) {
			const e = v(s, v$1[w + 1]);
			u$1(e, p$1[k]), v$1[k++] = e;
		}
		for (; x <= j;) {
			const e = d[x++];
			null !== e && h(e);
		}
		return this.ut = a, p(s, v$1), E;
	}
});
//#endregion
export { c as t };
