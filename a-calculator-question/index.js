let mem = [],
  ans = '',
  calculated = false;
//let nums = ['zero', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine', 'ten'];

const render = () => {
  if (calculated) {
    console.log(ans)
    document.querySelector('.display').textContent = ans;
  } else if (mem.length > 0) {
    let string = ''
    mem.forEach((e, i) => {
      if (e === ')' || mem[i - 1] === '(')
        string += `${e}`
      else
        string += ` ${e}`
    })
    document.querySelector('.display').textContent = string.trim()
  }
  else
    document.querySelector('.display').textContent = ''
}

const calculate = (arr) => {
  if (arr[arr.length - 1] === '(')
    return false;
  if (arr.length === 1)
    return arr[0];

  let temp = arr,
    pLevel = 0,
    lList = [],
    rList = [],
    formerLength;

  const add = (op) => temp[op-1] + temp[op+1],
    subtract = (op) => temp[op-1] - temp[op+1],
    multiply = (op) => temp[op-1] * temp[op+1],
    divide = (op) => temp[op-1] / temp[op+1],
    mergeValues = (op, func) => {
    temp = (op === temp.length - 2) ? temp.slice(0, op - 1).concat([func(op)]) :
      temp.slice(0, op - 1).concat([func(op)], temp.slice(op + 2, temp.length))
  };

  temp.forEach((e, i) => {
      if (/[0-9]/.test(e))
        temp[i] = Number(temp[i]);
  });

  for (let i = 0; i < temp.length; i++) {
    if (temp[i] === '(') {
      pLevel++
      if (pLevel === 1)
        lList.push(i);   
    }
    else if (temp[i] === ')') {
      pLevel--
      if (pLevel === 0)
        rList.push(i);
    }
  }

  while (rList.length < lList.length) {
    temp.push(')')
    rList.push(temp.length - 1)
  }

  //console.log(lList)
  //console.log(rList)

  for(let i = 0; i < lList.length; i++) {
    formerLength = temp.length;
    temp[lList[i]] = '*', temp[rList[i]] = '*';

    console.log(temp)

    temp = [
      ...((/[0-9]/.test(temp[lList[i] - 1])) ? 
      temp.slice(0, lList[i] + 1) : 
      temp.slice(0, lList[i])),
      calculate(temp.slice(lList[i] + 1, rList[i])), 
      ...((/[0-9]/.test(temp[rList[i] + 1])) ? 
      temp.slice(rList[i], temp.length) : 
      temp.slice(rList[i] + 1, temp.length))
    ];

    //console.log(temp)

    if (temp.includes(false))
      return false

    lList = lList.map(e => e -= formerLength - temp.length) 
    rList = rList.map(e => e -= formerLength - temp.length) 

    console.log(lList)
    console.log(rList)
  }

  //console.log(temp)

  if (temp.length % 2 === 0)
    return false;

  for (let i = 1; i < temp.length; i+= 2) {
    if (temp[i] === '*') {
      mergeValues(i, multiply)
      i -= 2
    }
    else if (temp[i] === '/') {
      mergeValues(i, divide)
      i -= 2
    }
  }

  while (temp.length !== 1) {
    if (temp[1] === '-') {
      mergeValues(1, subtract)
    }  
    else {
      mergeValues(1, add)
    }
  }
  return temp[0];
}

document.querySelectorAll('.num').forEach(e => {
  e.addEventListener('click', event => {
    if (calculated) {
      mem.push(event.target.textContent);
      calculated = false
    }
    else if (mem.length < 1 || !/[\.0-9]/.test(mem[mem.length - 1]))
      mem.push(event.target.textContent);
    else if (mem[mem.length - 1] !== '0')
      mem[mem.length - 1] += event.target.textContent;
    else
      mem[mem.length - 1] = event.target.textContent;
    render();
  })
});

document.querySelectorAll('.op').forEach(e => {
  e.addEventListener('click', event => {
    if (calculated) {
      mem.push(ans, event.target.textContent)
      calculated = false
    }
    else if (mem.length !== 0 && mem[mem.length - 1] !== '(') {
      if (mem[mem.length - 1] === '.')
        mem[mem.length - 1] = '0.'
      if (/[\)\.0-9]/.test(mem[mem.length - 1])) {
        mem.push(event.target.textContent)
      }
      else if (mem[mem.length - 1] !== event.target.textContent)
        mem[mem.length - 1] = event.target.textContent
    }
    render();
  })
});

document.querySelector('.point')
  .addEventListener('click', event => {
    if (calculated) {
      mem.push(`${event.target.textContent}`);
      calculated = false
    }
    else if (mem.length < 1 || !/[\.0-9]/.test(mem[mem.length - 1]))
      mem.push(`${event.target.textContent}`);
    else if (!mem[mem.length - 1].includes('.')) 
      mem[mem.length - 1] += event.target.textContent;
    render();
  });

document.querySelector('.clear')
  .addEventListener('click', () => {
    if (calculated)
      calculated = false
    mem = []
    render()
  });

document.querySelector('.clear-entry')
  .addEventListener('click', () => {
    if (calculated)
      calculated = false
    if (mem.length > 1)
      mem.pop(mem.length - 1)
    else
      mem = []
    render()
  });

document.querySelector('.parL')
  .addEventListener('click', () => {
    if (calculated)
      calculated = false
    if (mem[mem.length - 1] === '.')
      mem[mem.length - 1] = '0.'
    mem.push(event.target.textContent)
    render()
  })

document.querySelector('.parR')
  .addEventListener('click', () => {
    if (mem[mem.length - 1] !== '(' && /[\)\.0-9]/.test(mem[mem.length - 1]) &&
      mem.filter(x => x === '(').length > mem.filter(x => x === ')').length) {
      if (mem[mem.length - 1] === '.')
        mem[mem.length - 1] = '0.'
      mem.push(event.target.textContent)      
    }
    render()
  })

document.querySelector('.equals')
  .addEventListener('click', () => {
    if (!calculated) {
      let calc = calculate(mem)
      //console.log(calc)
      if (calc) {
        mem = []
        ans = calc;
        calculated = true
        //console.log(ans)
        render()
      }
    }
  })

/*
document.addEventListener('keyup', (event) => {
  console.log(event.key)
  if (/[0-9]/.test(event.key)) {
    let number = `.${nums[Number(event.key)]}`;
    document.querySelector(number).click();
  } else
    switch (event.key) {
      case '+': 
        document.querySelector('.add').click();
        break;
      case '-': 
        document.querySelector('.subtract').click();
        break;
      case '*': 
        document.querySelector('.multiply').click();
        break;
      case '/': 
        document.querySelector('.divide').click();
        break;
      case '(': 
        document.querySelector('.parL').click();
        break;
      case ')': 
        document.querySelector('.parR').click();
        break;
      case 'Backspace':
        document.querySelector('.clear-entry').click();
        break;
      case 'Enter':
        document.querySelector('.equals').click();
        break;
      default:
    }
})
*/