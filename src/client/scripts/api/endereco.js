const API_BASE_URL = "http://localhost:8000"; // URL base da API (ajuste conforme necessário)

// Função para criar um endereço
export async function createEndereco(endereco) {
  try {
    const response = await fetch(`${API_BASE_URL}/api/enderecos/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(endereco),
    });

    if (!response.ok) {
      throw new Error("Erro ao criar endereço");
    }

    return await response.json();
  } catch (error) {
    console.error("Erro:", error);
    throw error;
  }
}

// Função para buscar todos os endereços
export async function getEnderecos(qnt) {
  try {
    const response = await fetch(`${API_BASE_URL}/api/enderecos/`);

    if (!response.ok) {
      throw new Error("Erro ao buscar endereços");
    }
		
		if (qnt === undefined) {
			return await response.json();
		}
		const enderecos = await response.json();
		return enderecos.slice(0, qnt);
  } catch (error) {
    console.error("Erro:", error);
    return [];
  }
}

// Função para buscar um endereço por ID
export async function getEnderecoById(enderecoId) {
  try {
    const response = await fetch(`${API_BASE_URL}/api/enderecos/${enderecoId}`);

    if (!response.ok) {
      if (response.status === 404) {
        throw new Error("Endereço não encontrado");
      }
      throw new Error("Erro ao buscar endereço");
    }

    return await response.json();
  } catch (error) {
    console.error("Erro:", error);
    throw error;
  }
}

// Função para atualizar um endereço
export async function updateEndereco(enderecoId, endereco) {
  try {
    const response = await fetch(`${API_BASE_URL}/api/enderecos/${enderecoId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(endereco),
    });

    if (!response.ok) {
      if (response.status === 404) {
        throw new Error("Endereço não encontrado");
      }
      throw new Error("Erro ao atualizar endereço");
    }

    return await response.json();
  } catch (error) {
    console.error("Erro:", error);
    throw error;
  }
}

// Função para deletar um endereço
export async function deleteEndereco(enderecoId) {
  try {
    const response = await fetch(`${API_BASE_URL}/api/enderecos/${enderecoId}`, {
      method: "DELETE",
    });

    if (!response.ok) {
      if (response.status === 404) {
        throw new Error("Endereço não encontrado");
      }
      throw new Error("Erro ao deletar endereço");
    }

    return await response.json();
  } catch (error) {
    console.error("Erro:", error);
    throw error;
  }
}
