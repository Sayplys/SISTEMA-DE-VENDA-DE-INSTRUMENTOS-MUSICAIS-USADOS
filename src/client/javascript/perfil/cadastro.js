// cadastro.js

const API_BASE_URL = "http://localhost:8000"; // URL da API

document.getElementById("form-cadastro").addEventListener("submit", async (event) => {
  event.preventDefault();

  const nome = document.getElementById("nome").value;
  const email = document.getElementById("email").value;
  const senha = document.getElementById("senha").value;
  const telefone = document.getElementById("telefone").value;

  const usuario = {
    nome,
    email,
    senha,
    telefone,
  };

  try {
    const response = await fetch(`${API_BASE_URL}/usuarios/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(usuario),
    });

    if (!response.ok) {
      throw new Error("Erro ao cadastrar usuário");
    }

    alert("Cadastro realizado com sucesso!");
    window.location.href = "login.html"; // Redireciona para a página de login
  } catch (error) {
    console.error("Erro:", error);
    alert("Erro ao cadastrar usuário. Tente novamente.");
  }
});
