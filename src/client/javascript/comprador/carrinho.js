// carrinho.js

// Função para carregar os itens do carrinho
function carregarCarrinho() {
  const carrinho = JSON.parse(localStorage.getItem("carrinho")) || [];
  const carrinhoContainer = document.getElementById("carrinho-container");
  const totalCarrinho = document.getElementById("total-carrinho");

  // Limpa o conteúdo atual
  carrinhoContainer.innerHTML = "";

  let total = 0;

  // Exibe cada item do carrinho
  carrinho.forEach((item, index) => {
    const itemDiv = document.createElement("div");
    itemDiv.className = "item-carrinho";

    itemDiv.innerHTML = `
      <img src="${item.image}" alt="${item.name}">
      <div class="info-item">
        <h3>${item.name}</h3>
        <p>R$ ${item.price.toFixed(2)}</p>
        <button class="btn-remover" data-index="${index}">Remover</button>
      </div>
    `;

    carrinhoContainer.appendChild(itemDiv);
    total += item.price;
  });

  // Atualiza o total do carrinho
  totalCarrinho.textContent = `R$ ${total.toFixed(2)}`;
}

// Função para remover item do carrinho
function removerItem(index) {
  const carrinho = JSON.parse(localStorage.getItem("carrinho")) || [];
  carrinho.splice(index, 1); // Remove o item do array
  localStorage.setItem("carrinho", JSON.stringify(carrinho)); // Atualiza o localStorage
  carregarCarrinho(); // Recarrega a exibição do carrinho
}

// Adiciona evento de clique para os botões de remover
document.addEventListener("click", (event) => {
  if (event.target.classList.contains("btn-remover")) {
    const index = event.target.getAttribute("data-index");
    removerItem(index);
  }
});

// Carrega o carrinho quando a página é aberta
document.addEventListener("DOMContentLoaded", carregarCarrinho);
