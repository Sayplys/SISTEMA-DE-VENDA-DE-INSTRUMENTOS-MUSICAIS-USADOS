// home.js

import { fetchProdutos } from './api/produtos/getProdutos.js';

// Função para exibir os produtos na página
function exibirProdutos(produtos) {
  const produtosContainer = document.getElementById("produtos-container");

  // Limpa o conteúdo atual
  produtosContainer.innerHTML = "";

  // Cria e adiciona cada produto ao container
  produtos.forEach((produto) => {
    const produtoDiv = document.createElement("div");
    produtoDiv.className = "produto";

    produtoDiv.innerHTML = `
      <img src="${produto.image}" alt="${produto.name}">
      <h3>${produto.name}</h3>
      <p>R$ ${produto.price.toFixed(2)}</p>
      <button class="btn">Comprar</button>
    `;

    produtosContainer.appendChild(produtoDiv);
  });
}

// Função principal para carregar a página
async function carregarPagina() {
  // Busca os últimos 3 produtos (ou outro número especificado)
  const produtos = await fetchProdutos(3);
  exibirProdutos(produtos);
}

// Executa a função principal quando a página carregar
document.addEventListener("DOMContentLoaded", carregarPagina);
