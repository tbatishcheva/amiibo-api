import Amiibo from '../models/Amiibo';

/**
 * @param {?Object[]} amiibosRes
 * @return {Amiibo[]}
 */
export default function (amiibosRes) {
  return amiibosRes ? amiibosRes.map((r) => new Amiibo(r)) : [];
}
