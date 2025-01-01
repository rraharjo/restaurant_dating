const pg = require('pg');
const dbconn = require('../../env.json');

const localPool = new pg.Pool({
  user: dbconn.username,
  password: dbconn.pass,
  host: dbconn.host,
  port: dbconn.port,
  database: dbconn.database,
});

module.exports = { localPool };
