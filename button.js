class Button {

    constructor(gameEngine, label, onClick) {
        this.gameEngine = gameEngine;
        this.label = label;
        this.onClick = onClick;
        this.width = 100;
        this.height = 50;
        this.x = 0; 
        this.y = 550;
        this.selected = false;
    }

    update() {
        if (this.gameEngine.click) {
            const mouseX = this.gameEngine.click.x;
            const mouseY = this.gameEngine.click.y;

            if (mouseX >= this.x && mouseX <= this.x + this.width &&
                mouseY >= this.y && mouseY <= this.y + this.height) {
                this.onClick(this);
                this.selected = true;
                this.gameEngine.click = null; // Reset click to avoid multiple triggers
            } else {
                this.selected = false;
            }
        }
    }

    draw(ctx) {
        ctx.fillStyle = this.selected ? "lightblue" : "gray";
        ctx.fillRect(this.x, this.y, this.width, this.height);
        ctx.fillStyle = "white";
        ctx.font = "12px Arial";
        ctx.textAlign = "center";
        ctx.fillText(this.label, this.x + this.width / 2, this.y + this.height / 2 + 4);
    }

}