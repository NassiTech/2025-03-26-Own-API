const express = require("express");
const app = express();
const fs = require("fs"); // file system module can read and write data
app.use(express.json()); // middleware allows us to comminicate between 2 systems

// help function
function readFile() {
  const data = fs.readFileSync("books.json", "utf8");

  return JSON.parse(data);
  // JSON.parse creates a javascript object from JSON data
}

function writeFile(data) {
  fs.writeFileSync("books.json", JSON.stringify(data, null, 2));
}

app.get("/books", (req, res) => {
  const books = readFile();
  res.json(books);
});

app.post("/books", (req, res) => {
  const books = readFile();
  const { author, title } = req.body;
  if (author && title) {
    const newBook = {
      id: books.length + 1, // books.length > 0 ? Math.max(...books.map(a => a.id)) + 1 : 1;  other way but more complicated!!
      title: title,
      author: author,
    };

    books.push(newBook);
    writeFile(books);
    res.status(201).json(newBook);
  } else {
    res.send("data incomplete");
  }
});

app.put("/books/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const books = readFile(); // Datei aufrufen
  const foundBook = books.find((book) => book.id == id);

  if (!foundBook) return res.status(404).json({ error: "Book not found" });

  foundBook.author = newAuthor;
  res.json(foundBook);
  writeFile(books); // in Datei reinschreiben
});

app.delete("/books/:id", (req, res) => {
  const id = req.params.id;
  const books = readFile();
  const index = books.findIndex((book) => book.id == id);
  const deletedBook = books.splice(index, 1);
  writeFile(books);
  // res.json("successfully deleted" + deletedBook[].name)
});

app.listen(5005);
