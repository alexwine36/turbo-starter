import { z } from 'zod';

export const UserMeSchema = z.object({
  // Define your schema here
});

export type UserMeSchema = z.infer<typeof UserMeSchema>;
