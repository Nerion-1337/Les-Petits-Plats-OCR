import { recipes } from "../Data/recipes.js";
import * as select from "./select.js";
import * as clear from "./clear.js";
import * as App from "./App.js";
import * as fail from "./fail.js";

export let data_recipes;

export function dataRecipes() {
  let all_matches = JSON.parse(localStorage.getItem("all_matches"));
  let search_recipes = JSON.parse(localStorage.getItem("search_recipes"));

  if (all_matches == null && search_recipes == null) {
    data_recipes = recipes;
  } else if (all_matches != null && search_recipes == null) {
    data_recipes = all_matches;
  } else if (all_matches == null && search_recipes != null) {
    data_recipes = search_recipes;
  } else if (all_matches != null && search_recipes != null) {
    const result_recipes = all_matches.filter((all_matches) =>
      search_recipes.some(
        (search_recipes) => all_matches.id == search_recipes.id
      )
    );
    if (result_recipes.length === 0) {
      fail.failResearch();
      return;
    } else {
      data_recipes = result_recipes;
    }
  }

  script(data_recipes);
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
  //Actualise le selecteur pour pouvoir initialisé des tags
  select.blockSelect();
}
