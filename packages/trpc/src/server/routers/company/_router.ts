import authedProcedure from '@repo/trpc/src/server/procedures/authed-procedure';
import { CompanyDeleteSchema } from './company-delete-schema'
import { companyDeleteHandler } from './company-delete-handler'
import { CompanyUpdateSchema } from './company-update-schema'
import { companyUpdateHandler } from './company-update-handler'
import { CompanyCreateSchema } from './company-create-schema'
import { companyCreateHandler } from './company-create-handler'
import { CompanyGetOneSchema } from './company-get-one-schema'
import { companyGetOneHandler } from './company-get-one-handler'
import { CompanyGetAllSchema } from './company-get-all-schema'
import { companyGetAllHandler } from './company-get-all-handler'
import { router } from '@repo/trpc/src/server/trpc';

// Imports

export const companyRouter = router({
// Handlers

delete: authedProcedure.input(CompanyDeleteSchema).mutation(companyDeleteHandler),

update: authedProcedure.input(CompanyUpdateSchema).mutation(companyUpdateHandler),

create: authedProcedure.input(CompanyCreateSchema).mutation(companyCreateHandler),

getOne: authedProcedure.input(CompanyGetOneSchema).query(companyGetOneHandler),

getAll: authedProcedure.input(CompanyGetAllSchema).query(companyGetAllHandler),
});