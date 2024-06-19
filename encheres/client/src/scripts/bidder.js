//bidder
const socket = io();

const statusLabel = document.getElementById("gameInfo");
const status = document.getElementById("offre");
const BT5 = document.getElementById("5");
const BT10 = document.getElementById("10");
const BT100 = document.getElementById("100");

// Fonction pour cacher les boutons de jeu
const hiddenButtons = () => {
    BT10.style.visibility = "hidden";
    BT5.style.visibility = "hidden";
    BT100.style.visibility = "hidden";
}

// Fonction pour afficher les boutons de jeu
const showButtons = () => {
    BT10.style.visibility = "visible";
    BT5.style.visibility = "visible";
    BT100.style.visibility = "visible";
}

// Fonction pour désactiver les boutons de jeu
const disableButtons = () => {
    BT10.disabled = true;
    BT5.disabled = true;
    BT100.disabled = true;
}

// Fonction pour activer les boutons de jeu
const enableButtons = () => {
    BT10.disabled = false;
    BT5.disabled = false;
    BT100.disabled = false;
}

const refreshStatus = (value) => {
    if(value == 'waiting') {
        statusLabel.innerHTML = "En attente du debut de l'enchere...";
        hiddenButtons();
        disableButtons();
    }
    else if(value == 'playing') {
        statusLabel.innerHTML = "Enchere en cours";
        showButtons();
        disableButtons();
    }
}

BT5.addEventListener("click", () => {
    disableButtons();
    statusLabel.innerHTML = "";
    status.innerHTML="5";
    socket.emit('newoffer', 5);
    enableButtons();
    statusLabel.innerHTML = "Veuillez faire une offre";
});

BT10.addEventListener("click", () => {
    disableButtons();
    statusLabel.innerHTML = "";
    status.innerHTML="10";
    socket.emit('newoffer', 10);
    enableButtons();
});


BT100.addEventListener("click", () => {
    disableButtons();
    statusLabel.innerHTML = "";
    status.innerHTML="100";
    socket.emit('newoffer', 100);
    enableButtons();
    statusLabel.innerHTML = "Veuillez faire une offre";
});

socket.on('update', (price,desc) => {
    console.log(price);
    console.log(desc);
    document.querySelector('#item').innerHTML = desc;
    document.querySelector('#itemprice').innerHTML = price;
    enableButtons();
    statusLabel.innerHTML = "Veuillez faire une offre";
});

socket.on('maj', (totalPrice,value,id,bidderName) => {
    console.log(totalPrice);
    console.log(value);
    document.querySelector('#itemprice').innerHTML = totalPrice;
    if(socket.id == id){
        document.querySelector('#fin').innerHTML ="Vous avez fait une enchere de + "+value+"€";
    }
    else{
        document.querySelector('#fin').innerHTML ="Nouvelle enchere de + "+value+"€";
    }
});

socket.on('end', (finalValue,descValue,lastBidderId,bidderName) => {
    console.log(finalValue);
    console.log(descValue);
    console.log("vainqueur : "+ bidderName + ' id :' + lastBidderId);
    statusLabel.innerHTML = "Retour à l'accueil pour refaire une nouvelle mise au enchère";
    if(socket.id == lastBidderId) {
        document.querySelector('#fin').innerHTML = "Fin de l'enchère !!!! Vous avez gagné " + descValue;
    } else {
        document.querySelector('#fin').innerHTML = "Fin de l'enchère !!!! " + descValue + " a été gagné par "+ lastBidderId;
    }
});

disableButtons();
hiddenButtons();
socket.emit('encherisseur');
socket.on('status', value => refreshStatus(value));
