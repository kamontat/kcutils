import isString from "../string/isString";
import isNumber from "../number/isNumber";

export type TimestampType = "second" | "millisecond";

/**
 * convert input datetime to timestamp number
 *
 * @param input input datetime
 * @param type output type
 * @returns timestamp in number
 */
const timestamp = (
  input: string | number | Date,
  type: TimestampType = "millisecond"
): number => {
  const date = isString(input) || isNumber(input) ? new Date(input) : input;
  const ms = date.getTime();
  return type === "millisecond" ? ms : Math.round(ms / 1000);
};

export default timestamp;
