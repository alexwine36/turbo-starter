import { z } from "zod";
import { OrganizationUpdateInput } from "@repo/common-types";

export const OrganizationUpdateSchema =
OrganizationUpdateInput;

export type OrganizationUpdateSchema = z.infer<typeof OrganizationUpdateSchema>;