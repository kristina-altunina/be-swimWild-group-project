const { app } = require("../server");
const request = require("supertest");
const mongoose = require("mongoose");

const { refreshDocuments } = require("../models/seed");
const locations = require("../test-data/locations");
const users = require("../test-data/users");
const { getAccessTokens } = require("./access-token");
const Locations = require("../models/locations-model");

require("dotenv").config();

let accessToken;
let registeredAccessToken;

beforeAll(() => {
  const promises = [];
  mongoose.set("runValidators", true);
  promises.push(
    mongoose.connect(process.env.DATABASE_LOCAL_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
  );
  promises.push(
    getAccessTokens().then(([unregisteredToken, registeredToken]) => {
      // console.log(unregisteredToken, registeredToken);
      accessToken = unregisteredToken;
      registeredAccessToken = registeredToken;
    })
  );
  return Promise.all(promises);
});

beforeEach(() => {
  return refreshDocuments(locations, users);
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
          coords: [expect.any(Number), expect.any(Number)],
          distanceKm: expect.any(Number),
          type: expect.any(String),
        });
      });
  });
  test("locations should have average stars", () => {
    return request(app)
      .get("/locations")
      .expect(200)
      .then(({ body }) => {
        expect(Object.keys(body[0]).includes("avStars")).toBe(true);
      });
  });
  test("query of sort_by = rating sorts by rating", () => {
    return request(app)
      .get("/locations?sort_by=rating")
      .expect(200)
      .then(({ body }) => {
        expect(body).toBeSortedBy("avStars", { descending: true });
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
      .get("/locations?filterName='Rydal'&lat=54.447268&long=-2.995986")
      .then(({ body }) => {
        expect(body).toBeSortedBy("distanceKm");
        expect(body.length).toBe(1);
        expect(body[0]).toMatchObject({
          name: "Rydal, Lake District",
          _id: expect.any(String),
          coords: [expect.any(Number), expect.any(Number)],
          distanceKm: expect.any(Number),
          type: expect.any(String),
        });
      });
  });
  test("should be filtered by a filterName query", () => {
    return request(app)
      .get("/locations?filterName='Lake'")
      .then(({ body }) => {
        expect(body).toBeSortedBy("distanceKm");
        expect(body.length).toBe(2);
        expect(body).toBeSortedBy("distanceKm");
        expect(body[0].name).toBe("Beckenham Park Swimming Lake, London");
        expect(body[1].name).toBe("Rydal, Lake District");
      });
  });
  test("should be filtered by a filterName query", () => {
    return request(app)
      .get("/locations?filterName='fish'")
      .then(({ body }) => {
        expect(body.length).toBe(0);
      });
  });
  test("should be filtered by a filterName query", () => {
    return request(app)
      .get("/locations?filterName='Fellfoot'")
      .then(({ body }) => {
        expect(body.length).toBe(2);
        expect(body).toBeSortedBy("distanceKm");
        expect(body[0].name).toBe("National Trust - Fell Foot, Windermere");
        expect(body[1].name).toBe("Falls of Falloch, Crianlarich, Scotland");
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
  test("should return 400 if given non-numerical coordinates", () => {
    return request(app)
      .post("/locations")
      .set("Authorization", `Bearer ${accessToken}`)
      .send({ name: "test", type: "river", coords: [90, "-181"] })
      .expect(400)
      .then(({ text }) => {
        expect(text).toBe("longitude must be a float between -180 and 180 deg");
      });
  });
  test("should return 400 if coords array is empty", () => {
    return request(app)
      .post("/locations")
      .set("Authorization", `Bearer ${accessToken}`)
      .send({ name: "test", type: "river", coords: [] })
      .expect(400)
      .then(({ text }) => {
        expect(text).toBe("Must include coordinates as array of [lat, long]!");
      });
  });
  test("should return 400 if within 1km of existing site", () => {
    return request(app)
      .post("/locations")
      .set("Authorization", `Bearer ${accessToken}`)
      .send({ name: "test", type: "river", coords: [54.447263, -2.995982] })
      .expect(400)
      .then(({ text }) => {
        expect(text).toBe("Rydal, Lake District has similar coordinates");
      });
  });
  test("should return 400 if no name offered", () => {
    return request(app)
      .post("/locations")
      .set("Authorization", `Bearer ${accessToken}`)
      .send({ type: "river", coords: [54.647263, -2.995982] })
      .expect(400)
      .then(({ text }) => {
        expect(text).toBe("Include a key of name on the request body");
      });
  });
  test("should return 400 if no type offered", () => {
    return request(app)
      .post("/locations")
      .set("Authorization", `Bearer ${accessToken}`)
      .send({ name: "river", coords: [54.647263, -2.995982] })
      .expect(400)
      .then(({ text }) => {
        expect(text).toBe("Include a key of type on the request body");
      });
  });
  test("should return 400 if type not within enum", () => {
    return request(app)
      .post("/locations")
      .set("Authorization", `Bearer ${accessToken}`)
      .send({
        name: "river",
        type: "reservoir",
        coords: [54.647263, -2.995982],
      })
      .expect(400)
      .then(({ text }) => {
        expect(text).toBe("Include a key of type on the request body");
      });
  });
  test("should return 400 if sent malformed body", () => {
    return request(app)
      .post("/locations")
      .set("Authorization", `Bearer ${accessToken}`)
      .send({})
      .expect(400);
  });
  test("should return 400 if sent malformed body", () => {
    return request(app)
      .post("/locations")
      .set("Authorization", `Bearer ${accessToken}`)
      .send({ coords: [54.647263, -2.995982] })
      .expect(400);
  });
  test("should create the new location with 201", () => {
    return request(app)
      .post("/locations")
      .set("Authorization", `Bearer ${accessToken}`)
      .send({
        name: "new place",
        type: "river",
        coords: [54.647263, -2.995982],
      })
      .expect(201)
      .then(({ body }) => {
        expect(body).toMatchObject({
          _id: expect.any(String),
          name: "new place",
          type: "river",
          coords: [54.647263, -2.995982],
        });
        return Locations.find({ name: "new place" }).then();
      })
      .then((locations) => {
        expect(locations.length).toBe(1);
      });
  });
});
