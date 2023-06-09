const Database = require("./_db");
const db = new Database();

const SocietyManager = require("./_societyManager");
const societyManager = new SocietyManager({ db });

module.exports = async (req, res) => {
  const {
    body: { name },
  } = req;
  res.json(await societyManager.get({ name }));
};
