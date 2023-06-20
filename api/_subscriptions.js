const Database = require("./_db");
const db = new Database();

const SubscriptionManager = require("./_subscriptionManager");
const subscriptionManager = new SubscriptionManager({ db });

module.exports = async (req, res) => {
  const {
    body: { email = null, society = null, subscribe = null },
  } = req;

  if (!email) {
    res.status(400).json({
      error: "Need an email",
    });
  }
  if (subscribe === true) {
    await subscriptionManager.subscribe({ email, society });
  } else if (subscribe === false) {
    await subscriptionManager.unsubscribe({ email, society });
  }
  res.json(await subscriptionManager.getAll({ email }));
};
