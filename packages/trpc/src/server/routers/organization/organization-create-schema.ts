import { z } from "zod";
import { OrganizationInput } from "@repo/common-types";

export const OrganizationCreateSchema =
OrganizationInput;

export type OrganizationCreateSchema = z.infer<typeof OrganizationCreateSchema>;