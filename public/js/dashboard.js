// Dashboard preview only; real user data must come from an authenticated backend.
document.addEventListener('DOMContentLoaded', () => {
  const name = document.querySelector('[data-dashboard-name]');
  if (name) name.textContent = 'Welcome to your dashboard';
  const signout = document.querySelector('[data-signout]');
  if (signout) signout.addEventListener('click', () => { window.location.href = 'login.html'; });
});

