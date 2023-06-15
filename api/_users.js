const Database = require("./_db");
const db = new Database();

const UserManager = require("./_userManager");
const userManager = new UserManager({ db });

module.exports = async (req, res) => {
  try {
    res.json(await userManager.getAll());
  } catch (e) {
    res.json({ error: e });
  }
};
