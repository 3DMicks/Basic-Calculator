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

function insertOperationEvent(event) {
    let input = getInput();
    if (!isFinalCharValid()) return;

    input.textContent = `${input.textContent} ${this.operation} `;
}

function operate(event) {
    let input = getInput();
    if (input.textContent.length <= 0) return;
    if (!isFinalCharValid()) return;

    let result = 69420;
    let opArray = [...input.textContent.trim()].filter((char) => char != " ");

    const digits = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
    const symbols = ["+", "-", "÷", "x"];

    let operationsIndex = [];
    for (const [index, char] of opArray.entries()) {
        if (symbols.includes(char)) operationsIndex.push(index);
    }

    for (const [index, opIndex] of operationsIndex.entries()) {
        // Index of first character of the left number
        let leftHand = index == 0 ? 0 : operationsIndex[index - 1] + 1;
        // Index of last character of the right number
        let rightHand = operationsIndex[index + 1] == undefined ? opArray.length : operationsIndex[index + 1];

        leftHand = opArray.slice(leftHand, opIndex);
        let leftHandNumber = leftHand.reduce((text, char) => {
            return text + char.toString();
        }, "");

        rightHand = opArray.slice(opIndex + 1, rightHand);
        let rightHandNumber = rightHand.reduce((text, char) => {
            return text + char.toString();
        }, "");

        console.log("NUMBERS:");
        console.log(leftHandNumber);
        console.log(rightHandNumber);
    }

    console.log("OP ARRAYS:");
    console.log(opArray);
    console.log(operationsIndex);


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

document.querySelector("#btn-operate").addEventListener("click", operate);