const screen = document.querySelector('.screen')
const digits = document.querySelectorAll('.digit')
const operators = document.querySelectorAll('.operator')
const clear = document.querySelector('.clear')
const equals = document.querySelector('.equals')
const delete1 = document.querySelector('.delete1')

let calculation = []
let currentOperand = ''

// Adds the number that is clicked on to 'currentOperand'
digits.forEach(digit => {
    digit.addEventListener('click', () => {
        currentOperand += digit.textContent
    })
})

// Adds the first operand and the operator to 'calculation', and resets 'currentOperand'
operators.forEach(operator => {
    operator.addEventListener('click', () => {
        calculation.push(currentOperand)
        currentOperand = ''
        calculation.push(operator.textContent)
    })
})

// Adds the second operand to 'calculation', calls 'calc()', 
// and resets 'currentOperand' and 'calculation'
equals.addEventListener('click', () => {
    calculation.push(currentOperand)
    currentOperand = ''
    screen.textContent = calc(calculation, calculation[1])
    calculation = []
})

// Clears the screen
clear.addEventListener('click', () => {
    screen.textContent = ''
})

// Deletes the last character displayed on the screen
delete1.addEventListener('click', () => {
    
})

// Functions
// 'calc()' does the math for two operands only
let calc = (array, sign) => {
    let result

    switch (sign) {
        case '+':
            return result = JSON.parse(array[0]) + JSON.parse(array[2])
        case '-':
            return result = JSON.parse(array[0]) - JSON.parse(array[2])
        case 'x':
            return result = JSON.parse(array[0]) * JSON.parse(array[2])
        case '/':
            return result = JSON.parse(array[0]) / JSON.parse(array[2])
    }
}