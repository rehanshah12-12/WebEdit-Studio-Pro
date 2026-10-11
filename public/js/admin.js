// Admin page is a visual placeholder. Never expose private records or admin controls without server-side authorization.
document.addEventListener('DOMContentLoaded', () => {
 const note = document.querySelector('[data-admin-note]');
 if (note) note.textContent = 'Demo admin interface only. Connect a secure backend and enforce admin permissions on the server before using this page.';
});

