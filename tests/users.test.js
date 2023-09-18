const { app } = require("../server");
const request = require("supertest");
const mongoose = require("mongoose");

const { testSeed } = require("../models/seed");
const locations = require("../test-data/locations");
const users = require("../test-data/users");
const { accessToken } = require("./access-token");

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

describe("PATCH /users/", () => {
  test("should respond 401 Unauthorized when no access token provided", () => {
    return request(app).patch("/users").expect(401);
  });
  test("should respond 200 if passed valid access token", () => {
    const toUpdateFirst =
      {
        "nickname": "helloThere",
        "profileImg": "https://static1.srcdn.com/wordpress/wp-content/uploads/2022/03/Obi-Wan-Kenobi-Hello-There.jpg"
    }
    return request(app)
      .patch("/users")
      .send(toUpdateFirst)
      .set("Authorization", `Bearer ${accessToken}`)
      .expect(200);
  });
  test("responds with correct user information", () => {
    const toUpdateSecond =
      {
        "nickname": "dobbyforHarry",
        "profileImg": "https://static.wikia.nocookie.net/harrypotter/images/8/82/Dobby.jpg"
    }
    return request(app)
      .patch("/users")
      .send(toUpdateSecond)
      .set("Authorization", `Bearer ${accessToken}`)
      .then(({body}) => {
        console.log(body)
        expect(body).toMatchObject({
            name: 'testUser',
            nickname: 'dobbyforHarry',
            profileImg: 'https://static.wikia.nocookie.net/harrypotter/images/8/82/Dobby.jpg',
            dob: '1997-09-02T11:00:00.000Z',
            swims: []
        })
      });
  });
});
