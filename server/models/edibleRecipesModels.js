const { Pool } = require('pg');

const PG_URI =
  'postgres://nagsauar:3uEIYk1GNWY8XPHcw61ZsQErEvPKtr2d@rajje.db.elephantsql.com:5432/nagsauar';

// create a new pool here using the connection string above
const pool = new Pool({
  connectionString: PG_URI,
});

// const test = `INSERT INTO public.users (name, password, email) VALUES ('hello', 'hello', 'hello@hello.hello')`;
// pool.query(test);

// Adding some notes about the database here will be helpful for future you or other developers.
// Schema for the database can be found below:
// https://github.com/CodesmithLLC/unit-10SB-databases/blob/master/docs/images/schema.png?raw=true

// We export an object that contains a property called query,
// which is a function that returns the invocation of pool.query() after logging the query
// This will be required in the controllers to be the access point to the database
module.exports = {
  query: (text, params, callback) => {
    // console.log("PostgresQL Database establish", text);
    return pool.query(text, params, callback);
  },
};
