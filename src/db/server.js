const express = require('express');
const cors = require('cors');
const { db } = require('./database');

const app = express();
const port = 3000;


app.use(cors());
app.use(express.json());

app.get('/menus', (req, res) => {
  let sql = ` 
    SELECT item_id itemId,
    item_name itemName,
    item_types types,
    item_description description,
    item_price price
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

app.get('/orders', (req, res) => {
  let sql = `
    SELECT item_id itemId,
    item_name orderName,
    item_types types,
    item_price price,
    item_amount amount,
    item_total_price totalPrice
    FROM order_items
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

app.post('/orders', (req, res) => {
  console.log(req.body);
  const { itemId, orderName, types, price, amount, totalPrice } = req.body;

  const sql = `INSERT OR IGNORE INTO order_items (item_id, item_name, item_types, item_price, item_amount, item_total_price) VALUES (?, ?, ?, ?, ?, ?)`;
  const params = [itemId, orderName, types, price, amount, totalPrice];

  db.run(sql, params, function (err) {
    if (err) {
      return res.status(500).json({ error: err.message });
    }

    if (this.changes > 0) {
      console.log(`Order placed. ID: ${itemId}`);
      return res.status(201).json({ message: 'Order placed successfully', newItemId: itemId });
    } else {
      return res.status(500).json({ error: 'Failed to place orders' });
    }
  });
});

// Handle the PUT request to update or create an order.
app.put('/orders/:itemId', (req, res) => {
  const itemId = req.params.itemId;
  const { amount, totalPrice } = req.body;

  // Check if the order with the given itemId exists in the database.
  db.get('SELECT * FROM order_items WHERE item_id = ?', [itemId], (err, row) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }

    if (row) {
      // The order exists. Check if the new amount is different.
      if (amount !== row.item_amount) {
        // Update the order with the new amount.
        db.run('UPDATE order_items SET item_amount = ?, item_total_price = ? WHERE item_id = ?', [amount, totalPrice, itemId], (err) => {
          if (err) {
            return res.status(500).json({ error: err.message });
          }
          return res.status(200).json({ message: 'Order updated successfully', updatedItemId: itemId });
        });
      } else {
        // The new amount is the same as the existing one, so no update is needed.
        return res.status(200).json({ message: 'Order amount is the same, no update required', updatedItemId: itemId });
      }
    } else {
      // The order does not exist, so create a new order.
      const { itemId, orderName, types, price, amount, totalPrice } = req.body;

      const sql = `INSERT OR IGNORE INTO order_items (item_id, item_name, item_types, item_price, item_amount, item_total_price) VALUES (?, ?, ?, ?, ?, ?)`;
      const params = [itemId, orderName, types, price, amount, totalPrice];
    
      db.run(sql, params, function (err) {
        if (err) {
          return res.status(500).json({ error: err.message });
        }
    
        if (this.changes > 0) {
          console.log(`Order placed. ID: ${itemId}`);
          return res.status(201).json({ message: 'Order placed successfully', newItemId: itemId });
        } else {
          return res.status(500).json({ error: 'Failed to place orders' });
        }
      });
    }
  });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
