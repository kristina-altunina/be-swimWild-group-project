const { app } = require("../server");
const request = require("supertest");
const mongoose = require("mongoose");

const { testSeed } = require("../models/seed");
const locations = require("../test-data/locations");
const users = require("../test-data/users");
const { getAccessTokens } = require("./access-token");

require("dotenv").config();

beforeAll(() => {
  const promises = [];
  promises.push(
    mongoose.connect(process.env.DATABASE_LOCAL_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
  );
  promises.push(
    getAccessTokens().then(([unregisteredToken, registeredToken]) => {
      console.log(unregisteredToken, registeredToken);
      accessToken = unregisteredToken;
      registeredAccessToken = registeredToken;
    })
  );
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

describe("POST /locations", () => {
  test("should return 400 if no coords given", () => {
    return request(app)
      .post("/locations")
      .set("Authorization", `Bearer ${accessToken}`)
      .send({ name: "test", type: "river" })
      .expect(400)
      .then(({ text }) => {
        expect(text).toBe("Must include coordinates as array of [lat, long]!");
      });
  });
  test("should return 400 if latitude out of range", () => {
    return request(app)
      .post("/locations")
      .set("Authorization", `Bearer ${accessToken}`)
      .send({ name: "test", type: "river", coords: [91, -71] })
      .expect(400)
      .then(({ text }) => {
        expect(text).toBe("latittude must be a float between -90 and 90 deg");
      });
  });
  test("should return 400 if longitude out of range", () => {
    return request(app)
      .post("/locations")
      .set("Authorization", `Bearer ${accessToken}`)
      .send({ name: "test", type: "river", coords: [90, -181] })
      .expect(400)
      .then(({ text }) => {
        expect(text).toBe("longitude must be a float between -180 and 180 deg");
      });
  });
  test("should return 400 if within 1km of existing site", () => {});
});
