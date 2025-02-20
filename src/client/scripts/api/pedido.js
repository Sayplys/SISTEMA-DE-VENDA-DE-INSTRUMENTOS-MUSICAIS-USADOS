aconst API_BASE_URL = "http://localhost:8000"; // URL base da API (ajuste conforme necessário)

// Função para criar um pedido
export async function createPedido(pedido) {
  try {
    const response = await fetch(`${API_BASE_URL}/api/pedidos/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(pedido),
    });

    if (!response.ok) {
      throw new Error("Erro ao criar pedido");
    }

    return await response.json();
  } catch (error) {
    console.error("Erro:", error);
    throw error;
  }
}

// Função para buscar todos os pedidos
export async function getPedidos(qnt = 3) {
  try {
    const response = await fetch(`${API_BASE_URL}/api/pedidos/`);

    if (!response.ok) {
      throw new Error("Erro ao buscar pedidos");
    }
		
		const pedidos = await response.json();
		return pedidos.slice(0, qnt);
  } catch (error) {
    console.error("Erro:", error);
    return [];
  }
}

// Função para buscar um pedido por ID
export async function getPedidoById(pedidoId) {
  try {
    const response = await fetch(`${API_BASE_URL}/api/pedidos/${pedidoId}`);

    if (!response.ok) {
      if (response.status === 404) {
        throw new Error("Pedido não encontrado");
      }
      throw new Error("Erro ao buscar pedido");
    }

    return await response.json();
  } catch (error) {
    console.error("Erro:", error);
    throw error;
  }
}

// Função para atualizar um pedido
export async function updatePedido(pedidoId, pedido) {
  try {
    const response = await fetch(`${API_BASE_URL}/api/pedidos/${pedidoId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(pedido),
    });

    if (!response.ok) {
      if (response.status === 404) {
        throw new Error("Pedido não encontrado");
      }
      throw new Error("Erro ao atualizar pedido");
    }

    return await response.json();
  } catch (error) {
    console.error("Erro:", error);
    throw error;
  }
}

// Função para deletar um pedido
export async function deletePedido(pedidoId) {
  try {
    const response = await fetch(`${API_BASE_URL}/api/pedidos/${pedidoId}`, {
      method: "DELETE",
    });

    if (!response.ok) {
      if (response.status === 404) {
        throw new Error("Pedido não encontrado");
      }
      throw new Error("Erro ao deletar pedido");
    }

    return await response.json();
  } catch (error) {
    console.error("Erro:", error);
    throw error;
  }
}
