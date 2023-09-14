const mongoose = require("mongoose");

const locationSchema = mongoose.Schema(
  {
    id: {
      type: Number,
      required: true,
    },
    name: {
      type: String,
      required: [true, "Please enter a product name"],
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
