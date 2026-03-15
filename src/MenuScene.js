class MenuScene extends Phaser.Scene {
    constructor() {
        super({ key: 'MenuScene' });
    }

    create() {
        // Title
        this.add.text(400, 100, 'RPN Teaching Tool', { fontSize: '48px', fill: '#fff' }).setOrigin(0.5);
        
        // Navigation buttons
        const buttonStyle = { fontSize: '24px', fill: '#fff', backgroundColor: '#4a4a4a', padding: { x: 20, y: 10 } };
        
        this.createButton(400, 200, 'What is RPN?', () => this.scene.start('ExplanationScene'), buttonStyle);
        this.createButton(400, 280, 'Expression Trees', () => this.scene.start('ExpressionTreeScene'), buttonStyle);
        this.createButton(400, 360, 'Infix ↔ RPN', () => this.scene.start('ConversionScene'), buttonStyle);
        this.createButton(400, 440, 'Evaluation', () => this.scene.start('EvaluationScene'), buttonStyle);
        this.createButton(400, 520, 'Practice', () => this.scene.start('PracticeScene'), buttonStyle);
    }

    createButton(x, y, text, callback, style) {
        let button = this.add.text(x, y, text, style).setOrigin(0.5).setInteractive();
        button.on('pointerdown', callback);
        button.on('pointerover', () => button.setStyle({ backgroundColor: '#6a6a6a' }));
        button.on('pointerout', () => button.setStyle({ backgroundColor: '#4a4a4a' }));
    }
}