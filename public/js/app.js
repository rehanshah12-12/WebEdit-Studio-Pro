(() => {
  const ready = fn =>
    document.readyState === 'loading'
      ? document.addEventListener('DOMContentLoaded', fn)
      : fn();

  const WA = '923710416136';
  const MAIL = 'webservices7373@gmail.com';

  if (!document.querySelector('meta[name="viewport"]')) {
    const m = document.createElement('meta');
    m.name = 'viewport';
    m.content = 'width=device-width, initial-scale=1';
    document.head.appendChild(m);
  }

  const shade = 'linear-gradient(180deg,rgba(8,12,40,0) 35%,rgba(8,12,40,.72))';
  const st = document.createElement('style');
  st.textContent = `
.portfolio-visual{height:210px;place-items:end start;padding:18px;font-size:18px;background:${shade},url(/work-web.jpg) center/cover,var(--box1)}
.portfolio-visual.v2{background:${shade},url(/work-photo.jpg) center/cover,var(--box2)}
.portfolio-visual.v3{background:${shade},url(/work-video.jpg) center/cover,var(--box3)}
.service-card{overflow:hidden}
.service-card::before{content:"";display:block;height:150px;margin:-27px -27px 22px;background:url(/work-web.jpg) center/cover,var(--box1)}
.service-card:nth-child(2)::before{background:url(/work-photo.jpg) center/cover,var(--box2)}
.service-card:nth-child(3)::before{background:url(/work-video.jpg) center/cover,var(--box3)}
.process{width:min(var(--max),calc(100% - 40px));margin:0 auto;padding:70px 0 20px}
.process-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:17px}
.process-step{padding:26px;border:1px solid var(--line);border-radius:var(--radius);background:var(--card-bg);box-shadow:var(--shadow-sm)}
.process-step b{display:grid;place-items:center;width:40px;height:40px;border-radius:12px;background:var(--grad);color:#fff;font-family:Manrope,sans-serif;margin-bottom:14px}
.process-step h3{font:700 18px Manrope,sans-serif;margin:0 0 6px}
.process-step p{margin:0;color:var(--muted);font-size:13px}
.rv{opacity:0;transform:translateY(22px);transition:opacity .7s ease,transform .7s ease}
.rv.in{opacity:1;transform:none}
.wc-launch{position:fixed;right:16px;bottom:calc(16px + env(safe-area-inset-bottom));z-index:90;width:56px;height:56px;border:0;border-radius:50%;background:var(--grad);box-shadow:0 12px 30px var(--glow);cursor:pointer;display:grid;place-items:center}
.wc-box{position:fixed;right:16px;bottom:calc(84px + env(safe-area-inset-bottom));z-index:90;width:min(360px,calc(100vw - 32px));height:min(480px,calc(100vh - 130px));display:none;flex-direction:column;background:var(--panel);border:1px solid var(--line);border-radius:20px;box-shadow:var(--shadow);overflow:hidden}
.wc-box.open{display:flex}
.wc-head{display:flex;justify-content:space-between;align-items:center;padding:14px 16px;background:var(--grad);color:#fff}
.wc-head small{display:block;opacity:.85;font-size:11px}
.wc-x{background:none;border:0;color:#fff;font-size:18px;cursor:pointer}
.wc-log{flex:1;overflow-y:auto;padding:14px;display:flex;flex-direction:column;gap:8px}
.wc-m{max-width:85%;padding:10px 13px;border-radius:14px;background:var(--panel2);color:var(--text);font-size:13px;line-height:1.5;white-space:pre-line}
.wc-m.me{align-self:flex-end;background:var(--accent);color:#fff}
.wc-chips{display:flex;flex-wrap:wrap;gap:6px;padding:0 14px 10px}
.wc-chips button{border:1px solid var(--line);background:var(--panel);color:var(--text);border-radius:99px;padding:6px 12px;font-size:12px;cursor:pointer}
.wc-row{display:flex;gap:8px;padding:10px 14px;border-top:1px solid var(--line)}
.wc-row input{flex:1;min-width:0;padding:10px 12px;border:1px solid var(--input-line);border-radius:10px;background:var(--input-bg);color:var(--text);font-size:16px}
.wc-row button{border:0;border-radius:10px;padding:0 14px;background:var(--grad);color:#fff;font-weight:700;cursor:pointer}
.wc-wa{display:block;text-align:center;padding:10px;background:#25D366;color:#062b12;font-weight:700;font-size:13px}
@media(max-width:800px){.process-grid{grid-template-columns:1fr}}
@media(prefers-reduced-motion:reduce){.rv{opacity:1;transform:none;transition:none}}`;
  document.head.appendChild(st);

  ready(() => {
    const isApp = !!document.querySelector('[data-admin-note],[data-dashboard-name]');

    // ---------- Mobile menu ----------
    const toggle = document.querySelector('.menu-toggle');
    const nav = document.querySelector('.nav');
    if (toggle && nav) {
      toggle.addEventListener('click', () => {
        const open = nav.classList.toggle('open');
        toggle.setAttribute('aria-expanded', String(open));
        toggle.textContent = open ? '✕' : '☰';
      });
    }

    document.querySelectorAll('[data-year]').forEach(el => {
      el.textContent = new Date().getFullYear();
    });

    // ---------- Login-aware menu ----------
    let loggedIn = false;
    try { loggedIn = !!localStorage.getItem('wes_token'); } catch (e) {}
    if (loggedIn) {
      document.querySelectorAll('a[href*="login"]').forEach(link => {
        if (!/sign\s*in/i.test(link.textContent)) return;
        const out = link.cloneNode(true);
        out.textContent = 'Logout';
        out.setAttribute('href', '#');
        out.addEventListener('click', e => {
          e.preventDefault();
          try {
            localStorage.removeItem('wes_token');
            localStorage.removeItem('wes_email');
          } catch (err) {}
          window.location.href = 'index.html';
        });
        link.textContent = 'Dashboard';
        link.setAttribute('href', 'dashboard.html');
        link.insertAdjacentElement('afterend', out);
      });
    }

    // ---------- WhatsApp forms ----------
    document.querySelectorAll('[data-wa-form]').forEach(form =>
      form.addEventListener('submit', event => {
        event.preventDefault();
        const d = new FormData(form);
        const text =
          `Hello WebEdit Studio!%0AName: ${encodeURIComponent(d.get('name') || 'there')}` +
          `%0AEmail: ${encodeURIComponent(d.get('email') || 'Not provided')}` +
          `%0AService: ${encodeURIComponent(d.get('service') || 'General enquiry')}` +
          `%0AMessage: ${encodeURIComponent(d.get('message') || '')}`;
        window.open(`https://wa.me/${WA}?text=${text}`, '_blank', 'noopener');
      })
    );

    // ---------- How it works (home page only) ----------
    const cta = document.querySelector('.cta');
    if (cta && document.querySelector('.hero')) {
      const s = document.createElement('section');
      s.className = 'process';
      const steps = [
        ['1', 'Share your idea', 'Send the contact form or message us on WhatsApp with what you need.'],
        ['2', 'Get a custom quote', 'We discuss your requirements and share pricing on WhatsApp.'],
        ['3', 'Track your order', 'Create a free account, place orders and follow their status in your dashboard.']
      ];
      s.innerHTML =
        '<div class="section-heading"><h2>How it <span>works</span></h2></div>' +
        '<div class="process-grid">' +
        steps.map(([n, h, p]) =>
          `<div class="process-step"><b>${n}</b><h3>${h}</h3><p>${p}</p></div>`).join('') +
        '</div>';
      cta.parentNode.insertBefore(s, cta);
    }

    // ---------- Scroll reveal ----------
    if ('IntersectionObserver' in window &&
        !matchMedia('(prefers-reduced-motion: reduce)').matches) {
      const io = new IntersectionObserver(list => list.forEach(e => {
        if (!e.isIntersecting) return;
        e.target.classList.add('in');
        io.unobserve(e.target);
        setTimeout(() => e.target.classList.remove('rv', 'in'), 800);
      }), { threshold: 0.12 });
      document.querySelectorAll(
        '.service-card,.content-card,.process-step,.feature-list>div,.stat-card'
      ).forEach(n => { n.classList.add('rv'); io.observe(n); });
    }

    // ---------- Chat assistant (not on dashboard/admin) ----------
    if (isApp) return;
    const el = (t, c, x) => {
      const n = document.createElement(t);
      if (c) n.className = c;
      if (x) n.textContent = x;
      return n;
    };
    // Edit these answers anytime. Add your real prices / delivery times here.
    const KB = [
      [/\b(hi|hello|hey)\b|salam/, 'Hello! 👋 Ask me about our services, pricing or how to place an order.'],
      [/pric|cost|\brates?\b|charge|quote|how much|budget/, 'Pricing is custom. Tell us what you need and we share a quote on WhatsApp after discussing your requirements.'],
      [/web|site|landing/, 'We build responsive, clear websites around your brand, goals and audience.'],
      [/photo|image|retouch|picture/, 'Photo editing: polished visuals, clean retouching and creative image improvements.'],
      [/video|reel|short/, 'We edit videos and reels to make your content engaging and ready to share.'],
      [/order|track|status|account|log ?in|sign ?(in|up)|dashboard/, 'Create a free account, place an order from your dashboard and follow its status there (pending, in progress, completed).'],
      [/contact|whatsapp|email|reach|call|talk/, `WhatsApp: +${WA}\nEmail: ${MAIL}`],
      [/service|offer|what do you/, 'We offer Website Development, Photo Editing and Video & Reels Editing.']
    ];
    const FALL = 'I am not sure about that. Please message us on WhatsApp and we will help you personally.';

    const box = el('div', 'wc-box');
    const head = el('div', 'wc-head');
    const ttl = el('div');
    ttl.append(el('b', '', 'WebEdit Assistant'), el('small', '', 'Automated replies · not a person'));
    const close = el('button', 'wc-x', '✕');
    close.type = 'button';
    head.append(ttl, close);
    const log = el('div', 'wc-log');
    const chips = el('div', 'wc-chips');
    const row = el('form', 'wc-row');
    const inp = el('input');
    inp.placeholder = 'Type your question...';
    const go = el('button', '', 'Send');
    go.type = 'submit';
    row.append(inp, go);
    const wa = el('a', 'wc-wa', 'Chat on WhatsApp');
    wa.href = `https://wa.me/${WA}`;
    box.append(head, log, chips, row, wa);

    const launch = el('button', 'wc-launch');
    launch.type = 'button';
    launch.setAttribute('aria-label', 'Open chat');
    launch.innerHTML =
      '<svg viewBox="0 0 24 24" width="26" height="26" fill="none" stroke="#fff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12a8 8 0 0 1-11.6 7.1L4 20l1-4.6A8 8 0 1 1 21 12z"/></svg>';

    const say = (t, me) => {
      log.append(el('div', 'wc-m' + (me ? ' me' : ''), t));
      log.scrollTop = log.scrollHeight;
    };
    const ask = q => {
      q = q.trim();
      if (!q) return;
      say(q, true);
      const s = q.toLowerCase();
      const hit = KB.find(([r]) => r.test(s));
      setTimeout(() => say(hit ? hit[1] : FALL), 350);
    };
    ['Services', 'Pricing', 'How to order', 'Contact'].forEach(t => {
      const b = el('button', '', t);
      b.type = 'button';
      b.onclick = () => ask(t);
      chips.append(b);
    });
    row.onsubmit = e => { e.preventDefault(); ask(inp.value); inp.value = ''; };

    let greeted = false;
    launch.onclick = () => {
      box.classList.toggle('open');
      if (!greeted) {
        greeted = true;
        say('Hi! 👋 I can answer questions about our services, pricing and orders.');
      }
    };
    close.onclick = () => box.classList.remove('open');
    document.body.append(box, launch);
  });
})();
