const Database = require("./db");
const db = new Database();

const EventMaker = require("./eventMaker");

module.exports = async (req, res) => {
  const {
    query: { name,
      description,
      thumbnail,
      society,
      location,
      start_datetime,
      price,
      latitude,
      longitude, },
  } = req;
  const Maker = new EventMaker({ db });

  try {
    Maker.create({
      name,
      description,
      thumbnail,
      society,
      location,
      start_datetime,
      price,
      latitude,
      longitude
    })
    res.json({
      success: false
    })
  } catch {
    res.status(400).json({
      success: false
    })
  }

};