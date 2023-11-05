const sqlite3 = require('sqlite3').verbose();

// Create a new database or open an existing one
const db = new sqlite3.Database('menu.db');

// Promisify the db.run function
const runPromise = (query, params) => {
  return new Promise((resolve, reject) => {
    db.run(query, params, function (err) {
      if (err) {
        reject(err);
      } else {
        resolve(this);
      }
    });
  });
};

// Create a table for menu items
db.run(
  `
  CREATE TABLE IF NOT EXISTS menu_items (
    item_id TEXT PRIMARY KEY,
    item_name TEXT,
    item_types TEXT,
    item_description TEXT,
    item_price REAL
  )
`,
  (err) => {
    if (err) {
      console.error(err.message);
    } else {
      console.log("Table 'menu_items' created");
    }
  }
);

module.exports = {
  db,
  runPromise
};
