import { recipes } from "../Data/recipes.js";
import * as data_recipes from "./data_recipes.js";
import data_filter from "./data_filter.js";
import Article_Recipe from "./article_recipes.js";
import List_Filter from "./list_filter.js";
import * as select from "./select.js";

const input_filter = document.querySelectorAll(".input_filter");
const select_bloc = document.querySelectorAll(".select_bloc");
const label = document.querySelectorAll("label");

//Interaction avec balise filtre
select_bloc.forEach((bloc) => {
  bloc.addEventListener("mouseover", () => {
    const inputLabel = bloc.querySelector("label");
    const input = bloc.querySelector("input");
    input.type = "text";
    input.value = "";
    inputLabel.classList.add("active");
    bloc.classList.add("active");

    bloc.addEventListener("mouseout", () => {
      input.value = input.getAttribute("data-value");
      input.type = "button";
      inputLabel.classList.remove("active");
      bloc.classList.remove("active");
    });
  });
});


const framework = document.querySelector(".framework");

//Permet d'afficher les articles
export function main(data_recipes) {
  data_recipes.forEach((recipe) => {
    const Template = new Article_Recipe(recipe);
    framework.appendChild(Template.createArticle_Recipe());
  });
}


//Permet d'afficher les filtres par catégorie
export function trie(selector, data_recipes, data_value) {
  const ingredients = document.querySelector(".ingredients_ul");
  const appliance = document.querySelector(".appareils_ul");
  const ustensils = document.querySelector(".ustensils_ul");


  if (data_value == null) {
  const Data = new data_filter(data_recipes, selector);
  const dataFilter = Data.getDistinctValues();
  dataFilter.forEach((filter) => {
    const Template = new List_Filter(filter);
    if (selector == "ingredients") {
      ingredients.appendChild(Template.createList_filter());
    } else if (selector == "appliance") {
      appliance.appendChild(Template.createList_filter());
    } else {
      ustensils.appendChild(Template.createList_filter());
    }
  });
  } else{
    data_recipes.forEach((filter) => {
      const Template = new List_Filter(filter);
      if (selector == "ingredients") {
        ingredients.appendChild(Template.createList_filter());
      } else if (selector == "appliance") {
        appliance.appendChild(Template.createList_filter());
      } else {
        ustensils.appendChild(Template.createList_filter());
      }
    });

  }
  select.blockSelect();
}
