import { DateTime as Luxon, Duration, DurationObject, Interval } from "luxon";
import { RecursiveUnit, RecursiveUnits } from "./RecursiveUnit";

export interface DatetimeObject {
  day: number;
  month: number;
  year: number;
}

export class Datetime {
  private defaultDT: Luxon;
  private dt: Luxon;

  constructor(dt: DatetimeObject) {
    this.defaultDT = Luxon.fromObject({
      day: dt.day,
      month: dt.month,
      year: dt.year,
    }).startOf("day");

    this.dt = Luxon.fromObject({
      day: dt.day,
      month: dt.month,
      year: dt.year,
    }).startOf("day");
  }

  nextDay(num: number = 1): this {
    return this.next({ day: num });
  }

  next(unit: RecursiveUnit | DurationObject): this {
    this.dt = this.dt.plus(RecursiveUnits.convert(unit));
    return this;
  }

  reset(): void {
    this.dt = Luxon.fromObject(this.defaultDT.toObject());
  }

  every(duration: DurationObject): Interval {
    return Interval.after(this.dt, duration);
  }

  contains(duration: DurationObject, dt: Datetime): boolean {
    return this.every(duration).contains(dt.dt);
  }

  diff(d: Datetime): Duration {
    return this.dt.diff(d.dt);
  }

  before(dt: Datetime): boolean {
    return this.diff(dt).milliseconds < 0;
  }

  after(dt: Datetime): boolean {
    return this.diff(dt).milliseconds > 0;
  }

  equals(d: Datetime): boolean {
    return this.dt.equals(d.dt);
  }

  currentWeekday(): number {
    return this.dt.weekday;
  }

  currentDate(): number {
    return this.dt.day;
  }

  currentMonth(): number {
    return this.dt.month;
  }

  currentYear(): number {
    return this.dt.year;
  }

  copy(dt?: Partial<DatetimeObject>): Datetime {
    return new Datetime({
      day: dt?.day ?? this.currentDate(),
      month: dt?.month ?? this.currentMonth(),
      year: dt?.year ?? this.currentYear(),
    });
  }

  toString(): string {
    return `${this.dt.day} ${this.dt.monthShort} ${this.dt.year}`;
  }
}
