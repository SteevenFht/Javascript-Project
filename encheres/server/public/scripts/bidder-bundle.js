/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./src/scripts/bidder.js":
/*!*******************************!*\
  !*** ./src/scripts/bidder.js ***!
  \*******************************/
/***/ (() => {

eval("//bidder\nconst socket = io();\n\nconst statusLabel = document.getElementById(\"gameInfo\");\nconst status = document.getElementById(\"offre\");\nconst BT5 = document.getElementById(\"5\");\nconst BT10 = document.getElementById(\"10\");\nconst BT100 = document.getElementById(\"100\");\n\n// Fonction pour cacher les boutons de jeu\nconst hiddenButtons = () => {\n    BT10.style.visibility = \"hidden\";\n    BT5.style.visibility = \"hidden\";\n    BT100.style.visibility = \"hidden\";\n}\n\n// Fonction pour afficher les boutons de jeu\nconst showButtons = () => {\n    BT10.style.visibility = \"visible\";\n    BT5.style.visibility = \"visible\";\n    BT100.style.visibility = \"visible\";\n}\n\n// Fonction pour désactiver les boutons de jeu\nconst disableButtons = () => {\n    BT10.disabled = true;\n    BT5.disabled = true;\n    BT100.disabled = true;\n}\n\n// Fonction pour activer les boutons de jeu\nconst enableButtons = () => {\n    BT10.disabled = false;\n    BT5.disabled = false;\n    BT100.disabled = false;\n}\n\nconst refreshStatus = (value) => {\n    if(value == 'waiting') {\n        statusLabel.innerHTML = \"En attente du debut de l'enchere...\";\n        hiddenButtons();\n        disableButtons();\n    }\n    else if(value == 'playing') {\n        statusLabel.innerHTML = \"Enchere en cours\";\n        showButtons();\n        disableButtons();\n    }\n}\n\nBT5.addEventListener(\"click\", () => {\n    disableButtons();\n    statusLabel.innerHTML = \"\";\n    status.innerHTML=\"5\";\n    socket.emit('newoffer', 5);\n    enableButtons();\n    statusLabel.innerHTML = \"Veuillez faire une offre\";\n});\n\nBT10.addEventListener(\"click\", () => {\n    disableButtons();\n    statusLabel.innerHTML = \"\";\n    status.innerHTML=\"10\";\n    socket.emit('newoffer', 10);\n    enableButtons();\n});\n\n\nBT100.addEventListener(\"click\", () => {\n    disableButtons();\n    statusLabel.innerHTML = \"\";\n    status.innerHTML=\"100\";\n    socket.emit('newoffer', 100);\n    enableButtons();\n    statusLabel.innerHTML = \"Veuillez faire une offre\";\n});\n\nsocket.on('update', (price,desc) => {\n    console.log(price);\n    console.log(desc);\n    document.querySelector('#item').innerHTML = desc;\n    document.querySelector('#itemprice').innerHTML = price;\n    enableButtons();\n    statusLabel.innerHTML = \"Veuillez faire une offre\";\n});\n\nsocket.on('maj', (totalPrice,value,id,bidderName) => {\n    console.log(totalPrice);\n    console.log(value);\n    document.querySelector('#itemprice').innerHTML = totalPrice;\n    if(socket.id == id){\n        document.querySelector('#fin').innerHTML =\"Vous avez fait une enchere de + \"+value+\"€\";\n    }\n    else{\n        document.querySelector('#fin').innerHTML =\"Nouvelle enchere de + \"+value+\"€\";\n    }\n});\n\nsocket.on('end', (finalValue,descValue,lastBidderId,bidderName) => {\n    console.log(finalValue);\n    console.log(descValue);\n    console.log(\"vainqueur : \"+ bidderName + ' id :' + lastBidderId);\n    statusLabel.innerHTML = \"Retour à l'accueil pour refaire une nouvelle mise au enchère\";\n    if(socket.id == lastBidderId) {\n        document.querySelector('#fin').innerHTML = \"Fin de l'enchère !!!! Vous avez gagné \" + descValue;\n    } else {\n        document.querySelector('#fin').innerHTML = \"Fin de l'enchère !!!! \" + descValue + \" a été gagné par \"+ lastBidderId;\n    }\n});\n\ndisableButtons();\nhiddenButtons();\nsocket.emit('encherisseur');\nsocket.on('status', value => refreshStatus(value));\n\n\n//# sourceURL=webpack://client/./src/scripts/bidder.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = {};
/******/ 	__webpack_modules__["./src/scripts/bidder.js"]();
/******/ 	
/******/ })()
;