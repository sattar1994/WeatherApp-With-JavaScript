const api = {
  key: "28fd15358cdecbc1a1dfef367e71acef",
  base: "https://api.openweathermap.org/data/2.5/",
};

const search = document.querySelector(".search");
const btn = document.querySelector(".btn");
const city = document.querySelector(".city");
const error = document.querySelector(".error");
btn.addEventListener("click", getInput);

function getInput(e) {
  e.preventDefault();
  if (e.type == "click") {
    getData(search.value);
  }
}

function getData() {
  fetch(`${api.base}weather?q=${search.value}&units=metric&appid=${api.key}`)
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      console.log(data);
      if (data.cod === "404") {
        error.textContent = "Please Enter a Valid City";
        search.value = "";
      } else {
        city.textContent = `${data.name}, ${data.sys.country}`;
        error.textContent = "";
        search.value = "";

        const today = new Date();
        const date = document.querySelector(".date");
        date.innerHTML = dateFunction(today);

        const temp = document.querySelector(".temp");
        temp.innerHTML = `Temp: ${Math.round(data.main.temp)} <span>°C</span`;
        const weather = document.querySelector(".weather");
        weather.textContent = `Weather: ${data.weather[0].main}`;

        const tempRange = document.querySelector(".temp-range");
        tempRange.textContent = `Temp Range: ${Math.round(
          data.main.temp_min
        )} °C / ${Math.round(data.main.temp_max)} °C`;

        const weatherIcon = document.querySelector(".weather-icon");
        weatherIcon.src =
          "https://api.openweathermap.org/img/w/" +
          data.weather[0].icon +
          ".png";
      }
    });
}

function dateFunction(d) {
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "June",
    "july",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  const days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[d.getDay()];
  let date = d.getDate();
  let month = months[d.getMonth()];
  let year = d.getFullYear();

  return `${day} ${date} ${month} ${year}`;
}
