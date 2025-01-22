import type { TRPCContextInner } from '@/server/createContext';
import type { GetAllSchema } from './get-all-schema.ts';

type GetAllOptions = {
  ctx: TRPCContextInner;
  input: GetAllSchema;
};

export const getAllHandler = async ({ ctx, input }: GetAllOptions) => {
  const { prisma, session } = ctx;

  const res = await prisma.organization.findMany();

  return res;
};

export type GetAllResponse = ReturnType<typeof getAllHandler>;
