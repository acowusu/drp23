const Database = require("./_db");
const db = new Database();

const SocietyManager = require("./_societyManager");
const societyManager = new SocietyManager({ db });

module.exports = async (req, res) => {
  const {
    body: {
        society_id
    }
  } = req;
  console.log(society_id);
  res.json(await societyManager.getID({ society_id }));
};
