import { z } from 'zod';

export const CompanyGetOneSchema = z.object({
  // Define your schema here
  id: z.string().nonempty(),
});

export type CompanyGetOneSchema = z.infer<typeof CompanyGetOneSchema>;
