import { z } from 'zod';
import { OrganizationSchema } from './generated';

export const OrganizationData = OrganizationSchema.extend({
  // Update base types here
});

export type OrganizationData = z.infer<typeof OrganizationData>;

export const OrganizationUpdateInput = OrganizationData.omit({
  createdAt: true,
  updatedAt: true,
  // organizationId: true,
});

export type OrganizationUpdateInput = z.infer<typeof OrganizationUpdateInput>;

export const OrganizationInput = OrganizationUpdateInput.partial({
  id: true
});
export type OrganizationInput = z.infer<typeof OrganizationInput>;
