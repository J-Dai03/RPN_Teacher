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

In this context, a tree is an information structure, consisting of 'nodes' and connections, where each node can only connect to one 'parent' node above it, and two 'child' nodes beneath it, one on the left, and one on the right. The resulting network somewhat resembles tree roots, possibly giving it the name.

Trees are not typically used to represent expressions, because they are compicated to depict and take up significant space.
`,
`
Converting from an expression tree to Reverse Polish Notation (also known as postfix notation), or to infix notation is easy. 
Simply do a post-order tree traversal or an in-order tree traversal respectively. 

Visual representations of expression trees and their traversal paths can be generated using the 'Interactive Demonstrations' option in the main menu.

To do an post-order tree traversal, we start at the top and go anti-clockwise around the tree. 
Each time we are to the right of the node (i.e. between the connection to the parent node and the right child node), we add the node's content to the end of the expression.

In-order traversal is very similar, except we add the node's content when between the connections to the child nodes. 
However, we also need to account for opreator precedence rules. The easiest way to do this is full parenthesisation, which we can do by adding an opening bracket (i.e. a '(' symbol) whenever we are to the left of any node with child nodes, and a closing bracket (i.e. a ')' symbol) whenever we are to the right of any node with child nodes.
`,
`
We can convert an expression tree to an infix expression can be done with this algorithm. We start by inputting the topmost node (also known as the root) into this recursiuve algorithm:

define treeToInfix(input):
    if the input has no child nodes: return its content (since it must be an operand)
    else:
        let left = treeToInfix(left child node)
        let operator = the input content (i.e. the operator)
        let right = treeToInfix(right child node)
        let output be an empty string
        add '(' left operator right ')' to output.
        return toOutput
`,
`
Converting an infix expression to an expression tree is complicated and beyond the scope of this tool.

We can convert an expression tree to an RPN expression can be done with this algorithm.

We start by inputting the top-most node (also known as the root) into this recursiuve algorithm:

define treeToRPN(input):
    if the input has no child nodes: 
        return its value (since it must be an operand)
    else:
        let output be an empty string
        add treeToRPN(left child of output) to output
        add treeToRPN(right child of output) to output
        add the input value (i.e. the operator) to output
        return toOutput
`

            ],
            title: "Expression trees"
        });
    }
    create() {
        super.create();
    }
}