const Database = require("./_db");
const db = new Database();

const QueryBuilder = require("./_eventSearcher");
const query = new QueryBuilder({ db });

module.exports = async (req, res) => {
  if (req?.body?.society) {
    res.json(await query.eventsBySociety({ society: req.body.society }));
  } else {
    res.json(await query.eventsToday());
  }
};
