const express = require('express');
const cors = require('cors');
const mysql = require('mysql2');

const app = express();
app.use(cors());
app.use(express.json());


// Get Customer Bookings
app.get('/customers/:id/bookings', (req, res) => {
  const { id } = req.params;
  pool.query("SELECT * FROM bookings WHERE customer_id = ?", [id], (err, results) => {
    if (err) return res.status(500).json(err);
    res.json(results);
  });
});