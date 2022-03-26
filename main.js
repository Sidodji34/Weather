import { TAB_NOW, INPUT, RIGHT_BAR, TAB_DETAILS, TAB_FORECAST } from "./view.js";
import { removeFavoriteTowns, favoriteTowns } from "./storage.js";
export const listCityes = favoriteTowns;
export const MAP = new Map();
export function isListTown(list) {
  list = listCityes;
  if (TAB_NOW.NAME_TOWN.textContent === '') {
    alert("Empty line");
    return false;
  } 
  if (list.includes(TAB_NOW.NAME_TOWN.textContent)) {
    alert("This city is already on the list.");
    return false;
   }
  if (TAB_NOW.NAME_TOWN.textContent){
    list.push(TAB_NOW.NAME_TOWN.textContent);
    console.log(list)
    return true;
  }
};

RIGHT_BAR.LIST_TOWN.addEventListener('click', function(event) {
  let list = listCityes;
  if (event.target.className === 'btn__delite') {
  const isNameTown = event.target.previousElementSibling.textContent
  removeFavoriteTowns(`${isNameTown}`)
  const getIndexTown = list.indexOf(isNameTown);
  list = list.splice(getIndexTown, 1);
  console.log(`MainArray: ${listCityes}`);
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
}

