// listagem.js

import { fetchProdutos } from '../api/produtos/getProdutos.js';

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
      <p><strong>Categoria:</strong> ${produto.category}</p>
      <button class="btn">Comprar</button>
    `;

    produtosContainer.appendChild(produtoDiv);
  });
}

// Função para filtrar produtos
function filtrarProdutos(produtos, busca, categoria) {
  return produtos.filter((produto) => {
    const nomeMatch = produto.name.toLowerCase().includes(busca.toLowerCase());
    const categoriaMatch = categoria === "" || produto.category === categoria;
    return nomeMatch && categoriaMatch;
  });
}

// Função principal para carregar a página
async function carregarPagina() {
  const produtos = await fetchProdutos();

  // Exibe todos os produtos inicialmente
  exibirProdutos(produtos);

  // Adiciona eventos de filtro
  const buscaInput = document.getElementById("busca");
  const categoriaSelect = document.getElementById("categoria");

  buscaInput.addEventListener("input", () => {
    const produtosFiltrados = filtrarProdutos(produtos, buscaInput.value, categoriaSelect.value);
    exibirProdutos(produtosFiltrados);
  });

  categoriaSelect.addEventListener("change", () => {
    const produtosFiltrados = filtrarProdutos(produtos, buscaInput.value, categoriaSelect.value);
    exibirProdutos(produtosFiltrados);
  });
}

// Executa a função principal quando a página carregar
document.addEventListener("DOMContentLoaded", carregarPagina);
