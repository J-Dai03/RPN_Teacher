export default class MenuScene extends Phaser.Scene {
    constructor() {
        super({ key: 'MenuScene' });
    }

    create() {
        // Title
        this.add.text(400, 100, 'RPN Teaching Tool', { fontSize: '48px', fill: '#fff' }).setOrigin(0.5);
        
        // Navigation buttons
        const buttonStyle = { fontSize: '24px', fill: '#fff', backgroundColor: '#4a4a4a', padding: { x: 20, y: 10 } };
        
        this.createButton(400, 200, 'What is RPN?', () => this.scene.start('BasicsScene'), buttonStyle);
        this.createButton(400, 250, 'Infix ↔ RPN', () => this.scene.start('ConversionExplanationScene'), buttonStyle);
        this.createButton(400, 300, 'Expression Trees', () => this.scene.start('TreeExplanationScene'), buttonStyle);
        this.createButton(400, 350, 'Evaluation', () => this.scene.start('EvalExplanationScene'), buttonStyle);
        this.createButton(400, 400, 'Pseudocode Walkthrough', () => this.scene.start('PseudoWalkScene'), buttonStyle);
        this.createButton(400, 450, 'Practice', () => this.scene.start('PracticeScene'), buttonStyle);
    }

    createButton(x, y, text, callback, style) {
        let button = this.add.text(x, y, text, style).setOrigin(0.5).setInteractive();
        button.on('pointerdown', callback);
        button.on('pointerover', () => button.setStyle({ backgroundColor: '#6b6b6b' }));
        button.on('pointerout', () => button.setStyle({ backgroundColor: '#4a4a4a' }));
    }
}