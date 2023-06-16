const Database = require("./_db");
const db = new Database();
const AttendenceManager = require("./_attendenceManager");
const UserManager = require("./_userManager");
const userManager = new UserManager({ db });
const Manager = new AttendenceManager({ db });
module.exports = async (req, res) => {
  console.log(req.body);
  const { event_id, email } = req.body;
  let result;
  try {
    if (event_id) {
      result = await Manager.getCount({
        event_id,
      });

      res.json({
        count: result,
        event_id,
      });
    } else if (email) {
      result = await Manager.getAttending({
        email,
      });

      res.json(result);
    }
  } catch (e) {
    console.log(e);
    res.status(400).json({
      success: false,
    });
  }
};
