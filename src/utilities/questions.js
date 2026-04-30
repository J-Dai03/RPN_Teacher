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

    console.log(`check for validity ${expression}`)

    let toReturn = true;
    let stackSize = 0;

    let iterator = 0;

    while (toReturn && iterator < expression.length){
        if (/^[A-Za-z0-9]$/.test(expression[iterator])) {
            stackSize++;
        } else if (stackSize > 1) {
            stackSize++;
            switch (expression[iterator]){
                case '×':
                case '/':
                case '+':
                case '-':
                    stackSize--;
            }
        } else {
            toReturn = false;
        }
        iterator++;
    }

    return toReturn;
}
