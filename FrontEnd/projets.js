// Récupération des categories depuis API
const categories = await fetch("http://localhost:5678/api/categories");
const btnFiltres = await categories.json();

// Récupération des projets depuis API
let projets = await fetch("http://localhost:5678/api/works")
.then((projets) => projets.json())

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
        const titleElement = document.createElement("figcaption");
        titleElement.innerText = travaux.title;
       
        //Rattachement des balises au portfolio
        sectionPortfolio.appendChild(projetElement);
        projetElement.appendChild(imageElement);
        projetElement.appendChild(titleElement);
    } 
    
}

genererProjets(projets);

//Ouvrir/fermer la fenetre modal
let modal = null

const ouvrirModal = function (e) {
    e.preventDefault();
    fetch("http://localhost:5678/api/works")
        .then((projets) => projets.json())
        .then((projets) => {
            genererProjetsModal(projets);
            suppressontravaux();

        });
     
    modal = document.querySelector(e.target.getAttribute("href"));
    modal.style.display = null;
    modal.removeAttribute("aria-hidden");
    modal.setAttribute("aria-modal", "true");
    
    modal.addEventListener("click", fermerModal);
   
 
   
    modal.querySelectorAll(".btnfermerModal").forEach(a => {
        a.addEventListener("click", fermerModal);
    });
    modal.querySelectorAll(".modalStop").forEach(a => {
        a.addEventListener("click", stopPropagation);
    });
    
}

const fermerModal = function (e) {
    if (modal === null) return;
    e.preventDefault();
    document.querySelector(".galleryModal").innerHTML = "";
    modal.style.display = "none";
    modal.setAttribute("aria-hidden", "true");
    modal.removeAttribute("aria-modal");
    modal.removeEventListener("click", fermerModal);
    modal.querySelectorAll(".btnfermerModal").forEach(a => {
        a.removeEventListener("click", fermerModal);
    });
    modal.querySelectorAll(".modalStop").forEach(a => {
        a.removeEventListener("click", stopPropagation);
    });
    modal = null;
    document.querySelector(".modalAjout").style.display = "none";
    document.querySelector(".modalMedias").style.display = "flex";
}

const stopPropagation = function (e) {
    e.stopPropagation()
}

//La fenetre modale "Galerie photo"
document.querySelectorAll(".btnModal").forEach(a => {
    a.addEventListener("click", ouvrirModal);
})

//La fenetre modal "Ajout photo"
document.querySelector(".btnAjoutPhoto").addEventListener("click", function (e) {
    document.querySelector(".modalAjout").style.display = "flex";
    document.querySelector(".modalMedias").style.display = "none";
    document.querySelector(".modalAjout").addEventListener("click", stopPropagation);
    //document.querySelector(".btnValiderAjoutPhoto").addEventListener("click", fermerModal);
})

document.querySelector(".btnRetournModal").addEventListener("click", function() {
    document.querySelector(".modalAjout").style.display = "none";
    document.querySelector(".modalMedias").style.display = "flex";
})

//Creation des projets de la fenetre modal
function genererProjetsModal(projets){
    for (let i = 0; i < projets.length; i++) {
        const travaux = projets[i];

        //Creation des photos de la fenetre modal
        const sectionGalleryModal = document.querySelector(".galleryModal");
        const projetModal = document.createElement("div");
        const photoModal = document.createElement("img");
        photoModal.src = travaux.imageUrl;
        const btnSupprimerProjet = document.createElement("button");
        btnSupprimerProjet.id = travaux.id;
        btnSupprimerProjet.classList = "urna";
        const iconSupprimerProjet = document.createElement("i");
        iconSupprimerProjet.setAttribute("class", "fa-solid fa-trash-can");
       
        //Rattachement des balises au modal
        sectionGalleryModal.appendChild(projetModal);
        projetModal.appendChild(photoModal);
        projetModal.appendChild(btnSupprimerProjet);
        btnSupprimerProjet.appendChild(iconSupprimerProjet);

    } 
    
}



//Ajout des categorie dans le formulaire de la fenetre modal "Ajout photo"
for (let i = 0; i < btnFiltres.length; i++) {
    const categorieOption = btnFiltres[i];
    // Récupération de l'élément du DOM
    const categorieSelect = document.querySelector("#categorie");
    // Création d’une balise
    const elementOption = document.createElement("option");
    elementOption.value = categorieOption.id
    elementOption.innerText = categorieOption.name;
    //Rattachement des balises
    categorieSelect.appendChild(elementOption);

}

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
    //lien Modifier
    document.querySelector(".iconeBtnModal").style.display = "flex";
    document.querySelector(".portfolioTitre").style.padding = "5em 0em 3em 0em";
    //bouttons Filtres
    document.querySelector(".filtres").innerHTML = "";
    //suppression de token
    loginConnexion.addEventListener("click", function() {
        window.localStorage.removeItem("token");
    } )    
  
}

//Suppression de travaux existants

/*
const supprimerProjet = async function  (event){
    event.preventDefault();
    const id = this.getAttribute("id");
    await fetch("http://localhost:5678/api/works/${id}"), {
        method: "DELETE",
        headers: {
            "Accept": "application/json",
            "authorization": `Bearer ` + localStorage.getItem("token"),
        },
    }.then((response) => {
        if(response.ok) {
            alert(`Le projet est suprimé!`);
            document.querySelector(".gallery").innerHTML ="";
            document.querySelector(".galleryModal").innerHTML = "";
            fetch("http://localhost:5678/api/works")
            .then((projets) => projets.json())
            .then((projets) => {
                genererProjets(projets);
                genererProjetsModal(projets);
                console.log(travauxElementBtn);
                console.log(projets);    
               })
            }
        })
}

document.querySelectorAll(".urna").forEach(a => {
    a.addEventListener("click", console.log(urna));
})

*/

function suppressontravaux() {
    const travauxElementBtn = document.querySelectorAll(".urna");
  
    travauxElementBtn.forEach(a => {
        a.addEventListener("click", async function (event){
            event.preventDefault();
            let id = this.getAttribute('id');
            await fetch(`http://localhost:5678/api/works/${id}`,{
                method: "DELETE",
                headers: {
                    "Accept": "application/json",
                    "authorization": `Bearer ` + localStorage.getItem("token"),    
                },
            }).then((response) => {
                if(response.ok) {
                    alert(`Le projet est suprimé!`);
                    document.querySelector(".gallery").innerHTML ="";
                    document.querySelector(".galleryModal").innerHTML = "";
                    fetch("http://localhost:5678/api/works")
                    .then((projets) => projets.json())
                    .then((projets) => {
                        genererProjets(projets);
                        genererProjetsModal(projets);
                        suppressontravaux();
                        console.log(travauxElementBtn);
                        console.log(projets);    
                       })
                }
            })


        })
    })
}

            

  

//Affichage d'une image avant envoi
function previewImage() {
    const file = document.querySelector("input[type=file]").files[0];
    const reader = new FileReader();
    reader.onload = () => document.getElementById("prevPhoto").src = reader.result;
    reader.readAsDataURL(file);
    document.getElementById("prevPhoto").style.display = "flex";
    document.getElementById("prevIcon").style.display = "none";
	document.getElementById("prevLabel").style.display = "none";
	document.getElementById("prevP").style.display = "none";
}
document.querySelector(".btnChargementPhoto").addEventListener("change", previewImage)



//Ajout d'un projet
const form = document.querySelector(".formulaireAjoutProjet");
form.addEventListener("submit", ajoutProjet);

async function ajoutProjet(event) {
    event.preventDefault();
    const formProjet = new FormData(form);

    await fetch("http://localhost:5678/api/works", {
        method: "POST",
        headers: {
            "authorization": `Bearer ` + localStorage.getItem("token"),
        },
        body: formProjet
    }).then((response) => {
        if(response.ok) {
            document.querySelector(".gallery").innerHTML ="";
            document.querySelector(".galleryModal").innerHTML = "";
            fetch("http://localhost:5678/api/works")
                .then((projets) => projets.json())
                .then((projets) => {
                    genererProjets(projets);
                    genererProjetsModal(projets);
                    suppressontravaux(); 
                    alert(`Le nouveau projet est ajouté!`);
                    document.getElementById("titre").value ="";
                    document.getElementById("prevPhoto").style.display = "none";
                    document.getElementById("prevIcon").style.display = "flex";
	                document.getElementById("prevLabel").style.display = "flex";
	                document.getElementById("prevP").style.display = "flex";
                    console.log(projets);
                    console.log(document.querySelectorAll(".galleryModal div button"));
            })
        }else{
            alert(`Erreur ${response.status}" Le formulaire n'est pas correctement rempli"`);
        }
    })
    
}

//Activation du bouton "Valider"

function actBtnValider() {
    const titreProjet = document.getElementById("titre").value;
    const photoProjet = document.getElementById("photo").value;
    if (titreProjet && photoProjet) {
        document.querySelector(".btnValiderAjoutPhoto").disabled = false;
        document.querySelector(".btnValiderAjoutPhoto").style.background = "#1D6154";
    }else{
        document.querySelector(".btnValiderAjoutPhoto").disabled = true;
        document.querySelector(".btnValiderAjoutPhoto").style.background = "#A7A7A7";
    }

}

document.getElementById("titre").addEventListener("change", actBtnValider);
document.getElementById("photo").addEventListener("change", actBtnValider);