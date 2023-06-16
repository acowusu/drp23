const Database = require("./_db");
const db = new Database();

const SocietyManager = require("./_societyManager");
const societyManager = new SocietyManager({ db });

module.exports = async (req, res) => {
  const {
    body: { name, description, metadata },
  } = req;
  res.json(await societyManager.update({ name, description, metadata }));
};
