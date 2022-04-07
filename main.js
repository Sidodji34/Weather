import { TAB_NOW, RIGHT_BAR } from "./view.mjs";
import { removeFavoriteTowns, favoriteTowns } from "./storage.js";
export const listCityes = favoriteTowns;
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