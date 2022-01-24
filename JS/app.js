const citySearch = document.querySelector("form");
const card = document.querySelector(".card");
const details = document.querySelector(".details");
const time = document.querySelector(".time-of-day");
const icon = document.querySelector(".icon img");

const updateUI = (data) => {
  // de-structured
  // must have the same name as the source though
  const { cityDetails, weather } = data;
  // not de-structured
  //   const cityDetails = data.cityDetails;
  //   const weather = data.weather;
  details.innerHTML = ` 
    <h5 class="my-3">${cityDetails.EnglishName}</h5>
    <div class="my-3">${weather.WeatherText}</div>
    <div class="display-4 my-4">
        <span>${weather.Temperature.Metric.Value}</span>
        <span>&deg;C</span> 
        <br/>
        <span>${weather.Temperature.Imperial.Value}</span>
        <span>&deg;F</span>
    `;
  const iconSource = `img/icons/${weather.WeatherIcon}.svg`;
  icon.setAttribute("src", iconSource);

  let timeSource = weather.IsDayTime ? "img/day.svg" : "img/night.svg"; //using ternary operator
    // if (weather.IsDayTime) {
    //   timeSource = "img/day.svg";
    // } else {
    //   timeSource = "img/night.svg";
    // }
  time.setAttribute("src", timeSource);

  if (card.classList.contains("d-none")) {
    card.classList.remove("d-none");
  }
};
const updateCity = async (city) => {
  const cityDetails = await getCity(city); //from forecast.js
  const weather = await getWeather(cityDetails.Key); //from forecast.js
  return {
    //   object shorthand notation
    cityDetails,
    weather,
    // cityDetails: cityDetails,
    // weather: weather,
  };
};

citySearch.addEventListener("submit", (e) => {
  e.preventDefault();
  const city = citySearch.city.value.trim();
  citySearch.reset();
  updateCity(city)
    .then((data) => updateUI(data))
    .catch((err) => console.log("ERror",err));
});
