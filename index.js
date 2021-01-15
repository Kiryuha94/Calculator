document.addEventListener('DOMContentLoaded', () => {
  const operatorBtn = document.querySelectorAll('.operator'),
    numberBtn = document.querySelectorAll('.number'),
    pointBtn = document.getElementById('point'),
    clearBtn = document.querySelectorAll('.clear-btn'),
    display = document.getElementById('display')
  let currValue = 0,
    currentOperator = '',
    isNewNumber = false

  const OPERATORS = {
    plus: '+',
    minus: '-',
    multiply: '*',
    devide: '/',
    equals: '=',
  }

  const arrOper = Object.values(OPERATORS)
  const pressOperation = (el) => {
    let localMemory = display.value
    if (isNewNumber && currentOperator !== '=') {
      display.value = currValue
    } else {
      isNewNumber = true
      switch (currentOperator) {
        case OPERATORS.plus:
          currValue += +localMemory
          break
        case OPERATORS.minus:
          currValue -= +localMemory
          break
        case OPERATORS.multiply:
          currValue *= +localMemory
          break
        case OPERATORS.devide:
          currValue /= +localMemory
          break
        default:
          currValue = +localMemory
      }
      display.value = currValue
    }
    currentOperator = el
  }

  operatorBtn.forEach((el) =>
    el.addEventListener('click', (e) => {
      pressOperation(e.target.textContent)
    })
  )

  const pressNum = (el) => {
    if (isNewNumber) {
      display.value = el
      isNewNumber = false
    } else {
      display.value === '0' ? display.value = el : display.value += el
    }
  }

  numberBtn.forEach((el) =>
    el.addEventListener('click', (e) => {
      pressNum(e.target.textContent)
    })
  )

  const KEYS = {
    C: 'C',
    CE: 'CE',
  }

  const pressClearBtn = (el) => {
    if (el === KEYS.C) {
      display.value = '0'
      currValue = 0
      isNewNumber = true
      currentOperator = ''
    } else if (el === KEYS.CE) {
      display.value = display.value.length > 1 ? display.value.slice(0, -1) : ''
     if (isNewNumber) {
       currValue = +display.value
     }
    }
  }

  clearBtn.forEach((el) =>
    el.addEventListener('click', (e) => {
      pressClearBtn(e.target.textContent)
    })
  )

  const pressOnPoint = () => {
    if (isNewNumber) {
      display.value = '0.'
      isNewNumber = false
    } else {
      display.value += '.'
    }
  }

  pointBtn.addEventListener('click', pressOnPoint)

  document.addEventListener('keydown', (key) => {
    document.activeElement.blur()
    const currentKey = key.key
    if (!Number.isNaN(+currentKey)) {
      pressNum(String(+currentKey))
    } else {
      if (arrOper.includes(currentKey)) {
        pressOperation(currentKey)
      } else {
        switch (currentKey) {
          case 'Enter':
            pressOperation(OPERATORS.equals)
            break
          case '.':
            pressOnPoint()
            break
          case 'Delete':
            pressClearBtn(KEYS.C)
            break
          case 'Backspace':
            pressClearBtn(KEYS.CE)
            break
          default:
            break
        }
      }
    }
  })
})
