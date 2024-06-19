import Mobile from "./mobile";
import Basket from "./basket";
import Egg from "./egg";
import Rocket from "./rockets";
export default class Game {
    canvas;
    context;
    player;
    eggs;
    rockets;
    score;
    life;
    perdu;
    

    constructor(canvas,basket,scorep){
        this.canvas = canvas;
        this.context = this.canvas.getContext('2d');
        this.start = false;
        this.player = basket;
        this.eggs = [];
        this.rockets = [];
        this.scorep=scorep;
        this.score = 0;
        this.life =3;
        
        // spawn oeuf alea intervalle 1000 avec 75%
        this.interval_O = setInterval(() => {
          const alea = Math.random();
          if(alea <= 0.75 && this.start == true)
              this.addEgg()
          },1000);
        // sapwn rocket alea inter 1000 avec 50%
        this.interval_R = setInterval(() => {
          const alea = Math.random();
          if(alea <= 0.5 && this.start == true)
              this.addRocket()
          },1000);
      }

      get player(){return this.player;}
      get egg(){return this.eggs;}
      get rocket(){return this.rockets;}
      get score(){return this.score;}
    
      /* start the animation or stop it if previously running */
    startAndStop() {
    if(this.start){
      window.cancelAnimationFrame(this.raf);
      }else{
      
      this.moveAndDraw();}
    
    this.start = !(this.start) ;
  }
  moveAndDraw = () => {
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.player.movep(this.canvas);
    // affiche le panier si vie >0
    
    if(this.life >0){
      this.player.draw(this.context);
      // les oeuf disparaiisent de la liste aprés etre sortis
      this.eggs = this.eggs.filter(egg => egg.getY() <= this.canvas.height);
      
      this.eggs = this.eggs.filter(egg => {
          egg.move(this.canvas);


          // choc oeuf <=> rocket
          for(const rocket of this.rockets){ 
            if(egg.collisionWith(Egg.EGG_WIDTH,Egg.EGG_HEIGHT,rocket,Rocket.ROCKET_WIDTH,Rocket.ROCKET_HEIGHT)){  
              console.log(egg.collisionWith(Egg.EGG_WIDTH,Egg.EGG_HEIGHT,rocket,Rocket.ROCKET_WIDTH,Rocket.ROCKET_HEIGHT));
              return! egg.collisionWith(Egg.EGG_WIDTH,Egg.EGG_HEIGHT,rocket,Rocket.ROCKET_WIDTH,Rocket.ROCKET_HEIGHT);
          }}


          // les oeuf disparaissent au contact panier => score +100
          if(egg.collisionWith(Egg.EGG_WIDTH,Egg.EGG_HEIGHT,this.player,Basket.BASKET_WIDTH,Basket.BASKET_HEIGHT)){ 
            this.addScore(100);
            this.scorep.textContent = this.score;
            console.log(this.score) 
            return ! egg.collisionWith(Egg.EGG_WIDTH,Egg.EGG_HEIGHT,this.player,Basket.BASKET_WIDTH,Basket.BASKET_HEIGHT);
          }
          else{
              egg.draw(this.context);
            }
          return true;
          
      })
      
      // les rockets disparaiisent de la liste aprés etre sorties
      this.rockets = this.rockets.filter(rocket => rocket.getX() >=0 && rocket.getX()<= this.canvas.width );
      console.log(this.rockets);
      // les rockets disparaissent au contact panier => score -500
      this.rockets = this.rockets.filter(rocket => {
        rocket.move(this.canvas);
        if(rocket.collisionWith(Rocket.ROCKET_WIDTH,Rocket.ROCKET_HEIGHT,this.player,Basket.BASKET_WIDTH,Basket.BASKET_HEIGHT)){ 
          this.addScore(-500);
          this.scorep.textContent = this.score;
          
          if (this.life >0){
            document.getElementById("life-" + this.life).src="";
            this.life -=1;
          }
          return ! rocket.collisionWith(Rocket.ROCKET_WIDTH,Rocket.ROCKET_HEIGHT,this.player,Basket.BASKET_WIDTH,Basket.BASKET_HEIGHT);
        }else
            rocket.draw(this.context);
        return true;
      })
      this.raf = window.requestAnimationFrame(this.moveAndDraw);
    }else{
      this.popup();
      document.location.reload();
    }
  }

  keyDownActionHandler(event) {
    switch (event.key) {
        case "ArrowLeft":
        case "Left":
            this.player.moveLeft();
            break;
        case "ArrowRight":
        case "Right":
            this.player.moveRight();
            break;
        case "ArrowUp" :
        case "Up" :
          this.player.moveUp();
          break;
        case "ArrowDown" :
        case "Down" :
          this.player.moveDown();
          break;
        default: return;
    }
    event.preventDefault();
  }

 keyUpActionHandler(event) {
  switch (event.key) {
      case "ArrowLeft":
      case "Left":
      case "ArrowRight":
      case "Right":
      case "ArrowUp" :
      case "Up" :
      case "ArrowDown" :
      case "Down" :
          this.player.stopMoving();
          break;
      default: return;
  }
  event.preventDefault();
  
}
  addEgg(){
    const aleax= Math.floor(Math.random()*(this.canvas.width-Egg.EGG_WIDTH));
    this.eggs.push(new Egg(aleax ,0 , 0 , 4));
  }

  addScore(s){
    this.score +=s; 
  }
  
  addRocket(){
    const aleay= Math.floor(Math.random()*(this.canvas.height-Rocket.ROCKET_HEIGHT));
    const alea = Math.random();
    if(alea <= 0.5){
      this.rockets.push(new Rocket(0, aleay , 6 , 0));
    }else{this.rockets.push(new Rocket(this.canvas.width, aleay , -6 , 0));}
  }


  popup() {
    
    if (this.score <= 0){
      alert("Game Over , votre score est de "+ this.score+ "\n De l'entrainement est plus que nécessaire 🤪 ");
    }if (this.score >0 && this.score < 500){
      alert("Game Over , votre score est de "+ this.score+ "\n plutot pas mal" );
    }
    if (this.score >= 500){
      alert("Game Over , votre score est de "+ this.score+ "\n bien joué 🥳" );

    }
  }
    
}

