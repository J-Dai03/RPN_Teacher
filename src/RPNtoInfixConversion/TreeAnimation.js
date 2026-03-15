class ExpressionTreeScene extends Phaser.Scene {
    constructor() {
        super({ key: 'ExpressionTreeScene' });
        this.treeVisualizer = null;
        this.currentExpression = "3 + 4 * 2";
    }

    create() {
        this.add.text(400, 50, 'Expression Trees', { fontSize: '32px', fill: '#fff' }).setOrigin(0.5);
        
        // Expression input
        let input = new ExpressionInput(this, 400, 120, this.currentExpression);
        
        // Tree visualization area
        this.treeVisualizer = new TreeVisualizer(this, 400, 300);
        
        // Update tree button
        let updateBtn = this.createButton(400, 500, 'Update Tree', () => {
            let tree = buildExpressionTree(input.getValue());
            this.treeVisualizer.renderTree(tree);
            
            // Show both notations
            let rpn = infixToRPN(input.getValue());
            this.add.text(400, 550, `RPN: ${rpn}`, { fontSize: '20px', fill: '#ff0' }).setOrigin(0.5);
        });

        // Back button
        this.createButton(100, 550, '← Back', () => this.scene.start('MenuScene'));
    }

    createButton(x, y, text, callback) {
        let button = this.add.text(x, y, text, { fontSize: '20px', fill: '#fff', backgroundColor: '#4a4a4a', padding: { x: 10, y: 5 } })
            .setInteractive()
            .on('pointerdown', callback);
        return button;
    }
}