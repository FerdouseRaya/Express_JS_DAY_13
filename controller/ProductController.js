const { validationResult } = require("express-validator");
const { success, failure } = require("../util/common");
const ProductModel = require("../model/Product");

class Product {
    async getAll(req, res) {
        try {
            const products = await ProductModel.find({}).limit(50).exec();
            if (products.length > 0) {
                return res.status(200).send(
                    success("Successfully received all products", {
                        result: products,
                        total: products.length,
                    })
                );
            }
            return res.status(400).send(failure("No products were found"));
        } catch (error) {
            console.log(error);
            return res
                .status(400)
                .send(failure("Internal server error"));
        }
    }

    async create(req, res) {
        try {
            const validation = validationResult(req).array();
            if (validation.length > 0) {
                return res
                    .status(400)
                    .send(failure("Failed to add the user", validation));
            }
            const { title, description, price, stock,discountPercentage,rating,category } = req.body;


            const user = await ProductModel.create({
                title: title,
                description: description,
                price: price,
                stock: stock,
                discountPercentage:discountPercentage,
                rating:rating,
                category:category
            });
            if (user) {
                return res
                    .status(200)
                    .send(success("Successfully added the Product", user));
            }
            return res
                .status(400)
                .send(failure("Failed to add the Product"));
        } catch (error) {
            console.log(error);
            return res
                .status(400)
                .send(failure("Internal server error"));
        }
    }
}

module.exports = new Product();