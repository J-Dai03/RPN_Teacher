import StyleManager from "../styling.js";
import { titleGeneration, menuButton, textBox, createButton, updateY, treeDisplayGenPrecursor} from "../utilities/UIHelper.js";
import { genPracticeProblem } from "../utilities/Questions.js";
import { RPN2Infix } from "../utilities/RPNToInfixConversion.js";

export default class TreeScene extends Phaser.Scene{
    constructor() {
        super({ key: 'TreeScene' });
        this.title = 'Evaluation Tree demonstration';
    }

    init(data){
        this.myExpression = data.expression

        this.margins = StyleManager.getMargins();
        this.nextY = this.margins.topMarginVal;

        this.buttonStyle = StyleManager.getButtonStyle();
        this.stackStyle = StyleManager.getStackElementStyle()
    }

    create(){

        // Add menu button
        menuButton(this);

        // Add title
        this.titleDisplay = titleGeneration(this, this.nextY);

        updateY(this, this.titleDisplay);

        this.textDisplay = textBox(this, this.nextY, `The RPN expression (${this.myExpression}) can be converted into this expression tree. 
Note that the yellow dots represent postfix traversal and thus, and the blue dots show the order for in-order traversal, and thus, infix notation. 

This shows that the infix form of the expression is ${RPN2Infix(this.myExpression).resultantExpression}.`);

        updateY(this, this.textDisplay);

        let availableSpace = {
            height  :   (this.cameras.main.height - this.nextY) - this.margins.topMarginVal,
            width   :   this.cameras.main.width - (2 * this.margins.leftMarginVal)
        }     

        this.TreeDisplay = treeDisplayGenPrecursor(this, 
            this.myExpression, 
            this.margins.leftMarginVal, 
            this.nextY, 
            availableSpace.width, 
            availableSpace.height
        )
    }
}