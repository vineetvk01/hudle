const { Pool } = require('pg');

const pool = new Pool({
  max: 10,
  connectionTimeoutMillis: 0,
  idleTimeoutMillis: 0,
})

export default Object.freeze({
  query: (text, params) => pool.query(text, params),
});