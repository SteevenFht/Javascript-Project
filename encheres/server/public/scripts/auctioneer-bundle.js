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

/***/ "./src/scripts/auctioneer.js":
/*!***********************************!*\
  !*** ./src/scripts/auctioneer.js ***!
  \***********************************/
/***/ (() => {

eval("//auctioneer\nconst socket = io();\nconst statusLabel = document.getElementById(\"gameInfo\");\nconst price = document.getElementById(\"startingprice\");\nconst desc = document.getElementById(\"description\");\nconst finalprice = document.getElementById(\"actualprice\");\nlet lastBidderId = null;\nlet finalValue = null;\nconst BTstart = document.getElementById(\"start\");\nconst BTbid = document.getElementById(\"terminer\");\n\n// Fonction pour désactiver les boutons de jeu\nconst disableButtons = () => {\n    BTstart.disabled = true;\n    BTbid.disabled = true;\n}\n\n// Fonction pour activer les boutons de jeu\nconst enableButtons = () => {\n    BTstart.disabled = false;\n    BTbid.disabled = false;\n}\n\nconst refreshStatus = (value) => {\n    if(value == 'waiting') {\n        statusLabel.innerHTML = \"En attente des enchèrisseurs...\";\n        disableButtons();\n    }\n    else if(value == 'playing') {\n        statusLabel.innerHTML = \"Veuillez débuter l'enchère\";\n        enableButtons();\n    }\n}\n\nBTstart.addEventListener(\"click\", () => {\n    let priceValue = price.value;\n    let descValue = desc.value;\n    socket.emit('start',priceValue,descValue);\n    statusLabel.innerHTML = \"Enchère en cours\";\n    BTstart.disabled = true;\n});\n\nsocket.on('maj', (totalPrice,value,id) => {\n    console.log(totalPrice);\n    console.log(value);\n    console.log(id);\n    document.querySelector('#info').innerHTML = \"Enchere reçue de\";\n    document.querySelector('#infotxt').innerHTML = \":+ \";\n    document.querySelector('#encheregain').innerHTML = value+\"€\";\n    document.querySelector('#encherisseur').innerHTML = id;\n    document.querySelector('#actualprice').innerHTML = totalPrice;\n    finalValue = totalPrice;\n    lastBidderId = id;\n});\n\nBTbid.addEventListener(\"click\", () => {\n    console.log(\"BTbid clicked\");\n    let descValue = desc.value;\n    console.log(`Emitting 'end' with ${finalValue}, ${descValue}, ${lastBidderId}`);\n    socket.emit('end',finalValue,descValue,lastBidderId);\n    statusLabel.innerHTML = \"\";\n    BTbid.disabled = true;\n});\n\nsocket.on('end', (finalValue,descValue,lastBidderId) => {\n    console.log(finalValue);\n    console.log(descValue);\n    console.log(\"vainqueur : \"+lastBidderId);\n    document.querySelector('#info').innerHTML = \"Fin de l'enchère !!!!\";\n    document.querySelector('#infotxt').innerHTML = \"\";\n    document.querySelector('#encheregain').innerHTML = \"\";\n    document.querySelector('#encherisseur').innerHTML =\"\";\n    document.querySelector('#actualprice').innerHTML = \"-€\";\n    document.querySelector('#fin').innerHTML =descValue +\" conclut à \"+finalValue+\"€ par \"+lastBidderId;\n    statusLabel.innerHTML = \"Retour à l'accueil pour refaire une nouvelle mise au enchère\";\n});\n\n// Désactivation des boutons de jeu au début\ndisableButtons();\nsocket.emit('commissaire');\nsocket.on('status', value => refreshStatus(value));\n\nsocket.on('maxCommissaireReached', () => {\n    console.log(\"Le nombre maximum de joueurs a été atteint, connexion refusée.\");\n    statusLabel.innerHTML = \"Nombre maximal de joueurs atteint, connexion refusée.\";\n    disableButtons();\n});\n\n//# sourceURL=webpack://client/./src/scripts/auctioneer.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = {};
/******/ 	__webpack_modules__["./src/scripts/auctioneer.js"]();
/******/ 	
/******/ })()
;