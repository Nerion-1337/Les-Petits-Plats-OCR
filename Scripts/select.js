import { recipes } from "../Data/recipes.js";
import * as data_recipes from "./data_recipes.js";
import data_filter from "./data_filter.js";
import Article_Recipe from "./article_recipes.js";
import List_Filter from "./list_filter.js";
import * as select from "./select.js";
import * as App from "./App.js";
import * as search_recipes from "./search_recipes.js";
import * as search_filter from "./search_filter.js";

//Création des filtres au click
export function blockSelect() {
  const select = document.querySelector(".select");
  const selectLI = document.querySelectorAll(".select_filter li");

  selectLI.forEach((li) => {
    li.addEventListener("click", () => {
      const parentClass = li.parentElement.classList[0];
      const selectedFilter = li.textContent.trim();
      const ElementFilter = document.createElement("span");

    // Vérifie si un élément similaire existe déjà
    const existingElement = Array.from(select.querySelectorAll("span")).some((span) => span.textContent.trim() === selectedFilter);
    if (existingElement) {
      return;
    }

      if (parentClass == "ingredients_ul") {
        const ClassBlue = "ingredients_li noclose";
        ElementFilter.setAttribute("class", ClassBlue);
      } else if (parentClass == "appareils_ul noclose") {
        const ClassVert = "appareils_li";
        ElementFilter.setAttribute("class", ClassVert);
      } else {
        const ClassOrange = "ustensils_li noclose";
        ElementFilter.setAttribute("class", ClassOrange);
      }

      ElementFilter.innerHTML = `
        ${selectedFilter}
        <button >
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" class="noclose">
            <path class="noclose" d="M12.59 6L10 8.59L7.41 6L6 7.41L8.59 10L6 12.59L7.41 14L10 11.41L12.59 14L14 12.59L11.41 10L14 7.41L12.59 6ZM10 0C4.47 0 0 4.47 0 10C0 15.53 4.47 20 10 20C15.53 20 20 15.53 20 10C20 4.47 15.53 0 10 0ZM10 18C5.59 18 2 14.41 2 10C2 5.59 5.59 2 10 2C14.41 2 18 5.59 18 10C18 14.41 14.41 18 10 18Z" fill="white"></path>
          </svg>
        </button>
      `;
      select.appendChild(ElementFilter);

      //Supprime les filtre créer précédemment
      const buttonSelect = document.querySelectorAll(".select button");

      buttonSelect.forEach((button) => {
        button.addEventListener("click", () => {
          const spanParent = button.parentNode;
          spanParent.remove();
          ExecutSelect();
        });
      });
      ExecutSelect();
    });
  });
}

function ExecutSelect() {

  //récupère le tag et recherche dans recipes quel recette correspond
  const span_ingedients = Array.from(
    document.querySelectorAll(".select .ingredients_li")
  ).map((span) => span.textContent.toLowerCase().trim());
  const span_appareils = Array.from(
    document.querySelectorAll(".select .appareils_li")
  ).map((span) => span.textContent.toLowerCase().trim());
  const span_ustensils = Array.from(
    document.querySelectorAll(".select .ustensils_li")
  ).map((span) => span.textContent.toLowerCase().trim());

  //verifie pour chaque filter les recettes associé
  const search_ingredients = recipes.filter((recipe) => {
    const ingredientMatch = span_ingedients.every((s) =>
      recipe.ingredients.some((ingredient) =>
        ingredient.ingredient.toLowerCase().trim().includes(s)
      )
    );
    return ingredientMatch;
  });
  const temp_matches = search_ingredients.filter((recipe) => {
    const applianceMatch = span_appareils.every((s) =>
      recipe.appliance.toLowerCase().trim().includes(s)
    );
    return applianceMatch;
  });
  const all_matches = temp_matches.filter((recipe) => {
    const ustensilsMatch = span_ustensils.every((s) =>
      recipe.ustensils.some((ustensil) =>
        ustensil.toLowerCase().trim().includes(s)
      )
    );
    return ustensilsMatch;
  });

  localStorage.setItem("all_matches", JSON.stringify(all_matches));

  data_recipes.dataRecipes();
}
