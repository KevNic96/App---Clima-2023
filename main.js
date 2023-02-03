// Obtenemos todos los elementos necesarios del DOM

const app = document.querySelector(".weather-app");
const temp = document.querySelector(".temp");
const dateOutput = document.querySelector(".date");
const timeOutput = document.querySelector(".time");
const conditionOutput = document.querySelector(".condition");
const nameOutput = document.querySelector(".name");
const icon = document.querySelector(".icon");
const cloudOutput = document.querySelector(".cloud");
const humidityOutput = document.querySelector(".humidity");
const windOutput = document.querySelector(".wind");
const form = document.getElementById("locationInput");
const search = document.querySelector(".search");
const btn = document.querySelector(".submit");
const cities = document.querySelectorAll(".city");

// Ciudad default cuando carga la pagina

let cityInput = "Buenos Aires";

// Agregamos click event a cada ciudad en el panel

cities.forEach((city) => {
  city.addEventListener("click", (e) => {
    cityInput = e.target.innerHTML;

    // funcion que despliega la informacion api

    fetchWeatherData();
    // Animacion fade out
    app.style.opacity = "0";
  });
});

// Agregamos evento submit al form

form.addEventListener("submit", (e) => {
  // Si el campo dentro del input esta vacio arrojar un alerta
  if (search.value.length == 0) {
    alert("Please type in a city name");
  } else {
    cityInput = search.value;

    fetchWeatherData();

    search.value = "";

    app.style.opacity = "0";
  }

  // Prevencion default
  e.preventDefault();
});

// Funcion que retorna el dia de la semana

function dayOfTheWeek(day, month, year) {
  const weekday = [
    "Domingo",
    "Lunes",
    "Martes",
    "Miércoles",
    "Jueves",
    "Viernes",
    "Sábado",
  ];
  return weekday[new Date(`${day}/${month}/${year}`).getDay()];
}

// Funcion que despliega el API del clima

function fetchWeatherData() {
  fetch(
    `https://api.weatherapi.com/v1/current.json?key=8b2aa05a14934286b55210650230202&q=${cityInput}`
  )
    // Toma la data que esta en formato JSON y lo convierte en un objeto JS
    .then((response) => response.json())
    .then((data) => {
      console.log(data);

      temp.innerHTML = data.current.temp_c + "°";
      conditionOutput.innerHTML = data.current.condition.text;

      const date = data.location.localtime;
      const y = parseInt(date.substr(0, 4));
      const m = parseInt(date.substr(5, 2));
      const d = parseInt(date.substr(8, 2));
      const time = date.substr(11);

      dateOutput.innerHTML = `${dayOfTheWeek(d, m, y)} ${d} / ${m} / ${y}`;
      timeOutput.innerHTML = time;

      nameOutput.innerHTML = data.location.name;

      const iconId = data.current.condition.icon.substr(
        "//cdn.weatherapi.com/weather/64x64/".length
      );

      icon.src = "./icons/" + iconId;
      document.body.style.backgroundImage =
        "url('https://source.unsplash.com/1600x900/?" + cityInput + "')";

      cloudOutput.innerHTML = data.current.cloud + "%";
      humidityOutput.innerHTML = data.current.humidity + "%";
      windOutput.innerHTML = data.current.wind_kph + "km/h";

      let timeOfDay = "day";

      if (!data.current.is_day) {
        timeOfDay = "night";
      }

      app.style.opacity = "1";
    })

    .catch(() => {
      alert("Ciudad no encontrada, por favor intente de nuevo.");
      app.style.opacity = "1";
    });
}

fetchWeatherData();

app.style.opacity = "1";
