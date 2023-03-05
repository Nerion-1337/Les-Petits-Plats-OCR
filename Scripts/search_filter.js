import { recipes } from "../Data/recipes.js";
import * as data_recipes from "./data_recipes.js";
import data_filter from "./data_filter.js";
import Article_Recipe from "./article_recipes.js";
import List_Filter from "./list_filter.js";
import * as select from "./select.js";
import * as clear from "./clear.js";
import * as App from "./App.js";

export function search(query, form, data_value) {

  const formUL = form.nextElementSibling;
  //console.log(formUL)
  const liElements = Array.from(formUL.querySelectorAll("li"));
  const filteredLiElements = liElements.filter(li => li.textContent.toLowerCase().includes(query));
  const search_filter = filteredLiElements.map(li => li.textContent.toLowerCase().trim());

  localStorage.setItem("search_filter", JSON.stringify(search_filter));
  localStorage.setItem("query", JSON.stringify(query));
  localStorage.setItem("form", form.outerHTML);
  localStorage.setItem("data_value", JSON.stringify(data_value));
//   let search_list;
// if(form.dataset.value == "Ingrédients"){
// search_list = recipes.filter((recipe) => {
//     const Match = recipe.ingredients.some((ingredient) =>
//     ingredient.ingredient.toLowerCase().includes(query.toLowerCase())
//   );
//   return Match;
// });

// } else if(form.dataset.value == "Appareils"){
//   search_list = recipes.filter((recipe) => {
//     const Match = recipe.appliance.toLowerCase().includes(query.toLowerCase()
//     );
//     return Match;
//   });

// }else if(form.dataset.value == "Ustensils"){
//   search_list = recipes.filter((recipe) => {
//     const Match = recipe.ustensils.some(
//       (ustensil) => ustensil.toLowerCase().includes(query.toLowerCase())
//     );
//     return Match;
//   });
// }


//test(search_filter, data_value);
data_recipes.dataRecipes(data_value);
}

function test(search_filter, data_value){

  const ingredients = document.querySelector(".appareils_ul");
  ingredients.innerHTML = "";
  App.trie("appliance", search_filter, data_value);
  select.blockSelect();
}


export function onSearch() {
  const main_form = Array.from(document.querySelectorAll("main form"));
  const form = document.querySelector(".form_ingredient")
  main_form.forEach((form) => {
    form.addEventListener("keyup", (e) => {
      const query = e.target.value;
      const data_value = form.dataset.value.toLowerCase().trim();

      if (query.length >= 3) {
         data_recipes.dataRecipes();
        search(query, form, data_value);
       
        
      } else if (query.length <= 2) {
        // localStorage.removeItem("data_value");
        // localStorage.removeItem("search_filter");
        data_recipes.dataRecipes();
        
      }
    });
  });
}