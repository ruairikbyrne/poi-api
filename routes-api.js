const Locations = require('./app/api/location');

module.exports = [
    { method: 'GET', path: '/api/location', config: Locations.find },
    { method: 'GET', path: '/api/location/{id}', config: Locations.findOne },
    { method: "POST", path: "/api/location", config: Locations.create },
    { method: "DELETE", path: "/api/location/{id}", config: Locations.deleteOne },
    { method: "DELETE", path: "/api/location", config: Locations.deleteAll },
];