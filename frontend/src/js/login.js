export function setupLogin() {
  const form = document.getElementById('loginForm');
  if (!form) return; // evita erro se não estiver na tela de login

  const errorMsg = document.getElementById('errorMsg');

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const username = document.getElementById('username').value.trim();
    const password = document.getElementById('password').value.trim();

    if (!username || !password) {
      showError('Preencha todos os campos');
      return;
    }

    if (username === 'rafael.otto' && password === '1234') {
      localStorage.setItem('userLogged', 'rafael.otto');
      localStorage.setItem('userName', 'Rafael Otto');
      window.location.href = './index.html'; // sua tela principal
    } else {
      showError('Usuário ou senha inválidos');
    }
  });

  function showError(msg) {
    errorMsg.textContent = msg;
    errorMsg.style.display = 'block';
  }
}