import { OrganizationUpdateInput } from '@repo/database/types';
import type { z } from 'zod';

export const UpdateSchema = OrganizationUpdateInput;

export type UpdateSchema = z.infer<typeof UpdateSchema>;
