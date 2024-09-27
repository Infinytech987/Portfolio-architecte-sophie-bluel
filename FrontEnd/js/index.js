document.addEventListener("DOMContentLoaded", function () {
  const categoriesContainer = document.getElementById("categories-container");
  const worksContainer = document.getElementById("works-container");

  // URLs du backend pour les catégories et les works
  const categoriesUrl = "http://localhost:5678/api/categories"; // Remplace par l'URL réelle des catégories
  const worksUrl = "http://localhost:5678/api/works"; // Remplace par l'URL réelle des works

  // Fonction pour afficher les catégories (chaque catégorie aura une section dans la galerie)
  function displayCategories(categories) {
    categories.forEach((category) => {
      // Créer un conteneur pour chaque catégorie
      const categoryDiv = document.createElement("div");
      categoryDiv.classList.add("category");
      const categoryTitle = document.createElement("h3");
      categoryTitle.textContent = category.name;
      categoryDiv.appendChild(categoryTitle);
      categoriesContainer.appendChild(categoryDiv);
    });
  }

  // Fonction pour afficher les œuvres
  function displayWorks(works) {
    works.forEach((work) => {
      // Créer une figure pour chaque œuvre
      const figure = document.createElement("figure");
      const img = document.createElement("img");
      img.src = work.imageUrl; // Assure-toi que l'API retourne une propriété 'imageUrl' pour les images
      img.alt = work.title; // Assure-toi que l'API retourne une propriété 'title'
      const figcaption = document.createElement("figcaption");
      figcaption.textContent = work.title;

      figure.appendChild(img);
      figure.appendChild(figcaption);
      worksContainer.appendChild(figure);
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
      displayWorks(works);
    })
    .catch((error) => {
      console.error("Erreur lors de la récupération des œuvres:", error);
    });
});
