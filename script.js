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
//

function creerCarte(titre, contenu, priorite){
 if(!titre || !contenu) return null;

    const prioritesValides = ['haute', 'moyenne', 'basse'];
    const prioriteFinale = prioritesValides.includes(priorite) ? priorite : 'basse';

    const carte = {
        id : Date.now(),
        titre : titre,
        contenu : contenu,
        priorite : prioriteFinale,
        statut : 'todo'
    }

    sauvegarderCarteDansLocalStorage(carte)
    ajouterCarteTableau(carte)
return carte
}

function sauvegarderCarteDansLocalStorage(carte) {
 let cartes = JSON.parse(localStorage.getItem("cartes")) || [];
 cartes.push(carte);
 localStorage.setItem("cartes", JSON.stringify(cartes))
}

 //Creer la carte 
 function ajouterCarteTableau(carte){
    const colonneAFaire = document.querySelector(`.column[data-status=${carte.statut}]`);
    const nouvelleCarte = document.createElement('div');
    nouvelleCarte.setAttribute('id', carte.id);
    nouvelleCarte.classList.add('card');
    nouvelleCarte.setAttribute('data-priority', carte.priorite);
    nouvelleCarte.setAttribute('statut', carte.statut);

    const nouveauTitre = document.createElement('h3');
    nouveauTitre.textContent = carte.titre;

    const nouveauContenu = document.createElement('p');
    nouveauContenu.textContent = carte.contenu;

    const boutonSupprimer = document.createElement('button');
    boutonSupprimer.textContent = 'Supprimer';
    boutonSupprimer.addEventListener('click', function () {
        supprimerCarte(carte.id)
        nouvelleCarte.remove();
    });

    nouvelleCarte.appendChild(nouveauTitre);
    nouvelleCarte.appendChild(nouveauContenu);
    nouvelleCarte.appendChild(boutonSupprimer);

    colonneAFaire.appendChild(nouvelleCarte);

}

function supprimerCarte(id) {
    let cartes = JSON.parse(localStorage.getItem("cartes")) || [];
 cartes = cartes.filter(carte => carte.id !== id);
 localStorage.setItem("cartes", JSON.stringify(cartes)) 
}

document.getElementById('addCardBtn').addEventListener('click', function() {

    //Récupérer les infos 
    const titre = prompt("Titre de la carte :");
    if (!titre) return;

    const contenu = prompt("Contenu de la carte :");
    if (!contenu) return;

    const priorite = prompt("Priorité de la carte (haute, moyenne, basse) :", "basse");
  
    creerCarte(titre, contenu, priorite)
    
});
  
// Charger les cartes depuis le local storage 
window.addEventListener("load", function(){
    let cartes = JSON.parse(localStorage.getItem("cartes")) || [];
    cartes.forEach(ajouterCarteTableau);
    drag_drop();
})