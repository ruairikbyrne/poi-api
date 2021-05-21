"use strict";

const axios = require("axios");


class POIService {
    constructor(baseUrl) {
        this.baseUrl = baseUrl;
    }

    async getLocations() {
        const response = await axios.get(this.baseUrl + "/api/location");
        return response.data;
    }

    async getLocation(id) {
        try {
            const response = await axios.get(this.baseUrl + "/api/location/" + id);
            return response.data;
        } catch (e) {
            return null;
        }
    }

    async createLocation(newLocation) {
        try{
            const response = await axios.post(this.baseUrl + "/api/location", newLocation);
            console.log("response: ", response);
            return response.data;
        } catch (e) {
            return null;
        }

    }

    async deleteAllLocations() {
        const response = await axios.delete(this.baseUrl + "/api/location");
        return response.data;
    }

    async deleteOneLocation(id) {
        const response = await axios.delete(this.baseUrl + "/api/location/" + id);
        return response.data;
    }

    async getUsers() {
        try {
            const response = await axios.get(this.baseUrl + "/api/users");
            return response.data;
        } catch (e) {
            return null;
        }

    }

    async getUser(id) {
        try {
            const response = await axios.get(this.baseUrl + "/api/users/" + id);
            return response.data;
        } catch (e) {
            return null;
        }
    }

    async createUser(newUser) {
        try {
            console.log("API createUser")
            const response = await axios.post(this.baseUrl + "/api/users", newUser);
            return response.data;
        } catch (e) {
            return null;
        }
    }

    async deleteAllUsers() {
        try {
            const response = await axios.delete(this.baseUrl + "/api/users");
            return response.data;
        } catch (e) {
            return null;
        }
    }

    async deleteOneUser(id) {
        try {
            const response = await axios.delete(this.baseUrl + "/api/users/" + id);
            return response.data;
        } catch (e) {
            return null;
        }
    }

    async getCategories() {
        const response = await axios.get(this.baseUrl + "/api/category");
        return response.data;
    }

    async getCategory(id) {
        try {
            const response = await axios.get(this.baseUrl + "/api/category/" + id);
            return response.data;
        } catch (e) {
            return null;
        }
    }

    async createCategory(newCategory) {
        try{
            const response = await axios.post(this.baseUrl + "/api/category", newCategory);
            return response.data;
        } catch (e) {
            return null;
        }

    }

    async deleteAllCategories() {
        const response = await axios.delete(this.baseUrl + "/api/category");
        return response.data;
    }

    async deleteOneCategory(id) {
        const response = await axios.delete(this.baseUrl + "/api/category/" + id);
        return response.data;
    }

    async getReviews() {
        const response = await axios.get(this.baseUrl + "/api/reviews");
        return response.data;
    }

    async getReviews(id) {
        try {
            const response = await axios.get(this.baseUrl + "/api/reviews/" + id);
            return response.data;
        } catch (e) {
            return null;
        }
    }

    async createReview(newReview) {
        try{
            const response = await axios.post(this.baseUrl + "/api/reviews", newReview);
            return response.data;
        } catch (e) {
            return null;
        }

    }

    async deleteAllReviews() {
        const response = await axios.delete(this.baseUrl + "/api/reviews");
        return response.data;
    }

    async deleteOneReview(id) {
        const response = await axios.delete(this.baseUrl + "/api/reviews/" + id);
        return response.data;
    }

    async authenticate(user) {
        try {
            console.log("Hitting api authhenticate")
            const response = await axios.post(this.baseUrl + "/api/users/authenticate", user);
            axios.defaults.headers.common["Authorization"] = "Bearer " + response.data.token;
            return response.data;
        } catch (e) {
            console.log("Create user error", e);
            return null;
        }
    }
}

module.exports = POIService;