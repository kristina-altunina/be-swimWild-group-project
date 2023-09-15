const locations = require("../test-data/locations");
const users = require("../test-data/users");
const { seedWithLogs } = require("./seed");

seedWithLogs(locations, users);
