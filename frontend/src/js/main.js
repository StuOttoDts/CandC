import { createRecipeCard } from './recipeCard.js';
import { setupModal } from './modal.js';
import { setupImagePreview } from './imagePreview.js';
import { setupTheme } from './theme.js';
import { renderEmptyState } from './feed.js';
import { setupLogin } from './login.js';
import { setupInbox } from './inbox.js';

setupLogin();
setupInbox();
const modal = setupModal({
  openBtn: document.getElementById('openModalBtn'),
  closeBtn: document.getElementById('closeModalBtn'),
  cancelBtn: document.getElementById('cancelBtn'),
  overlay: document.getElementById('modalOverlay'),
  form: document.getElementById('recipeForm'),
});

const imagePreview = setupImagePreview({
  input: document.getElementById('recipeImage'),
  previewImg: document.getElementById('imagePreview'),
  container: document.getElementById('imagePreviewContainer'),
  removeBtn: document.getElementById('removeImageBtn'),
});

const theme = setupTheme(document.getElementById('themeToggleBtn'));
theme.init();

const form = document.getElementById('recipeForm');
const feed = document.getElementById('feed');
const sidebarLinks = document.querySelectorAll('.sidebar-link[data-section]');
const explorePanel = document.getElementById('explorePanel');
const messagesPanel = document.getElementById('messagesPanel');
const notificationsPanel = document.getElementById('notificationsPanel');
const logoutLink = document.getElementById('logoutLink');

function setActiveSection(section) {
  sidebarLinks.forEach((link) => {
    link.classList.toggle('active', link.dataset.section === section);
  });

  feed.classList.toggle('hidden', section !== 'home');
  explorePanel.classList.toggle('hidden', section !== 'explore');
  messagesPanel.classList.toggle('hidden', section !== 'messages');
  notificationsPanel.classList.toggle('hidden', section !== 'notifications');
}

sidebarLinks.forEach((link) => {
  link.addEventListener('click', (event) => {
    event.preventDefault();
    setActiveSection(link.dataset.section);
  });
});

setActiveSection('home');

form.addEventListener('submit', (e) => {
  e.preventDefault();

  const data = new FormData(form);

  const recipe = {
    author: localStorage.getItem('userName') || 'Anônimo',
    title: data.get('title').trim(),
    ingredients: data.get('ingredients').trim(),
    preparation: data.get('preparation').trim(),
    image: imagePreview.getImage(),
  };

  const card = createRecipeCard(recipe);
  feed.prepend(card);

  renderEmptyState(feed);
  modal.close();
  imagePreview.clear();
});

renderEmptyState(feed);

const userLogged = localStorage.getItem('userLogged');
const userName = localStorage.getItem('userName');

if (userLogged && userName) {
  document.getElementById('userName').textContent = userName;
  document.getElementById('userLogged').textContent = `@${userLogged}`;
} else {
  window.location.href = './login.html';
}
logoutLink.addEventListener('click', (e) => {
  e.preventDefault();
  localStorage.removeItem('userLogged');
  localStorage.removeItem('userName');
  window.location.href = './login.html';
});
