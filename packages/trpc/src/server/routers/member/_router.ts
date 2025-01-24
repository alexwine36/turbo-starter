import authedProcedure from '@/server/procedures/authed-procedure';
import { router } from '@/server/trpc';

// Imports

import { getAllHandler } from './get-all-handler';
import { GetAllSchema } from './get-all-schema';
export const memberRouter = router({
  // Handlers

  getAll: authedProcedure.input(GetAllSchema).query(getAllHandler),
});
