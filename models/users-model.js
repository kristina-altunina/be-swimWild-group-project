const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please enter a user name"],
        },
    uid: {
      type: string,
      required: true,
    },

    swimminghistory : {
      type: Array,
      required: false,
    },
  }
);

const User = mongoose.model("Lakes", lakeSchema);

module.exports = Lakes;
