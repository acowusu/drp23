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
    res.json(await subscriptionManager.subscribe({ email, society }));
  } else if (subscribe === false) {
    res.json(await subscriptionManager.unsubscribe({ email, society }));
  } else {
    res.json(await subscriptionManager.getAll({ email }));
  }
};
