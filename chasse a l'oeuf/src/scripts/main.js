
// importation de la classe Game.js
import Game from './game.js';
import Basket from './basket.js';


// mise en place de l'action des clics sur les boutons + les gestionnaires du clavier pour contrôler le panier
const init = () => {
  const canvas = document.getElementById("playfield");
  const scorep = document.getElementById("score");
  const basket = new Basket(canvas.width/2-64,canvas.height/2-47,10,10);
  const game = new Game(canvas, basket, scorep);
  
  window.addEventListener('keydown', game.keyDownActionHandler.bind(game));
  window.addEventListener('keyup', game.keyUpActionHandler.bind(game));

  document.getElementById("stopAndStartGame").addEventListener("click",()=>game.startAndStop() );
  
}

window.addEventListener("load",init);

//
console.log('le bundle a été généré');
