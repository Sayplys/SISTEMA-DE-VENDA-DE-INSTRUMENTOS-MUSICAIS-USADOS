const API_BASE_URL = "http://localhost:8000"; // URL base da API (ajuste conforme necessário)

// Função para criar um usuário
export async function createUsuario(usuario) {
  try {
    const response = await fetch(`${API_BASE_URL}/api/usuarios/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(usuario),
    });

    if (!response.ok) {
      throw new Error("Erro ao criar usuário");
    }

    return await response.json();
  } catch (error) {
    console.error("Erro:", error);
    throw error;
  }
}

// Função para buscar todos os usuários
export async function getUsuarios(qnt) {
  try {
    const response = await fetch(`${API_BASE_URL}/api/usuarios/`);

    if (!response.ok) {
      throw new Error("Erro ao buscar usuários");
    }
		
		const usuarios = await response.json();
		if (qnt === undefined) {
			return usuarios;
		}
		return usuarios.slice(0, qnt);
  } catch (error) {
    console.error("Erro:", error);
    return [];
  }
}

// Função para buscar um usuário por ID
export async function getUsuarioById(usuarioId) {
  try {
    const response = await fetch(`${API_BASE_URL}/api/usuarios/${usuarioId}`);

    if (!response.ok) {
      if (response.status === 404) {
        throw new Error("Usuário não encontrado");
      }
      throw new Error("Erro ao buscar usuário");
    }

    return await response.json();
  } catch (error) {
    console.error("Erro:", error);
    throw error;
  }
}

// Função para atualizar um usuário
export async function updateUsuario(usuarioId, usuario) {
  try {
    const response = await fetch(`${API_BASE_URL}/api/usuarios/${usuarioId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(usuario),
    });

    if (!response.ok) {
      if (response.status === 404) {
        throw new Error("Usuário não encontrado");
      }
      throw new Error("Erro ao atualizar usuário");
    }

    return await response.json();
  } catch (error) {
    console.error("Erro:", error);
    throw error;
  }
}

// Função para deletar um usuário
export async function deleteUsuario(usuarioId) {
  try {
    const response = await fetch(`${API_BASE_URL}/api/usuarios/${usuarioId}`, {
      method: "DELETE",
    });

    if (!response.ok) {
      if (response.status === 404) {
        throw new Error("Usuário não encontrado");
      }
      throw new Error("Erro ao deletar usuário");
    }

    return await response.json();
  } catch (error) {
    console.error("Erro:", error);
    throw error;
  }
}
