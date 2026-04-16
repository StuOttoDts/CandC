import { createRecipeCard } from './recipeCard.js';
import { setupModal } from './modal.js';
import { setupImagePreview } from './imagePreview.js';
import { setupTheme } from './theme.js';
import { renderEmptyState } from './feed.js';
import { setupLogin } from './login.js';
import { setupInbox } from './inbox.js';
import { setupRegister } from './register.js';
// futuramente:
// import { setupRegister } from './register.js';

// 🔥 Detecta a página atual
const page = document.body.dataset.page;

//
// =======================
// 🟢 HOME (index.html)
// =======================
//
if (page === 'index') {

  // 🔐 proteção de rota (simples)
  const userLogged = localStorage.getItem('userLogged');
  const userName = localStorage.getItem('userName');

  if (!userLogged || !userName) {
    window.location.href = './login.html';
  }

  // 👤 dados do usuário
  const userNameEl = document.getElementById('userName');
  const userLoggedEl = document.getElementById('userLogged');

  if (userNameEl && userLoggedEl) {
    userNameEl.textContent = userName;
    userLoggedEl.textContent = `@${userLogged}`;
  }

  // 🌙 THEME
  const themeBtn = document.getElementById('themeToggleBtn');
  if (themeBtn) {
    const theme = setupTheme(themeBtn);
    theme.init();
  }

  // 🪟 MODAL
  const modal = setupModal({
    openBtn: document.getElementById('openModalBtn'),
    closeBtn: document.getElementById('closeModalBtn'),
    cancelBtn: document.getElementById('cancelBtn'),
    overlay: document.getElementById('modalOverlay'),
    form: document.getElementById('recipeForm'),
  });

  // 🖼️ IMAGE PREVIEW
  const imagePreview = setupImagePreview({
    input: document.getElementById('recipeImage'),
    previewImg: document.getElementById('imagePreview'),
    container: document.getElementById('imagePreviewContainer'),
    removeBtn: document.getElementById('removeImageBtn'),
  });

  // 📄 FEED
  const form = document.getElementById('recipeForm');
  const feed = document.getElementById('feed');

  if (form && feed) {
    form.addEventListener('submit', async (e) => {
      e.preventDefault();

      const data = new FormData(form);

      const recipe = {
        title: data.get('title')?.trim(),
        ingredients: data.get('ingredients')?.trim(),
        preparation: data.get('preparation')?.trim(),
        img_dir: imagePreview?.getImage(),
        userId: 1 // depois vamos pegar do JWT
      };

      try {
        const res = await fetch('http://localhost:3000/recipes', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },

          body: JSON.stringify(recipe)
        });
        console.log('Enviando receita:', recipe);

        if (!res.ok) throw new Error();

        await loadRecipes(); // recarrega feed
        modal?.close();
        imagePreview?.clear();
        form.reset();

      } catch (err) {
        alert('Erro ao criar receita');
      }
    });

    renderEmptyState(feed);
  }

  // 📩 INBOX
  setupInbox();
  loadRecipes();

  // 📌 SIDEBAR
  const sidebarLinks = document.querySelectorAll('.sidebar-link[data-section]');
  const explorePanel = document.getElementById('explorePanel');
  const messagesPanel = document.getElementById('messagesPanel');
  const notificationsPanel = document.getElementById('notificationsPanel');

  function setActiveSection(section) {
    sidebarLinks.forEach((link) => {
      link.classList.toggle('active', link.dataset.section === section);
    });

    if (feed) feed.classList.toggle('hidden', section !== 'home');
    if (explorePanel) explorePanel.classList.toggle('hidden', section !== 'explore');
    if (messagesPanel) messagesPanel.classList.toggle('hidden', section !== 'messages');
    if (notificationsPanel) notificationsPanel.classList.toggle('hidden', section !== 'notifications');
  }

  sidebarLinks.forEach((link) => {
    link.addEventListener('click', (event) => {
      event.preventDefault();
      setActiveSection(link.dataset.section);
    });
  });

  setActiveSection('index');

  // 🚪 LOGOUT
  const logoutLink = document.getElementById('logoutLink');

  if (logoutLink) {
    logoutLink.addEventListener('click', (e) => {
      e.preventDefault();
      localStorage.clear();
      window.location.href = './login.html';
    });
  }

  async function loadRecipes() {
    try {
      const res = await fetch('http://localhost:3000/recipes');
      const recipes = await res.json();

      feed.innerHTML = '';

      for (const r of recipes) {

        const user = await loadUser(r.ID_USER); // 🔥 AGORA ESPERA
        console.log('Receita:', r, 'Usuário:', user);
        const card = createRecipeCard({
          author: user.username,
          title: r.TITLE,
          ingredients: r.INGREDIENTS,
          preparation: r.PREPARATION,
          image: r.IMG_DIR,
          date_create: r.CREATED_AT
        });
        feed.appendChild(card);
      }

    } catch (err) {
      console.error('Erro ao carregar receitas', err);
    }
    renderEmptyState(feed);
  }

  async function loadUser(id) {
    const res = await fetch(`http://localhost:3000/users/${id}`);
    const user = await res.json();
    return user;
  }
}
//
// =======================
// 🔐 LOGIN (login.html)
// =======================
//
if (page === 'login') {
  setupLogin();

  const registerBtn = document.getElementById('registerBtn');

  if (registerBtn) {
    registerBtn.addEventListener('click', () => {
      window.location.href = './register.html';
    });
  }
}

//
// =======================
// 📝 REGISTER (register.html)
// =======================
//
if (page === 'register') {
  setupRegister();

  const loginBtn = document.getElementById('loginBtn');

  /*if (loginBtn) {
    loginBtn.addEventListener('click', () => {
      window.location.href = './login.html';
    });
  }*/
}