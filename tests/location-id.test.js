const { app } = require("../server");
const request = require("supertest");
const mongoose = require("mongoose");

const { refreshDocuments } = require("../models/seed");
const locations = require("../test-data/locations");
const users = require("../test-data/users");
const Locations = require("../models/locations-model");
const { processUserData } = require("../utils");
const Users = require("../models/users-model");

require("dotenv").config();

let rydalId = "";
let margateID = "";
let BeckenhamID = "";
let GoldigginsID = "";

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
      const promises = [];
      promises.push(Locations.findOne({ name: "Rydal, Lake District" }));
      promises.push(
        Locations.findOne({ name: "Walpole Bay Tidal Pool, Margate" })
      );
      promises.push(
        Locations.findOne({ name: "Beckenham Park Swimming Lake, London" })
      );
      promises.push(
        Locations.findOne({ name: "Goldiggins Quarry, Minions, Cornwall" })
      );
      return Promise.all(promises);
    })
    .then((resolvedPromises) => {
      rydalId = resolvedPromises[0].id;
      margateID = resolvedPromises[1].id;
      BeckenhamID = resolvedPromises[2].id;
      GoldigginsID = resolvedPromises[3].id;
    })
    .catch((err) => {
      console.log(err);
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
  test.skip("should return userData key with userData, when given a location id where there are no swims", () => {
    return request(app)
      .get(`/locations/${BeckenhamID}`)
      .expect(200)
      .then(({ body }) => {
        console.log(body.userData);
        expect(body.userData).toMatchObject({
          avStars: null,
          outOfDepth: null,
          avMins: null,
          avKms: null,
          mostRecentTemp: { date: "0001-01-01T00:00:00.000Z", temp: null },
          feelTemps: expect.any(Object),
          sizes: expect.any(Object),
          shores: expect.any(Object),
          bankAngles: expect.any(Object),
          clarities: expect.any(Object),
        });
      });
  });
  test.skip("should return userData key with userData, when given a location id where there is one swim, and that swim only contains the required data", () => {
    return request(app)
      .get(`/locations/${GoldigginsID}`)
      .expect(200)
      .then(({ body }) => {
        expect(body.userData).toMatchObject({
            avStars: null,
            outOfDepth: null,
            avMins: null,
            avKms: null,
            mostRecentTemp: { date: "0001-01-01T00:00:00.000Z", temp: null },
            feelTemps: {},
            sizes: {},
            shores: {},
            bankAngles: {},
            clarities: {},
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
  test("Should only return swims from that location", () => {
    return request(app)
      .get(`/locations/${rydalId}`)
      .expect(200)
      .then(({ body }) => {
        const { swims } = body;
        swims.forEach((swim) => {
          expect(swim.location).toMatchObject({
            name: "Rydal, Lake District",
            id: expect.any(String),
          });
        });
      });
  });
  test("Sea location should return sea apiData on a key of apiData", () => {
    return request(app)
      .get(`/locations/${margateID}`)
      .expect(200)
      .then(({ body }) => {
        expect(body.apiData).toMatchObject({
          tempCelsius: expect.anything(),
          nearestAab: expect.anything(),
          waveData: expect.anything(),
          weather: expect.anything(),
          tides: expect.anything(),
        });
      });
  });
  test("Lakes location should return Lakes apiData on a key of apiData", () => {
    return request(app)
      .get(`/locations/${BeckenhamID}`)
      .expect(200)
      .then(({ body }) => {
        console.log(body);
        expect(body.apiData).toMatchObject({
          hydrologyData: expect.anything(),
          nearestAab: expect.anything(),
          weather: expect.anything(),
        });
      });
  });
  test.skip("Lakes location should return Lakes apiData on a key of apiData", () => {
    return request(app).get(`/locations/22222`).expect(400);
  });
});

describe("processUserData", () => {
  test("", () => {
    const swims = [
      {
        date: "2023-06-21T17:00:00+0000",
        location: {
          name: "Rydal, Lake District",
        },
        notes: "Good fun",
        stars: 4,
        recordTemp: null,
        feelTemp: "average",
        mins: 25,
        km: 0.5,
        outOfDepth: true,
        sizeKey: "large",
        shore: "pebbly",
        bankAngle: "medium",
        clarity: "average",
        imgUrls: [
          "https://www.parkcliffe.co.uk/wp-content/uploads/2023/01/rydal-water-2-lake-district.jpg",
          "https://www.ratedtrips.com/images/styles/rt_slider/public/00008881_A3.jpg?itok=3BSnVDBP",
          "https://windows10spotlight.com/wp-content/uploads/2022/06/5cc14463fca6e0211691ddf32779fbf2.jpg",
        ],
      },
    ];
    const result = processUserData(swims);
    expect(result).toMatchObject({
      avStars: 4,
      outOfDepth: true,
      avMins: 25,
      avKms: 0.5,
      mostRecentTemp: { date: "0001-01-01T00:00:00.000Z", temp: null },
      feelTemps: { average: "100%" },
      sizes: { large: "100%" },
      shores: { pebbly: "100%" },
      bankAngles: { medium: "100%" },
      clarities: { average: "100%" },
    });
  });
});
