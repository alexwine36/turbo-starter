import type { TRPCContextInnerWithSession } from '@repo/trpc/src/server/create-context';
import type { OrganizationGetAllSchema } from './organization-get-all-schema';

type OrganizationGetAllOptions = {
  ctx: TRPCContextInnerWithSession;
  input: OrganizationGetAllSchema;
};

export const organizationGetAllHandler = async ({
  ctx,
  input,
}: OrganizationGetAllOptions) => {
  const { prisma, session } = ctx;

  const res = await prisma.member.findMany({
    where: {
      email: session?.user.email,
    },
    select: {
      role: true,
      organization: true,
    },
  });

  return res.map((member) => {
    const { organization, ...rest } = member;
    return {
      ...organization,
      ...rest,
    };
  });
  // return res.map(formatOrganizationData);
};

export type OrganizationGetAllResponse = Awaited<
  ReturnType<typeof organizationGetAllHandler>
>;
