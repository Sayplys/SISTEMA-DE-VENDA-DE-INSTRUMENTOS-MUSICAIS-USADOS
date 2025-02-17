// finalizacao.js

// Função para confirmar o pedido
function confirmarPedido(event) {
  event.preventDefault();

  const metodoPagamento = document.querySelector('input[name="pagamento"]:checked');
  const endereco = document.getElementById("endereco").value;

  if (!metodoPagamento || !endereco) {
    alert("Por favor, preencha todos os campos.");
    return;
  }

  // Limpa o carrinho após a finalização
  localStorage.removeItem("carrinho");

  alert("Pedido confirmado! Obrigado por comprar na ReSound.");
  window.location.href = "index.html"; // Redireciona para a página inicial
}

// Adiciona evento de submit ao formulário
document.getElementById("form-endereco").addEventListener("submit", confirmarPedido);
