console.log("Kanban JS loaded...");

function drag_drop () {
    // Récupérer les colonnes et les cartes
    const colonnes = document.querySelectorAll(".column");
    // Fonction pour rendre toutes les cartes draggable
    const makeCardsDraggable = () => {
    const cartes = document.querySelectorAll(".card");  // Rechercher toutes les cartes à chaque fois
    cartes.forEach(carte => {
        carte.setAttribute("draggable", "true");  // Rendre chaque carte draggable

        // Ajouter l'événement dragstart pour chaque carte
        carte.addEventListener("dragstart", (e) => {
        e.dataTransfer.setData("text/plain", e.target.id);  // Utilisez l'ID de la carte pour récupérer plus facilement
        e.target.style.opacity = "0.5";  // Effet visuel pendant le drag
        });

        // Réinitialiser l'opacité lorsque l'élément est relâché ou abandonné
        carte.addEventListener("dragend", (e) => {  
        e.target.style.opacity = "1";  // Rétablir l'opacité après le drag
        });
    });
    };

    // Initialiser les cartes au chargement de la page
    makeCardsDraggable();

    // Ajouter des événements aux colonnes pour accepter les cartes glissées
    colonnes.forEach(colonne => {
    colonne.addEventListener("dragover", (e) => {
        e.preventDefault(); // Cela permet de faire un drop
    });

    colonne.addEventListener("dragenter", (e) => {
        // Ajouter une classe visuelle pour indiquer que l'élément peut être déposé
        colonne.classList.add("drag-over");
    });

    colonne.addEventListener("dragleave", (e) => {
        // Retirer la classe visuelle
        colonne.classList.remove("drag-over");
    });

    colonne.addEventListener("drop", (e) => {
        e.preventDefault();  // Empêche le comportement par défaut (soulève l'événement de drop)

        // Récupérer l'ID de la carte déplacée
        const carteId = e.dataTransfer.getData("text/plain");
        const carte = document.getElementById(carteId);  // Utilisez `getElementById` pour récupérer la carte

        // Vérifier si la carte existe avant de la déplacer
        if (carte) {
        // Ajouter la carte à la colonne cible
        colonne.appendChild(carte);

        // Mettre à jour le statut de la carte (la colonne dans laquelle elle se trouve)
        const nouveauStatus = colonne.getAttribute("data-status");  // Utiliser `colonne` ici
        carte.setAttribute("data-status", nouveauStatus);  // Mettre à jour l'attribut de statut

        // Sauvegarder la mise à jour dans le localStorage
        let cartes = JSON.parse(localStorage.getItem("cartes")) || [];
        const carteIndex = cartes.findIndex(c => c.id === parseInt(carte.id));
        if (carteIndex !== -1) {
            cartes[carteIndex].statut = nouveauStatus;
            localStorage.setItem("cartes", JSON.stringify(cartes));
        }
        }

        // Supprimer la classe visuelle de dragover
        colonne.classList.remove("drag-over");
    });
});
};