import basketImgSrc from './assets/images/basket128.png';
import Mobile from './mobile';

export default class Basket extends Mobile {
  static BASKET_WIDTH = 128;
  static BASKET_HEIGHT = 94;  
  constructor(x,y,deltaX=0,deltaY=0) {
        super(x,y,deltaX,deltaY);
        this.image = this.createImage(basketImgSrc);
        this.moving = "";
        this.MoveState = { LEFT : 0, RIGHT : 1, UP : 3, DOWN : 4, NONE : 2};
        this.width = 128;
        this.height = 94;
      }
      moveLeft() {
        this.moving = this.MoveState.LEFT;
      }
    
      moveRight() {
        this.moving = this.MoveState.RIGHT;
      }
    
      moveUp() {
        this.moving = this.MoveState.UP;
      }
    
      moveDown() {
        this.moving = this.MoveState.DOWN;
      }    

      movep(box) {  
                  
        if (this.moving === this.MoveState.LEFT) {
          this.x = Math.max(0, this.x - this.deltaX);
        }
        if (this.moving === this.MoveState.RIGHT) {
          this.x = Math.min(box.width - this.width, this.x + this.deltaX);
        }
        
        if (this.moving === this.MoveState.UP) {
          this.y = Math.max(0, this.y - this.deltaY);
        }
        if (this.moving === this.MoveState.DOWN) {
          this.y = Math.min(box.height - this.height, this.y + this.deltaY);
        }
      }
    
    stopMoving() {
      this.moving = this.MoveState.NONE;
    }
    
}
