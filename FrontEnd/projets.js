// Récupération des projets depuis API
const reponse = await fetch("http://localhost:5678/api/works");
const projets = await reponse.json();

for (let i = 0; i < projets.length; i++) {
    const travaux = projets[i];
    // Récupération de l'élément du DOM qui accueillera les travaux
    const sectionPortfolio = document.querySelector(".gallery");
    // Création d’une balise dédiée à un projet
    const projetElement = document.createElement("figure");
    // Création des balises 
    const imageElement = document.createElement("img");
    imageElement.src = projets[i].imageUrl;
    imageElement.alt = projets[i].title;
    const titleElement = document.createElement("figcaption");
    titleElement.innerText = projets[i].title;

    //Rattachement des balises au portfolio
    sectionPortfolio.appendChild(projetElement);
    projetElement.appendChild(imageElement);
    projetElement.appendChild(titleElement);
}

