// const { auth, requiresAuth } = require("express-openid-connect");
const https = require("https");
const fs = require("fs");

// const config = {
//   authRequired: false,
//   auth0Logout: true,
//   secret: "a long, randomly-generated string stored in env",
//   baseURL: "https://localhost:3000",
//   clientID: "5C2EqQWoR4YjcorL94wNGeXc3xV2Pe59",
//   issuerBaseURL: "https://dev-uebk5d5vk8z36y86.us.auth0.com",
// };

// auth router attaches /login, /logout, and /callback routes to the baseURL
// app.use(auth(config));

// app.get("/profile", requiresAuth(), (req, res) => {
//   res.send(JSON.stringify(req.oidc.user));
// });

// req.isAuthenticated is provided from the auth router

// app.get("/callback", (req, res) => {
//   res.send("hi");
// });

// https
//   .createServer(
//     {
//       key: fs.readFileSync("server.key"),
//       cert: fs.readFileSync("server.cert"),
//     },
//     app
//   )
//   .listen(3000, function () {
//     console.log("Listening on port 3000 with HTTPS");
//   });
