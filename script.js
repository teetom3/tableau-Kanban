console.log("Kanban JS loaded...");

window.addEventListener("DOMContentLoaded", () => {
  // Appel de la fonction asynchrone pour effectuer le tri des cartes
  initKanban();
});

async function initKanban() {
  // Récupérer toutes les cartes
  const allCards = document.querySelectorAll(".card");

  // Fonction de tri des cartes par priorité
  function sortCardsByPriority(cards) {
    // Tri des cartes selon la priorité (high > medium > low)
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
  async function reorderCards() {
    // Pour chaque colonne, trier et réorganiser les cartes
    const columns = document.querySelectorAll('.column');

    for (let column of columns) {
      // Sélectionner toutes les cartes de la colonne
      const cardsInColumn = column.querySelectorAll('.card');
      
      // Trier les cartes par priorité
      const sortedCards = sortCardsByPriority(cardsInColumn);

      // Réorganiser les cartes dans la colonne
      for (let card of sortedCards) {
        // Attendre un petit délai avant de réinsérer la carte (simulateur d'asynchrone)
        await insertCardAsync(column, card);
      }
    }
  }

  // Fonction simulant un délai asynchrone avant d'insérer une carte
  function insertCardAsync(column, card) {
    return new Promise((resolve) => {
      setTimeout(() => {
        column.appendChild(card);  // Réinsérer la carte après un délai
        resolve();
      }, 200);  // Délai de 200 ms
    });
  }

  // Appeler la fonction pour trier et réorganiser les cartes après un processus asynchrone
  await reorderCards();

  console.log("Cards reordered successfully.");
}

console.log("Kanban JS loaded...");
