(() => {
  document.querySelectorAll('[data-print-resume]').forEach(button => {
    button.addEventListener('click', () => window.print());
  });
})();
