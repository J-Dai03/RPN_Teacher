import StyleManager from "../styling.js";
import { titleGeneration, menuButton, textBox, createButton, updateY} from "../utilities/UIHelper.js";
export class BaseExplainer extends Phaser.Scene{
    constructor(key) {
        super(key);
    }

    init(sceneSpecificData){
        this.pages = sceneSpecificData.pages || ["No pages loaded"];
        this.title = sceneSpecificData.title || "No title loaded";
        this.pageIndex = 0;

        this.margins = StyleManager.getMargins();
        this.nextY = this.margins.topMarginVal;

        this.buttonStyle = StyleManager.getButtonStyle();

        //var div = document.getElementById('gameContainer');
        //div.style.backgroundColor = StyleManager.getConfigStyle().bgCol;
    }

    create(){
        // NOTE: Currently using ai-generated code for the styling
        // TO DO: Experiment and create own styling

        // Add menu button
        menuButton(this);

        // Add title
        this.titleDisplay = titleGeneration(this, this.nextY);

        updateY(this, this.titleDisplay);

        // Add page navigation buttons and page number
        this.prevButton = createButton(this,
            this.margins.leftMarginVal, 
            this.nextY, 
            "Previous", 
            this.prevPage.bind(this), 
            this.buttonStyle
            ).setVisible(false);
        this.pageNum = createButton(this,
            this.prevButton.x + this.prevButton.width, 
            this.nextY, 
            `Page ${this.pageIndex + 1} of ${this.pages.length}`, 
            () => {}, 
            this.buttonStyle);
        this.nextButton = createButton(this,
            this.pageNum.x + this.pageNum.width, 
            this.nextY, 
            "Next", 
            this.nextPage.bind(this), 
            this.buttonStyle
        );

        updateY(this, this.nextButton);

        // Display page text
        this.textDisplay = textBox(this, this.nextY, this.pages[0]);
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

    prevPage(){
        this.pageIndex--;
        this.updatePage();
    }
    nextPage(){
        this.pageIndex++;
        this.updatePage();
    }
}