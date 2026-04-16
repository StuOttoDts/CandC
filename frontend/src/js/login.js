export function setupLogin() {
  const form = document.getElementById('loginForm');
  if (!form) return;

  const errorMsg = document.getElementById('errorMsg');

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const username = document.getElementById('username').value.trim();
    const password = document.getElementById('password').value.trim();

    if (!username || !password) {
      showError('Preencha todos os campos');
      return;
    }

    try {
      const response = await fetch('http://localhost:3000/users/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          username,
          password
        })
      });

      const data = await response.json();

      if (!response.ok) {
        showError(data.error || 'Erro ao fazer login');
        return;
      }

      // salva token JWT
      localStorage.setItem('userLogged', username);
      localStorage.setItem('userName', data.name || username);

      window.location.href = './index.html';

    } catch (err) {
      showError('Erro de conexão com servidor');
    }
  });

  function showError(msg) {
    errorMsg.textContent = msg;
    errorMsg.style.display = 'block';
  }
}