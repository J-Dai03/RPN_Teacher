import { titleGeneration, createNavButton } from "../utilities/UIHelper.js";
import { myStyles } from "../styling.js";
export default class MenuScene extends Phaser.Scene {
    constructor() {
        super({ key: 'MenuScene' });
        this.title = 'RPN Teaching Tool'
    }

    create() {
        // Title
        this.titleDisplay = titleGeneration(this);

        let nextElementY = this.titleDisplay.y + this.titleDisplay.height + myStyles.spacing.verticalElementSpacing
        
        // Navigation buttons
        const buttonData = {
            labels: [
                'What is RPN?',
                'Infix ↔ RPN',
                'Expression Trees',
                'Evaluation',
                'Pseudocode Walkthrough',
                'Practice'
            ],
            destinations: [
                'BasicsScene',
                'ConversionExplanationScene',
                'TreeExplanationScene',
                'EvalExplanationScene',
                'PseudoWalkScene',
                'PracticeScene'
            ]
        };

        let navButtonsArray = [];

        for (let i = 0; i < buttonData.destinations.length; i++){
            navButtonsArray.push(createNavButton(
                this, 
                myStyles.spacing.leftMargin, 
                nextElementY, 
                buttonData.labels[i],
                buttonData.destinations[i],
                myStyles.buttonStyle
            ));

            nextElementY += navButtonsArray[i].height + myStyles.spacing.verticalElementSpacing
        }
    }
}