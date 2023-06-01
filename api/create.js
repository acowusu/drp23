const Database = require("./db");
const db = new Database();

const EventMaker = require("./eventMaker");

module.exports = async (req, res) => {
  const {
    body: {
      name,
      description,
      thumbnail,
      society,
      location,
      start_datetime,
      price,
      latitude,
      longitude,
      tags,
    },
  } = req;
  const Maker = new EventMaker({ db });

  try {
    await Maker.create({
      name,
      description,
      thumbnail,
      society,
      location,
      start_datetime,
      price,
      latitude,
      longitude,
      tags,
    });
    res.json({
      success: true,
    });
  } catch {
    res.status(400).json({
      success: false,
    });
  }
};
