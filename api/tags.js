const Database = require("./_db");
const db = new Database();

const TagManager = require("./_tagMangager");

module.exports = async (req, res) => {
  const tagMangager = new TagManager({db});
  res.json(await tagMangager.getAll());
};
