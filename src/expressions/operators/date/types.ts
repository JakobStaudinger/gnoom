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
