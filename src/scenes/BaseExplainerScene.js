export class BaseExplainer extends Phaser.Scene{
    constructor(key) {
        super(key);
    }

    init(sceneSpecificData){
        this.pages = sceneSpecificData.pages || ["No pages loaded"];
        this.title = sceneSpecificData.title || "No title loaded";
        this.pageIndex = 0;
    }

    create(){
        // NOTE: Currently using ai-generated code for the styling
        // TO DO: Experiment and create own styling
        const buttonStyle = { fontSize: '20px', fill: '#fff', backgroundColor: '#4a4a4a', padding: { x: 20, y: 10 } };

        // Add menu button
        this.createButton(50, 20, 'Menu', () => this.scene.start('MenuScene'), buttonStyle);

        // Add title
        this.titleDisplay = this.add.text(100, 100, this.title, {
            fontSize: '32px',
            fill: '#fff',
            fontStyle: 'bold'
        }).setOrigin(0);

        // Add navigation button and page number
        this.prevButton = this.createButton(100, 150, "Previous", () => this.prevPage(), buttonStyle).setVisible(false);
        this.pageNum = this.createButton(300, 150, `Page ${this.pageIndex + 1} of ${this.pages.length}`, () => {}, buttonStyle);
        this.nextButton = this.createButton(500, 150, "Next", () => this.nextPage(), buttonStyle);

        // Display page text
        this.textDisplay = this.add.text(100, 200, this.pages[0], {
            fontSize: '24px',
            fill: '#fff',
            wordWrap: { width: 800 },
            align: 'left'
        }).setOrigin(0);
    }

    updatePage(){
        // Update buttons
        this.prevButton.setVisible(this.pageIndex > 0);
        this.nextButton.setVisible(this.pageIndex < this.pages.length - 1);

        // Update page number
        this.pageNum.setText(`Page ${this.pageIndex + 1} of ${this.pages.length}`);

        // Update page text
        this.textDisplay.setText(this.pages[this.pageIndex]);
    }

    createButton(x, y, text, action, style) {
        let button = this.add.text(x, y, text, style).setOrigin(0).setInteractive();
        button.on('pointerdown', action);
        button.on('pointerover', () => button.setStyle({ backgroundColor: '#6b6b6b' }));
        button.on('pointerout', () => button.setStyle({ backgroundColor: '#4a4a4a' }));
        return button;
    }

    prevPage(){
        this.pageIndex--;
        this.updatePage();
    }
    nextPage(){
        this.pageIndex++;
        this.updatePage();
    }
}