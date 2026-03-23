import { titleGeneration, createSceneNavButton, updateY} from "../utilities/UIHelper.js";
import StyleManager from "../styling.js"
export default class MenuScene extends Phaser.Scene {
    constructor() {
        super({ key: 'MenuScene' });
    }

    init(){
        this.margins = StyleManager.getMargins(this);

        this.title = 'RPN Teaching Tool';
        this.nextY = this.margins.topMarginVal;
    }

    create() {
        // Title
        this.titleDisplay = titleGeneration(this, this.nextY);

        updateY(this, this.titleDisplay);
        
        // Navigation buttons
        const buttonData = {
            'What is RPN?'              :   'BasicsScene',
            'Infix ↔ RPN'               :   'ConversionExplanationScene',
            'Expression Trees'          :   'TreeExplanationScene',
            'Evaluation'                :   'EvalExplanationScene',
            'Pseudocode Walkthrough'    :   'PseudoWalkScene',
            'Practice'                  :   'PracticeScene',
            'Settings'                  :   'SettingsScene',
            'Eval Test Stack Scene'     :   'EvalEntryScene',
            'Conv test scene'           :   'ConvEntryScene'
        };
        this.navButtonsArray = [];
        for (let label in buttonData){
            this.navButtonsArray.push(createSceneNavButton(
                this, 
                this.margins.leftMarginVal, 
                this.nextY, 
                label,
                buttonData[label]
            ));
            updateY(this, this.navButtonsArray[this.navButtonsArray.length - 1]);
        }
    }
}