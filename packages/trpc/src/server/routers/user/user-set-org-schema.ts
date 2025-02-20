import { z } from 'zod';

export const UserSetOrgSchema = z.object({
  // Define your schema here
  organizationId: z.string().cuid(),
});

export type UserSetOrgSchema = z.infer<typeof UserSetOrgSchema>;
