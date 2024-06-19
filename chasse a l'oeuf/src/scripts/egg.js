import Mobile from "./mobile";
import Basket from "./basket";
import eggbImgSrc from './assets/images/blue-egg64.png';
import egggImgSrc from './assets/images/green-egg64.png';
import eggyImgSrc from './assets/images/yellow-egg64.png';
export default class Egg extends Mobile{
    static EGG_WIDTH = 64;
    static EGG_HEIGHT = 82;
    

    constructor(x,y,deltaX=0,deltaY=4) {
        super(x,y,deltaX,deltaY);
        
        this.image = this.createImage(this.randomIMG());
        
        this.width = 64;
        this.height = 82;
      }
    move(canvas){
        this.y +=this.deltaY;
    }

  getY(){ return this.y;}

  randomIMG(){
    let eggImgSrc = [eggbImgSrc,egggImgSrc,eggyImgSrc];
    const aleax= Math.floor(Math.random()*(eggImgSrc.length));
    return eggImgSrc[aleax];
    
  }
}