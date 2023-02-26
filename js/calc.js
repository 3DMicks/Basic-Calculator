function getInput() {
    return document.querySelector(".calc-input");
}

function clearInput(event) {
    getInput().textContent = "";
}

function deleteInput(event) {
    getInput().textContent = [...getInput().textContent.trim()].slice(0, -1).join("");
}

function insertNumber(event) {
    let input = getInput();
    input.textContent = input.textContent + this.getAttribute("data-value");
}

function insertOperation(event) {
    let input = getInput();
    let opIcons = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
    let trimmedInput = [...input.textContent.trim()];
    console.log(trimmedInput);
    if (!opIcons.includes(trimmedInput[trimmedInput.length - 1])) return;

    input.textContent = `${input.textContent} ${this.operation} `;
}

document.querySelectorAll(".calc-btn.number").forEach((btn) => {
    btn.addEventListener("click", insertNumber);
});

document.querySelector("#btn-clear").addEventListener("click", clearInput);

document.querySelector("#btn-delete").addEventListener("click", deleteInput);

let btnAdd = document.querySelector("#btn-add");
btnAdd.addEventListener("click", insertOperation);
btnAdd.operation = "+";

let btnSub = document.querySelector("#btn-subtract");
btnSub.addEventListener("click", insertOperation);
btnSub.operation = "-";

let btnDivide = document.querySelector("#btn-divide");
btnDivide.addEventListener("click", insertOperation);
btnDivide.operation = "/";

let btnMultiply = document.querySelector("#btn-multiply");
btnMultiply.addEventListener("click", insertOperation);
btnMultiply.operation = "*";
