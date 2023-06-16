const Database = require("./_db");
const db = new Database();

const QueryBuilder = require("./_eventSearcher");
const query = new QueryBuilder({ db });

module.exports = async (req, res) => {
  if (req?.body?.name) {
    res.json(await query.eventsBySociety({ society: req.body.name }));
  } else if (req?.body?.all) {
    res.json(await query.allEvents());
  } else {
    res.json(await query.eventsToday());
  }
};
