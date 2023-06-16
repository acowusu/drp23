const MessageManager = require("./_messageManager");
const Messages = new MessageManager();

module.exports = async (req, res) => {
  const {
    body: { message, event_id },
  } = req;

  await Messages.push({
    message,
    event_id,
  });
  res.json({
    success: true,
  });
};
