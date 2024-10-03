import { PrismaClient } from '@prisma/client';
import * as argon2 from 'argon2';

const prisma = new PrismaClient();

async function populateDatabase() {
  const password = await argon2.hash('password');

  await prisma.userRole.create({
    data: {
      name: 'admin',
    },
  });
  await prisma.userRole.create({
    data: {
      name: 'boat-operator',
    },
  });
  await prisma.userRole.create({
    data: {
      name: 'customer',
    },
  });

  await prisma.user.create({
    data: {
      firstName: 'admin',
      lastName: 'account',
      email: `admin@domain.com`,
      password,
      userRoleId: 1,
    },
  });

  await prisma.user.create({
    data: {
      firstName: 'boat-operator',
      lastName: 'account',
      email: `boat-operator@domain.com`,
      password,
      userRoleId: 2,
    },
  });

  await prisma.user.create({
    data: {
      firstName: 'customer',
      lastName: 'account',
      email: `customer@domain.com`,
      password,
      userRoleId: 3,
    },
  });
}

async function seed() {
  await populateDatabase();
}

seed()
  .then(() => console.log('Prisma seeder ran succesfully'))
  .finally(() => prisma.$disconnect());
