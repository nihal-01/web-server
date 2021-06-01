const getPuzzle = () => {
  fetch("http://puzzle.mead.io/puzzle").then((response) => {
    response.json().then((data) => {
      console.log(data);
    });
  });
};

const messageOne = document.querySelector("#message-1");
const messageTwo = document.querySelector("#message-2");

const getForecast = (e) => {
  e.preventDefault();
  messageOne.textContent = "";
  messageTwo.textContent = "";
  messageOne.textContent = "Loading...";

  let address = document.querySelector("input").value;

  fetch(`http://localhost:3000/weather?address=${address}`).then((response) => {
    response.json().then((data) => {
      if (data.error) {
        messageOne.textContent = data.error;
      } else {
        messageOne.textContent = data.place;
        messageTwo.textContent = data.temperature;
      }
    });
  });
};
