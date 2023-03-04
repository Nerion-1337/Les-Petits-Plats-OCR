import { recipes } from "../Data/recipes.js";
import * as data_recipes from "./data_recipes.js";
import data_filter from "./data_filter.js";
import Article_Recipe from "./article_recipes.js";
import List_Filter from "./list_filter.js";
import * as select from "./select.js";
import * as clear from "./clear.js";
import * as App from "./App.js";


function search(query) {

  const search_recipes = recipes.filter((recipe) => {
    const nameMatch = recipe.name.toLowerCase().includes(query.toLowerCase());
    const descriptionMatch = recipe.description
      .toLowerCase()
      .includes(query.toLowerCase());
    const ingredientMatch = recipe.ingredients.some((ingredient) =>
      ingredient.ingredient.toLowerCase().includes(query.toLowerCase())
    );
    return nameMatch || descriptionMatch || ingredientMatch;
  });

  localStorage.setItem('search_recipes', JSON.stringify(search_recipes));
  data_recipes.dataRecipes();
}

export function onSearch() {
  
const header = document.querySelector("header form");


  header.addEventListener("keyup", (e) => {
    const query = e.target.value;
    
    if (query.length >= 3) {
      search(query);
    } else if (query.length <= 2) {
      localStorage.setItem('search_recipes', JSON.stringify(recipes));
      data_recipes.dataRecipes();

    }
  });
}
