const Database = require("./_db");
const db = new Database();

const TagManager = require("./_tagMangager");
const tagMangager = new TagManager({ db });

module.exports = async (req, res) => {
  res.json(await tagMangager.getAll());
};
