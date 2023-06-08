const Database = require("./_db");
const db = new Database();

const UserManager = require("./_userManager");
const userManager = new UserManager({ db });

module.exports = async (req, res) => {
  res.json(await userManager.getId(req.body.email));
};
