'use strict';

const Location = require('../models/location');
const Boom = require("@hapi/boom");

const Locations = {
    find: {
        auth: false,
        handler: async function (request, h) {
            const locations = await Location.find().populate("category");
            console.log("Locations find result:  ", locations);
            return locations;
        },
    },

    findOne: {
        auth: false,
        handler: async function(request, h) {
            try{
                const locations = await Location.findOne({ _id: request.params.id });
                if (!locations) {
                    return Boom.notFound("No location with this id");
                }
                return locations;
            } catch (err) {
                return Boom.notFound("No location with this id");
            }
        },
    },

    create: {
        auth: false,
        handler: async function (request, h) {
            console.log("Hitting Create in API")
            const newLocation = new Location(request.payload);
            console.log("API newLocation: ", newLocation);
            const location = await newLocation.save();
            if (location) {
                return h.response(location).code(201);
            }
            return Boom.badImplementation("error creating location");
        },
    },

    deleteAll: {
        auth: false,
        handler: async function (request, h) {
            await Location.remove({});
            return { success: true };
        },
    },

    deleteOne: {
        auth: false,
        handler: async function (request, h) {
            const response = await Location.deleteOne({ _id: request.params.id });
            if (response.deletedCount == 1) {
                return { success: true };
            }
            return Boom.notFound("id not found");
        },
    },

};

module.exports = Locations;