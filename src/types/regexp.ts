export type RegExpOption = 'i' | 'm' | 'x' | 's' | 'u';

export type RegExpResult = {
  match: string;
  idx: number;
  captures: string[];
};
