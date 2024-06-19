export default class Mobile {
    x;
    y;
    deltaX;
    deltaY;
    image;
    constructor(px,py,deltaX,deltaY) {
        this.x = px;
        this.y = py;
        this.deltaX = deltaX;
        this.deltaY = deltaY;
    }

    get x(){return this.x;}
    get y(){return this.y;}
    get deltaX(){return this.deltaX;}
    get deltaY(){return this.deltaY;}
    
    /* crée l'objet Image à utiliser pour dessiner l'objet */
    createImage(imageSource) {
        const newImg = new Image();
        newImg.src = imageSource;
        return newImg;
    }

    /* draw this basket, using the given drawing 2d context */
    draw(context) {
        context.drawImage(this.image, this.x, this.y);
        
    }
    move = (canvas) => {
        
        this.x += this.deltaX;
        this.y += this.deltaY;
    }

    collisionWith(c,d,player,a,b) {
		const p1Abscisse = Math.max(this.x, player.x);
		const p1Ordonne = Math.max(this.y, player.y);

		const p2Abscisse = Math.min(this.x+c, player.x+a);
		const p2Ordonne = Math.min(this.y+d, player.y+b);

		return((p1Abscisse < p2Abscisse) && (p1Ordonne < p2Ordonne));
	}
}
