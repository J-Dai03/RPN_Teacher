import StyleManager from "../styling.js";
import { updateY, createButton, menuButton, titleGeneration, textBox } from "../utilities/UIHelper.js";

export default class SettingsScene extends Phaser.Scene {
    constructor() {
        super({ key: 'SettingsScene' });
        this.title = 'Settings';
    }

    init(){
        this.margins = StyleManager.getMargins();
        this.nextY = this.margins.topMarginVal;
    }

    create() {
        // Title
        this.titleDisplay = titleGeneration(this, this.nextY);
        updateY(this, this.titleDisplay);

        this.menuButton = menuButton(this);
        
        // Text size buttons
        const textSizes = StyleManager.getTextSizes();

        let currentX = this.margins.leftMarginVal;
        this.textSizeLabel = createButton(this,
            currentX, 
            this.nextY, 
            "Text size:",
            ()=>{}
        );

        currentX = this.textSizeLabel.x + this.textSizeLabel.width + this.margins.horizontalElementSpacing;

        this.sizeButtons = []
        for (let i = 0; i < textSizes.length; i++){
            let newButton = createButton(this,
                currentX, 
                this.nextY, 
                textSizes[i], 
                () => {StyleManager.setTextScale(textSizes[i]); this.updatePage()}
            );
            currentX = newButton.x + newButton.width;

            this.sizeButtons.push(newButton);
        }

        updateY(this, this.sizeButtons[0]);

        // Colour scheme buttons
        const colSchemes = StyleManager.getColSchemes();

        currentX = this.margins.leftMarginVal;
        this.colSchemeLabel = createButton(this,
            currentX, 
            this.nextY, 
            "Colour Scheme:",
            ()=>{}
        );

        currentX = this.colSchemeLabel.x + this.colSchemeLabel.width + 5;

        this.colButtons = []
        for (let i = 0; i < colSchemes.length; i++){
            let newButton = createButton(this,
                currentX, 
                this.nextY, 
                colSchemes[i], 
                () => {StyleManager.setColScheme(colSchemes[i]); this.updatePage()}
            );
            currentX = newButton.x + newButton.width;

            this.colButtons.push(newButton);
        }
    }
    updatePage(){

        // Update styles
        this.titleDisplay.setStyle(StyleManager.getTitleStyle());
        this.menuButton.setStyle(StyleManager.getButtonStyle());

        this.textSizeLabel.setStyle(StyleManager.getButtonStyle());
        for (let i = 0; i < this.sizeButtons.length; i++){
            this.sizeButtons[i].setStyle(StyleManager.getButtonStyle());
        }

        this.colSchemeLabel.setStyle(StyleManager.getButtonStyle());
        for (let i = 0; i < this.colButtons.length; i++){
            this.colButtons[i].setStyle(StyleManager.getButtonStyle());
        }

        // Update positions
        this.positionElements();

    }

    positionElements(){
        this.nextY = this.margins.topMarginVal;
        this.titleDisplay.setPosition(this.margins.leftMarginVal, this.nextY);

        updateY(this, this.titleDisplay);

        this.textSizeLabel.setPosition(this.margins.leftMarginVal, this.nextY);
        let currentX = this.textSizeLabel.x + this.textSizeLabel.width + this.margins.horizontalElementSpacing;
        for (let i = 0; i < this.sizeButtons.length; i++){
            this.sizeButtons[i].setPosition(currentX, this.nextY);
            currentX += this.sizeButtons[i].width;
        }

        updateY(this, this.textSizeLabel);

        this.colSchemeLabel.setPosition(this.margins.leftMarginVal, this.nextY);
        currentX = this.colSchemeLabel.x + this.colSchemeLabel.width + this.margins.horizontalElementSpacing;
        for (let i = 0; i < this.colButtons.length; i++){
            this.colButtons[i].setPosition(currentX, this.nextY);
            currentX += this.colButtons[i].width;
        }
    }
}