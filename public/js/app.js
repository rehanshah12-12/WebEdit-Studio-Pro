(() => {
  const ready = fn =>
    document.readyState === 'loading'
      ? document.addEventListener('DOMContentLoaded', fn)
      : fn();

  // ---------- Mobile fit: stop sideways scrolling / zoom-out ----------
  if (!document.querySelector('meta[name="viewport"]')) {
    const m = document.createElement('meta');
    m.name = 'viewport';
    m.content = 'width=device-width, initial-scale=1';
    document.head.appendChild(m);
  }
  const fit = document.createElement('style');
  fit.textContent =
    'html,body{max-width:100%;overflow-x:hidden;}' +
    'img,video,svg,iframe{max-width:100%;}' +
    'h1,h2,h3,p,a{overflow-wrap:anywhere;}';
  document.head.appendChild(fit);

  ready(() => {
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

    // ---------- Footer year ----------
    document.querySelectorAll('[data-year]').forEach(el => {
      el.textContent = new Date().getFullYear();
    });

    // ---------- Login-aware menu ----------
    let loggedIn = false;
    try {
      loggedIn = !!localStorage.getItem('wes_token');
    } catch (e) {}

    if (loggedIn) {
      document.querySelectorAll('a[href*="login"]').forEach(link => {
        if (!/sign\s*in/i.test(link.textContent)) return;

        const logoutLink = link.cloneNode(true);
        logoutLink.textContent = 'Logout';
        logoutLink.setAttribute('href', '#');
        logoutLink.addEventListener('click', e => {
          e.preventDefault();
          try {
            localStorage.removeItem('wes_token');
            localStorage.removeItem('wes_email');
          } catch (err) {}
          window.location.href = 'index.html';
        });

        link.textContent = 'Dashboard';
        link.setAttribute('href', 'dashboard.html');
        link.insertAdjacentElement('afterend', logoutLink);
      });
    }

    // ---------- WhatsApp forms ----------
    document.querySelectorAll('[data-wa-form]').forEach(form =>
      form.addEventListener('submit', event => {
        event.preventDefault();
        const data = new FormData(form);
        const name = data.get('name') || 'there';
        const email = data.get('email') || 'Not provided';
        const service = data.get('service') || 'General enquiry';
        const message = data.get('message') || '';
        const text =
          `Hello WebEdit Studio!%0AName: ${encodeURIComponent(name)}` +
          `%0AEmail: ${encodeURIComponent(email)}` +
          `%0AService: ${encodeURIComponent(service)}` +
          `%0AMessage: ${encodeURIComponent(message)}`;
        window.open(`https://wa.me/923710416136?text=${text}`, '_blank', 'noopener');
      })
    );
  });
})();
