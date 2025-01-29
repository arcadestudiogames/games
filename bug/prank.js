window.onload = function() {
    var audio = document.getElementById('audio');
    var initialPage = document.querySelector('body');
    var texte = document.querySelector('h1');
    var bouton1 = document.getElementById('changeBtn');
    var bouton2 = document.getElementById('changeBtn2');
    var image = document.querySelector('img');

    var changeBtn = document.getElementById('changeBtn');
    var changeBtn2 = document.getElementById('changeBtn2');
    changeBtn.addEventListener('click',changePage);
    changeBtn2.addEventListener('click',changePage);


function changePage() {
    initialPage.style.backgroundColor = 'rgb(255, 0, 0)';
    initialPage.style.backgroundImage = "url(images/poupee.jpeg)";
    initialPage.style.backgroundRepeat = "no-repeat";
    initialPage.style.backgroundSize = "cover";
    initialPage.style.backgroundPosition = "center";
    // initialPage.style.display = "flex";
    initialPage.style.verticalAlign = "center";
    initialPage.style.alignItems = "center";
    initialPage.style.justifyContent = "center";
    // initialPage.style.height = "100vh";
    texte.style.display = "none";
    bouton1.style.display = "none";
    bouton2.style.display = "none";
    image.style.display = "none";
    audio.play();
    initialPage.innerHTML = mainPage.innerHTML;
  }}