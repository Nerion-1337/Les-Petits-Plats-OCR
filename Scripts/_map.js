import { recipes } from "../Data/recipes.js";
import * as data_recipes from "./data_recipes.js";
import data_filter from "./data_filter.js";
import Article_Recipe from "./article_recipes.js";
import List_Filter from "./list_filter.js";
import * as select from "./select.js";
import * as clear from "./clear.js";
import * as App from "./App.js";
import * as search_recipes from "./search_recipes.js";
import * as search_filter from "./search_filter.js";



//réinitialise le localStorage;
localStorage.clear();

//traitement base de donnée
data_recipes.dataRecipes();

//Filtre recipes
search_recipes.onSearch();


search_filter.onSearch();