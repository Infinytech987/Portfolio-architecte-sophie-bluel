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
