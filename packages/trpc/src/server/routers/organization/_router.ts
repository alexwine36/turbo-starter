import authedProcedure, {
  authedOrgMemberProcedure,
} from '@repo/trpc/src/server/procedures/authed-procedure';
import { router } from '@repo/trpc/src/server/trpc';
import { organizationCreateHandler } from './organization-create-handler';
import { OrganizationCreateSchema } from './organization-create-schema';
import { organizationGetAllHandler } from './organization-get-all-handler';
import { OrganizationGetAllSchema } from './organization-get-all-schema';
import { organizationGetOneHandler } from './organization-get-one-handler';
import { OrganizationGetOneSchema } from './organization-get-one-schema';
import { organizationUpdateHandler } from './organization-update-handler';
import { OrganizationUpdateSchema } from './organization-update-schema';

// Imports

export const organizationRouter = router({
  // Handlers

  update: authedOrgMemberProcedure
    .input(OrganizationUpdateSchema)
    .mutation(organizationUpdateHandler),

  create: authedProcedure
    .input(OrganizationCreateSchema)
    .mutation(organizationCreateHandler),

  getOne: authedProcedure
    .input(OrganizationGetOneSchema)
    .query(organizationGetOneHandler),

  getAll: authedOrgMemberProcedure
    .input(OrganizationGetAllSchema)
    .query(organizationGetAllHandler),
});
