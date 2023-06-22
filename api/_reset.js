const Database = require("./_db");
const db = new Database();
const EventSearher = require("./_eventSearcher");
const SocietyManager = require("./_societyManager");
const eventSearcher = new EventSearher({db});
const societyManager = new SocietyManager({db});
const fs = require("fs");
const {kv} = require("@vercel/kv");

module.exports = async (req, res) => {
  try {
    await kv.flushall();
    const schema = fs.readFileSync(__dirname + "/../sql/schema.sql", {
      encoding : "utf8",
      flag : "r",
    });
    const test_data = fs.readFileSync(__dirname + "/../sql/test_data.sql", {
      encoding : "utf8",
      flag : "r",
    });
    const society_data = fs.readFileSync(__dirname + "/../sql/society.sql", {
      encoding : "utf8",
      flag : "r",
    });
    await db.execute(schema + "\n\n" + test_data + "\n\n" + society_data);
    const searchableData = [
      ...(await eventSearcher.allEvents()),
      ...(await societyManager.getAll()),
    ];
    await db.getIndex().clearObjects();
    await db.getIndex().saveObjects(searchableData, true);

    res.json({
      success : true,
    });
  } catch (e) {
    console.log(e);
    res.status(400).json({
      success : false,
      e,
    });
  }
};
