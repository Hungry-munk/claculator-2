const numberButtons = document.querySelectorAll('.number');
const operatorButtons = document.querySelectorAll('.operator')
const eqaulButton = document.querySelector('.equal')
const deleteButton = document.querySelector('.delete')
const resetButton = document.querySelector('.reset')

const previousOperation = document.querySelector('.previous-operation')
const currentOperation = document.querySelector('.current-operation')

const equation = {
    currentOperation : '',
    previousOperation: '',
    operator : '',
    answer: ''
}

numberButtons.forEach(button => {
    button.addEventListener('click', event =>{
        if (button.value === "0" && !equation.currentOperation) return
        equation.currentOperation += button.value
        currentOperation.textContent = equation.currentOperation
    })
})

operatorButtons.forEach(button=>{
    button.addEventListener('click', event=>{
        if(!equation.currentOperation || (equation.operator && !equation.currentOperation)) return // if they havent chosen a number first

        if (equation.operator) {
            calcualte()
            updateCalculationDisplay(button)
            return
        }



        equation.previousOperation = equation.currentOperation
        equation.operator = button.value
        equation.currentOperation = ''

        previousOperation.textContent = `${equation.previousOperation} ${equation.operator}`
        currentOperation.textContent = ""

    })
})

eqaulButton.addEventListener('click', event =>{
    if (equation.currentOperation && equation.previousOperation){
        calcualte()
        updateCalculationDisplay(event.target)
    }

})

resetButton.addEventListener('click', ()=>{
    equation.previousOperation = ''
    equation.currentOperation = ''
    equation.answer = ''
    equation.operator = ''

    currentOperation.textContent = ''
    previousOperation.textContent = ''
});

deleteButton.addEventListener('click',()=>{
    equation.currentOperation = equation.currentOperation.slice(0,-1) 
    currentOperation.textContent = equation.currentOperation 
});

function updateCalculationDisplay(button) {
    if (button.value === "=") {
        console.log('worls')
        //updating display
        currentOperation.textContent = equation.answer
        previousOperation.textContent = ""
        // updating vlaues
        equation.currentOperation = equation.answer
        equation.previousOperation = ""
        equation.operator = ""
    } else {
        previousOperation.textContent = `${equation.answer} ${equation.operator}`
        equation.previousOperation =equation.answer
        equation.currentOperation = ''
        currentOperation.textContent = equation.currentOperation
    }
};

function calcualte() {
    let firstNumber = parseFloat(equation.previousOperation)
    let secondNumber = parseFloat(equation.currentOperation)
    let operator = equation.operator
    let answer;

    switch (operator) {
        case '+':
            answer = firstNumber + secondNumber
            break
        case '÷':
            answer = firstNumber / secondNumber
            break
        case '^':
            answer = firstNumber ** secondNumber
            break
        case 'X' :
            answer = firstNumber * secondNumber
            break
        case '-':
            answer = firstNumber - secondNumber
            break;
    }

    equation.answer = answer
}