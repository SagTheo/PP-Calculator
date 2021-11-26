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
    let operation = screen.textContent.split(' ')
    screen.textContent = calc(operation, operation[1])
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
