if (process.env.NODE_ENV == "development") {
  console.log("running in dev mode");
}
require("dotenv").config();
const fs = require("fs");
const pg = require("pg");
const algoliasearch = require("algoliasearch");
const client = algoliasearch(
  process.env.searchable_app_id,
  process.env.searchable_key
);
const index = client.initIndex(process.env.searchable_index);
pg.types.setTypeParser(20, "text", parseInt);
pg.types.setTypeParser(1700, "text", parseFloat);

const { Pool } = pg;

const config = {
  user: process.env.db_user,
  password: process.env.db_password,
  host: process.env.db_host,
  database: process.env.db_database,
  port: +process.env.db_port,
  ssl: {
    rejectUnauthorized: false,
  },
  //For secure connection:
  // ssl: {
  //   ca: fs.readFileSync("api/ca.crt").toString(),
  // },
};
module.exports = class db {
  constructor() {
    this.pool = new Pool(config);
    this.dev = process.env.NODE_ENV == "development";
  }
  getClient() {
    return this.pool.connect();
  }
  execute(query = "SELECT NOW();") {
    return this.pool.connect().then((client) =>
      client
        .query(query)
        .then((res) => {
          console.log("result");
          console.log(res.rows?.[0] || true);
          return res.rows?.[0] || true;
        })
        .catch((err) => {
          console.log(err.stack);
        })
        .finally(() => {
          client.release();
        })
    );
  }
  getRows(query, params = []) {
    console.log("getting row");
    return this.pool.connect().then((client) => {
      console.log("connection established");
      return client
        .query(query, params)
        .then((res) => {
          console.log("result");
          client.release();
          return res.rows;
        })
        .catch((err) => {
          client.release();
          console.log(err.stack);
        });
    });
  }
  getRow(query, params = []) {
    console.log("getting row");
    return this.pool.connect().then((client) => {
      console.log("connection established");
      return client
        .query(query, params)
        .then((res) => {
          console.log("result");
          client.release();
          return res.rows[0];
        })
        .catch((err) => {
          client.release();
          console.log(err.stack);
        });
    });
  }
  addSearchable(data) {
    return index.saveObject(data);
  }
  reset(force) {
    if (process.env.VERCEL_ENV != "development" && !force) {
      console.error("UNABLE TO RESET PRODUCTION DEPLOYMENT");
      throw "UNABLE TO RESET PRODUCTION DEPLOYMENT";
    }
    const schema = fs.readFileSync("sql/schema.sql", {
      encoding: "utf8",
      flag: "r",
    });
    const test_data = fs.readFileSync("sql/test_data.sql", {
      encoding: "utf8",
      flag: "r",
    });
    const searchableData = fs.readFileSync("algolia/baseData.json", {
      encoding: "utf8",
      flag: "r",
    });

    return Promise.all([
      this.execute(schema + "\n\n" + test_data),
      index
        .clearObjects()
        .then(() => index.saveObjects(JSON.parse(searchableData), true)),
    ]);
  }
};
