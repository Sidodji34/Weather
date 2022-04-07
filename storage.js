import { RIGHT_BAR, tabNow } from "./view.mjs";
export const favoriteTowns = new Set();
export const lastSessionForecast = {};
export function getFavoriteTowns() {
  for (let i = 0; i < localStorage.length; i++) {
    let key = localStorage.key(i);
    favoriteTowns.add(key)
    RIGHT_BAR.LIST_TOWN.insertAdjacentHTML('beforeend', `${localStorage.getItem(key)}`);
  } 
  //console.log(`StorageArray: ${JSON.stringify([...favoriteTowns])}`)
};

export function saveFavoriteTowns(nameTown, value) {
  localStorage.setItem(`${nameTown}`, value);
};

export function removeFavoriteTowns(key) {
  localStorage.removeItem(`${key}`)
};

function getCookie() {
  return document.cookie.split("; ").reduce((acc, item) => {
    const [name, value] = item.split("=");

    return { ...acc, [name]: value };
  }, {});
};

export const lastSession = getCookie();
export function getLastSession() {
    tabNow();
}

