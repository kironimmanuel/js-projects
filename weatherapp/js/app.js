import getElement from './utils.js';
const months = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];
const days = [
  'Sunday',
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
];
const now = new Date();
const month = months[now.getMonth()];
const day = days[now.getDay()];
const date = `${now.getDate()} ${day} ${month} ${now.getFullYear()}`;
const time = `${now.getHours()}:${now.getMinutes()}`;
let weather = {
  apiKey: '9ef8c7e013a6afbcaa89cbd55e5dc26e',
  fetchWeather: function (city) {
    fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${this.apiKey}`
    )
      .then(response => response.json())
      .then(data => this.displayWeather(data));
  },
  displayWeather: function (data) {
    const { name } = data;
    const { icon, description } = data.weather[0];
    const { temp, humidity } = data.main;
    const { speed } = data.wind;
    const { all } = data.clouds;

    getElement('.name').innerText = `${name}`;
    getElement('.icon').src = `https://openweathermap.org/img/wn/${icon}.png`;
    getElement('.condition').innerText = description;
    getElement('.cloud').innerText = `${all} %`;
    getElement('.temp').innerText = `${Math.round(temp)}°C`;
    getElement('.humidity').innerText = `Humidity: ${humidity} %`;
    getElement('.wind').innerText = `Wind speed: ${speed} km/h`;
    getElement('.container').classList.remove('loading');
    getElement(
      '.weather-app'
    ).style.backgroundImage = `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)),url('https://source.unsplash.com/1600x900/?${name}')`;
    getElement('.time').innerText = time;
    getElement('.date').innerText = date;
  },

  search: function () {
    const input = getElement('.search').value;
    if (input) {
      this.fetchWeather(input);
    } else {
      getElement('.search').textContent = `No input found`;
    }
  },
};

getElement('.submit').addEventListener('click', function (e) {
  e.preventDefault();
  weather.search();
});
getElement('.search').addEventListener('keyup', function (e) {
  e.preventDefault();
  if (e.key == 'Enter') {
    weather.search();
  }
});

const quickSelect = document.querySelectorAll('.city');
quickSelect.forEach(city =>
  city.addEventListener('click', function (e) {
    const quickSelectCity = e.target.textContent;
    weather.fetchWeather(quickSelectCity);
    getElement('.search').value = '';
  })
);

weather.fetchWeather('frankfurt');
