export function renderEmptyState(feed) {
  const empty = feed.querySelector('.empty-state');

  if (!feed.children.length) {
    if (!empty) {
      const el = document.createElement('div');
      el.className = 'empty-state';
      el.innerHTML = '<h2>Seu feed de receitas</h2>';
      feed.appendChild(el);
    }
  } else if (empty) {
    empty.remove();
  }
}