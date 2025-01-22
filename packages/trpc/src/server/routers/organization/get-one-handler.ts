import type { TRPCContextInner } from '@/src/server/createContext';
import type { GetOneSchema } from './get-one-schema.ts';

type GetOneOptions = {
  ctx: TRPCContextInner;
  input: GetOneSchema;
};

export const getOneHandler = async ({ ctx, input }: GetOneOptions) => {
  const { prisma, session } = ctx;

  const res = await prisma.user.findMany();

  return res;
};

export type GetOneResponse = ReturnType<typeof getOneHandler>;
