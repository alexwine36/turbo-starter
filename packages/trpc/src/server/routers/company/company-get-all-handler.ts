import type { TRPCContextInnerWithSession } from '@/server/create-context';
import type { CompanyGetAllSchema } from './company-get-all-schema.ts';

type CompanyGetAllOptions = {
  ctx: TRPCContextInnerWithSession;
  input: CompanyGetAllSchema;
};

export const companyGetAllHandler = async ({
  ctx,
  input,
}: CompanyGetAllOptions) => {
  const { prisma, session } = ctx;

  const res = await prisma.company.findMany({
    where: {
      organizationId: session?.user.currentOrganizationId,
    },
  });

  return res;
};

export type CompanyGetAllResponse = Awaited<
  ReturnType<typeof companyGetAllHandler>
>;
