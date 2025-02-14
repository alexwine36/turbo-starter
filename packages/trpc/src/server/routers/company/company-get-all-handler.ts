import type { TRPCContextInnerWithSession } from '@repo/trpc/src/server/create-context';
import type { CompanyGetAllSchema } from './company-get-all-schema'
import { z } from 'zod';
import { formatCompanyData,
companySelectFields
 } from "@repo/common-types";

type CompanyGetAllOptions = {
    ctx: TRPCContextInnerWithSession;
    input: CompanyGetAllSchema;
}

export const companyGetAllHandler = async ({ ctx, input }: CompanyGetAllOptions) => {

    const { prisma, session } = ctx;
    
    const res = await prisma.company.findMany({
          where: {
            ...input
          },
          ...companySelectFields
          });
    return res.map(formatCompanyData);
}

export type CompanyGetAllResponse = Awaited<ReturnType<typeof companyGetAllHandler>>;