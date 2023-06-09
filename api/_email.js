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
    console.log("Sending email to", to, process.env.postmark_api);
    if (typeof to === "string") {
      to = [to];
    }
    if (to.length === 0) {
      return;
    }
    try {
      console.log(
        await this.client.sendEmailBatch(
          to.map((To) => {
            return {
              From: "ao921@ic.ac.uk",
              To,
              Subject: subject,
              HtmlBody: content,
              MessageStream: "broadcast",
            };
          })
        )
      );
    } catch (e) {
      console.log(e);
    }
  }
};
