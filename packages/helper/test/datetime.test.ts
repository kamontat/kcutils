import { datetime, generic } from "../src";

describe("Datetime", () => {
  test.each([
    [undefined, undefined],
    [{}, undefined],
    [{ year: 2010, month: 9, date: 6 }, "2010-10-06T00:00:00.000Z"],
    [{ year: 2020, month: 11, date: 6, minute: 12 }, "2020-12-06T00:12:00.000Z"],
    [{ year: 2555, month: 0, millisecond: 8 }, "2554-12-31T00:00:00.008Z"],
  ])("create new '%p', will return new Date(%s, UTC)", (input, output) => {
    const actual = datetime.newDate(input);
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
      const actual = datetime.newDate(input, "local");
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
    ["name", undefined, -1],
    ["Jan", undefined, 0],
    ["พฤษภาคม", { type: "short", lang: "en" } as datetime.ConvertMonthNameOption, -1],
    ["October", { type: "long", lang: "en" } as datetime.ConvertMonthNameOption, 9],
  ])("convert %s with %p options to %s month index", (name, opt, index) => {
    expect(datetime.convertMonthName(name, opt)).toEqual(index);
  });

  test.each([
    ["name", undefined, -1],
    ["Wednesday", undefined, 3],
    ["อาทิตย์", { type: "short", lang: "en" } as datetime.ConvertDayNameOption, -1],
    ["Monday", { type: "long", lang: "en" } as datetime.ConvertDayNameOption, 1],
  ])("convert %s with %p options to %s day index", (name, opt, index) => {
    expect(datetime.convertDayName(name, opt)).toEqual(index);
  });

  test.each([
    ["day" as datetime.DatetimeKey, "name", undefined, -1],
    ["month" as datetime.DatetimeKey, "name", undefined, -1],
    ["unknown" as datetime.DatetimeKey, "Jan", undefined, -1],
  ])("[%s] getIndex(%s, '%p') returns %s", (key, name, opt, output) => {
    expect(datetime.getIndex(name, key, opt)).toEqual(output);
  });

  test.each([
    [1, {} as datetime.GetNameOption, undefined],
    [1, { key: "day" } as datetime.GetNameOption, undefined],
    [1, { type: "short" } as datetime.GetNameOption, undefined],
    [1, { lang: "en" } as datetime.GetNameOption, undefined],
    [1, { lang: "en", type: "long" } as datetime.GetNameOption, undefined],
    [-2, { key: "day", lang: "th", type: "short" } as datetime.GetNameOption, undefined],
    [12, { key: "month", lang: "en", type: "short" } as datetime.GetNameOption, undefined],
    [1, { key: "day", lang: "th", type: "short" } as datetime.GetNameOption, "จันทร์"],
    [1, { key: "month", lang: "en", type: "long" } as datetime.GetNameOption, "February"],
  ])("getName(%s, '%p') returns %s", (name, opt, output) => {
    expect(datetime.getName(name, opt)).toEqual(output);
  });

  test.each([
    [new Date("2011/05/01"), 1304182800000, undefined],
    ["2011/05/01", 1304182800000, undefined],
    [new Date("2011/05/01"), 1304182800000, "millisecond" as datetime.TimestampType],
    [new Date("2011/05/01"), 1304182800, "second" as datetime.TimestampType],

    [new Date("2012/11/11 12:05:10"), 1352610310000, "millisecond" as datetime.TimestampType],
    ["2012/11/11 12:05:12", 1352610312, "second" as datetime.TimestampType],
    [new Date("2012/05/19 00:00:01"), 1337360401000, "millisecond" as datetime.TimestampType],
    [new Date("2012/05/18 00:00:01"), 1337274001, "second" as datetime.TimestampType],
    [1258192312412, 1258192312412, "millisecond" as datetime.TimestampType],
    [1337274001000, 1337274001, "second" as datetime.TimestampType],
  ])("convert Date(%s) to timestamp(%s, %s)", (date, timestamp, type) => {
    expect(datetime.timestamp(date, type)).toEqual(timestamp);
  });

  test.each([
    [NaN, undefined],
    [Infinity, undefined],
    ["string", undefined],
    ["1234A", undefined],
    ["NaN", undefined],

    [-1, new Date("Thu Jan 01 1970 06:59:59 GMT+0700 (Indochina Time)")],
    [1304182800000, new Date("2011/05/01")],
    [1352610310000, new Date("2012/11/11 12:05:10")],
    [1337360401000, new Date("2012/05/19 00:00:01")],
    [1352610312000, new Date("2012/11/11 12:05:12")],
    ["1352610312000", new Date("2012/11/11 12:05:12")],
  ])("convert Timestamp(%s, %s) to Date(%s)", (timestamp, date) => {
    const d = datetime.getDateFromTimestamp(timestamp);
    if (d === undefined && date !== undefined) return fail(`expected(${date}) but received undefined`);
    else if (d !== undefined && date === undefined) return fail(`expected(undefined) but received ${d}`);
    else if (d === undefined && date === undefined) return expect(true).toEqual(true);
    else if (generic.isExist(d) && generic.isExist(date)) expect(d.toString()).toEqual(date.toString());
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

    ["54", "thai" as datetime.YearType, 2011],
    ["61", "thai" as datetime.YearType, 2018],
    ["2544", "thai" as datetime.YearType, 2001],
    ["2565", "thai" as datetime.YearType, 2022],
    ["5", "thai" as datetime.YearType, 1962],
    ["0", "thai" as datetime.YearType, 1957],
    ["610", "thai" as datetime.YearType, 2067],
    ["Y62", "thai" as datetime.YearType, 2019],
    ["51V", "thai" as datetime.YearType, 2008],
    ["7A8", "thai" as datetime.YearType, 2035],
    ["25500", "thai" as datetime.YearType, 4957],
    ["91881", "thai" as datetime.YearType, 1338],

    ["11", "global" as datetime.YearType, 2011],
    ["18", "global" as datetime.YearType, 2018],
    ["1", "global" as datetime.YearType, 2001],
    ["22", "global" as datetime.YearType, 2022],
    ["1962", "global" as datetime.YearType, 1962],
    ["1957", "global" as datetime.YearType, 1957],
    ["166", "global" as datetime.YearType, 2166],
    ["A19", "global" as datetime.YearType, 2019],
    ["B8", "global" as datetime.YearType, 2008],
    ["V3V5", "global" as datetime.YearType, 2035],
    ["121314", "global" as datetime.YearType, 1314],
    ["150001", "global" as datetime.YearType, 1],
  ])("convert input %s to %s year %s", (input, type, output) => {
    if (generic.isExist(type)) expect(datetime.convertYear(input, type)).toEqual(output);
    else expect(datetime.convertYear(input)).toEqual(output);
  });
});
