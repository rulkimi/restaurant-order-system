const sqlite3 = require('sqlite3').verbose();

// either create or open existing file - important!!
const db = new sqlite3.Database('menu.db');

const seedDatabase = require('./seed');

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

const createTables = async () => {
  try {
    // table for menu items
    try {
      await runPromise(
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
      await seedDatabase();
      
    } catch (err) {
      console.log('erros: ', err.message);
    }
    
    // table for order items
    await runPromise(
      `
      CREATE TABLE IF NOT EXISTS order_items (
        item_id TEXT PRIMARY KEY,
        item_name TEXT,
        item_types TEXT,
        item_price REAL,
        item_total_price REAL
      )
      `,
      (err) => {
        if (err) {
          console.log(err.message);
        } else {
          console.log("Table 'order_items' created");
        }
      }
    );
    
  } catch (err) {
    console.log('Errors creating tables: ', err.message);
  }
}

createTables();

module.exports = {
  db,
  runPromise
};
