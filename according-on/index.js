document.querySelector('#toggle').addEventListener('change', () => {
  document.querySelectorAll('input[name="drop-down"]').forEach(e => {
    e.setAttribute('type', e.getAttribute('type') === 'checkbox' ? 'radio' : 'checkbox');
  })
})