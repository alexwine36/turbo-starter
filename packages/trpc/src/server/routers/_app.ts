import { router } from '@/src/server/trpc';
import { z } from 'zod';
import publicProcedure from '../procedures/publicProcedure';

// Imports

import { organizationRouter } from '@/src/server/routers/organization/_router'; //'./organization/_router';

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
  // Handlers

  organization: organizationRouter,
});
// export type definition of API
export type AppRouter = typeof appRouter;
