const { PrismaClient } = require("@prisma/client");
const { faker } = require("@faker-js/faker");

const prisma = new PrismaClient();

function getRandomCategory(categories) {
  const randomIndex = Math.floor(Math.random() * categories.length);
  return categories[randomIndex];
}

async function main() {
    console.log("🌱 Seed started...");
    const products = [];
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

  for (let i = 0; i < 10; i++) {

    const product = {

        name: faker.commerce.productName(),

        category: getRandomCategory(categories),

        price: Number(faker.commerce.price())

    };

    products.push(product);

}

console.log(products);
}

main()
    .catch((error) => {
        console.error(error);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });