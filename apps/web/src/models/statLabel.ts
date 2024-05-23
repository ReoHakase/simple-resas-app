import { z } from 'zod';

export const statLabels = ['all', 'young', 'productive', 'elderly'] as const satisfies string[];
export const statLabelSchema = z.enum(statLabels);
export type StatLabel = z.infer<typeof statLabelSchema>;

export type StatLabelLocale = Record<StatLabel, string>;
export const statLabelLocaleJa = {
  all: '総人口',
  young: '年少人口',
  productive: '生産年齢人口',
  elderly: '老年人口',
} satisfies StatLabelLocale;
