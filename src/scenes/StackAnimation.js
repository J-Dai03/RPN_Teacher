export default class ConvAnimationScene extends Phaser.Scene {
    constructor() {
        super({ key: 'EvaluationScene' });
    }

    create() {
        this.add.text(400, 50, 'RPN Evaluation', { fontSize: '32px', fill: '#fff' }).setOrigin(0.5);
        
        // Input for RPN expression
        this.rpnInput = new ExpressionInput(this, 400, 120, '3 4 2 * +');
        
        // Stack visualiser
        this.stack = new StackVisualiser(this, 400, 250, { maxSize: 10 });
        
        // Buttons
        this.createAllButtons();
        
        // Step through evaluation
        this.createStepControls();


        this.createButton(50, 20, 'Menu', () => this.scene.start('MenuScene'), buttonStyle);
    }

    createAllButtons() {
        // Step button
        this.createButton(300, 450, 'Step', () => this.stepEvaluation());
        
        // Reset button
        this.createButton(500, 450, 'Reset', () => this.resetEvaluation());
        
        // Auto-play button
        this.createButton(400, 500, '▶ Auto Play', () => this.autoPlay());
    }

    stepEvaluation() {
        // Animate each step:
        // 1. Read next token
        // 2. Push number or pop operands
        // 3. Apply operation
        // 4. Push result
        // 5. Update visualization with animation
    }
}