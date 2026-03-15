import { myStyles } from "../styling.js";
import { titleGeneration, menuButton, textBox, createButton, createNavButton} from "../utilities/UIHelper.js";
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

        // Add menu button
        menuButton(this);

        // Add title
        this.titleDisplay = titleGeneration(this);

        let nextElementY = this.titleDisplay.y + this.titleDisplay.height + myStyles.spacing.verticalElementSpacing;

        // Add navigation buttons and page number
        this.prevButton = createButton(this,
            myStyles.spacing.leftMargin, 
            nextElementY, 
            "Previous", 
            this.prevPage.bind(this), 
            myStyles.buttonStyle
            ).setVisible(false);
        this.pageNum = createButton(this,
            this.prevButton.x + this.prevButton.width, 
            nextElementY, 
            `Page ${this.pageIndex + 1} of ${this.pages.length}`, 
            () => {}, 
            myStyles.buttonStyle);
        this.nextButton = createButton(this,
            this.pageNum.x + this.pageNum.width, 
            nextElementY, 
            "Next", 
            this.nextPage.bind(this), 
            myStyles.buttonStyle
        );

        nextElementY += this.nextButton.height + myStyles.spacing.verticalElementSpacing

        // Display page text
        this.textDisplay = textBox(this, nextElementY, this.pages[0]);
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