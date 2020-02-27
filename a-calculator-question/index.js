let store = [],
  ans = '';

const render = () => {
  if(store.length > 0) {
    let string = ''
    store.forEach(e => {
      if (e[e.length-1] == '.')
        string += ` .${e.slice(0, -1)}`
      else
        string += ` ${e}`
    })
    document.querySelector('.display').innerHTML = string.trim()
      .split(' ')
      .reverse()
      .join(' ')
  }
  else
    document.querySelector('.display').innerHTML = ''
}

const calculate = () => {
  const add = (a, b) => a + b
  const subtract = (a, b) => a - b
  const multiply = (a, b) => a * b
  const divide = (a, b) => a / b
}

document.querySelectorAll('.num').forEach(e => {
  e.addEventListener('click', event => {
    if (store.length < 1 || !/[\.0-9]/.test(store[store.length - 1]))
      store.push(event.target.innerHTML);
    else if (store[store.length - 1] !== '0')
      store[store.length - 1] += event.target.innerHTML;
    else
      store[store.length - 1] = event.target.innerHTML;
    render();
    //console.log(store);
  })
});

document.querySelectorAll('.op').forEach(e => {
  e.addEventListener('click', event => {
    if (store.length !== 0) {
      if (/[0-9]/.test(store[store.length - 1])) {
        if (store[store.length - 1][store[store.length - 1].length - 1] === '.')
          store[store.length - 1] = store[store.length - 1].slice(0, -1)
        store.push(event.target.innerHTML);
      }
      else if (store[store.length - 1] !== event.target.innerHTML)
        store[store.length - 1] = event.target.innerHTML;
      render();
      //console.log(store);
    }
  })
});

document.querySelector('.point')
  .addEventListener('click', event => {
    if (store.length < 1 || !/[\.0-9]/.test(store[store.length - 1]))
      store.push(`0${event.target.innerHTML}`);
    else if (!store[store.length - 1].includes('.')) 
      store[store.length - 1] += event.target.innerHTML;
    console.log(store)
    render();
  });

document.querySelector('.clear')
  .addEventListener('click', () => {
    store = []
    render()
  });

document.querySelector('.clear-entry')
  .addEventListener('click', () => {
    if (store.length > 1)
      store.pop(store.length - 1)
    else
      store = []
    render()
  });

document.querySelector('.equals')
  .addEventListener('click', () => {
    calculate()
    render()
  })