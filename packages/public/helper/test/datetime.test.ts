import type {
  ConvertOption,
  DatetimeKey,
  TimestampType,
  YearType,
} from "../src/datetime";
import {
  newDate,
  convertName,
  convertIndex,
  convertYear,
  timestamp,
  fromTimestamp,
} from "../src/datetime";

import { isExist } from "../src/generic";

const day: DatetimeKey = "day";
const month: DatetimeKey = "month";
const second: TimestampType = "second";
const millisecond: TimestampType = "millisecond";
const thai: YearType = "thai";
const global: YearType = "global";

describe("Datetime", () => {
  test.each([
    [undefined, undefined],
    [{}, undefined],
    [{ year: 2010, month: 9, date: 6 }, "2010-10-06T00:00:00.000Z"],
    [
      { year: 2020, month: 11, date: 6, minute: 12 },
      "2020-12-06T00:12:00.000Z",
    ],
    [{ year: 2555, month: 0, millisecond: 8 }, "2554-12-31T00:00:00.008Z"],
  ])("create new '%p', will return new Date(%s, UTC)", (input, output) => {
    const actual = newDate(input);
    const expected = output ? new Date(output) : new Date(Date.now());

    expect(actual.getFullYear()).toEqual(expected.getFullYear());
    expect(actual.getMonth()).toEqual(expected.getMonth());
    expect(actual.getDate()).toEqual(expected.getDate());
    expect(actual.getDay()).toEqual(expected.getDay());
    expect(actual.getHours()).toEqual(expected.getHours());
    expect(actual.getMinutes()).toEqual(expected.getMinutes());
    expect(actual.getSeconds()).toEqual(expected.getSeconds());
  });

  test.each([[{ year: 2010, month: 9, date: 6 }, 2010, 9, 6]])(
    "create new local '%p', will return new Date(%s, local)",
    (input, y, m, d) => {
      const actual = newDate(input, "local");
      const expected = new Date(y, m, d);

      expect(actual.getFullYear()).toEqual(expected.getFullYear());
      expect(actual.getMonth()).toEqual(expected.getMonth());
      expect(actual.getDate()).toEqual(expected.getDate());
      expect(actual.getDay()).toEqual(expected.getDay());
      expect(actual.getHours()).toEqual(expected.getHours());
      expect(actual.getMinutes()).toEqual(expected.getMinutes());
      expect(actual.getSeconds()).toEqual(expected.getSeconds());
    }
  );

  test.each([
    [month, "name", undefined, -1],
    [month, "Jan", undefined, 0],
    [month, "พฤษภาคม", { type: "short", lang: "en" } as ConvertOption, -1],
    [month, "October", { type: "long", lang: "en" } as ConvertOption, 9],
    [day, "name", undefined, -1],
    [day, "Wednesday", undefined, 3],
    [day, "อาทิตย์", { type: "short", lang: "en" } as ConvertOption, -1],
    [day, "Monday", { type: "long", lang: "en" } as ConvertOption, 1],
  ])(
    "convert %s with %p options to %s month index",
    (key, name, opt, index) => {
      expect(convertName(key, name, opt)).toEqual(index);
    }
  );

  test.each([
    [month, 1, {} as ConvertOption, undefined],
    [month, 1, { type: "short" } as ConvertOption, undefined],
    [month, 1, { lang: "en" } as ConvertOption, undefined],
    [month, 1, { lang: "en", type: "long" } as ConvertOption, "February"],
    [day, 1, { lang: "th", type: "short" } as ConvertOption, "จันทร์"],
    [day, 10, { lang: "en", type: "short" } as ConvertOption, undefined],
    [month, -1, { lang: "th", type: "long" } as ConvertOption, undefined],
  ])("getName(%s, '%p') returns %s", (key, index, option, output) => {
    expect(convertIndex(key, index, option)).toEqual(output);
  });

  test.each([
    [new Date("2011/05/01 GMT+0700"), undefined, 1304182800000],
    ["2011/05/01 GMT+0700", undefined, 1304182800000],
    [new Date("2011/05/01 GMT+0700"), millisecond, 1304182800000],
    [new Date("2011/05/01 GMT+0700"), second, 1304182800],
    [new Date("2012/11/11 12:05:10 GMT+0700"), millisecond, 1352610310000],
    ["2012/11/11 12:05:12 GMT+0700", second, 1352610312],
    [new Date("2012/05/19 00:00:01 GMT+0700"), millisecond, 1337360401000],
    [new Date("2012/05/18 00:00:01 GMT+0700"), second, 1337274001],
    [1258192312412, millisecond, 1258192312412],
    [1337274001000, second, 1337274001],
  ])("convert Date(%s) to timestamp(%s, %s)", (date, type, output) => {
    expect(timestamp(date, type)).toEqual(output);
  });

  test.each([
    [NaN, undefined],
    [Infinity, undefined],
    ["string", undefined],
    ["1234A", undefined],
    ["NaN", undefined],
    [-1, new Date("Thu Jan 01 1970 06:59:59 GMT+0700 (Indochina Time)")],
    [1304182800000, new Date("2011/05/01 GMT+0700")],
    [1352610310000, new Date("2012/11/11 12:05:10 GMT+0700")],
    [1337360401000, new Date("2012/05/19 00:00:01 GMT+0700")],
    [1352610312000, new Date("2012/11/11 12:05:12 GMT+0700")],
    ["1352610312000", new Date("2012/11/11 12:05:12 GMT+0700")],
  ])("convert Timestamp(%s) to Date(%s)", (timestamp, date) => {
    const d = fromTimestamp(timestamp);
    if (d === undefined && date !== undefined)
      return fail(`expected(${date}) but received undefined`);
    else if (d !== undefined && date === undefined)
      return fail(`expected(undefined) but received ${d}`);
    else if (d === undefined && date === undefined)
      return expect(true).toEqual(true);
    else if (isExist(d) && isExist(date))
      expect(d.toString()).toEqual(date.toString());
    else fail("never");
  });

  //  *   - 54    => 2554
  //  *   - 61    => 2561
  //  *   - 2544  => 2544
  //  *   - 2565  => 2565
  //  *   - 5     => 2505
  //  *   - 612   => 2612
  //  *   - Y65   => 2565
  //  *
  test.each([
    ["54", undefined, 2011],
    ["61", undefined, 2018],
    ["2544", undefined, 2001],
    ["2565", undefined, 2022],
    ["5", undefined, 1962],
    ["0", undefined, 1957],
    ["610", undefined, 2067],
    ["Y62", undefined, 2019],
    ["51V", undefined, 2008],
    ["7A8", undefined, 2035],
    ["25500", undefined, 4957],
    ["91881", undefined, 1338],

    ["54", thai, 2011],
    ["61", thai, 2018],
    ["2544", thai, 2001],
    ["2565", thai, 2022],
    ["5", thai, 1962],
    ["0", thai, 1957],
    ["610", thai, 2067],
    ["Y62", thai, 2019],
    ["51V", thai, 2008],
    ["7A8", thai, 2035],
    ["25500", thai, 4957],
    ["91881", thai, 1338],

    ["11", global, 2011],
    ["18", global, 2018],
    ["1", global, 2001],
    ["22", global, 2022],
    ["1962", global, 1962],
    ["1957", global, 1957],
    ["166", global, 2166],
    ["A19", global, 2019],
    ["B8", global, 2008],
    ["V3V5", global, 2035],
    ["121314", global, 1314],
    ["150001", global, 1],
  ])("convert input %s to %s year %s", (input, type, output) => {
    if (isExist(type)) expect(convertYear(input, type)).toEqual(output);
    else expect(convertYear(input)).toEqual(output);
  });
});
