export type YearType = "thai" | "global";

/**
 * convert year from type to global year number
 *
 * Thai year example:
 *   - 54    => 2011
 *   - 61    => 2018
 *   - 2544  => 2001
 *   - 2565  => 2022
 *   - 5     => 1962
 *   - 612   => 2037
 *   - Y65   => 2022
 *
 * Global year example
 *   - 12    => 2012
 *   - 25    => 2525
 *   - 2044  => 2044
 *   - 2001  => 2001
 *   - 5     => 2005
 *   - 612   => 2612
 *   - Y18   => 2018
 *
 * @param year year string
 * @param type year type
 */
const convertYear = (year: string, type: YearType = "thai") => {
  const prefix = type === "thai" ? "25" : "20";
  const converter = type === "thai" ? -543 : 0;

  const yearn = year
    .split("")
    .reduce((p, c) => (isNaN(parseInt(c)) ? p : p + c), ""); // remove all non-number string
  const year1 = yearn.padStart(2, "0"); // padding start with 0 if string length is 1
  const year2 = year1.length === 2 ? `${prefix}${year1}` : year1; // add 25 if year length is 2
  const year3 = year2.length === 3 ? `${prefix.charAt(0)}${year2}` : year2; // add 2 if year length is 3
  const year4 = year3.length > 4 ? year3.substring(year3.length - 4) : year3; // trim all string more than 4

  const int = parseInt(year4);
  return int + converter;
};

export default convertYear;
