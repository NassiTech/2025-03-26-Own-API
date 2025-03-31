const { application } = require("express");

const form = document.getElementById("form");
const newName = document.getElementById("name");
const art = document.getElementById("art");
form.addEventListener("submit", (event) => {
  //  event.preventDefault hinders neu load of the page while submitting event
  event.preventDefault()};
  try{
  fetch("http://localhost:5005/tiere", {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({ name: nameInput.value, art: artInput.value }),
  })
    .then((res) => res.json())
    .then((data) => {
      answerField.innerText = JSON.stringify(data);

      // event.preventDefault(); for testing the error message
    });
}

catch(err){
    console.log("error at loading")
}
    windows.onload = () => {

        fetch("http://localhost:5005/tiere")
        
    .then((res) => res.json())
    .then((data) => {
      answerField.innerText = JSON.stringify(data)
    })
}
