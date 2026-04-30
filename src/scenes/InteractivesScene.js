import { buttonToChar } from "../utilities/keyboardInputHandler.js";
import StyleManager from "../styling.js";
import { updateY, createButton, menuButton, titleGeneration, textBox } from "../utilities/UIHelper.js";
import { validRPN } from "../utilities/Questions.js";
import { evalRPN } from "../utilities/RPNEval.js";

export default class PracticeScene extends Phaser.Scene {
    constructor() {
        super({ key: 'InteractivesScene' });
        this.title = 'Interactive Demonstrations';
    }

    init(){
        this.margins = StyleManager.getMargins();

        this.inputString = "";
        this.currentFeedback = '';
        this.nextY = this.margins.topMarginVal;
        this.errorMessage = "";
    }

    create() {
        // Title
        this.titleDisplay = titleGeneration(this, this.nextY);
        updateY(this, this.titleDisplay);
        
        // Demo Start Buttons

        this.evalDemoButton = createButton(this,
            this.margins.leftMarginVal, 
            this.nextY, 
            `Demonstrate evaluation`, 
            () => this.startDemo("Evaluation"),
        );
        updateY(this, this.evalDemoButton);

        this.convDemoButton = createButton(this,
            this.margins.leftMarginVal, 
            this.nextY, 
            `Demonstrate conversion`, 
            () => this.startDemo("RPN2Infix"),
        );
        updateY(this, this.convDemoButton);

        this.treeDemoButton = createButton(this,
            this.margins.leftMarginVal, 
            this.nextY, 
            `Demonstrate expression trees`, 
            () => this.startDemo("Tree"),
        );

        updateY(this, this.treeDemoButton);


        // Displays
        this.inputDisplay = textBox(this, this.nextY, `Input Placeholder`);
        updateY(this, this.inputDisplay);

        this.errorDisplay = textBox(this, this.nextY, `Error Placeholder`);
        updateY(this, this.errorDisplay);


        // Input handling
        this.input.keyboard.on('keydown', (event) => {
            this.buttonPress(event.key);
        });


        // Menu button
        menuButton(this);

        this.updatePage();
    }

    updatePage(){
        if (this.inputString.length != 0){
            this.inputDisplay.setText(Array.from(this.inputString).join(', '));
        } else {
            this.inputDisplay.setText(`Type to enter your RPN expression`);
        }

        this.errorDisplay.setText(this.errorMessage);
    }


    buttonPress(button){     
        //console.log(`Button pressed: ${button}`)
        let processed = buttonToChar(button)
        //console.log(`processed: ${processed}`)
        if (processed != '!'){
            this.inputString += processed;
        }
        else if (button === 'Backspace') {
            this.inputString = this.inputString.slice(0, -1);
        }
        this.updatePage();
    }

    startDemo(demoType) {
        console.log("startDemo called");
        let sceneToStart = "";
        switch (demoType){
            case "Evaluation":
                sceneToStart = 'EvalSlidesScene';
                break;
            case "RPN2Infix":
                sceneToStart = 'ConvSlidesScene';
                break;
            case "Tree":
                sceneToStart = 'TreeScene';
                break;
        }

        if (this.inputString.length < 3 ){
            this.errorMessage = `Expression is too short`;
            this.updatePage();
        } else if (validRPN([...this.inputString]) == false){
            this.errorMessage = `Expression invalid`;
            this.updatePage();
        } else if (demoType == "Evaluation" && evalRPN(this.inputString).evalFailure == true){
            this.errorMessage = `Error: Unable to evaluate, possibly due to division by zero.`;
            this.updatePage();
        } else {
            console.log("Scene start attempt:")
            this.scene.start(sceneToStart, { expression : [...this.inputString]});
        }

        console.log("StartDemoCalled");
    }
}