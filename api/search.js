const Database = require("./_db");
const db = new Database();

const QueryBuilder = require("./_eventSearcher");

module.exports = async (req, res) => {
  const {
    body: { startAt, endAt, society, tags },
  } = req;
  const query = new QueryBuilder({ db });

  res.json({
    results: query.search({ startAt, endAt, society, tags }),
  });
};
