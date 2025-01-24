import type { TRPCContextInner } from '@/server/create-context';
import type { GetAllSchema } from './get-all-schema.ts';

type GetAllOptions = {
  ctx: TRPCContextInner;
  input: GetAllSchema;
};

export const getAllHandler = async ({ ctx, input }: GetAllOptions) => {
  const { prisma, session } = ctx;

  const res = await prisma.member.findMany({
    where: {
      organizationId: session?.user.currentOrganizationId,
    },
    include: {
      user: {
        select: {
          name: true,
          image: true,
        },
      },
    },
  });

  return res.map((member) => {
    const { user, ...rest } = member;
    return {
      ...rest,
      name: user?.name,
      image: user?.image,
    };
  });
};

export type GetAllResponse = ReturnType<typeof getAllHandler>;
