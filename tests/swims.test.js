const { app } = require("../server");
const request = require("supertest");
const mongoose = require("mongoose");

const { testSeed } = require("../models/seed");
const locations = require("../test-data/locations");
const users = require("../test-data/users");
const { getAccessTokens } = require("./access-token");
const Locations = require("../models/locations-model");
const Users = require("../models/users-model");

require("dotenv").config();

let accessToken;
let registeredAccessToken;
let swimRegisterToken;
let rydalId = "";
let swimId = "";
let elieId = "";
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
    getAccessTokens().then(
      ([unregisteredToken, registeredToken, swimRegisteredToken]) => {
        console.log(unregisteredToken, registeredToken, swimRegisteredToken);
        accessToken = unregisteredToken;
        registeredAccessToken = registeredToken;
        swimRegisterToken = swimRegisteredToken;
      }
    )
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
    })
    .then(() => {
      return Users.find({ uid: "QyqF2JQjSEY6TOqDvdaSAd99WyA2" })
        .then((user) => {
          const date = new Date("2023-08-29T18:00:00.000Z");
          return user[0].swims.find((s) => s.date.getTime() === date.getTime());
        })
        .then((swim) => {
          swimId = swim._id.toString();
        })
        .then(() => {
          return Locations.findOne({ name: "Elie Beach, Fife" });
        })
        .then((location) => {
          return (elieId = location._id);
        });
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
      .set("Authorization", `Bearer ${swimRegisterToken}`)
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

  test ("Should return a 400 when date is not provided", () => {
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
      .then(({ body }) => {
        expect(body.msg).toBe("Fields are needed for completion");
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

  test("Should return a 400 when no location details are not provided", () => {
    const postBody = {
      date: "2023-05-02T11:00:00Z"
    };
    return request(app)
      .post("/users/swim")
      .set("Authorization", `Bearer ${accessToken}`)
      .send(postBody)
      .expect(400)
      .then(({ body }) => {
        expect(body.msg).toBe("Fields are needed for completion");
      });
  });

   test("Should return a 400 when body is empty", () => {
     const postBody = {
     };
     return request(app)
       .post("/users/swim")
       .set("Authorization", `Bearer ${accessToken}`)
       .send(postBody)
       .expect(400)
       .then(({ body }) => {
         expect(body.msg).toBe("Fields are needed for completion");
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


describe("PATCH/users/swim/:swimId", () => {
  test("respond 401 Unauthorized when no access token provided", () => {
    return request(app)
      .patch(`/users/swim/${swimId}`)
      .expect(401);
  });

  test("be able to update swim details and respond with 200", () => {
    const patchBody = {
      location: {
        name: "Rydal, Lake District",
        id: rydalId.toString(),
      },
      date: "2022-05-02T11:00:00Z",
      notes: "Water Freezing",
      stars: 5,
      recordTemp: -2,
      feelTemp: "average",
      mins: 20,
      km: 1,
      outOfDepth: true,
      shore: "sandy",
      bankAngle: "steep",
      clarity: "murky",
      imgUrls: [
        "https://assets.bedful.com/images/c36604cce170b0e7b1e6504ac794699d3e538b47/small.jpg",
      ],
      sizeKey: "tiny",
    };
    return request(app)
      .patch(`/users/swim/${swimId}`)
      .send(patchBody)
      .set("Authorization", `Bearer ${swimRegisterToken}`)
      .expect(200)
      .then(({ body }) => {
        expect(body).toMatchObject({
          date: "2022-05-02T11:00:00.000Z",
          notes: "Water Freezing",
          stars: 5,
          location: {
            name: "Rydal, Lake District",
            id: rydalId.toString(),
          },
          recordTemp: -2,
          feelTemp: "average",
          mins: 20,
          km: 1,
          outOfDepth: true,
          shore: "sandy",
          bankAngle: "steep",
          clarity: "murky",
          imgUrls: [
            "https://assets.bedful.com/images/c36604cce170b0e7b1e6504ac794699d3e538b47/small.jpg",
          ],
          sizeKey: "tiny",
        });
      });
  });

  test("be able to update swim details and respond with 200", () => {
    const patchBody = {
      recordTemp: 2,
    };
    return request(app)
      .patch(`/users/swim/${swimId}`)
      .send(patchBody)
      .set("Authorization", `Bearer ${swimRegisterToken}`)
      .expect(200)
      .then(({ body }) => {
        expect(body).toMatchObject({
          location: {
            id: elieId.toString(),
            name: "Elie Beach, Fife",
          },
          date: "2023-08-29T18:00:00.000Z",
          notes:
            "Extremely cold, wetsuit necessary. Clear water though, but lots of seaweed and still quite shallow a long way out.",
          stars: 3,
          recordTemp: 2,
          feelTemp: "freezing",
          mins: 20,
          km: 0.5,
          outOfDepth: false,
          shore: "sandy",
          bankAngle: "shallow",
          clarity: "clear",
          imgUrls: [
            "https://assets.bedful.com/images/c36604cce170b0e7b1e6504ac794699d3e538b47/small.jpg",
          ],
          sizeKey: "large",
        });
      });
  });

   test("be able to update swim details and respond with 200", () => {
     const patchBody = {
       imgUrls: [
         "https://assets.bedful.com/images/c36604cce170b0e7b1e6504ac794699d3e538b47/small.jpg",
         "https://www.google.com/search?q=rydal+lake+district&tbm=isch&ved=2ahUKEwi4js-KqbuBAxWGmicCHSppA08Q2-cCegQIABAA&oq=rydal+lake+di&gs_lcp=CgNpbWcQARgAMgUIABCABDIGCAAQCBAeMgYIABAIEB4yBggAEAgQHjIGCAAQCBAeMgYIABAIEB4yBggAEAgQHjIGCAAQCBAeMgcIABAYEIAEMgcIABAYEIAEOgQIIxAnUOIDWPAZYOwiaABwAHgAgAFFiAHNA5IBATiYAQCgAQGqAQtnd3Mtd2l6LWltZ8ABAQ&sclient=img&ei=jwMMZfiKHIa1nsEPqtKN-AQ&bih=585&biw=1130",
      ],
     };
     return request(app)
       .patch(`/users/swim/${swimId}`)
       .send(patchBody)
       .set("Authorization", `Bearer ${swimRegisterToken}`)
       .expect(200)
       .then(({ body }) => {
         expect(body).toMatchObject({
           location: {
             id: elieId.toString(),
             name: "Elie Beach, Fife",
           },
           date: "2023-08-29T18:00:00.000Z",
           notes:
             "Extremely cold, wetsuit necessary. Clear water though, but lots of seaweed and still quite shallow a long way out.",
           stars: 3,
           recordTemp: null,
           feelTemp: "freezing",
           mins: 20,
           km: 0.5,
           outOfDepth: false,
           shore: "sandy",
           bankAngle: "shallow",
           clarity: "clear",
           imgUrls: [
             "https://assets.bedful.com/images/c36604cce170b0e7b1e6504ac794699d3e538b47/small.jpg",
             "https://www.google.com/search?q=rydal+lake+district&tbm=isch&ved=2ahUKEwi4js-KqbuBAxWGmicCHSppA08Q2-cCegQIABAA&oq=rydal+lake+di&gs_lcp=CgNpbWcQARgAMgUIABCABDIGCAAQCBAeMgYIABAIEB4yBggAEAgQHjIGCAAQCBAeMgYIABAIEB4yBggAEAgQHjIGCAAQCBAeMgcIABAYEIAEMgcIABAYEIAEOgQIIxAnUOIDWPAZYOwiaABwAHgAgAFFiAHNA5IBATiYAQCgAQGqAQtnd3Mtd2l6LWltZ8ABAQ&sclient=img&ei=jwMMZfiKHIa1nsEPqtKN-AQ&bih=585&biw=1130",
           ],
           sizeKey: "large",
         });
       });
   });
  
  
  test("send 400 when updating an empty body ", () => {
    const patchBody = {}
    return request(app)
      .patch(`/users/swim/${swimId}`)
      .send(patchBody)
      .set("Authorization", `Bearer ${swimRegisterToken}`)
      .expect(400)
      .then(({ body }) => {
        expect(body.msg).toBe("Nothing to post.");
          
      });
  });

  test("Should return a 400 when incorrect patch body is sent", () => {
    const patchBody = {
      location: {
        name: "Lake District",
      },
    };
    return request(app)
      .patch(`/users/swim/${swimId}`)
      .send(patchBody)
      .set("Authorization", `Bearer ${swimRegisterToken}`)
      .expect(400)
      .then(({ body }) => {
        expect(body.msg).toBe("Location name is not valid.");
      });
  });

  test("Should return a 400 when incorrect patch body is sent", () => {
    const patchBody = {
      location: {
        name: "Rydal, Lake District",
      },
    };
    return request(app)
      .patch(`/users/swim/${swimId}`)
      .send(patchBody)
      .set("Authorization", `Bearer ${swimRegisterToken}`)
      .expect(400)
      .then(({ body }) => {
        expect(body.msg).toBe("Location ID is not valid.");
      });
  });

    test("Should return a 400 when incorrect url is sent", () => {
      const patchBody = {
        imgUrls: [
          "fsscsdcsdcs"
        ]
      };
      return request(app)
        .patch(`/users/swim/${swimId}`)
        .send(patchBody)
        .set("Authorization", `Bearer ${swimRegisterToken}`)
        .expect(400)
        .then(({ body }) => {
          expect(body.msg).toBe("URL is not valid.");
        });
    });


});
