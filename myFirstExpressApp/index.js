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
app.get("/people", (req, res) => {
  res.sed("you successfully talk to the route people");
});
app.get("/joke", (req, res) => {
  giveMeAJoke.getRandomDadJoke(function (joke) {
    res.send(joke);
  });
});

// three different ways to declare a function -----for hallo2 -> arrow function
function handleHallo(req, res) {
  res.send("hi from the route hallo");
}

app.get("/hallo", handleHallo);
app.get("/hallo2", function (req, res) {
  res.send("hallo fromm hallo2");
});

app.get("/hallo3", (req, res) => {
  res.send("hallo fromm hallo3");
});
// : is meant to expect parameters
app.get("/people/:id", (req, res) => {
  res.send("you looked for a person with an id =1 or 74" + req.params.id);
});

app.get("/query", (req, res) => {
  res.send("you looked for a perason with an id =1 or 74" + req.query);
});
const users =[
{id: 1, name:"Nassima", city: "HD"},
{id: 2, name:"Suheib", city: "Frankfurt"},
{id: 3, name:"Dustin", city: "HB"},
{id: 4, name:"Alex", city: "Erfurt"},
]

app.get("/users/search", (req,res)=>{

  const city = req.query.city
 const result = users.filter(user => user.city === city)
 res.json(city)
 })
 
  
app.get("/user/:id", (req,res) =>{
const id = req.params.id
const foundUser = users.find(user => users.id ==id)
if(foundUser){
  res.json(foundUser)
}
else{
  res.status(404).send("user with id: not found;" + id)
}


})

app.use(express.json()) // allows to send the body with the request
app.post("/users", (req,res) =>{
  const {name,city} = req.body // the way of writing == "Destructuring" -> jason format as dictionary
const newUser = {

  id: user.length +1,
  name: name,
  city: city
}
  users.push(newUser(newUser))
res.json(users)
})



app.listen(5005);
