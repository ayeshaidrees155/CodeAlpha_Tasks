// DOM Elements
const previousOperandElement = document.getElementById("previous-operand");
const currentOperandElement = document.getElementById("current-operand");

let currentOperand = "0";
let previousOperand = "";
let operation = undefined;

// Clear function
const clearCalculator = () => {
  currentOperand = "0";
  previousOperand = "";
  operation = undefined;
  updateDisplay();
};

// Delete / Backspace function
const deleteNumber = () => {
  if (currentOperand === "0") return;
  if (currentOperand.length === 1) {
    currentOperand = "0";
  } else {
    currentOperand = currentOperand.slice(0, -1);
  }
  updateDisplay();
};

// Append Number function
const appendNumber = (number) => {
  if (number === "." && currentOperand.includes(".")) return;
  if (currentOperand === "0" && number !== ".") {
    currentOperand = number.toString();
  } else {
    currentOperand = currentOperand.toString() + number.toString();
  }
  updateDisplay();
};

// Choose Operation function
const chooseOperation = (selectedOp) => {
  if (currentOperand === "") return;
  if (previousOperand !== "") {
    compute();
  }
  operation = selectedOp;
  previousOperand = currentOperand;
  currentOperand = "";
  updateDisplay();
};

// Compute function
const compute = () => {
  let computation;
  const prev = parseFloat(previousOperand);
  const current = parseFloat(currentOperand);
  if (isNaN(prev) || isNaN(current)) return;

  switch (operation) {
    case "+":
      computation = prev + current;
      break;
    case "-":
      computation = prev - current;
      break;
    case "×":
    case "*":
      computation = prev * current;
      break;
    case "÷":
    case "/":
      if (current === 0) {
        alert("Cannot divide by zero");
        return;
      }
      computation = prev / current;
      break;
    case "%":
      computation = prev % current;
      break;
    default:
      return;
  }

  currentOperand = Number(computation.toFixed(8)).toString();
  operation = undefined;
  previousOperand = "";
  updateDisplay();
};

// Update Display function
const updateDisplay = () => {
  currentOperandElement.innerText = currentOperand;
  if (operation != null) {
    previousOperandElement.innerText = `${previousOperand} ${operation}`;
  } else {
    previousOperandElement.innerText = "";
  }
};

// Event Listeners for Buttons
document.querySelectorAll(".number-btn").forEach((button) => {
  button.addEventListener("click", () => {
    appendNumber(button.dataset.number);
  });
});

document.querySelectorAll(".operator-btn").forEach((button) => {
  button.addEventListener("click", () => {
    chooseOperation(button.dataset.operator);
  });
});

document.querySelectorAll("[data-action]").forEach((button) => {
  button.addEventListener("click", () => {
    const action = button.dataset.action;
    if (action === "clear") clearCalculator();
    if (action === "delete") deleteNumber();
    if (action === "calculate") compute();
  });
});

// Keyboard Support using ES6 arrow functions
document.addEventListener("keydown", (e) => {
  if ((e.key >= "0" && e.key <= "9") || e.key === ".") {
    appendNumber(e.key);
  }
  if (e.key === "+" || e.key === "-") {
    chooseOperation(e.key);
  }
  if (e.key === "*") {
    chooseOperation("×");
  }
  if (e.key === "/") {
    e.preventDefault();
    chooseOperation("÷");
  }
  if (e.key === "%") {
    chooseOperation("%");
  }
  if (e.key === "Enter" || e.key === "=") {
    e.preventDefault();
    compute();
  }
  if (e.key === "Backspace") {
    deleteNumber();
  }
  if (e.key === "Escape") {
    clearCalculator();
  }
});
