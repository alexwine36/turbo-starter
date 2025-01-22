import type { TRPCContextInner } from '@/server/createContext';
import type { GetOneSchema } from './get-one-schema.ts';

type GetOneOptions = {
  ctx: TRPCContextInner;
  input: GetOneSchema;
};

export const getOneHandler = async ({ ctx, input }: GetOneOptions) => {
  const { prisma, session } = ctx;

  const res = await prisma.organization.findMany();

  return res;
};

export type GetOneResponse = ReturnType<typeof getOneHandler>;
