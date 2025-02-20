const API_BASE_URL = "http://localhost:8000"; // URL base da API (ajuste conforme necessário)

// Função para criar uma compra
export async function createCompra(compra) {
  try {
    const response = await fetch(`${API_BASE_URL}/api/compras/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(compra),
    });

    if (!response.ok) {
      throw new Error("Erro ao criar compra");
    }

    return await response.json();
  } catch (error) {
    console.error("Erro:", error);
    throw error;
  }
}

// Função para buscar todas as compras
export async function getCompras(qnt = 3) {
  try {
    const response = await fetch(`${API_BASE_URL}/api/compras/`);

    if (!response.ok) {
      throw new Error("Erro ao buscar compras");
    }
		
		const compras = await response.json();
		return compras.slice(0, qnt);
  } catch (error) {
    console.error("Erro:", error);
    return [];
  }
}

// Função para buscar uma compra por ID
export async function getCompraById(compraId) {
  try {
    const response = await fetch(`${API_BASE_URL}/api/compras/${compraId}`);

    if (!response.ok) {
      if (response.status === 404) {
        throw new Error("Compra não encontrada");
      }
      throw new Error("Erro ao buscar compra");
    }

    return await response.json();
  } catch (error) {
    console.error("Erro:", error);
    throw error;
  }
}

// Função para atualizar uma compra
export async function updateCompra(compraId, compra) {
  try {
    const response = await fetch(`${API_BASE_URL}/api/compras/${compraId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(compra),
    });

    if (!response.ok) {
      if (response.status === 404) {
        throw new Error("Compra não encontrada");
      }
      throw new Error("Erro ao atualizar compra");
    }

    return await response.json();
  } catch (error) {
    console.error("Erro:", error);
    throw error;
  }
}

// Função para deletar uma compra
export async function deleteCompra(compraId) {
  try {
    const response = await fetch(`${API_BASE_URL}/api/compras/${compraId}`, {
      method: "DELETE",
    });

    if (!response.ok) {
      if (response.status === 404) {
        throw new Error("Compra não encontrada");
      }
      throw new Error("Erro ao deletar compra");
    }

    return await response.json();
  } catch (error) {
    console.error("Erro:", error);
    throw error;
  }
}
