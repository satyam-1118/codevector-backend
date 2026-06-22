const getProducts = (req, res) => {
    res.json({
        success: true,
        message: "Products API Working 🚀",
    });
};

module.exports = {
    getProducts,
};