import { recipes } from "../Data/recipes.js";
import data_filter from "./data_filter.js";
import Article_Recipe from "./article_recipes.js";
import List_Filter from "./list_filter.js";
import * as select from "./select.js";
import * as clear from "./clear.js";
import * as App from "./App.js";

export let data_recipes;

export function dataRecipes() {
  let all_matches = JSON.parse(localStorage.getItem("all_matches"));
  let search_recipes = JSON.parse(localStorage.getItem("search_recipes"));

  if (all_matches == null && search_recipes == null) {
    script(recipes);

  } else if (all_matches != null && search_recipes == null) {
    script(all_matches);

  } else if (all_matches == null && search_recipes != null) {
    script(search_recipes);

  } else if (all_matches != null && search_recipes != null) {

    const result_recipes = all_matches.filter((all_matches) =>
    search_recipes.some((search_recipes) => all_matches.id == search_recipes.id)
  );
    script(result_recipes);
  }
}


function script(data_recipes) {
  //supprime les anciennes données html
  clear.clear();
  //Afficher les articles
  App.main(data_recipes); 
  //Afficher les filtres
  App.trie("ingredients", data_recipes);
  App.trie("appliance", data_recipes);
  App.trie("ustensils", data_recipes);
  select.blockSelect();
}
