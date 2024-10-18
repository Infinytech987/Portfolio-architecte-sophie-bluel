document.addEventListener("DOMContentLoaded", function () {
  const categoriesContainer = document.getElementById("categories-container");
  const categoriesElt = document.getElementById("categories");
  const galleryElt = document.getElementById("gallery");
  console.log(categories, gallery);

  // URLs du backend pour les catégories et les works
  const categoriesUrl = "http://localhost:5678/api/categories";
  const worksUrl = "http://localhost:5678/api/works";

  let categoriesMap = {}; // Dictionnaire pour stocker les galeries par ID de catégorie
  let allWorks = []; // Pour stocker tous les works récupérés
  let activeCategory = "all"; // Catégorie actuellement affichée (par défaut "Tous")

  // Fonction pour afficher tous les works
  function displayWorks(works, categoryId = "all") {
    galleryElt.innerHTML = ""; // On vide le conteneur des works
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
        galleryElt.appendChild(figure);
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
    categoriesElt.appendChild(allCategoryBtn);

    // Afficher les autres catégories
    categories.forEach((category) => {
      const categoryBtn = document.createElement("button");
      categoryBtn.textContent = category.name;
      categoryBtn.addEventListener("click", () => handleCategoryClick(category.id));
      categoriesElt.appendChild(categoryBtn);
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

  // Fetch des works
  fetch(worksUrl)
    .then((response) => response.json())
    .then((works) => {
      allWorks = works; // Stocker toutes les works récupérées
      displayWorks(allWorks); // Par défaut, on affiche toutes les works
    })
    .catch((error) => {
      console.error("Erreur lors de la récupération des works:", error);
    });
});
// Bouton Login/Logout //
document.getElementById("authButton").addEventListener("click", function () {
  var button = document.getElementById("authButton");

  if (button.textContent === "Login") {
    // Logique de connexion ici (par exemple, une requête pour vérifier les identifiants)
    console.log("Connexion réussie");

    // Changer le texte du bouton en 'Logout'
    button.textContent = "Logout";
  } else {
    // Logique de déconnexion ici
    console.log("Déconnexion réussie");

    // Changer le texte du bouton en 'Login'
    button.textContent = "Login";
  }
});
