import authedProcedure from '@repo/trpc/src/server/procedures/authed-procedure';
import { OrganizationUpdateSchema } from './organization-update-schema'
import { organizationUpdateHandler } from './organization-update-handler'
import { OrganizationCreateSchema } from './organization-create-schema'
import { organizationCreateHandler } from './organization-create-handler'
import { OrganizationGetOneSchema } from './organization-get-one-schema'
import { organizationGetOneHandler } from './organization-get-one-handler'
import { OrganizationGetAllSchema } from './organization-get-all-schema'
import { organizationGetAllHandler } from './organization-get-all-handler'
import { router } from '@repo/trpc/src/server/trpc';

// Imports

export const organizationRouter = router({
// Handlers

update: authedProcedure.input(OrganizationUpdateSchema).mutation(organizationUpdateHandler),

create: authedProcedure.input(OrganizationCreateSchema).mutation(organizationCreateHandler),

getOne: authedProcedure.input(OrganizationGetOneSchema).query(organizationGetOneHandler),

getAll: authedProcedure.input(OrganizationGetAllSchema).query(organizationGetAllHandler),
});