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
// ! Doesn't handle the priority of operators yet !
let calc = (array) => {
    let operand = ''
    let finalResult = []
    for (let i = 0; i < array.length; i++) {
        switch (array[i]) {
            case '+':
                finalResult.push(operand)
                operand = ''
                finalResult.push('+')
                break;
            case '-':
                finalResult.push(operand)
                operand = ''
                finalResult.push('-')
                break;
            case 'x':
                finalResult.push(operand)
                operand = ''
                finalResult.push('*')
                break;
            case '/':
                finalResult.push(operand)
                operand = ''
                finalResult.push('/')
                break;
            default:
                operand += array[i]
        }
    }
    finalResult.push(operand)
    
    let resultToDisplay = JSON.parse(finalResult[0])
    for (let j = 1; j < finalResult.length; j++) {
        switch (finalResult[j]) {
            case '+':
                resultToDisplay += JSON.parse(finalResult[j + 1])
                j++
                break;
            case '-':
                resultToDisplay -= JSON.parse(finalResult[j + 1])
                j++
                break;
            case '*':
                resultToDisplay = resultToDisplay * JSON.parse(finalResult[j + 1])
                j++
                break;
            case '/':
                resultToDisplay = resultToDisplay / JSON.parse(finalResult[j + 1])
                j++
                break;
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
        let resultBis = result.slice() // Creates shallow copy of 'result', allows to modify the array
                                       // to find the most nested operation within parenthesis 
                                       // without modifying the original one ('result') where we will 
                                       // need to replace blocks of operation as long as there are 
                                       // parenthesis in the global operation 
        for (let j = 0; j < resultBis.length; j++) {
            if (resultBis[j] === '(') {
                for (let h = resultBis.length - 1; h >= j; h--) {
                    if (resultBis[h] === ')') {
                        let parenthesisOp = resultBis.slice(j + 1, h)
                        if (!parenthesisOp.includes('(') && !parenthesisOp.includes(')')) {
                            // Replaces in 'result' the most nested parenthesis block by the result of its operation
                            result.splice(j, parenthesisOp.length + 2, calc(parenthesisOp))
                        } else {
                            resultBis.splice(h, 1)
                            break
                        }
                    }
                }
            }
        }
    }
    return calc(result)
}

