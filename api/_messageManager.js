var admin = require("firebase-admin");
require("dotenv").config();

admin.initializeApp({
  credential: admin.credential.cert(JSON.parse(process.env.firebase_key)),
  databaseURL:
    "https://drp-whatson-default-rtdb.europe-west1.firebasedatabase.app",
});

// As an admin, the app has access to read and write all data, regardless of Security Rules

module.exports = class {
  constructor() {
    this.db = admin.database();
    this.messages = this.db.ref("messages");
  }

  init({ event_id }) {
    console.log("init");
    return this.push({ event_id, message: "Event created" });
  }
  push({ event_id, message }) {
    console.log("push", event_id, message);
    return this.messages.child(event_id).push().set({
      message: message,
      timestamp: Date.now(),
    });
  }
};
