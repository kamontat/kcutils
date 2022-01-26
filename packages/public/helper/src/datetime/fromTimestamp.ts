import isString from "../string/isString";

const fromTimestamp = (timestamp: string | number): Date | undefined => {
  if (isString(timestamp)) {
    if (/^(\d)+$/.test(timestamp)) {
      return fromTimestamp(parseInt(timestamp, 10));
    } else {
      return undefined;
    }
  }

  return isFinite(timestamp) ? new Date(timestamp) : undefined;
};

export default fromTimestamp;
