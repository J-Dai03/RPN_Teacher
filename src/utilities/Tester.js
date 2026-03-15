import { generateRPN } from "./RPNGenerator.js";
import { evalRPN } from "./RPNEval.js";
import { RPN2Infix } from "./RPNToInfixConversion.js";

console.log("TESTING");
let myRPN = [];
let expressionSize = 5
let loopCount = 3;
for (let i = 1; i <= loopCount; i++){
    myRPN = generateRPN(expressionSize);
    console.log(`Expression ${i}: ${myRPN}
        Evaluates to ${evalRPN(myRPN).value}
        Infix form: ${RPN2Infix(myRPN).resultantExpression}
        `);
}
