"use strict";

const assert = require("chai").assert;
const POIService = require("./poi-service");
const fixtures = require("./fixtures.json");
const _ = require("lodash");

suite("Review API tests", function () {
    let reviews = fixtures.reviews;
    let newReview = fixtures.newReview;

    const poiService = new POIService(fixtures.poiService);

    setup(async function () {
        await poiService.deleteAllReviews();
    });

    teardown(async function () {
        await poiService.deleteAllReviews();
    });

    test("create a review", async function () {
        const returnedReview = await poiService.createReview(newReview);
        assert(_.some([returnedReview], newReview), "returnedReview must be a superset of newReview");
        assert.isDefined(returnedReview._id);
    });

    test("get review", async function () {
        const r1 = await poiService.createReview(newReview);
        const r2 = await poiService.getReviews(r1._id);
        assert.deepEqual(r1, r2);
    });

    test("get invalid review", async function () {
        const r1 = await poiService.getReviews("1234");
        assert.isNull(r1);
        const r2 = await poiService.getReviews("012345678901234567890123");
        assert.isNull(r2);
    });


    test("delete a review", async function () {
        let r = await poiService.createReview(newReview);
        assert(r._id != null);
        await poiService.deleteOneReview(r._id);
        r = await poiService.getReviews(r._id);
        assert(r == null);
    });
});