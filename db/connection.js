const { Pool } = require("pg");

const ENV = process.env.NODE_ENV || "development";
console.log("Connected to", ENV);

require("dotenv").config({
  path: `${__dirname}/../.env.${ENV}`,
});

// handle using the correct environment variables here

if (!process.env.PGDATABASE) {
  throw new Error("PGDATABASE not set");
}

module.exports = new Pool();
