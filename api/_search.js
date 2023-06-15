const Database = require("./_db");
const db = new Database();

const QueryBuilder = require("./_eventSearcher");
const query = new QueryBuilder({ db });

module.exports = async (req, res) => {
  const {
    body: { startAt, endAt, society, tags },
  } = req;

  res.json({
    results: query.search({ startAt, endAt, society, tags }),
  });
};
