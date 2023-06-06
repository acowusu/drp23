const Database = require("./_db");
const db = new Database();

module.exports = async (req, res) => {

  try {
    await db.reset();
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
