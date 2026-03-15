export default class PseudoWalkScene extends Phaser.Scene {
    constructor() {
        super({ key: 'PseudoWalkScene' });
    }

    create() {
        // Page text
        this.add.text(400, 100, 'Walkthough Placeholder', { fontSize: '20px', fill: '#fff' }).setOrigin(0.5);
        
        // Navigation buttons
        const buttonStyle = { fontSize: '20px', fill: '#fff', backgroundColor: '#4a4a4a', padding: { x: 20, y: 10 } };
        
        this.createButton(400, 500, 'Previous', () => this.prevText(), buttonStyle);
        this.createButton(600, 500, 'Next', () => this.nextText(), buttonStyle);
        this.createButton(50, 20, 'Menu', () => this.scene.start('MenuScene'), buttonStyle);
    }

    createButton(x, y, text, callback, style) {
        let button = this.add.text(x, y, text, style).setOrigin(0.5).setInteractive();
        button.on('pointerdown', callback);
        button.on('pointerover', () => button.setStyle({ backgroundColor: '#6b6b6b' }));
        button.on('pointerout', () => button.setStyle({ backgroundColor: '#4a4a4a' }));
    }

    nextText() {
        //To Do
    }
    prevText() {
        //To Do
    }
}