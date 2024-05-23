import { z } from 'zod';

import { prefCodeSchema } from './prefCode';
import type { Year } from './year';

export const dataPointValueRecordSchema = z.record(prefCodeSchema, z.number().min(0).nullable());
export type DataPointValueRecord = z.infer<typeof dataPointValueRecordSchema>;

export type DataPoint = {
  year: Year;
} & DataPointValueRecord;
