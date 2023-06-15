const Database = require("./_db");
const db = new Database();
const SubscriptionManager = require("./_subscriptionManager");
const Email = require("./_email");
const email = new Email();
const subscriptionManager = new SubscriptionManager({ db, email });
module.exports = async (req, res) => {
  const users = await db.getAllUsers();
  for (const user of users) {
    const { email, society } = user;
    await subscriptionManager.sendDigest({ email, society });
  }
  res.json({ success: true });
};
