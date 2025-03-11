console.log("Kanban JS loaded...");
//

function creerCarte(titre, contenu, priorite){
 if(!titre || !contenu) return null;

    const prioritesValides = ['haute', 'moyenne', 'basse'];
    const prioriteFinale = prioritesValides.includes(priorite) ? priorite : 'basse';

    const carte = {
        id: Date.now(),
        titre: titre,
        contenu: contenu,
        priorite: prioriteFinale,
        statut: 'todo'
    };

    sauvegarderCarteDansLocalStorage(carte);
    ajouterCarteTableau(carte);
    return carte;
}

function sauvegarderCarteDansLocalStorage(carte) {
    let cartes = JSON.parse(localStorage.getItem("cartes")) || [];
    cartes.push(carte);
    localStorage.setItem("cartes", JSON.stringify(cartes));
}

function ajouterCarteTableau(carte) {
    const colonne = document.querySelector(`.column[data-status="${carte.statut}"]`);
    const nouvelleCarte = document.createElement('div');
    nouvelleCarte.setAttribute('id', carte.id);
    nouvelleCarte.classList.add('card');
    nouvelleCarte.setAttribute('data-priority', carte.priorite);
    nouvelleCarte.setAttribute('draggable', true);

    nouvelleCarte.addEventListener('dragstart', (event) => {
        event.dataTransfer.setData('text/plain', carte.id);
    });

    const nouveauTitre = document.createElement('h3');
    nouveauTitre.textContent = carte.titre;

    const nouveauContenu = document.createElement('p');
    nouveauContenu.textContent = carte.contenu;

    const boutonSupprimer = document.createElement('button');
    boutonSupprimer.textContent = 'Supprimer';
    boutonSupprimer.addEventListener('click', function () {
        supprimerCarte(carte.id);
        nouvelleCarte.remove();
    });

    nouvelleCarte.appendChild(nouveauTitre);
    nouvelleCarte.appendChild(nouveauContenu);
    nouvelleCarte.appendChild(boutonSupprimer);

    colonne.appendChild(nouvelleCarte);
}

function supprimerCarte(id) {
    let cartes = JSON.parse(localStorage.getItem("cartes")) || [];
    cartes = cartes.filter(carte => carte.id !== id);
    localStorage.setItem("cartes", JSON.stringify(cartes));
}

function mettreAJourStatutCarte(id, nouveauStatut) {
    let cartes = JSON.parse(localStorage.getItem("cartes")) || [];
    let carte = cartes.find(carte => carte.id == id);
    if (carte) {
        carte.statut = nouveauStatut;
        localStorage.setItem("cartes", JSON.stringify(cartes));
    }
}

document.getElementById('addCardBtn').addEventListener('click', function () {
    const titre = prompt("Titre de la carte :");
    if (!titre) return;

    const contenu = prompt("Contenu de la carte :");
    if (!contenu) return;

    const priorite = prompt("Priorité de la carte (haute, moyenne, basse) :", "basse");
    creerCarte(titre, contenu, priorite);
});

window.addEventListener("load", function () {
    let cartes = JSON.parse(localStorage.getItem("cartes")) || [];
    cartes.forEach(ajouterCarteTableau);
});


const colonnes = document.querySelectorAll('.column');
colonnes.forEach(colonne => {
    colonne.addEventListener('dragover', (event) => {
        event.preventDefault();
    });

    colonne.addEventListener('drop', (event) => {
        event.preventDefault();
        const id = event.dataTransfer.getData('text/plain');
        const carte = document.getElementById(id);
        const nouveauStatut = colonne.getAttribute('data-status');

        if (carte) {
            colonne.appendChild(carte);
            mettreAJourStatutCarte(id, nouveauStatut);
        }
    });
});
