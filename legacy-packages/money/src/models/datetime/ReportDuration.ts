import { Duration, DurationObject } from "luxon";
import { Datetime } from "./Datetime";

export class ReportDuration {
  static oneDay(start: Datetime = Datetime.now()): ReportDuration {
    return ReportDuration.fromStart(start, { day: 1 });
  }

  static oneWeek(start: Datetime = Datetime.now()): ReportDuration {
    return ReportDuration.fromStart(start, { week: 1 });
  }

  static oneMonth(start: Datetime = Datetime.now()): ReportDuration {
    return ReportDuration.fromStart(start, { month: 1 });
  }

  static oneYear(start: Datetime = Datetime.now()): ReportDuration {
    return ReportDuration.fromStart(start, { year: 1 });
  }

  static fromNow(duration: DurationObject): ReportDuration {
    return ReportDuration.fromStart(Datetime.now(), duration);
  }

  static fromStart(start: Datetime, duration: DurationObject): ReportDuration {
    return new ReportDuration(start, start.newNext(duration));
  }

  static startStop(start: Datetime, stop: Datetime): ReportDuration {
    return new ReportDuration(start, stop);
  }

  constructor(readonly start: Datetime, readonly stop: Datetime) {}

  get duration(): Duration {
    return this.stop.diff(this.start);
  }
}
