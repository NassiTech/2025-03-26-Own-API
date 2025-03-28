const express = require("express");
const app = express();
const fs = require("fs"); // file system module can read and write data
app.use(express.json()); // middleware allows us to comminicate between 2 systems

// hep function
function readFile() {
  const data = fs.readFileSync("tiere.json", "utf8");

  return JSON.parse(data);
  // JSON.parse creates a javascript object from JSON data
}

function writeFile(data) {
  fs.writeFileSync("tiere.json", JSON.stringify(data, null, 2));
}

app.get("/tiere", (req, res) => {
  res.json(tiere);
});

app.post("tiere", (req, res) => {
  const tiere = readFile();
  const { name, art } = req.body;
  if (name && art) {
    const newTier = {
      id: tiere.length + 1, // tiere.length > 0 ? Math.max(...tiere.map(a => a.id)) + 1 : 1;  other way but more complicated!!
      name: name,
      art: art,
    };

    tiere.push(newTier);
    writeFile(tiere);
    res.status(201).json(newTier);
  } else {
    res.send("data uncomplete");
  }
});

app.put("/tiere/:id", (req, res) => {
  const id = req.params.id;
  const tiere = readFile(); // Datei aufrufen
  const newArt = req.body.art;

  const foundArt = tiere.find((tier) => tier.id == id);
  foundArt.art = newArt;
  res.json(foundTier);
  writeFile(tiere); // in Datei reinschreiben
});

app.delete("/tiere/:id", (req, res) => {
  const id = req.params.id;
  const tiere = readFile();
  const index = tiere.findIndex((tier) => tier.id == id);
  const entferntesTier = tiere.splice(index, 1);
  writeFile(tiere);
  // res.json("erfolgreich gelöscht" + entferntesTier[].name)
});

app.listen(5005);
