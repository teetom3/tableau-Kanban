console.log("Kanban JS loaded...");

window.addEventListener("DOMContentLoaded", () => {
  // Attache l'événement au bouton de tri par priorité
  const sortByPriorityBtn = document.getElementById("sortByPriorityBtn");
  sortByPriorityBtn.addEventListener("click", async () => {
    await sortCardsByPriority();
  });
});

async function sortCardsByPriority() {
  console.log("Tri des cartes par priorité lancé...");

  // Récupérer toutes les colonnes
  const columns = document.querySelectorAll('.column');

  // Fonction de tri des cartes par priorité
  function sortCards(cards) {
    return Array.from(cards).sort((cardA, cardB) => {
      const priorityA = cardA.getAttribute('data-priority');
      const priorityB = cardB.getAttribute('data-priority');

      const priorityOrder = {
        high: 1,
        medium: 2,
        low: 3
      };

      return priorityOrder[priorityA] - priorityOrder[priorityB];
    });
  }

  // Fonction pour réorganiser les cartes dans leurs colonnes respectives
  for (let column of columns) {
    // Sélectionner toutes les cartes de la colonne
    const cardsInColumn = column.querySelectorAll('.card');
    
    // Trier les cartes par priorité
    const sortedCards = sortCards(cardsInColumn);

    // Réorganiser les cartes dans la colonne
    for (let card of sortedCards) {
      column.appendChild(card);  // Réinsérer la carte après tri
    }
  }

  console.log("Cartes triées par priorité avec succès.");
}
