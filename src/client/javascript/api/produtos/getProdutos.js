// api.js

// URL da API fictícia (substitua pela sua API real)
const API_URL = "https://mockapi.io/projects/12345/produtos"; // Exemplo de URL fictícia

// Função para buscar produtos da API
export async function fetchProdutos(quantidade = 3) {
  try {
    const response = await fetch(API_URL);
    if (!response.ok) {
      throw new Error("Erro ao buscar produtos");
    }
    const produtos = await response.json();

    // Retorna apenas a quantidade especificada de produtos
    return produtos.slice(0, quantidade);
  } catch (error) {
    console.error("Erro:", error);
    return [];
  }
}
