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

function insertOperationEvent(event) {
    let input = getInput();
    let opIcons = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
    let trimmedInput = [...input.textContent.trim()];

    if (!opIcons.includes(trimmedInput[trimmedInput.length - 1])) return;

    input.textContent = `${input.textContent} ${this.operation} `;
}

function operate(event) {
    let input = getInput();
    let result = 69420;

    clearInput();
    input.textContent = result.toString();
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
btnDivide.operation = "/";

let btnMultiply = document.querySelector("#btn-multiply");
btnMultiply.addEventListener("click", insertOperationEvent);
btnMultiply.operation = "*";

document.querySelector("#btn-operate").addEventListener("click", operate);