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
};

export type GetAllResponse = ReturnType<typeof getAllHandler>;
