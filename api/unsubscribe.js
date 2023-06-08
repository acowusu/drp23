const Database = require("./_db");
const db = new Database();

const SubscriptionManager = require("./_subscriptionManager");
const subscriptionManager = new SubscriptionManager({ db });

module.exports = async (req, res) => {
  const {
    body: { email = null, society = null },
  } = req;

  if (!email || !society) {
    res.status(400).json({
      error: "Need an email and society",
    });
  }

  res.json(await subscriptionManager.unsubscribe({ email, society }));
};
