import {BaseExplainer} from '../scenes/BaseExplainerScene.js'

export default class EvalExplanationScene extends BaseExplainer {
    constructor(){
        super({ key: 'EvalExplanationScene' });
    }
    init(){
        super.init({
            pages: [
`
Evaluating an RPN expression may be unintuitive, but there is a very simple algorithm to do so.
1. Create an empty stack
2. Remove the leftmost item of the expression.
3. If the item is an operand (e.g. 3 or x), push it to the stack.
4. If the item is an operator (e.g. + or ÷), 
    4a. Pop the top element off the stack, we will refer to it as b.
    4b. Pop the top element off the stack, we will refer to it as a.
    4c. Compute a operator b and push the result to the stack
5. If there are any items left in the expression, go to step 2.
6. There should be only one item in the stack, which is the value of the RPN expression.
`,
`
[Insert example here]
`
            ],
            title: "How do we evaluate?"
        });
    }
    create() {
        super.create();
    }
}