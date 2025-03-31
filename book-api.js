const express = require("express");
const app = express();
const fs = require("fs"); // file system module can read and write data
app.use(express.json()); // middleware allows us to comminicate between 2 systems
//THIS ONE DOESNT BRING ANYTHING!!!!
//app.use(
//  cors({
//    //to allow the info-exchange between the two ports- something which is per default not allowed!!
//    origin: "http://localhost:5500",
//  })
//);

//THAT IS WHAT MAKES SEWNSE AND !!!!
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With,Content-Type, Accept"
  );
  next();
});

// help function
function readFile() {
  const data = fs.readFileSync("books.json", "utf8");

  return JSON.parse(data);
  // JSON.parse creates a javascript object from JSON data
}

function writeFile(data) {
  fs.writeFileSync("books.json", JSON.stringify(data, null, 2));
}
//GET REQUEST
app.get("/books", (req, res) => {
  try {
    const books = readFile();
    res.json(books);
  } catch (err) {
    res.status(500).json({ error: "internal Server Error" });
  }
});

//POST REQUEST
app.post("/books", (req, res) => {
  try {
    const books = readFile();
    const { author, title } = req.body;
    if (!title && author) {
      res.status(400).json({ error: "Title and Author are mandatory fileds " });
    }
    if (author && title) {
      const newBook = {
        id: books.length + 1,
        title: title,
        author: author,
      };

      books.push(newBook);
      writeFile(books);
      res.status(201).json(newBook);
    } else {
      res.send("data incomplete");
    }
  } catch (err) {
    res.status(500).json({ error: "internal Server Error" });
  }
});

//PUT REQUEST
app.put("/books/:id", (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const books = readFile(); // Datei aufrufen
    const { author } = req.body;

    const foundBook = books.find((book) => book.id == id);
    if (!foundBook) return res.status(404).json({ error: "Book not found" });

    foundBook.author = author;
    writeFile(books); // in Datei reinschreiben
    res.json(foundBook);
  } catch (err) {
    console.error("Error in updating boook", err.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

//DELETE REQUEST
app.delete("/books/:id", (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const books = readFile();
    const index = books.findIndex((book) => book.id == id);

    if (index === -1) {
      return res.status(404).json({ error: "Book not found" });
    }

    const deletedBook = books.splice(index, 1);

    writeFile(books);
    // The response comes with the deleted book
    res.json(deletedBook);
  } catch (err) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// SEARCH REQUEST
app.get("/books/search", (req, res) => {
  const title = req.query.title;
  const books = readFile();
  const result = books.filter((books) => books.title == title);
  res.json(result);
});

app.listen(5005);
