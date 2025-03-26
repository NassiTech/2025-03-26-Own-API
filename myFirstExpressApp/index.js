const express = require(`express`);
const app = express();

app.get("/", (req, res) => {
  res.send(200);
});

app.get("/people", (req, res) => {
  res.send(200);
});

app.listen(5005);
