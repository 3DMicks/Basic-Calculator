function getInput() {
    return document.querySelector(".calc-input");
}

function clearInput(event) {
    getInput().textContent = "";
}

function deleteInput(event) {
    getInput().textContent = [...getInput().textContent].slice(0, -1).join("");
}

function insertNumber(event) {
    let input = getInput();
    input.textContent = input.textContent + this.getAttribute("data-value");
}

document.querySelectorAll(".calc-btn.number").forEach((btn) => {
    btn.addEventListener("click", insertNumber);
});

document.querySelector("#btn-clear").addEventListener("click", clearInput);

document.querySelector("#btn-delete").addEventListener("click", deleteInput);