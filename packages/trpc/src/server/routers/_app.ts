import { router } from '@repo/trpc/src/server/trpc';

import { z } from 'zod';
import publicProcedure from '../procedures/public-procedure';

import { userRouter } from './user/_router';



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

  
});
// export type definition of API
export type AppRouter = typeof appRouter;
