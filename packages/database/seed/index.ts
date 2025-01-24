import { faker } from '@faker-js/faker';
import { type Organization, type Prisma, PrismaClient } from '@prisma/client';
import type { Ops } from '@repo/rich-text';

const prisma = new PrismaClient();

const getOrganization = async (
  data: Omit<Prisma.OrganizationCreateInput, 'type'>
) => {
  const org = await prisma.organization.findFirst({
    where: {
      name: data.name,
    },
  });
  if (org) {
    return org;
  }
  return prisma.organization.create({
    data: {
      ...data,
      type: 'Something',
      members: {
        create: {
          role: 'OWNER',
          email: 'alexwine36@gmail.com',
        },
      },
    },
  });
};

const seedMembers = async (org: Organization) => {
  const members = await prisma.member.count({
    where: {
      organizationId: org.id,
    },
  });
  if (members > 5) {
    return;
  }

  new Array(faker.number.int({ min: 5, max: 10 })).fill(0).map(async () => {
    await prisma.member.create({
      data: {
        role: faker.helpers.arrayElement(['ADMIN', 'MEMBER']),
        email: faker.internet.email(),
        organizationId: org.id,
      },
    });
  });
};

const contentGenerate = (): Ops => {
  const type = faker.helpers.arrayElement(['heading', 'list', 'text']);
  switch (type) {
    case 'heading':
      return [
        {
          insert: faker.lorem.sentence(),
        },
        {
          insert: '\n',
          attributes: {
            header: faker.helpers.arrayElement([1, 2, 3, 4, 5]),
          },
        },
      ];
    case 'list':
      return [
        {
          insert: faker.lorem.sentence(),
        },
        {
          insert: '\n',
          attributes: {
            list: faker.helpers.arrayElement(['bullet', 'ordered']),
          },
        },
      ];
    default:
      return [
        {
          insert: faker.lorem.sentence(),
          attributes: {
            bold: faker.datatype.boolean(),
            italic: faker.datatype.boolean(),
            underline: faker.datatype.boolean(),
            strike: faker.datatype.boolean(),
            // color: faker.helpers.arrayElement(['gray', 'red', 'green', 'blue']),
          },
        },
      ];
  }
};

const generatePageContent = (): Ops => {
  const ops: Ops = [];
  new Array(5).fill(0).map((_, idx) => {
    if (idx > 0) {
      ops.push({
        insert: '\n',
      });
    }
    contentGenerate().forEach((op) => {
      ops.push(op);
    });
  });

  return ops;
};

(async () => {
  try {
    const org = await getOrganization({
      name: 'Acme Inc.',
      slug: 'acme-inc',
    });
    await seedMembers(org);
    const _otherOrg = await getOrganization({
      name: "Bob's Burgers",
      slug: 'bobs-burgers',
    });
    const _pages = await Promise.all(
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
            content: generatePageContent() as Prisma.JsonArray,
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
