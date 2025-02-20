const API_BASE_URL = "http://localhost:8000"; // URL base da API (ajuste conforme necessário)

// Função para criar uma forma de pagamento
export async function createFormaPagamento(formaPagamento) {
  try {
    const response = await fetch(`${API_BASE_URL}/api/formas-pagamento/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formaPagamento),
    });

    if (!response.ok) {
      throw new Error("Erro ao criar forma de pagamento");
    }

    return await response.json();
  } catch (error) {
    console.error("Erro:", error);
    throw error;
  }
}

// Função para buscar todas as formas de pagamento
export async function getFormasPagamento(qnt = 3) {
  try {
    const response = await fetch(`${API_BASE_URL}/api/formas-pagamento/`);

    if (!response.ok) {
      throw new Error("Erro ao buscar formas de pagamento");
    }
		
		const formasPagamento = await response.json();
		return formasPagamento.slice(0, qnt);
  } catch (error) {
    console.error("Erro:", error);
    return [];
  }
}

// Função para buscar uma forma de pagamento por ID
export async function getFormaPagamentoById(formaPagamentoId) {
  try {
    const response = await fetch(`${API_BASE_URL}/api/formas-pagamento/${formaPagamentoId}`);

    if (!response.ok) {
      if (response.status === 404) {
        throw new Error("Forma de pagamento não encontrada");
      }
      throw new Error("Erro ao buscar forma de pagamento");
    }

    return await response.json();
  } catch (error) {
    console.error("Erro:", error);
    throw error;
  }
}

// Função para atualizar uma forma de pagamento
export async function updateFormaPagamento(formaPagamentoId, formaPagamento) {
  try {
    const response = await fetch(`${API_BASE_URL}/api/formas-pagamento/${formaPagamentoId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formaPagamento),
    });

    if (!response.ok) {
      if (response.status === 404) {
        throw new Error("Forma de pagamento não encontrada");
      }
      throw new Error("Erro ao atualizar forma de pagamento");
    }

    return await response.json();
  } catch (error) {
    console.error("Erro:", error);
    throw error;
  }
}

// Função para deletar uma forma de pagamento
export async function deleteFormaPagamento(formaPagamentoId) {
  try {
    const response = await fetch(`${API_BASE_URL}/api/formas-pagamento/${formaPagamentoId}`, {
      method: "DELETE",
    });

    if (!response.ok) {
      if (response.status === 404) {
        throw new Error("Forma de pagamento não encontrada");
      }
      throw new Error("Erro ao deletar forma de pagamento");
    }

    return await response.json();
  } catch (error) {
    console.error("Erro:", error);
    throw error;
  }
}
