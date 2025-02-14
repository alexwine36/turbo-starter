import authedProcedure from '@repo/trpc/src/server/procedures/authed-procedure';
import { router } from '@repo/trpc/src/server/trpc';
import { companyCreateHandler } from './company-create-handler';
import { CompanyCreateSchema } from './company-create-schema';
import { companyDeleteHandler } from './company-delete-handler';
import { CompanyDeleteSchema } from './company-delete-schema';
import { companyGetAllHandler } from './company-get-all-handler';
import { CompanyGetAllSchema } from './company-get-all-schema';
import { companyGetOneHandler } from './company-get-one-handler';
import { CompanyGetOneSchema } from './company-get-one-schema';
import { companyUpdateHandler } from './company-update-handler';
import { CompanyUpdateSchema } from './company-update-schema';

// Imports

export const companyRouter = router({
  // Handlers

  delete: authedProcedure
    .input(CompanyDeleteSchema)
    .mutation(companyDeleteHandler),

  update: authedProcedure
    .input(CompanyUpdateSchema)
    .mutation(companyUpdateHandler),

  create: authedProcedure
    .input(CompanyCreateSchema)
    .mutation(companyCreateHandler),

  getOne: authedProcedure
    .input(CompanyGetOneSchema)
    .query(companyGetOneHandler),

  getAll: authedProcedure
    .input(CompanyGetAllSchema)
    .query(companyGetAllHandler),
});
