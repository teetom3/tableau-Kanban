console.log("Kanban JS loaded...");

// Exemple éventuel de structure
window.addEventListener("DOMContentLoaded", () => {
  // Ici, on récupère les éléments du DOM
  const searchInput = document.getElementById('searchInput');

  searchInput.addEventListener('input', () => {
    let inputValue = searchInput.value.toLowerCase();
    let cards = document.querySelectorAll(".card");

    cards.forEach(card => {
      let title = card.querySelector("h3")?.textContent.toLowerCase() || "";
      let description = card.querySelector("p")?.textContent.toLowerCase() || "";

      if (title.includes(inputValue) || description.includes(inputValue)) {
          card.classList.remove("hidden");
      } else {
          card.classList.add("hidden");
      }
    });
  });
});
