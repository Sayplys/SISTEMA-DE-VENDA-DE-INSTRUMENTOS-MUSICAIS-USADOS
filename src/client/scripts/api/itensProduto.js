const API_BASE_URL = "http://localhost:8000"; // URL base da API (ajuste conforme necessário)

// Função para criar um item de produto
export async function createItemProduto(itemProduto) {
  try {
    const response = await fetch(`${API_BASE_URL}/api/itens-produto/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(itemProduto),
    });

    if (!response.ok) {
      throw new Error("Erro ao criar item de produto");
    }

    return await response.json();
  } catch (error) {
    console.error("Erro:", error);
    throw error;
  }
}

// Função para buscar todos os itens de produto
export async function getItensProduto(qnt = 3) {
  try {
    const response = await fetch(`${API_BASE_URL}/api/itens-produto/`);

    if (!response.ok) {
      throw new Error("Erro ao buscar itens de produto");
    }
		
		const itensProduto = await response.json();
		return itensProduto.slice(0, qnt);
  } catch (error) {
    console.error("Erro:", error);
    return [];
  }
}

// Função para buscar um item de produto por IDs (pedido e produto)
export async function getItemProdutoById(fkIdPedido, fkIdProduto) {
  try {
    const response = await fetch(`${API_BASE_URL}/api/itens-produto/${fkIdPedido}/${fkIdProduto}`);

    if (!response.ok) {
      if (response.status === 404) {
        throw new Error("Item de produto não encontrado");
      }
      throw new Error("Erro ao buscar item de produto");
    }

    return await response.json();
  } catch (error) {
    console.error("Erro:", error);
    throw error;
  }
}

// Função para atualizar um item de produto
export async function updateItemProduto(fkIdPedido, fkIdProduto, itemProduto) {
  try {
    const response = await fetch(`${API_BASE_URL}/api/itens-produto/${fkIdPedido}/${fkIdProduto}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(itemProduto),
    });

    if (!response.ok) {
      if (response.status === 404) {
        throw new Error("Item de produto não encontrado");
      }
      throw new Error("Erro ao atualizar item de produto");
    }

    return await response.json();
  } catch (error) {
    console.error("Erro:", error);
    throw error;
  }
}

// Função para deletar um item de produto
export async function deleteItemProduto(fkIdPedido, fkIdProduto) {
  try {
    const response = await fetch(`${API_BASE_URL}/api/itens-produto/${fkIdPedido}/${fkIdProduto}`, {
      method: "DELETE",
    });

    if (!response.ok) {
      if (response.status === 404) {
        throw new Error("Item de produto não encontrado");
      }
      throw new Error("Erro ao deletar item de produto");
    }

    return await response.json();
  } catch (error) {
    console.error("Erro:", error);
    throw error;
  }
}
