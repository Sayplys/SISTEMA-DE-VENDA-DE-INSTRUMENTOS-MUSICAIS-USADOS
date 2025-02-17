// api.js

const API_BASE_URL = "http://localhost:8000"; // URL base da API (ajuste conforme necessário)

// Função para criar um produto
export async function createProduto(produto) {
  try {
    const response = await fetch(`${API_BASE_URL}/produtos/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(produto),
    });

    if (!response.ok) {
      throw new Error("Erro ao criar produto");
    }

    return await response.json();
  } catch (error) {
    console.error("Erro:", error);
    throw error;
  }
}

// Função para buscar todos os produtos
export async function getProdutos() {
  try {
    const response = await fetch(`${API_BASE_URL}/produtos/`);

    if (!response.ok) {
      throw new Error("Erro ao buscar produtos");
    }

    return await response.json();
  } catch (error) {
    console.error("Erro:", error);
    return [];
  }
}

// Função para buscar um produto por ID
export async function getProdutoById(produtoId) {
  try {
    const response = await fetch(`${API_BASE_URL}/produtos/${produtoId}`);

    if (!response.ok) {
      if (response.status === 404) {
        throw new Error("Produto não encontrado");
      }
      throw new Error("Erro ao buscar produto");
    }

    return await response.json();
  } catch (error) {
    console.error("Erro:", error);
    throw error;
  }
}

// Função para atualizar um produto
export async function updateProduto(produtoId, produto) {
  try {
    const response = await fetch(`${API_BASE_URL}/produtos/${produtoId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(produto),
    });

    if (!response.ok) {
      if (response.status === 404) {
        throw new Error("Produto não encontrado");
      }
      throw new Error("Erro ao atualizar produto");
    }

    return await response.json();
  } catch (error) {
    console.error("Erro:", error);
    throw error;
  }
}

// Função para deletar um produto
export async function deleteProduto(produtoId) {
  try {
    const response = await fetch(`${API_BASE_URL}/produtos/${produtoId}`, {
      method: "DELETE",
    });

    if (!response.ok) {
      if (response.status === 404) {
        throw new Error("Produto não encontrado");
      }
      throw new Error("Erro ao deletar produto");
    }

    return await response.json();
  } catch (error) {
    console.error("Erro:", error);
    throw error;
  }
}
