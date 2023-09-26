const mongoose = require("mongoose");

const locationSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  id: {
    type: String,
    required: true,
  },
});

const swimSchema = new mongoose.Schema({
  date: {
    type: Date,
    required: true,
  },
  location: {
    type: locationSchema,
    required: true,
  },
  notes: {
    type: String,
    default: null,
  },
  stars: {
    type: Number,
    min: [0, "Too small"],
    max: [5, "Too big"],
    default: null,
  },
  recordTemp: {
    type: Number,
    min: [-5, "Don't lie"],
    max: [60, "Don't lie"],
    default: null,
  },
  feelTemp: {
    type: String,
    enum: ["freezing", "cold", "average", "warm", "hot", null],
    default: null,
  },
  mins: {
    type: Number,
    default: null,
  },
  km: {
    type: Number,
    default: null,
  },
  outOfDepth: {
    type: Boolean,
    default: null,
  },
  sizeKey: {
    type: String,
    enum: ["tiny", "small", "medium", "large", null],
    default: null,
  },
  shore: {
    type: String,
    enum: ["muddy", "rocky", "sandy", "pebbly", "grassy", "swampy", null],
    default: null,
  },
  bankAngle: {
    type: String,
    emum: ["shallow", "medium", "steep", "jump-in", null],
    default: null,
  },
  clarity: {
    type: String,
    enum: ["muddy", "murky", "average", "clear", "perfect", null],
    default: null,
  },
  imgUrls: {
    type: [String],
    match: [
      /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/i,
    ],
    default: [],
  },
});

const userSchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please enter your full name"],
  },
  nickname: {
    type: String,
    required: true,
    unique: true,
    index: true,
  },
  uid: {
    type: String,
    required: true,
    unique: true,
    index: true,
  },
  profileImg: {
    type: String,
    match: [
      /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/i,
    ],
  },
  home: {
    type: String,
  },
  bio: {
    type: String,
  },
  dob: {
    type: Date,
    required: true,
  },
  swims: {
    type: [swimSchema],
  },
});

const Users = mongoose.model("Users", userSchema);

module.exports = Users;
