import Mobile from "./mobile";
import Basket from "./basket";
import rocketImgSrc from './assets/images/rocket128.png';
import rocketImgSrc180 from './assets/images/rocket128-180.png';
export default class Rocket extends Mobile{
    static ROCKET_WIDTH = 107;
    static ROCKET_HEIGHT = 38;

    constructor(x,y,deltaX,deltaY=0) {
        super(x,y,deltaX,deltaY);
        if (this.deltaX>=0){
          this.image = this.createImage(rocketImgSrc);
        }else{this.image = this.createImage(rocketImgSrc180);}
        this.width = 107;
        this.height = 38;
        
      }
    move(canvas){
        this.y +=this.deltaY;
    }
  getX(){ return this.x;}
  
}