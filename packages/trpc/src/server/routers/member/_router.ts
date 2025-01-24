import authedProcedure from '@/server/procedures/authed-procedure';
import { router } from '@/server/trpc';

// Imports

import { GetAllSchema } from './get-all-schema'
import { getAllHandler } from './get-all-handler'
export const memberRouter = router({
    // Handlers

getAll: authedProcedure.input(GetAllSchema).query(getAllHandler),
});