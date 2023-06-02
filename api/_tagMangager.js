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
};
