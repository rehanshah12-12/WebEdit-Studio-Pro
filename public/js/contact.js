document.addEventListener('DOMContentLoaded', () => {
  const form = document.querySelector('[data-contact-form]');
  const status = document.querySelector('[data-contact-status]');
  if (!form) return;

  const WA_NUMBER = '923710416136';

  form.addEventListener('submit', async event => {
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

    const text =
      `Hello WebEdit Studio!\nName: ${name}\nEmail: ${email}\n` +
      `Service: ${service}\nMessage: ${message}`;
    const waLink =
      `https://api.whatsapp.com/send?phone=${WA_NUMBER}&text=${encodeURIComponent(text)}`;

    if (status) status.textContent = 'Message save ho raha hai...';

    // Save in database (max 4 seconds wait)
    try {
      const controller = new AbortController();
      const timer = setTimeout(() => controller.abort(), 4000);
      await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name,
          email,
          message: service ? `[Service: ${service}]\n${message}` : message
        }),
        signal: controller.signal
      });
      clearTimeout(timer);
    } catch (e) {
      // Even if saving fails, still open WhatsApp
    }

    // Fallback button, in case the automatic open is blocked
    if (status) {
      status.textContent = 'Message save ho gaya. WhatsApp khul raha hai... ';
      const a = document.createElement('a');
      a.href = waLink;
      a.textContent = 'Open WhatsApp';
      a.style.cssText = 'color:#a3f069;font-weight:700;text-decoration:underline;';
      status.appendChild(a);
    }

    form.reset();
    window.location.href = waLink;
  });
});
