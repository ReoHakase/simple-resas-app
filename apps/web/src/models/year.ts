import { z } from 'zod';

export const yearSchema = z.number().int().min(1900).max(2100);
export type Year = z.infer<typeof yearSchema>;
