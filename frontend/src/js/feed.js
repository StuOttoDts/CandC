export function renderEmptyState(feed) {
  const empty = feed.querySelector('.empty-state');

  const hasCards = feed.querySelector('.card');

  if (!hasCards) {
    if (!empty) {
      const el = document.createElement('div');
      el.className = 'empty-state';
      el.innerHTML = `
        <h2>Seu feed de receitas</h2>
        <p>Adicione uma nova receita e ela aparecerá aqui.</p>
      `;
      feed.appendChild(el);
    }
  } else {
    if (empty) empty.remove();
  }
}