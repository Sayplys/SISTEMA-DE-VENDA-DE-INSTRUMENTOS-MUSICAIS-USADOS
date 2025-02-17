// pedidos.js

// Dados de exemplo (simulação de pedidos)
const pedidos = [
  {
    id: 1,
    data: "2023-10-01",
    status: "Entregue",
    produtos: [
      { name: "Guitarra Elétrica", price: 1200.00, image: "https://picsum.photos/100/100?random=1" },
      { name: "Amplificador", price: 500.00, image: "https://picsum.photos/100/100?random=2" },
    ],
  },
  {
    id: 2,
    data: "2023-10-05",
    status: "A Caminho",
    produtos: [
      { name: "Bateria Acústica", price: 2500.00, image: "https://picsum.photos/100/100?random=3" },
    ],
  },
  {
    id: 3,
    data: "2023-10-10",
    status: "Preparando",
    produtos: [
      { name: "Teclado Digital", price: 1800.00, image: "https://picsum.photos/100/100?random=4" },
      { name: "Pedal de Efeito", price: 300.00, image: "https://picsum.photos/100/100?random=5" },
    ],
  },
];

// Função para exibir os pedidos na página
function exibirPedidos() {
  const pedidosContainer = document.getElementById("pedidos-container");

  // Limpa o conteúdo atual
  pedidosContainer.innerHTML = "";

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
