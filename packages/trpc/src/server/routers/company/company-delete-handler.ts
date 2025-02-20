import type { TRPCContextInnerWithSession } from '@repo/trpc/src/server/create-context';
import type { CompanyDeleteSchema } from './company-delete-schema';

type CompanyDeleteOptions = {
  ctx: TRPCContextInnerWithSession;
  input: CompanyDeleteSchema;
};

export const companyDeleteHandler = async ({
  ctx,
  input,
}: CompanyDeleteOptions) => {
  const { prisma, session } = ctx;

  const res = await prisma.company.delete({
    where: {
      id: input.id,
    },
  });
  return res;
};

export type CompanyDeleteResponse = Awaited<
  ReturnType<typeof companyDeleteHandler>
>;
