import { recipes } from "../Data/recipes.js";
import * as data_recipes from "./data_recipes.js";
import * as fail from "./fail.js";

function search(query) {
  const search_recipes = [];
  for (let i = 0; i < recipes.length; i++) {
    //recherche en fonction du nom
    let nameMatch = false;
    const recipeName = recipes[i].name.toLowerCase();
    const queryLowerCase = query.toLowerCase();
    for (let j = 0; j < recipeName.length; j++) {
      let k = j;
      let l = 0;
      while (recipeName[k] === queryLowerCase[l] && l < queryLowerCase.length) {
        k++;
        l++;
      }
      if (l === queryLowerCase.length) {
        nameMatch = true;
        break;
      }
    }

    //recherche en fonction de la description
    let descriptionMatch = false;
    const recipeDescription = recipes[i].description.toLowerCase();
    for (let j = 0; j < recipeDescription.length; j++) {
      let k = j;
      let l = 0;
      while (
        recipeDescription[k] === queryLowerCase[l] &&
        l < queryLowerCase.length
      ) {
        k++;
        l++;
      }
      if (l === queryLowerCase.length) {
        descriptionMatch = true;
        break;
      }
    }

    //recherche en fonction des ingredients
    let ingredientMatch = false;
    const recipeIngredients = recipes[i].ingredients;
    for (let j = 0; j < recipeIngredients.length; j++) {
      const ingredient = recipeIngredients[j].ingredient.toLowerCase();
      for (let k = 0; k < ingredient.length; k++) {
        let l = k;
        let m = 0;
        while (
          ingredient[l] === queryLowerCase[m] &&
          m < queryLowerCase.length
        ) {
          l++;
          m++;
        }
        if (m === queryLowerCase.length) {
          ingredientMatch = true;
          break;
        }
      }
      if (ingredientMatch) {
        break;
      }
    }

    if (nameMatch || descriptionMatch || ingredientMatch) {
      search_recipes.push(recipes[i]);
    }
  }

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
