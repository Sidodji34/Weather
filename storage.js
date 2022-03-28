import { refreshTabs } from "./main.js";
import { INPUT, RIGHT_BAR, tabNow, TAB_DETAILS, TAB_FORECAST, TAB_NOW } from "./view.js";
export const favoriteTowns = new Set();
export const lastSessionForecast = {};

export function getFavoriteTowns() {
  for (let i = 0; i < localStorage.length; i++) {
    let key = localStorage.key(i);
    favoriteTowns.add(key);
    RIGHT_BAR.LIST_TOWN.insertAdjacentHTML('beforeend', `${localStorage.getItem(key)}`);
  }
  console.log(`StorageArray: ${JSON.stringify([...favoriteTowns])}`)
};

export function saveFavoriteTowns(nameTown, value) {
  localStorage.setItem(`${nameTown}`, value);
};

export function removeFavoriteTowns(key) {
  localStorage.removeItem(`${key}`)
};

export function isLastForecast(key, value) {
  sessionStorage.setItem(`${key}`, value)
};

/*export function getLastSession() {
  if (INPUT.INPUT_FIELD.value === '') {
    TAB_NOW.TAB.innerHTML = sessionStorage.getItem('tab_now')
    TAB_DETAILS.TAB.innerHTML = sessionStorage.getItem('tab_details')
    TAB_FORECAST.TAB.innerHTML = sessionStorage.getItem('tab_forecast')
  }
  if (INPUT.INPUT_FIELD.value != '') {
    for (let i = 0; i < sessionStorage.length; i++) {
        let key = sessionStorage.key(i);
    }
  }
};*/