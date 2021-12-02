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
    console.log(separateOp(screen.textContent))
    // screen.textContent = calc(screen.textContent)
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
let calc = (string) => {
    let operand = ''
    let result = []
    for (let i = 0; i < string.length; i++) {
        switch (string[i]) {
            case '+':
                result.push(operand)
                operand = ''
                result.push('+')
                break;
            case '-':
                result.push(operand)
                operand = ''
                result.push('-')
                break;
            case 'x':
                result.push(operand)
                operand = ''
                result.push('*')
                break;
            case '/':
                result.push(operand)
                operand = ''
                result.push('/')
                break;
            default:
                operand += string[i]
        }
    }
    result.push(operand)
    
    let resultToDisplay = JSON.parse(result[0])
    for (let j = 1; j < result.length; j++) {
        switch (result[j]) {
            case '+':
                resultToDisplay += JSON.parse(result[j + 1])
                j++
                break;
            case '-':
                resultToDisplay -= JSON.parse(result[j + 1])
                j++
                break;
            case '*':
                resultToDisplay = resultToDisplay * JSON.parse(result[j + 1])
                j++
                break;
            case '/':
                resultToDisplay = resultToDisplay / JSON.parse(result[j + 1])
                j++
                break;
        }
    }
    return resultToDisplay
}

// Recursive function to figure out operations within parenthesis
// Finds the most nested operation within parenthesis
// Calls calc() to do the operation within the parenthesis
// Then: should drop the parenthesis for that operation and work its way
//       up until no more parenthesis can be found in the string
// let recursivePar = (string) => {
//     let parenthesisOp = string.slice(string.indexOf('(') + 1, string.lastIndexOf(')'))
//     if (!parenthesisOp.includes('(') && !parenthesisOp.includes(')')) {
//         return calc(parenthesisOp)
//     } else {
//         recursivePar(parenthesisOp)
//     }
    // return parenthesisOp
// }

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
                result.push('*')
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
    console.log(result)

    // Finds the most nested operation within parenthesis
    let resultBis = result.slice() // Creates shallow copy of result
    for (let j = 0; j < resultBis.length; j++) {
        if (resultBis[j] === '(') {
            for (let h = resultBis.length - 1; h >= j; h--) {
                if (resultBis[h] === ')') {
                    let parenthesisOp = resultBis.slice(j + 1, h)
                    if (!parenthesisOp.includes('(') && !parenthesisOp.includes(')')) {
                        // Replaces in 'result' the most nested parenthesis block by the result of its operation
                        result.splice(j, parenthesisOp.length + 2, calc(parenthesisOp))
                        console.log(result)
                    } else {
                        resultBis.splice(h, 1)
                        break
                    }
                }
            }
        }
    }
}

