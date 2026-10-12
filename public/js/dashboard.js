document.addEventListener('DOMContentLoaded', async () => {
  const token = localStorage.getItem('wes_token');
  if (!token) {
    window.location.href = 'login.html';
    return;
  }

  const headers = { Authorization: 'Bearer ' + token };
  const name = document.querySelector('[data-dashboard-name]');
  const signout = document.querySelector('[data-signout]');

  const logout = () => {
    localStorage.removeItem('wes_token');
    localStorage.removeItem('wes_email');
    window.location.href = 'login.html';
  };

  if (signout) signout.addEventListener('click', logout);

  // Check login session
  try {
    const res = await fetch('/api/me', { headers });
    if (!res.ok) return logout();
    const data = await res.json();
    if (name) name.textContent = 'Welcome, ' + data.user.email;
  } catch (e) {
    if (name) name.textContent = 'Server se connect nahi ho paya.';
    return;
  }

  // Orders box
  const box = document.createElement('section');
  box.style.cssText =
    'margin:24px 16px;padding:24px;border-radius:20px;' +
    'background:#111827;border:1px solid #1f2937;color:#e5e7eb;';
  const title = document.createElement('h2');
  title.textContent = 'Your orders';
  title.style.cssText = 'margin:0 0 16px;font-size:1.4rem;';
  const list = document.createElement('div');
  list.textContent = 'Loading...';
  box.append(title, list);

  const anchor = name ? (name.closest('section') || name.parentElement) : null;
  if (anchor) anchor.insertAdjacentElement('afterend', box);
  else (document.querySelector('main') || document.body).appendChild(box);

  try {
    const res = await fetch('/api/orders', { headers });
    if (res.status === 401) return logout();
    const data = await res.json();
    list.textContent = '';

    if (!data.orders || data.orders.length === 0) {
      list.textContent = 'Abhi koi order nahi hai.';
      return;
    }

    data.orders.forEach(o => {
      const item = document.createElement('div');
      item.style.cssText = 'padding:12px 0;border-top:1px solid #1f2937;';
      const s = document.createElement('strong');
      s.textContent = o.service;
      const st = document.createElement('div');
      st.style.cssText = 'font-size:.9rem;opacity:.7;margin-top:4px;';
      st.textContent =
        'Status: ' + (o.status || 'new') + ' · ' +
        new Date(o.created_at).toLocaleDateString();
      item.append(s, st);
      list.appendChild(item);
    });
  } catch (e) {
    list.textContent = 'Orders load nahi ho paye.';
  }
});
