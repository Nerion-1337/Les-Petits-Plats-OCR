import { recipes } from "../Data/recipes.js";
import * as data_recipes from "./data_recipes.js";
import * as fail from "./fail.js";

function search(query) {
  const search_recipes = recipes.filter((recipe) => {
    //recherche en fonction du nom
    const nameMatch = recipe.name.toLowerCase().includes(query.toLowerCase());
    //recherche en fonction de la description
    const descriptionMatch = recipe.description
      .toLowerCase()
      .includes(query.toLowerCase());
    //recherche en fonction des ingredients
    const ingredientMatch = recipe.ingredients.some((ingredient) =>
      ingredient.ingredient.toLowerCase().includes(query.toLowerCase())
    );
    return nameMatch || descriptionMatch || ingredientMatch;
  });
  // si la recherche n'existe pas dans les recettes afficher message erreur
  if (search_recipes.length === 0) {
    fail.failResearch();
  } else {
    localStorage.setItem("search_recipes", JSON.stringify(search_recipes));
    data_recipes.dataRecipes();
  }
}

export function onSearch() {
  const header = document.querySelector("header form");

  header.addEventListener("keyup", (e) => {
    const query = e.target.value;
    if (query.length >= 3) {
      search(query);
    } else if (query.length <= 2) {
      //remttre la totalité de la base de donnée pour le data_recipes
      localStorage.setItem("search_recipes", JSON.stringify(recipes));
      data_recipes.dataRecipes();
    }
  });
}
