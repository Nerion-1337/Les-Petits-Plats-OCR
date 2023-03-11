import { recipes } from "../Data/recipes.js";
import data_filter from "./data_filter.js";
import Article_Recipe from "./article_recipes.js";
import List_Filter from "./list_filter.js";
import * as data_recipes from "./data_recipes.js";

const select_bloc = document.querySelectorAll(".select_bloc");

//Interaction avec balise filtre
for(const bloc of select_bloc){
  bloc.addEventListener("click", (e) => {
    const inputLabel = bloc.querySelector("label");
    const input = bloc.querySelector("input");
    //Permet d'éviter de réactualiser le form à chaque click dans le bloc
    if (!bloc.classList.contains("active")) {
      input.type = "text";
      input.value = "";
      inputLabel.classList.add("active");
      bloc.classList.add("active");
      const formUL = bloc.querySelector("ul");
      const ulLI = formUL.querySelectorAll("li");
    }

    document.addEventListener("click", (e) => {
      //Permet d'identifier si le click est effectué en dehort du bloc selectionné
      if (!bloc.contains(e.target) && !e.target.classList.contains("noclose")) {
        input.value = input.getAttribute("data-value");
        input.type = "button";
        inputLabel.classList.remove("active");
        bloc.classList.remove("active");
        localStorage.removeItem("data_value");
        localStorage.removeItem("query");
        data_recipes.dataRecipes();
      }
    });
  });
};

const framework = document.querySelector(".framework");

//Permet d'afficher les articles
export function main(data_recipes) {
  for (const recipe of data_recipes) {
    const Template = new Article_Recipe(recipe);
    framework.appendChild(Template.createArticle_Recipe());
  }
}

//Permet d'afficher les filtres par catégorie
export function trie(selector, data_recipes) {
  const ingredients = document.querySelector(".ingredients_ul");
  const appliance = document.querySelector(".appareils_ul");
  const ustensils = document.querySelector(".ustensils_ul");

  const Data = new data_filter(data_recipes, selector);
  const dataFilter = Data.getDistinctValues();
  for(const filter of dataFilter){
    const Template = new List_Filter(filter);
    if (selector == "ingredients") {
      ingredients.appendChild(Template.createList_filter());
    } else if (selector == "appliance") {
      appliance.appendChild(Template.createList_filter());
    } else {
      ustensils.appendChild(Template.createList_filter());
    }
  };
}
