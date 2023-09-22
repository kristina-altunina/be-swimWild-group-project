const { initializeApp } = require("firebase/app");
const { getAuth, signInWithEmailAndPassword } = require("firebase/auth");

const firebaseConfig = {
  apiKey: "AIzaSyABjPb5ApAILuDCTMwHUPBh78nnCLhZmMg",
  authDomain: "swimwild-c2ca7.firebaseapp.com",
  projectId: "swimwild-c2ca7",
  storageBucket: "swimwild-c2ca7.appspot.com",
  messagingSenderId: "914299090405",
  appId: "1:914299090405:web:0520e1a7b19dc4b219ab0c",
  measurementId: "G-VBBKT6LJZ5",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

function getAccessTokens() {
  const promises = [];
  promises.push(
    signInWithEmailAndPassword(auth, "test@outlook.com", "password").then(
      (userCredential) => {
        return userCredential.user.stsTokenManager.accessToken;
      }
    )
  );
  promises.push(
    signInWithEmailAndPassword(auth, "test2@outlook.com", "password").then(
      (userCredential) => {
        return userCredential.user.stsTokenManager.accessToken;
      }
    )
  );

  promises.push(
    signInWithEmailAndPassword(auth, "teser@test.com", "password").then(
      (userCredential) => {
        return userCredential.user.stsTokenManager.accessToken;
      }
    )
  );

  return Promise.all(promises);
}

module.exports = { getAccessTokens };
