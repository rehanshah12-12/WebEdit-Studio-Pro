(async () => {
  // Remove old demo / preview notices from the page
  document.querySelectorAll('p, small, span, div, li').forEach(el => {
    if (el.children.length === 0 &&
        /demo only|front-end preview|not connected to a database/i.test(el.textContent)) {
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

  // Coming back from the verification email: sign the user in automatically
  async function handleVerifyLink() {
    const raw = (location.hash || '').replace(/^#/, '');
    if (!raw) return false;
    const params = new URLSearchParams(raw);

    if (params.get('error') || params.get('error_code')) {
      history.replaceState(null, '', location.pathname);
      show('This verification link has expired. Register again to get a new one.');
      return false;
    }

    const token = params.get('access_token');
    if (!token) return false;
    history.replaceState(null, '', location.pathname);
    show('Email verified! Signing you in...', true);

    try {
      const res = await fetch('/api/me', {
        headers: { Authorization: 'Bearer ' + token }
      });
      const data = await res.json().catch(() => ({}));
      if (res.ok && data.user) {
        localStorage.setItem('wes_token', token);
        localStorage.setItem('wes_email', data.user.email);
        setTimeout(() => { window.location.href = 'dashboard.html'; }, 600);
        return true;
      }
    } catch (e) {}

    show('Email verified! Please sign in.', true);
    return false;
  }

  if (await handleVerifyLink()) return;

  // Already logged in? Go straight to dashboard
  if ((register || login) && localStorage.getItem('wes_token')) {
    window.location.href = 'dashboard.html';
    return;
  }

  function showCheckEmail(email) {
    if (message) message.textContent = '';
    register.style.display = 'none';

    const box = document.createElement('div');
    box.style.cssText = 'text-align:center;padding:10px 4px;';

    const icon = document.createElement('div');
    icon.textContent = '📧';
    icon.style.cssText = 'font-size:46px;line-height:1;margin-bottom:10px;';

    const h = document.createElement('h2');
    h.textContent = 'Check your email';
    h.style.cssText = 'margin:0 0 10px;';

    const p1 = document.createElement('p');
    p1.style.cssText = 'margin:0 0 6px;overflow-wrap:anywhere;';
    const b = document.createElement('b');
    b.textContent = email;
    p1.append('We sent a verification link to ', b, '.');

    const p2 = document.createElement('p');
    p2.textContent =
      'Open the link in that email to finish signing up. You will be signed in automatically.';
    p2.style.cssText = 'margin:0 0 18px;opacity:.75;font-size:.92rem;';

    const again = document.createElement('button');
    again.type = 'button';
    again.textContent = 'Use a different email';
    again.style.cssText =
      'margin:0 6px 8px;padding:12px 16px;border-radius:12px;cursor:pointer;' +
      'border:1px solid rgba(100,110,170,.35);background:transparent;color:inherit;';
    again.onclick = () => {
      box.remove();
      register.style.display = '';
    };

    box.append(icon, h, p1, p2, again);
    register.insertAdjacentElement('afterend', box);
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

        // If email verification is OFF this logs in directly.
        // If it is ON, login is refused until the email is verified.
        const log = await post('/api/login', { email, password });
        if (log.ok) {
          saveSession(log.data);
          show('Account created! Opening your dashboard...', true);
          setTimeout(() => { window.location.href = 'dashboard.html'; }, 800);
        } else {
          register.reset();
          showCheckEmail(email);
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
        if (!ok) {
          const err = data.error || 'Login failed.';
          return show(
            /incorrect/i.test(err)
              ? err + ' If you just registered, please verify your email first.'
              : err
          );
        }
        saveSession(data);
        show('Signed in!', true);
        setTimeout(() => { window.location.href = 'dashboard.html'; }, 800);
      } catch (err) {
        show('Could not connect to the server. Please try again.');
      }
    });
  }
})();
