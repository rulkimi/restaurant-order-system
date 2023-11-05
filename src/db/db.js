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

      // Define the menu data
      const menuData = {
        m1: {
          itemName: 'Burger',
          types: ['western', 'food'],
          description:
            'An exceptionally delicious burger with a slice of yummy cheese that would give you an excellent experience',
          price: 30.75,
        },
        m2: {
          itemName: 'Noodle',
          types: ['asian', 'food'],
          description:
            "A braised beef noodle that's specially hand-made by our chefs that would make you feel at home -- It is cheap too!",
          price: 15.5,
        },
        m3: {
          itemName: 'Iced Coffee',
          types: ['drink'],
          description:
            'Refreshing iced coffee made from freshly brewed beans, perfect for a pick-me-up.',
          price: 5.0,
        },
        m4: {
          itemName: 'Fizzy Drink',
          types: ['drink'],
          description:
            'A drink that would make your brain go brzzzz k-booom zoo wee mama!',
          price: 8.25,
        },
        m5: {
          itemName: 'Pizza',
          types: ['western', 'food'],
          description:
            'Delicious pizza with a variety of toppings to satisfy your taste buds.',
          price: 25.5,
        },
        m6: {
          itemName: 'Lemonade',
          types: ['drink'],
          description:
            'Refreshing and tangy lemonade made from freshly squeezed lemons.',
          price: 4.0,
        },
        m7: {
          itemName: 'Sushi',
          types: ['asian', 'food'],
          description:
            'Freshly prepared sushi with a unique blend of flavors, a treat for sushi lovers.',
          price: 20.2,
        },
        m8: {
          itemName: 'Steak',
          types: ['western', 'food'],
          description:
            'A juicy and tender steak cooked to perfection, paired with your choice of sides.',
          price: 40.25,
        },
        m9: {
          itemName: 'Pasta',
          types: ['western', 'food'],
          description:
            'Classic Italian pasta with a variety of sauces and toppings to satisfy your pasta cravings.',
          price: 18.0,
        },
        m10: {
          itemName: 'Iced Tea',
          types: ['drink'],
          description:
            'A refreshing iced tea with a hint of citrus, perfect for a hot summer day.',
          price: 3.75,
        },
        m11: {
          itemName: 'Sushi Platter',
          types: ['asian', 'food'],
          description:
            'A stunning platter of assorted sushi rolls, nigiri, and sashimi for a delightful dining experience.',
          price: 50.0,
        },
        m12: {
          itemName: 'Fish and Chips',
          types: ['western', 'food'],
          description: `Crispy battered fish served with golden fries, a classic British dish you won't want to miss.`,
          price: 22.5,
        },
        m13: {
          itemName: 'Taco',
          types: ['western', 'food'],
          description:
            'Authentic Mexican tacos filled with flavorsome meats, fresh veggies, and zesty salsa.',
          price: 12.45,
        },
      };

      // Insert menu data into the database
      const promises = Object.entries(menuData).map(
        async ([itemCode, menuItem]) => {
          try {
            const result = await runPromise(
              `INSERT OR IGNORE INTO menu_items (item_id, item_name, item_types, item_description, item_price) VALUES (?, ?, ?, ?, ?)`,
              [
                itemCode,
                menuItem.itemName,
                JSON.stringify(menuItem.types),
                menuItem.description,
                menuItem.price,
              ]
            );

            if (result.changes > 0) {
              console.log(`Inserted: ${menuItem.itemName}`);
            } else {
              console.log(`Skipped: ${menuItem.itemName} (already exists)`);
            }
          } catch (err) {
            console.error(`Error inserting ${menuItem.itemName}`, err.message);
          }
        }
      );

      Promise.all(promises)
        .then(() => {
          // Retrieve and display the inserted data
          db.all('SELECT * FROM menu_items', (err, rows) => {
            if (err) {
              console.error(err.message);
            } else {
              // Display the retrieved data
              rows.forEach((row) => {
                console.log(`Item ID: ${row.item_id}`);
                console.log(`Item Name: ${row.item_name}`);
                console.log(`Item Types: ${JSON.parse(row.item_types)}`);
                console.log(`Item Description: ${row.item_description}`);
                console.log(`Item Price: $${row.item_price.toFixed(2)}`);
                console.log('------------------------');
              });
            }
          });
        })
        .catch((err) => {
          console.error('Error occurred during insertion:', err.message);
        })
        .finally(() => {
          // Close the database when done
          db.close();
        });
    }
  }
);

db.run(`DELETE FROM menu_items`, (err) => {
  if (err) {
    console.error(err.message);
  } else {
    console.log("All menu items deleted");

    // Close the database when done
    db.close();
  }
});

const express = require('express');
const cors = require('cors');
const app = express();
const port = 3000;

const { v4: uuidv4 } = require('uuid');

app.use(cors());
app.use(express.json());

app.get('/menus', (req, res) => {
  // Handle GET request for menus
  let sql = ` 
    SELECT item_id itemId, item_name itemName, item_types types, item_description description, item_price price
    FROM menu_items;             
  `;
  db.all(sql, (err, rows) => {
    if (err) {
      throw err;
      console.log(err);
    } else {
      res.json(rows);
    }
  });
});

app.post('/menus', (req, res) => {
  // Handle POST request to create a new menu item
  console.log(req.body);
  const { itemId, itemName, types, description, price } = req.body;

  // Ensure all required fields are provided
  if ( !itemId || !itemName || !types || !description || !price) {
    return res.status(400).json({ error: 'All fields are required for a new menu item.' });
  }

  // Insert the new menu item into the database
  const sql = `INSERT INTO menu_items (item_id, item_name, item_types, item_description, item_price) VALUES (?, ?, ?, ?, ?)`;
  const params = [itemId, itemName, JSON.stringify(types), description, price];

  db.run(sql, params, function (err) {
    if (err) {
      return res.status(500).json({ error: err.message });
    }


    // only works for autoincrement
    // if (this.lastID) {
    //   console.log(`Created new menu item with ID: ${this.lastID}`);
    //   return res.status(201).json({ message: 'Menu item created successfully', newItemId: this.lastID });
    // } else {
    //   return res.status(500).json({ error: 'Failed to create a new menu item' });
    // }

    if (this.changes > 0) {
      console.log(`Created new menu item with ID: ${itemId}`);
      return res.status(201).json({ message: 'Menu item created successfully', newItemId: itemId });
    } else {
      return res.status(500).json({ error: 'Failed to create a new menu item' });
    }
  });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
