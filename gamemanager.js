class gameManager {

    constructor(gameEngine) {
        this.playing = false
        this.gameEngine = gameEngine
        
    }

    startGame() {

    }

    update() {
        // if (this.gameEngine.click) {
        //     console.log(this.gameEngine.click);
        //     this.gameEngine.click = null;
        // }
    }

    startGame() {
        this.gameEngine.towerManager = new TowerManager(this.gameEngine);
        this.gameEngine.grid = new Grid(this.gameEngine);
        this.gameEngine.waveManager = new WaveManager(this.gameEngine);
        this.gameEngine.player = new Player(this.gameEngine);
        this.gameEngine.allybuttons = new allyButtons(this.gameEngine)

        //this.gameEngine.addEntity(this.gameEngine.towerManager);
        this.gameEngine.addEntity(this.gameEngine.waveManager);
    }

    startbutton(ctx) {
        const mouse = this.gameEngine?.mouse;
        const mousex = mouse?.x;
        const mousey = mouse?.y;
        //console.log(mousex, mousey);

        const x = 20;
        const y = 20;
        const width = 220;
        const height = 64;
        const radius = Math.min(12, height / 4);

        // helper: rounded rect path
        const roundRectPath = (ctx, x, y, w, h, r) => {
            ctx.beginPath();
            ctx.moveTo(x + r, y);
            ctx.lineTo(x + w - r, y);
            ctx.quadraticCurveTo(x + w, y, x + w, y + r);
            ctx.lineTo(x + w, y + h - r);
            ctx.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
            ctx.lineTo(x + r, y + h);
            ctx.quadraticCurveTo(x, y + h, x, y + h - r);
            ctx.lineTo(x, y + r);
            ctx.quadraticCurveTo(x, y, x + r, y);
            ctx.closePath();
        };

        // hit test for rounded rect
        const isPointInRoundedRect = (px, py, x, y, w, h, r) => {
            if (px == null || py == null) return false;
            if (px < x || px > x + w || py < y || py > y + h) return false;
            const cx = Math.min(Math.max(px, x + r), x + w - r);
            const cy = Math.min(Math.max(py, y + r), y + h - r);
            const dx = px - cx;
            const dy = py - cy;
            return (dx * dx + dy * dy) <= r * r;
        };

        const hovering = isPointInRoundedRect(mousex, mousey, x, y, width, height, radius);

        // change cursor if canvas ref exists
        if (this.gameEngine?.canvas) {
            this.gameEngine.canvas.style.cursor = hovering ? 'pointer' : '';
        }

        ctx.save();

        // shadow
        ctx.shadowColor = 'rgba(0,0,0,0.25)';
        ctx.shadowBlur = 8;
        ctx.shadowOffsetY = 4;

        // colors (use hover variants if hovering)
        const bg = hovering ? (this.hoverBgColor ?? '#29c36a') : (this.bgColor ?? '#2ecc71');
        const stroke = hovering ? (this.hoverBorderColor ?? '#1e8449') : (this.borderColor ?? '#27ae60');

        // button fill
        ctx.fillStyle = bg;
        roundRectPath(ctx, x, y, width, height, radius);
        ctx.fill();

        // subtle highlight when hovering
        if (hovering) {
            ctx.globalAlpha = 0.12;
            ctx.fillStyle = '#ffffff';
            roundRectPath(ctx, x + 2, y + 2, width - 4, height - 4, Math.max(6, radius - 2));
            ctx.fill();
            ctx.globalAlpha = 1;
        }

        // border
        ctx.shadowColor = 'transparent';
        ctx.lineWidth = this.borderWidth ?? 2;
        ctx.strokeStyle = stroke;
        roundRectPath(ctx, x, y, width, height, radius);
        ctx.stroke();

        // text
        ctx.fillStyle = this.textColor ?? '#ffffff';
        ctx.font = `${this.fontSize ?? 22}px ${this.fontFamily ?? 'Arial, sans-serif'}`;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(this.label ?? 'Start Game', x + width / 2, y + height / 2);

        ctx.restore();

        const mouseclick = this.gameEngine?.click;
        const mousexclick = mouseclick?.x;
        const mouseyclick = mouseclick?.y;
        const clicked = isPointInRoundedRect(mousexclick, mouseyclick, x, y, width, height, radius);
        console.log(mousexclick, mouseyclick, clicked);
        if (clicked) {
            console.log("clicked Start button");
            this.playing = true;
            this.startGame();
        }
        this.gameEngine.click = null;
    }

    draw(ctx) {
        if (!this.playing) {
            this.startbutton(ctx)
        }
    }



}
