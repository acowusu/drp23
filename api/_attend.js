const Database = require("./_db");
const db = new Database();
const AttendenceManager = require("./_attendenceManager");
const UserManager = require("./_userManager");
const userManager = new UserManager({db});
const Manager = new AttendenceManager({db});
module.exports = async (req, res) => {
  console.log(req.body);
  const {attending, event_id, email} = req.body;

  try {
    const user_id = await userManager.getId({email});
    console.log("USER: ", user_id);
    console.log("EVENT: ", event_id);
    let result;
    if (attending) {
      result = await Manager.create({
        event_id,
        user_id,
      });
    } else {
      result = await Manager.delete({
        event_id,
        user_id,
      });
    }
    res.json({
      success : true,
      event_id : result,
    });
  } catch (e) {
    console.log(e);
    res.status(400).json({
      success : false,
    });
  }
};
