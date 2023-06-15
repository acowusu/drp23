module.exports = class {
  constructor({ db }) {
    this.db = db;
  }

  async getAttending({ email }) {
    const client = await this.db.getClient();
    try {
      await client.query("BEGIN");
      const user_result = await client.query(
        /*sql */ `
        SELECT event_id FROM attending
        WHERE user_id = (SELECT user_id
          FROM users
          WHERE email = $1)`,
        [email]
      );
      return user_result.rows.map((row) => row.event_id);
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
