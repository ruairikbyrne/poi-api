"use strict";

const User = require("../models/user");
const Boom = require("@hapi/boom");
const bcrypt = require('bcrypt');

const Users = {
    find: {
        auth: false,
        handler: async function (request, h) {
            const users = await User.find();
            return users;
        },
    },

    findOne: {
        auth: false,
        handler: async function (request, h) {
            try {
                const user = await User.findOne({ _id: request.params.id });
                console.log("Userdetails: ", request.params.email);


                if (!user) {
                    return Boom.notFound("No User with this id");
                }
                return user;
            } catch (err) {
                return Boom.notFound("No User with this id");
            }
        },
    },

    update: {
        auth: false,
        handler: async function (request, h) {
            const userEdit = request.payload;
            const user = await User.findById(userEdit._id);
            user.firstName = userEdit.firstName;
            user.lastName = userEdit.lastName;
            user.email = userEdit.email;
            user.password = userEdit.password;
            await user.save();
            if (user) {
                return { success: true };
            }
            return Boom.notFound("id not found");
        },
    },

    authenticate: {
        auth: false,
        handler: async function (request, h) {
            console.log("Hitting API authenticate")
            try {
                const user = await User.findOne({ email: request.payload.email });
                if (!user) {
                    console.log("API User not found");
                    return Boom.unauthorized("User not found");
                } else if (!await user.comparePassword(request.payload.password)) {
                //} else if (user.password !== request.payload.password) {
                    console.log("API Invalid Password");
                    console.log("User Password:", user.password);
                    console.log("Payload Password:", request.payload.password);
                    return Boom.unauthorized("Invalid password");
                } else {
                    return user;
                }
            } catch (err) {
                console.log("Internal db failure");
                return Boom.notFound("internal db failure");
            }
        },
    },

    create: {
        auth: false,
        handler: async function (request, h) {
            const newUser = new User(request.payload);
            const user = await newUser.save();
            if (user) {
                return h.response(user).code(201);
            }
            return Boom.badImplementation("error creating user");
        },
    },

    deleteAll: {
        auth: false,
        handler: async function (request, h) {
            await User.deleteMany({});
            return { success: true };
        },
    },

    deleteOne: {
        auth: false,
        handler: async function (request, h) {
            const user = await User.deleteOne({ _id: request.params.id });
            if (user) {
                return { success: true };
            }
            return Boom.notFound("id not found");
        },
    },
};

module.exports = Users;