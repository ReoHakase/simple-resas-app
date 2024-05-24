import { z } from 'zod';

export const prefCodeSchema = z.string().regex(/^\d+$/);
export const prefCodesSchema = z.array(prefCodeSchema);
export type PrefCode = `${number}`;

export type PrefLocale = Record<PrefCode, string>;
