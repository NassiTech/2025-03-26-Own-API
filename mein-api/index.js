const express = require("express");
const app = express();

const generateName = require("sillyname");

app.get("/", (req, res) => {
  res.send("Willkommen bei meiner eigenen API!");
});

app.get("/data", (req, res) => {
  res.json([
    { id: 1, name: "Max" },
    { id: 2, name: "Lena" },
  ]);
});

app.get("/randomname", (req, res) => {
  let count = parseInt(req.query.count) || 5;
  let names = [];
  for (let i = 0; i < count; i = i + 1) {
    names.push(generateName());
  }

  res.json([names]);
});
app.listen(3000, () => {
  console.log("Server läuft auf http://localhost:3000");
});
