import { RegExpOption, RegExpResult } from '../../types/regexp';
import { StaticInput } from '../static-input';

export type StringOperator =
  | { $concat: (x: string, y: string, ...values: string[]) => string }
  | {
      $dateFromString: <E = never, N = null>(
        input: StaticInput<{
          dateString: string;
          format?: StaticInput<string>;
          timezone?: string;
          onError?: E;
          onNull?: N;
        }>
      ) => Date | E | N;
    }
  | {
      $dateToString: <N = null>(
        input: StaticInput<{
          date: Date;
          format?: StaticInput<string>;
          timezone?: string;
          onNull?: N;
        }>
      ) => string | N;
    }
  | { $indexOfBytes: (input: string, substring: string) => number }
  | {
      $indexOfBytes: (
        input: string,
        substring: string,
        start: number,
        end: number
      ) => number;
    }
  | { $indexOfCP: (input: string, substring: string) => number }
  | {
      $indexOfCP: (
        input: string,
        substring: string,
        start: number,
        end: number
      ) => number;
    }
  | {
      $ltrim: (
        input: StaticInput<{
          input: string;
          chars?: string;
        }>
      ) => string;
    }
  | {
      $regexFind: (
        input: StaticInput<{
          input: string;
          regex: string | RegExp;
          options?: RegExpOption | string;
        }>
      ) => RegExpResult | null;
    }
  | {
      $regexFindAll: (
        input: StaticInput<{
          input: string;
          regex: string | RegExp;
          options?: RegExpOption | string;
        }>
      ) => RegExpResult[];
    }
  | {
      $regexMatch: (
        input: StaticInput<{
          input: string;
          regex: string | RegExp;
          options?: RegExpOption | string;
        }>
      ) => boolean;
    }
  | {
      $replaceOne: (
        input: StaticInput<{
          input: string;
          find: string;
          replacement: string;
        }>
      ) => string;
    }
  | {
      $replaceAll: (
        input: StaticInput<{
          input: string;
          find: string;
          replacement: string;
        }>
      ) => string;
    }
  | {
      $rtrim: (
        input: StaticInput<{
          input: string;
          chars?: string;
        }>
      ) => string;
    }
  | { $split: (input: string, delimeter: string) => string[] }
  | { $strLenBytes: (input: string) => number }
  | { $strLenCP: (input: string) => number }
  | { $strcasecmp: (x: string, y: string) => -1 | 0 | 1 }
  | {
      /**
       * @deprecated since version 3.4. Use {@link $substrBytes} instead
       */
      $substr: (input: string, start: number, length: number) => string;
    }
  | { $substrBytes: (input: string, start: number, length: number) => string }
  | { $substrCP: (input: string, start: number, length: number) => string }
  | { $toLower: (input: string) => string }
  | { $toString: <T>(input: T) => string }
  | {
      $trim: (
        input: StaticInput<{
          input: string;
          chars?: string;
        }>
      ) => string;
    }
  | { $toUpper: (input: string) => string };
