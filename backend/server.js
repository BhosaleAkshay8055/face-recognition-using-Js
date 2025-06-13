const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const { initDB } = require("./db/db.js");

const app = express();
const PORT = 5000;

app.use(cors());
app.use(bodyParser.json());

let pool;

initDB().then(p => {
  pool = p;

  app.post("/register", async (req, res) => {
    const { name, phone, descriptor } = req.body;
    if (!name || !phone || !descriptor) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    try {
      await pool.query(
        `INSERT INTO faceuserregister (name, phone, descriptor) VALUES ($1, $2, $3)`,
        [name, phone, descriptor]
      );
      res.json({ message: "User registered" });
    } catch (err) {
      console.error("DB insert error:", err);
      res.status(500).json({ message: "Database error" });
    }
  });

  app.post("/recognize", async (req, res) => {
    const { descriptor } = req.body;
    const threshold = 0.6;

    try {
      const result = await pool.query(`SELECT * FROM faceuserregister`);
      const users = result.rows;

      const match = users.find(user => {
        const dist = euclideanDistance(user.descriptor, descriptor);
        return dist < threshold;
      });

      if (match) {
        res.json({ name: match.name, phone: match.phone });
      } else {
        res.json({ message: "No match found" });
      }
    } catch (err) {
      console.error("Recognition error:", err);
      res.status(500).json({ message: "Error during recognition" });
    }
  });

  app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));
});

function euclideanDistance(d1, d2) {
  return Math.sqrt(d1.reduce((sum, val, i) => sum + (val - d2[i]) ** 2, 0));
}
