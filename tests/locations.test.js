const { app } = require("../server");
const request = require("supertest");
const mongoose = require("mongoose");

const { testSeed } = require("../models/seed");
const locations = require("../test-data/locations");
const users = require("../test-data/users");

require("dotenv").config();

beforeAll(() => {
  return mongoose.connect(process.env.DATABASE_LOCAL_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
});

beforeEach(() => {
  return testSeed(locations, users);
});

afterAll(() => {
  return mongoose.connection.close();
});

describe("GET /locations", () => {
  test("should return a list of locations", () => {
    return request(app)
      .get("/locations")
      .expect(200)
      .then(({ body }) => {
        expect(body[0]).toMatchObject({
          name: expect.any(String),
          _id: expect.any(String),
          loc: { coordinates: [expect.any(Number), expect.any(Number)] },
          distanceKm: expect.any(Number),
          type: expect.any(String),
        });
      });
  });
  test("should return a list ordered by distanceKm", () => {
    return request(app)
      .get("/locations")
      .then(({ body }) => {
        expect(body).toBeSortedBy("distanceKm");
      });
  });
  test("should return only the number of results as in limit query", () => {
    return request(app)
      .get("/locations?limit=2")
      .then(({ body }) => {
        expect(body.length).toBe(2);
      });
  });
  test("should be paginated", () => {
    const promises = [
      request(app)
        .get("/locations?limit=1&p=1")
        .then(({ body }) => body),
      request(app)
        .get("/locations?limit=1&p=2")
        .then(({ body }) => body),
    ];
    return Promise.all(promises).then((bodies) => {
      expect(bodies[0]).not.toEqual(bodies[1]);
    });
  });
  test("should be sorted by location query", () => {
    return request(app)
      .get("/locations?lat=54.447268&long=-2.995986")
      .then(({ body }) => {
        expect(body).toBeSortedBy("distanceKm");
        expect(body[0].name).toBe("Rydal, Lake District");
      });
  });
  test("should be filtered by a filterName query", () => {
    return request(app)
      .get("/locations?filterName='Rydal'")
      .then(({ body }) => {
        console.log(body)
        expect(body).toBeSortedBy("distanceKm");
        expect(body.length).toBe(1)
        // console.log(body[0])
        expect(body[0].name).toBe('Rydal, Lake District')
      });
  });
  test("pagination queries should be validated", () => {
    return request(app).get("/locations?p=-1").expect(400);
  });
  test("limit should be validated", () => {
    return request(app).get("/locations?limit=fish").expect(400);
  });
  test("lat should be validated", () => {
    return request(app).get("/locations?lat=fish").expect(400);
  });
  test("long should be validated", () => {
    return request(app).get("/locations?long=200").expect(400);
  });
});
