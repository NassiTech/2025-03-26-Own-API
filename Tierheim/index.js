const express = require("express");
const app = express();
const fs = require("fs"); // file system module can read and write data
app.use(express.json()); // middleware allows us to communicate between 2 systems

app.use(
  cors({
    //to allow the info-exchange between the two ports- something which is per default not allowed!!
    origin: "http://localhost:5500",
  })
);

// hep function
function readFile() {
  const data = fs.readFileSync("tiere.json", "utf8");

  return JSON.parse(data);
  // JSON.parse creates a javascript object from JSON data
}

function writeFile(data) {
  fs.writeFileSync("tiere.json", JSON.stringify(data, null, 2));
}
// GET REQUEST
app.get("/tiere", (req, res) => {
  res.json(tiere);

  try {
    const tiere = readFile();
    res.json(tiere);
  } catch (err) {
    res.status(500).json({ error: "internal.Server Error" });
  }
});

app.post("tiere", (req, res) => {
  try {
    const tiere = readFile();
    const { name, art } = req.body;

    if (name && art) {
      const newTier = {
        id: tiere.length + 1, // tiere.length > 0 ? Math.max(...tiere.map(a => a.id)) + 1 : 1;  other way but more complicated!!
        name: name,
        art: art,
      };
      // opther option
      //  if (!name && art) {
      // res.status(400).json({error: "Name and Art are mandatory fileds "})
      //};
      //const newTier = {
      //id: tiere.length + 1, // tiere.length > 0 ? Math.max(...tiere.map(a => a.id)) + 1 : 1;  other way but more complicated!!
      // name: name,
      //art: art,...

      tiere.push(newTier);
      writeFile(tiere);
      res.status(201).json(newTier);
    } else {
      res.send("data incomplete");
    }
  } catch (err) {}
});

app.put("/tiere/:id", (req, res) => {
  const id = req.params.id;
  const tiere = readFile(); // Datei aufrufen
  const newArt = req.body.art;

  const foundArt = tiere.find((tier) => tier.id == id);
  foundArt.art = newArt;
  res.json(foundTier);
  writeFile(tiere); // in Datei reinschreiben

  try {
    const tiere = readFile();
    res.json(tiere);
  } catch (err) {
    res.status(500).json({ error: "internal.Server Error" });
  }
});

app.delete("/tiere/:id", (req, res) => {
  try {
    const id = req.params.id;
    // is id a number
    if (isNaN(id)) {
      return res.status(400).json({ error: "ID must be a number" });
    }
    const tiere = readFile();
    const index = tiere.findIndex((tier) => tier.id == id);

    if (index === -1) {
      res.status(404).json({ error: "Animal doesn't exist" });
    }
    const entferntesTier = tiere.splice(index, 1);
    writeFile(tiere);
    res.json("erfolgreich gelöscht " + entferntesTier[0].name);
  } catch (err) {
    res.status(500).json({ error: "Internal Server error!" });
  }
});

app.getMaxListeners("/search", (req, res) => {
  const { id, name, art } = req.query;
  let tiere = readFile();
  if (id) {
    tiere = tiere.filter((tier) => tier.id == id);
  }

  if (name) {
    tiere = tiere.filter((tier) =>
      tier.name.toLowerCase().includes(name.toLowerCase())
    );
  }
  //with include we can partly filter the inconsistencies /correspondances
  if (art) {
    tiere = tiere.filter((tier) => tier.art.toLowerCase() == art.toLowerCase());
  }

  res.json(tiere);
});

app.listen(5005);
