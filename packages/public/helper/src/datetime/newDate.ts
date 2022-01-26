import type { DatetimeTimezone } from "./_types";

import mergeObject from "../object/mergeObject";

export type NewDateOption = {
  year: number;
  month: number;
  date: number;
  hour: number;
  minute: number;
  second: number;
  millisecond: number;
};

const newDate = (
  opt?: Partial<NewDateOption>,
  type: DatetimeTimezone = "UTC"
) => {
  const option = mergeObject<NewDateOption>(
    {
      year: 0,
      month: 0,
      date: 0,
      hour: 0,
      minute: 0,
      second: 0,
      millisecond: 0,
    },
    opt
  );

  if (
    option.year === 0 &&
    option.month === 0 &&
    option.date === 0 &&
    option.hour === 0 &&
    option.minute === 0 &&
    option.second === 0 &&
    option.millisecond === 0
  ) {
    return new Date();
  } else if (type === "UTC") {
    return new Date(
      Date.UTC(
        option.year,
        option.month,
        option.date,
        option.hour,
        option.minute,
        option.second,
        option.millisecond
      )
    );
  } else {
    return new Date(
      option.year,
      option.month,
      option.date,
      option.hour,
      option.minute,
      option.second,
      option.millisecond
    );
  }
};

export default newDate;
