// Demo-only account interface. Do not use localStorage authentication for real/private accounts.
(() => {
  const register = document.querySelector('[data-register-form]');
  const login = document.querySelector('[data-login-form]');
  const message = document.querySelector('[data-auth-message]');
  const show = (text, ok = false) => { if (message) { message.textContent = text; message.className = ok ? 'success-text' : 'error-text'; } };
  if (register) register.addEventListener('submit', e => {
    e.preventDefault();
    const d = new FormData(register); const password = String(d.get('password') || '');
    if (password.length < 8) return show('Password kam az kam 8 characters ka rakhein.');
    if (password !== d.get('confirmPassword')) return show('Dono passwords match nahi karte.');
    show('Demo form complete. Real account creation ke liye secure backend/database connect karna zaroori hai.', true);
    register.reset();
  });
  if (login) login.addEventListener('submit', e => { e.preventDefault(); show('Login abhi demo interface hai. Real sign-in ke liye secure backend zaroori hai.'); });
})();

