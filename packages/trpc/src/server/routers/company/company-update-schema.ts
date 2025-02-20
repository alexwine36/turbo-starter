import { CompanyUpdateInput } from '@repo/common-types';
import type { z } from 'zod';

export const CompanyUpdateSchema = CompanyUpdateInput;

export type CompanyUpdateSchema = z.infer<typeof CompanyUpdateSchema>;
