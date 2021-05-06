const Locations = require('./app/api/location');
const Users = require('./app/api/users');
const Categories = require('./app/api/category');

module.exports = [
    { method: 'GET', path: '/api/location', config: Locations.find },
    { method: 'GET', path: '/api/location/{id}', config: Locations.findOne },
    { method: "POST", path: "/api/location", config: Locations.create },
    { method: "DELETE", path: "/api/location/{id}", config: Locations.deleteOne },
    { method: "DELETE", path: "/api/location", config: Locations.deleteAll },
    { method: "GET", path: "/api/users", config: Users.find },
    { method: "GET", path: "/api/users/{id}", config: Users.findOne },
    { method: "POST", path: "/api/users", config: Users.create },
    { method: "DELETE", path: "/api/users/{id}", config: Users.deleteOne },
    { method: "DELETE", path: "/api/users", config: Users.deleteAll },
    { method: "GET", path: "/api/category", config: Categories.find },
    { method: "GET", path: "/api/category/{id}", config: Categories.findOne },
    { method: "POST", path: "/api/category", config: Categories.create },
    { method: "DELETE", path: "/api/category/{id}", config: Categories.deleteOne },
    { method: "DELETE", path: "/api/category", config: Categories.deleteAll },
];