const Database = require("./_db");
const db = new Database();
const SubscriptionManager = require("./_subscriptionManager");
const Email = require("./_email");
const email = new Email();
const subscriptionManager = new SubscriptionManager({ db, email });
const MessageManager = require("./_messageManager");
const messageManager = new MessageManager();
const EventMaker = require("./_eventMaker");
const Maker = new EventMaker({ db, subscriptionManager, messageManager });

module.exports = async (req, res) => {
  const {
    body: {
      name,
      description,
      image_url,
      society,
      location,
      date_time,
      ticket_price,
      latitude,
      longitude,
      tags,
    },
  } = req;

  try {
    const event_id = await Maker.create({
      name,
      description,
      image_url,
      society,
      location,
      date_time,
      ticket_price,
      latitude,
      longitude,
      tags,
    });
    res.json({
      success: true,
      event_id,
    });
  } catch (e) {
    console.log(e);
    res.status(400).json({
      success: false,
    });
  }
};
