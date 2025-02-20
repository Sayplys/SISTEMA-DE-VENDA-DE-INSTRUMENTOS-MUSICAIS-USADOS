const API_BASE_URL = "http://localhost:8000"; // URL base da API (ajuste conforme necessário)

// Função para criar um pagamento
export async function createPagamento(pagamento) {
  try {
    const response = await fetch(`${API_BASE_URL}/api/pagamentos/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(pagamento),
    });

    if (!response.ok) {
      throw new Error("Erro ao criar pagamento");
    }

    return await response.json();
  } catch (error) {
    console.error("Erro:", error);
    throw error;
  }
}

// Função para buscar todos os pagamentos
export async function getPagamentos(qnt = 3) {
  try {
    const response = await fetch(`${API_BASE_URL}/api/pagamentos/`);

    if (!response.ok) {
      throw new Error("Erro ao buscar pagamentos");
    }
		
		const pagamentos = await response.json();
		return pagamentos.slice(0, qnt);
  } catch (error) {
    console.error("Erro:", error);
    return [];
  }
}

// Função para buscar um pagamento por ID
export async function getPagamentoById(pagamentoId) {
  try {
    const response = await fetch(`${API_BASE_URL}/api/pagamentos/${pagamentoId}`);

    if (!response.ok) {
      if (response.status === 404) {
        throw new Error("Pagamento não encontrado");
      }
      throw new Error("Erro ao buscar pagamento");
    }

    return await response.json();
  } catch (error) {
    console.error("Erro:", error);
    throw error;
  }
}

// Função para atualizar um pagamento
export async function updatePagamento(pagamentoId, pagamento) {
  try {
    const response = await fetch(`${API_BASE_URL}/api/pagamentos/${pagamentoId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(pagamento),
    });

    if (!response.ok) {
      if (response.status === 404) {
        throw new Error("Pagamento não encontrado");
      }
      throw new Error("Erro ao atualizar pagamento");
    }

    return await response.json();
  } catch (error) {
    console.error("Erro:", error);
    throw error;
  }
}

// Função para deletar um pagamento
export async function deletePagamento(pagamentoId) {
  try {
    const response = await fetch(`${API_BASE_URL}/api/pagamentos/${pagamentoId}`, {
      method: "DELETE",
    });

    if (!response.ok) {
      if (response.status === 404) {
        throw new Error("Pagamento não encontrado");
      }
      throw new Error("Erro ao deletar pagamento");
    }

    return await response.json();
  } catch (error) {
    console.error("Erro:", error);
    throw error;
  }
}
