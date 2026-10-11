
document.addEventListener('DOMContentLoaded', () => {
 const form = document.querySelector('[data-contact-form]');
 const status = document.querySelector('[data-contact-status]');
 if (form) form.addEventListener('submit', event => {
  event.preventDefault();
  if (status) status.textContent = 'WhatsApp khul raha hai. Message send karne se pehle details check kar lena.';
  const d = new FormData(form);
  const body = `Hello WebEdit Studio!\nName: ${d.get('name')}\nEmail: ${d.get('email')}\nService: ${d.get('service')}\nMessage: ${d.get('message')}`;
  window.open(`https://wa.me/923710416136?text=${encodeURIComponent(body)}`, '_blank', 'noopener');
 });
});
