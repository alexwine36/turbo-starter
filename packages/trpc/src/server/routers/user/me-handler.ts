import type { TRPCContextInner } from '@/server/createContext';
import type { MeSchema } from './me-schema.ts';

type MeOptions = {
  ctx: TRPCContextInner;
  input: MeSchema;
};

export const meHandler = async ({ ctx, input }: MeOptions) => {
  const { prisma, session } = ctx;

  return session?.user;
};

export type MeResponse = ReturnType<typeof meHandler>;
