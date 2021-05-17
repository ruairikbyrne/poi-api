"use strict";

const User = require("../models/user");

const Review = require("../models/reviews");
const Location = require("../models/location");
const Boom = require("@hapi/boom");
const Joi = require("@hapi/joi");

const Reviews = {
    index: {
        auth: false,
        handler: function (request, h) {
            return h.view("reviews", { title: "Welcome to Visit Wexford" });
        },
    },

    addReview: {
        auth: false,

        handler: async function (request, h) {
            try {
                const locationId = await Location.findById(request.params._id);
                console.log("location id:", request.params._id );
                const payload = request.payload;
                var datetime = new Date();
                const newReview = new Review({
                  reviewDate: datetime,
                  reviewDetail: payload.reviewDetail,
                  rating: payload.rating,
                  location: locationId,
                });
                await newReview.save();
                const reviews = await Review.find({location: locationId}).populate().lean();
                const location = await Location.findById(locationId).populate("category").lean();

                console.log("Review results: ", reviews)
                return h.view("reviews", {
                    reviews: reviews,
                    location: location,
                });
            } catch (err) {
                console.log("add review error", err)
                return h.view("reviews", {
                    errors: [{ message: err.message }],
                });
            }
        },
    },

    showReviews: {
        handler: async function (request, h) {
            console.log("POI ID ", request.params._id);
            const locationId = request.params._id;
            console.log("POI ID for mongoose query", locationId);
            const location = await Location.findById(locationId).populate("category").lean();
            const reviews = await Review.find({location: locationId}).populate().lean();
            console.log("Review contents: ", reviews);

            //const category = await Category.find().lean();
            //console.log("Category:", category);
            //console.log("Location Details", location);
            return h.view("reviews", {
                title: "User Reviews",
                location: location,
                reviews: reviews,

            });
        },
    },

};

module.exports = Reviews;
