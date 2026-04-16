export function setupRegister() {
 console.log("Setup register");
  const form = document.getElementById("registerForm");
  if (!form) return;

  const errorMsg = document.getElementById('errorMsg');

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const username = document.getElementById('username').value.trim();
    const name = document.getElementById('Name').value.trim();
    const password = document.getElementById('password').value.trim();

    if (!username || !name || !password) {
      showError('Preencha todos os campos');
      return;
    }

    try {
      const response = await fetch('http://localhost:3000/users/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          username,
          name,
          password
        })
      });

      const data = await response.json();

      if (!response.ok) {
        showError(data.error || 'Erro ao fazer registro');
        return;
      }

      alert('Usuário criado com sucesso!');
      //window.location.href = './login.html';

    } catch (err) {
      showError('Erro de conexão com servidor');
    }
  });

  function showError(msg) {
    errorMsg.textContent = msg;
    errorMsg.style.display = 'block';
  }
}