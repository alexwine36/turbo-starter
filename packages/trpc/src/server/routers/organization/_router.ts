import { router } from '@/server/trpc';
import authedProcedure from '../../procedures/authedProcedure';
// Imports

import { createHandler } from './create-handler';
import { CreateSchema } from './create-schema';
import { getAllHandler } from './get-all-handler';
import { GetAllSchema } from './get-all-schema';
import { getOneHandler } from './get-one-handler';
import { GetOneSchema } from './get-one-schema';
import { updateHandler } from './update-handler';
import { UpdateSchema } from './update-schema';
export const organizationRouter = router({
  // Handlers

  update: authedProcedure.input(UpdateSchema).mutation(updateHandler),

  getAll: authedProcedure.input(GetAllSchema).query(getAllHandler),

  create: authedProcedure.input(CreateSchema).mutation(createHandler),

  getOne: authedProcedure.input(GetOneSchema).query(getOneHandler),

  // getAll: authedProcedure.query(async ({ ctx }) => {
  //   const data = await ctx.prisma.page.findMany();
  //   const orgs = await ctx.prisma.user.findMany();
  //   return {
  //     data,
  //     orgs,
  //   };
  // }),
});
