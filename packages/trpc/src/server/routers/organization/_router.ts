import { router } from '@/src/server/trpc';
import authedProcedure from '../../procedures/authedProcedure';
// Imports

import { getOneHandler } from './get-one-handler';
import { GetOneSchema } from './get-one-schema';
export const organizationRouter = router({
  // Handlers

  getOne: authedProcedure.input(GetOneSchema).query(getOneHandler),

  getAll: authedProcedure.query(async ({ ctx }) => {
    const data = await ctx.prisma.page.findMany();
    const orgs = await ctx.prisma.user.findMany();
    return {
      data,
      orgs,
    };
  }),
});
