const operands = '+-*/.%';
const display = document.getElementById('Calculator-Display');

//handle Complex operations buttons
const calType = document.querySelector('.calculator-type')
const addbtns = document.querySelector('.Additional-btns')
const complexcity = document.querySelector('#complex')
let iscomplex = false;

// Show and hide complex calculator buttons
calType.addEventListener('click', () => {
    iscomplex = !iscomplex;
    complexcity.innerText = iscomplex ? 'Complex' : 'Simple'

    calType.classList.toggle('active');
    if (calType.classList.contains('active')) {
        addbtns.style.maxHeight = '150px';
    } else {
        addbtns.style.maxHeight = '0';
    }
})

// Append input to display
function appendToDisplay(input) {
    const currentText = display.textContent;

    if (input === '.') {
        // Check if the current last operand is a number and if it already contains a decimal point
        const lastOperand = currentText.split(/[\+\-\*\/\%\(\)]/).pop();
        if (lastOperand.includes('.')) {
            return; // Prevent adding another decimal point
        }
    }
    if (currentText === '0' && input !== '.') {
        return display.textContent = input;
    }
    if (operands.includes(currentText.slice(-1)) && operands.includes(input)) {
        // Replace the last character with the new operation
        return display.textContent = currentText.slice(0, -1) + input;
    }
    display.textContent += input;
}

//Main function to calculate answers
function calculate() {
    if (operands.includes(display.textContent.slice(-1))) {
        const newSol = display.textContent.slice(0, -1);
        return display.textContent = eval(newSol);
    }
    if (display.textContent.charAt(0) === '-') {
        const solution = eval(display.textContent);
        return display.textContent = solution;
    }
    if (operands.includes(display.textContent.charAt(0))) {
        return display.textContent = 'Error';
    }
    const solution = Number((eval(display.textContent)).toFixed(5));
    display.textContent = solution;
}

//Clear the display
function clearDisplay() {
    display.textContent = '';
}

//clear single charater from the current display
function clearCurrent() {
    //if display have text inside it
    if (!parseInt(display.textContent)) {
        return display.textContent = '';
    }
    const newText = display.textContent.slice(0, -1);
    display.textContent = newText;
}

//square operation
function operationSqr() {
    if (!parseInt(display.textContent)) {
        return display.textContent = '';
    }
    if (operands.includes(display.textContent.slice(-1))) {
        const value = display.textContent.slice(0, -1);
        const num = eval(value);
        return display.textContent = Math.pow(num, 2);
    }
    display.textContent = Math.pow(eval(display.textContent), 2)
}

//square root operation
function operationRoot() {
    if (!parseInt(display.textContent)) {
        return display.textContent = '';
    }
    if (operands.includes(display.textContent.slice(-1))) {
        const value = display.textContent.slice(0, -1);
        const number = eval(value);
        return display.textContent = Math.sqrt(number);
    }
    display.textContent = Math.sqrt(eval(display.textContent));
}

//find factorial of a number
function factorial() {
    if (!parseInt(display.textContent)) {
        return display.textContent = '';
    }
    let ans = 1;
    if (operands.includes(display.textContent.slice(-1))) {
        display.textContent = display.textContent.slice(0, -1);
    }
    const n = eval(display.textContent)
    if (n === 0)
        return 1;
    for (let i = 2; i <= n; i++)
        ans = ans * i;
    return display.textContent = ans;
}

//perform log operation on a number
function operationlog() {
    if (!parseInt(display.textContent)) {
        return display.textContent = '';
    }
    if (operands.includes(display.textContent.slice(-1))) {
        display.textContent = display.textContent.slice(0, -1);
    }
    const ans = eval(display.textContent)
    display.textContent = Math.log10(ans);
}

//Make a number negative (postive if negative already)
function operationInverse() {
    let currentExpression = display.textContent;

    // Regular expression to find the last operand
    const regex = /(-?\d+(\.\d+)?)([+\-*/%])?$/;

    // Check if there's a valid number to apply the inversion
    if (regex.test(currentExpression)) {
        // Replace the last operand with its toggled negative equivalent
        currentExpression = currentExpression.replace(regex, (match, number, decimal, operator) => {
            // Toggle the minus sign
            if (number.startsWith('-')) {
                // Remove the negative sign
                return number.slice(1) + (operator || '');
            } else {
                // Add a negative sign
                return '-' + number + (operator || '');
            }
        });

        // Update the display with the new expression
        display.textContent = currentExpression;
    }
}
