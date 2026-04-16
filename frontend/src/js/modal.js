export function setupModal({ openBtn, closeBtn, cancelBtn, overlay, form, onClose }) {

  function open() {
    overlay.classList.remove('hidden');
    document.body.style.overflow = 'hidden';
  }

  function close() {
    overlay.classList.add('hidden');
    document.body.style.overflow = '';
    form.reset();
    onClose?.();
  }

  openBtn.addEventListener('click', open);
  closeBtn.addEventListener('click', close);
  cancelBtn.addEventListener('click', close);

  overlay.addEventListener('click', (e) => {
   if (e.target === overlay) close();
  });

  return { open, close };
} 