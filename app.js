// using query selectors to access the DOM.
const display = document.querySelector(".display");
const buttons = document.querySelector("button");
const currentDisplayNumber = document.querySelector(".currentValue");
const previousDisplayNumber = document.querySelector(".previousValue");
const operators = document.querySelectorAll(".operator");
const IsEqualTo = document.querySelector(".IsEqualTo");
const numberButtons = document.querySelectorAll(".number");
const decimal = document.querySelector(".decimal");
const clearIt = document.querySelector(".clear");
const deleteIt = document.querySelector(".delete");

clickedOperator = "";
currentNumber = "";
previousNumber = "";
result = "";

// set up functions to perform the basic arithmetic operations - add, subtract, multiply, and divide.
function add(a, b) {
  return parseFloat(a) + parseFloat(b);
}
function subtract(a, b) {
  return parseFloat(a) - parseFloat(b);
}
function multiply(a, b) {
  return parseFloat(a) * parseFloat(b);
}
function divide(a, b) {
  return parseFloat(a) / parseFloat(b);
}

// to take in two numbers and a operator and invoke the functions associated with that operator.
function operate(operator, num1, num2) {
  switch (operator) {
    case "+":
      return add(num1, num2);
    case "-":
      return subtract(num1, num2);
    case "*":
      return multiply(num1, num2);
    case "/":
      return divide(num1, num2);
  }
}

// populating the display when number buttons are clicked.
numberButtons.forEach((number) => {
  number.addEventListener("click", function () {
    currentNumber += number.textContent;
    currentDisplayNumber.textContent = currentNumber;
  });
});

/* store the first number that is input into the calculator when a user presses an operator, 
	and also save which operation has been chosen. In case both both the numbers are present,
	clicking on the operator works similar to '='. */
operators.forEach((operator) => {
  operator.addEventListener("click", () => {
    if (previousNumber && currentNumber) {
      displayResult();
    }
    previousNumber = currentNumber;
    clickedOperator = operator.textContent;
    previousDisplayNumber.textContent = previousNumber + " " + clickedOperator;
    currentNumber = "";
    enableDecimalBtn(); // enable the usage of decimal point.
    currentDisplayNumber.textContent = currentNumber;
  });
});

// display the result when the user clicks '='.
IsEqualTo.addEventListener("click", function () {
  displayResult();
});

// set up a function to operate() on the previous and current values.
function displayResult() {
  result = operate(
    clickedOperator,
    parseFloat(previousNumber),
    parseFloat(currentNumber)
  );
  result = +result.toFixed(6); // round off to maximum six decimal places.
  currentDisplayNumber.textContent = result;
  previousDisplayNumber.textContent =
    previousNumber + " " + clickedOperator + " " + currentNumber;
  currentNumber = result;
  previousNumber = "";
}

// set up the '.' button, so a user can input a decimal and disable it once used in a number.
enableDecimalBtn();
function enableDecimalBtn() {
  decimal.addEventListener("click", function insertDecimal() {
    currentNumber += decimal.textContent;
    currentDisplayNumber.textContent = currentNumber;
    decimal.removeEventListener("click", insertDecimal);
  });
}

// set up the “delete” button, so a user can undo if they click the wrong number.
deleteIt.addEventListener("click", function () {
  currentNumber = currentNumber.substring(0, currentNumber.length - 1);
  currentDisplayNumber.textContent = currentNumber;
});

// set up the “clear” button, so a user can undo if they click the wrong number.
clearIt.addEventListener("click", function () {
  clickedOperator = "";
  currentNumber = "";
  previousNumber = "";
  result = "";
  currentDisplayNumber.textContent = "0";
  previousDisplayNumber.textContent = "";
});
