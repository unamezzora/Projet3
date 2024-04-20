function afficherMessageErreur(message) {
    let spanErreurMessage = document.getElementById("erreurMessage")

    if (!spanErreurMessage) {
        let messageLogin = document.querySelector(".messageErreur")
        spanErreurMessage =document.createElement("span")
        spanErreurMessage.id = "erreurMessage"

        messageLogin.append(spanErreurMessage)
    }
    spanErreurMessage.innerText = message

}

function ajoutListenerLogin() {
    const formulaireLogin = document.querySelector(".formulaire-login");
    formulaireLogin.addEventListener("submit", function (event) {
        event.preventDefault();

        // Création de l’objet des valeurs des champs du formulaire
        const authentification = {
            email: event.target.querySelector("#emailLogin").value,
            password: event.target.querySelector("#passe").value
        };
        
        // Création de la charge utile au format JSON
        const chargeUtile = JSON.stringify(authentification);
            
        // Appel de la fonction fetch avec toutes les informations nécessaires
        fetch("http://localhost:5678/api/users/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "accept": "application/json",
                //"authorization": `bearer ${token}`,    
            },
            body: chargeUtile,
        }).then((response) => {
            if (response.ok) {
                return response.json();
            }else{
                throw new Error('Utilisateur/mot de passe ne sont pas correctes');
            }
        }).then((data) => {window.localStorage.setItem("token", data.token);
            window.location.href = "index.html"
        }).catch((erreur) => 
            afficherMessageErreur(erreur.message));
    });

}
ajoutListenerLogin();