const { PrismaClient } = require("@prisma/client");
const { faker } = require("@faker-js/faker");

const prisma = new PrismaClient();

function getRandomCategory(categories) {
  const randomIndex = Math.floor(Math.random() * categories.length);
  return categories[randomIndex];
}

async function main() {
  console.log("🌱 Seed started...");

  // Delete old data
  await prisma.product.deleteMany();
  console.log("🗑 Old products deleted...");

  // Test values
  const TOTAL_PRODUCTS = 200000;
  const BATCH_SIZE = 1000;

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

  for (let batch = 0; batch < TOTAL_PRODUCTS / BATCH_SIZE; batch++) {
    const products = [];

    for (let i = 0; i < BATCH_SIZE; i++) {
      const product = {
        name: faker.commerce.productName(),
        category: getRandomCategory(categories),
        price: Number(faker.commerce.price()),
      };

      products.push(product);
    }

    const result = await prisma.product.createMany({
      data: products,
    });

    console.log(
      `✅ Batch ${batch + 1} completed - Inserted ${result.count} products`
    );
  }

  console.log("🎉 Seeding completed successfully!");
}

main()
  .catch((error) => {
    console.error("❌ Error:", error);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });