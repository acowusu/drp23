const Database = require("./_db");
const db = new Database();

const QueryBuilder = require("./_eventSearcher");

module.exports = async (req, res) => {
  const query = new QueryBuilder({ db });
  res.json(await query.allEvents());
};
