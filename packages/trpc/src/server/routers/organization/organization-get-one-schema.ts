import { z } from 'zod';

export const OrganizationGetOneSchema = z.object({
  // Define your schema here
  id: z.string().nonempty(),
});

export type OrganizationGetOneSchema = z.infer<typeof OrganizationGetOneSchema>;
