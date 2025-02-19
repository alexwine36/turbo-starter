import type { TRPCContextInnerWithSession } from '@repo/trpc/src/server/create-context';
import type { UserMeSchema } from './user-me-schema';

type UserMeOptions = {
  ctx: TRPCContextInnerWithSession;
  input: UserMeSchema;
};

export const userMeHandler = async ({ ctx, input }: UserMeOptions) => {
  const { prisma, session } = ctx;

  return session?.user;
};

export type UserMeResponse = Awaited<ReturnType<typeof userMeHandler>>;
