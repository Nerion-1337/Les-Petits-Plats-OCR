import * as clear from "./clear.js";

const framework = document.querySelector(".framework");

export function failResearch() {
  clear.clear();

  const paragraphe = document.createElement("p");
  paragraphe.setAttribute("class", "error_research");
  paragraphe.textContent =
    "Aucune recette ne correspond à votre critère… vous pouvez chercher « tarte aux pommes », « poisson », etc";

  framework.appendChild(paragraphe);
}
