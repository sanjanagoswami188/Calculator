let display = document.getElementById('display');
let equationDisplay = document.getElementById('equation');
let resultDisplay = document.getElementById('result');
let currentNumber = '';
let previousNumber = '';
let operator = '';

// Append number to the current input
function appendNumber(number) {
    if (currentNumber === '0' && number !== '.') {
        currentNumber = number; // Replace initial 0
    } else {
        currentNumber += number;
    }
    updateDisplay();
}

// Append operator and store the current number
function appendOperator(op) {
    if (currentNumber === '') return;
    if (previousNumber !== '') calculate(); // Calculate if there is a previous number
    operator = op;
    previousNumber = currentNumber;
    currentNumber = '';
    updateDisplay();
}

// Perform the calculation based on the operator
function calculate() {
    if (previousNumber === '' || currentNumber === '') return;

    let result;
    const num1 = parseFloat(previousNumber);
    const num2 = parseFloat(currentNumber);

    switch (operator) {
        case '+':
            result = num1 + num2;
            break;
        case '-':
            result = num1 - num2;
            break;
        case '*':
            result = num1 * num2;
            break;
        case '/':
            if (num2 === 0) {
                resultDisplay.textContent = "Error";
                clearDisplay();
                return;
            }
            result = num1 / num2;
            break;
        default:
            return;
    }

    // Round to 6 decimal places
    result = parseFloat(result.toFixed(6));

    resultDisplay.textContent = ` = ${result}`;
    currentNumber = result.toString();
    previousNumber = '';
    operator = '';
}

// Clear the calculator display
function clearDisplay() {
    currentNumber = '';
    previousNumber = '';
    operator = '';
    updateDisplay();
}

// Delete the last character from the current input
function deleteLast() {
    currentNumber = currentNumber.slice(0, -1) || '0';
    updateDisplay();
}

// Toggle the sign of the current number (positive/negative)
function toggleSign() {
    if (currentNumber === '0') return;
    currentNumber = currentNumber.startsWith('-')
        ? currentNumber.slice(1)
        : '-' + currentNumber;
    updateDisplay();
}

// Update the display with the equation and the result (if any)
function updateDisplay() {
    // Update equation display (showing current input and operator)
    equationDisplay.textContent = previousNumber + ' ' + operator + ' ' + currentNumber;
    resultDisplay.textContent = '';  // Clear the result until calculated
}
