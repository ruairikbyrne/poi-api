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
        //auth: false,

        handler: async function (request, h) {
            try {

                const locationId = await Location.findById(request.params._id);
                const payload = request.payload;
                const id = request.auth.credentials.id;
                const user = await User.findById(id);

                var datetime = new Date();
                const newReview = new Review({
                  reviewDate: datetime,
                  reviewDetail: payload.reviewDetail,
                  rating: payload.rating,
                  location: locationId,
                  user: user._id,
                });
                await newReview.save();
                const reviews = await Review.find({location: locationId}).populate("user").lean();
                const location = await Location.findById(locationId).populate("category").lean();

                return h.view("reviews", {
                    reviews: reviews,
                    location: location,
                });
            } catch (err) {
                return h.view("reviews", {
                    errors: [{ message: err.message }],
                });
            }
        },
    },

    showReviews: {
        handler: async function (request, h) {
            const id = request.auth.credentials.id;
            const user = await User.findById(id);
            const locationId = request.params._id;
            const location = await Location.findById(locationId).populate("category").lean();
            const reviews = await Review.find({location: locationId}).populate("user").lean();
            return h.view("reviews", {
                title: "User Reviews",
                location: location,
                reviews: reviews,
                user: user,
            });
        },
    },

};

module.exports = Reviews;
