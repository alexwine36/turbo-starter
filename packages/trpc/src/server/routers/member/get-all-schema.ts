import { z } from "zod";

export const GetAllSchema = z.object({
    // Define your schema here
})

export type GetAllSchema = z.infer<typeof GetAllSchema>;