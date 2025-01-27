import { CompanyInput } from '@repo/database/types';
import type { z } from 'zod';

export const CompanyCreateSchema = CompanyInput;

export type CompanyCreateSchema = z.infer<typeof CompanyCreateSchema>;
