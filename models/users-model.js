const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please enter your full name"],
  },
  nickname: {
    type: String,
  },
  uid: {
    type: String,
    required: true,
  },
  profileImg: {
    type: String,
  },
  dob: {
    type: Date,
    required: true
  },
  swims: {
    type: [
      {
        date: {
          type: Date,
          required: true,
        },
        location: {
          type: Number,
          required: true,
        },
        notes: {
          type: String,
        },
        stars: {
          type: Number,
          min: [0, "Too small"],
          max: [5, "Too big"],
        },
        recordTemp: {
          type: Number,
          min: [-5, "Don't lie"],
          max: [60, "Don't lie"],
        },
        feelTemp: {
          type: String,
          enum: ["freezing", "cold", "average", "warm", "hot"],
        },
        outOfDepth: {
          type: Boolean,
        },
        sizekey: {
          type: String,
          enum: ["tiny", "small", "medium", "large"],
        },
        shore: {
          type: String,
          enum: ["muddy", "rocky", "sandy", "pebbly", "grassy", "swampy"],
        },
        bankAngle: {
          type: String,
          emum: ["shallow", "medium", "steep", "jump-in"],
        },
        clarity: {
          type: String,
          enum: ["muddy", "murky", "average", "clear", "perfect"],
        },
        imageUrls: {
          type: [String],
        },
      },
    ],
  },
});

const Users = mongoose.model("Users", userSchema);

module.exports = Users;
