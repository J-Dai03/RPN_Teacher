class BootScene extends Phaser.Scene {
    constructor() {
        super({ key: 'BootScene' });
    }

    preload() {
        // Load assets
        this.load.image('button-bg', 'assets/images/button-bg.png');
        this.load.image('stack-bg', 'assets/images/stack-bg.png');
        // Add loading bar
        let progressBar = this.add.graphics();
        // ... loading progress logic
    }

    create() {
        this.scene.start('MenuScene');
    }
}