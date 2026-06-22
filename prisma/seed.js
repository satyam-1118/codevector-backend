const { PrismaClient } = require("@prisma/client");
const { faker } = require("@faker-js/faker");

const prisma = new PrismaClient();

const categories = [
  "Electronics",
  "Fashion",
  "Books",
  "Home",
  "Sports",
  "Beauty",
  "Toys",
  "Grocery",
];

function getRandomCategory() {
  return categories[Math.floor(Math.random() * categories.length)];
}

function getRandomDate() {
  const now = new Date();
  const past = new Date();
  past.setFullYear(now.getFullYear() - 2);

  return faker.date.between({
    from: past,
    to: now,
  });
}

async function main() {
  console.log("🌱 Seed Started...");
  console.time("Seed Time");

  // Delete existing data
  await prisma.product.deleteMany();

  // Change these after testing
  const TOTAL_PRODUCTS = 200000;
  const BATCH_SIZE = 1000;

  let totalInserted = 0;

  for (let batch = 0; batch < TOTAL_PRODUCTS / BATCH_SIZE; batch++) {
    const products = [];

    for (let i = 0; i < BATCH_SIZE; i++) {
      const createdAt = getRandomDate();

      products.push({
        name: faker.commerce.productName(),
        category: getRandomCategory(),
        price: Number(faker.commerce.price()),
        created_at: createdAt,
        updated_at: faker.date.between({
          from: createdAt,
          to: new Date(),
        }),
      });
    }

    const result = await prisma.product.createMany({
      data: products,
    });

    totalInserted += result.count;

    console.log(
      `✅ Batch ${batch + 1}/${TOTAL_PRODUCTS / BATCH_SIZE} | ${result.count} inserted`
    );
  }

  console.log(`🎉 Total Inserted : ${totalInserted}`);
  console.timeEnd("Seed Time");
}

main()
  .catch((err) => {
    console.error(err);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });