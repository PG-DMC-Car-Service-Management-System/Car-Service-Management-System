
const db = require("../utils/dbpool")
const {apiSuccess, apiError} = require("../utils/apiresult")
const express = require("express")
const app = express.Router()

// Get All Mechanics
app.get('/mechanics', (req, res) => {
  db.query("SELECT * FROM mechanics_list", (err, results) => {
    if (err) return res.status(500).json(err);
    res.json(results);
  });
});

// Get Single Mechanic
app.get('/mechanics/:id', (req, res) => {
  const { id } = req.params;
  db.query("SELECT * FROM mechanics_list WHERE id = ?", [id], (err, results) => {
    if (err) return res.status(500).json(err);
    res.json(results[0]);
  });
});

// Create Mechanic
app.post('/mechanics', (req, res) => {
  const { name, contact, email, status } = req.body;
  db.query(
    "INSERT INTO mechanics_list (name, contact, email, status) VALUES (?, ?, ?, ?)",
    [name, contact, email, status],
    (err, result) => {
      if (err) return res.status(500).json(err);
      res.json({ message: 'Mechanic added', id: result.insertId });
    }
  );
});

// Update Mechanic
app.put('/mechanics/:id', (req, res) => {
  const { id } = req.params;
  const { name, contact, email, status } = req.body;
  db.query(
    "UPDATE mechanics_list SET name = ?, contact = ?, email = ?, status = ? WHERE id = ?",
    [name, contact, email, status, id],
    (err) => {
      if (err) return res.status(500).json(err);
      res.json({ message: 'Mechanic updated' });
    }
  );
});

// Delete Mechanic
app.delete('/mechanics/:id', (req, res) => {
  const { id } = req.params;
  db.query("DELETE FROM mechanics_list WHERE id = ?", [id], (err) => {
    if (err) return res.status(500).json(err);
    res.json({ message: 'Mechanic deleted' });
  });
});


module.exports = app