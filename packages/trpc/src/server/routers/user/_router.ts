import authedProcedure from '@/server/procedures/authedProcedure';
import { router } from '@/server/trpc';

// Imports

import { meHandler } from './me-handler';
import { MeSchema } from './me-schema';
export const userRouter = router({
  // Handlers

  me: authedProcedure.input(MeSchema).query(meHandler),
});
