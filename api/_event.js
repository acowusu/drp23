const Database = require("./_db");
const db = new Database();

const QueryBuilder = require("./_eventSearcher");
const query = new QueryBuilder({ db });

module.exports = async (req, res) => {
  const {
    body: { event_id },
  } = req;
  if (!event_id) {
    res.status(400).json({
      error: "Need an event id",
    });
  }

  res.json(await query.getEvent({ event_id }));
};
