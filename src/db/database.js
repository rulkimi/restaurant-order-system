const sqlite3 = require('sqlite3').verbose();

// either create or open existing file - important!!
const db = new sqlite3.Database('menu.db');

// make the db.run function a promise
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
runPromise(
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
