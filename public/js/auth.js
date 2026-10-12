(() => {
  const register = document.querySelector('[data-register-form]');
  const login = document.querySelector('[data-login-form]');
  const message = document.querySelector('[data-auth-message]');

  const show = (text, ok = false) => {
    if (message) {
      message.textContent = text;
      message.className = ok ? 'success-text' : 'error-text';
    }
  };

  async function post(url, body) {
    const res = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body)
    });
    const data = await res.json().catch(() => ({}));
    return { ok: res.ok, data };
  }

  function saveSession(data) {
    localStorage.setItem('wes_token', data.access_token);
    localStorage.setItem('wes_email', data.user.email);
  }

  // Already logged in? Go straight to dashboard
  if ((register || login) && localStorage.getItem('wes_token')) {
    window.location.href = 'dashboard.html';
    return;
  }

  if (register) {
    register.addEventListener('submit', async e => {
      e.preventDefault();
      const d = new FormData(register);
      const email = String(d.get('email') || '').trim();
      const password = String(d.get('password') || '');
      if (password.length < 8) return show('Password kam az kam 8 characters ka rakhein.');
      if (password !== d.get('confirmPassword')) return show('Dono passwords match nahi karte.');

      show('Please wait...', true);
      try {
        const reg = await post('/api/register', { email, password });
        if (!reg.ok) return show(reg.data.error || 'Registration failed.');

        // Auto login right after register
        const log = await post('/api/login', { email, password });
        if (log.ok) {
          saveSession(log.data);
          show('Account ban gaya! Dashboard khul raha hai...', true);
          setTimeout(() => { window.location.href = 'dashboard.html'; }, 800);
        } else {
          show('Account ban gaya. Ab Sign in karein.', true);
        }
      } catch (err) {
        show('Server se connect nahi ho paya. Dobara try karein.');
      }
    });
  }

  if (login) {
    login.addEventListener('submit', async e => {
      e.preventDefault();
      const d = new FormData(login);
      const email = String(d.get('email') || '').trim();
      const password = String(d.get('password') || '');
      if (!email || !password) return show('Email aur password daalein.');

      show('Please wait...', true);
      try {
        const { ok, data } = await post('/api/login', { email, password });
        if (!ok) return show(data.error || 'Login failed.');
        saveSession(data);
        show('Login ho gaya!', true);
        setTimeout(() => { window.location.href = 'dashboard.html'; }, 800);
      } catch (err) {
        show('Server se connect nahi ho paya. Dobara try karein.');
      }
    });
  }
})();
