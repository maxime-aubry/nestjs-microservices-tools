import { PrismaClient } from "@prisma/client";

const prisma: PrismaClient = new PrismaClient();

async function main(): Promise<void> {
    // await prisma.user.createMany({
    //     data: [
    //         {
    //             username: 'user1',
    //         },
    //         {
    //             username: 'user2',
    //         },
    //     ],
    // });
};

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  })