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



