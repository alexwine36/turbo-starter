import { router } from '@repo/trpc/src/server/trpc';
import { userRouter } from './user/_router';

import { organizationRouter } from './organization/_router';

import { companyRouter } from './company/_router';

import { z } from 'zod';
import publicProcedure from '../procedures/public-procedure';

export const appRouter = router({
  hello: publicProcedure
    .input(
      z.object({
        text: z.string(),
      })
    )
    .query(({ input, ctx }) => {
      return {
        greeting: `hello ${input.text}`,
      };
    }),
  // Handlers

  user: userRouter,

  organization: organizationRouter,

  company: companyRouter,
});
// export type definition of API
export type AppRouter = typeof appRouter;
