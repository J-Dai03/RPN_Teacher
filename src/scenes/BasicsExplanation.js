import {BaseExplainer} from '../scenes/BaseExplainerScene.js'

export default class BasicsScene extends BaseExplainer {
    constructor(){
        super({ key: 'BasicsScene' });
    }
    init(data){
        super.init({
            pages: [
`
Reverse Polish Notation (or RPN for short) is a different way to represent mathematical expressions. It is also known as postfix notation.

When evaluating 'normal' expressions (also known as infix expressions), the order in which we consider the operators can change depending on which operators are where in the expression. 

These rules are referred to as the order of operations, and are often referred to PEMDAS, BODMAS, or BIDMAS in English speaking areas.
`,               
`
Reverse Polish Notation has a much simpler rule for the order of evaluation: Left to right.

This means it is much easier to write an algorithm for a computer to calculate an expression written in RPN, compared to the same expression in infix.

Additionally, the computer can run the calculation slightly faster.
`,
`
So why isn't RPN the normal way to write mathematical expressions?
The reason is that it is much more intuitive to humans; it much better matches the way humans describe things in their natural speech.

For example, if I wanted to evenly share six slices of pizza between three people, I would think about the way I calculate how many slices each person would get as 6 slices shared by 3 people. 
This matches the infix expression format: 6 ÷ 3

On the other hand, the same expression in RPN would be 6 3 ÷, a better match to a thought process like "6 slices, given to 3 people, who need to share it evenly".
`
            ],
            title: "What is RPN?"
        });
    }
    create() {
        super.create();
    }
}