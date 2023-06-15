const Database = require("./_db");
const db = new Database();

const UserManager = require("./_userManager");
const userManager = new UserManager({ db });

module.exports = async (req, res) => {
  try {
    res.json({ user_id: await userManager.getId({ email: req.body.email }) });
  } catch (e) {
    userManager.create({ email: req.body.email }).then((user_id) => {
      res.json({ user_id });
    });
  }
};
