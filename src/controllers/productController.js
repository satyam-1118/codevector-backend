const prisma = require("../config/prisma");

const getProducts = async (req, res) => {
    try {

        const products = await prisma.product.findMany({
            take: 20,
            orderBy: {
                updated_at: "desc"
            }
        });

        res.status(200).json({
            success: true,
            count: products.length,
            data: products
        });

    } catch (error) {

        console.error(error);

        res.status(500).json({
            success: false,
            message: "Internal Server Error"
        });

    }
};

module.exports = {
    getProducts
};