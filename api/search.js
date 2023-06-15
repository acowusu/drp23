const Database = require("./_db");
const db = new Database();

const QueryBuilder = require("./_eventSearcher");
const query = new QueryBuilder({ db });

module.exports = async (req, res) => {
  const {
    body: { startAt, endAt, society, tags },
  } = req;
  console.log(startAt, endAt, society, tags);
  res.json({
    results: await query.search({ startAt, endAt, society, tags }),
  });
};
