document.addEventListener('DOMContentLoaded', async () => {
  const token = localStorage.getItem('wes_token');
  if (!token) {
    window.location.href = 'login.html';
    return;
  }
  const headers = { Authorization: 'Bearer ' + token };

  const style = document.createElement('style');
  style.textContent = 'html,body{max-width:100%;overflow-x:hidden;}';
  document.head.appendChild(style);

  const note = document.querySelector('[data-admin-note]');
  if (note) note.textContent = '';

  const root = document.createElement('div');
  root.style.cssText = 'padding:20px 16px;color:#e5e7eb;max-width:900px;margin:0 auto;';
  const host = document.querySelector('main') || document.body;
  host.appendChild(root);

  const info = text => {
    root.textContent = text;
  };
  info('Loading...');

  async function get(url) {
    const res = await fetch(url, { headers });
    if (res.status === 401) {
      localStorage.removeItem('wes_token');
      window.location.href = 'login.html';
      return null;
    }
    return { status: res.status, data: await res.json().catch(() => ({})) };
  }

  try {
    const check = await get('/api/admin/check');
    if (!check) return;
    if (check.status === 403) {
      info('Aap admin nahi hain. Is page ko sirf admin dekh sakta hai.');
      return;
    }
    if (check.status !== 200) {
      info('Server error. Thodi der baad dobara try karein.');
      return;
    }
  } catch (e) {
    info('Server se connect nahi ho paya.');
    return;
  }

  const [c, o] = await Promise.all([
    get('/api/admin/contacts'),
    get('/api/admin/orders')
  ]);
  const contacts = (c && c.data.contacts) || [];
  const orders = (o && o.data.orders) || [];

  const byDate = (a, b) =>
    new Date(b.created_at || 0) - new Date(a.created_at || 0);
  contacts.sort(byDate);

  root.textContent = '';

  function section(title, count) {
    const h = document.createElement('h2');
    h.textContent = title + ' (' + count + ')';
    h.style.cssText = 'margin:28px 0 12px;font-size:1.4rem;';
    root.appendChild(h);
  }

  function card(lines) {
    const box = document.createElement('div');
    box.style.cssText =
      'padding:16px;margin-bottom:12px;border-radius:16px;background:#111827;' +
      'border:1px solid #1f2937;overflow-wrap:anywhere;';
    lines.forEach(([text, strong, dim]) => {
      if (!text) return;
      const p = document.createElement('div');
      p.textContent = text;
      p.style.cssText =
        'margin-top:6px;' +
        (strong ? 'font-weight:700;font-size:1.05rem;' : '') +
        (dim ? 'opacity:.65;font-size:.88rem;' : '') +
        'white-space:pre-wrap;';
      box.appendChild(p);
    });
    root.appendChild(box);
    return box;
  }

  const when = v => (v ? new Date(v).toLocaleString() : '');

  section('Customer messages', contacts.length);
  if (contacts.length === 0) card([['Abhi koi message nahi hai.']]);
  contacts.forEach(m => {
    const box = card([
      [m.name || 'No name', true],
      [m.email || '', false, true],
      [m.message || ''],
      [when(m.created_at), false, true]
    ]);
    if (m.email) {
      const a = document.createElement('a');
      a.href = 'mailto:' + m.email;
      a.textContent = 'Reply by email';
      a.style.cssText =
        'display:inline-block;margin-top:10px;color:#a3f069;font-weight:700;';
      box.appendChild(a);
    }
  });

  section('Orders', orders.length);
  if (orders.length === 0) card([['Abhi koi order nahi hai.']]);
  orders.forEach(x => {
    card([
      [x.service || 'Order', true],
      [x.details || ''],
      ['Status: ' + (x.status || 'new'), false, true],
      ['User: ' + String(x.user_id || '').slice(0, 8), false, true],
      [when(x.created_at), false, true]
    ]);
  });
});
