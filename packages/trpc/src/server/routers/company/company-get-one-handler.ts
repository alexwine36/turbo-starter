import { companySelectFields, formatCompanyData } from '@repo/common-types';
import type { TRPCContextInnerWithSession } from '@repo/trpc/src/server/create-context';
import { TRPCError } from '@trpc/server';
import type { CompanyGetOneSchema } from './company-get-one-schema';

type CompanyGetOneOptions = {
  ctx: TRPCContextInnerWithSession;
  input: CompanyGetOneSchema;
};

export const companyGetOneHandler = async ({
  ctx,
  input,
}: CompanyGetOneOptions) => {
  const { prisma, session } = ctx;

  const res = await prisma.company.findFirst({
    where: {
      id: input.id,
    },
    ...companySelectFields,
  });
  if (!res) {
    throw new TRPCError({
      code: 'NOT_FOUND',
      message: 'Company not found',
    });
  }
  return formatCompanyData(res);
};

export type CompanyGetOneResponse = Awaited<
  ReturnType<typeof companyGetOneHandler>
>;
