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

/**
    Takes an RPN expression, which is know to be good, and returns an object with a properties slideData and maxStackSize.
    maxStackSize is the largest the stack gets during the evaluation
    slideData contains an array of objects with the following format:
    {
        stackState : [string],
        expressionRemaining: string,
        slideText: string
    }
    note: first item in stackState is bottom
*/
export function evalRPNSlide(input){

    let toEval = input.slice();
    let evalStack = [];
    let slideData = [];
    let maxStack = 0;

    // Initial slide:
    slideData.push({
        stackState : [],
        expressionRemaining: toEval,
        slideText: `Let's evaluate ${toEval}`
    });

    // Iterate over each item 
    for (let i = 0; i < toEval.length; i++){
        let currentComponent = toEval[i];

        // if the current item is an operand, just push it to the stack
        if (!isNaN(Number(currentComponent))){
            evalStack.push(currentComponent);

            slideData.push({
                stackState : evalStack.slice(),
                expressionRemaining: toEval.slice(i + 1),
                slideText: `${currentComponent} is an operand, so we push it to the stack`
            });
            maxStack = Math.max(maxStack, evalStack.length);

        // currentComponent should be an operator if we're here
        } else{
            let b = Number(evalStack.pop());
            let a = Number(evalStack.pop());
            let toPush = 0;
            switch (currentComponent){
                case "+":
                    toPush = a + b;
                    break;
                case "-":
                    toPush = a - b;
                    break;
                case "×":
                    toPush = a * b;
                    break;
                case "÷":
                    toPush = a / b;
            }

            evalStack.push(toPush);
            slideData.push({
                stackState : evalStack.slice(),
                expressionRemaining: toEval.slice(i + 1),
                slideText: `${currentComponent} is an operator, so we pop the top 2 elements, ${a} and ${b}, from the stack, and push the result of ${a} ${currentComponent} ${b} (${toPush}) to the stack`
            });
        }
    }

    // Final slide:
    slideData.push({
        stackState : evalStack,
        expressionRemaining: "",
        slideText: `Done! We have evaluated ${input.join(" ")} to get ${evalStack[0]}.`
    });

    /*
    for (let i = 0; i < slideData.length; i++){
        let currentSlide = slideData[i];
        console.log(`slideText: ${currentSlide.slideText}`);
        console.log(`stackState: ${currentSlide.stackState.join(" ")}`);
    }*/

    return {
        slideData : slideData,
        maxStackSize : maxStack
    };
}