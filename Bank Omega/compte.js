function getCookie(name) {
    const nameEQ = name + "=";
    const ca = document.cookie.split(';');
    for (let i = 0; i < ca.length; i++) {
        let c = ca[i].trim();
        if (c.indexOf(nameEQ) === 0) {
            return c.substring(nameEQ.length, c.length); // retourne la valeur du cookie
        }
    }
    return null; // retourne null si le cookie n'existe pas
}

// Fonction pour charger les informations
function loadAccountInfo() {
    const savedCompteEcoluxe = getCookie("compteEcoluxe");
    const savedCompteAutreProduit = getCookie("compteAutreProduit");
    const savedArgent = getCookie("argent");

    // Vérifier et afficher les informations
    if (savedCompteEcoluxe) {
        document.getElementById("compteEcoluxe").innerText = savedCompteEcoluxe;
    }

    if (savedCompteAutreProduit) {
        document.getElementById("compteAutreProduit").innerText = savedCompteAutreProduit;
    }

    if (savedArgent) {
        document.getElementById("argent").innerText = savedArgent; // Mettre à jour l'affichage de l'argent
    }
}

// Charger les informations au démarrage
loadAccountInfo();