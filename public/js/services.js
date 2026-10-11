
document.addEventListener('DOMContentLoaded', () => {
 document.querySelectorAll('[data-service-request]').forEach(link => link.addEventListener('click', () => {
   const service = link.getAttribute('data-service-request') || 'a service';
   link.href = `https://wa.me/923710416136?text=${encodeURIComponent(`Hello WebEdit Studio, I am interested in ${service}. Please share details.`)}`;
   link.target = '_blank'; link.rel = 'noopener';
 }));
});
