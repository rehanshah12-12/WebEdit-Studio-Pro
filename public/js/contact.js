document.addEventListener('DOMContentLoaded', () => {
  const form = document.querySelector('[data-contact-form]');
  const status = document.querySelector('[data-contact-status]');
  if (!form) return;

  form.addEventListener('submit', event => {
    event.preventDefault();
    const d = new FormData(form);
    const name = String(d.get('name') || '').trim();
    const email = String(d.get('email') || '').trim();
    const service = String(d.get('service') || '').trim();
    const message = String(d.get('message') || '').trim();

    if (!name || !message) {
      if (status) status.textContent = 'Naam aur message zaroor likhein.';
      return;
    }

    // Open WhatsApp first (phones block popups opened after waiting)
    const body =
      `Hello WebEdit Studio!\nName: ${name}\nEmail: ${email}\n` +
      `Service: ${service}\nMessage: ${message}`;
    window.open(
      `https://wa.me/923710416136?text=${encodeURIComponent(body)}`,
      '_blank',
      'noopener'
    );

    if (status) status.textContent = 'Message save ho raha hai...';

    // Save the same message in the database
    fetch('/api/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name,
        email,
        message: service ? `[Service: ${service}]\n${message}` : message
      })
    })
      .then(res => res.json().catch(() => ({})).then(data => ({ ok: res.ok, data })))
      .then(({ ok, data }) => {
        if (!status) return;
        if (ok) {
          status.textContent =
            'Message save ho gaya. WhatsApp mein bhi bhej dena.';
          form.reset();
        } else {
          status.textContent =
            (data.error || 'Message save nahi hua.') +
            ' WhatsApp se bhej sakte hain.';
        }
      })
      .catch(() => {
        if (status) {
          status.textContent =
            'Server se connect nahi hua. WhatsApp se bhej sakte hain.';
        }
      });
  });
});
