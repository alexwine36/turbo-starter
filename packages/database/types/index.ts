import { z } from 'zod';
import { CompanySchema, OrganizationSchema } from './generated';

export const OrganizationUpdateInput = OrganizationSchema.omit({
  createdAt: true,
  updatedAt: true,
  //   social: true,
});
export type OrganizationUpdateInput = z.infer<typeof OrganizationUpdateInput>;
export const OrganizationInput = OrganizationUpdateInput.partial({
  id: true,
});
export type OrganizationInput = z.infer<typeof OrganizationInput>;

export const Social = z
  .object({
    facebook: z.string().optional().nullable(),
    twitter: z.string().optional().nullable(),
    linkedin: z.string().optional().nullable(),
    instagram: z.string().optional().nullable(),
    youtube: z.string().optional().nullable(),
    other: z.string().optional().nullable(),
  })
  .default({});

export const CompanyData = CompanySchema.extend({
  social: Social.optional().nullable().default({}),
});

export const CompanyUpdateInput = CompanyData.omit({
  createdAt: true,
  updatedAt: true,
});

export type CompanyUpdateInput = z.infer<typeof CompanyUpdateInput>;
export const CompanyInput = CompanyUpdateInput.partial({
  id: true,
  image: true,
});
export type CompanyInput = z.infer<typeof CompanyInput>;

export type CompanyData = z.infer<typeof CompanyData>;
