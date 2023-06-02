const Database = require("./_db");
const db = new Database();

module.exports = async (req, res) => {
  console.log(req.body);
  const {
    body: { force },
  } = req;

  try {
    await db.reset(force);
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
