const { app } = require("../server");
const request = require("supertest");
const mongoose = require("mongoose");

const { testSeed } = require("../models/seed");
const locations = require("../test-data/locations");
const users = require("../test-data/users");
const { getAccessTokens } = require("./access-token");
const Locations = require("../models/locations-model");

require("dotenv").config();

let accessToken;
let registeredAccessToken;
let rydalId = "";
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
      console.log(unregisteredToken, registeredToken);
      accessToken = unregisteredToken;
      registeredAccessToken = registeredToken;
    })
  );
  return Promise.all(promises);
});

beforeEach(() => {
  return testSeed(locations, users)
    .then(() => {
      return Locations.findOne({ name: "Rydal, Lake District" });
    })
    .then((location) => {
      return (rydalId = location._id);
    });
});

afterAll(() => {
  return mongoose.connection.close();
});

describe("POST/users/swim", () => {
  test("should respond 401 Unauthorized when no access token provided", () => {
    return request(app).post("/users/swim").expect(401);
  });

  test("should respond with new swim object", () => {
    const postBody = {
      date: "2023-05-02T11:00:00Z",
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
      shore: "muddy",
      bankAngle: "medium",
      clarity: "average",
      imgUrls: [],
      sizeKey: null,
    };
    return request(app)
      .post("/users/swim")
      .send(postBody)
      .set("Authorization", `Bearer ${accessToken}`)
      .expect(201)
      .then(({ body }) => {
        expect(body).toMatchObject({
          date: "2023-05-02T11:00:00.000Z",
          notes:
            "A great swim! To the dog's grave on the main island and back. Water not too cold.",
          stars: 5,
          location: {
            name: "Rydal, Lake District",
            id: rydalId.toString(),
          },
          recordTemp: null,
          feelTemp: "average",
          mins: 45,
          km: 1,
          outOfDepth: true,
          shore: "muddy",
          bankAngle: "medium",
          clarity: "average",
          imgUrls: [],
          sizeKey: null,
        });
      });
  });
  test("Should return a 201 when location name plus id and date are provided", () => {
    const postBody = {
      date: "2023-05-02T11:00:00Z",
      location: {
        name: "Rydal, Lake District",
        id: rydalId.toString(),
      },
      imgUrls: [
        "https://www.google.com/search?q=rydal+lake+district&tbm=isch&ved=2ahUKEwi4js-KqbuBAxWGmicCHSppA08Q2-cCegQIABAA&oq=rydal+lake+di&gs_lcp=CgNpbWcQARgAMgUIABCABDIGCAAQCBAeMgYIABAIEB4yBggAEAgQHjIGCAAQCBAeMgYIABAIEB4yBggAEAgQHjIGCAAQCBAeMgcIABAYEIAEMgcIABAYEIAEOgQIIxAnUOIDWPAZYOwiaABwAHgAgAFFiAHNA5IBATiYAQCgAQGqAQtnd3Mtd2l6LWltZ8ABAQ&sclient=img&ei=jwMMZfiKHIa1nsEPqtKN-AQ&bih=585&biw=1130#imgrc=Hjv1YcuTZOtFIM",
        "https://www.google.com/search?q=rydal+lake+district&tbm=isch&ved=2ahUKEwi4js-KqbuBAxWGmicCHSppA08Q2-cCegQIABAA&oq=rydal+lake+di&gs_lcp=CgNpbWcQARgAMgUIABCABDIGCAAQCBAeMgYIABAIEB4yBggAEAgQHjIGCAAQCBAeMgYIABAIEB4yBggAEAgQHjIGCAAQCBAeMgcIABAYEIAEMgcIABAYEIAEOgQIIxAnUOIDWPAZYOwiaABwAHgAgAFFiAHNA5IBATiYAQCgAQGqAQtnd3Mtd2l6LWltZ8ABAQ&sclient=img&ei=jwMMZfiKHIa1nsEPqtKN-AQ&bih=585&biw=1130",
      ],
    };

    return request(app)
      .post("/users/swim")
      .send(postBody)
      .set("Authorization", `Bearer ${accessToken}`)
      .expect(201)
      .then(({ body }) => {
        expect(body).toMatchObject({
          date: "2023-05-02T11:00:00.000Z",
          notes: null,
          stars: null,
          location: {
            name: "Rydal, Lake District",
            id: rydalId.toString(),
          },
          recordTemp: null,
          feelTemp: null,
          mins: null,
          km: null,
          outOfDepth: null,
          shore: null,
          bankAngle: null,
          clarity: null,
          imgUrls: [
            "https://www.google.com/search?q=rydal+lake+district&tbm=isch&ved=2ahUKEwi4js-KqbuBAxWGmicCHSppA08Q2-cCegQIABAA&oq=rydal+lake+di&gs_lcp=CgNpbWcQARgAMgUIABCABDIGCAAQCBAeMgYIABAIEB4yBggAEAgQHjIGCAAQCBAeMgYIABAIEB4yBggAEAgQHjIGCAAQCBAeMgcIABAYEIAEMgcIABAYEIAEOgQIIxAnUOIDWPAZYOwiaABwAHgAgAFFiAHNA5IBATiYAQCgAQGqAQtnd3Mtd2l6LWltZ8ABAQ&sclient=img&ei=jwMMZfiKHIa1nsEPqtKN-AQ&bih=585&biw=1130#imgrc=Hjv1YcuTZOtFIM",
            "https://www.google.com/search?q=rydal+lake+district&tbm=isch&ved=2ahUKEwi4js-KqbuBAxWGmicCHSppA08Q2-cCegQIABAA&oq=rydal+lake+di&gs_lcp=CgNpbWcQARgAMgUIABCABDIGCAAQCBAeMgYIABAIEB4yBggAEAgQHjIGCAAQCBAeMgYIABAIEB4yBggAEAgQHjIGCAAQCBAeMgcIABAYEIAEMgcIABAYEIAEOgQIIxAnUOIDWPAZYOwiaABwAHgAgAFFiAHNA5IBATiYAQCgAQGqAQtnd3Mtd2l6LWltZ8ABAQ&sclient=img&ei=jwMMZfiKHIa1nsEPqtKN-AQ&bih=585&biw=1130",
          ],
          sizeKey: null,
        });
      });
  });

  test("Should return a 400 when date is in the future", () => {
    const postBody = {
      date: "2024-05-02T11:00:00Z",
      location: {
        name: "Rydal, Lake District",
        id: rydalId.toString(),
      },
    };
    return request(app)
      .post("/users/swim")
      .set("Authorization", `Bearer ${accessToken}`)
      .send(postBody)
      .expect(400)
      .then(({ body }) => {
        expect(body.msg).toBe("Date is not valid.");
      });
  });
  test("Should return a 400 when location does not exist", () => {
    const postBody = {
      date: "2023-05-02T11:00:00Z",
      location: {
        name: "Ake District",
        id: rydalId.toString(),
      },
    };
    return request(app)
      .post("/users/swim")
      .set("Authorization", `Bearer ${accessToken}`)
      .send(postBody)
      .expect(400)
      .then(({ body }) => {
        expect(body.msg).toBe("Location name is not valid.");
      });
  });

  test("Should return a 400 when location id does not match with location provided", () => {
    const postBody = {
      date: "2023-05-02T11:00:00Z",
      location: {
        name: "Rydal, Lake District",
        id: "5738934902",
      },
    };
    return request(app)
      .post("/users/swim")
      .set("Authorization", `Bearer ${accessToken}`)
      .send(postBody)
      .expect(400)
      .then(({ body }) => {
        expect(body.msg).toBe("Location ID is not valid.");
      });
  });

  test("Should return a 400 when date is not provided", () => {
    const postBody = {
      location: {
        name: "Rydal, Lake District",
        id: rydalId.toString(),
      },
    };
    return request(app)
      .post("/users/swim")
      .set("Authorization", `Bearer ${accessToken}`)
      .send(postBody)
      .expect(400)
      .then(({ text }) => {
        expect(text).toBe("Validation failed");
      });
  });

  test("Should return a 400 when Location name is not provided", () => {
    const postBody = {
      date: "2023-05-02T11:00:00Z",
      location: {
        id: rydalId.toString(),
      },
    };
    return request(app)
      .post("/users/swim")
      .set("Authorization", `Bearer ${accessToken}`)
      .send(postBody)
      .expect(400)
      .then(({ body }) => {
        expect(body.msg).toBe("Location name is not valid.");
      });
  });

  test("Should return a 400 when Location Id is not provided", () => {
    const postBody = {
      date: "2023-05-02T11:00:00Z",
      location: {
        name: "Rydal, Lake District",
      },
    };
    return request(app)
      .post("/users/swim")
      .set("Authorization", `Bearer ${accessToken}`)
      .send(postBody)
      .expect(400)
      .then(({ body }) => {
        expect(body.msg).toBe("Location ID is not valid.");
      });
  });

  test("Should return a 400 when url provided in swims is not a url", () => {
    const postBody = {
      date: "2023-05-02T11:00:00Z",
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
      shore: "muddy",
      bankAngle: "medium",
      clarity: "average",
      imgUrls: ["nbjksnkasn"],
      sizeKey: null,
    };
    return request(app)
      .post("/users/swim")
      .set("Authorization", `Bearer ${accessToken}`)
      .send(postBody)
      .expect(400)
      .then(({ body }) => {
        expect(body.msg).toBe("URL is not valid.");
      });
  });
});
