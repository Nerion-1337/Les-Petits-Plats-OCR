import { recipes } from "../Data/recipes.js";
import * as data_recipes from "./data_recipes.js";
import data_filter from "./data_filter.js";
import Article_Recipe from "./article_recipes.js";
import List_Filter from "./list_filter.js";
import * as select from "./select.js";
import * as clear from "./clear.js";
import * as App from "./App.js";

export function onSearch() {
  const main_form = Array.from(document.querySelectorAll("main form"));
  const form = document.querySelector(".form_ingredient");
  main_form.forEach((form) => {
    form.addEventListener("keyup", (e) => {
      const query = e.target.value;
      const data_value = form.dataset.value.toLowerCase().trim();

      if (query.length >= 3) {
        localStorage.setItem("query", JSON.stringify(query));
        localStorage.setItem("data_value", JSON.stringify(data_value));
        data_recipes.dataRecipes();
      } else if (query.length <= 2) {
        localStorage.removeItem("data_value");
        data_recipes.dataRecipes();
      }
    });
  });
}
