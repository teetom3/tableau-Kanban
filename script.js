console.log("Kanban JS loaded...");

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
})
