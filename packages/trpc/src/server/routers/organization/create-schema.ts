import { z } from 'zod';

export const CreateSchema = z.object({
  // Define your schema here
  name: z.string(),
  slug: z.string().optional(),
});

export type CreateSchema = z.infer<typeof CreateSchema>;
