import { evaluationProblem, RPN2InfixConversionProblem, checkAnswer } from "../utilities/questions.js";

export default class PracticeScene extends Phaser.Scene {
    constructor() {
        super({ key: 'PracticeScene' });
        this.problem = {}
        this.questionAnswered = false;
        this.inputString = "";
        this.currentFeedback = '';
    }

    preload(){
        this.problem = evaluationProblem(1);
        this.questionAnswered = false;
        this.inputString = "";
        this.currentFeedback = '';
    }

    create() {
        // Title
        this.add.text(100, 100, 'Practice Questions', { fontSize: '48px', fill: '#fff' }).setOrigin(0);
        
        // Buttons
        const buttonStyle = { fontSize: '20px', fill: '#fff', backgroundColor: '#4a4a4a', padding: { x: 20, y: 10 } };

        let positioning = {
            startX: 100,
            Xinterval: 260,
            startY: 170,
            Yinterval: 40
        }
        for (let i = 0; i < 3; i++){
            this.createButton(
                positioning.startX + i * positioning.Xinterval, 
                positioning.startY, 
                `Evaluation Level ${i + 1}`, 
                () => this.setProblem("Evaluation", i + 1),
                buttonStyle
            );
            this.createButton(
                positioning.startX + i * positioning.Xinterval, 
                positioning.startY + positioning.Yinterval, 
                `Conversion Level ${i + 1}`, 
                () => this.setProblem("RPN2Infix", i + 1),
                buttonStyle
            );
        }

        this.problemDisplay = this.add.text(100, 270, `Problem Placeholder`, { fontSize: '48px', fill: '#fff',
            wordWrap: { width: 800 },
            align: 'left' }).setOrigin(0);

        this.inputDisplay = this.add.text(100, 350, `Input Placeholder`, { fontSize: '48px', fill: '#fff',
            wordWrap: { width: 800 },
            align: 'left' }).setOrigin(0);

        // Input handling
        this.input.keyboard.on('keydown', (event) => {
            this.buttonPress(event.key);
        });

        this.submitButton = this.createButton(100, 450, 'Check answer', () => this.checkSolution(), buttonStyle);

        this.feedbackDisplay = this.add.text(100, 500, 'FeedbackPlaceholder', {
            fontSize: '24px',
            fill: '#fff',
            wordWrap: { width: 800 },
            align: 'left'
        }).setOrigin(0);

        // Menu button
        this.createButton(50, 20, 'Menu', () => this.scene.start('MenuScene'), buttonStyle);

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

    createButton(x, y, text, callback, style) {
        let button = this.add.text(x, y, text, style).setOrigin(0).setInteractive();
        button.on('pointerdown', callback);
        button.on('pointerover', () => button.setStyle({ backgroundColor: '#6b6b6b' }));
        button.on('pointerout', () => button.setStyle({ backgroundColor: '#4a4a4a' }));
    }

    setProblem(type, difficulty) {
        switch (type){
            case "Evaluation":
                this.problem = evaluationProblem(difficulty);
                break;
            case "RPN2Infix":
                this.problem = RPN2InfixConversionProblem(difficulty);
                break;
            default:
                // Unsupported problem type
                return false;
        }

        this.questionAnswered = false;
        this.inputString = '';

        this.updatePage();
    }

    buttonPress(button){
        console.log(`Button pressed: ${button}`);
        //const myButtons = ['+', '-', '(', ')'];        
        if (button === 'Backspace') {
            this.inputString = this.inputString.slice(0, -1);
        }
        else if (/^[a-z0-9\-+()]$/.test(button)) {
            this.inputString += button;
        }
        else if (button === '*') {
            this.inputString += '×';
        }
        else if (button === '/') {
            this.inputString += '÷';
        }
        else if (button === 'Backspace') {
            this.inputString = this.inputString.slice(0, -1);
        }
        else if (button === 'Enter') {
            this,this.checkSolution();
        }
        this.updatePage();
    }

    checkSolution() {

        this.questionAnswered = true;

        /*
        let correctness = true
        switch (this.problem.type){
            case "Evaluation":
                correctness = toString(problem.solution) === toString(answer);
            case "RPN2Infix":
                correctness = problem.solution === answer;
            default:
                // Unsupported problem type
                correctness = false;
        }
        */
        
        if (checkAnswer(this.problem, this.inputString)){
            this.currentFeedback = 'Correct!';
        } else {
            this.currentFeedback = `Incorrect! The correct answer is ${this.problem.solution}`;
        }
        //this.currentFeedback = `Solution: ${this.problem.solution}`;

        this.updatePage();
    }
}