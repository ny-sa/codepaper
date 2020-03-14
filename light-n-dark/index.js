//Check OS preference, but only once
if (
  window.matchMedia('(prefers-color-scheme: dark)').matches &&
  !window.localStorage.getItem('didItAlready')
) {
  window.localStorage.setItem('isDarkMode', 'true');
  window.localStorage.setItem('didItAlready', '!!!');
}

//Check browser on next loading
window.onload = () => {
  if (window.localStorage.getItem('isDarkMode') === 'true') {
    document
      .querySelectorAll(
        'body, .switch, .navbar-container, .article-container, .sidebar, .line, .bar-line'
      )
      .forEach(e => {
        e.classList.toggle('darkness');
        e.classList.add('no-anim');
      });
    document.querySelector('.toggle').checked = true;
    setTimeout(() => {
      document
        .querySelectorAll(
          'body, .switch, .navbar-container, .article-container, .sidebar, .line, .bar-line'
        )
        .forEach(e => {
          e.classList.remove('no-anim');
        });
    }, 100);
  }
};

//Toggle
document.querySelector('.toggle').addEventListener('change', () => {
  window.localStorage.setItem(
    'isDarkMode',
    window.localStorage.getItem('isDarkMode') === 'false' ? 'true' : 'false'
  );
  document
    .querySelectorAll(
      'body, .switch, .navbar-container, .article-container, .sidebar, .line, .bar-line'
    )
    .forEach(e => {
      e.classList.toggle('darkness');
    });
});
