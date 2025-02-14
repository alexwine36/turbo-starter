import { z } from 'zod';

export const CompanyDeleteSchema = z.object({
  // Define your schema here
  id: z.string().nonempty(),
});

export type CompanyDeleteSchema = z.infer<typeof CompanyDeleteSchema>;
