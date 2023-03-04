class Filter {
    constructor(recipes, property) {
      this.recipes = recipes;
      this.property = property;
    }
  
    getDistinctValues() {
        const distinctValues = new Set();
        this.recipes.forEach(recipe => {

          if (Array.isArray(recipe[this.property])) {
            recipe[this.property].forEach(value => {

              if (value.hasOwnProperty('ingredient')) {
                distinctValues.add(value.ingredient.toLowerCase().trim());

              } else {
                distinctValues.add(value.toLowerCase().trim());
              }
            });

          } else {
            distinctValues.add(recipe[this.property].toLowerCase().trim());
          }
        });
        return Array.from(distinctValues);
      }
    }

    export default Filter;