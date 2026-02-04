let display = document.getElementById('display');
let shouldResetDisplay = false;

function appendNumber(number) {
    if (display.value === 'Error' || shouldResetDisplay) {
        display.value = '';
        shouldResetDisplay = false;
    }

    if (number === '.' && display.value.includes('.')) return;

    display.value += number;
}

function appendOperator(operator) {
    if (display.value === 'Error') {
        display.value = '';
    }
    shouldResetDisplay = false;

    const lastChar = display.value.slice(-1);
    const operators = ['+', '-', '*', '/', '%'];


    if (display.value === '' && operator !== '-') return;


    if (operators.includes(lastChar)) {
        display.value = display.value.slice(0, -1) + operator;
    } else {
        display.value += operator;
    }
}

function clearDisplay() {
    display.value = '';
    shouldResetDisplay = false;
}

function deleteLast() {
    if (display.value === 'Error') {
        display.value = '';
    } else {
        if (shouldResetDisplay) {
            display.value = '';
            shouldResetDisplay = false;
        } else {
            display.value = display.value.toString().slice(0, -1);
        }
    }
}

function calculateResult() {
    try {
        if (display.value === '') return;



        let expression = display.value;


        if (expression.includes('%')) {
            expression = expression.replace(/%/g, '/100');
        }

        let result = eval(expression);

        if (!isFinite(result) || isNaN(result)) {
            display.value = 'Error';
        } else {

            if (result.toString().includes('.')) {
                result = parseFloat(result.toFixed(8));
            }
            display.value = result;
            shouldResetDisplay = true;
        }
    } catch (error) {
        display.value = 'Error';
        shouldResetDisplay = true;
    }
}


document.addEventListener('keydown', (event) => {
    const key = event.key;

    if (/[0-9]/.test(key)) {
        appendNumber(key);
    } else if (key === '.') {
        appendNumber('.');
    } else if (['+', '-', '*', '/', '%'].includes(key)) {
        appendOperator(key);
    } else if (key === 'Enter' || key === '=') {
        event.preventDefault();
        calculateResult();
    } else if (key === 'Backspace') {
        deleteLast();
    } else if (key === 'Escape' || key.toLowerCase() === 'c') {
        clearDisplay();
    }
});
