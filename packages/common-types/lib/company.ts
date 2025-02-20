import { z } from 'zod';
import { CompanySchema } from './generated';

export const CompanyData = CompanySchema.extend({
  // Update base types here
  // name: z.string().nonempty(),
  slug: z.string().nonempty(),
});

export type CompanyData = z.infer<typeof CompanyData>;

export const CompanyUpdateInput = CompanyData.omit({
  createdAt: true,
  updatedAt: true,
  // organizationId: true,
});

export type CompanyUpdateInput = z.infer<typeof CompanyUpdateInput>;

export const CompanyInput = CompanyUpdateInput.partial({
  id: true,
});
export type CompanyInput = z.infer<typeof CompanyInput>;
