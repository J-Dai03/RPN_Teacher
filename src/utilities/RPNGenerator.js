// Generates an RPN expression with operands of numbers 0 to 9 and operators +, -, ×, ÷
// Length must be odd
export function generateRPN(length, divisionPermitted = true, variablesPermitted = false, maxVal = 9){
    if (length % 2 == 0){
        return [];
    }
    else {
        const numOfOperatorsToAdd = (length-1)/2;
        let operatorsToAdd = getOperators(numOfOperatorsToAdd, divisionPermitted);
        let operandsToAdd = getOperands(numOfOperatorsToAdd + 1, variablesPermitted, maxVal);
        let stack = 0

        let toReturn = [];

        while (toReturn.length < length){
            if (operandsToAdd.length == 0){
                toReturn = toReturn.concat(operatorsToAdd);
            } else {

                //If cannot add operator or randomly decided to add operand
                if (stack < 2 || Math.random() < 0.5){
                    toReturn.push(operandsToAdd.pop())
                    stack++;
                }
                else {
                    toReturn.push(operatorsToAdd.pop())
                    stack--;
                }
            }
        }
        return toReturn;
    }
}

function getOperands(length, variablesPermitted = false, maxVal = 9){
    let possibleOperands = "";
    for (let i = 0; i <= maxVal; i++){
        possibleOperands += i;
    }
    if (variablesPermitted){
        possibleOperands += "abc";
    }
    let toReturn = []
    for (let i = 0; i < length; i++){
        toReturn.push(possibleOperands[Math.floor(Math.random() * possibleOperands.length)].toString());
    }
    return toReturn;
}

function getOperators(length, divisionPermitted = true){
    let validOperators = ["+", "-", "×"]
    if (divisionPermitted) {
        validOperators.push("÷");
    }

    let toReturn = []
    for (let i = 0; i < length; i++){
        toReturn.push(validOperators[Math.floor(Math.random() * (validOperators.length))]);
    }
    return toReturn;
}


/*
let length = 3;
for (let i = 0; i < length; i++){
    console.log(`Expression ${i}: ${generateRPN(12)}`)
}*/