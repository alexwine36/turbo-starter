import type { TRPCContextInnerWithSession } from '@repo/trpc/src/server/create-context';
import type { CompanyUpdateSchema } from './company-update-schema'
import { z } from 'zod';
import { formatCompanyData,
companySelectFields
 } from "@repo/common-types";

type CompanyUpdateOptions = {
    ctx: TRPCContextInnerWithSession;
    input: CompanyUpdateSchema;
}

export const companyUpdateHandler = async ({ ctx, input }: CompanyUpdateOptions) => {

    const { prisma, session } = ctx;
    
    const res = await prisma.company.update({
          where: {
            id: input.id
          },
          data: {...input},
          ...companySelectFields
        });
    return formatCompanyData(res);
}

export type CompanyUpdateResponse = Awaited<ReturnType<typeof companyUpdateHandler>>;