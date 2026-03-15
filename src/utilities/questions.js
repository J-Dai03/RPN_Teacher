import { generateRPN } from "./RPNGenerator.js";
import { evalRPN } from "./RPNEval.js";
import { RPN2Infix } from "./RPNToInfixConversion.js";


export function evaluationProblem(level) {
    let problem = {
        type: "Evaluation", 
        question: generateRPN((2 * level) + 1, false, false, 5)
    };
    // No need to check if the problem can be evaluated, because we don't allow division, so no divsion by zero error.
    problem.solution = evalRPN(problem.question).value;
    return problem;
}

export function RPN2InfixConversionProblem(level) {
    let problem = {
        type: "RPN2Infix",
        question: generateRPN((2 * level) + 1, true, true, 9)};
    let solutionCal = RPN2Infix(problem.question)
    problem.solution = solutionCal.resultantExpression;
    console.log(`RPN expression generated: ${problem.question}, Solution: ${toString(solutionCal)}`);
    console.log(`RPN expression generated: ${problem.question}, Solution: ${problem.solution}`);
    return problem;
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