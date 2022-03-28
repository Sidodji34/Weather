import { TAB_NOW, INPUT, RIGHT_BAR, TAB_DETAILS, TAB_FORECAST } from "./view.js";
import { removeFavoriteTowns, favoriteTowns } from "./storage.js";
export const mouthList = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
export const listCityes = favoriteTowns;

export function getDate() {
  let date = new Date();
  return `${date.getDate()} ${mouthList.find(month => month == mouthList[date.getMonth()])}`
};

export function isListTown(list) {
  list = listCityes;
  if (TAB_NOW.NAME_TOWN.textContent === '') {
    alert("Empty line");
    return false;
  } 
  if (list.has(`${TAB_NOW.NAME_TOWN.textContent}`)) {
    alert("This city is already on the list.");
    return false;
   }
  if (TAB_NOW.NAME_TOWN.textContent){
    list.add(`${TAB_NOW.NAME_TOWN.textContent}`);
    console.log(list)
    return true;
  }
};

RIGHT_BAR.LIST_TOWN.addEventListener('click', function(event, list) {
  list = listCityes;
  if (event.target.className === 'btn__delite') {
  const isNameTown = event.target.previousElementSibling.textContent
  removeFavoriteTowns(`${isNameTown}`)
  list.delete(`${isNameTown}`);
  console.log(`MainArray: ${JSON.stringify([...listCityes])}`);
  }
});

export function refreshTabs() {
  INPUT.INPUT_FIELD.value = '';
  TAB_NOW.DEGREES.textContent = '';
  TAB_NOW.ICON.innerHTML = '';
  TAB_FORECAST.innerHTML = '';
  TAB_DETAILS.NAME_TOWN.textContent = '';
  TAB_DETAILS.DEGREES.textContent = 'Temperature:';
  TAB_DETAILS.FEELS_LIKE.textContent = 'Feels Like:';
  TAB_DETAILS.WEATHER.textContent = 'Weather:';
  TAB_DETAILS.SUNRISE.textContent = 'Sunrise:';
  TAB_DETAILS.SUNSET.textContent = 'Sunset:';
  TAB_FORECAST.NAME_TOWN.textContent = '';
};
