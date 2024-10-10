document.addEventListener("DOMContentLoaded", function () {
  const loginForm = document.querySelector("form");

  // URL de l'API où les informations de connexion doivent être envoyées
  const loginUrl = "https://api.backend.com/login"; // Remplace par l'URL réelle de ton backend

  // Fonction pour envoyer les données du formulaire via une requête POST
  loginForm.addEventListener("submit", function (event) {
    event.preventDefault(); // Empêche l'envoi par défaut du formulaire

    // Récupération des données du formulaire
    const formData = {
      email: document.getElementById("email").value,
      password: document.getElementById("password").value,
    };

    // Vérifier que les champs ne sont pas vides
    if (!formData.email || !formData.password) {
      alert("Veuillez remplir tous les champs.");
      return;
    }

    // Envoi des données via fetch POST
    fetch(loginUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json", // Les données sont envoyées au format JSON
      },
      body: JSON.stringify(formData), // Convertit les données en JSON
    })
      .then((response) => {
        if (response.ok) {
          return response.json(); // Si la requête réussit, traiter la réponse
        } else {
          throw new Error("Une erreur est survenue lors de la connexion.");
        }
      })
      .then((data) => {
        // Gérer la réponse réussie du serveur ici
        console.log("Connexion réussie", data);
        alert("Connexion réussie");
        // Redirection après la connexion réussie
        window.location.href = "./index.html"; // Rediriger vers la page d'accueil
      })
      .catch((error) => {
        // Gérer les erreurs ici
        console.error("Erreur:", error);
        alert("Email ou mot de passe incorrect. Veuillez réessayer.");
      });
  });
});
