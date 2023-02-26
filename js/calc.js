function getInput() {
    return document.querySelector(".calc-input");
}

function clearInput() {
    getInput().textContent = "";
}

function deleteInput() {
    getInput().textContent = [...getInput().textContent.trim()].slice(0, -1).join("");
}

function insertNumberEvent(event) {
    let input = getInput();
    input.textContent = input.textContent + this.getAttribute("data-value");
}

function isFinalCharValid() {
    let input = getInput();
    const digits = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
    let trimmedInput = [...input.textContent.trim()];

    return (digits.includes(trimmedInput[trimmedInput.length - 1]));
}

function insertDecimalEvent() {
    if (!isFinalCharValid()) return;

    let input = getInput();
    input.textContent = input.textContent + ".";
}

function insertOperationEvent(event) {
    let input = getInput();
    if (!isFinalCharValid()) return;

    input.textContent = `${input.textContent} ${this.operation} `;
}

function getOperationIndexes(array) {
    let indexes = [];
    const symbols = ["+", "-", "÷", "x"];
    for (const [index, char] of array.entries()) {
        if (symbols.includes(char)) indexes.push(index);
    }
    return indexes;
}

function operate(event) {
    let input = getInput();
    if (input.textContent.length <= 0) return;
    if (!isFinalCharValid()) return;

    let result = 69420;
    let opArray = [...input.textContent.trim()].filter((char) => char != " ");

    let index = 0;
    let negativeIters = 0;
    while (getOperationIndexes(opArray).length > 0 && negativeIters < 10) {
        let operationsIndex = getOperationIndexes(opArray);
        let opIndex = operationsIndex[index];
        // Index of first character of the left number
        let leftHandIndex = index == 0 ? 0 : operationsIndex[index - 1] + 1;
        // Index of last character of the right number
        let rightHandIndex = operationsIndex[index + 1] == undefined ? opArray.length : operationsIndex[index + 1];

        let leftHandArray = opArray.slice(leftHandIndex, opIndex);
        let leftHandNumber = leftHandArray.reduce((text, char) => {
            return text + char.toString();
        }, "");

        let rightHandArray = opArray.slice(opIndex + 1, rightHandIndex);
        let rightHandNumber = rightHandArray.reduce((text, char) => {
            return text + char.toString();
        }, "");

        console.log("NUMBERS:");
        console.log(leftHandNumber);
        console.log(rightHandNumber);

        let op = {
            left: +leftHandNumber,
            right: +rightHandNumber,
            operation: opArray[opIndex],
        }

        console.log(op);


        let opResult = 0;
        // Do the calculation
        switch (opArray[opIndex]) {
            case "+":
                opResult = (op.left) + (op.right);
                break;
            case "-":
                opResult = (op.left) - (op.right);
                break;
            case "x":
                opResult = (op.left) * (op.right);
                break;
            case "÷":
                opResult = (op.left) / (op.right);
                break;
            default:
                opResult = -1;
                break;
        }
        console.log("Result: " + opResult);
        if (opResult <= 0) negativeIters++;

        opArray = opArray.slice(rightHandIndex, opArray.length);
        opArray = [...opResult.toString()].concat(opArray);

        operationsIndex = getOperationIndexes(opArray);

        console.log("ARRAYS:");
        console.table(opArray);
        console.log("Op Indexes:");
        console.log(operationsIndex);
        console.log("-!*:*!-");
    }

    console.log("~~~ FINAL ARRAYS:");
    console.table(opArray);
    console.log(getOperationIndexes(opArray));
    result = +opArray.join("");
    console.log("!! FINAL RESULT: " + result);
    result = +result.toFixed(5);
    input.textContent = result.toString();


    //clearInput();
    //input.textContent = result.toString();
}

document.querySelectorAll(".calc-btn.number").forEach((btn) => {
    btn.addEventListener("click", insertNumberEvent);
});

document.querySelector("#btn-clear").addEventListener("click", clearInput);

document.querySelector("#btn-delete").addEventListener("click", deleteInput);

let btnAdd = document.querySelector("#btn-add");
btnAdd.addEventListener("click", insertOperationEvent);
btnAdd.operation = "+";

let btnSub = document.querySelector("#btn-subtract");
btnSub.addEventListener("click", insertOperationEvent);
btnSub.operation = "-";

let btnDivide = document.querySelector("#btn-divide");
btnDivide.addEventListener("click", insertOperationEvent);
btnDivide.operation = "÷";

let btnMultiply = document.querySelector("#btn-multiply");
btnMultiply.addEventListener("click", insertOperationEvent);
btnMultiply.operation = "x";

document.querySelector("#btn-decimal").addEventListener("click", insertDecimalEvent);

document.querySelector("#btn-operate").addEventListener("click", operate);