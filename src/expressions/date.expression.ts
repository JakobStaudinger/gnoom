import { StaticInput } from './index';

export type TimeUnit =
  | 'year'
  | 'quarter'
  | 'month'
  | 'week'
  | 'day'
  | 'hour'
  | 'minute'
  | 'second'
  | 'millisecond';

export type ReasonableTimeUnit = Exclude<TimeUnit, 'quarter'>;

export type DateParts = {
  [K in ReasonableTimeUnit]: number;
};

export type Weekday =
  | 'monday'
  | 'mon'
  | 'tuesday'
  | 'tue'
  | 'wednesday'
  | 'wed'
  | 'thursday'
  | 'thu'
  | 'friday'
  | 'fri'
  | 'saturday'
  | 'sat'
  | 'sunday'
  | 'sun';

export type DateExpression =
  | {
      $dateAdd: (
        input: StaticInput<{
          startDate: Date;
          unit: TimeUnit;
          amount: number;
          timezone?: string;
        }>
      ) => Date;
    }
  | {
      $dateDiff: (
        input: StaticInput<{
          startDate: Date;
          endDate: Date;
          unit: TimeUnit;
          timezone?: number;
          startOfWeek?: Weekday;
        }>
      ) => number;
    }
  | {
      $dateFromParts: (
        // TODO: maybe implement ISO 8601 version
        input: StaticInput<
          Required<Pick<DateParts, 'year'>> &
            Partial<DateParts> & { timezone?: string }
        >
      ) => Date;
    }
  | {
      $dateFromString: <E = never, N = null>(
        input: StaticInput<{
          dateString: string;
          format?: string;
          timezone?: string;
          onError?: E;
          onNull?: N;
        }>
      ) => Date | E | N;
    }
  | {
      $dateSubtract: (
        input: StaticInput<{
          startDate: Date;
          unit: TimeUnit;
          amount: number;
          timezone?: string;
        }>
      ) => Date;
    }
  | {
      $dateToParts: (
        input: StaticInput<{
          date: Date;
          timezone?: string;
          // TODO: maybe implement ISO 8601 version
          iso8601?: never;
        }>
      ) => DateParts;
    }
  | {
      $dateToString: <N = null>(
        input: StaticInput<{
          date: Date | null;
          format?: string;
          timezone?: string;
          onNull?: N;
        }>
      ) => string | N;
    }
  | {
      $dateTrunc: (
        input: StaticInput<{
          date: Date | null;
          unit: TimeUnit;
          binSize?: number;
          timezone?: string;
          startOfWeek?: Weekday;
        }>
      ) => Date | null;
    }
  | {
      $year: (
        date: Date | StaticInput<{ date: Date; timezone?: string }>
      ) => number;
    }
  | {
      $dayOfYear: (
        date: Date | StaticInput<{ date: Date; timezone?: string }>
      ) => number;
    }
  | {
      $month: (
        date: Date | StaticInput<{ date: Date; timezone?: string }>
      ) => number;
    }
  | {
      $dayOfMonth: (
        date: Date | StaticInput<{ date: Date; timezone?: string }>
      ) => number;
    }
  | {
      $week: (
        date: Date | StaticInput<{ date: Date; timezone?: string }>
      ) => number;
    }
  | {
      $dayOfWeek: (
        date: Date | StaticInput<{ date: Date; timezone?: string }>
      ) => number;
    }
  | {
      $hour: (
        date: Date | StaticInput<{ date: Date; timezone?: string }>
      ) => number;
    }
  | {
      $minute: (
        date: Date | StaticInput<{ date: Date; timezone?: string }>
      ) => number;
    }
  | {
      $second: (
        date: Date | StaticInput<{ date: Date; timezone?: string }>
      ) => number;
    }
  | {
      $millisecond: (
        date: Date | StaticInput<{ date: Date; timezone?: string }>
      ) => number;
    }
  | {
      $isoWeekYear: (
        date: Date | StaticInput<{ date: Date; timezone?: string }>
      ) => number;
    }
  | {
      $isoWeek: (
        date: Date | StaticInput<{ date: Date; timezone?: string }>
      ) => number;
    }
  | {
      $isoDayOfWeek: (
        date: Date | StaticInput<{ date: Date; timezone?: string }>
      ) => number;
    }
  | { $toDate: (value: unknown) => Date };
