import { genPracticeProblem, checkAnswer } from "../utilities/Questions.js";
import { buttonToChar } from "../utilities/keyboardInputHandler.js";
import StyleManager from "../styling.js";
import { updateY, createButton, menuButton, titleGeneration, textBox } from "../utilities/UIHelper.js";

export default class PracticeScene extends Phaser.Scene {
    constructor() {
        super({ key: 'PracticeScene' });
        this.title = 'Practice Questions';
    }

    init(){
        this.margins = StyleManager.getMargins();

        this.problem = genPracticeProblem(1, "Evaluation");
        this.questionAnswered = false;
        this.inputString = "";
        this.currentFeedback = '';
        this.nextY = this.margins.topMarginVal;
    }

    create() {
        // Title
        this.titleDisplay = titleGeneration(this, this.nextY);
        updateY(this, this.titleDisplay);
        
        // Level Buttons

        let evalLevelButtons = [];
        let convLevelButtons = [];

        let positioning = {
            x: this.margins.leftMarginVal,
            evalY: this.nextY
        }
        for (let i = 0; i < 3; i++){
            evalLevelButtons.push(createButton(this,
                positioning.x, 
                positioning.evalY, 
                `Evaluation Level ${i + 1}`, 
                () => this.setProblem("Evaluation", i + 1),
            ));
            convLevelButtons.push(createButton(this,
                positioning.x, 
                evalLevelButtons[i].y + evalLevelButtons[i].height, 
                `Conversion Level ${i + 1}`, 
                () => this.setProblem("RPN2Infix", i + 1),
            ));
            positioning.x += evalLevelButtons[i].width
        }
        updateY(this, convLevelButtons[0]);

        this.problemDisplay = textBox(this, this.nextY, `Problem Placeholder`);
        updateY(this, this.problemDisplay);

        this.inputDisplay = textBox(this, this.nextY, `Input Placeholder`);
        updateY(this, this.inputDisplay);

        // Input handling
        this.input.keyboard.on('keydown', (event) => {
            this.buttonPress(event.key);
        });

        this.submitButton = createButton(this,
            this.margins.leftMarginVal, 
            this.nextY, 
            'Check answer', 
            this.checkSolution.bind(this),
        );
        updateY(this, this.submitButton);

        this.demoButton = createButton(this,
            this.margins.leftMarginVal, 
            this.nextY, 
            `Show me how`, 
            () => this.startDemo(),
        );
        updateY(this, this.demoButton);

        this.feedbackDisplay = textBox(this, this.nextY, `Feedback Placeholder`);
        updateY(this, this.feedbackDisplay);

        // Menu button
        menuButton(this);

        this.updatePage();
    }

    updatePage(){
        let actionText = "";
        switch (this.problem.type){
            case "Evaluation":
                actionText = "Evaluate ";
                break;
            case "RPN2Infix":
                actionText = "Convert to infix notation: ";
                break;
            default:
                // Unsupported problem type
                actionText = `?unknown problem type: ${this.problem.type}`;
        }
        this.problemDisplay.setText(`${actionText}${this.problem.question.join(" ")}`);

        if (this.inputString.length != 0){
            switch (this.problem.type){
                case "Evaluation":
                    this.inputDisplay.setText(`Answer: ${this.inputString}`);
                    break;
                case "RPN2Infix":
                    this.inputDisplay.setText(`Answer: ${this.inputString}`);
                    break;
                default:
                    // Unsupported problem type
                    return false;
            }
        } else {
            this.inputDisplay.setText(`Type to enter your answer`);
        }

        this.feedbackDisplay.setText(this.currentFeedback);
        this.feedbackDisplay.setVisible(this.questionAnswered);
    }

    setProblem(type, difficulty) {
        this.problem = genPracticeProblem(difficulty, type);

        this.questionAnswered = false;
        this.inputString = '';

        this.updatePage();
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
        else if (button === 'Enter') {
            this.checkSolution();
        }
        this.updatePage();
    }

    checkSolution() {
        this.questionAnswered = true;
        
        if (checkAnswer(this.problem, this.inputString)){
            this.currentFeedback = 'Correct!';
        } else {
            this.currentFeedback = `Incorrect! The correct answer is ${this.problem.solution}`;
        }

        this.updatePage();
    }

    startDemo() {
        let sceneToStart = "";
        switch (this.problem.type){
            case "Evaluation":
                sceneToStart = 'EvalSlidesScene';
                break;
            case "RPN2Infix":
                sceneToStart = 'ConvSlidesScene';
                break;
            default:
                console.log("No scene for problem type found");
                break;
        }
        if (sceneToStart.length != 0) {
            this.scene.start(sceneToStart, { expression : this.problem.question});
        }
    }
}