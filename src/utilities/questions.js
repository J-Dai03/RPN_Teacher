import { generateRPN } from "./RPNGenerator.js";
import { evalRPN } from "./RPNEval.js";
import { RPN2Infix } from "./RPNToInfixConversion.js";

function problemGen(t, q, s){
    return {
        type        :   t, 
        question    :   q, 
        solution    :   s
    }
}

export function genPracticeProblem(level, type = "Evaluation") {
    let question = generateRPN((2 * level) + 1, false, false, 5)
    
    let solution = "";

    switch (type){
        case "Evaluation":
            solution = evalRPN(question).value;
            break;
        case "RPN2Infix":
            solution = RPN2Infix(question).resultantExpression;
            break;
        default:
            break;
    }

    return problemGen(type, question, solution);;
}


export function checkAnswer(problem, answer){
    switch (problem.type){
        case "Evaluation":
            return problem.solution == answer;
        case "RPN2Infix":
            return problem.solution === answer;
        default:
            // Unsupported problem type
            return false;
    }
}

export function validRPN(expression){


    let sufficientStack = true;
    let stackSize = 0;

    let iterator = 0;

    while (sufficientStack && iterator < expression.length){
        const currentChar = expression[iterator];

        if (/^[A-Za-z0-9]$/.test(currentChar)) {
            stackSize++;

            // If we have enough items in the stack for an operator
        } else if (stackSize >= 2) {
            switch (currentChar){
                case '×':
                case '÷':
                case '+':
                case '-':
                    stackSize--;
            }
        } else {
            sufficientStack = false;
        }
        iterator++;
    }

    return (sufficientStack && stackSize == 1);
}
