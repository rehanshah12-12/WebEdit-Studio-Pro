(() => {
  const ready = fn =>
    document.readyState === 'loading'
      ? document.addEventListener('DOMContentLoaded', fn)
      : fn();

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

        // Logout button (same look as the old Sign in button)
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

        // Old Sign in link becomes Dashboard
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
