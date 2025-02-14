import { z } from "zod";
import { CompanyUpdateInput } from "@repo/common-types";

export const CompanyUpdateSchema =
CompanyUpdateInput;

export type CompanyUpdateSchema = z.infer<typeof CompanyUpdateSchema>;