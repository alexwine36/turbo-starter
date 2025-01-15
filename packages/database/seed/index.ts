import { faker } from '@faker-js/faker';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

(async () => {
  try {
    const pages = await Promise.all(
      ['index', 'about', 'contact'].map(async (page) => {
        const p = await prisma.page.findFirst({
          where: {
            name: page,
          },
        });
        if (p) {
          return p;
        }
        return await prisma.page.create({
          data: {
            name: page,
            email: faker.internet.email(),
          },
        });
      })
    );
  } catch (error) {
    console.error(error);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
})();
