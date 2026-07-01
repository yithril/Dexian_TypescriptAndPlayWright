if (!sessionStorage.getItem('standup-auth')) {
  window.location.href = 'login.html';
}

document.querySelectorAll('.task-item').forEach((item) => {
  const status = item.querySelector('.task-status');
  const button = item.querySelector('.mark-done');

  button?.addEventListener('click', () => {
    if (status) {
      status.textContent = 'Done';
    }
    button.disabled = true;
  });
});
