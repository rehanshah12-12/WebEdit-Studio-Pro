document.addEventListener('DOMContentLoaded', async () => {
  const token = localStorage.getItem('wes_token');
  if (!token) {
    window.location.href = 'login.html';
    return;
  }

  const style = document.createElement('style');
  style.textContent =
    'html,body{max-width:100%;overflow-x:hidden;}' +
    '[data-dashboard-name]{overflow-wrap:anywhere;word-break:break-word;' +
    'font-size:clamp(1.6rem,7vw,2.6rem);line-height:1.2;}';
  document.head.appendChild(style);

  const headers = { Authorization: 'Bearer ' + token };
  const jsonHeaders = { ...headers, 'Content-Type': 'application/json' };
  const name = document.querySelector('[data-dashboard-name]');
  const signout = document.querySelector('[data-signout]');

  const logout = () => {
    localStorage.removeItem('wes_token');
    localStorage.removeItem('wes_email');
    window.location.href = 'login.html';
  };
  if (signout) signout.addEventListener('click', logout);

  document.querySelectorAll('a[href*="login"]').forEach(a => {
    if (/sign\s*in/i.test(a.textContent)) {
      a.textContent = 'Logout';
      a.setAttribute('href', '#');
      a.addEventListener('click', e => {
        e.preventDefault();
        logout();
      });
    }
  });

  try {
    const res = await fetch('/api/me', { headers });
    if (!res.ok) return logout();
    const data = await res.json();
    if (name) name.textContent = 'Welcome, ' + data.user.email;
    const note = name ? name.nextElementSibling : null;
    if (note && note.tagName === 'P') {
      note.textContent = 'Place a new order here and track your existing orders.';
    }
  } catch (e) {
    if (name) name.textContent = 'Could not connect to the server.';
    return;
  }

  // ---------- Helpers ----------
  const boxCss =
    'margin:24px 16px;padding:24px;border-radius:20px;' +
    'background:#111827;border:1px solid #1f2937;color:#e5e7eb;';
  const fieldCss =
    'width:100%;box-sizing:border-box;padding:12px 14px;margin:6px 0 14px;' +
    'border-radius:12px;border:1px solid #374151;background:#0b1220;' +
    'color:#e5e7eb;font-size:1rem;font-family:inherit;';

  function h2(text) {
    const t = document.createElement('h2');
    t.textContent = text;
    t.style.cssText = 'margin:0 0 16px;font-size:1.4rem;';
    return t;
  }

  // ---------- New order form ----------
  const formBox = document.createElement('section');
  formBox.style.cssText = boxCss;
  formBox.appendChild(h2('New order'));

  const form = document.createElement('div');

  const l1 = document.createElement('label');
  l1.textContent = 'What service do you need?';
  const select = document.createElement('select');
  select.style.cssText = fieldCss;
  [
    'Website Development',
    'Photo Editing',
    'Video & Reels Editing',
    'Logo / Branding',
    'Other'
  ].forEach(s => {
    const o = document.createElement('option');
    o.value = s;
    o.textContent = s;
    select.appendChild(o);
  });

  const l2 = document.createElement('label');
  l2.textContent = 'Project details';
  const details = document.createElement('textarea');
  details.rows = 4;
  details.maxLength = 3000;
  details.placeholder = 'Tell us about your idea or requirements...';
  details.style.cssText = fieldCss;

  const btn = document.createElement('button');
  btn.type = 'button';
  btn.textContent = 'Submit order';
  btn.style.cssText =
    'padding:14px 22px;border:none;border-radius:14px;background:#a3f069;' +
    'color:#0b1220;font-weight:700;font-size:1rem;cursor:pointer;';

  const msg = document.createElement('div');
  msg.style.cssText = 'margin-top:12px;font-size:.95rem;';

  form.append(l1, select, l2, details, btn, msg);
  formBox.appendChild(form);

  // ---------- Orders list ----------
  const listBox = document.createElement('section');
  listBox.style.cssText = boxCss;
  listBox.appendChild(h2('Your orders'));
  const list = document.createElement('div');
  list.textContent = 'Loading...';
  listBox.appendChild(list);

  const anchor = name ? (name.closest('section') || name.parentElement) : null;
  if (anchor) {
    anchor.insertAdjacentElement('afterend', listBox);
    anchor.insertAdjacentElement('afterend', formBox);
  } else {
    const host = document.querySelector('main') || document.body;
    host.append(formBox, listBox);
  }

  async function loadOrders() {
    try {
      const res = await fetch('/api/orders', { headers });
      if (res.status === 401) return logout();
      const data = await res.json();
      list.textContent = '';

      if (!data.orders || data.orders.length === 0) {
        list.textContent = 'You have no orders yet.';
        return;
      }

      data.orders.forEach(o => {
        const item = document.createElement('div');
        item.style.cssText =
          'padding:12px 0;border-top:1px solid #1f2937;overflow-wrap:anywhere;';
        const s = document.createElement('strong');
        s.textContent = o.service;
        item.appendChild(s);
        if (o.details) {
          const dt = document.createElement('div');
          dt.textContent = o.details;
          dt.style.cssText = 'margin-top:6px;white-space:pre-wrap;';
          item.appendChild(dt);
        }
        const st = document.createElement('div');
        st.style.cssText =
          'font-size:.9rem;opacity:.7;margin-top:6px;text-transform:capitalize;';
        st.textContent =
          'Status: ' + (o.status || 'pending') + ' · ' +
          new Date(o.created_at).toLocaleDateString();
        item.appendChild(st);
        list.appendChild(item);
      });
    } catch (e) {
      list.textContent = 'Could not load your orders.';
    }
  }

  btn.addEventListener('click', async () => {
    const text = details.value.trim();
    if (text.length < 5) {
      msg.style.color = '#fca5a5';
      msg.textContent = 'Please add a few details about your project.';
      return;
    }
    btn.disabled = true;
    msg.style.color = '#a3f069';
    msg.textContent = 'Sending...';
    try {
      const res = await fetch('/api/orders', {
        method: 'POST',
        headers: jsonHeaders,
        body: JSON.stringify({ service: select.value, details: text })
      });
      if (res.status === 401) return logout();
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        msg.style.color = '#fca5a5';
        msg.textContent = data.error || 'Could not send your order. Please try again.';
      } else {
        msg.style.color = '#a3f069';
        msg.textContent = 'Order received! We will contact you soon.';
        details.value = '';
        loadOrders();
      }
    } catch (e) {
      msg.style.color = '#fca5a5';
      msg.textContent = 'Could not connect to the server.';
    }
    btn.disabled = false;
  });

  loadOrders();
});
