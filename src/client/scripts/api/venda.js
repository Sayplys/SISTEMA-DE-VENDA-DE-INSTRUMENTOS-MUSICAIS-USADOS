const API_BASE_URL = "http://localhost:8000"; // URL base da API (ajuste conforme necessário)

// Função para criar uma venda
export async function createVenda(venda) {
  try {
    const response = await fetch(`${API_BASE_URL}/api/vendas/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(venda),
    });

    if (!response.ok) {
      throw new Error("Erro ao criar venda");
    }

    return await response.json();
  } catch (error) {
    console.error("Erro:", error);
    throw error;
  }
}

// Função para buscar todas as vendas
export async function getVendas(qnt = 3) {
  try {
    const response = await fetch(`${API_BASE_URL}/api/vendas/`);

    if (!response.ok) {
      throw new Error("Erro ao buscar vendas");
    }
		
		const vendas = await response.json();
		return vendas.slice(0, qnt);
  } catch (error) {
    console.error("Erro:", error);
    return [];
  }
}

// Função para buscar uma venda por ID
export async function getVendaById(vendaId) {
  try {
    const response = await fetch(`${API_BASE_URL}/api/vendas/${vendaId}`);

    if (!response.ok) {
      if (response.status === 404) {
        throw new Error("Venda não encontrada");
      }
      throw new Error("Erro ao buscar venda");
    }

    return await response.json();
  } catch (error) {
    console.error("Erro:", error);
    throw error;
  }
}

// Função para atualizar uma venda
export async function updateVenda(vendaId, venda) {
  try {
    const response = await fetch(`${API_BASE_URL}/api/vendas/${vendaId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(venda),
    });

    if (!response.ok) {
      if (response.status === 404) {
        throw new Error("Venda não encontrada");
      }
      throw new Error("Erro ao atualizar venda");
    }

    return await response.json();
  } catch (error) {
    console.error("Erro:", error);
    throw error;
  }
}

// Função para deletar uma venda
export async function deleteVenda(vendaId) {
  try {
    const response = await fetch(`${API_BASE_URL}/api/vendas/${vendaId}`, {
      method: "DELETE",
    });

    if (!response.ok) {
      if (response.status === 404) {
        throw new Error("Venda não encontrada");
      }
      throw new Error("Erro ao deletar venda");
    }

    return await response.json();
  } catch (error) {
    console.error("Erro:", error);
    throw error;
  }
}
