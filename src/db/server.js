const express = require('express');
const cors = require('cors');
const { db } = require('./database');
const seedDatabase = require('./seed');

const app = express();
const port = 3000;


app.use(cors());
app.use(express.json());

app.get('/menus', (req, res) => {
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
  console.log(req.body);
  const { itemId, itemName, types, description, price } = req.body;

  if (!itemId || !itemName || !types || !description || !price) {
    return res.status(400).json({ error: 'All fields are required for a new menu item.' });
  }

  // Insert the new menu item into the database
  const sql = `INSERT INTO menu_items (item_id, item_name, item_types, item_description, item_price) VALUES (?, ?, ?, ?, ?)`;
  const params = [itemId, itemName, JSON.stringify(types), description, price];

  db.run(sql, params, function (err) {
    if (err) {
      return res.status(500).json({ error: err.message });
    }

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
  seedDatabase();
});
