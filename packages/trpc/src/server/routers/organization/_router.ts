import { router } from '@/src/server/trpc';
import publicProcedure from '../../procedures/publicProcedure';

// Imports

export const organizationRouter = router({
  // Handlers
  getAll: publicProcedure.query(async ({ ctx }) => {
    const data = await ctx.prisma.page.findMany();
    const orgs = await ctx.prisma.user.findMany();
    return {
      data,
      orgs,
    };
  }),
});
