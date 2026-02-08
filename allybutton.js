class AllyButton {

    constructor(gameEngine, label, price, x, y, onClick, bgImageSrc) {
        this.gameEngine = gameEngine;
        this.label = label;
        this.price = price;
        this.onClick = onClick;
        this.width = 100;
        this.height = 100;
        this.x = x; 
        this.y = y;
        this.selected = false;
        this.bgImage = bgImageSrc;
        
    }


    update() {
        if (this.gameEngine.click) {
            const mouseX = this.gameEngine.click.x;
            const mouseY = this.gameEngine.click.y;

            if (mouseX >= this.x && mouseX <= this.x + this.width &&
                mouseY >= this.y && mouseY <= this.y + this.height) {
                this.onClick(this);
                this.gameEngine.click = null; // Reset click to avoid multiple triggers
            }
        }
        // Ensure only the globally selected button is highlighted
        this.selected = this.gameEngine.selectedButton === this;
    }

    draw(ctx) {
        
        ctx.drawImage(this.bgImage, this.x, this.y, this.width, this.height);
        if (this.selected) {
            ctx.strokeStyle = 'yellow';
            ctx.lineWidth = 3;
            ctx.strokeRect(this.x, this.y, this.width, this.height);
        } else {
            ctx.strokeStyle = null;
        }
    }

}