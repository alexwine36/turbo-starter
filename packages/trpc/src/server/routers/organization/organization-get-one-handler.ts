import { formatOrganizationData } from '@repo/common-types';
import type { TRPCContextInnerWithSession } from '@repo/trpc/src/server/create-context';
import { TRPCError } from '@trpc/server';
import type { OrganizationGetOneSchema } from './organization-get-one-schema';

type OrganizationGetOneOptions = {
  ctx: TRPCContextInnerWithSession;
  input: OrganizationGetOneSchema;
};

export const organizationGetOneHandler = async ({
  ctx,
  input,
}: OrganizationGetOneOptions) => {
  const { prisma, session } = ctx;

  const res = await prisma.organization.findFirst({
    where: {
      id: input.id,
      members: {
        some: {
          email: session?.user.email,
        },
      },
    },
  });
  if (!res) {
    throw new TRPCError({
      code: 'NOT_FOUND',
      message: 'Organization not found',
    });
  }
  return formatOrganizationData(res);
};

export type OrganizationGetOneResponse = Awaited<
  ReturnType<typeof organizationGetOneHandler>
>;
