class Filter {
  constructor(recipes, property) {
    this.recipes = recipes;
    this.property = property;
  }

  getDistinctValues() {
    let data_value = JSON.parse(localStorage.getItem("data_value"));
    let query = JSON.parse(localStorage.getItem("query"));
    const distinctValues = new Set();

    for (let i = 0; i < this.recipes.length; i++) {
      const recipe = this.recipes[i];

      if (Array.isArray(recipe[this.property])) {
        for (let j = 0; j < recipe[this.property].length; j++) {
          const value = recipe[this.property][j];

          if (value.hasOwnProperty("ingredient")) {
            const ingredient = value.ingredient.toLowerCase().trim();
            distinctValues.add(ingredient);
          } else {
            const ustensil = value.toLowerCase().trim();
            distinctValues.add(ustensil);
          }
        }
      } else {
        const appliance = recipe[this.property].toLowerCase().trim();
        distinctValues.add(appliance);
      }
    }

     // Créer un nouveau Set qui supprime les éléments avec un "s" à la fin
    const filteredValues = new Set();

    for (let value of distinctValues) {
      if (value.endsWith("s")) {
        const singularValue = value.slice(0, -1);
        if (!distinctValues.has(singularValue)) {
          filteredValues.add(value);
        }
      } else {
        filteredValues.add(value);
      }
    }  

    if (this.property == data_value) {
      const matchingValues = [];
      for (let value of filteredValues) {
        if (value.includes(query)) {
          matchingValues.push(value);
        }
      }
      return matchingValues;
    } else {
      return Array.from(filteredValues);
    }
  }
}

export default Filter;
