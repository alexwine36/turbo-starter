import authedProcedure from '@/server/procedures/authed-procedure';
import { router } from '@/server/trpc';

// Imports

import { companyGetAllHandler } from './company-get-all-handler';
import { CompanyGetAllSchema } from './company-get-all-schema';
export const companyRouter = router({
  // Handlers

  getAll: authedProcedure
    .input(CompanyGetAllSchema)
    .query(companyGetAllHandler),
});
