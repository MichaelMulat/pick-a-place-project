const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const locationSchema = new Schema({
  address: { type: String },
  locationId: { type: String },
  votes: {type: Number, default: 0}
});

const Location = mongoose.model("Location", locationSchema, "Location");

module.exports = Location;



