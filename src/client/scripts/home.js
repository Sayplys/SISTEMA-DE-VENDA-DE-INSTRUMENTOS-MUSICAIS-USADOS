import { getProdutos } from "./api/produto.js";

document.addEventListener("DOMContentLoaded", async () => {
  const container = document.getElementById("instrumentos-destaque");

  try {
    // Busca os últimos 3 produtos adicionados
    const produtos = await getProdutos(3);

    // Exibe os produtos na página
    produtos.forEach(produto => {
      const card = document.createElement("div");
      card.className = "instrumento-card";

      card.innerHTML = `
        <img src="${produto.imagem || 'https://via.placeholder.com/150'}" alt="${produto.nome}">
        <h3>${produto.nome}</h3>
        <p>R$ ${produto.preco.toFixed(2)}</p>
      `;

      container.appendChild(card);
    });
  } catch (error) {
    console.error("Erro ao carregar produtos:", error);
    container.innerHTML = "<p>Erro ao carregar os instrumentos. Tente novamente mais tarde.</p>";
  }
});
