function slideDataGenerator(currState, prevState, expression, text){
    return {
        stackState : currState,
        prevStackState : prevState,
        expressionRemaining: expression,
        slideText: text
    }
}

export function evalRPNSlide(input){

    let toEval = input.slice();
    let evalStack = [];
    let prevStack = [];
    let slideData = [];
    let maxStack = 0;

    // Initial slide:
    slideData.push(slideDataGenerator([], [], toEval.slice(), `Let's evaluate ${toEval}`));

    // Iterate over each item 
    for (let i = 0; i < toEval.length; i++){
        let currentComponent = toEval[i];

        // if the current item is an operand, just push it to the stack
        if (!isNaN(Number(currentComponent))){
            evalStack.push(currentComponent);
            slideData.push(slideDataGenerator(
                evalStack.slice(),
                prevStack.slice(),
                toEval.slice(i + 1),
                `${currentComponent} is an operand, so we push it to the stack`
            ));
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
            slideData.push(slideDataGenerator(
                evalStack.slice(),
                prevStack.slice(),
                toEval.slice(i + 1),
                `${currentComponent} is an operator, so we pop the top 2 elements, ${a} and ${b}, from the stack, and push the result of ${a} ${currentComponent} ${b} (${toPush}) to the stack`
            ));
            
        }
        prevStack = evalStack.slice();
    }

    // Final slide:
    slideData.push(slideDataGenerator(
        [],
        prevStack,
        "",
        `Done! We have evaluated ${input.join(" ")} to get ${evalStack[0]}.`
    ));

    return {
        slideData : slideData,
        maxStackSize : maxStack
    };
}


export function RPN2InfixSlide(input){
    let toEval = input.slice();
    let evalStack = [];
    let prevStack = [];
    let slideData = [];
    let maxStack = 0;

    // Initial slide:
    slideData.push(slideDataGenerator(
        [],
        [],
        toEval,
        `Let's evaluate ${toEval}`
    ));

    for (let i = 0; i < toEval.length; i++){
        let currentComponent = toEval[i];

        // if the current item is an operand, just push it to the stack
        if (/^[a-z0-9]$/.test(currentComponent)){
            evalStack.push(currentComponent);
            slideData.push(slideDataGenerator(
                evalStack.slice(),
                prevStack.slice(),
                toEval.slice(i + 1),
                `${currentComponent} is an operand, so we push it to the stack`
            ));
            maxStack = Math.max(maxStack, evalStack.length);
        
        // currentComponent should be an operator if we're here
        } else{
            let b = evalStack.pop();
            let a = evalStack.pop();
            evalStack.push(`(${a}${currentComponent}${b})`);

            slideData.push(slideDataGenerator(
                evalStack.slice(),
                prevStack.slice(),
                toEval.slice(i + 1),
                `${currentComponent} is an operator, so we pop the top 2 elements, ${a} and ${b}, from the stack, and push ${a} ${currentComponent} ${b} to the stack`
            ));
        }

        prevStack = evalStack.slice();
    }


    // Final slide:
    slideData.push(slideDataGenerator(
        [],
        prevStack,
        "",
        `Done! We have converted ${input.join(" ")} to get ${evalStack[0]}.`
    ));

    return {
        slideData : slideData,
        maxStackSize : maxStack
    };

}