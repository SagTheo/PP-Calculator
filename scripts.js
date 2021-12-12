const screen = document.querySelector('.screen')
const digits = document.querySelectorAll('.digit')
const operators = document.querySelectorAll('.operator')
const clear = document.querySelector('.clear')
const equals = document.querySelector('.equals')
const delete1 = document.querySelector('.delete1')
const parenthesis = document.querySelectorAll('.parenthesis')


// Adds the number that is clicked on to the screen
digits.forEach(digit => {
    digit.addEventListener('click', () => {
        screen.textContent += digit.textContent
    })
})

// Adds the operator that is clicked on to the screen
operators.forEach(operator => {
    operator.addEventListener('click', () => {
        screen.textContent += operator.textContent
    })
})

// Displays the result of the operation on the screen
equals.addEventListener('click', () => {
    screen.textContent = separateOp(screen.textContent)
})

// Clears the screen
clear.addEventListener('click', () => {
    screen.textContent = ''
})

// Deletes the last character displayed on the screen
delete1.addEventListener('click', () => {
    let delLastDigit = screen.textContent.split('')
    delLastDigit.pop()
    screen.textContent = delLastDigit.join('')
})

// Displays the parenthesis on the screen
parenthesis.forEach(par => {
    par.addEventListener('click', () => {
        screen.textContent += par.textContent
    })
})

// Functions
// calc() does the operation
let calc = (array) => {
    while (array.includes('x') || array.includes('/')) { // Handles priority of operators
        if (array.includes('x')) {
            const x = array.indexOf('x')
            const multiplication = JSON.parse(array[x - 1]) * JSON.parse(array[x + 1])
            array.splice(x - 1, 3, multiplication)
        }
        if (array.includes('/')) {
            const divisor = array.indexOf('/')
            const division = JSON.parse(array[divisor - 1]) / JSON.parse(array[divisor + 1])
            array.splice(divisor - 1, 3, division)
        }
    }

    let resultToDisplay = JSON.parse(array[0])
    for (let j = 1; j < array.length; j++) { 
        switch (array[j]) {
            case '+': 
                resultToDisplay += JSON.parse(array[j + 1])
                j++
                break
            case '-':
                resultToDisplay -= JSON.parse(array[j + 1])
                j++
                break
        }
    }
    return JSON.stringify(resultToDisplay)
}


// Separates the operands from the operators and the parenthesis
let separateOp = (string) => {
    let operand = ''
    let result = []
    for (let i = 0; i < string.length; i++) {
        switch (string[i]) {
            case '(':
                result.push('(')
                break;
            case ')':
                if (operand !== '') {
                    result.push(operand)
                    operand = ''
                }
                result.push(')')
                break;
            case '+':
                if (operand !== '') {
                    result.push(operand)
                    operand = ''
                }
                result.push('+')
                break;
            case '-':
                if (operand !== '') {
                    result.push(operand)
                    operand = ''
                }
                result.push('-')
                break;
            case 'x':
                if (operand !== '') {
                    result.push(operand)
                    operand = ''
                }
                result.push('x') //This will be replaced by an actual multiplication symbol in the calc() function
                break;
            case '/':
                if (operand !== '') {
                    result.push(operand)
                    operand = ''
                }
                result.push('/')
                break;
            default:
                operand += string[i]
        }
    }
    if (operand !== '') {
        result.push(operand)
    }

    // Finds the most nested operation within parenthesis
    while (result.includes('(') || result.includes(')')) {
        for (let j = 0; j < result.length; j++) {
            if (result[j] === '(') {
                for (let h = result.length - 1; h >= j; h--) {
                    if (result[h] === ')') {
                        let parenthesisOp = result.slice(j + 1, h)
                        if (!parenthesisOp.includes('(') && !parenthesisOp.includes(')')) {
                            // Replaces in 'result' the most nested parenthesis block by the result of its operation
                            result.splice(j, parenthesisOp.length + 2, calc(parenthesisOp))
                            j = -1
                        }
                    }
                }
            }
        }
    }
    return calc(result)
}

