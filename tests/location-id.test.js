const { app } = require("../server");
const request = require("supertest");
const mongoose = require("mongoose");

const { refreshDocuments } = require("../models/seed");
const locations = require("../test-data/locations");
const users = require("../test-data/users");
const Locations = require("../models/locations-model");

require("dotenv").config();

let rydalId = "";

beforeAll(() => {
  mongoose.set("runValidators", true);
  return mongoose.connect(process.env.DATABASE_LOCAL_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
});

beforeEach(() => {
  return refreshDocuments(locations, users)
    .then(() => {
      return Locations.findOne({ name: "Rydal, Lake District" });
    })
    .then((location) => {
      rydalId = location._id;
    });
});

afterAll(() => {
  return mongoose.connection.close();
});

describe("GET location/:id", () => {
  test("should return an array of swims", () => {
    return request(app)
      .get(`/locations/${rydalId}`)
      .expect(200)
      .then(({ body }) => {
        console.log(body);
        expect(body.swims[0]).toMatchObject({
          uid: expect.any(String),
          name: "Test",
          nickname: "The Tester",
          profileImg:
            "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9b/Mad_scientist_transparent_background.svg/1200px-Mad_scientist_transparent_background.svg.png",
          _id: expect.any(String),
          date: "2023-09-02T11:00:00.000Z",
          location: {
            name: "Rydal, Lake District",
            id: rydalId.toString(),
          },
          notes:
            "A great swim! To the dog's grave on the main island and back. Water not too cold.",
          stars: 5,
          recordTemp: null,
          feelTemp: "average",
          mins: 45,
          km: 1,
          outOfDepth: true,
          sizeKey: "large",
          shore: "muddy",
          bankAngle: "medium",
          clarity: "average",
          imgUrls: [
            "https://upload.wikimedia.org/wikipedia/commons/b/b4/Cumbria_2007_035.jpg",
          ],
        });
      });
  });
  test("should return swims ordered by most recent", () => {
    return request(app)
      .get(`/locations/${rydalId}`)
      .expect(200)
      .then(({ body }) => {
        expect(body.swims).toBeSortedBy("date", { descending: true });
      });
  });
  test("should return a userData key with userData", () => {
    return request(app)
      .get(`/locations/${rydalId}`)
      .expect(200)
      .then(({ body }) => {
        expect(body.userData).toMatchObject({
          avStars: expect.any(Number),
          outOfDepth: expect.any(Boolean),
          avMins: expect.any(Number),
          avKms: expect.any(Number),
          mostRecentTemp: expect.any(Object),
          feelTemps: expect.any(Object),
          sizes: expect.any(Object),
          shores: expect.any(Object),
          bankAngles: expect.any(Object),
          clarities: expect.any(Object),
        });
      });
  });
  test("should return location data on a key of location", () => {
    return request(app)
      .get(`/locations/${rydalId}`)
      .expect(200)
      .then(({ body }) => {
        expect(body.location).toMatchObject({
          _id: expect.any(String),
          name: "Rydal, Lake District",
          type: "lake",
          coords: [54.447268, -2.995986],
        });
      });
  });
});
