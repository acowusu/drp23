const Database = require("./_db");
const db = new Database();

const SubscriptionManager = require("./_subscriptionManager");
const subscriptionManager = new SubscriptionManager({ db });

module.exports = async (req, res) => {
  const {
    body: { email = null },
  } = req;

  if (!email) {
    res.status(400).json({
      error: "Need an email",
    });
  }

  res.json(await subscriptionManager.getAll({ email }));
};
