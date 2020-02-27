let storage = [],
  ans = 0;

for(let i = 0; i < 10; i++) {
  document.querySelectorAll('.num')[i]
    .addEventListener('click', event => {
      document.querySelector('.display').innerHTML += event.target.innerHTML;
  });
}

for(let i = 0; i < 4; i++) {
  document.querySelectorAll('.op')[i]
    .addEventListener('click', event => {
      document.querySelector('.display').innerHTML += ` ${event.target.innerHTML} `;
    })
}

document.querySelector('.point')
  .addEventListener('click', event => {
    document.querySelector('.display').innerHTML += '.';
  })

document.querySelector('.clear')
  .addEventListener('click', event => {
    document.querySelector('.display').innerHTML = '';
  });

