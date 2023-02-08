/* Testing API  */
/*
let weatherApi = {
  "apiKey": "64af4cf1ecbdda50b562d1d35a8300f7"
}
/* api.openweathermap.org/data/2.5/forecast?lat={lat}&lon={lon}&appid={API key} */
/* lat = latitude, lon = longtitude, API key which above */
/* Atlanta 33.7488° N, 84.3877° W */
/* copy and paste into browser for testing live */
/* api.openweathermap.org/data/2.5/forecast?lat={33.7488}&lon={84.3877}&appid={64af4cf1ecbdda50b562d1d35a8300f7} */
/* Invalid Code 401 - Did not Specify API Key or not activate*/
/* Testing 2nd */
/* api.openweathermap.org/data/2.5/forecast?q={city name}&appid={API key} */
/* api.openweathermap.org/data/2.5/forecast?q={Atlanta}&appid={64af4cf1ecbdda50b562d1d35a8300f7} */
/* Invalid Code 401 - Follow up */
/* Removing Bracket */ /* IMPORTANT */ /* IMPORTANT */
/* api.openweathermap.org/data/2.5/forecast?q=Atlanta&appid=64af4cf1ecbdda50b562d1d35a8300f7 */
/* cod: "200" researching */
/*
function getInfo(){
  const newName = document.getElementById("citySearch");
  const cityName = document.getElementById("cityName");
  cityName.innerHTML ="Weather in "+newName.value
}
/* clg + tab (ES6)
console.log(newName); not Defined.
console.log(cityName); Defined 
*/
/* Formatting */
/* api.openweathermap.org/data/2.5/forecast?q={cityName}&appid={API_KEY} */
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/async_function

const citySearch = document.querySelector("#citySearch");
const cityName = document.querySelector(".cityName");
const temperature = document.querySelector("#temperature");
// Adding weathericon //
const weatherIcon = document.querySelector("#weather-icon");

const API_KEY = "64af4cf1ecbdda50b562d1d35a8300f7";

async function getWeather(city) {
    const response = await fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${API_KEY}`);
    const data = await response.json();
    return data;
}


async function handleSubmit(e) {
    e.preventDefault();
    const city = citySearch.value;
    const weather = await getWeather(city);
    localStorage.setItem("city", city);
    // City is good, temperature fail //

    // current weather information
    const currentWeather = weather.list[0];
    const temp = (currentWeather.main.temp - 273.15).toFixed(1);
    const tempInFahrenheit = ((temp * 9 / 5) + 32).toFixed(1);
     // const temp = (currentWeather.main.temp - 273.15).toFixed(1);
    // const tempInFahrenheit = ((temp * 9/5) + 32).toFixed(1);
    // Without tempInFahrenheit, for celsuis //
    cityName.textContent = weather.city.name;
    temperature.textContent = `Temperature: ${tempInFahrenheit}°F`;
    document.querySelector("#description").textContent = currentWeather.weather[0].description;
    // icons attempt //
    weatherIcon.src = `http://openweathermap.org/img/wn/${currentWeather.weather[0].icon}@2x.png`;

    // fivedaysforecast
    const cards = document.querySelectorAll(".card-body");
    for (let i = 0; i < 5; i++) {
        const day = weather.list[i * 8]; // 8 is the interval to get the next day
        const date = new Date(day.dt * 1000);
        const options = { weekday: 'long' };
        const dayOfWeek = date.toLocaleDateString('en-US', options);
        const temp = (day.main.temp - 273.15).toFixed(1);
        const tempInFahrenheit = ((temp * 9 / 5) + 32).toFixed(1);
        cards[i].querySelector(".card-days").textContent = dayOfWeek;
        cards[i].querySelector(".card-temps").textContent = `Temperature: ${tempInFahrenheit}°F`;
    }
}

// local storage
const storedCity = localStorage.getItem("city");
if (storedCity) {
    citySearch.value = storedCity;
    handleSubmit(new Event("submit"));
}

document.querySelector("form").addEventListener("submit", handleSubmit);

/*
const weatherIcon = document.querySelector("#weather-icon");

fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}`)
  .then(response => response.json())
  .then(data => {
    const code = data.weather[0].id;
    if (code >= 200 && code <= 232) {
      weatherIcon.className = "fas fa-bolt";
    } else if (code >= 300 && code <= 321) {
      weatherIcon.className = "fas fa-cloud-drizzle";
    } else if (code >= 500 && code <= 531) {
      weatherIcon.className = "fas fa-cloud-rain";
    } else if (code >= 600 && code <= 622) {
      weatherIcon.className = "fas fa-snowflake";
    } else if (code >= 701 && code <= 781) {
      weatherIcon.className = "fas fa-smog";
    } else if (code === 800) {
      weatherIcon.className = "fas fa-sun";
    } else if (code >= 801 && code <= 804) {
      weatherIcon.className = "fas fa-cloud";
    }
  });
*/