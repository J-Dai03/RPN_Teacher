import {BaseExplainer} from '../scenes/BaseExplainerScene.js'

export default class ConversionExplanationScene extends BaseExplainer {
    constructor(){
        super({ key: 'ConversionExplanationScene' });
    }
    init(data){
        super.init({
            pages: [
`
Despite the totally different philosophies between RPN and infix notation, it is quite easy to convert from RPN to infix.

RPN to infix algorithm:
1. Create a stack data structure.
2. Consider the first item of the expression.
3. If the item is an operand (e.g. 3 or x), push it to the stack.
4. If the item is an operator (e.g. + or ÷), 
    4a. Pop the top element off the stack and store it as b.
    4b. Pop the top element off the stack and store it as a.
    4c. Create the string "(a operator b)", and push the result to the stack.
5. Consider the next item of the expression and go to step 3. If there are no more items, move on to step 6.
6. There should be one item left in the stack. Pop it off and output it.

Note that this returns the fully parenthesised version of the infix expression, as accounting for order of operations is beyond the scope of this tool.
Converting from infix expressions to RPN expression is also beyond the scope of this tool.
`

            ],
            title: "How do we convert?"
        });
    }
    create() {
        super.create();
    }
}