// import { initTRPC } from '@trpc/server';
// import superjson from 'superjson';
import { PrismaClient } from '@repo/database';
import { appRouter } from '@repo/trpc/src/server/routers/_app';
import { createCallerFactory } from '@repo/trpc/src/server/trpc';
import { formatTestUserContext, getTestContext } from './get-context';
import { formatUser } from './get-user';
import type { TestUserTypes } from './types';

const prisma = new PrismaClient();

export const getTestCaller = async (userType: TestUserTypes) => {
  const createCaller = createCallerFactory(appRouter);
  const ctx = await getTestContext(userType, prisma);

  const caller = createCaller(ctx);
  const refreshCaller = async () => {
    const { session } = ctx;
    if (session?.user) {
      const dbUser = await prisma.user.findFirst({
        where: {
          email: session?.user.email,
        },
      });
      const user = await formatUser(dbUser, prisma);
      const newCtx = formatTestUserContext(user, prisma);

      return createCaller(newCtx);
    }
    return caller;
  };

  return { caller, refreshCaller };
};
