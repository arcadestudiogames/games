let timer = 30; // Timer de compte à rebours
let compteEcoluxe = 0; // Nombre de produits Ecoluxe possédés
let compteAutreProduit = 0; // Nombre d'autres produits possédés
let argent = 100; // Montant d'argent initial

// Fonction pour ajuster les prix aléatoirement
function ajusterPrix() {
    const adjustmentEcoluxe = Math.floor(Math.random() * (5 - 1 + 1)) + 1; // Ajustement entre 1 et 5
    const adjustmentAutreProduit = Math.floor(Math.random() * (5 - 1 + 1)) + 1; // Ajustement entre 1 et 5

    // Mise à jour des prix
    const prixEcoluxe = parseInt(document.getElementById("prixEcoluxe").innerText);
    const prixAutreProduit = parseInt(document.getElementById("prixAutreProduit").innerText);

    document.getElementById("prixEcoluxe").innerText = prixEcoluxe + adjustmentEcoluxe;
    document.getElementById("prixAutreProduit").innerText = prixAutreProduit + adjustmentAutreProduit;

    console.log(`Ajustement des prix : Ecoluxe +${adjustmentEcoluxe}, Autre Produit +${adjustmentAutreProduit}`);
}

// Fonction pour démarrer le timer
function startTimer() {
    const interval = setInterval(() => {
        if (timer <= 0) {
            // Récompenser l'argent basé sur le nombre de produits
            argent += (compteEcoluxe + compteAutreProduit) * 50; // 50 € par produit
            document.getElementById("argent").innerText = argent; // Mettre à jour l'affichage de l'argent
            document.getElementById("valeurActuelle").innerText = argent; // Synchroniser avec la valeur actuelle
            ajusterPrix(); // Ajuster les prix lorsque le timer atteint 0
            timer = 120; // Réinitialiser le timer
        } else {
            timer--;
        }
        document.getElementById("timer").innerText = timer;
    }, 1000); // 1000 ms = 1 seconde
}

// Fonction pour définir un cookie
function setCookie(name, value, days) {
    const d = new Date();
    d.setTime(d.getTime() + (days * 24 * 60 * 60 * 1000)); // expiration après X jours
    const expires = "expires=" + d.toUTCString();
    document.cookie = name + "=" + value + ";" + expires + ";path=/"; // path=/ pour le rendre accessible sur toute la page
}

// Fonction pour obtenir un cookie
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

// Fonction pour sauvegarder toutes les informations dans les cookies
function saveAllInfo() {
    setCookie("compteEcoluxe", compteEcoluxe, 7); // Enregistrer le nombre d'Ecoluxe
    setCookie("compteAutreProduit", compteAutreProduit, 7); // Enregistrer le nombre d'autres produits
    setCookie("timer", timer, 7); // Enregistrer la valeur du timer
    setCookie("argent", argent, 7); // Enregistrer la valeur de l'argent
    console.log("Toutes les informations ont été sauvegardées dans les cookies !");
}

// Fonction pour acheter un produit
function acheterProduit(type) {
    if (type === 'ecoluxe') {
        if (argent >= 30) { // Vérifier si on a assez d'argent
            compteEcoluxe++;
            argent -= 30; // Déduire le prix du produit
            document.getElementById("compteEcoluxe").innerText = compteEcoluxe;
            document.getElementById("argent").innerText = argent; // Mettre à jour l'affichage de l'argent
            document.getElementById("valeurActuelle").innerText = argent; // Synchroniser avec la valeur actuelle
        } else {
            alert("Pas assez d'argent pour acheter Ecoluxe !");
        }
    } else if (type === 'autreProduit') {
        if (argent >= 40) { // Vérifier si on a assez d'argent
            compteAutreProduit++;
            argent -= 40; // Déduire le prix du produit
            document.getElementById("compteAutreProduit").innerText = compteAutreProduit;
            document.getElementById("argent").innerText = argent; // Mettre à jour l'affichage de l'argent
            document.getElementById("valeurActuelle").innerText = argent; // Synchroniser avec la valeur actuelle
        } else {
            alert("Pas assez d'argent pour acheter Autre Produit !");
        }
    }
}

// Fonction pour vendre un produit
function vendreProduit(type) {
    if (type === 'ecoluxe' && compteEcoluxe > 0) {
        compteEcoluxe--;
        argent += 30; // Récupérer l'argent de la vente
        document.getElementById("compteEcoluxe").innerText = compteEcoluxe;
        document.getElementById("argent").innerText = argent; // Mettre à jour l'affichage de l'argent
        document.getElementById("valeurActuelle").innerText = argent; // Synchroniser avec la valeur actuelle
    } else if (type === 'autreProduit' && compteAutreProduit > 0) {
        compteAutreProduit--;
        argent += 40; // Récupérer l'argent de la vente
        document.getElementById("compteAutreProduit").innerText = compteAutreProduit;
        document.getElementById("argent").innerText = argent; // Mettre à jour l'affichage de l'argent
        document.getElementById("valeurActuelle").innerText = argent; // Synchroniser avec la valeur actuelle
    } else {
        alert("Vous n'avez pas ce produit à vendre !");
    }
}

// Événement pour le bouton de sauvegarde
document.getElementById("saveButton").addEventListener("click", saveAllInfo);

// Charger les valeurs des cookies au démarrage
function loadCookies() {
    const savedCompteEcoluxe = getCookie("compteEcoluxe");
    const savedCompteAutreProduit = getCookie("compteAutreProduit");
    const savedTimer = getCookie("timer");
    const savedArgent = getCookie("argent");

    if (savedCompteEcoluxe) {
        compteEcoluxe = parseInt(savedCompteEcoluxe);
        document.getElementById("compteEcoluxe").innerText = compteEcoluxe;
    }

    if (savedCompteAutreProduit) {
        compteAutreProduit = parseInt(savedCompteAutreProduit);
        document.getElementById("compteAutreProduit").innerText = compteAutreProduit;
    }

    if (savedTimer) {
        timer = parseInt(savedTimer);
        document.getElementById("timer").innerText = timer;
    }

    if (savedArgent) {
        argent = parseInt(savedArgent);
        document.getElementById("argent").innerText = argent; // Mettre à jour l'affichage de l'argent
        document.getElementById("valeurActuelle").innerText = argent; // Synchroniser avec la valeur actuelle
    }
}

// Démarrer le timer et charger les cookies
startTimer();
loadCookies();

// Fonction pour sauvegarder un cookie
function setCookie(name, value, days) {
    const d = new Date();
    d.setTime(d.getTime() + (days * 24 * 60 * 60 * 1000)); // Durée de vie du cookie
    const expires = "expires=" + d.toUTCString();
    document.cookie = name + "=" + value + ";" + expires + ";path=/"; // Définir le cookie
}

// Fonction pour sauvegarder les données
function saveAccountInfo() {
    const compteEcoluxe = document.getElementById("compteEcoluxe").innerText;
    const compteAutreProduit = document.getElementById("compteAutreProduit").innerText;
    const argent = document.getElementById("argent").innerText;

    // Sauvegarder les informations dans les cookies
    setCookie("compteEcoluxe", compteEcoluxe, 7); // Expires in 7 days
    setCookie("compteAutreProduit", compteAutreProduit, 7);
    setCookie("argent", argent, 7);

    alert("Informations sauvegardées !"); // Message de confirmation
}

// Écouter l'événement de clic sur le bouton de sauvegarde
document.getElementById("saveButton").addEventListener("click", saveAccountInfo);