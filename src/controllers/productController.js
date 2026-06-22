const prisma = require("../config/prisma");

const getProducts = async (req, res) => {
  try {
    const limit = parseInt(req.query.limit) || 20;
    const category = req.query.category;

    const cursorUpdatedAt = req.query.cursorUpdatedAt;
    const cursorId = req.query.cursorId;

    const where = {};

    // Category Filter
    if (category) {
      where.category = category;
    }

    // Seek Pagination
    if (cursorUpdatedAt && cursorId) {
      where.OR = [
        {
          updated_at: {
            lt: new Date(cursorUpdatedAt),
          },
        },
        {
          updated_at: new Date(cursorUpdatedAt),
          id: {
            lt: cursorId,
          },
        },
      ];
    }

    const products = await prisma.product.findMany({
      where,
      orderBy: [
        {
          updated_at: "desc",
        },
        {
          id: "desc",
        },
      ],
      take: limit + 1,
    });

    let hasNextPage = false;
    let nextCursor = null;

    if (products.length > limit) {
      hasNextPage = true;

      const last = products[limit - 1];

      nextCursor = {
        cursorUpdatedAt: last.updated_at,
        cursorId: last.id,
      };

      products.pop();
    }

    res.status(200).json({
      success: true,
      count: products.length,
      hasNextPage,
      nextCursor,
      data: products,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

module.exports = {
  getProducts,
};