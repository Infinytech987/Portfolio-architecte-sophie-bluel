document.addEventListener("DOMContentLoaded", () => {
  const authLink = document.getElementById("authLink");
  const editModeBanner = document.getElementById("editModeBanner");
  const categoriesElt = document.getElementById("categories");
  const galleryElt = document.getElementById("gallery");
  const editButton = document.querySelector(".edit-button");

  const categoriesUrl = "http://localhost:5678/api/categories";
  const worksUrl = "http://localhost:5678/api/works";
  let allWorks = [];

  const displayWorks = (works, categoryId = "all") => {
    galleryElt.innerHTML = works
      .filter((work) => categoryId === "all" || work.categoryId === categoryId)
      .map(
        (work) => `
        <figure>
          <img src="${work.imageUrl}" alt="${work.title}" />
          <figcaption>${work.title}</figcaption>
        </figure>`
      )
      .join("");
  };

  const handleCategoryClick = (categoryId) => displayWorks(allWorks, categoryId);

  const displayCategories = (categories) => {
    categoriesElt.innerHTML = `<button>Tous</button>` + categories.map((category) => `<button>${category.name}</button>`).join("");
    categoriesElt.querySelectorAll("button").forEach((btn, i) => btn.addEventListener("click", () => handleCategoryClick(i ? categories[i - 1].id : "all")));
  };

  if (localStorage.getItem("token")) {
    // Utilisateur connecté
    Object.assign(authLink, { textContent: "logout", href: "#", style: { fontWeight: "bold", color: "black", textDecoration: "none" } });
    editModeBanner.style.display = "block";
    galleryElt.style.display = "grid"; // Affiche les travaux
    categoriesElt.style.display = "none"; // Masque les catégories

    if (editButton) {
      editButton.style.display = "inline-block"; // Affiche le bouton "Modifier"
    }

    authLink.addEventListener("click", (e) => {
      e.preventDefault();
      localStorage.removeItem("token");
      window.location.href = "./index.html"; // Redirige vers index.html en mode non connecté
    });

    // Récupérer et afficher les travaux sans afficher les catégories
    fetch(worksUrl)
      .then((res) => (res.ok ? res.json() : Promise.reject("Erreur works")))
      .then((works) => {
        allWorks = works;
        displayWorks(allWorks); // Affiche tous les travaux pour les utilisateurs connectés
      })
      .catch(console.error);
  } else {
    // Utilisateur non connecté
    Object.assign(authLink, { textContent: "login", href: "./login.html", style: { fontWeight: "bold", color: "black", textDecoration: "none" } });
    editModeBanner.style.display = "none";
    galleryElt.style.display = "grid";
    categoriesElt.style.display = "block"; // Affiche les catégories pour les utilisateurs non connectés

    if (editButton) {
      editButton.style.display = "none"; // Cache le bouton "Modifier"
    }

    // Récupérer et afficher les catégories et travaux avec le filtre
    fetch(categoriesUrl)
      .then((res) => (res.ok ? res.json() : Promise.reject("Erreur catégories")))
      .then(displayCategories)
      .catch(console.error);

    fetch(worksUrl)
      .then((res) => (res.ok ? res.json() : Promise.reject("Erreur works")))
      .then((works) => {
        allWorks = works;
        displayWorks(allWorks);
      })
      .catch(console.error);
  }
});
