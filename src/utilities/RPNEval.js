export function evalRPN(input){
    let toEval = input.slice();
    let evalStack = [];
    let toReturn = {
        evalFailure: false,
        value: 0,
        returnCode: "",
        debugLog: []
    };

    for (let currentComponent of toEval){

        // if the current item is an operand, just push it to the stack
        if (!isNaN(Number(currentComponent))){
            evalStack.push(currentComponent);
            toReturn.debugLog.push(`Added ${currentComponent} to stack.`);

        // If it's not an operand, but we don't have a stack big enough for an operator
        } else if (evalStack.length < 2) {
            toReturn.returnCode = "Invalid Expression: Stack does not have enough values for operator"
            toReturn.evalFailure = true;
        
        // currentComponent should be an operator if we're here
        } else{
            let b = Number(evalStack.pop());
            let a = Number(evalStack.pop());

            switch (currentComponent){
                case "+":
                    evalStack.push(a + b);
                    toReturn.debugLog.push(`Computed ${a} + ${b}`);
                    break;
                case "-":
                    evalStack.push(a - b);
                    toReturn.debugLog.push(`Computed ${a} - ${b}`);
                    break;
                case "×":
                    evalStack.push(a * b);
                    toReturn.debugLog.push(`Computed ${a} * ${b}`);
                    break;
                case "÷":
                    if (b == 0){
                        toReturn.returnCode = "Invalid Expression: Division by zero"
                        toReturn.evalFailure = true;
                    } else {
                        evalStack.push(a / b);
                        toReturn.debugLog.push(`Computed ${a} / ${b}`);
                    }
                    break;
                default:
                    toReturn.returnCode = "Invalid Expression: Character not recognised"
                    toReturn.evalFailure = true;
            }
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
        toReturn.value = evalStack.pop();
        toReturn.returnCode = "Success";
    }

    return toReturn;
}


//testing
//console.log(evalRPN(["7", "7", "-", "2", "+"]));