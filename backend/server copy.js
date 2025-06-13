const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const app = express();
const PORT = 5000;

let users = []; // In-memory store

app.use(cors());
app.use(bodyParser.json());

app.post("/register", (req, res) => {
  console.log('get request register')
  const { name, phone, descriptor } = req.body;
  users.push({ name, phone, descriptor });
  res.json({ message: "User registered" });
});

app.post("/recognize", (req, res) => {
  const { descriptor } = req.body;
  const threshold = 0.6;

  const match = users.find(user => {
    const dist = euclideanDistance(user.descriptor, descriptor);
    return dist < threshold;
  });

  if (match) {
    res.json({ name: match.name, phone: match.phone });
  } else {
    res.json({ message: "No match found" });
  }
});

function euclideanDistance(d1, d2) {
  return Math.sqrt(d1.reduce((sum, val, i) => sum + (val - d2[i]) ** 2, 0));
}

app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
