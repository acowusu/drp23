module.exports = class {
  constructor({ db }) {
    this.db = db;
  }

  getAll() {
    return this.db.getRows(
      /*sql */ `
      SELECT 
       s.name
      FROM society s
`,
      []
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
};
