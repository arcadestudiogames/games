function send() {
  var nom = document.getElementById("nomcontact").value;
  var prenom = document.getElementById("prenom").value;
  var mail = document.getElementById("emailcontact").value;
  var messagecontact = document.getElementById("messagecontact").value;

  if (nom == "" || prenom == "" || mail == "" || messagecontact == "") {
    alert("Veuillez remplir tous les champs obligatoires.");
  } 
  else {
    var body = "Nom : " + nom + "\n" + "Prenom: " + prenom + "\n" + "Email: " + mail + "\n" + "message: " + messagecontact;
    var objet = "Contact de la part de " + mail;
  }
  window.location.href="mailto:Arcade Studio <arcade.studio.jeux@gmail.com>?cc="prenom+" "+nom +" <"+mail+">"+?subject="+objet+"&body="+body;
}
