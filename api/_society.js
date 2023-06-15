const Database = require("./_db");
const db = new Database();

const SocietyManager = require("./_societyManager");
const societyManager = new SocietyManager({ db });

module.exports = async (req, res) => {
  const body = req.body;
  if (body.society_id) {
    return res.json(
      await societyManager.getID({ society_id: body.society_id })
    );
  } else if (body.name) {
    return res.json(await societyManager.get({ name: body.name }));
  } else {
    return res.json(await societyManager.getAll());
  }
};
