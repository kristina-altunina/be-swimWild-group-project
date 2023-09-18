const mongoose = require("mongoose");

const locationSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please enter a product name"],
    },
    type: {
      type: String,
      enum: ["river", "lake", "pond", "sea"],
      required: true,
    },
    loc: {
      type: {
        type: String,
        enum: ["Point"],
        required: true,
      },
      coordinates: {
        type: [Number],
        required: true,
      },
    },
  },
  {
    timestamps: true,
  }
);

const Locations = mongoose.model("Locations", locationSchema);

module.exports = Locations;
