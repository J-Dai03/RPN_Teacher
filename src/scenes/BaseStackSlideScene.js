import StyleManager from "../styling.js";
import { titleGeneration, menuButton, textBox, createButton, updateY, createEmptyStackDisplay} from "../utilities/UIHelper.js";
export class BaseStackSlide extends Phaser.Scene{
    constructor(key) {
        super(key);
    }

    /**
     * 
     * @param {*} sceneSpecificData An object with properties .maxStack, .slides, and .title
     */
    init(sceneSpecificData){
        this.maxStackSize = sceneSpecificData.maxStack;
        this.slideData = sceneSpecificData.slides;
        this.title = sceneSpecificData.title;
        this.slideIndex = 0;

        this.margins = StyleManager.getMargins();
        this.nextY = this.margins.topMarginVal;

        this.buttonStyle = StyleManager.getButtonStyle();
        this.stackStyle = StyleManager.getStackElementStyle()
    }

    /*
        this.slideData should be an array containing (number of slides) objects, each of this format:
        {
            stackState : [string],
            expressionRemaining: string,
            slideText: string
        }
        note: first item in stackState is bottom
    */

    create(){

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
            this.prevSlide.bind(this), 
            this.buttonStyle
            ).setVisible(false);
        this.slideNum = createButton(this,
            this.prevButton.x + this.prevButton.width, 
            this.nextY, 
            `Slide ${this.slideIndex + 1} of ${this.slideData.length}`, 
            () => {}, 
            this.buttonStyle);
        this.nextButton = createButton(this,
            this.slideNum.x + this.slideNum.width, 
            this.nextY, 
            "Next", 
            this.nextSlide.bind(this), 
            this.buttonStyle
        );

        updateY(this, this.nextButton);

        // Display slide
        this.slideTextDisplay = textBox(this, this.nextY, "Slide text placeholder");
        // Find max height of slideTextDisplay
        let maxHeight = 0;
        for (let i = 0; i < this.slideData.length; i++){
            this.slideTextDisplay.setText(this.slideData[i].slideText);
            maxHeight = Math.max(maxHeight, this.slideTextDisplay.height);
        }
        this.nextY = this.slideTextDisplay.y + maxHeight + this.margins.verticalElementSpacing;

        this.expressionDisplay = textBox(this, this.nextY, "expression to convert placeholder", 40);

        updateY(this, this.expressionDisplay);

        this.stackDisplay = createEmptyStackDisplay(this, this.nextY, this.maxStackSize, this.stackStyle);
        // Note: first item in array is bottom of stack

        this.updatePage();
    }

    updatePage(){
        // Update buttons
        this.prevButton.setVisible(this.slideIndex > 0);
        this.nextButton.setVisible(this.slideIndex < this.slideData.length - 1);

        // Update slide number
        this.slideNum.setText(`Slide ${this.slideIndex + 1} of ${this.slideData.length}`);

        const currentSlideData = this.slideData[this.slideIndex];

        // Update slides
        this.slideTextDisplay.setText(currentSlideData.slideText);
        if (currentSlideData.expressionRemaining.length != 0){
            this.expressionDisplay.setText(`To evaluate: ${currentSlideData.expressionRemaining.join(" ")}`);
        } else {
            this.expressionDisplay.setText("");
        }
        for (let i = 0; i < this.maxStackSize; i++){

            if (i >= currentSlideData.stackState.length){
                this.stackDisplay[i].setText("");
            } else {
                this.stackDisplay[i].setText(currentSlideData.stackState[i]);
            }
        }
    }

    prevSlide(){
        this.slideIndex--;
        this.updatePage();
    }
    nextSlide(){
        this.slideIndex++;
        this.updatePage();
    }
}