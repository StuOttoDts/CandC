import { escapeHtml } from './escapeHtml.js';

export function setupInbox() {

const panel = document.getElementById('inbox-header');

// Exemplo de mensagem
const messages = [
  {
    sender: 'Maria Silva',
    resContent: 'Oi! Gostaria de saber se você tem uma receita de bolo de chocolate?' ,
    timestamp: new Date().toLocaleString('pt-BR', { dateStyle: 'short' })
  },
  {
    sender: 'João Souza',
    resContent: 'Tenho sim! Quer a receita completa?' + ".........",
    timestamp: new Date().toLocaleString('pt-BR', { dateStyle: 'short' })
  }
];
let html = '<div class="message-container">';

messages.forEach(message => {
  html += `
    <div class="message-item">
      <div class="message-header">
        <strong>${escapeHtml(message.sender)}</strong>
        <span class="timestamp">${message.timestamp}</span>
      </div>
      <p class="message-preview">${escapeHtml(message.resContent)}</p>
    </div>
  `;
});

html += '</div>';

panel.innerHTML = html;
}