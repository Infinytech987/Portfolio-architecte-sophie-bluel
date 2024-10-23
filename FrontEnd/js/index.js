document.addEventListener("DOMContentLoaded", function () {
  // Ciblage des éléments nécessaires
  const authLink = document.getElementById("authLink");
  const editModeBanner = document.getElementById("editModeBanner");
  const categoriesElt = document.getElementById("categories");
  const galleryElt = document.getElementById("gallery");

  // Vérification des éléments requis
  if (!authLink || !editModeBanner || !categoriesElt || !galleryElt) {
    console.error("Erreur : certains éléments nécessaires ne sont pas disponibles dans le DOM.");
    return;
  }

  // URLs du backend pour les catégories et les works
  const categoriesUrl = "http://localhost:5678/api/categories";
  const worksUrl = "http://localhost:5678/api/works";

  let allWorks = []; // Pour stocker tous les works récupérés

  // Fonction pour afficher les works
  function displayWorks(works, categoryId = "all") {
    galleryElt.innerHTML = ""; // On vide le conteneur des works
    works.forEach((work) => {
      if (categoryId === "all" || work.categoryId === categoryId) {
        const figure = document.createElement("figure");
        const img = document.createElement("img");
        img.src = work.imageUrl;
        img.alt = work.title;

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
    });
  }

  // Vérifie si l'utilisateur est connecté (présence d'un token dans localStorage)
  if (localStorage.getItem("token")) {
    // Si l'utilisateur est connecté
    authLink.textContent = "logout";
    authLink.href = "#";
    authLink.style.fontWeight = "bold";
    authLink.style.color = "black";
    authLink.style.textDecoration = "none";

    // Afficher la bannière "Mode édition"
    editModeBanner.style.display = "block";

    // Cacher les works et le filtre des catégories
    galleryElt.style.display = "none";
    categoriesElt.style.display = "none";

    // Gérer la déconnexion
    authLink.addEventListener("click", function (e) {
      e.preventDefault();
      localStorage.removeItem("token");
      window.location.href = "./login.html";
    });
  } else {
    // Si l'utilisateur n'est pas connecté
    authLink.textContent = "login";
    authLink.href = "./login.html";
    authLink.style.fontWeight = "bold";
    authLink.style.color = "black";
    authLink.style.textDecoration = "none";

    // Cacher la bannière "Mode édition"
    editModeBanner.style.display = "none";

    // Afficher les catégories et les works
    galleryElt.style.display = "grid";
    categoriesElt.style.display = "block";

    // Fetch des catégories
    fetch(categoriesUrl)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Erreur lors de la récupération des catégories");
        }
        return response.json();
      })
      .then((categories) => {
        displayCategories(categories);
      })
      .catch((error) => {
        console.error("Erreur lors de la récupération des catégories:", error);
      });

    // Fetch des works
    fetch(worksUrl)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Erreur lors de la récupération des works");
        }
        return response.json();
      })
      .then((works) => {
        allWorks = works; // Stocker toutes les works récupérées
        displayWorks(allWorks); // Afficher les works
      })
      .catch((error) => {
        console.error("Erreur lors de la récupération des works:", error);
      });
  }
});
