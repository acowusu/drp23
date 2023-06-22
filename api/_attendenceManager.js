module.exports = class {
  constructor({ db }) {
    this.db = db;
  }

  async getCount({ event_id }) {
    const client = await this.db.getClient();
    try {
      await client.query("BEGIN");
      const result = await client.query(
        /*sql */ `
        SELECT COUNT(*) FROM attending
        WHERE event_id = $1`,
        [event_id]
      );
      return result.rows[0].count;
    } catch (e) {
      await client.query("ROLLBACK");
      throw e;
    }
  }
  async getAttending({ email }) {
    const client = await this.db.getClient();
    try {
      await client.query("BEGIN");
      const user_result = await client.query(
        /*sql */ `
        SELECT e.event_id,
       e.name,
       e.description,
       e.image_url,
       e.society,
       e.location,
       e.date_time,
       e.ticket_price,
       e.latitude,
       e.longitude
       FROM events e
       JOIN attending on attending.event_id = e.event_id
       LEFT JOIN eventTags et ON e.event_id = et.event_id
       LEFT JOIN tags t ON et.tag_id = t.tag_id
       WHERE attending.user_id = (SELECT user_id FROM users WHERE email = $1)
          `,
        [email]
      );
      return user_result.rows.splice(0, user_result.rowCount);
    } catch (e) {
      await client.query("ROLLBACK");
      throw e;
    }
  }
  async create({ user_id, event_id }) {
    const client = await this.db.getClient();
    try {
      await client.query("BEGIN");
      const user_result = await client.query(
        /*sql */ `
        INSERT INTO attending (user_id, event_id)
        VALUES ($1, $2) RETURNING event_id`,
        [user_id, event_id]
      );
      event_id = user_result.rows[0].event_id;
      await client.query("COMMIT");
      return event_id;
    } catch (e) {
      await client.query("ROLLBACK");
      throw e;
    } finally {
      client.release();
    }
  }
  async delete({ user_id, event_id }) {
    const client = await this.db.getClient();
    try {
      await client.query("BEGIN");
      const user_result = await client.query(
        /*sql */ `
        DELETE FROM  attending 
        WHERE  user_id = $1 AND event_id =  $2
        RETURNING event_id`,
        [user_id, event_id]
      );
      event_id = user_result.rows[0].event_id;
      await client.query("COMMIT");
      return event_id;
    } catch (e) {
      await client.query("ROLLBACK");
      throw e;
    } finally {
      client.release();
    }
  }
};
