class Button {

    constructor(gameEngine, label, price, x, y, onClick) {
        this.gameEngine = gameEngine;
        this.label = label;
        this.price = price;
        this.onClick = onClick;
        this.width = 100;
        this.height = 50;
        this.x = x; 
        this.y = y;
        this.selected = false;
    }

    update() {
        if (this.gameEngine.click) {
            const mouseX = this.gameEngine.click.x;
            const mouseY = this.gameEngine.click.y;

            if (mouseX >= this.x && mouseX <= this.x + this.width &&
                mouseY >= this.y && mouseY <= this.y + this.height) {
                this.onClick(this);
            }
        }
        // Ensure only the globally selected button is highlighted
        this.selected = this.gameEngine.selectedButton === this;
    }

    draw(ctx) {
        ctx.fillStyle = this.selected ? "lightblue" : "gray";
        ctx.fillRect(this.x, this.y, this.width, this.height);
        ctx.fillStyle = "white";
        ctx.font = "12px Arial";
        ctx.textAlign = "center";
        ctx.fillText(this.label, this.x + this.width / 2, this.y + this.height / 2 - 5);
        ctx.font = "10px Arial";
        ctx.fillText(this.price, this.x + this.width / 2, this.y + this.height / 2 + 8);
    }

}