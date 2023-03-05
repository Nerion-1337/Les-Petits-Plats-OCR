import { recipes } from "../Data/recipes.js";
import data_filter from "./data_filter.js";
import Article_Recipe from "./article_recipes.js";
import List_Filter from "./list_filter.js";
import * as select from "./select.js";
import * as clear from "./clear.js";
import * as App from "./App.js";

export let data_recipes;

export function dataRecipes(data_value) {
  let all_matches = JSON.parse(localStorage.getItem("all_matches"));
  let search_recipes = JSON.parse(localStorage.getItem("search_recipes"));
//   let search_list = JSON.parse(localStorage.getItem("search_list"));

  if (all_matches == null && search_recipes == null) {
   data_recipes = recipes;
  } else if (all_matches != null && search_recipes == null) {
    data_recipes = all_matches
  } else if (all_matches == null && search_recipes != null) {
    data_recipes = search_recipes
  } else if (all_matches != null && search_recipes != null) {
    const result_recipes = all_matches.filter((all_matches) =>
      search_recipes.some(
        (search_recipes) => all_matches.id == search_recipes.id
      )
    );
    data_recipes = result_recipes
  }
// let result_list;
// if(data_value != null){
//     result_list = data_recipes.filter((data_recipes) =>
//     search_list.some(
//       (search_list) => data_recipes.id == search_list.id
//     )
//   );
// }

  script(data_recipes, data_value);

}

function script(data_recipes, data_value) {
    let search_filter = JSON.parse(localStorage.getItem("search_filter"));
   // let data_value = JSON.parse(localStorage.getItem("data_value"));
  //supprime les anciennes données html
  clear.clear();
  //Afficher les articles
  App.main(data_recipes);
   //Afficher les filtres


  if (data_value == "ingredients") {
    App.trie("ingredients", search_filter, data_value);
    App.trie("appliance", data_recipes);
    App.trie("ustensils", data_recipes);
  } else if (data_value == "Appareils") {
    App.trie("ingredients", data_recipes);
    App.trie("appliance", search_filter, data_value);
    App.trie("ustensils", data_recipes);
  } else if (data_value == "Ustensils") {
    App.trie("ingredients", data_recipes);
    App.trie("appliance", data_recipes);
    App.trie("ustensils", search_filter, data_value);
  } else {
    App.trie("ingredients", data_recipes);
    App.trie("appliance", data_recipes);
    App.trie("ustensils", data_recipes);
  } 
  select.blockSelect();
}
