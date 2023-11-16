import GameEnv from './GameEnv.js';
import GameObject from './GameObject.js';

const GoombaAnimation = {
    // Sprite properties
    scale: 0.33,
    width: 448,
    height: 452,
}

export class Goomba extends GameObject{
    constructor(canvas, image, speedRatio) {
        super(canvas,image,speedRatio);

        this.spriteWidth = GoombaAnimation.width, 
        this.spriteHeight = GoombaAnimation.height, 
        this.spriteScale = GoombaAnimation.scale, 
        this.minFrame = 0;
        this.maxFrame = 0;
        this.frameX = 0;  // Default X frame of the animation
        this.frameY = 0;  // Default Y frame of the animation
        this.collisionWidth = this.spriteWidth * this.spriteScale;
        this.collisionHeight = this.spriteHeight * this.spriteScale;
        this.gravityEnabled = true;
        
        this.velocity = {
            x: .1,
            y: 0
        }
    }

    draw() {
        console.log("drawing Goomba")
        // Set fixed dimensions and position for the Character
        this.canvas.width = this.spriteWidth * this.spriteScale;
        this.canvas.height = this.spriteHeight * this.spriteScale;
        this.canvas.style.width = `${this.canvas.width}px`;
        this.canvas.style.height = `${this.canvas.height}px`;
        this.canvas.style.position = 'absolute';
        this.canvas.style.left = `${this.x}px`; // Set character horizontal position based on its x-coordinate
        this.canvas.style.top = `${this.y}px`; // Set character up and down position based on its y-coordinate

        this.ctx.drawImage(
            this.image,
            this.frameX * this.spriteWidth,
            this.frameY * this.spriteHeight,
            this.spriteWidth,
            this.spriteHeight,
            0,
            0,
            this.canvas.width,
            this.canvas.height
        );
    }

    size() {
        // Calculate proportional x and y positions based on the new screen dimensions
        if (GameEnv.prevInnerWidth) {
            const proportionalX = (this.x / GameEnv.prevInnerWidth) * GameEnv.innerWidth;
            const proportionalY = (this.y / GameEnv.prevBottom) * GameEnv.bottom;

            // Update the x and y positions based on the proportions
            this.setX(proportionalX);
            this.setY(proportionalY);
        } else {
            // First Screen Position
            this.setX(Math.random() * GameEnv.innerWidth);
            this.setY(GameEnv.bottom);
        }
    }

    update() {
        console.log(this.x)
        this.x += this.velocity.x;
        if (GameEnv.bottom > this.y && this.gravityEnabled)
            this.y += GameEnv.gravity;

        // Update animation frameX of the object
        if (this.frameX < this.maxFrame) {
            this.frameX++;
        } else {
            this.frameX = 0;
        }

        this.collisionChecks();
    }
}

export function initGoomba(canvas, image, gameSpeed, speedRatio){
    // Create the Player
    var goomba = new Goomba(canvas, image, gameSpeed, speedRatio);
    // Player Object
    return goomba;
}