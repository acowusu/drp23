module.exports = class {
  constructor({ db }) {
    this.db = db;
  }

  async getId({ email }) {
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

      return user_id;
    } catch (e) {
      await client.query("ROLLBACK");
      throw e;
    }
  }
  async create({ email }) {
    console.log("email", email);
    const client = await this.db.getClient();
    try {
      await client.query("BEGIN");
      const user_result = await client.query(
        /*sql */ `
        INSERT INTO users (email)
        VALUES ($1) RETURNING user_id`,
        [email]
      );
      const user_id = user_result.rows[0].user_id;
      await client.query("COMMIT");
      return user_id;
    } catch (e) {
      await client.query("ROLLBACK");
      throw e;
    } finally {
      client.release();
    }
  }
  async getAll() {
    const client = await this.db.getClient();
    try {
      await client.query("BEGIN");
      const result = await client.query(
        /*sql */ `
        SELECT 
         u.user_id,
         u.email
        FROM users u
  `,
        []
      );
      await client.query("COMMIT");
      return result.rows;
    } catch (e) {
      await client.query("ROLLBACK");
      throw e;
    } finally {
      client.release();
    }
  }
};
