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
      fullname: 'admin',
      username: 'admin',
      email: `admin@gmail.com`,
      password,
      userRoleId: 1,
    },
  });

  await prisma.user.create({
    data: {
      fullname: 'boat-operator',
      username: 'boat-operator',
      email: `boat-operator@gmail.com`,
      password,
      userRoleId: 2,
    },
  });

  await prisma.user.create({
    data: {
      fullname: 'Katig User',
      username: 'katig_user',
      email: 'katig_user@gmail.com',
      password: 'katig_userpass',
      userRoleId: 3,
    },
  });

  await prisma.user.create({
    data: {
      fullname: 'Katig User2',
      username: 'katig_user2',
      email: 'katig_user2@gmail.com',
      password: 'katig_userpass2',
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
