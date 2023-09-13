const mongoose = require("mongoose");

const lakeSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please enter a product name"],
    },

    size: {
      type: Number,
      required: true,
      default: 0,
    },

    image: {
      type: String,
      required: false,
    },
  },
  {
    timestamps: true
  }
);

const Lakes = mongoose.model("Lakes", lakeSchema);

module.exports = Lakes;