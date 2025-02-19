import {
  formatOrganizationData,
  organizationSelectFields,
} from '@repo/common-types';
import type { TRPCContextInnerWithSession } from '@repo/trpc/src/server/create-context';
import type { OrganizationCreateSchema } from './organization-create-schema';

type OrganizationCreateOptions = {
  ctx: TRPCContextInnerWithSession;
  input: OrganizationCreateSchema;
};

export const organizationCreateHandler = async ({
  ctx,
  input,
}: OrganizationCreateOptions) => {
  const { prisma, session } = ctx;

  const res = await prisma.organization.create({
    data: {
      ...input,
      members: {
        create: {
          role: 'OWNER',
          email: session.user.email,
        },
      },
    },
    ...organizationSelectFields,
  });
  await prisma.user.update({
    where: {
      email: session.user.email,
    },
    data: {
      currentOrganizationId: res.id,
    },
  });

  return formatOrganizationData(res);
};

export type OrganizationCreateResponse = Awaited<
  ReturnType<typeof organizationCreateHandler>
>;
