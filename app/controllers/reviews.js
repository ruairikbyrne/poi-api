"use strict";

const User = require("../models/user");

const Location = require("../models/location");
const Boom = require("@hapi/boom");
const Joi = require("@hapi/joi");

const Reviews = {
    index: {
        auth: false,
        handler: function (request, h) {
            return h.view("gallery", { title: "Welcome to Visit Wexford" });
        },
    },

    addReview: {
        auth: false,
        validate: {
            payload: {
                reviewDetail: Joi.string().required(),
            },
            options: {
                abortEarly: false,
            },
            failAction: function (request, h, error) {
                return h
                    .view("category", {
                        title: "Maintenance Error",
                        errors: error.details,
                    })
                    .takeover()
                    .code(400);
            },
        },
        handler: async function (request, h) {
            try {
                const payload = request.payload;
                let category = await Category.findByCategoryName(payload.categoryName);
                console.log("Result of find by category name: ", category);
                if (category) {
                    const message = "Category already exists";
                    console.log("Check message ", message);
                    throw Boom.badData(message);
                }
                const newCategory = new Category({
                    categoryName: payload.categoryName,
                });
                await newCategory.save();
                const categories = await Category.find().populate().lean();
                return h.view("category", {
                    categories: categories,
                });
            } catch (err) {
                return h.view("category", {
                    errors: [{ message: err.message }],
                });
            }
        },
    },
};

module.exports = Reviews;
