import { z } from 'zod';

export const GetOneSchema = z.object({
  // Define your schema here
  id: z.string().cuid(),
});

export type GetOneSchema = z.infer<typeof GetOneSchema>;
