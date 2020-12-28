document.addEventListener('DOMContentLoaded', () => {
  const operatorBtn = document.querySelectorAll('.operator'),
    numberBtn = document.querySelectorAll('.number'),
    pointBtn = document.getElementById('point'),
    clearBtn = document.querySelectorAll('.clear-btn'),
    display = document.getElementById('display')
  let currValue = 0
  let currentOperator = ''
  let isNewNumber = false

  operatorBtn.forEach((el) =>
    el.addEventListener('click', (e) => {
      pressOperation(e.target.textContent)
    })
  )

  numberBtn.forEach((el) =>
    el.addEventListener('click', (e) => {
      pressNum(e.target.textContent)
    })
  )

  clearBtn.forEach((el) =>
    el.addEventListener('click', (e) => {
      pressClearBtn(e.target.textContent)
    })
  )

  pointBtn.addEventListener('click', (e) => {
    pressOnPoint(e.target.id)
  })

  const pressNum = (el) => {
    if (isNewNumber) {
      display.value = el
      isNewNumber = false
    } else {
      if (display.value === '0') display.value = el
      else display.value += el
    }
  }

  const pressOperation = (el) => {
    let localMemory = display.value

    if (isNewNumber && currentOperator !== '=') {
      display.value = currValue
    } else {
      isNewNumber = true
      if (currentOperator === '+') currValue += +localMemory
      else if (currentOperator === '-') currValue -= +localMemory
      else if (currentOperator === '*') currValue *= +localMemory
      else if (currentOperator === '/') currValue /= +localMemory
      else currValue = +localMemory
      display.value = currValue
      currentOperator = el
    }
  }

  const pressClearBtn = (el) => {
    if (el === 'C') {
      display.value = 0
      currValue = 0
    } else if (el === 'CE') {
      display.value = '0'
      isNewNumber = true
    }
  }

  const pressOnPoint = (el) => {
    console.log(el)
    if (isNewNumber) {
      display.value = '0.'
      isNewNumber = false
    } else if (el === 'point') {
      display.value += '.'
    }
  }
})
