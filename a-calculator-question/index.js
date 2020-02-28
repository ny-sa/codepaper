let mem = [],
  ans = '',
  calculated = false;

const render = () => {
  console.log(mem)
  if (calculated) {
    if (ans[0] == '-')
      document.querySelector('.display').innerHTML = `${ans.slice(1, ans.length)}-`;
    else
      document.querySelector('.display').innerHTML = ans;
  }
  else if(mem.length > 0) {
    let string = ''
    mem.forEach((e, i) => {
      if (e === ')' || mem[i - 1] === '(')
        string += `${e}`
      else
        string += ` ${e}`
    })
    document.querySelector('.display').innerHTML = string.trim()
  }
  else
    document.querySelector('.display').innerHTML = ''
}

const calculate = (arr) => {
  let temp = arr
  if (temp.length < 2) return false
  temp.forEach((e, i) => {
    if (/[0-9]/.test(e))
      temp[i] = Number(temp[i]);
  })
  const add = (op) => temp[op-1] + temp[op+1]
  const subtract = (op) => temp[op-1] - temp[op+1]
  const multiply = (op) => temp[op-1] * temp[op+1]
  const divide = (op) => temp[op-1] / temp[op+1]
  const mergeValues = (op, func) => {
    temp = (op === temp.length - 2) ? temp.slice(0, op - 1).concat([func(op)]) :
      temp.slice(0, op - 1).concat([func(op)], temp.slice(op + 2, temp.length))
  }



  console.log(temp) 
  return false
  /*for (let i = 1; i < temp.length; i+= 2) {
    if (temp[i] === '*') {
      mergeValues(i, multiply)
      i -= 2
    }
    else if (temp[i] === '/') {
      mergeValues(i, divide)
    }
  }
  while (temp.length !== 1) {
    if (temp[1] === '-')
      mergeValues(1, subtract)
    else
      mergeValues(1, add)
  }
  console.log(temp)
  return temp[0]*/
}

document.querySelectorAll('.num').forEach(e => {
  e.addEventListener('click', event => {
    if (calculated) {
      mem.push(event.target.innerHTML);
      calculated = false
    }
    else if (mem.length < 1 || !/[\.0-9]/.test(mem[mem.length - 1]))
      mem.push(event.target.innerHTML);
    else if (mem[mem.length - 1] !== '0')
      mem[mem.length - 1] += event.target.innerHTML;
    else
      mem[mem.length - 1] = event.target.innerHTML;
    render();
  })
});

document.querySelectorAll('.op').forEach(e => {
  e.addEventListener('click', event => {
    if (calculated) {
      mem.push(ans, event.target.innerHTML)
      calculated = false
    }
    else if (mem.length !== 0 && mem[mem.length - 1] !== '(') {
      if (mem[mem.length - 1] === ')') 
        mem.push(event.target.innerHTML)
      else if (/[0-9]/.test(mem[mem.length - 1])) {
        if (mem[mem.length - 1][mem[mem.length - 1].length - 1] === '.')
          mem[mem.length - 1] = mem[mem.length - 1].slice(0, -1)
        mem.push(event.target.innerHTML)
      }
      else if (mem[mem.length - 1] !== event.target.innerHTML)
        mem[mem.length - 1] = event.target.innerHTML
    }
    render();
  })
});

document.querySelector('.point')
  .addEventListener('click', event => {
    if (calculated) {
      mem.push(`0${event.target.innerHTML}`);
      calculated = false
    }
    if (mem.length < 1 || !/[\.0-9]/.test(mem[mem.length - 1]))
      mem.push(`0${event.target.innerHTML}`);
    else if (!mem[mem.length - 1].includes('.')) 
      mem[mem.length - 1] += event.target.innerHTML;
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
    mem.push(event.target.innerHTML)
    render()
  })

document.querySelector('.parR')
  .addEventListener('click', () => {
    if (mem[mem.length - 1] !== '(' && 
        /[0-9]/.test(mem[mem.length - 1]) &&
        mem.filter(x => x === '(').length > mem.filter(x => x === ')').length) {
        mem.push(event.target.innerHTML)      
      }
    render()
  })


document.querySelector('.equals')
  .addEventListener('click', () => {
    let calc = calculate(mem)
    if (calc) {
      mem = []
      ans = `${calc}`
      calculated = true
      render()
    }
  })

