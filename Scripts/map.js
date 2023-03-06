import * as data_recipes from "./data_recipes.js";
import * as search_recipes from "./search_recipes.js";
import * as search_filter from "./search_filter.js";

//réinitialise le localStorage;
localStorage.clear();

//traitement base de donnée
data_recipes.dataRecipes();

//Filtre recipes
search_recipes.onSearch();

search_filter.onSearch();
