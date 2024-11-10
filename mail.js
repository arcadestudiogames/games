function sendEmail() {
  var nom = document.getElementById("nomcontact").value;
  var prenom = document.getElementById("prenom").value;
  var mail = document.getElementById("emailcontact").value;
  var messagecontact = document.getElementById("messagecontact").value;

  if (nom == "" || prenom == "" || mail == "" || messagecontact == "") {
    alert("Veuillez remplir tous les champs obligatoires.");
  } 
  else {
    var body = "nom: " + nom + "\n" + "prenom: " + prenom + "\n" + "email: " + mail + "\n" + "message: " + messagecontact;
    var objet = "contact de la part de " + prenom + " " + nom;
  }

    Email.send({
      Host: "smtp.gmail.com",
      Username: "arcade.studio.jeux@gmail.com",
      Password: "Arcade2011!",
      To: 'arcade.studio.jeux@gmail.com',
      From: "arcade.studio.jeux@gmail.com",
      Subject: objet,
      Body: body+" "+mail+" "+nom+" "+prenom
    }).then(
      message => alert("Votre message contenant " + message + " nous a été envoyé avec succès !")
    ).catch(
      error => alert("Erreur lors de l'envoi de votre message : " + error)
    );
}
