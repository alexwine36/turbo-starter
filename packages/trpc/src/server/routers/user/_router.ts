import authedProcedure from '@repo/trpc/src/server/procedures/authed-procedure';
import { router } from '@repo/trpc/src/server/trpc';
import { userMeHandler } from './user-me-handler';
import { UserMeSchema } from './user-me-schema';
import { userSetOrgHandler } from './user-set-org-handler';
import { UserSetOrgSchema } from './user-set-org-schema';

// Imports

export const userRouter = router({
  // Handlers

  setCurrentOrg: authedProcedure
    .input(UserSetOrgSchema)
    .mutation(userSetOrgHandler),

  me: authedProcedure.input(UserMeSchema).query(userMeHandler),
});
