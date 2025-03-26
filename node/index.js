//import os from "os" // two differrnt ways to import this ES6-module is valid only when you add "type":"module"
const os = require("os");

let meinName = "Bobo";
console.log("Hallo " + meinName);
console.log(os.version());
console.log(os.uptime());

const fs = require("fs");
fs.writeFile("message.txt", "Hi I come from index.js", (err) => {
  // shows all what we can do in a function def.
  if (err) throw err;
  console.log("The data were saved");
});
