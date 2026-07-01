document.getElementById('login-form')?.addEventListener('submit', (event) => {
  event.preventDefault();
  sessionStorage.setItem('standup-auth', 'true');
  window.location.href = 'index.html';
});
