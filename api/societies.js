const Database = require("./_db");
const db = new Database();

const SocietyManager = require("./_societyManager");
const sosietyManager = new SocietyManager({ db });

module.exports = async (req, res) => {
  res.json(await sosietyManager.getAll());
};
