import { PrismaClient } from "./generated/prisma";

const prisma = new PrismaClient();

async function main() {
  console.log("Seeding database...");

  // Create categories
  const categories = [
    { name: "Sayuran" },
    { name: "Buah" },
    { name: "Rempah" },
    { name: "Umbi" },
    { name: "Biji-bijian" },
    { name: "Lain" },
  ];

  for (const category of categories) {
    await prisma.category.upsert({
      where: { name: category.name },
      update: {},
      create: category,
    });
    console.log(`✓ Created category: ${category.name}`);
  }

  console.log("Seeding completed!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
