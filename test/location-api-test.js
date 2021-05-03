"use strict";

const assert = require("chai").assert;
const axios = require("axios");

suite("Location API tests", function () {
    test("get locations", async function () {
        const response = await axios.get("http://localhost:3000/api/location");
        const locations = response.data;
        assert.equal(8, locations.length);

        assert.equal(locations[0].name, "Rosslare Strand");
        assert.equal(locations[0].description, "Bathing water");
        assert.equal(locations[0].longitude, "1234");
        assert.equal(locations[0].latitude, "1234");
        assert.equal(locations[0].imageurl, "http://res.cloudinary.com/dq5zevjgv/image/upload/v1615915621/byv1jeih2dle6vqofxbx.jpg");
        assert.equal(locations[0].imageid, "byv1jeih2dle6vqofxbx");
        //assert.equal(locations[0].category, "60900ebd0e9a6167280bc45a");

        assert.equal(locations[1].name, "Loftus Hall");
        assert.equal(locations[1].description, "Haunted House");
        assert.equal(locations[1].longitude, "879456");
        assert.equal(locations[1].latitude, "789456");
        assert.equal(locations[1].imageurl, "http://res.cloudinary.com/dq5zevjgv/image/upload/v1615916021/kkvitgx3vqfzw1qtlaxf.jpg");
        assert.equal(locations[1].imageid, "kkvitgx3vqfzw1qtlaxf");
        //assert.equal(locations[1].category, "60900ebd0e9a6167280bc45c");

        assert.equal(locations[2].name, "Bride Street Church, Wexford Town");
        assert.equal(locations[2].description, "One of the twin churches which dominates the Wexford skyline. Its sister church is Rowe Street");
        assert.equal(locations[2].longitude, "7898789");
        assert.equal(locations[2].latitude, "7897879");
        assert.equal(locations[2].imageurl, "http://res.cloudinary.com/dq5zevjgv/image/upload/v1615998525/cjww11ginqksbgkrwfxm.jpg");
        assert.equal(locations[2].imageid, "cjww11ginqksbgkrwfxm");
        //assert.equal(locations[2].category, "60900ebd0e9a6167280bc459");

        assert.equal(locations[3].name, "Rowe Street Church, Wexford Town");
        assert.equal(locations[3].description, "One of the twin churches which dominates the Wexford skyline. Its sister church is Bride Street");
        assert.equal(locations[3].longitude, "1234567");
        assert.equal(locations[3].latitude, "7654321");
        assert.equal(locations[3].imageurl, "http://res.cloudinary.com/dq5zevjgv/image/upload/v1615929006/fclz07yuycxxn0dazze6.jpg");
        assert.equal(locations[3].imageid, "fclz07yuycxxn0dazze6");
        //assert.equal(locations[3].category, "60900ebd0e9a6167280bc459");

        assert.equal(locations[4].name, "Curracloe Beach");
        assert.equal(locations[4].description, "Bathing water");
        assert.equal(locations[4].longitude, "456879");
        assert.equal(locations[4].latitude, "789789");
        assert.equal(locations[4].imageurl, "http://res.cloudinary.com/dq5zevjgv/image/upload/v1616005273/jkypefcovug8ejtia7ez.jpg");
        assert.equal(locations[4].imageid, "jkypefcovug8ejtia7ez");
        //assert.equal(locations[4].category, "60900ebd0e9a6167280bc45a");

        assert.equal(locations[5].name, "Raven Forest");
        assert.equal(locations[5].description, "Raven forest, Wexford");
        assert.equal(locations[5].longitude, "12345");
        assert.equal(locations[5].latitude, "12345");
        assert.equal(locations[5].imageurl, "http://res.cloudinary.com/dq5zevjgv/image/upload/v1616164969/j0us46bxivnjzqjs1noy.jpg");
        assert.equal(locations[5].imageid, "j0us46bxivnjzqjs1noy");
        //assert.equal(locations[5].category, "60900ebd0e9a6167280bc45e");

        assert.equal(locations[6].name, "Hook Head Lighthouse");
        assert.equal(locations[6].description, "Oldest lighthouse in Europe");
        assert.equal(locations[6].longitude, "12345");
        assert.equal(locations[6].latitude, "4321");
        assert.equal(locations[6].imageurl, "http://res.cloudinary.com/dq5zevjgv/image/upload/v1616323365/n2b9togcurpbppaghvhb.jpg");
        assert.equal(locations[6].imageid, "n2b9togcurpbppaghvhb");
        //assert.equal(locations[6].category, "60900ebd0e9a6167280bc460");

        assert.equal(locations[7].name, "John F Kennedy Arboretum");
        assert.equal(locations[7].description, "A park under public administration. On 252 hectares there are approximately 4,500 species of trees and shrubs. ");
        assert.equal(locations[7].longitude, "1234");
        assert.equal(locations[7].latitude, "156787");
        assert.equal(locations[7].imageurl, "http://res.cloudinary.com/dq5zevjgv/image/upload/v1616323707/dbtvn2js6bqspbazmyyy.jpg");
        assert.equal(locations[7].imageid, "dbtvn2js6bqspbazmyyy");
        //assert.equal(locations[7].category, "60900ebd0e9a6167280bc45f");



    });

    test("get one location", async function () {
        let response = await axios.get("http://localhost:3000/api/location");
        const locations = response.data;
        assert.equal(8, locations.length);

        const oneLocationUrl = "http://localhost:3000/api/location/" + locations[0]._id;
        response = await axios.get(oneLocationUrl);
        const oneLocation = response.data;

        assert.equal(oneLocation.name, "Rosslare Strand");
        assert.equal(oneLocation.description, "Bathing water");
        assert.equal(oneLocation.longitude, "1234");
        assert.equal(oneLocation.latitude, "1234");
        assert.equal(oneLocation.imageurl, "http://res.cloudinary.com/dq5zevjgv/image/upload/v1615915621/byv1jeih2dle6vqofxbx.jpg");
        assert.equal(oneLocation.imageid, "byv1jeih2dle6vqofxbx");
    });

    test("create a location", async function () {
        const locationUrl = "http://localhost:3000/api/location";
        const newLocation = {
            name: "Irish National Heritage Park",
            description: "Located just outside Wexford Town in the cornerstone of Ireland’s Ancient East, the Irish National Heritage Park is a unique heritage experience in Ireland and Europe that brings to life over 9000 years of Irish history.",
            longitude: "52",
            latitude: "-6",
            imageurl: "http://res.cloudinary.com/dq5zevjgv/image/upload/v1615915621/bqp1ppb55miwrs5xeckv.jpg",
            imageid: "bqp1ppb55miwrs5xeckv",
        };

        const response = await axios.post(locationUrl, newLocation);
        const returnedLocation = response.data;
        assert.equal(201, response.status);

        assert.equal(returnedLocation.name, "Irish National Heritage Park");
        assert.equal(returnedLocation.description, "Located just outside Wexford Town in the cornerstone of Ireland’s Ancient East, the Irish National Heritage Park is a unique heritage experience in Ireland and Europe that brings to life over 9000 years of Irish history.");
        assert.equal(returnedLocation.longitude, "52");
        assert.equal(returnedLocation.latitude, "-6");
        assert.equal(returnedLocation.imageurl, "http://res.cloudinary.com/dq5zevjgv/image/upload/v1615915621/bqp1ppb55miwrs5xeckv.jpg");
        assert.equal(returnedLocation.imageid, "bqp1ppb55miwrs5xeckv");
    });

    test("delete a location", async function () {
        let response = await axios.get("http://localhost:3000/api/location");
        let locations = response.data;
        const originalSize = locations.length;

        const oneLocationUrl = "http://localhost:3000/api/location/" + locations[0]._id;
        response = await axios.get(oneLocationUrl);
        const oneLocation = response.data;
        assert.equal(oneLocation.name, "Rosslare Strand");

        response = await axios.delete("http://localhost:3000/api/location/" + locations[0]._id);
        assert.equal(response.data.success, true);

        response = await axios.get("http://localhost:3000/api/location");
        locations = response.data;
        assert.equal(locations.length, originalSize - 1);
    });

    test("delete all locations", async function () {
        let response = await axios.get("http://localhost:3000/api/location");
        let locations = response.data;
        const originalSize = locations.length;
        assert(originalSize > 0);
        response = await axios.delete("http://localhost:3000/api/location");
        response = await axios.get("http://localhost:3000/api/location");
        locations = response.data;
        assert.equal(locations.length, 0);
    });

});