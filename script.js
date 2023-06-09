const container = document.querySelector(".container");
const search = document.querySelector(".search-box button");
const weatherBox = document.querySelector(".weather-box");
const weatherDetails = document.querySelector(".weather-details");
const error404 = document.querySelector(".not-found");
var map;
var marker;
var chart;

//search Function//
search.addEventListener("click", () => {
  const APIKey = "27fc266976ea91413456dccb76f42f5a";
  const city = document.querySelector(".search-box input").value;

  if (city === "") return;

  fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${APIKey}`
  )
    .then((response) => response.json())
    .then((json) => {
      if (json.cod === "404") {
        container.style.height = "400px";
        weatherBox.style.display = "none";
        weatherDetails.style.display = "none";
        error404.style.display = "block";
        error404.classList.add("fadeIn");
        return;
      }

      error404.style.display = "none";
      error404.classList.remove("fadeIn");

      const image = document.querySelector(".weather-box img");
      const temperature = document.querySelector(".weather-box .temperature");
      const description = document.querySelector(".weather-box .description");
      const humidity = document.querySelector(
        ".weather-details .humidity span"
      );
      const wind = document.querySelector(".weather-details .wind span");

      if (json.weather && json.weather.length > 0) {
        switch (json.weather[0].main) {
          case "Clear":
            image.src = "/Front-End Personal Project/assest/clear.png";
            break;

          case "Rain":
            image.src = "/Front-End Personal Project/assest/rain.png";
            break;

          case "Snow":
            image.src = "/Front-End Personal Project/assest/snow.png";
            break;

          case "Clouds":
            image.src = "/Front-End Personal Project/assest/cloud.png";
            break;

          case "Haze":
            image.src = "/Front-End Personal Project/assest/mist.png";
            break;

          default:
            image.src = "";
        }

        description.innerHTML = `${json.weather[0].description}`;
      } else {
        image.src = "";
        description.innerHTML = "";
      }

      temperature.innerHTML = `${parseInt(json.main.temp)}<span>°C</span>`;
      humidity.innerHTML = `${json.main.humidity}%`;
      wind.innerHTML = `${parseInt(json.wind.speed)}Km/h`;

      weatherBox.style.display = "";
      weatherDetails.style.display = "";
      weatherBox.classList.add("fadeIn");
      weatherDetails.classList.add("fadeIn");
      container.style.height = "590px";

      if (marker) {
        map.removeLayer(marker);
      }

      // Add a marker for the entered city
      marker = L.marker([json.coord.lat, json.coord.lon]).addTo(map);
    })
    .catch((error) => {
      console.log("Error fetching weather data:", error);
    });
});

//map//

function mymap() {
  map = L.map("map").setView([51.505, -0.09], 3);
  L.tileLayer(
    "https://cartodb-basemaps-{s}.global.ssl.fastly.net/light_all/{z}/{x}/{y}.png",
    {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }
  ).addTo(map);
  L.geoJSON(worldcountries, {
    onEachFeature: function (feature, layer) {
      layer.bindPopup(feature.properties.ADMIN);
    },
    style: {
      fillColor: "yellow",
      fillOpacity: 0.2,
      color: "orange",
    },
  }).addTo(map);
}
mymap();
