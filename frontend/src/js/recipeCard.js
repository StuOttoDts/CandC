import { escapeHtml } from './escapeHtml.js';
import { timeAgo } from './utils.js';

export function createRecipeCard(data) {
  const card = document.createElement('article');
  card.className = 'recipe-page'; // 👈 mudou aqui

  console.log('Criando card com dados:', data); // 🔥 log para verificar os dados
  const dt_ago = timeAgo(data.date_create);
  // HEADER
  const header = document.createElement('div');
  header.className = 'page-header';
  header.innerHTML = `
    <div class="card-author">
      <span class="author-badge">C</span>
      <span>
        <strong>${escapeHtml(data.author)}</strong>
      <span class="dot-separator">•</span>
  ${dt_ago}
</span>
    </div>
    <h2 class="recipe-title">${escapeHtml(data.title)}</h2>
  `;

  // BODY
  const body = document.createElement('div');
  body.className = 'page-body';

  if (data.image) {
    const image = document.createElement('img');
    image.className = 'recipe-image';
    image.src = data.image;
    body.appendChild(image);
  }

  const content = document.createElement('div');
  content.innerHTML = `
    <div class="page-section">
      <h3>Ingredientes</h3>
      <p>${data.ingredients}</p>
    </div>

    <div class="page-section">
      <h3>Modo de preparo</h3>
      <p>${data.preparation}</p>
    </div>
  `;

  body.appendChild(content);

  // ACTIONS (mantido do seu)
  const actions = document.createElement('div');
  actions.className = 'page-footer';

  const likeButton = document.createElement('button'); 
  likeButton.type = 'button'; 
  likeButton.className = 'card-action-btn'; 
  likeButton.innerHTML = '<span class="icon">❤️</span><span>Curtir</span><span class="action-count">0</span>'; 

  likeButton.addEventListener('click', () => { 
    const countEl = likeButton.querySelector('.action-count'); 
    const current = Number(countEl.textContent); 
    countEl.textContent = current + 1; 
  });

  const commentButton = document.createElement('button');
  commentButton.type = 'button';
  commentButton.className = 'card-action-btn';
  commentButton.innerHTML = '<span class="icon">💬</span><span>Comentar</span>';

  const shareButton = document.createElement('button');
  shareButton.type = 'button';
  shareButton.className = 'card-action-btn';
  shareButton.innerHTML = '<span class="icon">🔗</span><span>Compartilhar</span>';

  // 👇 ordem mantida (like primeiro)
  actions.append(likeButton, commentButton, shareButton);

  // MONTA CARD
  card.append(header, body, actions);

  return card;
}