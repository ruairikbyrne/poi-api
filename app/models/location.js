"use strict";

const Mongoose = require("mongoose");
const Schema = Mongoose.Schema;

const locationSchema = new Schema({
  name: String,
  description: String,
  longitude: String,
  latitude: String,
  imageurl: String,
  imageid: String,
  category: {
    type: Schema.Types.ObjectId,
    ref: "Category",
  },
});

module.exports = Mongoose.model("Location", locationSchema);
