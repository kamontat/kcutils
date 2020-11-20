import { DurationObject } from "luxon";

export enum RecursiveUnit {
  Daily = "daily",
  Weekly = "weelly",
  Monthly = "monthly",
  Yearly = "yearly",
}

export class RecursiveUnits {
  static convert(unit: RecursiveUnit | DurationObject): DurationObject {
    let durationOption: DurationObject = {};

    if (unit === RecursiveUnit.Daily) durationOption.day = 1;
    else if (unit === RecursiveUnit.Weekly) durationOption.week = 1;
    else if (unit === RecursiveUnit.Monthly) durationOption.month = 1;
    else if (unit === RecursiveUnit.Yearly) durationOption.year = 1;
    else durationOption = unit;

    return durationOption;
  }
}
