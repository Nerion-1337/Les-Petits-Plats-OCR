class Article_Recipe {
  constructor(recipe) {
    this.recipe = recipe;
  }

  createArticle_Recipe() {
    const article = document.createElement("article");
    const ul = document.createElement("ul");
    const uniqueIngredients = [];

 

    // Parcourir le tableau de recettes
    this.recipe.ingredients.forEach((ingredient) => {
        // Vérifier si l'ingrédient est déjà présent dans le tableau unique
        const existingIngredient = uniqueIngredients.find(
          (item) => item.ingredient === ingredient.ingredient
        );
        if (existingIngredient) {
          // Si l'ingrédient existe déjà, mettre à jour la quantité et l'unité s'il y en a une
          if (ingredient.quantity) {
            existingIngredient.quantity += ingredient.quantity;
          }
          if (ingredient.unit && !existingIngredient.unit) {
            existingIngredient.unit = ingredient.unit;
          }
        } else {
          // Si l'ingrédient n'existe pas encore, l'ajouter au tableau unique
          uniqueIngredients.push({
            ingredient: ingredient.ingredient,
            quantity: ingredient.quantity || "X",
            unit: ingredient.unit || "",
          });
        }
      });


    // Créer la liste HTML des ingrédients uniques
    uniqueIngredients.forEach((ingredient) => {
      const li = document.createElement("li");
      const span = document.createElement("span");
      span.textContent = `${ingredient.ingredient}: `;
      li.textContent = `${ingredient.quantity} ${ingredient.unit}`;
      li.insertBefore(span, li.firstChild);
      ul.appendChild(li);
    });

    const article_recipe = `
        <figure>
        <img
          src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1 1'%3E%3C/svg%3E"
          alt="image plat"
        />
        <figcaption>
          <div class="title">
            <h2>${this.recipe.name}</h2>
            <p>
              <svg
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                class="clock-svg"
              >
                <path
                  d="M10 0C4.5 0 0 4.5 0 10C0 15.5 4.5 20 10 20C15.5 20 20 15.5 20 10C20 4.5 15.5 0 10 0ZM10 18C5.59 18 2 14.41 2 10C2 5.59 5.59 2 10 2C14.41 2 18 5.59 18 10C18 14.41 14.41 18 10 18ZM10.5 5H9V11L14.2 14.2L15 12.9L10.5 10.2V5Z"
                  fill="black"
                ></path></svg
              >${this.recipe.time}min
            </p>
          </div>
          <div class="description">
          <ul>
          ${ul.innerHTML}
          </ul>
            <p> ${this.recipe.description} </p>
          </div>
        </figcaption>
      </figure>
        `;

    article.innerHTML = article_recipe;
    return article;
  }
}

export default Article_Recipe;