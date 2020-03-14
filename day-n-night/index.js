//Check OS preference, but only once
if (
  window.matchMedia('(prefers-color-scheme: dark)').matches &&
  !window.localStorage.getItem('didItAlready')
) {
  window.localStorage.setItem('isDarkMode', 'true');
  window.localStorage.setItem('didItAlready', '!!!');
}

//Toggle
document.querySelector('.toggle').addEventListener('change', () => {
  window.localStorage.setItem(
    'isDarkMode',
    window.localStorage.getItem('isDarkMode') === 'false' ? 'true' : 'false'
  );
  document
    .querySelectorAll(
      'body, .circle, .navbar-container, .article-container, .sidebar, .line, .bar-line'
    )
    .forEach(e => {
      e.classList.toggle('darkness');
    });
});

//Check browser on next loading
window.onload = () => {
  if (window.localStorage.getItem('isDarkMode') === 'true') {
    document
      .querySelectorAll(
        'body, .circle, .navbar-container, .article-container, .sidebar, .line, .bar-line'
      )
      .forEach(e => {
        e.classList.toggle('darkness');
      });
    document.querySelector('.toggle').checked = true;
  }
};
