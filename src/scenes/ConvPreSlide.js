import {genPracticeProblem} from "../utilities/Questions.js";
import StyleManager from "../styling.js";
import { expressionToString } from "../utilities/RPNGenerator.js";

export default class ConvEntryScene extends Phaser.Scene {
    constructor() {

        super({ key: 'ConvEntryScene' });
        this.title = 'Enter an RPN expression to be converted';

        this.margins = StyleManager.getMargins();
        this.buttonStyle = StyleManager.getButtonStyle();
        this.expression = genPracticeProblem(3, "RPN2Infix").question;
    }

    create(){

        this.button = this.add.text(this.margins.leftMarginVal, this.margins.topMarginVal, 'Press me', this.buttonStyle).setOrigin(0).setInteractive();
        
        
        this.button.on('pointerdown', () => this.startSlide());

        this.button.on('pointerover', () => this.button.setStyle(StyleManager.getButtonHoverStyle()));

        this.button.on('pointerout', () => this.button.setStyle(StyleManager.getButtonStyle()));


        this.expressionDisplay = this.add.text(300, 300, expressionToString(this.expression), this.buttonStyle).setOrigin(0);

    }


    startSlide(){
        this.scene.start('ConvSlidesScene', { expression : this.expression });
    }
}