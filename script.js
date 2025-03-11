console.log("Kanban JS loaded...");

window.addEventListener("DOMContentLoaded", () => {
  // Récupérer les colonnes et les cartes
  const allColumns = document.querySelectorAll(".column");
  const allCards = document.querySelectorAll(".card");

  // Faire en sorte que les cartes soient draggables
  allCards.forEach(card => {
    card.setAttribute("draggable", "true");  // Rendre chaque carte draggable
  });

  // Fonction pour gérer le début du drag
  allCards.forEach(card => {
    card.addEventListener("dragstart", (e) => {
      // On enregistre l'élément qui est en train d'être déplacé
      e.dataTransfer.setData("text/plain", e.target.dataset.id);
      e.target.style.opacity = "1";  // Effet visuel pendant le drag
    });

    // Réinitialiser l'opacité lorsque l'élément est relâché ou abandonné
    card.addEventListener("dragend", (e) => {
      e.target.style.opacity = "1";  // Rétablir l'opacité
    });
  });

  // Ajouter des événements aux colonnes pour accepter les cartes glissées
  allColumns.forEach(column => {
    column.addEventListener("dragover", (e) => {
      e.preventDefault(); // Cela permet de faire un drop
    });

    column.addEventListener("dragenter", (e) => {
      // Ajouter une classe visuelle pour indiquer que l'élément peut être déposé
      column.classList.add("drag-over");
    });

    column.addEventListener("dragleave", (e) => {
      // Retirer la classe visuelle
      column.classList.remove("drag-over");
    });

    column.addEventListener("drop", (e) => {
      e.preventDefault();  // Empêche le comportement par défaut

      // Récupérer l'ID de la carte déplacée
      const cardId = e.dataTransfer.getData("text/plain");
      const card = document.querySelector(`[data-id='${cardId}']`);

      // Ajouter la carte à la colonne cible
      column.appendChild(card);

      // Mettre à jour le statut de la carte (la colonne dans laquelle elle se trouve)
      const newStatus = column.getAttribute("data-status");
      card.setAttribute("data-status", newStatus);

      // Supprimer la classe visuelle de dragover
      column.classList.remove("drag-over");
    });
  });
});

console.log("Kanban JS loaded...");
//
document.getElementById('addCardBtn').addEventListener('click', function() {

    //Récupérer les infos 
    const titre = prompt("Titre de la carte :");
    if (!titre) return;

    const contenu = prompt("Contenu de la carte :");
    if (!contenu) return;

    const priorite = prompt("Priorité de la carte (haute, moyenne, basse) :", "basse");
    const prioritesValides = ['haute', 'moyenne', 'basse'];
    const prioriteFinale = prioritesValides.includes(priorite) ? priorite : 'basse';

    const colonneAFaire = document.querySelector('.column[data-status="todo"]');

    //Creer la carte 

    const nouvelleCarte = document.createElement('div');
    nouvelleCarte.classList.add('card');
    nouvelleCarte.setAttribute('data-priority', prioriteFinale);

    const nouveauTitre = document.createElement('h3');
    nouveauTitre.textContent = titre;

    const nouveauContenu = document.createElement('p');
    nouveauContenu.textContent = contenu;

    const boutonSupprimer = document.createElement('button');
    boutonSupprimer.textContent = 'Supprimer';
    boutonSupprimer.addEventListener('click', function() {
        nouvelleCarte.remove();
    });

    nouvelleCarte.appendChild(nouveauTitre);
    nouvelleCarte.appendChild(nouveauContenu);
    nouvelleCarte.appendChild(boutonSupprimer);

    colonneAFaire.appendChild(nouvelleCarte);
});



