import { z } from "zod";

export const GetOneSchema = z.object({
    // Define your schema here
})

export type GetOneSchema = z.infer<typeof GetOneSchema>;