import { toType, toPercentage, toDecimal, toNumber } from "../../../src/utils/converter";
import { NumberTypeString } from "../../../src";
import { C } from "../../../src/typings/C";
import { BetweenOption } from "../../../src/utils/helper";

const type: Record<NumberTypeString, NumberTypeString> = {
  number: "number",
  percent: "percent",
  decimal: "decimal",
};

const types = Object.keys(type) as Array<NumberTypeString>;

type TestData = {
  name: string;
  number: number;
  percent: number;
  decimal: number;
  option: Partial<BetweenOption>;
};

const createToTypeTestcase = (
  data: TestData
): [string, NumberTypeString, C<string, any>, Partial<BetweenOption>, C<string, any>][] => {
  const arr: [string, NumberTypeString, C<string, any>, Partial<BetweenOption>, C<string, any>][] = [];
  types.forEach(t1 => {
    types.forEach(t2 => {
      arr.push([data.name, t1, { type: t2, key: data[t2] }, data.option, { type: t1, key: data[t1] }]);
    });
  });

  return arr;
};

const createTestcase = (type: NumberTypeString, data: TestData) => {
  const arr: [string, C<string, any>, Partial<BetweenOption>, C<string, any>][] = [];
  types.forEach(t1 => {
    arr.push([data.name, { type: t1, key: data[t1] }, data.option, { type: type, key: data[type] }]);
  });

  return arr;
};

describe("toType()", () => {
  const resultA: TestData = {
    name: "Testcase A",
    number: 65,
    percent: 5,
    decimal: 0.05,
    option: {
      max: 350,
      min: 50,
      digit: 2,
    },
  };

  const resultB: TestData = {
    name: "Testcase B",
    number: 0.553,
    percent: 55.3,
    decimal: 0.553,
    option: {
      digit: 3,
    },
  };

  test.each(createToTypeTestcase(resultA).concat(createToTypeTestcase(resultB)))(
    "%s%#: convert '%s' of '%p' (option = %p) should be %s",
    (_, type, obj, limit, result) => {
      expect(toType<string, C<string, any>>(type, obj, limit)).toEqual(result);
    }
  );

  test("Testcase Z1: change data with undefined or null", () => {
    const a: C<string, any> = { z: 54, b: 23, c: undefined, d: null, e: 0, f: true, type: "number" };
    const b = { z: 0.54, b: 0.23, e: 0, type: "decimal" };

    expect(toType("decimal", a, { min: 0, max: 100 })).toEqual(b);
  });

  test("Testcase Z2: exception when type is not exist", () => {
    const a: C<string, any> = { b: 54, type: "no-exist" };
    expect(() => toType("no-exist" as any, a, {})).toThrowError();
  });

  test("Testcase Z3: exception with input is not object", () => {
    expect(() => toType("no-exist" as any, true as any, {})).toThrowError();
  });

  test("Testcase Z4: exception when input object is undefined", () => {
    expect(() => toType("no-exist" as any, undefined as any, {})).toThrowError();
  });
});

describe("toPercentage()", () => {
  const resultC: TestData = {
    name: "Testcase C",
    number: 0.553,
    percent: 55.3,
    decimal: 0.553,
    option: {
      digit: 3,
    },
  };

  const resultD: TestData = {
    name: "Testcase D",
    number: 0.553,
    percent: 55.3,
    decimal: 0.553,
    option: {
      digit: 3,
    },
  };

  test("exception when type is not exist", () => {
    const a: C<string, any> = { a: 54, type: "no-exist" };
    expect(() => toPercentage(a, {})).toThrowError();
  });

  test.each(createTestcase("percent", resultC).concat(createTestcase("percent", resultD)))(
    "%s%#: change '%p' (option = %p) to %s",
    (_, obj, limit, result) => {
      expect(toPercentage<string, C<string, any>>(obj, limit)).toEqual(result);
    }
  );
});

describe("toNumber()", () => {
  const resultE: TestData = {
    name: "Testcase E",
    number: 0.553,
    percent: 55.3,
    decimal: 0.553,
    option: {
      digit: 3,
    },
  };

  const resultF: TestData = {
    name: "Testcase F",
    number: 0.553,
    percent: 55.3,
    decimal: 0.553,
    option: {
      digit: 3,
    },
  };

  test("exception when type is not exist", () => {
    const a: C<string, any> = { a: 54, type: "no-exist" };
    expect(() => toNumber(a, {})).toThrowError();
  });

  test.each(createTestcase("number", resultE).concat(createTestcase("number", resultF)))(
    "%s%#: change '%p' (option = %p) to %s",
    (_, obj, limit, result) => {
      expect(toNumber<string, C<string, any>>(obj, limit)).toEqual(result);
    }
  );
});

describe("toDecimal()", () => {
  const resultG: TestData = {
    name: "Testcase G",
    number: 0.553,
    percent: 55.3,
    decimal: 0.553,
    option: {
      digit: 3,
    },
  };

  const resultH: TestData = {
    name: "Testcase H",
    number: 0.553,
    percent: 55.3,
    decimal: 0.553,
    option: {
      digit: 3,
    },
  };

  test("exception when type is not exist", () => {
    const a: C<string, any> = { a: 54, type: "no-exist" };
    expect(() => toDecimal(a, {})).toThrowError();
  });

  test.each(createTestcase("decimal", resultG).concat(createTestcase("decimal", resultH)))(
    "%s%#: change '%p' (option = %p) to %s",
    (_, obj, limit, result) => {
      expect(toDecimal<string, C<string, any>>(obj, limit)).toEqual(result);
    }
  );
});
