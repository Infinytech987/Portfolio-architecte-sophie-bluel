document.addEventListener("DOMContentLoaded", function () {
  const categoriesContainer = document.getElementById("categories-container");
  const worksContainer = document.createElement("div");
  worksContainer.classList.add("gallery");
  categoriesContainer.appendChild(worksContainer);

  // URLs du backend pour les catégories et les œuvres
  const categoriesUrl = "http://localhost:5678/api/categories";
  const worksUrl = "http://localhost:5678/api/works";

  let categoriesMap = {}; // Dictionnaire pour stocker les galeries par ID de catégorie
  let allWorks = []; // Pour stocker toutes les œuvres récupérées
  let activeCategory = "all"; // Catégorie actuellement affichée (par défaut "Tous")

  // Fonction pour afficher toutes les œuvres
  function displayWorks(works, categoryId = "all") {
    worksContainer.innerHTML = ""; // On vide le conteneur des œuvres
    works.forEach((work) => {
      if (categoryId === "all" || work.categoryId === categoryId) {
        const figure = document.createElement("figure");
        const img = document.createElement("img");
        img.src = work.imageUrl; // Assure-toi que l'API retourne une propriété 'imageUrl'
        img.alt = work.title; // Assure-toi que l'API retourne une propriété 'title'
        const figcaption = document.createElement("figcaption");
        figcaption.textContent = work.title;

        figure.appendChild(img);
        figure.appendChild(figcaption);
        worksContainer.appendChild(figure);
      }
    });
  }

  // Fonction pour gérer l'affichage de la catégorie sélectionnée
  function handleCategoryClick(categoryId) {
    activeCategory = categoryId;
    displayWorks(allWorks, categoryId);
  }

  // Fonction pour afficher les catégories
  function displayCategories(categories) {
    // Ajouter une catégorie "Tous"
    const allCategoryBtn = document.createElement("button");
    allCategoryBtn.textContent = "Tous";
    allCategoryBtn.addEventListener("click", () => handleCategoryClick("all"));
    categoriesContainer.insertBefore(allCategoryBtn, worksContainer);

    // Afficher les autres catégories
    categories.forEach((category) => {
      const categoryBtn = document.createElement("button");
      categoryBtn.textContent = category.name;
      categoryBtn.addEventListener("click", () => handleCategoryClick(category.id));
      categoriesContainer.insertBefore(categoryBtn, worksContainer);

      // Sauvegarder la référence à la galerie de la catégorie
      categoriesMap[category.id] = [];
    });
  }

  // Fetch des catégories
  fetch(categoriesUrl)
    .then((response) => response.json())
    .then((categories) => {
      displayCategories(categories);
    })
    .catch((error) => {
      console.error("Erreur lors de la récupération des catégories:", error);
    });

  // Fetch des œuvres
  fetch(worksUrl)
    .then((response) => response.json())
    .then((works) => {
      allWorks = works; // Stocker toutes les œuvres récupérées
      displayWorks(allWorks); // Par défaut, on affiche toutes les œuvres
    })
    .catch((error) => {
      console.error("Erreur lors de la récupération des œuvres:", error);
    });
});
