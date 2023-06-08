require("dotenv").config();
const postmark = require("postmark");

const config = {
  key: process.env.postmark_api,
};
module.exports = class Email {
  constructor() {
    this.client = new postmark.ServerClient(config.key);
  }
  getClient() {
    return this.client;
  }
  async send({ content, subject, to }) {
    if (typeof to === "string") {
      to = [to];
    }
    if (to.length === 0) {
      return;
    }
    await this.client.sendEmailBatch(
      to.map((To) => {
        return {
          From: "noreply@whatson.vercel.app",
          To,
          Subject: subject,
          HtmlBody: content,
        };
      })
    );
  }
};
