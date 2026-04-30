export class ExpressionTree {
    constructor (expression){
        this.rootNode = this.expressionToTree(expression);
        this.depth = this.treeDepth(this.rootNode);
        this.postfixOrder = this.postfixTraversal(this.rootNode);
        this.infixOrder = this.infixTraversal(this.rootNode);
    }

    /**
     * 
     * @param {*} expression 
     * @param {*} slideMode 
     * @returns the root node of the tree generated when slideMode is false
     *          a slideData object when slideMode is true
     */
    expressionToTree(expression, slideMode = false){
        let evalStack = [];
        let prevStack = [];
        let slideData = [];

        slideData.push(this.slideDataGenerator([], [], expression.slice(), `Let's convert ${expression} to an expression tree`));

        for (let i = 0; i < expression.length; i++){
            let currentComponent = expression[i];

            // if the current item is an operand, just push it to the stack
            if (/^[a-z0-9]$/.test(currentComponent)){
                evalStack.push(new TreeNode(currentComponent));
                slideData.push(this.slideDataGenerator(
                    evalStack,
                    prevStack,
                    expression.slice(i),
                    `The next element, ${currentComponent}, is an operand, so let's add it to the stack.`
                ));
            
            // currentComponent should be an operator if we're here
            } else{
                let b = evalStack.pop();
                let a = evalStack.pop();
                evalStack.push(new TreeNode(currentComponent, a, b));
                slideData.push(this.slideDataGenerator(
                    evalStack,
                    prevStack,
                    expression.slice(i),
                    `The next element, ${currentComponent}, is an operator, so let's take the top two elements of the stack, ${a.nodeVal} and ${b.nodeVal} as its child nodes, then add it to the stack.`
                ));
            }

            // Copy evalStack into prevStack
            prevStack = evalStack.map(node => node.clone());
        }

        if (slideMode) {
            return slideData;
        } else {
            return evalStack.pop();
        }
    }

    slideDataGenerator(currState, prevState, expression, text){
        return {
            stackState : currState.map(node => node.clone()),
            prevStackState : prevState.map(node => node.clone()),
            expressionRemaining: expression,
            slideText: text
        }
    }


    treeDepth(node){
        if (node == null){
            return 0;
        } else {
            return 1 + Math.max(this.treeDepth(node.left), this.treeDepth(node.right));
        }
    }

    postfixTraversal(currentNode){
        if (currentNode == null){
            return [];
        } else {
            return [].concat(
                this.postfixTraversal(currentNode.left),
                this.postfixTraversal(currentNode.right),
                [currentNode]
            )
        }
    }

    infixTraversal(currentNode){
        if (currentNode == null){
            return [];
        } else {
            return [].concat(
                this.infixTraversal(currentNode.left),
                [currentNode],
                this.infixTraversal(currentNode.right)
            )
        }
    }
}

class TreeNode {
    constructor(nodeVal, l = null, r = null){
        this.nodeVal    =   nodeVal;
        this.left  =   l;
        this.right =   r;
        this.displayNode;
    }

    clone(){

        let leftChildClone  = (this.left != null) ? this.left.clone() : null;
        let rightChildClone = (this.right != null) ? this.right.clone() : null;

        return new TreeNode(this.nodeVal, leftChildClone, rightChildClone)
    }
}