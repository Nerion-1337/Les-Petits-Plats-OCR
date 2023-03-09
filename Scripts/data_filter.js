class Filter {
  constructor(recipes, property) {
    this.recipes = recipes;
    this.property = property;
  }

  getDistinctValues() {
    let data_value = JSON.parse(localStorage.getItem("data_value"));
    let query = JSON.parse(localStorage.getItem("query"));
    //Set est un object qui va permettre d'éviter les doublons
    const distinctValues = new Set();
    this.recipes.forEach((recipe) => {
      //vérifier si c'est un tableau pour ingredient & ustensil
      if (Array.isArray(recipe[this.property])) {
        recipe[this.property].forEach((value) => {
          if (value.hasOwnProperty("ingredient")) {
            distinctValues.add(value.ingredient.toLowerCase().trim());
          } else {
            distinctValues.add(value.toLowerCase().trim());
          }
        });
        //si ce n'est pas un tableau comme appliance
      } else {
        distinctValues.add(recipe[this.property].toLowerCase().trim());
      }
    });

    // Créer un nouveau Set qui supprime les éléments avec un "s" à la fin
    const filteredValues = new Set(
      Array.from(distinctValues).filter((value) => {
        if (value.endsWith("s")) {
          const singularValue = value.slice(0, -1);
          return !distinctValues.has(singularValue);
        } else {
          return true;
        }
      })
    );

    if (this.property == data_value) {
      return Array.from(filteredValues).filter((value) =>
        value.includes(query)
      );
    } else {
      return Array.from(filteredValues);
    }
  }
}

export default Filter;
