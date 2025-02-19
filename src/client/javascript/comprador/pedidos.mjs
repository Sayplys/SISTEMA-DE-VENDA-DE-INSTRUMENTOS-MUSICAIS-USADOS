// pedidos.js

// Função para exibir os pedidos na página
function exibirPedidos() {
  const pedidosContainer = document.getElementById("pedidos-container");

  // Limpa o conteúdo atual
  pedidosContainer.innerHTML = "";
	//
  // Cria e adiciona cada pedido ao container
  pedidos.forEach((pedido) => {
    const pedidoDiv = document.createElement("div");
    pedidoDiv.className = "pedido";

    const produtosHTML = pedido.produtos
      .map(
        (produto) => `
        <div class="produto-pedido">
          <img src="${produto.image}" alt="${produto.name}">
          <div class="info-produto">
            <h4>${produto.name}</h4>
            <p>R$ ${produto.price.toFixed(2)}</p>
          </div>
        </div>
      `
      )
      .join("");

    pedidoDiv.innerHTML = `
      <div class="cabecalho-pedido">
        <h3>Pedido #${pedido.id}</h3>
        <p>Data: ${pedido.data}</p>
        <p>Status: <span class="status">${pedido.status}</span></p>
      </div>
      <div class="produtos-pedido">
        ${produtosHTML}
      </div>
    `;

    pedidosContainer.appendChild(pedidoDiv);
  });
}

// Carrega os pedidos quando a página é aberta
document.addEventListener("DOMContentLoaded", exibirPedidos);
