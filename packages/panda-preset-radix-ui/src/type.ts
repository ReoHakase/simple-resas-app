export type GetName = (words: string[]) => string;

export type SelectorNameCase = 'camelCase' | 'kebab-case' | 'kebab_case';

export type GetCaseNames = Record<SelectorNameCase, GetName>;

export type PandaPresetRadixCssSelectorOptions = {
  prefix: string;
  selectorNameCase: SelectorNameCase;
};
