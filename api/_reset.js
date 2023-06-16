const Database = require("./_db");
const db = new Database();
import EventSearher from "./_eventSearcher";
import SocietyManager from "./_societyManager";
const eventSearcher = new EventSearher({ db });
const societyManager = new SocietyManager({ db });
const fs = require("fs");

module.exports = async (req, res) => {
  try {
    const schema = fs.readFileSync(__dirname + "/../sql/schema.sql", {
      encoding: "utf8",
      flag: "r",
    });
    const test_data = fs.readFileSync(__dirname + "/../sql/test_data.sql", {
      encoding: "utf8",
      flag: "r",
    });
    await db.execute(schema + "\n\n" + test_data);
    const searchableData = [
      ...(await eventSearcher.allEvents()),
      ...(await societyManager.getAll()),
    ];
    await db.getIndex().clearObjects();
    await db.getIndex().saveObjects(searchableData, true);

    res.json({
      success: true,
    });
  } catch (e) {
    console.log(e);
    res.status(400).json({
      success: false,
      e,
    });
  }
};
