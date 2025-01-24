import authedProcedure from '@/server/procedures/authed-procedure';
import { router } from '@/server/trpc';

// Imports

import { CompanyGetAllSchema } from './company-get-all-schema'
import { companyGetAllHandler } from './company-get-all-handler'
export const companyRouter = router({
    // Handlers

getAll: authedProcedure.input(CompanyGetAllSchema).query(companyGetAllHandler),
});