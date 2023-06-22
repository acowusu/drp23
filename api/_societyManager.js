const { kv } = require("@vercel/kv");

module.exports = class {
  constructor({ db }) {
    this.db = db;
  }

  getAll() {
    return this.db
      .getRows(
        /*sql */ `
      SELECT 
      s.society_id  ,
       s.name,
        s.type,
        s.description,
        s.metadata
      FROM society s
      ORDER BY s.name ASC
`,
        []
      )
      .then((rows) =>
        rows.map((society) => {
          society.objectID = society.society_id;
          society.tags = [society.type];
          return society;
        })
      );
  }
  async get({ name }) {
    let society = await kv.get(`society_${name}`);
    if (society?.society_id) {
      console.log("cache hit");
      return society;
    } else {
      society = await this.db.getRow(
        `SELECT s.society_id, s.name, s.type, s.description, s.metadata
        FROM society s
        WHERE s.name = $1`,
        [name]
      );
      await kv.set(`society_${name}`, society);
      return society;
    }
  }
  getID({ society_id }) {
    return this.db.getRow(
      `SELECT s.society_id, s.name, s.type, s.description, s.metadata
      FROM society s
      WHERE s.society_id = $1`,
      [society_id]
    );
  }
  create({ name, type }) {
    return this.db.getRow(
      /*sql */ `
      INSERT INTO society (name, type)
      VALUES ($1, $2) RETURNING society_id`,
      [name, type]
    );
  }
  async update({ name, description, metadata }) {
    return await this.db
      .getRow(
        `
      UPDATE society
      SET description = $1, metadata = $2
      WHERE name = $3
      RETURNING society_id, name, type, description, metadata
      `,
        [description, metadata, name]
      )
      .then(async (society) => {
        await this.db.getIndex().saveObject({
          objectID: society.society_id,
          society_id: society.society_id,
          name: society.name,
          type: society.type,
          description: society.description,
          metadata: society.metadata,
          tags: [society.type],
        });
        await kv.set(`society_${name}`, society);
        return society;
      });
  }
};
