import type { TRPCContextInnerWithSession } from '@repo/trpc/src/server/create-context';
import type { UserSetOrgSchema } from './user-set-org-schema';

type UserSetOrgOptions = {
  ctx: TRPCContextInnerWithSession;
  input: UserSetOrgSchema;
};

export const userSetOrgHandler = async ({ ctx, input }: UserSetOrgOptions) => {
  const { prisma, session } = ctx;

  if (!session) {
    throw new Error('Unauthorized');
  }

  const requestedOrg = await prisma.member.findFirst({
    where: {
      email: session.user.email,
      organizationId: input.organizationId,
    },
  });
  if (!requestedOrg) {
    throw new Error('Unauthorized');
  }

  const res = await prisma.user.update({
    where: {
      email: session.user.email,
    },
    data: {
      currentOrganizationId: input.organizationId,
    },
  });

  return res;
};

export type UserSetOrgResponse = Awaited<ReturnType<typeof userSetOrgHandler>>;
