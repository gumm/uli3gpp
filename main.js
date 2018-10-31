
const toNum = s => Number(`0x${s}`);

/***
 * 8.21 User Location Information (ULI)
 *     http://www.etsi.org/deliver/etsi_ts/129200_129299/129274/12.06.00_60/ts_129274v120600p.pdf
 *
 *     0x      0   0   5   6   f   5   1   0   01   57   8c   d3
 *             |   |   |   |   |   |   |   |   |-----|   |-----|
 *             |   |   |   |   |   |   |   |   |         |
 *             |   |   |   |   |   |   |   |   |         |
 *             |   |   |   |   |   |   |   |   |         0x8cd3 = 36051 = CI
 *             |   |   |   |   |   |   |   |   |
 *             |   |   |   |   |   |   |   |   0x0157 = 343 = LAC
 *             |   |   |   |   |   |   |   |
 *             |   |   |   |   |   |   |   0x0 = 0 = mnc_1
 *             |   |   |   |   |   |   |
 *             |   |   |   |   |   |   0x1 = 1 = mnc_2
 *             |   |   |   |   |   |
 *             |   |   |   |   |   0x5 = 5 = mcc_3
 *             |   |   |   |   |
 *             |   |   |   |   0xf = 15 = mnc_3
 *             |   |   |   |
 *             |   |   |   0x6 = 6 = mcc_1
 *             |   |   |
 *             |   |   0x5 = 5 = mcc_2
 *             |   |
 *             |   0x0 = 0
 *             |
 *             0x0 = 0
 *
 *     Yields: '655', '01', 343, 36051,
 * @param zxloc
 * @return {Array}
 */
module.exports = zxloc => {


  let loc = zxloc.substring(2);
  if (loc.length > 16) {
    loc = loc.substring(10)
  }

  let cid = toNum(loc.substring(12));
  let lac = toNum(loc.substring(8, 12));
  const mnc_1 = toNum(loc.substring(7, 8));
  const mnc_2 = toNum(loc.substring(6, 7));
  const mcc_3 = toNum(loc.substring(5, 6));

  let mnc_3 = toNum(loc.substring(4, 5));
  const mcc_1 = toNum(loc.substring(3, 4));
  const mcc_2 = toNum(loc.substring(2, 3));

  const mnc = [mnc_1, mnc_2, mnc_3 === Number(0x0F) ? '' : mnc_3].join('');
  const mcc = [mcc_1, mcc_2, mcc_3].join('');
  return [mcc, mnc, lac, cid];
};


