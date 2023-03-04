export function clear() {
    const framework = document.querySelector(".framework");
    const ingredients = document.querySelector(".ingredients_ul");
    const appliance = document.querySelector(".appareils_ul");
    const ustensils = document.querySelector(".ustensils_ul");
  
    framework.innerHTML = "";
    ingredients.innerHTML = "";
    appliance.innerHTML = "";
    ustensils.innerHTML = "";
  }
  
