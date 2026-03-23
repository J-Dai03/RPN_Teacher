import {BaseExplainer} from '../scenes/BaseExplainerScene.js'

export default class TreeExplanationScene extends BaseExplainer {
    constructor(){
        super({ key: 'TreeExplanationScene' });
    }
    init(){
        super.init({
            pages: [
`
You may be wondering, is there a way to represent expressions that better show the evaluation order like RPN, while being intuitive to understand like infix notation?
Yes, there is!

These are called expression trees. Expression trees are exactly what their name suggests, trees that represent expressions. 

In this context, a tree is an information structure, consisting of 'nodes' and connections, where each node can only connect to one 'parent' node above it, and two 'child' nodes beneath it, one on the left, and one on the right.
This is because mathematicians have never been outside to see trees, and have held every picture of a tree upside down.
`,`
[Insert tree example here]
`,
`
As you can see, trees are not typically used, because they are more compicated to depict and take up far more space.
`,
`
Converting from an expression tree to Reverse Polish Notation (also known as postfix notation) is easy. 
Simply do a post-order tree traversal.

To do an post-order tree traversal, we start at the top and go anti-clockwise around the tree. 
Each time we are to the right of the node (i.e. between the connection to the parent node and the right child node), we add the node's content to the end of the expression.
`, 
`
Converting to infix notation is very similar. We do an in-order traversal, which is very similar, except we add the node's content when between the connections to the child nodes. 
However, we also need to account for opreator precedence rules. 
The easiest way to do this is full parenthesisation, which we can do by adding an opening bracket (i.e. a '(' symbol) whenever we are to the left of any node with child nodes, and a closing bracket (i.e. a ')' symbol) whenever we are to the right of any node with child nodes.
`,
`
[Insert tree traversal image here]
`,
`
We can convert an expression tree to an infix expression can be done with this algorithm.
We start by inputting the topmost node (also known as the root) into this recursiuve algorithm:
define treeToInfix(input):
    if the input has no child nodes: return its content (since it must be an operand)
    else:
        let left = treeToInfix(left child node)
        let operator = the content of the input (i.e. the operator)
        let right = treeToInfix(right child node)
        let output be an empty string
        add '(', then left, then operator, then right, then ')' to output.
        return toOutput
`,
`
[Insert tree to infix example here, show algorithm]
`,
`
Converting an infix expression to an expression tree is complicated and beyond the scope of this tool. If you wish to learn more, [.....].

We can convert an expression tree to an RPN expression can be done with this algorithm.
We start by inputting the topmost node (also known as the root) into this recursiuve algorithm:
define treeToRPN(input):
    if the input has no child nodes: return its value (since it must be an operand)
    else:
        let toOutput be an empty string
        compute treeToRPN(left child of output) and add to end of toOutput
        compute treeToRPN(right child of output) and add to end of toOutput
        add the the value of the input (i.e. the operator) to the end of toOutput
        return toOutput
`,
`
[Insert tree to RPN example here, show algorithm]
`

            ],
            title: "Expression trees"
        });
    }
    create() {
        super.create();
    }
}