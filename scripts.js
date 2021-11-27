const screen = document.querySelector('.screen')
const digits = document.querySelectorAll('.digit')
const operators = document.querySelectorAll('.operator')
const clear = document.querySelector('.clear')
const equals = document.querySelector('.equals')
const delete1 = document.querySelector('.delete1')


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
    screen.textContent = calc(screen.textContent)
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

// Functions
// 'calc()' does the operation
let calc = (string) => {
    let operand = ''
    let result = []
    for (let i = 0; i < string.length; i++) {
        switch (string[i]) {
            case '+':
                result.push(operand)
                result.push('+')
                operand = ''
                break;
            case '-':
                result.push(operand)
                result.push('-')
                operand = ''
                break;
            case 'x':
                result.push(operand)
                result.push('*')
                operand = ''
                break;
            case '/':
                result.push(operand)
                result.push('/')
                operand = ''
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
