import { isListTown } from "./main.js";
import { getFavoriteTowns, saveFavoriteTowns, getLastSession, lastSession } from "./storage.js";
import { compareAsc, format, getDaysInMonth } from "date-fns";

export const INPUT = {
  INPUT_FIELD: document.querySelector('.search_town'),
  SEARCH_BUTTON: document.querySelector('.button_search'),
};
export const TAB_NOW = {
  DEGREES: document.querySelector('.degrees'),
  NAME_TOWN: document.querySelector('.name_town_now'),
  ICON: document.querySelector('.icon'),
  ICON_LIKE: document.querySelector('.add_like'),
};
export const TAB_DETAILS = {
  NAME_TOWN: document.querySelector('.name_town_details'),
  DEGREES: document.querySelector('.degrees_details'),
  FEELS_LIKE: document.querySelector('.feels_like'),
  WEATHER: document.querySelector('.weather_details'),
  SUNRISE: document.querySelector('.sunrise_details'),
  SUNSET: document.querySelector('.sunset_details'),
};
export const TAB_FORECAST = {
  NAME_TOWN: document.querySelector('.name_town_forecast'),
  DATE: document.getElementsByClassName('.info__date'),
  DEGREES: document.getElementsByClassName('.degrees_details'),
  FEELS_LIKE: document.getElementsByClassName('.feels_like'),
  TIME: document.getElementsByClassName('.info__time'),
  WEATHER: document.getElementsByClassName('info__weather'),
  ICON_WEATHER: document.getElementsByClassName('.icon__weather'),
  FORECAST_LIST: document.querySelector('.forecast_list'),
};
export const RIGHT_BAR = {
  LIST_TOWN: document.querySelector('.list'),
  NAME_TOWN: document.getElementsByClassName('name__town'),
  DELITE_BUTTON: document.getElementsByClassName('btn__delite'),
};

getLastSession();
getFavoriteTowns();

INPUT.SEARCH_BUTTON.addEventListener('click', tabNow);
export async function tabNow() {
  TAB_FORECAST.FORECAST_LIST.innerHTML = '';
  const apiKey = '35cb3bc18d86d923883a89ca2a503caf';
  const serverUrl = 'http://api.openweathermap.org/data/2.5/weather';
  let cityName;
  if (INPUT.INPUT_FIELD.value === '') {
    cityName = lastSession.nameTown;
  }
  if (INPUT.INPUT_FIELD.value) {
    cityName = INPUT.INPUT_FIELD.value;
  }
  try {
    const url = `${serverUrl}?q=${cityName}&appid=${apiKey}`;
    const response = await fetch(url);
    const result = await response.json();
    TAB_NOW.NAME_TOWN.textContent = result.name;
    TAB_NOW.DEGREES.textContent = `${Math.round(+result.main.temp) - 273}°`;
    TAB_NOW.ICON.innerHTML = `<div class="icon" class="tabs_block" style="background-image: url(http://openweathermap.org/img/wn/${result.weather[0].icon}.png);"></div>`;
    return tabDetails(result);
  } catch (error) {
    console.log(error);
  } finally {
    INPUT.INPUT_FIELD.value = '';
    document.cookie = `nameTown=${TAB_NOW.NAME_TOWN.textContent}; max-age=3600`;
  }
};

export function tabDetails(result) {
  const SUNRISE = new Date(result.sys.sunrise * 1000);
  const SUNSET = new Date(result.sys.sunset * 1000);
  const formattedMinutesSunrise = (SUNRISE.getMinutes() < 10 ? '0' : '') + SUNRISE.getMinutes();
  const formattedMinutesSunset = (SUNSET.getMinutes() < 10 ? '0' : '') + SUNSET.getMinutes();
  TAB_DETAILS.NAME_TOWN.textContent = TAB_NOW.NAME_TOWN.textContent;
  TAB_DETAILS.DEGREES.textContent = `Temperature: ${TAB_NOW.DEGREES.textContent}`;
  TAB_DETAILS.FEELS_LIKE.textContent = `Feels Like: ${Math.round(+result.main.feels_like) - 273}°`;
  TAB_DETAILS.WEATHER.textContent = `Weather: ${result.weather[0].main}`;
  TAB_DETAILS.SUNRISE.textContent = `Sunrise: ${SUNRISE.getHours()}:${formattedMinutesSunrise}`;
  TAB_DETAILS.SUNSET.textContent = `Sunset: ${SUNSET.getHours()}:${formattedMinutesSunset}`;
  tabForecast(result.coord.lat, result.coord.lon);
};

export async function tabForecast(lat, lon) {
  const apiKey = '35cb3bc18d86d923883a89ca2a503caf';
  try {
    const url = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude={hourly}&appid=${apiKey}`;
    const response = await fetch(url);
    const result = await response.json();
    TAB_FORECAST.NAME_TOWN.textContent = TAB_DETAILS.NAME_TOWN.textContent;
    for (let i = 0; i < 8;) {
      let TIME = new Date(result.hourly[i].dt * 1000);
      const formattedTime = (TIME.getMinutes() < 10 ? '0' : '') + TIME.getMinutes();
      TAB_FORECAST.DEGREES.textContent = `Temperature: ${Math.round(+result.hourly[i].temp) - 273}°`;
      TAB_FORECAST.FEELS_LIKE.textContent = `Feels Like: ${Math.round(+result.hourly[i].feels_like) - 273}°`;
      TAB_FORECAST.TIME.textContent = `${TIME.getHours()}:${formattedTime}`;
      TAB_FORECAST.WEATHER.textContent = result.hourly[i].weather[0].main;
      TAB_FORECAST.ICON_WEATHER.innerHTML = `<div class="icon__weather" style="background-image: url(http://openweathermap.org/img/wn/${result.hourly[i].weather[0].icon}.png);"></div>`;
      hourlyForecast();
      i += 2;
    }
  } catch (error) {
      alert(error);
  } 
};

function hourlyForecast() {
  const boxOutput = document.createElement('div');
  boxOutput.className = 'forecast_box';
  boxOutput.insertAdjacentHTML('afterbegin', `<p class="info__date">
  ${getDate()}
  </p>
  <ul class="info__forecast">
      <li class="degrees_details">${TAB_FORECAST.DEGREES.textContent}</li>
      <li class="feels_like">${TAB_FORECAST.FEELS_LIKE.textContent}</li>
  </ul>
  <p class="info__time">${TAB_FORECAST.TIME.textContent}</p>
      <p class="info__weather">${TAB_FORECAST.WEATHER.textContent}</p>
      ${TAB_FORECAST.ICON_WEATHER.innerHTML}
  </div>`)
  TAB_FORECAST.FORECAST_LIST.append(boxOutput);
};

TAB_NOW.ICON_LIKE.addEventListener('click', addLocations);
export function addLocations(nameTown) {
  if (isListTown()) {
    nameTown = TAB_NOW.NAME_TOWN.textContent;
    let addTown = document.createElement('li');
    addTown.innerHTML = `
    <li class="town_in_list">
    <div>
        <button class="name__town">${nameTown}</button>
        <button class="btn__delite">x</button>
    </div>
    </li>`
    addTown.className = "town_in_list";
    RIGHT_BAR.LIST_TOWN.prepend(addTown);
    saveFavoriteTowns(`${nameTown}`, addTown.innerHTML);
  }
};

RIGHT_BAR.LIST_TOWN.addEventListener('click', function (event) {
  if (event.target.className === 'btn__delite') {
    event.target.closest('.town_in_list').remove();
  }
  else if (event.target.className === 'name__town') {
    INPUT.INPUT_FIELD.value = event.target.textContent;
    tabNow();
  }
});

function getDate() {
  return format(new Date(), 'd MMMM');
};