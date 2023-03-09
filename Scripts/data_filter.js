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

    // Créer un nouvel ensemble qui stocke les valeurs qui ont un "s" à la fin et qui ont une forme singulière correspondante (en enlevant le "s")
    const singularValues = new Set();
    for (let value of distinctValues) {
      if (value.endsWith("s")) {
        const singularValue = value.slice(0, -1);
        singularValues.add(singularValue);
      }
    }

    // Créer un nouvel ensemble qui stocke les valeurs filtrées
    const filteredValues = new Set();
    for (let value of distinctValues) {
      if (singularValues.has(value.slice(0, -1))) {
        continue; // Si la forme singulière est présente dans singularValues, ne pas ajouter la valeur à filteredValues
      }

      if (this.property === data_value && !value.includes(query)) {
        continue; // Si la valeur ne contient pas la chaîne de recherche, ne pas l'ajouter à filteredValues
      }

      filteredValues.add(value);
    }

    return Array.from(filteredValues);
  }
}

export default Filter;
