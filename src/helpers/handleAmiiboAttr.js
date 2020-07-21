/**
 * @param {?Object[]} amiibosAttr
 * @return {string[]}
 */
export default function (amiibosAttr) {
  return [null, ...new Set(amiibosAttr ? amiibosAttr.map((g) => g.name) : [])];
}
