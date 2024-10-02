const display = document.querySelector('.display');
const buttons = document.querySelectorAll('button');
let currentValue = '0';
let previousValue = null;
let operation = null;
let shouldResetDisplay = false;

buttons.forEach(button => {
    button.addEventListener('click', () => {
        const value = button.textContent;

        if (button.classList.contains('digit')) {
            handleDigit(value);
        } else if (button.classList.contains('operator')) {
            handleOperator(value);
        } else if (button.classList.contains('equals')) {
            handleEquals();
        } else if (button.classList.contains('clear')) {
            handleClear();
        }

        updateDisplay();
    });
});

function handleDigit(digit) {
    if (currentValue === '0' || shouldResetDisplay) {
        currentValue = digit;
        shouldResetDisplay = false;
    } else {
        currentValue += digit;
    }
}

function handleOperator(op) {
    if (operation !== null) handleEquals();
    previousValue = currentValue;
    operation = op;
    shouldResetDisplay = true;
}

function handleEquals() {
    if (operation === null || previousValue === null) return;
    
    const prev = parseFloat(previousValue);
    const current = parseFloat(currentValue);
    
    switch (operation) {
        case '+': currentValue = prev + current; break;
        case '-': currentValue = prev - current; break;
        case '×': currentValue = prev * current; break;
        case '÷': currentValue = prev / current; break;
        case '%': currentValue = prev % current; break;
    }
    
    operation = null;
    previousValue = null;
    shouldResetDisplay = true;
}

function handleClear() {
    currentValue = '0';
    previousValue = null;
    operation = null;
}

function updateDisplay() {
    display.textContent = currentValue;
}

// Gestion du bouton ±
document.querySelector('.operator[data-value="±"]').addEventListener('click', () => {
    currentValue = (parseFloat(currentValue) * -1).toString();
    updateDisplay();
});