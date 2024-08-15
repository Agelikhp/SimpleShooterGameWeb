class PowerUp {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.width = 20;
        this.height = 20;
        this.type = Math.random() < 0.5 ? 'life' : 'score'; // Randomly choose type
    }

    draw(ctx) {
        ctx.fillStyle = this.type === 'life' ? 'yellow' : 'orange';
        ctx.fillRect(this.x, this.y, this.width, this.height);
    }

    update() {
        this.y += 2; // Move down the screen
    }
}

// Export the PowerUp class
export default PowerUp;