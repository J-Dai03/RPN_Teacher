/**
* Converts an RPN expression into a fully parenthisised infix expression.
* Both expressions are in the form of an array, where each element is a string.
* Treats every element that cannot be converted into a number by Number(currentComponent) as a binary operator
*/
export function RPN2Infix(input){
    let toEval = input.slice();
    let evalStack = [];
    let toReturn = {
        evalFailure: false,
        resultantExpression: "",
        returnCode: "",
        debugLog: []
    };

    for (let currentComponent of toEval){

        // if the current item is an operand, just push it to the stack
        if (/^[a-z0-9]$/.test(currentComponent)){
            evalStack.push(currentComponent);
            toReturn.debugLog.push(`Added ${currentComponent} to stack.`);

        // If it's not an operand, but we don't have a stack big enough for an operator
        } else if (evalStack.length < 2) {
            toReturn.returnCode = "Invalid Expression: Stack does not have enough values for operator"
            toReturn.evalFailure = true;
        
        // currentComponent should be an operator if we're here
        } else{
            let b = evalStack.pop();
            let a = evalStack.pop();
            evalStack.push(`(${a}${currentComponent}${b})`);
        }

        // If we can't evaluate the expression, we end early
        if (toReturn.evalFailure) {
            break;
        }
    }

    toReturn.debugLog.push(`Post evaluation stack ${evalStack}`);

    // We have now either gone through every item and need to check if we have a 1 item stack, showing we have evaluated correctly, or we have ended early.
    if (evalStack.length != 1){
        toReturn.returnCode = "Invalid Expression: Resultant stack have size not equal to one"
        toReturn.evalFailure = true;
    }

    if (toReturn.evalFailure == false){
        toReturn.resultantExpression = evalStack.pop();
        toReturn.returnCode = "Success";
    }

    return toReturn;

}

console.log(RPN2Infix(["7", "7", "-", "2", "+"]));