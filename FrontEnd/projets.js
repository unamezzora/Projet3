// Récupération des projets depuis API
const works = await fetch("http://localhost:5678/api/works");
const projets = await works.json();

const categories = await fetch("http://localhost:5678/api/categories");
const btnFiltres = await categories.json();

//Creation des projets
function genererProjets(projets){
    for (let i = 0; i < projets.length; i++) {
        const travaux = projets[i];
        // Récupération de l'élément du DOM qui accueillera les travaux
        const sectionPortfolio = document.querySelector(".gallery");
        // Création d’une balise dédiée à un projet
        const projetElement = document.createElement("figure");
        // Création des balises 
        const imageElement = document.createElement("img");
        imageElement.src = travaux.imageUrl;
        imageElement.alt = travaux.title;

        //Creation des photos de la fenetre modal
        const photoModal = document.createElement("img");
        photoModal.src = travaux.imageUrl;
        const sectionGalleryModal = document.querySelector(".galleryModal");
        


        const titleElement = document.createElement("figcaption");
        titleElement.innerText = travaux.title;

        //Rattachement des balises au portfolio
        sectionPortfolio.appendChild(projetElement);
        projetElement.appendChild(imageElement);
        projetElement.appendChild(titleElement);
        sectionGalleryModal.appendChild(photoModal);

    } 
}




// Premier affichage de la page
genererProjets(projets);

//Ouvrir la fenetre modal
const openModal = function (e) {
    e.preventDefault()
    const target = document.querySelector(e.target.getAttribute("href"))
    target.style.display = null
    target.removeAttribute("aria-hidden")
    target.setAttribute("aria-modal", "true")
}

const btnModifier = document.querySelector(".modifierProjets");
btnModifier.addEventListener("click", openModal);



/*function() {
    genererGalerieModal(projets);
}
*/


// gestion des boutons 

// Récupération de l'élément du DOM qui accueillera les boutons
const sectionPortfolioFiltres = document.querySelector(".filtres");
const btnTousElement = document.createElement("button");

//Rattachement des balises au portfolio
sectionPortfolioFiltres.appendChild(btnTousElement);
btnTousElement.innerText = "Tous";

btnTousElement.addEventListener("click", function() {
    document.querySelector(".gallery").innerHTML = "";
    genererProjets(projets);
});

for (let i = 0; i < btnFiltres.length; i++) {
    const btnCat = btnFiltres[i];
   
    // Création d’une balise dédiée à un bouton
    const btnElement = document.createElement("button");
    btnElement.innerText = btnCat.name;

    //Rattachement des balises au portfolio
    sectionPortfolioFiltres.appendChild(btnElement);

    btnElement.addEventListener("click", function() {
        const projetsFiltres = projets.filter(function (projet) {
            return projet.categoryId === i+1;
        })
        document.querySelector(".gallery").innerHTML ="";
        genererProjets(projetsFiltres);
    })
}

//affichage en fonction del'authentification de l'utilisateur
const tokenInStorage = localStorage.getItem("token")
if (tokenInStorage !== null){
    //boutton LogIn/LogOut
    const loginConnexion = document.querySelector(".authen");
    loginConnexion.innerText = "Logout";
    loginConnexion.href = "index.html";
    //block noir "Mode Edition"
    const modeRedaction = document.querySelector(".redactionOut");
    modeRedaction.classList.replace("redactionOut", "redaction");
    //bouttons Filtres
    document.querySelector(".filtres").innerHTML = "";
    //suppression de token
    loginConnexion.addEventListener("click", function() {
        window.localStorage.removeItem("token");
    } )    
  
}    


        
