// création de la socket
const socket = io();
// abonnement au message 'welcome' émis par le serveur
socket.on('welcome', () => console.log('connection with server confirmed') );
// envoi d'un message 'greatings' vers le serveur (après 2s de pause)
window.setTimeout(() => socket.emit('greatings'), 2000);
