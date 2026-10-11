(() => {
  const toggle = document.querySelector('.menu-toggle');
  const nav = document.querySelector('.nav');
  if (toggle && nav) toggle.addEventListener('click', () => { const open = nav.classList.toggle('open'); toggle.setAttribute('aria-expanded', String(open)); toggle.textContent = open ? '✕' : '☰'; });
  document.querySelectorAll('[data-year]').forEach(el => el.textContent = new Date().getFullYear());
  document.querySelectorAll('[data-wa-form]').forEach(form => form.addEventListener('submit', event => {
    event.preventDefault();
    const data = new FormData(form);
    const name = data.get('name') || 'there';
    const email = data.get('email') || 'Not provided';
    const service = data.get('service') || 'General enquiry';
    const message = data.get('message') || '';
    const text = `Hello WebEdit Studio!%0AName: ${encodeURIComponent(name)}%0AEmail: ${encodeURIComponent(email)}%0AService: ${encodeURIComponent(service)}%0AMessage: ${encodeURIComponent(message)}`;
    window.open(`https://wa.me/923710416136?text=${text}`, '_blank', 'noopener');
  }));
})();
