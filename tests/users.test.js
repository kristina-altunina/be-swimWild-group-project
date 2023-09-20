const { app } = require("../server");
const request = require("supertest");
const mongoose = require("mongoose");
const Users = require("../models/users-model");

const { testSeed } = require("../models/seed");
const locations = require("../test-data/locations");
const users = require("../test-data/users");
const { getAccessTokens } = require("./access-token");

require("dotenv").config();

let accessToken;
let registeredAccessToken;

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
  return Promise.all(promises);
});

beforeEach(() => {
  return testSeed(locations, users);
});

afterAll(() => {
  return mongoose.connection.close();
});

describe("GET /users/profile", () => {
  test("should respond 401 Unauthorized when no access token provided", () => {
    return request(app).get("/users/profile").expect(401);
  });
  test("should respond 200 if passed valid access token", () => {
    return request(app)
      .get("/users/profile")
      .set("Authorization", `Bearer ${accessToken}`)
      .expect(200);
  });
  test("should respond with correct user information", () => {
    return request(app)
      .get("/users/profile")
      .set("Authorization", `Bearer ${accessToken}`)
      .then(({ body }) => {
        expect(body).toMatchObject({
          name: "testUser",
          nickname: "tester",
          dob: "1997-09-02T11:00:00.000Z",
          profileImg: "http://lookatme.jpg",
          swims: [],
        });
      });
  });
});

describe("POST /users", () => {
  test("should respond with and create user", () => {
    const postBody = {
      name: "Test User",
      nickname: "test",
      profileImg: "https://i.redd.it/p6f66n7xbmb11.jpg",
      dob: "1997-08-29T18:00:00+0000",
    };
    return request(app)
      .post("/users")
      .send(postBody)
      .set("Authorization", `Bearer ${registeredAccessToken}`)
      .expect(201)
      .then(({ body }) => {
        expect(body).toMatchObject({
          uid: "ChYMb6pn4sQn4Hs0qt6XW9TaE742",
          name: "Test User",
          nickname: "test",
          profileImg: "https://i.redd.it/p6f66n7xbmb11.jpg",
          dob: "1997-08-29T18:00:00.000Z",
        });
      });
  });
  test("should respond with 400 if uid already exists", () => {
    const postBody = {
      name: "Test User Duplicate",
      nickname: "nickname",
      profileImg: "https://i.redd.it/p6f66n7xbmb11.jpg",
      dob: "1997-08-29T18:00:00+0000",
    };
    return request(app)
      .post("/users")
      .send(postBody)
      .set("Authorization", `Bearer ${accessToken}`)
      .expect(400);
  });
  test("should respond with 400 if nickname already exists", () => {
    const postBody = {
      name: "Test User Duplicate",
      nickname: "tester",
      profileImg: "https://i.redd.it/p6f66n7xbmb11.jpg",
      dob: "1997-08-29T18:00:00+0000",
    };
    return request(app)
      .post("/users")
      .send(postBody)
      .set("Authorization", `Bearer ${registeredAccessToken}`)
      .expect(400);
  });
  test("should respond with 400 if body missing name", () => {
    const postBody = {
      nickname: "newnickname",
      profileImg: "https://i.redd.it/p6f66n7xbmb11.jpg",
      dob: "1997-08-29T18:00:00+0000",
    };
    return request(app)
      .post("/users")
      .send(postBody)
      .set("Authorization", `Bearer ${registeredAccessToken}`)
      .expect(400);
  });
  test("should respond with 400 if body missing nickname", () => {
    const postBody = {
      name: "my name",
      profileImg: "https://i.redd.it/p6f66n7xbmb11.jpg",
      dob: "1997-08-29T18:00:00+0000",
    };
    return request(app)
      .post("/users")
      .send(postBody)
      .set("Authorization", `Bearer ${registeredAccessToken}`)
      .expect(400);
  });
  test("should respond with 400 if body missing dob", () => {
    const postBody = {
      name: "my name",
      nickname: "https://i.redd.it/p6f66n7xbmb11.jpg",
      profileImg: "https://i.redd.it/p6f66n7xbmb11.jpg",
    };
    return request(app)
      .post("/users")
      .send(postBody)
      .set("Authorization", `Bearer ${registeredAccessToken}`)
      .expect(400);
  });
  test("should respond with 400 if image url invalid", () => {
    const postBody = {
      name: "my name",
      nickname: "https://i.redd.it/p6f66n7xbmb11.jpg",
      profileImg: "https://i.redd.it/p6f66n7xbmb11.notanimage",
    };
    return request(app)
      .post("/users")
      .send(postBody)
      .set("Authorization", `Bearer ${registeredAccessToken}`)
      .expect(400);
  });
});

describe("PATCH /users/", () => {
  test("should respond 401 Unauthorized when no access token provided", () => {
    return request(app).patch("/users").expect(401);
  });
  test("responds with correct user information when passed correctly formated body", () => {
    const toUpdate = {
      nickname: "dobbyforRon",
      profileImg:
        "https://static.wikia.nocookie.net/harrypotter/images/8/82/Dobby.jpg",
    };
    return request(app)
      .patch("/users")
      .send(toUpdate)
      .set("Authorization", `Bearer ${accessToken}`)
      .expect(200)
      .then(({ body }) => {
        expect(body).toMatchObject({
          name: "testUser",
          nickname: "dobbyforRon",
          profileImg:
            "https://static.wikia.nocookie.net/harrypotter/images/8/82/Dobby.jpg",
          dob: "1997-09-02T11:00:00.000Z",
          swims: [],
        });
      });
  });
  test("Should return 400 error when passed incorrect body", () => {
    const toUpdateBad = {
      nickname: 300,
      profileImg:
        "https://static.wikia.nocookie.net/harrypotter/images/8/82/Dobby.jpg",
    };
    return request(app)
      .patch("/users")
      .set("Authorization", `Bearer ${accessToken}`)
      .send(toUpdateBad)
      .expect(400)
      .then(({ body }) => {
        expect(body.msg).toBe("Nickname should be a string");
      });
  });
  test("Should return 400 error when passed incorrect body", () => {
    const toUpdateBad = {
      nickname: "hello",
      profileImg: "fish",
    };
    return request(app)
      .patch("/users")
      .set("Authorization", `Bearer ${accessToken}`)
      .send(toUpdateBad)
      .expect(400)
      .then(({ body }) => {
        expect(body.msg).toBe("fish is not a valid URL");
      });
  });
  test("Should return 400 error when passed incorrect body", () => {
    const toUpdateBad = {};
    return request(app)
      .patch("/users")
      .set("Authorization", `Bearer ${accessToken}`)
      .send(toUpdateBad)
      .expect(400)
      .then(({ body }) => {
        expect(body.msg).toBe(
          "Please enter a nickname or profile image to update"
        );
      });
  });
  test("Should return 400 error when passed incorret body", () => {
    const toUpdateBad = {
      nickname: null,
      profileImg: null,
    };
    return request(app)
      .patch("/users")
      .set("Authorization", `Bearer ${accessToken}`)
      .send(toUpdateBad)
      .expect(400)
      .then(({ body }) => {
        expect(body.msg).toBe(
          "Please enter a nickname or profile image to update"
        );
      });
  });
});

describe("GET /users/:uid", () => {
  test("returns correct user info", () => {
    return request(app)
      .get("/users/UHaKMQx4MLbrELny74UYMyUBcOm2")
      .expect(200)
      .then(({ body }) => {
        expect(body).toMatchObject({
          name: "testUser",
          nickname: "tester",
          dob: "1997-09-02T11:00:00.000Z",
          profileImg: "http://lookatme.jpg",
          swims: [],
        });
      });
  });
  test("returns correct error message for non-existent user", () => {
    return request(app)
      .get("/users/32222")
      .expect(404)
      .then(({ body }) => {
        expect(body.msg).toBe("user not found");
      });
  });
});

describe("DELETE /users/profile", () => {
  test("should respond 401 Unauthorized when no access token provided", () => {
    return request(app).delete("/users/profile").expect(401);
  });
  test("should respond 204 if passed valid access token, and remove the relavent profile from the database", () => {
    return request(app)
      .delete("/users/profile")
      .set("Authorization", `Bearer ${accessToken}`)
      .expect(204)
      .then(() => {
        return Users.find({ uid: { $eq: "UHaKMQx4MLbrELny74UYMyUBcOm2" } });
      })
      .then((response) => {
        expect(response).toEqual([]);
      });
  });
});
