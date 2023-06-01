if (process.env.NODE_ENV == "development") {
  console.log("running in dev mode");
}
require("dotenv").config();
const fs = require("fs");
const pg = require("pg");
pg.types.setTypeParser(20, "text", parseInt);
pg.types.setTypeParser(1700, "text", parseFloat);

const { Pool } = pg;

const config = {
  user: process.env.db_username,
  password: process.env.db_password,
  host: process.env.db_host,
  database: process.env.db_database,
  port: +process.env.db_port,
  // ssl: {
  //   rejectUnauthorized: false,
  // },
  //For secure connection:
  ssl: {
    ca: fs.readFileSync("./ca.crt").toString(),
  },
};
console.log(process.env);
module.exports = class db {
  constructor() {
    this.pool = new Pool(config);
  }
  getClient() {
    return this.pool.connect()
  }
  execute(query = "SELECT NOW();") {
    return this.pool.connect().then((client) =>
      client
        .query(query)
        .then((res) => {
          console.log("result");
          client.release();
          console.log(res.rows[0]);
          return res.rows[0];
        })
        .catch((err) => {
          client.release();
          console.log(err.stack);
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
};
