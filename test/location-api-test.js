"use strict";

const assert = require("chai").assert;
const POIService = require("./poi-service");
const fixtures = require("./fixtures.json");
const _ = require("lodash");


suite("Location API tests", function () {
    let locations = fixtures.locations;
    let newLocation = fixtures.newLocation;

    const poiService = new POIService(fixtures.poiService);

    setup(async function () {
        await poiService.deleteAllLocations();
    });

    teardown(async function () {
        await poiService.deleteAllLocations();
    });

    test("create a location", async function () {
        const returnedLocation = await poiService.createLocation(newLocation);
        assert(_.some([returnedLocation], newLocation), "returnedLocation must be a superset of newLocation");
        assert.isDefined(returnedLocation._id)
    });

    test("get location", async function () {
        const l1 = await poiService.createLocation(newLocation);
        const l2 = await poiService.getLocation(l1._id);
        assert.deepEqual(l1, l2);
    });

    test("get invalid location", async function () {
        const l1 = await poiService.getLocation("1234");
        assert.isNull(l1);
        const l2 = await poiService.getLocation("012345678901234567890123");
        assert.isNull(l2);
    });

    test("delete a location", async function () {
        let c = await poiService.createLocation(newLocation);
        assert(c._id != null);
        await poiService.deleteOneLocation(c._id);
        c = await poiService.getLocation(c._id);
        assert(c == null);
    });

    test("get all locations", async function () {
        for (let l of locations) {
            await poiService.createLocation(l);
        }

        const allLocations = await poiService.getLocations();
        assert.equal(allLocations.length, locations.length);
    });

    test("get location detail", async function () {
        for (let l of locations) {
            await poiService.createLocation(l);
        }

        const allLocations = await poiService.getLocations();
        for (var i = 0; i < locations.length; i++) {
            assert(_.some([allLocations[i]], locations[i]), "returned location must be a superset of new location");
        }
    });

    test("get all locations empty", async function () {
        const allLocations = await poiService.getLocations();
        assert.equal(allLocations.length, 0);
    });

});