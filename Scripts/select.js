import { recipes } from "../Data/recipes.js";
import * as data_recipes from "./data_recipes.js";

//Création des filtres au click
export function blockSelect() {
  const select = document.querySelector(".select");
  const selectLI = document.querySelectorAll(".select_filter li");

  for (let i = 0; i < selectLI.length; i++) {
    const li = selectLI[i];
    li.addEventListener("click", () => {
      const parentClass = li.parentElement.classList[0];
      const selectedFilter = li.textContent.trim();
      const ElementFilter = document.createElement("span");

      // Vérifie si un élément similaire existe déjà
      let existingElement = false;
      const spans = select.querySelectorAll("span");
      for (let j = 0; j < spans.length; j++) {
        if (spans[j].textContent.trim() === selectedFilter) {
          existingElement = true;
          break;
        }
      }
      if (existingElement) {
        return;
      }

      // Ajoute une class pour le tag en fonction du filtre
      let ClassFilter;
      if (parentClass === "ingredients_ul") {
        ClassFilter = "ingredients_li noclose";
      } else if (parentClass === "appareils_ul") {
        ClassFilter = "appareils_li noclose";
      } else {
        ClassFilter = "ustensils_li noclose";
      }
      ElementFilter.setAttribute("class", ClassFilter);

      ElementFilter.innerHTML = `
        ${selectedFilter}
        <button>
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" class="noclose">
            <path class="noclose" d="M12.59 6L10 8.59L7.41 6L6 7.41L8.59 10L6 12.59L7.41 14L10 11.41L12.59 14L14 12.59L11.41 10L14 7.41L12.59 6ZM10 0C4.47 0 0 4.47 0 10C0 15.53 4.47 20 10 20C15.53 20 20 15.53 20 10C20 4.47 15.53 0 10 0ZM10 18C5.59 18 2 14.41 2 10C2 5.59 5.59 2 10 2C14.41 2 18 5.59 18 10C18 14.41 14.41 18 10 18Z" fill="white"></path>
          </svg>
        </button>
      `;
      select.appendChild(ElementFilter);

      // Supprime les filtres créés précédemment
      const buttonSelect = document.querySelectorAll(".select button");
      for (let k = 0; k < buttonSelect.length; k++) {
        const button = buttonSelect[k];
        button.addEventListener("click", () => {
          const spanParent = button.parentNode;
          spanParent.remove();
          ExecutSelect();
        });
      }
      ExecutSelect();
    });
  }
}


function ExecutSelect() {
  //récupère le tag et recherche dans recipes quel recette correspond
  const ingredientsList = document.querySelectorAll(".select .ingredients_li");
  const span_ingedients = [];
  for (let i = 0; i < ingredientsList.length; i++) {
    span_ingedients.push(ingredientsList[i].textContent.toLowerCase().trim());
  }

  const appareilsList = document.querySelectorAll(".select .appareils_li");
  const span_appareils = [];
  for (let i = 0; i < appareilsList.length; i++) {
    span_appareils.push(appareilsList[i].textContent.toLowerCase().trim());
  }

  const ustensilsList = document.querySelectorAll(".select .ustensils_li");
  const span_ustensils = [];
  for (let i = 0; i < ustensilsList.length; i++) {
    span_ustensils.push(ustensilsList[i].textContent.toLowerCase().trim());
  }

  //verifie pour chaque filter les recettes associé
  const search_ingredients = [];
  for (let i = 0; i < recipes.length; i++) {
    const recipe = recipes[i];
    const ingredientMatch = [];
    for (let j = 0; j < span_ingedients.length; j++) {
      const s = span_ingedients[j];
      const ingredient = recipe.ingredients;
      let found = false;
      for (let k = 0; k < ingredient.length; k++) {
        const ing = ingredient[k].ingredient.toLowerCase().trim();
        if (ing.includes(s)) {
          found = true;
          break;
        }
      }
      ingredientMatch.push(found);
    }
    if (ingredientMatch.every(Boolean)) {
      search_ingredients.push(recipe);
    }
  }

  const temp_matches = [];
  for (let i = 0; i < search_ingredients.length; i++) {
    const recipe = search_ingredients[i];
    const applianceMatch = [];
    for (let j = 0; j < span_appareils.length; j++) {
      const s = span_appareils[j];
      const appliance = recipe.appliance.toLowerCase().trim();
      if (appliance.includes(s)) {
        applianceMatch.push(true);
      } else {
        applianceMatch.push(false);
      }
    }
    if (applianceMatch.every(Boolean)) {
      temp_matches.push(recipe);
    }
  }

  const all_matches = [];
  for (let i = 0; i < temp_matches.length; i++) {
    const recipe = temp_matches[i];
    const ustensilsMatch = [];
    for (let j = 0; j < span_ustensils.length; j++) {
      const s = span_ustensils[j];
      const ustensils = recipe.ustensils;
      let found = false;
      for (let k = 0; k < ustensils.length; k++) {
        const ut = ustensils[k].toLowerCase().trim();
        if (ut.includes(s)) {
          found = true;
          break;
        }
      }
      ustensilsMatch.push(found);
    }
    if (ustensilsMatch.every(Boolean)) {
      all_matches.push(recipe);
    }
  }

  localStorage.setItem("all_matches", JSON.stringify(all_matches));

  data_recipes.dataRecipes();
}
