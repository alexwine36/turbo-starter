import type { TRPCContextInnerWithSession } from '@repo/trpc/src/server/create-context';
import type { CompanyCreateSchema } from './company-create-schema'
import { z } from 'zod';
import { formatCompanyData,
companySelectFields
 } from "@repo/common-types";

type CompanyCreateOptions = {
    ctx: TRPCContextInnerWithSession;
    input: CompanyCreateSchema;
}

export const companyCreateHandler = async ({ ctx, input }: CompanyCreateOptions) => {

    const { prisma, session } = ctx;
    
    const res = await prisma.company.create({
          data: {...input},
          ...companySelectFields
        });
    return formatCompanyData(res);
}

export type CompanyCreateResponse = Awaited<ReturnType<typeof companyCreateHandler>>;