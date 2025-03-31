const submitButton = document.getElementById("submitButton");
const titleInput = document.getElementById("title");
const authorInput = document.getElementById("author");
const responseFeld = document.getElementById("response");

submitButton.addEventListener("click", () => {
  try {
    const requestBody = {
      title: titleInput.value,
      author: authorInput.value,
    };

    fetch("http://localhost:5005/books", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(requestBody),
    })
      .then((res) => res.json())
      .then((data) => {
        responseFeld.innerText = JSON.stringify(data);
        console.log(data);
      });
  } catch (err) {
    console.log("Error in fetch: " + err);
  }
});

window.onload = () => {
  fetch("http://localhost:5005/books")
    .then((res) => res.json())
    .then((data) => {
      responseFeld.innerText = JSON.stringify(data);
    });
};
