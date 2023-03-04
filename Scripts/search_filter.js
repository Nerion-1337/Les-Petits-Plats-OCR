import { recipes } from "../Data/recipes.js";
import * as data_recipes from "./data_recipes.js";
import data_filter from "./data_filter.js";
import Article_Recipe from "./article_recipes.js";
import List_Filter from "./list_filter.js";
import * as select from "./select.js";
import * as clear from "./clear.js";
import * as App from "./App.js";

function search(query, form, data_value) {

  const formUL = form.nextElementSibling;
  const liElements = Array.from(formUL.querySelectorAll("li"));
  const filteredLiElements = liElements.filter(li => li.textContent.toLowerCase().includes(query));
  const search_filter = filteredLiElements.map(li => li.textContent);
 

  localStorage.setItem("search_filter", JSON.stringify(search_filter));
  //data_recipes.dataRecipes(data_value);
  test(search_filter, data_value);
}

function test(search_filter, data_value){

  const ingredients = document.querySelector(".ingredients_ul");
  ingredients.innerHTML = "";
  App.trie("ingredients", search_filter, data_value);
}


export function onSearch() {
  const main_form = Array.from(document.querySelectorAll("main form"));
  main_form.forEach((form) => {
    form.addEventListener("keyup", (e) => {
      const query = e.target.value.toLowerCase();
      const data_value = form.dataset.value;

      if (query.length >= 3) {
        data_recipes.dataRecipes();
        search(query, form, data_value);
      } else if (query.length <= 2) {
        data_recipes.dataRecipes();
      }
    });
  });
}