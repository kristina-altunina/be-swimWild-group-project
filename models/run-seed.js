const mongoose = require("mongoose");
const locations = require("../dev-data/locations");
const users = require("../dev-data/users");
const { seedWithLogs } = require("./seed");

require("dotenv").config();

mongoose.connect(process.env.DATABASE_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

seedWithLogs(locations, users).finally(() => {
  mongoose.connection.close();
});
