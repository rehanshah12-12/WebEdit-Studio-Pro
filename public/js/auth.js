(() => {
  // Remove the old "Demo only..." notice from the page
  document.querySelectorAll('p, small, span, div, li').forEach(el => {
    if (el.children.length === 0 && /demo only/i.test(el.textContent)) {
      el.remove();
    }
  });

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
      if (password.length < 8) return show('Password must be at least 8 characters.');
      if (password !== d.get('confirmPassword')) return show('Passwords do not match.');

      show('Please wait...', true);
      try {
        const reg = await post('/api/register', { email, password });
        if (!reg.ok) return show(reg.data.error || 'Registration failed.');

        // Auto login right after register
        const log = await post('/api/login', { email, password });
        if (log.ok) {
          saveSession(log.data);
          show('Account created! Opening your dashboard...', true);
          setTimeout(() => { window.location.href = 'dashboard.html'; }, 800);
        } else {
          show('Account created. Please sign in.', true);
        }
      } catch (err) {
        show('Could not connect to the server. Please try again.');
      }
    });
  }

  if (login) {
    login.addEventListener('submit', async e => {
      e.preventDefault();
      const d = new FormData(login);
      const email = String(d.get('email') || '').trim();
      const password = String(d.get('password') || '');
      if (!email || !password) return show('Please enter your email and password.');

      show('Please wait...', true);
      try {
        const { ok, data } = await post('/api/login', { email, password });
        if (!ok) return show(data.error || 'Login failed.');
        saveSession(data);
        show('Signed in!', true);
        setTimeout(() => { window.location.href = 'dashboard.html'; }, 800);
      } catch (err) {
        show('Could not connect to the server. Please try again.');
      }
    });
  }
})();
