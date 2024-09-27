fetch("http://localhost:5678/api/categories/")
  .then((response) => {
    if (!response.ok) {
      throw new Error("Network response was not ok " + response.statusText);
    }
    return response.json(); // ou response.text() si c'est du texte
  })
  .then((categories) => {
    console.log(categories); // Affiche les données récupérées
  })
  .catch((error) => {
    console.error("There was a problem with the fetch operation:", error);
  });

fetch("http://localhost:5678/api/works/")
  .then((response) => {
    if (!response.ok) {
      throw new Error("Network response was not ok " + response.statusText);
    }
    return response.json(); // ou response.text() si le retour est en texte
  })
  .then((data) => {
    const works = data.works; // Assumons que les "works" se trouvent dans cette propriété
    if (Array.isArray(works)) {
      works.forEach((work) => {
        // Logique pour traiter chaque "work"
        console.log("Work:", work);
      });
    } else {
      console.log("No works found");
    }
  })
  .catch((error) => {
    console.error("There was a problem with the fetch operation:", error);
  });

// Js pour les filtres
function filterItems(category) {
  var items = document.getElementsByClassName("item");

  // Affiche ou cache les éléments en fonction du filtre
  for (let i = 0; i < items.length; i++) {
    if (category === "all") {
      items[i].style.display = "block";
    } else {
      if (items[i].classList.contains(category)) {
        items[i].style.display = "block";
      } else {
        items[i].style.display = "none";
      }
    }
  }
}

// Affiche tout au début
filterItems("all");
// Tableau contenant les informations des projets
const projects = [
  {
    image: "assets/images/abajour-tahina.png",
    alt: "Abajour Tahina",
    caption: "Abajour Tahina",
  },
  {
    image: "assets/images/appartement-paris-v.png",
    alt: "Appartement Paris V",
    caption: "Appartement Paris V",
  },
  {
    image: "assets/images/restaurant-sushisen-londres.png",
    alt: "Restaurant Sushisen - Londres",
    caption: "Restaurant Sushisen - Londres",
  },
  {
    image: "assets/images/la-balisiere.png",
    alt: "Villa “La Balisiere” - Port Louis",
    caption: "Villa “La Balisiere” - Port Louis",
  },
  {
    image: "assets/images/structures-thermopolis.png",
    alt: "Structures Thermopolis",
    caption: "Structures Thermopolis",
  },
  {
    image: "assets/images/appartement-paris-x.png",
    alt: "Appartement Paris X",
    caption: "Appartement Paris X",
  },
  {
    image: "assets/images/le-coteau-cassis.png",
    alt: "Pavillon “Le coteau” - Cassis",
    caption: "Pavillon “Le coteau” - Cassis",
  },
  {
    image: "assets/images/villa-ferneze.png",
    alt: "Villa Ferneze - Isola d’Elba",
    caption: "Villa Ferneze - Isola d’Elba",
  },
  {
    image: "assets/images/appartement-paris-xviii.png",
    alt: "Appartement Paris XVIII",
    caption: "Appartement Paris XVIII",
  },
  {
    image: "assets/images/bar-lullaby-paris.png",
    alt: "Bar “Lullaby” - Paris",
    caption: "Bar “Lullaby” - Paris",
  },
  {
    image: "assets/images/hotel-first-arte-new-delhi.png",
    alt: "Hotel First Arte - New Delhi",
    caption: "Hotel First Arte - New Delhi",
  },
];

// Fonction pour afficher dynamiquement les projets
function displayProjects(projects) {
  const gallery = document.querySelector(".gallery");

  // Boucle sur chaque projet
  projects.forEach((project) => {
    // Création de l'élément figure
    const figure = document.createElement("figure");

    // Création de l'élément img
    const img = document.createElement("img");
    img.src = project.image;
    img.alt = project.alt;

    // Création de l'élément figcaption
    const figcaption = document.createElement("figcaption");
    figcaption.textContent = project.caption;

    // Ajouter img et figcaption à figure
    figure.appendChild(img);
    figure.appendChild(figcaption);

    // Ajouter figure à la galerie
    gallery.appendChild(figure);
  });
}

// Récupérer les données des projets depuis un fichier JSON
function fetchProjects() {
  fetch("assets/data/works.json") // Chemin vers le fichier JSON
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok " + response.statusText);
      }
      return response.json();
    })
    .then((data) => {
      displayProjects(data); // Appel de la fonction pour générer et afficher les projets
    })
    .catch((error) => {
      console.error("Il y a eu un problème avec la requête fetch:", error);
    });
}

// Appel de la fonction lorsque la page est chargée
document.addEventListener("DOMContentLoaded", fetchProjects);
