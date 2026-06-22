const { PrismaClient } = require("@prisma/client");
const { faker } = require("@faker-js/faker");

const prisma = new PrismaClient();

function getRandomCategory(categories) {
  const randomIndex = Math.floor(Math.random() * categories.length);
  return categories[randomIndex];
}

async function main() {
    console.log("🌱 Seed started...");
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

  const products = [];
  for (let i = 0; i < 10; i++) {

    const product = {

        name: faker.commerce.productName(),

        category: getRandomCategory(categories),

        price: Number(faker.commerce.price())

    };

    products.push(product);

}
const result = await prisma.product.createMany({
    data: products
});

console.log(result);

}

main()
    .catch((error) => {
        console.error(error);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });