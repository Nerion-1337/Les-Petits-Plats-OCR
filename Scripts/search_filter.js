import * as data_recipes from "./data_recipes.js";

export function onSearch() {
  const main_form = Array.from(document.querySelectorAll("main form"));
  const form = document.querySelector(".form_ingredient");
  
  for(const form of main_form){
    form.addEventListener("keyup", (e) => {
      const query = e.target.value;
      const data_value = form.dataset.value.toLowerCase().trim();

      if (query.length >= 3) {
        localStorage.setItem("query", JSON.stringify(query));
        localStorage.setItem("data_value", JSON.stringify(data_value));
        data_recipes.dataRecipes();
      } else if (query.length <= 2) {
        //annule data_value pour data_recipes
        localStorage.removeItem("data_value");
        data_recipes.dataRecipes();
      }
    });
  };
}
