const Database = require("./db");
const db = new Database();

const QueryBuilder = require("./eventSearcher");

module.exports = async (req, res) => {
  const {
    body: { startAt, endAt, society, tags },
  } = req;
  const query = new QueryBuilder({ startAt, endAt, society, tags, db });

  res.json({
    results: query.getAllResults(),
  });
};
