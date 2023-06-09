module.exports = class {
  constructor({ db }) {
    this.db = db;
  }

  getAll() {
    return this.db.getRows(
      /*sql */ `
      SELECT 
       t.tag_id,
       t.tag_name
      FROM tags t
`,
      []
    );
  }
  create({ tag_name }) {
    return this.db.getRow(
      /*sql */ `
      INSERT INTO tags (tag_name)
      VALUES ($1) RETURNING tag_id`,
      [tag_name]
    );
  }
};
