// Récupération des projets depuis API
const reponse = await fetch("http://localhost:5678/api/works");
const projets = await reponse.json();

function genererProjets(projets){
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
}

// Premier affichage de la page
genererProjets(projets);


// gestion des bouttons 
const boutonObjets = document.querySelector(".btn-obj");

boutonObjets.addEventListener("click", function() {
    const projetsObjets = projets.filter(function (projet) {
        return projet.categoryId === 1;
    });
    // Effacement de l'ecran et regénération de la page avec les projets filtrées uniquement
    document.querySelector(".gallery").innerHTML = "";
    genererProjets(projetsObjets);
});

const boutonAppart = document.querySelector(".btn-appart");

boutonAppart.addEventListener("click", function() {
    const projetsAppart = projets.filter(function (projet) {
        return projet.categoryId === 2;
    });
     // Effacement de l'ecran et regénération de la page avec les projets filtrées uniquement
     document.querySelector(".gallery").innerHTML = "";
     genererProjets(projetsAppart);
});

const boutonHotelResto = document.querySelector(".btn-resto");

boutonHotelResto.addEventListener("click", function() {
    const projetsHotelResto = projets.filter(function (projet) {
        return projet.categoryId === 3;
    });
     // Effacement de l'ecran et regénération de la page avec les projets filtrées uniquement
     document.querySelector(".gallery").innerHTML = "";
     genererProjets(projetsHotelResto);
});

const boutonTous = document.querySelector(".btn-tous");

boutonTous.addEventListener("click", function() {
    const projetsTous = projets.filter(function (projet) {
        return projet.categoryId >= 1;
    });
     // Effacement de l'ecran et regénération de la page avec les projets filtrées uniquement
     document.querySelector(".gallery").innerHTML = "";
     genererProjets(projetsTous);
});
