const bodyParser = require("body-parser");
const app = require("express")();
const kv = require("@vercel/kv");
app.use(bodyParser.json());
const cache = function (req, res, next) {
  if (req?.body?.cache) {
    if (req.body) {
      kv.get(JSON.stringify(req.body)).then((value) => {
        if (value) {
          res.json(value);
        } else {
          next();
        }
      });
    } else {
      next();
    }
  }
  app.use(cache)

  app.post("/api/subscriptions", require("./_subscriptions.js"));
  app.post("/api/society", require("./_society.js"));
  app.post("/api/user", require("./_user.js"));
  app.get("/api/users", require("./_users.js"));
  app.post("/api/tags", require("./_tags.js"));
  app.post("/api/events", require("./_events.js"));
  app.post("/api/createUser", require("./_createUser.js"));
  app.post("/api/digest", require("./_digest.js"));
  app.post("/api/create", require("./_create.js"));
  app.post("/api/search", require("./_search.js"));
  app.post("/api/reset", require("./_reset.js"));
  app.post("/api/event", require("./_event.js"));
  app.post("/api/attend", require("./_attend.js"));
  app.post("/api/update_society", require("./_updateSociety.js"));
  app.post("/api/scrape_union", require("./_scrapeUnion.js"));
  app.post("/api/messages", require("./_messages.js"));
  app.post("/api/attending", require("./_attending.js"));
  module.exports = app;
