module.exports = class {
  constructor({ db, email }) {
    this.db = db;
    this.email = email;
  }

  async subscribe({ email, society }) {
    const client = await this.db.getClient();
    try {
      await client.query("BEGIN");
      const user_result = await client.query(
        /*sql */ `
        SELECT user_id
        FROM users
        WHERE email = $1`,
        [email]
      );
      const user_id = user_result.rows[0].user_id;
      const society_result = await client.query(
        /*sql */ `
        SELECT society_id
        FROM society
        WHERE name = $1`,
        [society]
      );
      const society_id = society_result.rows[0].society_id;
      const insertResult = await client.query(
        `INSERT INTO subscription (user_id, society_id)
         VALUES ($1, $2) RETURNING subscription_id`,
        [user_id, society_id]
      );
      const subscriptionId = insertResult.rows[0].subscription_id;
      await client.query("COMMIT");
      return subscriptionId;
    } catch (e) {
      await client.query("ROLLBACK");
      throw e;
    } finally {
      client.release();
    }
  }
  async unsubscribe({ email, society }) {
    const client = await this.db.getClient();
    try {
      await client.query("BEGIN");
      const user_result = await client.query(
        /*sql */ `
        SELECT user_id
        FROM users
        WHERE email = $1`,
        [email]
      );
      const user_id = user_result.rows[0].user_id;
      const society_result = await client.query(
        /*sql */ `
        SELECT society_id
        FROM society
        WHERE name = $1`,
        [society]
      );
      const society_id = society_result.rows[0].society_id;
      const insertResult = await client.query(
        `DELETE FROM subscription WHERE user_id = $1 AND society_id = $2 RETURNING subscription_id`,
        [user_id, society_id]
      );
      const subscriptionId = insertResult.rows[0].subscription_id;
      await client.query("COMMIT");
      return subscriptionId;
    } catch (e) {
      await client.query("ROLLBACK");
      throw e;
    } finally {
      client.release();
    }
  }
  async getAll({ email }) {
    return this.db.getRows(
      /*sql */ `
      SELECT
        s.society_id, 
        s.name,
        s.type,
        s.description,
        s.metadata
      FROM society s
      JOIN subscription ss ON ss.society_id = s.society_id
      JOIN users u ON u.user_id = ss.user_id
      WHERE u.email = $1`,
      [email]
    );
  }
  async notify(event) {
    const result = await this.db.getRows(
      /*sql */ `
      SELECT u.email
      FROM subscription ss
      JOIN users u ON u.user_id = ss.user_id
      JOIN society s  ON s.society_id = ss.society_id
      WHERE s.name = $1`,
      [event.society]
    );
    const to = result.map((row) => row.email);
    const subject = `New Event for ${event.society}`;
    const content = `A new event has been created for ${event.society}!
    <h1>${event.name}</h1>
    
    <img src="${event.image_url}" alt="${event.name}"/>
    <p>${event.description}</p>
    <p>${event.location}</p>
    <p>${event.date_time}</p>
    <p>${event.ticket_price}</p>
    `;
    await this.email.send({ to, subject, content });
  }
};
