class ExpressionTree {
    constructor (expression){
        this.rootNode = this.expressionToTree(expression);
    }

    // Returns the root node of the treex generated
    expressionToTree(expression){
        let evalStack = [];
        for (let i = 0; i < toEval.length; i++){
            let currentComponent = expression[i];

            // if the current item is an operand, just push it to the stack
            if (/^[a-z0-9]$/.test(currentComponent)){
                evalStack.push(TreeNode(currentComponent));
            
            // currentComponent should be an operator if we're here
            } else{
                let b = evalStack.pop();
                let a = evalStack.pop();
                evalStack.push(TreeNode(currentComponent, a, b));
            }
        }
        return evalStack.pop();
    }
}

class TreeNode {
    constructor(nodeVal, l = null, r = null){
        this.nodeVal    =   nodeVal;
        this.left  =   l;
        this.right =   r;
    }
}