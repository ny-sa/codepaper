document.querySelector('.toggle').addEventListener('change', e => {
  if(e.target.checked) {
    document.querySelectorAll('body, .article-container, .sidebar, .line, .panel-line').forEach(e => {
      e.classList.add('darkness')
    })
  } else {
    document.querySelectorAll('body, .article-container, .sidebar, .line, .panel-line').forEach(e => {
      e.classList.remove('darkness')
    })
  }
})