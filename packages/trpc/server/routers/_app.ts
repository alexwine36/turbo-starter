import { z } from 'zod';
import publicProcedure from '../procedures/publicProcedure';
import { router } from '../trpc';
export const appRouter = router({
  hello: publicProcedure
    .input(
      z.object({
        text: z.string(),
      })
    )
    .query(({ input, ctx }) => {
      console.log('SESSION', ctx.session);
      return {
        greeting: `hello ${input.text}`,
      };
    }),
});
// export type definition of API
export type AppRouter = typeof appRouter;
